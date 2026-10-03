---
description: Write an expert prompt for any AI with Forge (pick the AI, ask at most 3 questions, write, check)
argument-hint: "[what you want made, and the AI if you know it]"
allowed-tools: ["AskUserQuestion", "mcp__plugin_forge_forge__forge_start", "mcp__plugin_forge_forge__forge_pick_ai", "mcp__plugin_forge_forge__forge_questions", "mcp__plugin_forge_forge__forge_brief", "mcp__plugin_forge_forge__forge_check", "mcp__plugin_forge_forge__forge_chat_context"]
---

Use Forge to write the best prompt for this request: $ARGUMENTS

If the request above is empty, ask the person in one short line what they want made and for which AI (if they know), then continue.
Use the Forge tools below; you do not need to load the forge skill for this. Keep it quick: as few rounds as possible.

1. **Start, in one call.** Call `forge_start` with the request, `ai` if the person named one, and `skip_questions: true` if they said to skip the questions or want it now. It returns the AI (picked for you if they named none: tell them the pick and its reason in one sentence), up to 3 questions, and Forge's brief. Do not show the brief.
2. **Ask the questions, right here in the chat** (skip this step if there are none or they said skip). If you have the AskUserQuestion tool (Claude Code), ask them all in ONE call: one question each, a short header, its choices as options (up to 4); for a question with no choices, offer 2 or 3 likely answers yourself, using its example as a guide. Without that tool, ask them all in one short message. Never ask something they already said. If they answer, call `forge_brief` with the request, the AI id and their answers keyed by each question's `field`, and write from that brief instead.
3. **Write the prompt and check it in the same reply.** Write the prompt from the brief (follow its RULES and REPLY WITH shape) and call `forge_check` with the same request, AI id, answers and your prompt, with no text before it. If `ok` is false: when `fixed_ok` is true, the `fixed_prompt` already passed, so use it; otherwise fix every problem and call `forge_check` again. **Never show a prompt that has not passed.** Up to 3 tries; if it still fails, show it and say plainly which problems are left. `notes` are hints, not errors.
4. **Show the result**: the final prompt in a code block, then the negative prompt and settings if there are any, then one line on what to paste where. No other commentary.
5. **Use it now, or copy.** Always keep the code block so they can copy it. Then ask in one line if they want it used now:
   - for Claude itself (a chat, writing or coding job you can do here): when they say yes, run the prompt yourself in this chat;
   - for another AI with a connected tool in this session (an image, video or music generator): offer to send it there, and only send after they say yes (it may cost credits);
   - otherwise they copy it into that AI.

"Read this chat" is off: do not call `forge_chat_context` unless the person asks for Forge to read this chat.
