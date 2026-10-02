---
description: Write an expert prompt for any AI with Forge (pick the AI, ask at most 3 questions, write, check)
argument-hint: "[what you want made, and the AI if you know it]"
allowed-tools: ["mcp__plugin_forge_forge__forge_pick_ai", "mcp__plugin_forge_forge__forge_questions", "mcp__plugin_forge_forge__forge_brief", "mcp__plugin_forge_forge__forge_check", "mcp__plugin_forge_forge__forge_chat_context"]
---

Use Forge to write the best prompt for this request: $ARGUMENTS

If the request above is empty, ask the person in one short line what they want made and for which AI (if they know), then continue.
If the forge skill (skills/forge in this plugin) is loaded, follow it as well; these steps are the minimum.

1. **Pick the AI.** If the person named an AI, use it. Otherwise call `forge_pick_ai` with their request, and with `kind` when you can tell what they want (image, video, voice, sfx, music, text, code, app, research). Tell them the pick and its one-line reason in one sentence, and take the first pick unless they object.
2. **Ask at most 3 questions.** Call `forge_questions` with the request and the AI id. Ask the person all returned questions at once, short, and say they can skip any. Never ask something they already said. If the list is empty, skip this step.
3. **Get the brief.** Call `forge_brief` with the request, the AI id, and their answers keyed by each question's `field` (leave out skipped ones). Do not show the brief.
4. **Write the prompt yourself** from the brief: follow its RULES and its REPLY WITH shape.
5. **Check it.** Call `forge_check` with the same request, AI id and answers, plus your prompt. If `ok` is false, fix every item in `problems` (or use `fixed_prompt`), then check once more. Read `notes`, but they are hints, not errors.
6. **Show the result**: the final prompt in a code block, then the negative prompt and settings if there are any, then one line on what to paste where. No other commentary.
7. **Use it now, or copy.** Always keep the code block so they can copy it. Then ask in one line if they want it used now:
   - for Claude itself (a chat, writing or coding job you can do here): when they say yes, run the prompt yourself in this chat;
   - for another AI with a connected tool in this session (an image, video or music generator): offer to send it there, and only send after they say yes (it may cost credits);
   - otherwise they copy it into that AI.

"Read this chat" is off: do not call `forge_chat_context` unless the person asks for Forge to read this chat.
