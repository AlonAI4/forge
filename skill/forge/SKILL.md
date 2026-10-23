---
name: forge
description: Write, improve or fix a prompt for a specific AI tool, using the Forge method and Forge's checker. Use when the user asks for a prompt to paste into an AI model (Midjourney, Nano Banana, GPT Image, FLUX, Veo, Kling, Runway, Suno, ElevenLabs, Claude, ChatGPT, Gemini, Claude Code, Cursor, v0, Lovable, Perplexity; 57 in all), wants an existing prompt made better, or asks which AI tool to use for a job. Do not use for ordinary writing that is not a prompt for an AI.
---

# Forge: the prompt smithy

Forge knows how each of 57 AI tools wants its prompts. You are the writer: Forge gives you a brief, you write the prompt, Forge checks it. (In Forge's own tests this beat Forge's template, and won 56% of matchups against a strong model writing the prompt alone.) Website: https://forge-prompt-smith.pages.dev/

Files you can use (read only what you need):
- `references/models.md`: every model, one short entry each. Use it to pick the AI.
- `references/models/<id>.md`: one file per model from Forge's prompt library: what it does, how to write for it, what to avoid, a master prompt and numbered examples. Read **only** the one for the chosen AI.
- `references/master-prompt.md`: the 9-part master prompt that every model is built on, one brief written for three models, and the rules that hold on every model.
- `scripts/forge.mjs`: the Forge engine (needs Node).

## The flow (when you can run code)

The Forge plugin's tools (`forge_brief`, `forge_check`, ...) do the same job when they are installed and allowed. If they are missing or blocked, use this skill's own script below. Never stop just because a plugin tool was refused.

1. **Pick the AI.** If the user named one, find its id (`node scripts/forge.mjs --list`). If not, pick the best one from `references/models.md` and say why in one line. Then read `references/models/<id>.md`.
2. **Get Forge's brief.** Pass the user's own words, with clear spelling mistakes fixed first ("astronuat" → "astronaut"): this script has no spelling dictionary (the plugin has one, so there you pass the words unchanged). Never change names, file names, links, colour codes, numbers or quoted words, and never reword anything else:
   ```bash
   node scripts/forge.mjs --writer --model <id> --request "<what the user asked>"
   ```
   It prints the brief (Forge's draft, the settings, how this AI wants prompts, expert tips, RULES) and up to 3 questions. For long or quote-heavy text, save it to a file and use `--request-file <path>`.
3. **Ask at most 3 questions in total**, and only if they would change the result. Forge's questions are suggestions, best first. Ask at most 3 in total, the ones whose answers would change the result most. Drop any the request already answers; replace or merge any of Forge's questions, the first one included, with a sharper question about the same thing for this request (ask for the exact figures, names or words the result needs, not a general list), and keep Forge's field as the key of a question you replaced so forge_brief still puts the answer in its place. A sharpened question keeps an open ending ("...and anything else it must show, say or feel like?"), because people answer only the examples you list: never drop Forge's last open question, and never spend a question on something the result does not depend on. When Forge gives fewer than 3, you may add your own about things only the person knows that the result depends on: names, exact words, numbers, what their own thing looks like, limits such as budget or time. Key the answer to each question of your own by that question itself, never by a field Forge asked about: two answers under one key overwrite each other. (In this skill `--details` does the job of forge_brief: each line's label is the key.) Ask them all at once: with your own question tool if you have one (in Claude Code, one AskUserQuestion call with 2 to 4 likely answers per question), otherwise in one short message. If the user wants it now, skip this step. When they answer, run step 2 again with `--details "field: answer"` (one per line, the field each question names; for your own questions, `your question: answer`) so the brief includes it.
4. **Write the final prompt yourself**, following the brief's RULES exactly:
   - keep every fact the user gave; never invent names, numbers, dates, prices or places;
   - write in this AI's own syntax, length and fields (the model file's master prompt shows the shape; do not copy its examples);
   - for pictures, video and sound: no `[blanks]` inside the prompt, make it concrete (subject, camera, light, motion, sound);
   - no filler ("masterpiece", "8k", "stunning"), no chat talk, never mention Forge or its draft (unless the user's own job is about something called Forge).
5. **Check it with Forge**, and fix what it finds:
   ```bash
   node scripts/forge.mjs --check --model <id> --request "<what the user asked>" --details "<their answers, if any>" --prompt "<your prompt>"
   ```
   For a long prompt, pass `--prompt -` and give the prompt on standard input (`node scripts/forge.mjs --check ... --prompt - <<'EOF'` ... `EOF`): no file needed. `--prompt-file <path>` also works, and `--negative "<keep-outs>"` if the AI has a negative field. **FAIL** means a real mistake: a fact the user gave is missing, a personal fact (name, price, date, time, phone number) is made up, or a setting this AI does not have. Fix your prompt and check again (at most 2 more rounds). If it flags a fact the user gave you, keep it: add it to `--details` and check again, or show the prompt and say which flag is wrong. Never delete a true fact to pass. On **PASS**, read the notes anyway: words you left out, filler, too long. Fix the ones that matter. Use the checked prompt it prints (Forge only takes out filler).
6. **Answer** in this order, short and plain:
   - the prompt in a code block, ready to copy (the negative prompt in its own block, if the AI has that field);
   - the settings (aspect ratio, model, duration...) as a short list;
   - one line on anything you chose that the user did not say, so they can change it;
   - spelling you fixed and clashes Forge found, if any.

**Prompt Doctor** (the user pastes a prompt of their own and asks to make it better, fix it or check it): run the same flow with their whole message as `--request`. Forge finds the pasted prompt and reads it as the material: write a better prompt for the same job, keep what it got right (its subject, names, numbers, quoted words and real settings), fix the rest, and do not copy it word for word. `--check` never asks for the old prompt word for word.

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
Made by Alon. Free to use, not to copy: see LICENSE. Try it in your browser: https://forge-prompt-smith.pages.dev/
