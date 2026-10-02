// forge_check: Forge reads the prompt Claude wrote and answers three questions.
//   1. Did it keep every fact the person gave (their request and their answers)?
//   2. Are its settings real for this AI (flags, aspect ratios, setting names Forge knows)?
//   3. Did it invent anything (names or numbers that appear nowhere in what the person said or Forge's brief)?
// It builds on the engine's checkWritten (filler, lost words, parameters, keep-outs) and adds the rest here,
// so engine.js stays untouched. Pure: no files, no network, nothing kept between calls.

/** Split "Prompt: ... Negative: ... Settings: ..." (the reply shape the brief asks for) into its parts.
 *  A plain prompt with no labels is all prompt. @param {string} raw */
export function splitReply(raw) {
  const text = String(raw || "").trim().replace(/^```[a-z]*\s*|\s*```$/g, "");
  const label = /^(Prompt|Negative(?: prompt)?|Keep-outs?|Settings)\s*:\s*/gim;
  const marks = [...text.matchAll(label)];
  if (!marks.length || !/^prompt$/i.test(marks[0][1])) return { prompt: text, negative: "", settings: "" };
  /** @type {Record<string, string>} */
  const out = { prompt: "", negative: "", settings: "" };
  marks.forEach((mk, i) => {
    const from = /** @type {number} */ (mk.index) + mk[0].length, to = i + 1 < marks.length ? marks[i + 1].index : text.length;
    const key = /^prompt/i.test(mk[1]) ? "prompt" : /^settings/i.test(mk[1]) ? "settings" : "negative";
    out[key] = (out[key] ? out[key] + "\n" : "") + text.slice(from, to).trim();
  });
  return { prompt: out.prompt, negative: out.negative, settings: out.settings };
}

