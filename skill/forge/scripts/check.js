// forge_check: Forge reads the prompt Claude wrote and answers three questions.
//   1. Did it keep every fact the person gave (their request and their answers)?
//   2. Are its settings real for this AI (flags, aspect ratios, setting names Forge knows)?
//   3. Did it invent anything (a personal fact: a name, price, date, clock time, phone number, age or head count)?
// 1.1 (G2): only real mistakes fail. A problem is a missing fact of theirs, an invented personal fact, a flag or
// aspect this AI does not have, a length setting that misses the length they said or passes this AI's longest (G10),
// or delivery direction inside a spoken script. Everything else is a note. It never
// adds words to the prompt, and a fixed_prompt only takes things out, with Negative and Settings kept byte for byte
// (1.1.2: bar a shape or length the person stated, whose flag moves under Settings).
// It builds on the engine's checkWritten (filler, lost words, parameters, keep-outs). Pure: no files, no network.

/** Split "Prompt: ... Negative: ... Settings: ..." (the reply shape the brief asks for) into its parts.
 *  A plain prompt with no labels is all prompt. 1.1: with `loose` (picture, clip and sound AIs), a reply that starts
 *  with the prompt itself and ends with Negative or Settings lines is split too (the writer's Negative was ignored).
 *  @param {string} raw @param {boolean=} loose */
export function splitReply(raw, loose) {
  const text = String(raw || "").trim().replace(/^```[a-z]*\s*|\s*```$/g, "");
  const label = /^(Prompt|Negative(?: prompt)?|Keep-outs?|Settings)\s*:\s*/gim;
  const marks = [...text.matchAll(label)];
  const first = marks.length > 0 && /^prompt$/i.test(marks[0][1]);
  if (!marks.length || (!first && !(loose && Number(marks[0].index) > 0))) return { prompt: text, negative: "", settings: "" };
  /** @type {Record<string, string>} */
  const out = { prompt: first ? "" : text.slice(0, marks[0].index).trim(), negative: "", settings: "" };
  marks.forEach((mk, i) => {
    const from = /** @type {number} */ (mk.index) + mk[0].length, to = i + 1 < marks.length ? marks[i + 1].index : text.length;
    const key = /^prompt/i.test(mk[1]) ? "prompt" : /^settings/i.test(mk[1]) ? "settings" : "negative";
    out[key] = (out[key] ? out[key] + "\n" : "") + text.slice(from, to).trim();
  });
  return { prompt: out.prompt, negative: out.negative, settings: out.settings };
}

/** 1.1 G10: a length setting's value in seconds ("10s", "2 min", "1:30", "180000" under a name ending in ms), else 0.
 *  @param {string} name @param {string} raw */
function secondsOf(name, raw) {
  const r = String(raw).trim();
  if (!/^\d/.test(r)) return 0;
  if (/ms$/i.test(String(name).trim()) || /\d\s*ms\b/i.test(r)) return parseFloat(r) / 1000;
  const mmss = r.match(/^(\d{1,2}):([0-5]\d)\b/);
  if (mmss) return Number(mmss[1]) * 60 + Number(mmss[2]);
  return /^\d+(?:\.\d+)?\s*(?:m|min|mins|minutes?)\b/i.test(r) ? parseFloat(r) * 60 : parseFloat(r);
}

