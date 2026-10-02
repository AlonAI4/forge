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
import "./words.js";
import { readFileSync } from "node:fs";
import { MODELS, CATS, F, forge, forgeFromText, scoreText, writerBrief, checkWritten, rebuildBrief, autocorrect } from "./engine.js";
import * as E from "./engine.js";
import { checkPrompt } from "./check.js"; // 10.10: the same checker as the plugin (kept facts, real settings, nothing invented)

const args = process.argv.slice(2);
const opt = k => { const i = args.indexOf("--" + k); return i >= 0 ? args[i + 1] : undefined; };
const has = k => args.includes("--" + k);
const fail = msg => { console.error(msg); process.exit(1); };
/** a text option, straight or from --<name>-file */
const text = k => {
  if (opt(k) !== undefined) return opt(k);
  const f = opt(k + "-file");
  if (f === undefined) return undefined;
  try { return readFileSync(f, "utf8").trim(); } catch (e) { fail(`Could not read --${k}-file ${f}: ${e.message}`); }
};
const json = has("json");

if (has("list") || !args.length) {
  for (const c of CATS) console.log(`${c.n}: ` + MODELS.filter(m => m.cat === c.id).map(m => m.id).join(", "));
  process.exit(0);
}
const m = MODELS.find(x => x.id === opt("model"));
if (!m) fail(`Unknown model "${opt("model")}". Run with --list to see every model id.`);
const name = m.n + (m.sub ? " · " + m.sub : "");
const level = opt("level") || "pro";

// --writer and --check both start from what the person said (their request, plus answers to Forge's questions)
const request = text("request") ?? text("text");
const details = text("details") || "";
const said = () => { if (!request || !request.trim()) fail("Give what the person asked with --request \"...\" (or --request-file path)."); return [request, details].filter(s => s && s.trim()).join("\n"); };

if (has("writer")) {
  const res = forgeFromText(said(), m, level);
  const brief = writerBrief({ m, request, details, res, brief: {} });
  const ask = (res.ask || []).slice(0, 3);
  if (json) { console.log(JSON.stringify({ model: m.id, brief, ask, settings: res.settings, warn: res.warn, fixes: res.fixes, suggested: (res.suggested || []).map(s => s.what) }, null, 2)); process.exit(0); }
  const out = [brief];
  if (res.fixes && res.fixes.length) out.push("", "SPELLING FORGE FIXED (tell the person)", ...res.fixes.map(f => `- ${f.from} → ${f.to}`));
  if (res.warn && res.warn.length) out.push("", "WATCH OUT (tell the person if it matters)", ...res.warn.map(w => `- ${w}`));
  out.push("", "QUESTIONS (ask at most these 3, only the ones the person has not answered and that change the result; if they want it now, skip them)");
  out.push(...(ask.length ? ask.map((a, i) => `${i + 1}. ${a.q}${a.why ? "  (why: " + a.why + ")" : ""}`) : ["- none: Forge has what it needs"]));
  out.push("", "NEXT: write the prompt yourself following the RULES above, then run --check with it.");
  console.log(out.join("\n"));
  process.exit(0);
}

