---
name: forge
description: Write, improve or fix a prompt for a specific AI tool, using the Forge method and Forge's checker. Use when the user asks for a prompt to paste into an AI model (Midjourney, Nano Banana, GPT Image, FLUX, Veo, Kling, Runway, Suno, ElevenLabs, Claude, ChatGPT, Gemini, Claude Code, Cursor, v0, Lovable, Perplexity; 57 in all), wants an existing prompt made better, or asks which AI tool to use for a job. Do not use for ordinary writing that is not a prompt for an AI.
---

# Forge: the prompt smithy

Forge knows how each of 57 AI tools wants its prompts. You are the writer: Forge gives you a brief, you write the prompt, Forge checks it. (In Forge's own tests this beat Forge's template, and won 56% of matchups against a strong model writing the prompt alone.) Website: https://alonai4.github.io/forge/

Files you can use (read only what you need):
- `references/models.md`: every model, one short entry each. Use it to pick the AI.
- `references/models/<id>.md`: one file per model from Forge's prompt library: what it does, how to write for it, what to avoid, a master prompt and numbered examples. Read **only** the one for the chosen AI.
- `references/master-prompt.md`: the 9-part master prompt that every model is built on, one brief written for three models, and the rules that hold on every model.
- `scripts/forge.mjs`: the Forge engine (needs Node).

## The flow (when you can run code)

The Forge plugin's tools (`forge_brief`, `forge_check`, ...) do the same job when they are installed and allowed. If they are missing or blocked, use this skill's own script below. Never stop just because a plugin tool was refused.

1. **Pick the AI.** If the user named one, find its id (`node scripts/forge.mjs --list`). If not, pick the best one from `references/models.md` and say why in one line. Then read `references/models/<id>.md`.
2. **Get Forge's brief.** Pass the user's words exactly as they wrote them:
   ```bash
   node scripts/forge.mjs --writer --model <id> --request "<what the user asked>"
   ```
   It prints the brief (Forge's draft, the settings, how this AI wants prompts, expert tips, RULES) and up to 3 questions. For long or quote-heavy text, save it to a file and use `--request-file <path>`.
3. **Ask at most 3 questions**, and only if they would change the result: take them from the brief's QUESTIONS, skip anything the user already said. Ask them all at once: with your own question tool if you have one (in Claude Code, one AskUserQuestion call with 2 to 4 likely answers per question), otherwise in one short message. If the user wants it now, skip this step. When they answer, run step 2 again with `--details "Question: answer"` (one per line) so the brief includes it.
4. **Write the final prompt yourself**, following the brief's RULES exactly:
   - keep every fact the user gave; never invent names, numbers, dates, prices or places;
   - write in this AI's own syntax, length and fields (the model file's master prompt shows the shape; do not copy its examples);
   - for pictures, video and sound: no `[blanks]` inside the prompt, make it concrete (subject, camera, light, motion, sound);
   - no filler ("masterpiece", "8k", "stunning"), no chat talk, never mention Forge or a draft.
5. **Check it with Forge**, and fix what it finds:
   ```bash
   node scripts/forge.mjs --check --model <id> --request "<what the user asked>" --details "<their answers, if any>" --prompt "<your prompt>"
   ```
   For a long prompt, pass `--prompt -` and give the prompt on standard input (`node scripts/forge.mjs --check ... --prompt - <<'EOF'` ... `EOF`): no file needed. `--prompt-file <path>` also works, and `--negative "<keep-outs>"` if the AI has a negative field. **FAIL** means you dropped what the user said or wrote around the job: fix your prompt and check again (at most 2 more rounds). On **PASS**, read the notes anyway: words you left out, numbers you added that the user never gave, filler Forge cut, too long. Fix the ones that matter. Use the checked prompt it prints (Forge already applied its small fixes). Use Forge's own version only if your fixed prompt still fails.
6. **Answer** in this order, short and plain:
   - the prompt in a code block, ready to copy (the negative prompt in its own block, if the AI has that field);
   - the settings (aspect ratio, model, duration...) as a short list;
   - one line on anything you chose that the user did not say, so they can change it;
   - spelling Forge fixed and clashes it found, if any.

Forge's own rule-based version is still there when you just want it fast: `node scripts/forge.mjs --model <id> --text "<prompt>"` (like the website's Prompt Doctor), or `--brief '{"subject":"..."}'` with the box ids from `references/models.md`. Add `--json` to any command for raw output.

## The method without code

If you cannot run code, do the same job by hand:

1. **Pick the AI** from `references/models.md` (say why in one line), and read `references/models/<id>.md` and `references/master-prompt.md`.
2. **Fix spelling** in what the user wrote and list each fix ("pormpt → prompt"). Never change names, file names, links, colour codes, numbers or quoted words.
3. **Fill the 9 parts** of the master prompt: Subject, Action/Ask, Setting, Medium, Purpose, Details, Avoid, Settings, Check. If the parts that matter most are missing, ask **at most 3 short questions**. Never ask about what the user already said.
4. **Catch clashes.** Things that pull in opposite directions ("golden hour" and "blue hour", "calm and tense", a camera lens on a flat vector drawing) get blended into mush: point them out and ask which one.
5. **Cut the useless stuff**: filler that steers nothing (masterpiece, best quality, 8k, ultra detailed, ultra-detailed, award winning, award-winning, trending on artstation, hyper realistic, hyperrealistic, stunning, beautiful, very detailed, highly detailed, super detailed, extremely detailed, insanely detailed, photorealistic 4k, amazing, perfect), words said twice, more than about 4 style details. Say what you cut.
6. **Write it in the model's own shape and length**, using its model file's "Write it as" and master prompt, with the settings it takes.
7. **Check it yourself** like Forge does: every fact and key word the user gave is still there; no invented names or numbers; parameters and settings kept; no filler; no chat talk; length inside the model's range; keep-outs only where the model has a place for them.
8. **Be honest about what you added**: anything the user did not say is a suggestion; list it as one.

## Forge Score (when the user asks how good a prompt is)

Out of 100: Covered 30 (the main things are there), Detail 20 (1st detail 8, 2nd 6, 3rd 4, 4th 2, more earns nothing), Fits 20 (the length suits this model), Clear 15 (15 if nothing clashes, 0 if anything does), Lean 15 (minus 5 per filler word, minus 3 per repeated word). `--check` prints it.

---
Made by Alon Shayo. Free to use, not to copy: see LICENSE. Try it in your browser: https://alonai4.github.io/forge/
