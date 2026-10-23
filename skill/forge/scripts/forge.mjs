#!/usr/bin/env node
// Forge from the command line. Used by the Forge skill in Claude and ChatGPT when they can run code.
//
// The best way (8.12: Forge's brief + Claude writing scored 56% against a hard-trying Opus):
//   node forge.mjs --writer --model nanobanana --request "a cat leaping between rooftops at dusk"
//       prints Forge's brief for the writer (what this AI wants, settings, rules) and up to 3 questions
//       add --details "Light: neon signs" once the person has answered
//   node forge.mjs --check --model nanobanana --request "..." --prompt "the prompt you wrote"
//       Forge checks a written prompt: the person's words kept, no filler, nothing made up
//
// Forge's own rule-based version (exactly what the website gives):
//   node forge.mjs --list                                   every model id, by category
//   node forge.mjs --model midjourney --brief '{"subject":"a red fox","setting":"snowy forest"}'
//   node forge.mjs --model suno --text "chill lo-fi hip hop with piano, 80 bpm"   (like Prompt Doctor)
//
// Any text option can come from a file instead: --request-file, --details-file, --prompt-file, --text-file.
// Add --level basic|intermediate|pro, and --json for raw output.
//
// 10 Oct 2026: the skill no longer ships the auto-correct dictionary (words.js). In the skill the writer (Claude or
// ChatGPT) fixes spelling before passing the request, which it does better than a word list. Plain string joins
// instead of template strings, so security scanners can read this file in full.
import { readFileSync } from "node:fs";
import { MODELS, CATS, F, forge, forgeFromText, scoreText, writerBrief, checkWritten } from "./engine.js";
import * as E from "./engine.js";
import { checkPrompt } from "./check.js"; // 10.10: the same checker as the plugin (kept facts, real settings, nothing invented)

const args = process.argv.slice(2);
const opt = k => { const i = args.indexOf("--" + k); return i >= 0 ? args[i + 1] : undefined; };
const has = k => args.includes("--" + k);
const fail = msg => { console.error(msg); process.exit(1); };
/** a text option, straight or from --<name>-file */
const text = k => {
  // v1 step 14: "-" reads it from standard input, so a long prompt needs no temporary file (writing one is often blocked)
  if (opt(k) === "-") { try { return readFileSync(0, "utf8").trim(); } catch (e) { fail("Could not read --" + k + " from standard input: " + e.message); } }
  if (opt(k) !== undefined) return opt(k);
  const f = opt(k + "-file");
  if (f === undefined) return undefined;
  try { return readFileSync(f, "utf8").trim(); } catch (e) { fail("Could not read --" + k + "-file " + f + ": " + e.message); }
};
const json = has("json");
/** the score breakdown line, shared by --check and the plain run */
const parts = p => "covered " + p.covered + "/30, detail " + p.detail + "/20, fits " + p.fits + "/20, clear " + p.clear + "/15, lean " + p.lean + "/15";

if (has("list") || !args.length) {
  for (const c of CATS) console.log(c.n + ": " + MODELS.filter(m => m.cat === c.id).map(m => m.id).join(", "));
  process.exit(0);
}
const m = MODELS.find(x => x.id === opt("model"));
if (!m) fail("Unknown model \"" + opt("model") + "\". Run with --list to see every model id.");
const name = m.n + (m.sub ? " · " + m.sub : "");
const level = opt("level") || "pro";

