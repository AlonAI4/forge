/* ==========================================================================
   GRAPH-LITE (Forge stage 5)
   graphify's main ideas, small enough to run in a browser tab: read a chat or a page, pull out
   the things it talks about, link things mentioned together, group them into topics, find the
   main topics, spot what is missing, and write a short context block for the next prompt.

   Ideas and rules ported from graphify (https://github.com/safishamsi/graphify),
   Copyright (c) 2026 Safi Shamsi, MIT License: the god-node rule and its skip lists
   (analyze.py), Louvain grouping with oversized groups split again (cluster.py), and
   bridge-based questions (suggest_questions). Written again in plain JavaScript, no
   dependencies. The full notice is in THIRD_PARTY_NOTICES.md.
   ========================================================================== */

/** @typedef {{id: string, label: string, kind: string, count: number, turns: number[], user: number, source_file?: string}} GNode */
/** @typedef {{nodes: Map<string, GNode>, adj: Map<string, Map<string, number>>}} Graph */
/** @typedef {{role?: string, text: string, guessed?: boolean, who?: string}} Turn */

// graphify's skip lists (analyze.py): labels that are never a "main topic"
const GL_NOISE = new Set(["Any","AsyncMock","Callable","ClassVar","Counter","Dict","Enum","False","Final","List","Literal","MagicMock","Mock","NonCallableMagicMock","NonCallableMock","Optional","OrderedDict","Path","PropertyMock","Protocol","Set","True","Tuple","Type","Union","abc","bool","bytearray","bytes","complex","datetime","defaultdict","float","int","io","json","object","os","patch","re","sentinel","str","sys","typing"]);
const GL_JSON_NOISE = new Set(["bundleddependencies","bundledependencies","data","dependencies","description","devdependencies","end","id","items","key","name","optionaldependencies","peerdependencies","properties","start","title","type","value","version"]);

// words too common to be a topic in a chat
const GL_STOP = new Set(("a about above after again against all also am an and any are aren't as at be because been before being below between both but by can can't " +
  "cannot could couldn't did didn't do does doesn't doing don't down during each few for from further had hadn't has hasn't have haven't having he her here hers " +
  "herself him himself his how i if in into is isn't it it's its itself just let's like make me more most much must my myself need no nor not now of off on once " +
  "only or other ought our ours ourselves out over own really same she should shouldn't so some such than that that's the their theirs them themselves then there " +
  "there's these they this those through to too under until up us very was wasn't we were weren't what when where which while who whom why will with won't would " +
  "wouldn't you your yours yourself yourselves yes okay ok please thanks thank want wants get got going gonna also maybe well still even every one two three first " +
  "last next new good great better best lot lots thing things something anything everything way ways use using used make made makes making see look looks looking " +
  "know think go goes done do doing sure right now just let lets put take give say said tell told try trying work works working able going etc bit kind sort " +
  "i'm i've i'll you're we're they're that'll there'll it'll can't don't won't isn't aren't").split(" "));

// chat talk, not topics: verbs, describing words and fillers that come up in almost every chat
// (measured on 9 real chats: "real" was a main topic in 8 of them)
const GL_VAGUE = new Set(("real actually check test verify build clean full open read write run start add fix create show need mean " +
  "nothing already rather different since instead exactly probably basically simply simple small big quick fast slow whole part step " +
  "left keep change update happen stuff idea point reason problem issue answer question pretty quite almost around back away inside " +
  "without within across bad sick insane wow cool nice true false fully correctly properly currently again later today tomorrow " +
  "yesterday time minute second hour day week whether though although however because either else might may came come find found call " +
  "move set support handle return rest wrong fine hard easy fun seem seems feel next last plus mine yours ours theirs another " +
  "four five six seven eight nine ten hundred thousand half enough whatever wherever whoever anyway sometime sometimes often never " +
  "always usually likely unlikely possible actual literally totally completely super hey hello hi yeah yep nope lol means ask say says wait someone somebody anyone everyone " +
  "jan feb mar apr jun jul aug sep sept oct nov dec mon tue wed thu fri sat sun").split(" "));

/** Is this word just chat talk? Checks the word and its -ing / -ed / -s forms. @param {string} w */
function glVague(w){
  if(GL_STOP.has(w) || GL_VAGUE.has(w)) return true;
  const base = w.replace(/(?:ing|ed|s)$/, "");
  return base.length >= 3 && [base, base + "e", base.replace(/(.)\1$/, "$1")].some(b => GL_VAGUE.has(b) || GL_STOP.has(b));
}

/** Tidy a word into its topic form: lower case, simple plural removed. @param {string} w */
function glStem(w){
  const x = w.toLowerCase();
  if(x.length > 4 && x.endsWith("ies")) return x.slice(0, -3) + "y";
  if(x.length > 5 && /(?:sh|ch|x|ss|z)es$/.test(x)) return x.slice(0, -2);
  if(x.length > 4 && x.endsWith("s") && !x.endsWith("ss") && !x.endsWith("us") && !x.endsWith("is")) return x.slice(0, -1);
  return x;
}

