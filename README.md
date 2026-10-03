# Forge

**The prompt smithy.** Forge writes prompts in each AI model's own style, with the exact settings to match.

**Use it now, free: https://alonai4.github.io/forge/**

Also at: https://forge-prompt-smithy.netlify.app (a copy on Netlify; it can be a few days behind when the free plan runs out of credits for the month).

**New here?** The website's Manual tab explains every part and how to add Forge to Claude or ChatGPT, step by step: https://alonai4.github.io/forge/#get-forge

Works for 57 models: Image (12), Video (11), Voice & speech (6), Sound effects (2), Music (5), Chat & reasoning (6), Coding agents (6), App builders (5), Research (4).

## What it does

- **Asks the right questions.** Up to 3, only about what is missing. Answer them right there.
- **Catches clashes.** "Golden hour" and "blue hour" in one prompt? It tells you.
- **Cuts the useless stuff.** Filler like "8k, masterpiece", repeats, too many style words.
- **Fixes spelling.** "pormpt" becomes "prompt", and it always shows what it changed.
- **Scores your prompt** out of 100: Covered, Detail, Fits, Clear, Lean.
- **Prompt Doctor.** Paste any prompt and get it back better, with the score before and after.
- **Three levels.** Basic, Intermediate and Professional. Basic is simpler, never worse.
- **Kept up to date.** Every model is checked against its official docs, with sources shown.

## The Forge plugin for Claude Code

Forge inside Claude: it picks the AI, asks at most 3 questions, gives Claude its expert brief, and checks what Claude
wrote. It keeps no data. In Claude Code:

```
/plugin marketplace add AlonAI4/forge
/plugin install forge@forge
```

Then type `/forge:forge a cinematic shot of a cat leaping between rooftops`, drop a picture in the chat and type
`/forge:forge-reverse midjourney` to get a prompt that makes more like it, or `/forge:forge-map` to map a chat.
Switch it off any time with `/plugin disable forge`.

## The Forge skill for Claude and ChatGPT

Use the Forge method inside Claude or ChatGPT. The skill is the `skill/forge` folder.

- **Claude Code:** copy `skill/forge` into `~/.claude/skills/forge` (or your project's `.claude/skills/`).
- **Claude apps (claude.ai, desktop):** zip the `forge` folder (the folder itself at the top of the zip), then upload it in Customize, Skills. Code execution must be on in Settings, Capabilities.
- **ChatGPT:** go to Skills, select Create, then Upload from your computer, and upload the `forge` folder.
- **Codex and other agents:** copy `skill/forge` into `.agents/skills/`.

Then just ask: "write me a Midjourney prompt for a red fox in the snow", or "make this prompt better".

## How Forge compares

Tested on 3 October 2026. The same new requests went to Forge and to other free prompt generators, and a blind judge (it did not know which tool wrote which prompt) picked the prompt likely to get the better result, with a reason for every pick.

| Forge | vs Jotform AI Prompt Generator | vs GeneratePrompt.net |
|---|---|---|
| The plugin for Claude | won 10 of 10 | won 7 of 7 |
| The website, on its own (no AI) | won 4 of 5 (the version before won 1 of 5) | lost 5 of 7 (tested before the 3 October update) |

Against Claude itself (a full AI writing the prompt), the website on its own still loses almost every time (0-5% across its features on 90 new requests, 3 October), though each feature got clearly better than its old version (Chat Context 82%, Anvil 63%, Doctor 61%). The plugin, where Claude writes from Forge's brief, is the strong one.

Why the plugin wins, in the judges' words: it keeps every detail the person gave, uses each AI's current settings, and invents nothing.
Limits: these are small tests. The other generators limit free use (GeneratePrompt.net stops after 10 prompts a day, Jotform after a few an hour), so each had only 5 to 7 requests. Forge has no limits, needs no account and keeps no data.

## Community

Forge is free while it is being built. The full guide is on the website: https://alonai4.github.io/forge/#get-forge Found a bug, a model that is out of date, or have an idea?
Open an issue: https://github.com/AlonAI4/forge/issues

The website updates itself whenever this repo changes.

---

Made by Alon Shayo. Free to use, not to copy: see [LICENSE](LICENSE).