// --writer and --check both start from what the person said (their request, plus answers to Forge's questions)
const asked = text("request") ?? text("text");
// 1.1.2: the same reading as the plugin. A pasted prompt to improve (Prompt Doctor) is the material, and the AI the request
// names as its target stays out of the subject
const doctor = asked && E.doctorPrompt ? E.doctorPrompt(asked) : null;
const request = asked && E.withoutAI ? E.withoutAI(doctor ? doctor.prompt : asked).text || asked : asked;
const details = text("details") || "";
const said = () => { if (!request || !request.trim()) fail("Give what the person asked with --request \"...\" (or --request-file path)."); return [request, details].filter(s => s && s.trim()).join("\n"); };
// 1.1 (G1): the same reading as the plugin. Each "Question: answer" line goes into its box; a line for no box goes to extra
const answers = {};
for (const line of details.split("\n").map(l => l.trim()).filter(Boolean)) {
  // 1.1.2: a label is followed by a space, and never splits a time ("starts at 7:30 pm") or a link ("https://...")
  const qa0 = line.match(/^([^:]{2,80}?):\s+(\S.*)$/), qa = qa0 && !(/\d$/.test(qa0[1]) && /^\d/.test(qa0[2])) ? qa0 : null, q = qa ? qa[1].trim().toLowerCase() : "";
  const k = qa ? Object.keys(F).find(f => f.toLowerCase() === q || F[f].l.toLowerCase() === q || String(E.QUESTIONS[f] || "").replace(/\?\s*$/, "").toLowerCase() === q) : undefined;
  const key = k || "extra", v = k ? qa[2].trim() : qa ? qa[2].trim() : line;
  answers[key] = answers[key] ? answers[key] + ". " + v : v;
}

if (has("writer")) {
  said(); // fails with a message when there is no request
  const res = forgeFromText(request, m, level, { answers, chat: true }); // 1.1 (G5): chat = no craft questions
  const brief0 = writerBrief({ m, request, details, answers, res, brief: res.mine || {} }); // 1.1 (G1): the person's own boxes; 1.1.1 G17 (item 3): lengths from the answers, not the questions
  const ask = (res.ask || []).slice(0, 3);
  const brief = doctor ? E.doctorNote(doctor.ask) + "\n\n" + brief0 : brief0; // 1.1.2: Prompt Doctor
  if (json) { console.log(JSON.stringify({ model: m.id, brief, ask, settings: res.settings, warn: res.warn, fixes: res.fixes, suggested: (res.suggested || []).map(s => s.what) }, null, 2)); process.exit(0); }
  const out = [brief];
  if (res.fixes && res.fixes.length) out.push("", "SPELLING FORGE FIXED (tell the person)", ...res.fixes.map(f => "- " + f.from + " → " + f.to));
  if (res.warn && res.warn.length) out.push("", "WATCH OUT (tell the person if it matters)", ...res.warn.map(w => "- " + w));
  // 1.1 G11: Claude may add its own questions when Forge gives fewer than 3 (1.1.1 G14: answers go back keyed by the question)
  out.push("", "QUESTIONS (suggestions, best first. Ask at most 3 in total, the ones whose answers would change the result most: drop any the request answers, replace or merge any (the first one too) with a sharper question about the same thing for this request, keeping its field for the answer and an open ending (...and anything else it must show, say or feel like?), never dropping the last open question or spending one on something the result does not depend on, and when there are fewer than 3, add your own about things only the person knows that the result depends on: names, exact words, numbers, what their own thing looks like, limits such as budget or time. Pass answers to your own as --details \"<your question>: ...\" (a line for no field goes to extra, added to what is there). If they want it now, skip them)");
  // 1.1 (G5): each question names its field, so the answer goes back into the right box (--details "imgtext: ...")
  out.push(...(ask.length ? ask.map((a, i) => (i + 1) + ". " + a.q + "  (field: " + a.f + (a.o && a.o.length >= 2 ? "; choices: " + a.o.slice(0, 4).join(" / ") : a.ph ? "; example: " + a.ph : "") + (a.why ? "; why: " + a.why : "") + ")") : ["- none from Forge: ask your own only if the result depends on something only the person knows"]));
  out.push("", "NEXT: write the prompt yourself following the RULES above, then run --check with it.");
  console.log(out.join("\n"));
  process.exit(0);
}

