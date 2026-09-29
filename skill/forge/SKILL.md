---
name: forge
description: Write, improve, fix or reverse-engineer prompts for AI tools, using the Forge method. Use when the user asks for a prompt for an AI model (Midjourney, Claude, ChatGPT, Gemini, Suno, Veo, ElevenLabs, Claude Code, Cursor, v0 and 50 more), wants an existing prompt made better, or asks which AI tool to use. Do not use for normal writing that is not a prompt for an AI.
---

# Forge: the prompt smithy

Forge writes prompts in each AI model's own style, with the exact settings to match. Website: https://forge-prompt-smithy.netlify.app

## The method (always works, even without running code)

1. **Pick the model.** Know which AI the prompt is for. If the user did not say, recommend one from `references/models.md` and say why in one line.
2. **Fix spelling first.** Correct obvious typos in what the user wrote, and list each fix (for example "pormpt → prompt"). Never change names, file names, links, colour codes, numbers or words in quotes.
3. **Check the main things the model needs.** `references/models.md` lists them per model under "Needs". If some are missing, ask **at most 3 short questions**, only about the gaps that would change the result most. Never ask about things the user already said. If they want it now, write the prompt and list the questions after it.
4. **Catch clashes.** Choices that pull in opposite directions ("golden hour" and "blue hour", "calm and tense", a camera lens on a flat vector drawing) make the model blend them into mush. Point them out and ask which one.
5. **Cut the useless stuff.** Remove filler that steers nothing on current models (masterpiece, best quality, 8k, ultra detailed, ultra-detailed, award winning, award-winning, trending on artstation, hyper realistic, hyperrealistic, stunning, beautiful, very detailed, highly detailed, photorealistic 4k, amazing, perfect, intricate details), words said twice, and style details past about 6. Say what you cut.
6. **Write it in the model's own style**, at the length it likes (see "Length"), and give the settings that go with it.
7. **Score it** with the Forge Score, out of 100:
   - Covered (30): the main things are there
   - Detail (20): 1st detail 8, 2nd 6, 3rd 4, 4th 2, more earns nothing
   - Fits (20): the length suits this model
   - Clear (15): 15 if nothing clashes, 0 if anything does
   - Lean (15): minus 5 per filler word, minus 3 per repeated word
8. **Be honest about what Forge added.** Anything you filled in that the user did not say is a suggestion: list it as one, and do not count it in the score.

## If you can run code: use the real Forge engine

Exact same results as the website, for 57 models:

```bash
node scripts/forge.mjs --list
node scripts/forge.mjs --model midjourney --brief '{"subject":"a red fox asleep","setting":"snowy pine forest at dawn"}'
node scripts/forge.mjs --model suno --text "chill lo-fi hip hop with piano, 80 bpm"
```

`--brief` takes the model's boxes as JSON (the ids are in `references/models.md`). `--text` improves a prompt the user already wrote, like Forge's Prompt Doctor. Add `--level basic` for fewer, simpler questions.

## Answer format

The prompt first, in a code block, ready to copy. Then the settings, the Forge Score, and the questions (if any). Keep it short and plain.

---
Made by Alon Shayo. Free to use, not to copy: see LICENSE. Try it in your browser: https://forge-prompt-smithy.netlify.app
