#!/usr/bin/env node
// Forge from the command line. Used by the Forge skill in Claude and ChatGPT when they can run code,
// so the answer is exactly what the Forge website gives.
//
//   node forge.mjs --list                                   every model id, by category
//   node forge.mjs --model midjourney --brief '{"subject":"a red fox","setting":"snowy forest"}'
//   node forge.mjs --model suno --text "chill lo-fi hip hop with piano, 80 bpm"   (like Prompt Doctor)
//   add --level basic|intermediate|pro   and   --json   for raw output
import "./words.js";
import { MODELS, CATS, F, forge, forgeFromText, scoreText } from "./engine.js";

const args = process.argv.slice(2);
const opt = k => { const i = args.indexOf("--" + k); return i >= 0 ? args[i + 1] : undefined; };
const has = k => args.includes("--" + k);
const fail = msg => { console.error(msg); process.exit(1); };

if (has("list") || !args.length) {
  for (const c of CATS) console.log(`${c.n}: ` + MODELS.filter(m => m.cat === c.id).map(m => m.id).join(", "));
  process.exit(0);
}
const m = MODELS.find(x => x.id === opt("model"));
if (!m) fail(`Unknown model "${opt("model")}". Run with --list to see every model id.`);
const level = opt("level") || "pro";

let res, before = null;
if (opt("text") !== undefined) { before = scoreText(opt("text"), m).total; res = forgeFromText(opt("text"), m, level); }
else {
  let brief; try { brief = JSON.parse(opt("brief") || "{}"); } catch (e) { fail("--brief must be JSON, like '{\"subject\":\"a red fox\"}'"); }
  const unknown = Object.keys(brief).filter(k => !F[k]); if (unknown.length) fail(`Unknown box: ${unknown.join(", ")}. ${m.id} uses: ${[...m.core, ...m.craft, ...m.tech].join(", ")}`);
  res = forge(brief, m, level);
}
if (has("json")) { console.log(JSON.stringify(res, null, 2)); process.exit(0); }

const out = [];
out.push(`# ${m.n}${m.sub ? " · " + m.sub : ""} (${m.ver})`);
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