if (has("check")) {
  const all = said();
  const prompt = text("prompt");
  if (!prompt || !prompt.trim()) fail("Give the prompt to check with --prompt \"...\" (or --prompt-file path).");
  const negative = text("negative");
  const res = forgeFromText(request, m, level, { answers, chat: true }); // 1.1.2: the same reading as --writer and the plugin
  // 1.1 (G1): one reading of the request for the brief and the check (it read the request a second time, differently)
  const raw = negative !== undefined ? JSON.stringify({ prompt, negative }) : prompt;
  const c = checkWritten(raw, { m, request: all, brief: res.mine || {}, suggested: (res.suggested || []).map(s => s.f), res, fallback: false }); // 1.1 (G2): never Forge's version instead
  // 10.10: the plugin's checker too, so the skill and the plugin give the same verdict
  const full = checkPrompt(E, { m, request: all, said: all, answers, prompt: negative !== undefined ? "Prompt: " + prompt + "\nNegative: " + negative : prompt, res, written: writerBrief({ m, request, details, answers, res, brief: res.mine || {} }) });
  c.notes = [...full.problems.map(p => "Problem: " + p), ...(full.notes || [])];
  const ok = full.ok;
  const sc = scoreText(c.prompt, m);
  const v = { model: m.id, verdict: ok ? "pass" : "fail", prompt: c.prompt, negative: c.negative, notes: c.notes, score: sc.total, parts: sc.parts };
  if (json) { console.log(JSON.stringify(v, null, 2)); process.exit(0); }
  const out = ["# Forge check: " + name];
  out.push(ok ? "Verdict: PASS. Your prompt is kept (with any fixes below already applied)." : "Verdict: FAIL. Fix each problem below in your own prompt and check again.");
  out.push("Forge Score: " + sc.total + "/100  (" + parts(sc.parts) + ")");
  out.push("", "## Notes", "", ...c.notes.map(n => "- " + n));
  if (ok) {
    out.push("", "## Checked prompt", "", c.prompt);
    if (c.negative) out.push("", "## " + ((m.neg && m.neg.label) || "Negative prompt"), "", c.negative);
  }
  console.log(out.join("\n"));
  process.exit(0);
}

let res, before = null;
const t = text("text");
if (t !== undefined) { before = scoreText(t, m).total; res = forgeFromText(t, m, level); }
else {
  let brief; try { brief = JSON.parse(opt("brief") || "{}"); } catch (e) { fail("--brief must be JSON, like '{\"subject\":\"a red fox\"}'"); }
  const unknown = Object.keys(brief).filter(k => !F[k]); if (unknown.length) fail("Unknown box: " + unknown.join(", ") + ". " + m.id + " uses: " + [...m.core, ...m.craft, ...m.tech].join(", "));
  res = forge(brief, m, level);
}
if (json) { console.log(JSON.stringify(res, null, 2)); process.exit(0); }

const out = [];
out.push("# " + name + " (" + m.ver + ")");
out.push("Forge Score: " + (before !== null ? before + " before, " : "") + res.score + "/100  (" + parts(res.parts) + ")");
if (res.fixes && res.fixes.length) out.push("Fixed spelling: " + res.fixes.map(f => f.from + " → " + f.to).join(", "));
out.push("", "## The prompt", "", res.flat);
if (res.negative) out.push("", "## " + (m.neg.label || "Negative prompt"), "", res.negative);
if (res.settings.length) out.push("", "## Settings", "", ...res.settings.map(r => "- " + r[0] + ": " + r[1] + (r[2] ? " (" + r[2] + ")" : "")));
if (res.ask.length) out.push("", "## Ask the user (up to 3)", "", ...res.ask.map(a => "- " + a.q));
if (res.warn.length) out.push("", "## Watch out", "", ...res.warn.map(w => "- " + w));
if (res.cut.length) out.push("", "## Cut", "", ...res.cut.map(c => "- " + c.what + ": " + c.why));
if (res.suggested && res.suggested.length) out.push("", "## Forge suggested (not in the user's text, not scored)", "", ...res.suggested.map(s => "- " + s.what));
if (m.unverified && m.unverified.length) out.push("", "Not confirmed: " + m.unverified.join("; ") + ".");
if (m.sources) out.push("Sources (checked " + m.verifiedOn + "): " + m.sources.join(" "));
console.log(out.join("\n"));
