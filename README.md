# Forge

**The prompt smithy.** Forge writes prompts in each AI model's own style, with the exact settings to match.

For anyone who uses AI tools and wants the right answer the first time, without learning each AI's prompt rules.

**Use it now, free: https://forge-prompt-smith.pages.dev/**

Also at: https://alonai4.github.io/forge/ (a copy on GitHub Pages; it can be older).

**New here?** The website's Manual tab explains every part and how to add Forge to Claude or ChatGPT, step by step: https://forge-prompt-smith.pages.dev/#get-forge

Works for 57 models: Image (12), Video (11), Voice & speech (6), Sound effects (2), Music (5), Chat & reasoning (6), Coding agents (6), App builders (5), Research (4).

## Before and after

Written by Forge 0.2.42 itself when this README was built, not typed in.

You type:

> write an email to my teacher asking for 2 more days on my science project because I was sick, keep it short and polite

Forge writes for **Claude**:

```
[System prompt]
Tone: polite.

<context>
I was sick
</context>

<instructions>
Write an email to my teacher asking for 2 more days on my science project
</instructions>

<requirements>
- Where you need a detail I did not give (a name, a date, a number), leave a [bracketed blank] instead of inventing it.
</requirements>

<output_format>
Length: A few sentences. No preamble and no summary of the request: start with the answer.
</output_format>
```

Forge writes for **ChatGPT**:

```
## System prompt
Tone: polite.

## Context
I was sick

## Task
Write an email to my teacher asking for 2 more days on my science project

## Requirements
- Where you need a detail I did not give (a name, a date, a number), leave a [bracketed blank] instead of inventing it.

## Output
Length: A few sentences. No preamble and no summary of the request: start with the answer.
```

- **Nothing you asked for is lost.** The reason, the tone and the length each get their own place.
- **Each AI gets its own layout:** tags for Claude, headings for ChatGPT, as their makers' prompting guides show. The content is the same.
- **No made-up details.** A name or date you did not give comes back as a [blank] to fill in.

## What it does

- **Asks the right questions.** Up to 3, only about what is missing. Answer them right there.
- **Catches clashes.** "Golden hour" and "blue hour" in one prompt? It tells you.
- **Cuts the useless stuff.** Filler like "8k, masterpiece", repeats, too many style words.
- **Fixes spelling.** "pormpt" becomes "prompt", and it always shows what it changed.
- **Scores your prompt** out of 100: Covered, Detail, Fits, Clear, Lean.
- **Prompt Doctor.** Paste any prompt and get it back better, with the score before and after.
- **Three levels.** Basic, Intermediate and Professional. Basic asks for less; what you typed is always kept.
- **Sourced.** Each model's facts link to its official docs. Anything not confirmed is marked unverified.

## The Forge plugin for Claude Code

Forge inside Claude: it picks the AI, asks at most 3 questions, gives Claude its expert brief, and checks what Claude
wrote. It keeps no data. In Claude Code:

```
/plugin marketplace add AlonAI4/forge
/plugin install forge@forge
```

Then type `/forge:forge a cinematic shot of a cat leaping between rooftops`, drop a picture in the chat and type
`/forge:forge-reverse midjourney` to get a prompt that makes more like it (experimental), or `/forge:forge-map` to map a chat (experimental).
Switch it off any time with `/plugin disable forge`.

## Set up Forge and save tokens with Forge Map

New to Claude Code? Paste this into a Claude Code chat. It walks you through installing Forge, checks each step
worked, and sets up Forge Map so Claude reads a short map of your project instead of resending big files and long
chats. Every message resends the whole chat, so this keeps your limits lasting longer.

```
Set up Forge for me and show me how to use Forge Map to save tokens. I'm new to Claude Code, so explain each step in one or two plain sentences, and check that each step really worked before moving on. Forge is free, needs no account and keeps no data.

<steps>
1. Install. Tell me to type these two commands myself (slash commands only work when I type them), one at a time, and wait for me to say done after each:
   /plugin marketplace add AlonAI4/forge
   /plugin install forge@forge
   Check: ask me to type /forge:forge with a test request ("a prompt for a sunset photo"). It worked if Forge answers with a prompt. If the command is not found, tell me to restart Claude Code and try again.

2. Make a map. Explain what Forge Map is: a short summary of a chat or project in six parts (Goal, Decisions, Rules and limits, Done, Open questions, Latest ask). Tell me to type:
   /forge:forge-map this chat
   then click Open on the Forge Map result to see the map. Check: ask me whether the map shows a goal; if the goal is empty, the chat was too short, so tell me to try again in a longer chat.

3. Save the map so it saves tokens. In this project, create maps/<project>.md (use this folder's name for <project>) containing the map's six parts as plain text, under 100 lines. Then add one line to this project's CLAUDE.md (create the file if missing):
   - Read maps/<project>.md first. Open other files only when the task needs them, and never read the whole chat history again.
   Check: show me the first lines of both files.

4. Teach the habit. Explain in three short bullets:
   - Every message resends the whole chat, so a huge chat costs more on every reply.
   - When a chat gets long, run /forge:forge-map this chat, update maps/<project>.md, and start a new chat that begins with: "Read maps/<project>.md and continue from Latest ask."
   - Update the map after each big decision, not after every message.
</steps>

<rules>
- Change nothing outside this project folder except what the install commands do.
- Edit CLAUDE.md by adding the one line only, not by rewriting it.
- If any step fails, stop, show me the exact error, and give one fix to try.
</rules>

Done means: /forge:forge answered a test request, a map opened, maps/<project>.md exists, and CLAUDE.md has the new line. End with a short list of what you set up and what I typed myself.
```

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

Against Claude itself (a full AI writing the prompt), the judge preferred the website's prompt in only 0-5% of 90 new requests (3 October). Each feature did beat its own older version most of the time (Chat Context in 82% of requests, Anvil 63%, Doctor 61%). The plugin, where Claude writes from Forge's brief, is the strong one.

Why the plugin wins, in the judges' words: it keeps every detail the person gave, uses each AI's current settings, and invents nothing.
Limits: these are small tests. The other generators limit free use (GeneratePrompt.net stops after 10 prompts a day, Jotform after a few an hour), so each had only 5 to 7 requests. Forge has no limits, needs no account and keeps no data.

## Roadmap (experimental, may change)

- **1.0:** the website, the plugin and the skill. Reverse Forge, Chat Context, Matchmaker and Forge Map are experimental.
- **1.1:** fixes from testers, and a date on every AI fact so old ones get rechecked.
- **1.5:** a free online AI writer for the website, so it matches the plugin. Maybe Cursor and VS Code.
- **2.0:** Forge inside Claude Code, next to the prompt box.
- **2.1:** a browser extension.

## Terms

Free to use, provided as is. Forge can be wrong and the AIs it writes for change, so check a prompt before you rely on it. What you make is yours, and so is the responsibility: follow each AI's rules, and don't use Forge to make anything illegal, hateful, or meant to hurt or deceive someone. Forge keeps no data. Forge is independent: it is not made by, approved by or connected to any company whose AI it writes for, and their names are their trademarks. The code is free to use, not to copy (see [LICENSE](LICENSE)). Full terms: https://forge-prompt-smith.pages.dev/#terms

## Community

Forge is free while it is being built. The full guide is on the website: https://forge-prompt-smith.pages.dev/#get-forge Found a bug, a model that is out of date, or have an idea?
Open an issue: https://github.com/AlonAI4/forge/issues

The website updates itself whenever this repo changes.

---

Made by Alon. Free to use, not to copy: see [LICENSE](LICENSE).