if (has("check")) {
  const all = said();
  const prompt = text("prompt");
  if (!prompt || !prompt.trim()) fail("Give the prompt to check with --prompt \"...\" (or --prompt-file path).");
  const negative = text("negative");
  const res = forgeFromText(all, m, level);
  const { brief, suggested } = rebuildBrief(autocorrect(all).text, m);
  const raw = negative !== undefined ? JSON.stringify({ prompt, negative }) : prompt;
  const c = checkWritten(raw, { m, request: all, brief, suggested, res });
  // 10.10: the plugin's checker too, so the skill and the plugin give the same verdict
  const full = checkPrompt(E, { m, request: all, said: all, answers: {}, prompt: negative !== undefined ? "Prompt: " + prompt + "\nNegative: " + negative : prompt, res, written: writerBrief({ m, request: all, res, brief: {} }) });
  if (!full.ok) c.notes = [...full.problems.map(p => "Problem: " + p), ...c.notes];
  const ok = c.used === "ai" && full.ok;
  const sc = scoreText(c.prompt, m);
  const v = { model: m.id, verdict: ok ? "pass" : "fail", prompt: c.prompt, negative: c.negative, notes: c.notes, score: sc.total, parts: sc.parts, forgeVersion: ok ? undefined : res.flat };
  if (json) { console.log(JSON.stringify(v, null, 2)); process.exit(0); }
  const out = [`# Forge check: ${name}`];
  out.push(ok ? "Verdict: PASS. Your prompt is kept (with any fixes below already applied)." : "Verdict: FAIL. Forge would throw this prompt away. Fix what the note says and check again.");
  out.push(`Forge Score: ${sc.total}/100  (covered ${sc.parts.covered}/30, detail ${sc.parts.detail}/20, fits ${sc.parts.fits}/20, clear ${sc.parts.clear}/15, lean ${sc.parts.lean}/15)`);
  out.push("", "## Notes", "", ...c.notes.map(n => `- ${n}`));
  if (ok) {
    out.push("", "## Checked prompt", "", c.prompt);
    if (c.negative) out.push("", `## ${(m.neg && m.neg.label) || "Negative prompt"}`, "", c.negative);
  } else out.push("", "## Forge's own version (last resort only, if your fixed prompt keeps failing)", "", res.flat);
  console.log(out.join("\n"));
  process.exit(0);
}

let res, before = null;
const t = text("text");
if (t !== undefined) { before = scoreText(t, m).total; res = forgeFromText(t, m, level); }
else {
  let brief; try { brief = JSON.parse(opt("brief") || "{}"); } catch (e) { fail("--brief must be JSON, like '{\"subject\":\"a red fox\"}'"); }
  const unknown = Object.keys(brief).filter(k => !F[k]); if (unknown.length) fail(`Unknown box: ${unknown.join(", ")}. ${m.id} uses: ${[...m.core, ...m.craft, ...m.tech].join(", ")}`);
  res = forge(brief, m, level);
}
if (json) { console.log(JSON.stringify(res, null, 2)); process.exit(0); }

const out = [];
out.push(`# ${name} (${m.ver})`);
out.push(`Forge Score: ${before !== null ? before + " before, " : ""}${res.score}/100  (covered ${res.parts.covered}/30, detail ${res.parts.detail}/20, fits ${res.parts.fits}/20, clear ${res.parts.clear}/15, lean ${res.parts.lean}/15)`);
if (res.fixes && res.fixes.length) out.push(`Fixed spelling: ${res.fixes.map(f => f.from + " → " + f.to).join(", ")}`);
out.push("", "## The prompt", "", res.flat);
if (res.negative) out.push("", `## ${m.neg.label || "Negative prompt"}`, "", res.negative);
if (res.settings.length) out.push("", "## Settings", "", ...res.settings.map(r => `- ${r[0]}: ${r[1]}${r[2] ? " (" + r[2] + ")" : ""}`));
if (res.ask.length) out.push("", "## Ask the user (up to 3)", "", ...res.ask.map(a => `- ${a.q}`));
if (res.warn.length) out.push("", "## Watch out", "", ...res.warn.map(w => `- ${w}`));
if (res.cut.length) out.push("", "## Cut", "", ...res.cut.map(c => `- ${c.what}: ${c.why}`));
if (res.suggested && res.suggested.length) out.push("", "## Forge suggested (not in the user's text, not scored)", "", ...res.suggested.map(s => `- ${s.what}`));
if (m.unverified && m.unverified.length) out.push("", `Not confirmed: ${m.unverified.join("; ")}.`);
if (m.sources) out.push(`Sources (checked ${m.verifiedOn}): ${m.sources.join(" ")}`);
console.log(out.join("\n"));