const STOP = new Set("the and for with that this from your you are was were has have had not but all any can will into over under than then them they their there what when where which while who why how its it's our out off too very just also only more most some such each every about after before again".split(" "));
/** @param {string} w */
const stem = (w) => w.toLowerCase().replace(/'s$/, "").replace(/(ing|ed|es|s)$/, "");
/** @param {string} t */
const words = (t) => (String(t).toLowerCase().match(/[a-z0-9']{3,}/g) || []).filter((w) => !STOP.has(w));

/** --flags written anywhere in a text. @param {string} t */
const flagsIn = (t) => (String(t).match(/(?:^|\s)--[a-z][a-z0-9-]*/gi) || []).map((f) => f.trim().toLowerCase());

/**
 * @param {any} E the Forge engine
 * @param {{m: any, request: string, said: string, answers: Record<string, string>, prompt: string, res: any, written: string}} o
 * @returns {{ok: boolean, checks: {kept_facts: boolean, settings_real: boolean, nothing_invented: boolean}, problems: string[], notes?: string[], fixed_prompt?: string, negative?: string, forge_draft?: string}}
 */
export function checkPrompt(E, o) {
  const { m, res } = o, name = m.n + (m.sub ? " " + m.sub : "");
  const reply = splitReply(o.prompt);
  /** @type {{kept: string[], settings: string[], invented: string[], other: string[]}} */
  const P = { kept: [], settings: [], invented: [], other: [] };

  // --- the engine's own check (filler, the person's words, parameters, keep-outs) ---
  const fixed = E.autocorrect(o.said);
  const { brief, suggested } = E.rebuildBrief(fixed.text, m);
  const cw = E.checkWritten(JSON.stringify({ prompt: reply.prompt, negative: reply.negative }), { m, request: o.said, brief, suggested, res });
  if (cw.used === "forge") P.kept.push(String(cw.notes[0] || "").replace(/,? so this is Forge's version\.?$/, ". Rewrite it from the brief."));
  else for (const n of cw.notes) {
    if (/^Forge checked it/.test(n) || /^The AI added /.test(n)) continue; // numbers are checked below, against the whole brief
    if (/if (it|they) matters?\.?$/i.test(n)) P.other.push(n); // a soft hint, not a lost fact
    else if (/left out|put back/i.test(n)) P.kept.push(n);
    else if (/parameters/i.test(n)) P.settings.push(n);
    else P.other.push(n);
  }

  // --- 1. every answer the person gave is in the prompt (its content words, not the exact sentence) ---
  const have = new Set(words(reply.prompt + " " + reply.negative + " " + reply.settings).map(stem));
  for (const [k, v] of Object.entries(o.answers || {})) {
    const ws = words(String(v)).map(stem);
    if (ws.length && ws.filter((w) => have.has(w)).length / ws.length < 0.5)
      P.kept.push("Lost what the person answered: " + String(E.QUESTIONS[k] || k).replace(/\?\s*$/, "") + ": \"" + String(v).trim() + "\". Put it back.");
  }

  // --- 2. settings real for this AI ---
  const knowledge = JSON.stringify(m) + "\n" + String(res.flat || "") + "\n" + JSON.stringify(res.settings || []);
  const knownFlags = new Set(flagsIn(knowledge));
  const usedFlags = [...new Set(flagsIn(reply.prompt + " " + reply.settings))];
  let cleaned = cw.used === "ai" ? cw.prompt : reply.prompt;
  if (usedFlags.length && !knownFlags.size) {
    P.settings.push(name + " takes no --parameters: it would read " + usedFlags.join(", ") + " as words. Remove them; put settings under Settings instead.");
    cleaned = cleaned.replace(/\s--[a-z][a-z0-9-]*(?:\s+(?!--)[^\s-][^\s]*)?/gi, "").trim();
  } else {
    const odd = usedFlags.filter((f) => !knownFlags.has(f));
    if (odd.length) P.settings.push("Forge does not know " + odd.join(", ") + " for " + name + ". Check it is a real parameter, or remove it.");
  }
  if (Array.isArray(m.aspects) && m.aspects.length) {
    const ratios = [...(reply.prompt + " " + reply.settings).matchAll(/(?:--ar|--aspect|aspect(?: ratio)?)\s*[:=]?\s*(\d+(?:\.\d+)?:\d+(?:\.\d+)?)/gi)].map((x) => x[1]);
    const bad = ratios.filter((r) => !m.aspects.includes(r));
    if (bad.length) P.settings.push("Aspect ratio " + bad.join(", ") + " is not one " + name + " offers (" + m.aspects.join(", ") + ").");
  }
  if (reply.settings) {
    const knownNames = (res.settings || []).map((/** @type {any[]} */ r) => String(r[0]).toLowerCase());
    const low = knowledge.toLowerCase();
    for (const line of reply.settings.split(/\n|;\s*/)) {
      const nm = (line.replace(/^[-*\s]+/, "").match(/^([A-Za-z][A-Za-z /&-]{1,40}?)\s*[:=]/) || [])[1];
      if (nm && !knownNames.includes(nm.trim().toLowerCase()) && !low.includes(nm.trim().toLowerCase()))
        P.settings.push("Setting \"" + nm.trim() + "\" is not one Forge knows for " + name + ". Check it exists, or drop it.");
    }
  }

  // --- 3. nothing invented: names and numbers must come from the person or from Forge's brief ---
  const known = (o.written + "\n" + o.said + "\n" + knowledge).toLowerCase();
  // 10.10: camera and sound craft (35mm, f/2.8, 24fps, 4K, 3200K, 16:9, 120 BPM, 85mm) is the writer's job, not an invented fact
  const written = (reply.prompt + "\n" + reply.settings).replace(/\b\d+(?:\.\d+)?\s*(?:mm|fps|k|bpm|hz|khz|db)\b|\bf\/\d+(?:\.\d+)?|\b(?:1:1|4:5|5:4|2:3|3:2|3:4|4:3|9:16|16:9|21:9|9:21|1:2|2:1)\b/gi, " "); // only real aspect ratios: an invented time like 8:00 is still caught
  const nums = [...new Set((written.match(/\$?\d+(?:[.,:/]\d+)*%?/g) || []).filter((n) => !known.includes(n.toLowerCase().replace(/^\$/, ""))))];
  if (nums.length) P.invented.push("Numbers the person never gave and the brief does not hold: " + nums.slice(0, 5).join(", ") + ". Remove them, or ask the person.");
  const names = new Set();
  for (const sentence of written.split(/(?<=[.!?:])\s+|\n+/)) {
    const ws = sentence.trim().split(/\s+/).slice(1); // the first word of a sentence is capitalised anyway
    for (let i = 0; i < ws.length; i++) {
      const w = ws[i].replace(/^[("'“]+|[)"'”.,;!?]+$/g, "");
      if (!/^[A-Z][a-zA-Z'-]+$/.test(w)) continue;
      const lw = w.toLowerCase().replace(/'s$/, "");
      if (known.includes(lw) || (E.isWord && E.isWord(lw))) continue;
      names.add(w);
    }
  }
  if (names.size) P.invented.push("Names the person never gave: " + [...names].slice(0, 5).join(", ") + ". Remove them unless the person said them.");

  const problems = [...P.kept, ...P.settings, ...P.invented];
  /** @type {ReturnType<typeof checkPrompt>} */
  const out = {
    ok: problems.length === 0,
    checks: { kept_facts: !P.kept.length, settings_real: !P.settings.length, nothing_invented: !P.invented.length },
    problems,
  };
  if (P.other.length) out.notes = P.other; // worth a look, but not wrong
  if (cw.used === "ai" && cleaned.trim() !== reply.prompt.trim()) out.fixed_prompt = cleaned.trim();
  if (cw.used === "ai" && cw.negative && cw.negative !== reply.negative) out.negative = cw.negative;
  if (cw.used === "forge") out.forge_draft = res.flat;
  return out;
}