// who is speaking, when a copied chat labels its lines ("You said:", "ChatGPT said:", "Claude:")
const GL_WHO = /^[ \t]*(?:\*\*|#+ )?(you|user|human|me|i|assistant|claude|chatgpt|gpt|gemini|copilot|grok|perplexity|deepseek|ai|bot)(?: said)?(?:\*\*)?[ \t]*:[ \t]*/gim;

/** A pasted chat as turns. Uses "You:" / "ChatGPT said:" style labels when there are any;
 *  with no labels, every paragraph counts as the user's. @param {string} text @returns {Turn[]} */
function glParseChat(text){
  const t = String(text || "");
  // 9.7: an export file (Claude: sender + text, ChatGPT: author.role + content.parts, or role + content)
  const fromJson = glFromJson(t); if(fromJson) return fromJson;
  // v1 bug hunt: a WhatsApp chat ("[10/02/26, 18:01] Dana: ..." or "10/02/26, 18:01 - Dana: ...") was one long turn with the
  // timestamps in the goal. Each line is a message, and every message is a person's (no AI in it)
  const WA = /^\s*\[?\d{1,4}[\/.-]\d{1,2}[\/.-]\d{1,4},?\s+\d{1,2}:\d{2}(?::\d{2})?(?:\s*[ap]\.?m\.?)?\]?\s*(?:-\s*)?([^:\n]{1,40}):\s*(.*)$/i;
  const waLines = t.split("\n").filter(l => l.trim());
  if(waLines.length >= 2 && waLines.filter(l => WA.test(l)).length >= Math.max(2, waLines.length * 0.6)){
    /** @type {Turn[]} */
    const out = [];
    for(const l of waLines){
      const w = l.match(WA);
      if(!w){ if(out.length) out[out.length - 1].text += "\n" + l.trim(); continue; }
      const body = w[2].trim();
      if(!body || /^<media omitted>$|^\u200e?(image|video|audio|sticker) omitted$/i.test(body)) continue;
      // everyone in a WhatsApp chat is a person, and the ask often comes from the other side ("can u make the invite")
      out.push({role: "user", text: body, who: w[1].trim()}); // the name is shown in "Who said what"
    }
    if(out.length) return out;
  }
  // 9.7: "## User" / "### Assistant" headings with no colon (Markdown exports)
  const heads = [...t.matchAll(/^[ \t]*#{1,4}[ \t]*(you|user|human|me|assistant|claude|chatgpt|gpt|gemini|ai)[ \t]*$/gim)];
  let marks = heads.length >= 2 ? heads : [...t.matchAll(GL_WHO)];
  // 11.4: a chat pasted on one line ("You: ... AI: ... You: ...") has its labels mid-line
  if(marks.length < 2){ const inline = [...t.matchAll(/(?:^|\s)(you|user|human|me|assistant|claude|chatgpt|gpt|gemini|ai)(?: said)?\s*:\s*/gi)]; if(inline.length >= 2 && inline.some(x => /^(you|user|human|me)$/i.test(x[1])) && inline.some(x => !/^(you|user|human|me)$/i.test(x[1]))) marks = inline; }
  // 9.7: no labels at all (a copied page): long answers with lists, code or headings are the AI's, short ones yours
  if(!marks.length){
    /** @type {Turn[]} */
    const out = [];
    for(const x of t.split(/\n\s*\n/).map(y => y.trim()).filter(Boolean)){
      const role = x.length > 400 || /^\s*(?:[-*\u2022]|\d+[.)]|#{1,4} |```)/m.test(x) ? "assistant" : "user";
      const last = out[out.length - 1];
      if(last && last.role === role && role === "assistant") last.text += "\n\n" + x; else out.push({role, text: x, guessed: true});
    }
    return out;
  }
  /** @type {Turn[]} */
  const turns = [];
  const before = t.slice(0, marks[0].index).trim();
  if(before) turns.push({role:"user", text:before});
  marks.forEach((m, i) => {
    const body = t.slice(/** @type {number} */ (m.index) + m[0].length, i + 1 < marks.length ? marks[i + 1].index : t.length).trim();
    const role = /^(you|user|human|me|i)$/i.test(m[1]) ? "user" : "assistant";
    if(body) turns.push({role, text:body});
  });
  return turns;
}

/** 9.7: a chat export as turns, or null when the text is not one. @param {string} t @returns {Turn[] | null} */
function glFromJson(t){
  const x = t.trim(); if(!/^[[{]/.test(x)) return null;
  let data; try { data = JSON.parse(x); } catch(e){ return null; }
  /** @type {{role: string, text: string, at: number}[]} */
  const found = [];
  /** @param {any} v @param {number} depth */
  const walk = (v, depth) => {
    if(!v || typeof v !== "object" || depth > 12) return;
    if(Array.isArray(v)){ v.forEach(y => walk(y, depth + 1)); return; }
    const who = v.sender || v.role || (v.author && v.author.role);
    let body = typeof v.text === "string" ? v.text : typeof v.content === "string" ? v.content
      : Array.isArray(v.content) ? v.content.map(/** @param {any} c */ c => typeof c === "string" ? c : c && typeof c.text === "string" ? c.text : "").join("\n")
      : v.content && Array.isArray(v.content.parts) ? v.content.parts.filter(/** @param {any} c */ c => typeof c === "string").join("\n") : "";
    if(typeof who === "string" && body.trim() && /^(human|user|assistant|model|ai|claude|chatgpt|gpt)$/i.test(who)){
      found.push({role: /^(human|user)$/i.test(who) ? "user" : "assistant", text: body.trim(), at: Number(v.create_time || v.created_at && Date.parse(v.created_at) || found.length)});
      return;
    }
    for(const k of Object.keys(v)) if(k !== "author") walk(v[k], depth + 1);
  };
  walk(data, 0);
  if(!found.length) return null;
  // ChatGPT exports are a map, not a list: put them in time order when they carry times
  if(found.every(f => f.at > 1e6)) found.sort((a, b) => a.at - b.at);
  return found.map(f => ({role: f.role, text: f.text}));
}

/** 10.6: the latest ask, with what a bare "yes" answered: "yes, and no stock photos" after "Want an order form?"
 *  is 'Yes to "Want an order form?", and no stock photos', not "And no stock photos". @param {Turn[]} turns */
function glLatestAsk(turns){
  const i = turns.map(t => t.role !== "assistant").lastIndexOf(true); if(i < 0) return "";
  const said = String(turns[i].text || "").trim();
  const m = said.match(/^(?:yes|yeah|yep|yup|sure|ok(?:ay)?|please|do it|go ahead|sounds good)\b(?:[\s,!]*(?:please|pls|thanks|thank you)\b)?[\s,.!]*(?:(?:and|but|also)\s+)?(.*)$/is);
  const prev = turns.slice(0, i).reverse().find(t => t.role === "assistant");
  const q = prev ? (String(prev.text).match(/[^.!?\n]*\?/g) || []).map(x => x.trim()).filter(x => x.split(/\s+/).length >= 2).pop() : "";
  if(m && q){ const rest = m[1] ? glTidyAsk(m[1]) : ""; return 'Yes to "' + q + '"' + (rest ? ", and " + rest.charAt(0).toLowerCase() + rest.slice(1) : "."); }
  return glTidyAsk(said);
}

/** 9.7: what Forge asks your AI for when you would rather paste its summary than the whole chat */
const CHAT_SUMMARY_ASK = [
  "Sum up our whole conversation so far for me, in exactly this format, with short lines and only what we actually said:",
  "",
  "Goal: <what I am trying to do, one line>",
  "Decisions:",
  "- <each thing we decided>",
  "Rules and limits:",
  "- <every rule, limit, must or must-not I gave>",
  "Done:",
  "- <what is already finished>",
  "Open questions:",
  "- <what is still undecided or unanswered>",
  "Latest ask: <the last thing I asked for>"
].join("\n");

/** 9.7: a chat (any shape) or a summary your AI wrote, turned into Forge's five parts.
 *  @param {string | Turn[]} input
 *  @returns {{shape: string, turns: {role: string, text: string}[], summary: {goal: string, decisions: string[], rules: string[], done: string[], open: string[], latest: string}, context: string}} */
function chatContext(input){
  const raw = typeof input === "string" ? input : "";
  /** @param {string} x */
  const short = x => { const w = String(x).replace(/\s+/g, " ").trim().split(" "); return w.length > 30 ? w.slice(0, 30).join(" ") + "..." : w.join(" "); };
  /** @param {string[]} xs */
  const uniq = xs => [...new Map(xs.map(x => short(x)).filter(x => x.length > 3).map(x => [x.toLowerCase(), x])).values()];
  /** @type {{goal: string, decisions: string[], rules: string[], done: string[], open: string[], latest: string}} */
  const sum = {goal: "", decisions: [], rules: [], done: [], open: [], latest: ""};
  const HEAD = /^\s*[-*]*\s*\**(goal|decisions?|rules(?: and limits)?|limits|done|finished|open questions?|questions|latest ask)\**\s*:\s*(.*)$/i;
  const lines = raw.split("\n");
  // a summary their AI wrote (Goal:, Decisions:, ... as in CHAT_SUMMARY_ASK)
  if(lines.filter(l => HEAD.test(l)).length >= 3){
    let cur = "";
    for(const l of lines){
      const h = l.match(HEAD);
      if(h){ cur = h[1].toLowerCase(); const v = h[2].trim();
        if(/^goal/.test(cur)) sum.goal = v; else if(/^latest/.test(cur)) sum.latest = v; else if(v) push(cur, v); continue; }
      const item = l.replace(/^\s*(?:[-*\u2022]|\d+[.)])\s*/, "").trim();
      if(item && cur && !/^(goal|latest)/.test(cur)) push(cur, item);
    }
    return {shape: "summary", turns: [], summary: tidy(sum), context: ctx(tidy(sum))};
  }
  /** @param {string} k @param {string} v */
  function push(k, v){ (/^decision/.test(k) ? sum.decisions : /^(rules|limits)/.test(k) ? sum.rules : /^(done|finished)/.test(k) ? sum.done : sum.open).push(v); }
  /** @param {typeof sum} x */
  function tidy(x){ return {goal: short(x.goal), decisions: uniq(x.decisions).slice(0, 6), rules: uniq(x.rules).slice(0, 8), done: uniq(x.done).slice(0, 6), open: uniq(x.open).slice(0, 5), latest: short(x.latest)}; }
  /** @param {typeof sum} x */
  function ctx(x){
    return [x.goal && "Goal: " + x.goal, x.decisions.length && "Decisions:\n" + x.decisions.map(d => "- " + d).join("\n"),
      x.rules.length && "Rules and limits:\n" + x.rules.map(d => "- " + d).join("\n"), x.done.length && "Done:\n" + x.done.map(d => "- " + d).join("\n"),
      x.open.length && "Open questions:\n" + x.open.map(d => "- " + d).join("\n"), x.latest && "Latest ask: " + x.latest].filter(Boolean).join("\n");
  }
  const turns = glTurns(input);
  const shape = glFromJson(raw) ? "export" : turns.some(t => /** @type {any} */ (t).guessed) ? "guessed" : "labels";
  const user = turns.filter(t => t.role !== "assistant"), ai = turns.filter(t => t.role === "assistant");
  /** @param {string} x */
  const sents = x => String(x).replace(/```[\s\S]*?```/g, " ").split(/(?<=[.!?])\s+|\n+/).map(y => y.replace(/^\s*(?:[-*\u2022#>]+|\d+[.)])\s*/, "").trim()).filter(y => y.split(/\s+/).length >= 3 || (/\?$/.test(y) && y.split(/\s+/).length >= 2));
  sum.goal = user.length ? glTidyAsk(user[0].text) : "";
  sum.latest = user.length > 1 ? glLatestAsk(turns) : "";
  for(const t of user) for(const x of sents(t.text)){
    // v1 step 14: "no stock photos" is a rule too (a real /forge-map run listed it as "not tagged as a rule")
    const RULE = /\b(must|don'?t|do not|never|only|without|at most|at least|no more than|under \d|max|budget|deadline|make sure|no money|free|avoid|keep it)\b|\bno (?!idea\b|problem\b|worries\b|thanks\b|way\b|one\b|longer\b|clue\b)[a-z]{3,}/i;
    if(RULE.test(x)){ const cl = x.split(/,\s*|;\s*|\s+but\s+|\s+and\s+(?=(?:never|don'?t|do not|no|only|without|must|keep)\b)/i).filter(c => RULE.test(c)); sum.rules.push(...(cl.length ? cl : [x]).map(c => c.replace(/^\s*(?:and|but|also|plus|then)\s+/i, ""))); }
    else if(/\b(let'?s|we'?ll|go with|going with|decided|i chose|i choose|i picked|use the|yes,? (?:do|go)|ok,? (?:do|go)|i want)\b/i.test(x)) sum.decisions.push(x);
  }
  for(const t of ai) for(const x of sents(t.text)){
    if(/\b(we agreed|plan is|i'?ll use|going with|decided)\b/i.test(x)) sum.decisions.push(x);
    if(/\b(done|fixed|built|added|created|finished|works now|now works|pass(?:es|ed)|committed|pushed|shipped|deployed|ready)\b|\u2705|\u2713/i.test(x) && !/\?$/.test(x)) sum.done.push(x);
  }
  // v1 step 16: the person's answer to the AI's question is a decision ("What should it cover?" -> "race results, a member
  // of the month, upcoming runs"); before, it was only kept when it said "let's" or "decided"
  const up1 = (/** @type {string} */ x) => x.charAt(0).toUpperCase() + x.slice(1);
  for(let i = 1; i < turns.length; i++){
    const q = turns[i - 1], ans = turns[i];
    if(q.role !== "assistant" || ans.role === "assistant" || !/\?\s*$/.test(String(q.text).trim())) continue;
    const first = sents(ans.text)[0] || String(ans.text).trim();
    if(!first || /^(yes|yeah|yep|no|nope|ok|okay|sure|thanks|thank you)\b[^.,]{0,12}$/i.test(first) || first.split(/\s+/).length > 30) continue;
    const qs = sents(q.text).filter(x => /\?$/.test(x)).pop() || "";
    // v1 step 16: undecided is not a decision ("havent decided if we do cake or cupcakes"): it stays an open question
    if(/\b(?:haven'?t|have not|not yet) (?:decided|checked|looked|thought about it)\b|\bnot sure\b|\bdon'?t know\b|\bundecided\b/i.test(first)){ sum.open.push(first.replace(/[.]+$/, "")); continue; }
    // a label only from a clean "What/Which X?" (judges: "Theme in mind:", "'s the setting time:")
    const tm = qs.match(/^(?:(?:\w+[.!]\s+)?any|what|which)\s+(?!'s\b|is\b|are\b|do\b|does\b|did\b)(?:(?:should|would|will|do|does)\s+(?:it|i|we|you)\s+)?([a-z]+(?:\s+[a-z]+){0,2})\?$/i);
    const topic = tm && !/\b(in mind|you|me|like)\b/i.test(tm[1]) ? tm[1] : "";
    // a yes to "Should I include a training tip?" is the decision "Include a training tip"
    const yesQ = qs.match(/^(?:should|shall|can|could|do you want me to|would you like me to|want me to)\s+(?:i|we|it)?\s*(.+?)\?$/i);
    const yes = /^(?:yes|yeah|yep|sure|ok|okay)\b[,!. ]*/i.exec(first);
    const d = yesQ && yes ? up1(yesQ[1].trim()) + (first.slice(yes[0].length).trim() ? ", " + first.slice(yes[0].length).trim().replace(/[.]+$/, "") : "")
      : (topic && first.split(/\s+/).length <= 14 ? up1(topic.trim()) + ": " : "") + (topic ? (x => x)(first.replace(/^(?:yes|yeah|ok|okay|sure)\s*,?\s*but\s+/i, "").replace(/[.]+$/, "")) : up1(first.replace(/^(?:yes|yeah|ok|okay|sure)\s*,?\s*but\s+/i, "").replace(/[.]+$/, "")));
    // the whole answer, unless it is exactly one of the rules already ("friendly and a bit funny but no inside jokes" keeps the tone)
    if(!sum.rules.some(r => String(r).toLowerCase().replace(/[.]+$/, "") === first.toLowerCase().replace(/[.]+$/, ""))) sum.decisions.push(d);
  }
  const lastAi = ai[ai.length - 1], lastUser = user[user.length - 1];
  if(lastAi) sum.open.push(...sents(lastAi.text).filter(x => /\?$/.test(x)));
  if(lastUser && turns[turns.length - 1] === lastUser) sum.open.push(...sents(lastUser.text).filter(x => /\?$/.test(x))); // answered when the AI spoke after it
  const out = tidy(sum);
  return {shape, turns: turns.map(t => ({role: t.role || "user", text: t.text, ...(t.who ? {who: t.who} : {})})), summary: out, context: ctx(out)};
}

/** Split a chat into turns. Accepts pasted text, or a list of {role, text}. @param {string | Turn[]} input @returns {Turn[]} */
function glTurns(input){
  if(Array.isArray(input)) return input.filter(t => t && typeof t.text === "string");
  return glParseChat(String(input || ""));
}

/** The things one sentence mentions, strongest kinds first. @param {string} s @returns {{id: string, label: string, kind: string}[]} */
function glTerms(s){
  /** @type {{id: string, label: string, kind: string}[]} */
  const out = []; const seen = new Set();
  /** @param {string} id @param {string} label @param {string} kind */
  const add = (id, label, kind) => { if(id && !seen.has(id)){ seen.add(id); out.push({id, label, kind}); } };
  let rest = s;
  /** Take matches out of the sentence so they are not counted twice. @param {RegExp} re @param {(m: RegExpExecArray) => void} fn */
  const take = (re, fn) => { rest = rest.replace(re, (...a) => { fn(/** @type {RegExpExecArray} */ (/** @type {unknown} */ (a))); return " "; }); };
  take(/["“]([^"”]{2,40})["”]/g, m => add("q:" + m[1].toLowerCase(), "\"" + m[1] + "\"", "quote"));
  take(/https?:\/\/\S+/g, () => {});
  take(/\b[\w-]+\.(?:tsx?|jsx?|mjs|py|md|html|css|json|txt|pdf|toml|ya?ml)\b/gi, m => add("f:" + m[0].toLowerCase(), m[0], "file"));
  take(/\b(?:under|over|at most|at least|max(?:imum)?|min(?:imum)?|exactly|about)?\s*\d+(?:\.\d+)?\s*(?:words?|chars?|characters?|seconds?|secs?|s|minutes?|mins?|px|%|bpm|fps|k|mb|gb|steps?|slides?|pages?|lines?|bullets?|points?|questions?)\b/gi,
       m => { const t = m[0].trim(); if(/[a-z]/i.test(t)) add("c:" + t.toLowerCase().replace(/\s+/g, " "), t, "constraint"); });
  take(/\b[a-z]+[A-Z][A-Za-z0-9]*\(?\)?|\b[A-Za-z]+_[A-Za-z0-9_]+\b|\b[A-Za-z][A-Za-z0-9]*\(\)/g, m => add("k:" + m[0].replace(/\(\)$/, ""), m[0], "code"));
  // names: two or more capitalised words together, or one capitalised word not starting the sentence
  take(/\b[A-Z][A-Za-z0-9]+(?:[ -][A-Z0-9][A-Za-z0-9]+)+\b/g, m => {
    const t = m[0].split(" "); if(t[0] !== "The" && GL_STOP.has(t[0].toLowerCase())) t.shift(); // "All 20" is not a name
    const n = t.join(" "); if(/[a-z]/i.test(n) && (t.length > 1 || !glVague(n.toLowerCase()))) add("n:" + n.toLowerCase(), n, "name");
  });
  // one capital word is a name only mid-sentence: not first on a line or bullet, not after ":" or "**"
  rest = rest.replace(/^[\s>#*_`-]*(?:\d+[.)]\s*)?[*_`]*/, "");
  rest = rest.replace(/([^.!?:*_`\s(\["'“]\s+)([A-Z][a-z0-9]{2,})\b/g, (all, pre, w) => { if(!glVague(w.toLowerCase())) add("n:" + w.toLowerCase(), w, "name"); return pre + " "; });
  // plain words that carry meaning
  const words = (rest.toLowerCase().match(/[a-z][a-z'-]{2,}/g) || []).map(w => w.replace(/'s$/, "").replace(/^['-]+|['-]+$/g, "")).filter(w => !/^\d/.test(w) && !glVague(w));
  for(const w of words) if(w.length >= 4 && !glVague(glStem(w))) add("w:" + glStem(w), glStem(w), "word");
  return out;
}

/** Things a chat talks about, and which of them are mentioned together.
 *  Words must come up at least twice to count; files, code, names, quotes and limits count at once.
 *  @param {string | Turn[]} input @param {{minWord?: number, perSentence?: number}=} opts @returns {Graph} */
function glExtract(input, opts){
  const minWord = (opts && opts.minWord) || 2, per = (opts && opts.perSentence) || 12;
  const turns = glTurns(input);
  /** @type {Map<string, GNode>} */
  const nodes = new Map();
  /** @type {{ids: string[]}[]} */
  const sentences = [];
  turns.forEach((t, ti) => {
    for(const s of t.text.split(/(?<=[.!?])\s+|\n+/)){
      const terms = glTerms(s); if(!terms.length) continue;
      for(const x of terms){
        const n = nodes.get(x.id) || {id:x.id, label:x.label, kind:x.kind, count:0, turns:[], user:0};
        n.count++; if(n.turns[n.turns.length - 1] !== ti) n.turns.push(ti); if(t.role !== "assistant") n.user++;
        nodes.set(x.id, n);
      }
      sentences.push({ids: terms.map(x => x.id)});
    }
  });
  // "Camera" said once mid-sentence but "camera" said five times is a word, not a name
  /** @type {Map<string, string>} */
  const alias = new Map();
  for(const [id, n] of nodes){
    if(n.kind !== "name" || n.label.includes(" ")) continue;
    const w = nodes.get("w:" + glStem(n.label));
    if(!w || w.count < n.count) continue;
    w.count += n.count; w.user += n.user; w.turns = [...new Set([...w.turns, ...n.turns])].sort((a, b) => a - b);
    alias.set(id, w.id); nodes.delete(id);
  }
  for(const x of sentences) x.ids = [...new Set(x.ids.map(id => alias.get(id) || id))];
  for(const [id, n] of nodes) if(n.kind === "word" && n.count < minWord) nodes.delete(id);
  /** @type {Map<string, Map<string, number>>} */
  const adj = new Map([...nodes.keys()].map(id => [id, new Map()]));
  for(const {ids} of sentences){
    // strongest first: named things before plain words, so a long sentence keeps what matters
    const kept = ids.filter(id => nodes.has(id)).sort((a, b) => (a[0] === "w" ? 1 : 0) - (b[0] === "w" ? 1 : 0)).slice(0, per);
    for(let i = 0; i < kept.length; i++) for(let j = i + 1; j < kept.length; j++){
      const a = kept[i], b = kept[j];
      const A = /** @type {Map<string, number>} */ (adj.get(a)), B = /** @type {Map<string, number>} */ (adj.get(b));
      A.set(b, (A.get(b) || 0) + 1); B.set(a, (B.get(a) || 0) + 1);
    }
  }
  return {nodes, adj};
}

/** Load a graph saved by graphify (graph.json), so graph-lite can be checked against graphify.
 *  @param {{nodes: {id: string, label?: string, source_file?: string, file_type?: string}[], links: {source: string, target: string, weight?: number}[]}} json @returns {Graph} */
function glFromGraphify(json){
  /** @type {Map<string, GNode>} */
  const nodes = new Map(json.nodes.map(n => [n.id, {id:n.id, label:n.label || n.id, kind:n.file_type || "code", count:1, turns:[], user:0, source_file:n.source_file || ""}]));
  /** @type {Map<string, Map<string, number>>} */
  const adj = new Map([...nodes.keys()].map(id => [id, new Map()]));
  for(const e of json.links){
    if(e.source === e.target || !adj.has(e.source) || !adj.has(e.target)) continue;
    const w = e.weight || 1;
    const A = /** @type {Map<string, number>} */ (adj.get(e.source)), B = /** @type {Map<string, number>} */ (adj.get(e.target));
    A.set(e.target, w); B.set(e.source, w);
  }
  return {nodes, adj};
}

/** graphify's _is_file_node, _is_concept_node and _is_json_key_node, for graphs loaded from graphify.
 *  @param {Graph} g @param {string} id */
function glSkip(g, id){
  const n = /** @type {GNode} */ (g.nodes.get(id));
  const deg = /** @type {Map<string, number>} */ (g.adj.get(id)).size;
  if(n.source_file === undefined) return n.kind === "file"; // graph-lite's own graphs: files are never main topics
  const src = n.source_file, label = n.label;
  if(src && label === src.split("/").pop()) return true;           // file hub
  if(label.startsWith(".") && label.endsWith("()")) return true;   // method stub
  if(label.endsWith("()") && deg <= 1) return true;                // lonely function stub
  if(!src || !src.split("/").pop()?.includes(".")) return true;    // concept node
  if(src.toLowerCase().endsWith(".json") && GL_JSON_NOISE.has(label.trim().toLowerCase())) return true;
  return false;
}

/** The main topics: the most connected things (graphify's god-node rule).
 *  @param {Graph} g @param {number=} topN @returns {{id: string, label: string, degree: number}[]} */
function glGodNodes(g, topN){
  const n = topN || 10;
  return [...g.adj.entries()].map(([id, nb]) => ({id, degree: nb.size}))
    .sort((a, b) => b.degree - a.degree || (a.id < b.id ? -1 : 1))
    .filter(x => !glSkip(g, x.id) && !GL_NOISE.has(/** @type {GNode} */ (g.nodes.get(x.id)).label))
    .slice(0, n).map(x => ({id:x.id, label:/** @type {GNode} */ (g.nodes.get(x.id)).label, degree:x.degree}));
}

/** One Louvain pass: move each thing to the neighbouring group that raises modularity most.
 *  @param {string[]} ids @param {Map<string, Map<string, number>>} adj @param {number} res */
function glOneLevel(ids, adj, res){
  /** @type {Map<string, number>} */
  const k = new Map(); let m2 = 0;
  for(const id of ids){ let s = 0; for(const w of (adj.get(id) || new Map()).values()) s += w; k.set(id, s); m2 += s; }
  /** @type {Map<string, number>} */
  const part = new Map(ids.map((id, i) => [id, i]));
  /** @type {Map<number, number>} */
  const tot = new Map(ids.map((id, i) => [i, /** @type {number} */ (k.get(id))]));
  if(!m2) return {part, moved:false};
  let moved = false, changed = true, passes = 0;
  while(changed && passes++ < 50){
    changed = false;
    for(const id of ids){
      const home = /** @type {number} */ (part.get(id)), ki = /** @type {number} */ (k.get(id));
      /** @type {Map<number, number>} */
      const toC = new Map();
      for(const [nb, w] of (adj.get(id) || new Map())) if(nb !== id){ const c = /** @type {number} */ (part.get(nb)); toC.set(c, (toC.get(c) || 0) + w); }
      tot.set(home, /** @type {number} */ (tot.get(home)) - ki);
      let best = home, bestGain = (toC.get(home) || 0) - res * /** @type {number} */ (tot.get(home)) * ki / m2;
      for(const [c, w] of [...toC.entries()].sort((a, b) => a[0] - b[0])){
        const gain = w - res * /** @type {number} */ (tot.get(c)) * ki / m2;
        if(gain > bestGain + 1e-12){ best = c; bestGain = gain; }
      }
      tot.set(best, /** @type {number} */ (tot.get(best)) + ki);
      if(best !== home){ part.set(id, best); changed = true; moved = true; }
    }
  }
  return {part, moved};
}

/** Louvain grouping over a set of things. Deterministic: same input, same groups.
 *  @param {string[]} ids @param {Map<string, Map<string, number>>} adj @param {number} res @returns {Map<string, number>} */
function glLouvain(ids, adj, res){
  /** @type {Map<string, string>} */
  const member = new Map(ids.map(id => [id, id]));
  let level = ids.slice().sort(), ladj = adj;
  for(let round = 0; round < 20; round++){
    const {part, moved} = glOneLevel(level, ladj, res);
    if(!moved) break;
    for(const [orig, ln] of member) member.set(orig, "L" + round + ":" + part.get(ln));
    /** @type {Map<string, Map<string, number>>} */
    const next = new Map();
    for(const [u, nb] of ladj){
      if(!part.has(u)) continue;
      const cu = "L" + round + ":" + part.get(u);
      if(!next.has(cu)) next.set(cu, new Map());
      const M = /** @type {Map<string, number>} */ (next.get(cu));
      for(const [v, w] of nb){ if(!part.has(v)) continue; const cv = "L" + round + ":" + part.get(v); M.set(cv, (M.get(cv) || 0) + w); }
    }
    ladj = next; level = [...next.keys()].sort();
  }
  /** @type {Map<string, number>} */
  const out = new Map(); /** @type {Map<string, number>} */ const ids2 = new Map();
  for(const id of ids){ const g = /** @type {string} */ (member.get(id)); if(!ids2.has(g)) ids2.set(g, ids2.size); out.set(id, /** @type {number} */ (ids2.get(g))); }
  return out;
}

/** Topics: groups of things that are mentioned together (graphify's cluster rule: Louvain, lonely
 *  things get their own group, groups over 25% of the graph (min 10) are split again, 0 = biggest).
 *  @param {Graph} g @param {{resolution?: number}=} opts @returns {string[][]} */
function glCluster(g, opts){
  const res = (opts && opts.resolution) || 1;
  const all = [...g.nodes.keys()].sort();
  const connected = all.filter(id => /** @type {Map<string, number>} */ (g.adj.get(id)).size > 0);
  /** @type {Map<number, string[]>} */
  const raw = new Map();
  for(const [id, c] of glLouvain(connected, g.adj, res)){ if(!raw.has(c)) raw.set(c, []); /** @type {string[]} */ (raw.get(c)).push(id); }
  /** @type {string[][]} */
  let groups = [...raw.values()];
  const limit = Math.max(10, Math.floor(all.length * 0.25));
  /** @type {string[][]} */
  const split = [];
  for(const grp of groups){
    if(grp.length <= limit){ split.push(grp); continue; }
    const set = new Set(grp);
    /** @type {Map<string, Map<string, number>>} */
    const sub = new Map(grp.map(id => [id, new Map([.../** @type {Map<string, number>} */ (g.adj.get(id))].filter(([n]) => set.has(n)))]));
    /** @type {Map<number, string[]>} */
    const parts = new Map();
    for(const [id, c] of glLouvain(grp, sub, res)){ if(!parts.has(c)) parts.set(c, []); /** @type {string[]} */ (parts.get(c)).push(id); }
    split.push(...parts.values());
  }
  groups = split.map(x => x.sort());
  for(const id of all) if(/** @type {Map<string, number>} */ (g.adj.get(id)).size === 0) groups.push([id]);
  return groups.sort((a, b) => b.length - a.length || (a[0] < b[0] ? -1 : 1));
}

/** How well the groups fit the links (Newman modularity, -0.5 to 1). Used to compare with graphify.
 *  @param {Graph} g @param {string[][]} groups */
function glModularity(g, groups){
  /** @type {Map<string, number>} */
  const of = new Map(); groups.forEach((grp, i) => grp.forEach(id => of.set(id, i)));
  let m2 = 0; /** @type {number[]} */ const tot = groups.map(() => 0); /** @type {number[]} */ const inn = groups.map(() => 0);
  for(const [u, nb] of g.adj){ const cu = /** @type {number} */ (of.get(u)); for(const [v, w] of nb){ m2 += w; tot[cu] += w; if(of.get(v) === cu) inn[cu] += w; } }
  if(!m2) return 0;
  return groups.reduce((q, _, i) => q + inn[i] / m2 - (tot[i] / m2) ** 2, 0);
}

/** Things that link two topics that are otherwise apart (graphify's bridge nodes, by betweenness).
 *  @param {Graph} g @param {number=} topN @returns {{id: string, label: string, score: number}[]} */
function glBridges(g, topN){
  const ids = [...g.nodes.keys()].filter(id => /** @type {Map<string, number>} */ (g.adj.get(id)).size > 0).sort();
  /** @type {Map<string, number>} */
  const bc = new Map(ids.map(id => [id, 0]));
  const sources = ids.length > 400 ? ids.filter((_, i) => i % Math.ceil(ids.length / 200) === 0) : ids; // sample big graphs, like graphify
  for(const s of sources){ // Brandes, unweighted
    /** @type {string[]} */ const stack = []; /** @type {Map<string, string[]>} */ const pred = new Map();
    /** @type {Map<string, number>} */ const sigma = new Map([[s, 1]]); /** @type {Map<string, number>} */ const dist = new Map([[s, 0]]);
    const q = [s];
    for(let qi = 0; qi < q.length; qi++){
      const v = q[qi]; stack.push(v);
      for(const w of /** @type {Map<string, number>} */ (g.adj.get(v)).keys()){
        if(!dist.has(w)){ dist.set(w, /** @type {number} */ (dist.get(v)) + 1); q.push(w); }
        if(dist.get(w) === /** @type {number} */ (dist.get(v)) + 1){ sigma.set(w, (sigma.get(w) || 0) + /** @type {number} */ (sigma.get(v))); if(!pred.has(w)) pred.set(w, []); /** @type {string[]} */ (pred.get(w)).push(v); }
      }
    }
    /** @type {Map<string, number>} */ const delta = new Map();
    while(stack.length){
      const w = /** @type {string} */ (stack.pop());
      for(const v of pred.get(w) || []) delta.set(v, (delta.get(v) || 0) + /** @type {number} */ (sigma.get(v)) / /** @type {number} */ (sigma.get(w)) * (1 + (delta.get(w) || 0)));
      if(w !== s) bc.set(w, /** @type {number} */ (bc.get(w)) + (delta.get(w) || 0));
    }
  }
  return [...bc.entries()].filter(([id, v]) => v > 0 && !glSkip(g, id)).sort((a, b) => b[1] - a[1] || (a[0] < b[0] ? -1 : 1))
    .slice(0, topN || 3).map(([id, v]) => ({id, label:/** @type {GNode} */ (g.nodes.get(id)).label, score:v}));
}

/* --- the Forge part: the master prompt's 9 slots ----------------------------------------
   From Forge's prompt library: every model wants the same nine things. graph-lite checks which
   of them the chat already gives, so it only asks about the rest. */
const GL_SLOTS = [
  {k:"subject",  n:"Subject",  q:"What is this about, in one line?"},
  {k:"ask",      n:"Ask",      q:"What exactly do you want back?", re:/\b(write|make|build|create|draw|generate|explain|summari[sz]e|fix|add|design|plan|list|compare|turn|give|show|find|improve|rewrite|translate)\b/i},
  {k:"setting",  n:"Setting",  q:"What does the AI need to know first: where, when, or what it is working with?", re:/\b(in|at|on|inside)\s+(?:a|an|the|my|our)?\s*[a-z]{3,}|\b(i am|i'm|we are|my project|the project|the code|the repo|this app|this site|background|context)\b/i},
  {k:"medium",   n:"Medium",   q:"What form should it take: a photo, a drawing, a list, a table, code?", re:/\b(photo|photograph|painting|illustration|drawing|render|3d|vector|pixel art|anime|video|clip|song|track|voice|list|table|steps|code|json|markdown|email|essay|poster|logo|website|page|app|game|slides?|deck)\b/i},
  {k:"purpose",  n:"Purpose",  q:"Where will it be used, and who is it for?", re:/\bfor\s+(?:a|an|the|my|our|your|\d+)\s+[a-z]|\b(audience|users?|players?|customers?|students?|teachers?|kids|beginners?|so that|in order to)\b/i},
  {k:"details",  n:"Details",  q:"What are the one to four details that matter most?", re:/\b(colou?r|palette|style|light(ing)?|lens|mood|tone|font|tempo|bpm|genre|voice|accent|layout|size|dark mode|theme)\b/i},
  {k:"avoid",    n:"Avoid",    q:"Is there anything it must leave out or not touch?", re:/\b(no|not|don'?t|do not|never|avoid|without|leave .{1,30} alone|except)\b/i},
  {k:"settings", n:"Settings", q:"Any settings to set: size, length, duration, quality?", re:/\b\d+\s*(?:words?|seconds?|s|minutes?|px|bpm|fps|slides?|pages?)\b|\b(aspect|16:9|9:16|1:1|4:5|duration|resolution|quality|effort|model)\b/i},
  {k:"check",    n:"Check",    q:"How will you know it worked?", re:/\b(tests? pass|should (?:be|have|show|work)|must (?:be|have|show)|so i can|make sure|check that|until|exits? 0|count|at least|no more than)\b/i}
];

/** Which of the 9 slots the user has already filled, judged on what the USER wrote (not the AI).
 *  @param {Turn[]} turns @returns {{k: string, n: string, q: string, filled: boolean}[]} */
function glSlots(turns){
  const user = turns.filter(t => t.role !== "assistant").map(t => t.text).join("\n");
  const words = user.trim().split(/\s+/).filter(Boolean).length;
  return GL_SLOTS.map(s => ({k:s.k, n:s.n, q:s.q, filled: s.k === "subject" ? words >= 3 : !!(s.re && s.re.test(user))}));
}

/** The user's last message, tidied for a prompt: attached file paths become just the file name.
 *  @param {string} text */
function glTidyAsk(text){
  return text.replace(/@"([^"]+)"|@(\S+)/g, (_, a, b) => "[" + String(a || b).split("/").pop() + "]").replace(/\s+/g, " ").trim();
}

/** Write the next prompt from what the chat already says plus the user's answers to the questions.
 *  @param {{context: string, slots: {k: string, n: string, filled: boolean}[]}} read what readChat returned
 *  @param {Record<string, string>} answers slot key (or "focus") to the user's answer
 *  @param {string=} ask what the user wants now (defaults to the chat's latest ask) */
function glWritePrompt(read, answers, ask){
  const a = answers || {};
  const latest = (read.context.match(/^Latest ask: (.*)$/m) || [])[1] || "";
  const want = (ask || a.ask || latest).trim();
  let known = read.context.split("\n").filter(l => !l.startsWith("Latest ask: "));
  // 8.2: when there is a new ask, the chat's last message is background too, not something to drop
  if(latest && want && want !== latest.trim())
    known = known.some(l => l.startsWith("What I told you: ")) ? known.map(l => l.startsWith("What I told you: ") ? l + " / " + latest : l) : ["What I told you: " + latest, ...known];
  const extra = read.slots.filter(s => s.k !== "ask" && (a[s.k] || "").trim()).map(s => s.n + ": " + a[s.k].trim());
  // XML tags keep the chat's background apart from the instruction (Anthropic's and OpenAI's guides both advise it)
  const task = [a.focus && a.focus.trim() ? "Focus on: " + a.focus.trim() : "", want].filter(Boolean).join("\n");
  return [
    known.length ? "<context>\nFrom our chat so far:\n" + known.map(l => "- " + l).join("\n") + "\n</context>" : "",
    task ? "<task>\n" + task + "\n</task>" : "",
    extra.length ? "<details>\n" + extra.join("\n") + "\n</details>" : "",
    "If anything important is still unclear, ask me before you start."
  ].filter(Boolean).join("\n\n");
}

/** Read a chat: its main topics, groups, bridges, what is missing, and a short context block.
 *  @param {string | Turn[]} input @param {{budget?: number, topics?: number}=} opts */
function readChat(input, opts){
  const budget = (opts && opts.budget) || 120;
  const turns = glTurns(input);
  const g = glExtract(turns);
  const groups = glCluster(g);
  // main topics: graphify's rule (most connected), but what the USER says counts double,
  // because the AI's answers are long and would drown out what the chat is really about
  const weight = /** @param {string} id */ id => { const n = /** @type {GNode} */ (g.nodes.get(id)); return /** @type {Map<string, number>} */ (g.adj.get(id)).size * (1 + n.user / n.count); };
  const gods = glGodNodes(g, 1e9).map(x => ({...x, score: weight(x.id)}))
    .sort((a, b) => b.score - a.score || (a.id < b.id ? -1 : 1)).slice(0, (opts && opts.topics) || 6)
    .map(({id, label, degree}) => ({id, label, degree}));
  const lab = /** @param {string} id */ id => /** @type {GNode} */ (g.nodes.get(id)).label;
  // a topic is named after its most connected thing
  const topics = groups.filter(grp => grp.length >= 3).slice(0, 4).map(grp => {
    const top = grp.slice().sort((a, b) => weight(b) - weight(a) || (a < b ? -1 : 1));
    return {name: lab(top[0]), members: top.slice(0, 5).map(lab), size: grp.length};
  });
  const named = [...g.nodes.values()].filter(n => n.kind !== "word").sort((a, b) => b.count - a.count || (a.id < b.id ? -1 : 1));
  const limits = named.filter(n => n.kind === "constraint" && n.user > 0).map(n => n.label).slice(0, 4);
  const things = named.filter(n => ["file","code","name","quote"].includes(n.kind)).map(n => n.label).slice(0, 6);
  const slots = glSlots(turns);
  const lastUser = [...turns].reverse().find(t => t.role !== "assistant");
  // at most 3 questions, like the rest of Forge: which topic first (if the chat has several), then the gaps
  /** @type {{k: string, kind: string, q: string}[]} */
  const questions = [];
  if(topics.length >= 2)
    questions.push({k:"focus", kind:"focus", q:"This chat covers " + topics.slice(0, 3).map(t => t.name).join(", ") + ". Which one is the next prompt about?"});
  // subject and ask are left out: the next step always asks "What do you want now?" anyway
  for(const s of slots) if(!s.filled && s.k !== "subject" && s.k !== "ask" && questions.length < 3) questions.push({k:s.k, kind:"missing", q:s.q});
  // the context block, cut to the word budget: least important lines go first
  // 8.2: the context is what the person actually SAID (their earlier messages, tidied), not a list of
  // keywords. Judges in the stage 8 competition read "Main topics: league, draft, name" as noise.
  /** @param {string[]} ls */
  const count = ls => ls.join(" ").split(/\s+/).filter(Boolean).length;
  // 8.5.13: what the AI already worked out (the cause it found, the plan it gave) was lost, so the next prompt
  // started from zero. Its last answer's first sentences come along, kept short.
  const lastAi = [...turns].reverse().find(t => t.role === "assistant");
  const aiSaid = lastAi ? String(lastAi.text).replace(/\s+/g, " ").split(/(?<=[.!?])\s+/).filter(x => x.split(/\s+/).length > 3 && !/\?$/.test(x)).slice(0, 2).join(" ").split(/\s+/).slice(0, 35).join(" ") : "";
  const uniq = [...new Map(things.map(x => [String(x).toLowerCase().replace(/\W+$/, ""), x])).values()];
  const fixed = [
    aiSaid ? "What you said last: " + aiSaid : "",
    uniq.length ? "Named: " + uniq.join(", ") + "." : "",
    limits.length ? "Limits the user gave: " + limits.join(", ") + "." : "",
    lastUser ? "Latest ask: " + glLatestAsk(turns) : ""
  ].filter(Boolean);
  const earlier = turns.filter(t => t.role !== "assistant" && t !== lastUser).map(t => glTidyAsk(t.text));
  let room = budget - count(fixed) - 4;
  /** @type {string[]} */
  const said = [];
  for(const e of earlier){
    const w = e.split(/\s+/);
    if(room <= 3) break;
    said.push(w.length > room ? w.slice(0, room).join(" ") + "…" : e);
    room -= Math.min(w.length, room);
  }
  const lines = [said.length ? "What I told you: " + said.join(" / ") : "", ...fixed].filter(Boolean);
  while(lines.length > 1 && count(lines) > budget) lines.pop();
  if(count(lines) > budget) lines[0] = lines[0].split(/\s+/).slice(0, budget).join(" ") + "…";
  return {topics, main: gods, bridges: glBridges(g, 3), slots, questions, context: lines.join("\n"), graph: {nodes: g.nodes.size, links: [...g.adj.values()].reduce((a, m) => a + m.size, 0) / 2}};
}

export { GL_NOISE, GL_JSON_NOISE, GL_STOP, GL_VAGUE, GL_SLOTS, glStem, glVague, glParseChat, glTurns, glTidyAsk, glWritePrompt, glTerms, glExtract, glFromGraphify, glSkip, glGodNodes, glOneLevel, glLouvain, glCluster, glModularity, glBridges, glSlots, readChat, glFromJson, chatContext, CHAT_SUMMARY_ASK, glLatestAsk };