/** --flags written anywhere in a text. @param {string} t */
// v1 step 15: a flag inside Forge's own settings data is written "--raw" (in quotes), and was not learned, so Forge's own --raw was called unknown
const flagsIn = (t) => (String(t).match(/(?:^|[\s"'\[(,])--[a-z][a-z0-9-]*/gi) || []).map((f) => f.replace(/^[\s"'\[(,]+/, "").toLowerCase());
/** A setting's name as one run of letters and digits: "Generate audio", "generate_audio" and "generateAudio" match. @param {string} t */
const flat = (t) => String(t).toLowerCase().replace(/[^a-z0-9]/g, "");

const NUMBER_WORDS = /** @type {Record<string, number>} */ ({ zero: 0, oh: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90, hundred: 100, thousand: 1000 });
/** Every number a text holds, as values: "$2,800" is 2800, "5 percent" is 5, "five" is 5, "3k" is 3000. @param {string} t */
function numbersIn(t) {
  const s = String(t).toLowerCase(), out = new Set();
  for (const x of s.matchAll(/(\d{1,3}(?:,\d{3})+|\d+)(\.\d+)?(\s?k\b)?/g)) out.add(Number(x[1].replace(/,/g, "") + (x[2] || "")) * (x[3] ? 1000 : 1));
  for (const w of s.match(/[a-z]+/g) || []) if (w in NUMBER_WORDS) out.add(NUMBER_WORDS[w]);
  return out;
}
const MONTHS = "jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|june?|july?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?";
/** Personal facts written as numbers: prices, phone numbers, clock times, dates, ages, head counts. */
const PERSONAL = /** @type {[string, RegExp][]} */ ([
  ["price", /[$€£¥]\s?\d[\d,]*(?:\.\d+)?|\b\d[\d,]*(?:\.\d+)?\s?(?:dollars?|bucks|euros?|pounds?|usd|eur|gbp)\b/gi],
  ["phone", /(?<![\w.:\/-])(?:\+?1[\s.-])?(?:\(\d{3}\)\s?|\d{3}[\s.-])?\d{3}[\s.-]\d{4}(?![\w:\/]|[.-]\d)/g],
  ["time", /\b\d{1,2}(?::\d{2})?\s?(?:a\.?m\.?|p\.?m\.?)(?![a-z])|\b(?:at|by|from|until|till|before|after)\s+\d{1,2}:\d{2}\b/gi],
  ["date", new RegExp("\\b(?:" + MONTHS + ")\\.?\\s+\\d{1,2}(?:st|nd|rd|th)?\\b|\\b\\d{1,2}(?:st|nd|rd|th)?\\s+(?:of\\s+)?(?:" + MONTHS + ")\\b|\\b\\d{1,2}/\\d{1,2}/\\d{2,4}\\b|\\b\\d{4}-\\d{2}-\\d{2}\\b", "gi")],
  ["age", /\b\d{1,3}[-\s]years?[-\s]old\b|\baged?\s+\d{1,3}\b|\b\d{1,3}(?:st|nd|rd|th)\s+birthday\b/gi],
  ["count", /\b\d{1,4}\s+(?:people|persons|guests|kids|children|adults|friends|students|players|members|attendees|employees|staff|workers|volunteers)\b/gi],
]);

/** 1.1.2 (H4): one line without its --flags. A flag keeps its value when the value is a number or a ratio ("--ar 16:9",
 *  "--duration 10") or the last word before the line ends or the next flag ("--style raw --v 7"); a flag with no value
 *  never takes the next word ("--raw golden light" keeps "golden"). @param {string} line
 *  @returns {{text: string, flags: {flag: string, value: string}[]}} */
function dropFlags(line) {
  /** @type {{flag: string, value: string}[]} */ const flags = [];
  let out = "", last = 0;
  for (const x of line.matchAll(/(^|[ \t(,])--([a-z][a-z0-9-]*)(?![\w-])/gi)) {
    const at = /** @type {number} */ (x.index) + (/[ \t]/.test(x[1]) ? 0 : x[1].length);
    if (at < last) continue;
    let end = /** @type {number} */ (x.index) + x[0].length, value = "";
    const v = line.slice(end).match(/^[ \t]+([^\s,;]+)/);
    if (v && !/^--/.test(v[1]) && (/^\d/.test(v[1]) || /^[ \t]*(?:$|--|[,;])/.test(line.slice(end + v[0].length)))) { value = v[1]; end += v[0].length; }
    flags.push({ flag: x[2].toLowerCase(), value });
    out += line.slice(last, at); last = end;
  }
  if (!flags.length) return { text: line, flags };
  return { text: (out + line.slice(last)).replace(/[ \t]{2,}/g, " ").replace(/[ \t]+([.,;!?])/g, "$1").replace(/[ \t,]+$/, ""), flags };
}

/** 1.1.2 (H4): the prompt a fix may offer, which only takes things out: filler (as the engine cuts it) and, with `flags`,
 *  --flags. Never inside quotes; never filler out of sung lyrics (from the first [Section] line) or a spoken script; line
 *  breaks stay where they were. @param {any} E @param {string} prompt @param {{said: string, flags: boolean, lyrics: boolean, script: boolean}} o */
function fixText(E, prompt, o) {
  /** @type {string[]} */ const quotes = [];
  const masked = String(prompt).replace(/["“][^"”\n]*["”]/g, (q) => "\u0000" + (quotes.push(q) - 1) + "\u0000");
  const lines = masked.split("\n");
  let sung = o.script; // a spoken script is all words to say
  /** @type {{flag: string, value: string}[]} */ const flags = [];
  const out = lines.map((line) => {
    if (o.lyrics && /^\s*\[[^\]\n]+\]\s*$/.test(line)) sung = true;
    let t = line;
    if (o.flags) { const d = dropFlags(t); t = d.text; flags.push(...d.flags); }
    if (!sung) { const c = E.stripBanned(t, o.said); if (c.removed.length) t = String(c.text).replace(/[ \t,]+([.!?])/g, "$1").replace(/,[ \t]*,/g, ",").replace(/[ \t,]+$/, ""); }
    return t;
  });
  return { text: out.join("\n").replace(/\u0000(\d+)\u0000/g, (_, i) => quotes[Number(i)]), flags };
}

/** 1.1.2 (H4): a fix is offered only when it kept every quoted part, every fact of the person's and every number of the
 *  original (bar the filler and flags it was allowed to take out, unless the person said that number).
 *  @param {any} E @param {any} res @param {string} said @param {string} before @param {string} after @param {string[]} values */
function survives(E, res, said, before, after, values) {
  for (const q of before.match(/["“][^"”\n]*["”]/g) || []) if (!after.includes(q)) return false;
  for (const f of res.facts || []) if (E.factIn(f, before) && !E.factIn(f, after)) return false;
  const theirs = numbersIn(said), have = numbersIn(after);
  const prose = E.stripBanned(before.split("\n").map((l) => dropFlags(l).text).join("\n")).text;
  for (const n of numbersIn(prose)) if (!have.has(n)) return false;
  for (const n of numbersIn(values.join(" "))) if (theirs.has(n) && !have.has(n)) return false;
  return true;
}

/** 1.1.2 (H4): a flag value the person stated (a shape, a length) moves under Settings, by this AI's own setting name, when
 *  the fixed prompt would lose it. Returns the Settings lines to add, or null when one has nowhere to go.
 *  @param {{flag: string, value: string}[]} flags @param {any[]} rows @param {string} said @param {string} kept */
function movedFlags(flags, rows, said, kept) {
  const theirs = numbersIn(said), low = said.toLowerCase();
  /** @type {string[]} */ const lines = [];
  for (const { flag, value } of flags) {
    if (!value) continue;
    const stated = [...numbersIn(value)].some((n) => theirs.has(n)) || low.includes(value.toLowerCase());
    if (!stated || kept.toLowerCase().includes(value.toLowerCase())) continue; // the writer's own value, or still there
    const want = /^(?:ar|aspect|aspect-?ratio|ratio)$/.test(flag) ? /(?:^|[^a-z])(?:aspect|ratio|size)(?![a-z])/i : /^(?:duration|length|len|seconds|secs?|d|time)$/.test(flag) ? /(?:^|[^a-z])(?:duration|length|seconds)(?![a-z])/i : null;
    const row = (rows || []).find((/** @type {any[]} */ r) => (want ? want.test(String(r[0])) : flat(r[0]) === flat(flag)));
    if (!row) return null;
    lines.push(String(row[0]) + ": " + value);
  }
  return lines;
}

/**
 * @param {any} E the Forge engine
 * @param {{m: any, request: string, said: string, answers: Record<string, string>, prompt: string, res: any, written: string}} o
 * @returns {{ok: boolean, checks: {kept_facts: boolean, settings_real: boolean, nothing_invented: boolean}, problems: string[], notes?: string[], fixed_prompt?: string, negative?: string}}
 */
export function checkPrompt(E, o) {
  const { m, res } = o, name = m.n + (m.sub ? " " + m.sub : ""), kind = String(m.cat);
  const media = ["image", "video", "voice", "sfx", "music"].includes(kind);
  const whole = String(o.prompt || "").trim().replace(/^```[a-z]*\s*|\s*```$/g, "");
  const reply = splitReply(whole, media);
  /** @type {{kept: string[], settings: string[], invented: string[], other: string[]}} */
  const P = { kept: [], settings: [], invented: [], other: [] };

  // --- the engine's own check (chat talk, filler, the person's words, keep-outs): problems or notes, never a swap ---
  // 11.4: "Subject:", "Action:", "Light and mood:" are labels in Claude's picture description, not words to keep
  // v1 bug hunt: "Use the forge skill: write a prompt for midjourney, ..." is the instruction, not words the prompt must keep
  // 1.1 (G2): their own spelling, not a spell-fixed second reading; the boxes are the brief's own (res.mine)
  // 1.1.1 G13 (item 1): nor is "write a cook prompt for claude code:" for a coding agent (the TASK drops it too);
  // 1.1.1 G14 (item 1): nor for a chat, research or app job, nor "..., write the prompt" at the end
  const framed = Array.isArray(E.FRAMED_KINDS) ? E.FRAMED_KINDS.includes(kind) : kind === "code";
  const asked = framed && typeof E.stripFraming === "function" ? E.stripFraming(String(o.said || "")) : String(o.said || "");
  const said = (E.stripAsk ? E.stripAsk(asked) : asked).replace(/(^|[\n.;]\s*)[A-Z][A-Za-z]{2,15}(?: (?:and |& )?[a-z]{2,10})?:[ \t]+/g, "$1");
  const brief = res.mine || {}, suggested = (res.suggested || []).map((/** @type {any} */ s) => String(s.f));
  const cw = E.checkWritten(JSON.stringify({ prompt: reply.prompt, negative: reply.negative }), { m, request: said, brief, suggested, res, fallback: false, settings: reply.settings });
  for (const p of cw.problems || []) (/empty/.test(p) ? P.kept : P.invented).push(p);
  for (const n of cw.notes) {
    if (/^Forge checked it/.test(n) || /^The AI added /.test(n)) continue; // numbers are checked below, against the whole brief
    P.other.push(/^Forge cut filler/i.test(n) ? n.replace(/^Forge cut filler the AI added/i, "Filler that steers nothing").replace(/[.\s]*$/, "") + "." : n);
  }

  // --- 1. the person's facts (the ledger, res.facts): a hard one left out fails by name, a soft one is a note ---
  for (const f of res.facts || []) {
    if (E.factIn(f, whole)) continue;
    if (f.hard && f.kind === "keepout" && f.loose) P.kept.push("Brings in what the person ruled out: \"" + f.a + "\". Keep it out, or say it is kept out."); // 1.1.2 H1
    else if (f.hard) P.kept.push("Leaves out what the person gave: \"" + f.a + "\". Put it in" + (f.kind === "quote" ? ", word for word" : ["phone", "price", "date", "time"].includes(f.kind) ? " (in digits or in words)" : "") + ".");
    else P.other.push("Their detail \"" + f.a + "\" is not in these words (fine if you said it another way).");
  }

  // --- 2. settings real for this AI ---
  const knowledge = JSON.stringify(m) + "\n" + String(res.flat || "") + "\n" + JSON.stringify(res.settings || []) + "\n" + String(o.written || "");
  const knownFlags = new Set(flagsIn(knowledge));
  // 11.4: the keep-out flag lives in m.neg.label ("--no"), which the text scan above cannot see inside the JSON
  for (const f of flagsIn(" " + String((m.neg && m.neg.label) || "") + " " + String((m.neg && m.neg.note) || ""))) knownFlags.add(f);
  // 1.1 (a14): in code, app and text prompts a --flag belongs to the job (--dry-run), not to the AI
  const usedFlags = ["code", "app", "text"].includes(kind) ? [] : [...new Set(flagsIn(reply.prompt + " " + reply.settings))];
  // what a fixed prompt may take out of their prompt: the filler (as the engine cut it) and flags this AI does not take
  // 1.1.2 (H4): only removes, and never damages: quotes, lyrics, scripts and line breaks stay as written, flags keep their values
  const noFlags = usedFlags.length > 0 && !knownFlags.size;
  const fix = fixText(E, reply.prompt, { said, flags: noFlags, lyrics: kind === "music", script: (m.core || []).includes("script") });
  let cleaned = fix.text, fixable = true;
  if (noFlags) {
    P.settings.push(name + " takes no --parameters: it would read " + usedFlags.join(", ") + " as words. Remove them; put settings under Settings instead.");
    if (flagsIn(" " + reply.settings).length) fixable = false; // Settings stay exactly as written
  } else {
    const odd = usedFlags.filter((f) => !knownFlags.has(f));
    if (odd.length) P.other.push("Forge does not know " + odd.join(", ") + " for " + name + ": check it is a real parameter.");
  }
  if (Array.isArray(m.aspects) && m.aspects.length) {
    const ratiosIn = (/** @type {string} */ t) => [...t.matchAll(/(?:--ar|--aspect|aspect(?:[ _]?ratio)?)\s*[:=]?\s*(\d+(?:\.\d+)?:\d+(?:\.\d+)?)/gi)].map((x) => x[1]).filter((r) => !m.aspects.includes(r));
    // 1.1.2 H3: a shape the person asked for is their fact, never a failure ("a 4:3 photo" with --ar 4:3)
    const theirs = (String(o.said || "").match(/\b\d+(?:\.\d+)?\s*:\s*\d+(?:\.\d+)?\b/g) || []).map((r) => r.replace(/\s+/g, ""));
    const bad = ratiosIn(reply.prompt + " " + reply.settings).filter((r) => !theirs.includes(r));
    if (bad.length) { P.settings.push("Aspect ratio " + bad.join(", ") + " is not one " + name + " offers (" + m.aspects.join(", ") + ")."); if (ratiosIn(cleaned + " " + reply.settings).length) fixable = false; }
  }
  // 1.1 G10: the one length they said (two lengths, an intro and an outro, decide nothing) and this AI's longest
  const lengthSaid = String(o.said || ""), lengthMentions = (lengthSaid.match(/\b\d+(?:\.\d+)?[\s-]*(?:sec|secs|seconds?|min|mins|minutes?)\b|\b\d{1,2}:[0-5]\d\b/gi) || []).length;
  const lengths = ["music", "video", "sfx"].includes(kind) && typeof E.saidSeconds === "function"
    ? { asked: lengthMentions > 1 ? 0 : E.saidSeconds(lengthSaid), max: E.maxSeconds(m), clips: (Array.isArray(m.durations) ? m.durations : []).map((/** @type {string} */ d) => parseInt(String(d), 10) || 0).filter(Boolean),
        range: typeof E.saidRange === "function" ? E.saidRange(lengthSaid) : null } // 1.1.1 G15: "10 to 12 seconds" is the whole range, not its top
    : null;
  if (reply.settings) {
    // 1.1 (a4, a5): names compared as one run of letters ("generateAudio" is "Generate audio"), also against the brief;
    // a name Forge does not know is a note, and a value is checked against the setting's range, not the person's words
    // 1.1 G11 (item 19): a video AI whose catalogue starts from a picture takes a start frame, whatever the request said
    const knownNames = flat(knowledge) + (typeof E.hasI2V === "function" && E.hasI2V(m) ? " startframe startingimage startimage firstframe inputimage referenceimage referenceimages" : "");
    for (const line of reply.settings.split(/\n|;\s*/)) {
      const kv = line.replace(/^[-*\s]+/, "").match(/^([A-Za-z][A-Za-z0-9 _/&.()-]{1,40}?)\s*[:=]\s*(.*)$/);
      if (!kv) continue;
      if (/\d$/.test(kv[1]) && /^[0-5]\d\b/.test(kv[2])) continue; // 1.1.1 G15: "cut it at 0:45" is a time in a note, not a setting called "cut it at 0"
      if (!knownNames.includes(flat(kv[1]))) { P.other.push("Setting \"" + kv[1].trim() + "\" is not one Forge knows for " + name + ": check it exists."); continue; }
      const row = (res.settings || []).find((/** @type {any[]} */ r) => flat(r[0]) === flat(kv[1]));
      const range = row && String(row[2] || "").match(/(\d+(?:\.\d+)?)\s*[–-]\s*(\d+(?:\.\d+)?)/), v = Number((kv[2].match(/^-?\d+(?:\.\d+)?/) || [])[0]);
      if (range && /^-?\d/.test(kv[2]) && (v < Number(range[1]) || v > Number(range[2]))) P.other.push(kv[1].trim() + " " + v + " is outside its range (" + range[1] + " to " + range[2] + ").");
      // 1.1 G10 (d046, d053): a length setting is the length they asked for, up to the longest this AI makes
      if (lengths && /length|duration|seconds/i.test(kv[1])) {
        const got = secondsOf(kv[1], kv[2]);
        // 1.1.2 H6: a length they asked for is set, never left to the AI ("duration_seconds: leave unset" for "4 seconds")
        if (!got && lengths.asked && !lengths.range && !/\d/.test(kv[2])) { P.settings.push(kv[1].trim() + " " + kv[2].trim() + " does not set the " + E.lengthWords(lengths.max && lengths.asked > lengths.max ? lengths.max : lengths.asked) + " they asked for. Set it."); continue; }
        if (!got) continue;
        const want = lengths.max && lengths.asked > lengths.max ? lengths.max : lengths.asked;
        const nearest = lengths.clips.length ? lengths.clips.reduce((a, c) => (Math.abs(c - want) < Math.abs(a - want) ? c : a), lengths.clips[0]) : 0;
        // 1.1.2 H3: the length the person asked for is theirs: over this AI's longest, it is a note, never a failure
        if (lengths.max && got > lengths.max + 0.5 && lengths.asked && Math.abs(got - lengths.asked) <= 0.5) P.other.push(kv[1].trim() + " " + kv[2].trim() + " is what they asked for, but " + name + " makes at most " + E.lengthWords(lengths.max) + " per clip: say so, or plan it in parts.");
        else if (lengths.max && got > lengths.max + 0.5) P.settings.push(kv[1].trim() + " " + kv[2].trim() + " is longer than " + name + " makes (at most " + E.lengthWords(lengths.max) + "). Set " + E.lengthWords(lengths.max) + " or less.");
        else if (lengths.range && got >= lengths.range.lo - 0.5 && got <= lengths.range.hi + 0.5) continue; // inside the range they gave
        else if (want && Math.abs(got - want) > Math.max(2, want * 0.15) && got !== nearest) P.settings.push(kv[1].trim() + " " + kv[2].trim() + " does not match the " + E.lengthWords(lengths.asked) + " they asked for" + (want < lengths.asked ? " (" + name + " makes at most " + E.lengthWords(want) + ", so set that)" : "") + ".");
      }
    }
  }

  // --- 3. nothing invented: personal facts must come from the person or from Forge's brief ---
  // Settings lines hold the writer's own values (sliders, lengths in ms), so only the prompt is read here
  const knownText = String(o.said || "") + "\n" + String(o.written || "");
  const knownNums = numbersIn(knownText), knownLow = knownText.toLowerCase();
  // 1.1.2 H3: number words are their digits ("two hundred dollars" is $200, "a dozen" is 12, "twenty-first" is 21st)
  if (typeof E.factWords === "function") for (const n of numbersIn(E.factWords(knownText))) knownNums.add(n);
  const knownDigits = (knownText.replace(/(\d)[\s.()-]+(?=\(?\d)/g, "$1").match(/\d+/g) || []).join(" ");
  const prompt = reply.prompt.replace(/`[^`]*`/g, " ").replace(/--[a-z][\w-]*(?:\s+[\w.:]+)?/gi, " ");
  /** @type {string[]} */ const madeUp = [];
  const month = (/** @type {string} */ f) => (f.toLowerCase().match(/[a-z]{3}/) || [""])[0];
  // 1.1.1 G16 (item 31): an amount or a time the prompt says it assumes, or gives as an example (rule 6 asks the writer to
  // assume and say so), is no invented fact: "assume $500", "for example 7 pm", "say, 3 kids"
  // 1.1.2 H3: "like" and "if you" label an example only right before it ("like 7 pm"); "feels like a carnival ... Saturday
  // June 14 at 3pm" invents a date
  const labelled = (/** @type {number} */ at) => /\b(?:assum\w*|for example|for instance|e\.g\.?|example|such as|let'?s say|say,|suppose|supposing|hypothetical\w*|sample|placeholder)\b[^.!?\n]{0,60}$/i.test(prompt.slice(Math.max(0, at - 80), at))
    || /\b(?:if (?:you|they|it|the)|like)\b[^.!?\n]{0,12}$/i.test(prompt.slice(Math.max(0, at - 30), at));
  if (kind !== "code") {
    for (const [what, re] of PERSONAL) for (const x of prompt.matchAll(re)) {
      const fact = x[0].trim();
      if (labelled(x.index || 0)) continue;
      const ok = what === "phone" ? knownDigits.includes(fact.replace(/\D/g, ""))
        : [...numbersIn(fact)].every((n) => n === 0 || knownNums.has(n)) && (what !== "date" || !month(fact) || knownLow.includes(month(fact)));
      if (!ok && !madeUp.includes(fact)) madeUp.push(fact);
    }
  } else for (const x of prompt.matchAll(PERSONAL[1][1])) if (!knownDigits.includes(x[0].replace(/\D/g, ""))) madeUp.push(x[0].trim()); // code: a phone number only (test values are its own)
  if (madeUp.length) P.invented.push("Personal facts the person never gave: " + madeUp.slice(0, 5).join(", ") + ". Remove them, or ask the person.");
  // other numbers are the writer's own choices (a length, a size, a step count): a note at most
  const known = (knownText + "\n" + knowledge).toLowerCase();
  // 1.1.1 G16 (item 15): a list number ("7." at the start of a line) and a number in a labelled example are the writer's own
  const others = [...new Set([...prompt.matchAll(/(?<![\w.#-])\d[\d,]*(?:\.\d+)?%?(?![\w-])/g)].filter((x) => !/(?:^|\n)\s*$/.test(prompt.slice(0, x.index || 0)) && !labelled(x.index || 0)).map((x) => x[0]).filter((n) => ![...numbersIn(n)].every((v) => knownNums.has(v)) && !madeUp.some((f) => f.includes(n)) && !known.includes(n.toLowerCase())))];
  if (others.length && kind !== "code") P.other.push("Numbers Forge cannot trace to the person or the brief (fine if you chose them): " + others.slice(0, 5).join(", ") + ".");

  // 1.1 (a8): names count only where a made-up one would be printed, spoken or sung, and in chat and app prompts
  const quoted = (reply.prompt.match(/["“][^"”]+["”]/g) || []).join("\n");
  const lyrics = kind === "music" ? reply.prompt.split(/^\s*\[[^\]\n]+\]\s*$/m).slice(1).join("\n") : "";
  const scan = ["text", "app", "research", "voice"].includes(kind) ? prompt : kind === "code" ? "" : quoted + "\n" + lyrics.replace(/`[^`]*`/g, " ");
  const names = new Set(), styles = new Set();
  for (const sentence of scan.split(/(?<=[.!?:])\s+|\n+/)) {
    const ws = sentence.trim().split(/\s+/);
    for (let i = 1; i < ws.length; i++) { // the first word of a sentence or a line is capitalised anyway
      const w = ws[i].replace(/^[("'“‘]+|[)"'”’.,;!?]+$/g, "");
      if (!/^[A-Z][a-zA-Z'’-]+$/.test(w)) continue;
      if (/['’](?:m|d|re|ve|ll|t)$/i.test(w)) continue; // I'm, I'd, We're, You've, Don't
      if (/^[A-Z][A-Z0-9]+s?$/.test(w) || /[a-z][A-Z]/.test(w) || /-/.test(w)) continue; // EXIF, JPGs, RunAtLoad, CSS-in-JS, Part-time
      const lw = w.toLowerCase().replace(/['’]s$/, "");
      if (/^(?:mon|tue|tues|wed|wednes|thu|thur|thurs|fri|sat|satur|sun)(?:day)?s?$/i.test(lw) || new RegExp("^(?:" + MONTHS + ")$", "i").test(lw)) continue; // days, Saturdays, months
      if (known.includes(lw) || (E.isWord && E.isWord(lw))) continue;
      // 1.1.2 H3: a named technique, law or method ("the Feynman technique", "Pomodoro method") and a place after a place word
      // ("a walk in Trastevere", "dinner near Shibuya") are things the person can look up, not invented people
      if (/^(?:technique|method|principle|effect|theorem|law|rule|test|scale|model|approach|system|matrix|diagram|curve|equation|paradox|experiment|cycle|index|formula|protocol)s?$/i.test((ws[i + 1] || "").replace(/[^A-Za-z]/g, ""))) continue;
      if (/^(?:in|at|near|around|through|across|from|visit|visiting|explore|exploring|towards|toward|via)$/i.test((ws[i - 1] || "").replace(/[^A-Za-z]/g, ""))) continue;
      // 1.1 G11 (item 21): a well-known name from the set the request is about (the planets, countries, landmarks...)
      if (typeof E.commonName === "function" && E.commonName(lw, String(o.said || "") + "\n" + String(o.request || ""))) continue;
      if (/\b(?:style of|inspired by|in the manner of|reminiscent of|like|à la)\s+(?:\S+\s+){0,2}$/i.test(ws.slice(Math.max(0, i - 4), i).join(" ") + " ")) styles.add(w);
      else names.add(w);
    }
  }
  if (names.size) P.invented.push("Names the person never gave: " + [...names].slice(0, 5).join(", ") + ". Remove them unless the person said them.");
  if (styles.size) P.other.push("A style reference the person never named: " + [...styles].slice(0, 3).join(", ") + ". Fine if it fits.");
  // 12.2: "my dog" in a picture or video prompt: the AI can't know the person's dog (1.1 a9: quoted words are theirs to print)
  if (["image", "video"].includes(kind)) { const mine = E.notMine(reply.prompt.replace(/["“][^"”]*["”]/g, " ")).found; if (mine.length) P.other.push("Says \"" + mine[0] + "\": " + name + " can't know whose it is. \"" + E.notMine(mine[0].toLowerCase()).text + "\" and a short description work better."); }

  // v1 step 14: a voice that reads the prompt aloud would speak a delivery-direction paragraph at the top of the script
  if ((m.core || []).includes("script")) {
    const spoken = String(reply.prompt || "").split("\n").filter((l) => !/^\s*(settings|voice direction|voice|model|stability|speed|negative)\s*:/i.test(l)).join("\n").trim();
    const paras = spoken.split(/\n\s*\n/), first = paras[0] || "";
    // direction words only (not "voice", "warm", "calm": a story can say those), and only above the actual script
    const cues = (first.match(/\b(reads?|delivery|pace[sd]?|pacing|announcer|broadcast|cadence|reverb|enunciat\w*|spoken to|smile in the voice|narration style|voice direction)\b/gi) || []).length;
    if (paras.length > 1 && cues >= 2 && !/["“]/.test(first)) { P.settings.push("The first lines read like delivery direction (" + first.slice(0, 60).trim() + "...): " + name + " would say them out loud. Move them under Settings as Voice, or into audio tags where this AI supports them, and keep only the spoken words in the prompt."); fixable = false; }
    // 1.1.2 H6: the request's own description of the read ("a voicemail greeting, calm woman") is never spoken, and the exact
    // script they gave is said with nothing added (tags and the delivery set aside)
    const wordsOf = (/** @type {string} */ t) => String(t || "").replace(/\[[^\]\n]*\]|<[^>\n]*>/g, " ").toLowerCase().match(/[\p{L}\p{N}']+/gu) || [];
    const said = wordsOf(spoken), sayStr = " " + said.join(" ") + " ", theirs = wordsOf(String(brief.script || ""));
    const desc = typeof E.readDescription === "function" ? wordsOf(E.readDescription(String(o.request || ""), brief.script)) : [];
    const span = Math.min(4, desc.length), scriptStr = " " + theirs.join(" ") + " ";
    let aloud = false;
    for (let i = 0; span >= 2 && i + span <= desc.length; i++) {
      const w = " " + desc.slice(i, i + span).join(" ") + " ";
      if (sayStr.includes(w) && !scriptStr.includes(w)) { P.settings.push(name + " would read the request's own description aloud (\"" + desc.join(" ") + "\"): keep only the words to say in the prompt, and put the voice under Settings."); aloud = true; break; }
    }
    if (!aloud && typeof E.wholeScript === "function" && E.wholeScript(String(o.request || ""), brief.script, String(o.said || ""), m)) {
      /** @type {Map<string, number>} */ const left = new Map();
      for (const w of theirs) left.set(w, (left.get(w) || 0) + 1);
      const added = said.filter((w) => { const n = left.get(w) || 0; if (n > 0) { left.set(w, n - 1); return false; } return true; });
      if (added.length >= 3 && added.length > theirs.length * 0.2) P.kept.push("Adds words to the script they gave (\"" + added.slice(0, 8).join(" ") + (added.length > 8 ? " ..." : "") + "\"): " + name + " would say them. Keep their words exactly, with nothing added.");
    }
  }
  const problems = [...P.kept, ...P.settings, ...P.invented];
  /** @type {ReturnType<typeof checkPrompt>} */
  const out = {
    ok: problems.length === 0,
    checks: { kept_facts: !P.kept.length, settings_real: !P.settings.length, nothing_invented: !P.invented.length },
    problems,
  };
  if (P.other.length) out.notes = P.other; // worth a look, but not wrong
  // 1.1 (G2.7): a fixed prompt only takes things out, and is the whole reply: Negative and Settings exactly as written
  // 1.1.2 (H4): bar a shape or length the person stated, which moves under Settings (added after what is there) when its
  // flag goes; and only when every quote, fact and number of the original survives
  const at = whole.indexOf(reply.prompt);
  const add = movedFlags(fix.flags, res.settings || [], String(o.said || ""), cleaned + "\n" + reply.settings + "\n" + reply.negative);
  if (!out.ok && fixable && add && !P.kept.length && !P.invented.length && at >= 0 && cleaned.trim() && cleaned.trim() !== reply.prompt.trim()) {
    let fixed = whole.slice(0, at) + cleaned.trim() + whole.slice(at + reply.prompt.length);
    if (add.length) {
      const marks = [...fixed.matchAll(/^Settings\s*:/gim)], lastMark = marks[marks.length - 1];
      if (!lastMark) fixed = fixed.replace(/\s*$/, "") + "\nSettings: " + add.join("; ");
      else {
        const from = /** @type {number} */ (lastMark.index) + lastMark[0].length;
        const next = fixed.slice(from).search(/^(?:Prompt|Negative(?: prompt)?|Keep-outs?)\s*:/im), end = next < 0 ? fixed.length : from + next;
        fixed = fixed.slice(0, end).replace(/\s*$/, "") + "\n" + add.join("\n") + (end < fixed.length ? "\n" + fixed.slice(end) : "");
      }
    }
    if (survives(E, res, String(o.said || ""), whole, fixed, fix.flags.map((f) => f.value))) out.fixed_prompt = fixed;
  }
  if (cw.negative && /took out keep-outs/.test(cw.notes.join(" "))) out.negative = cw.negative;
  return out;
}
