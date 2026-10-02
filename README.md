# Forge

**The prompt smithy.** Forge writes prompts in each AI model's own style, with the exact settings to match.

**Use it now, free: https://forge-prompt-smithy.netlify.app**

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

Then type `/forge:forge a cinematic shot of a cat leaping between rooftops` (or `/forge:forge-map` to map a chat).
Switch it off any time with `/plugin disable forge`.

## The Forge skill for Claude and ChatGPT

Use the Forge method inside Claude or ChatGPT. The skill is the `skill/forge` folder.

- **Claude Code:** copy `skill/forge` into `~/.claude/skills/forge` (or your project's `.claude/skills/`).
- **Claude apps (claude.ai, desktop):** zip the `forge` folder (the folder itself at the top of the zip), then upload it in Customize, Skills. Code execution must be on in Settings, Capabilities.
- **ChatGPT:** go to Skills, select Create, then Upload from your computer, and upload the `forge` folder.
- **Codex and other agents:** copy `skill/forge` into `.agents/skills/`.

Then just ask: "write me a Midjourney prompt for a red fox in the snow", or "make this prompt better".

## Community

Forge is free while it is being built. Found a bug, a model that is out of date, or have an idea?
Open an issue: https://github.com/AlonAI4/forge/issues

The website updates itself whenever this repo changes.

---

Made by Alon Shayo. Free to use, not to copy: see [LICENSE](LICENSE).
