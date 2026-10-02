---
description: Turn a picture in this chat into an expert prompt for any AI with Forge (Claude looks, Forge knows the AI, then checks)
argument-hint: "[which AI, e.g. midjourney, nanobanana, kling] [what to keep or change]"
allowed-tools: ["mcp__plugin_forge_forge__forge_reverse", "mcp__plugin_forge_forge__forge_check", "mcp__plugin_forge_forge__forge_pick_ai"]
---

Use Reverse Forge to write a prompt that makes more pictures like the one in this chat: $ARGUMENTS

You are the eyes; Forge knows the target AI and checks the result.

0. **Find the picture.** Use the picture the person pasted or attached in this chat. If they gave a file path instead, open it with Read so you can see it. If there is no picture at all, ask for one in one short line and stop.
   **Which AI:** use the one named above. If none is named, call `forge_pick_ai` with what the picture is (kind `image`, or `video` if they want it to move) and take the first pick, saying so in one sentence.
1. **Describe it precisely**, only what you can see (write "unsure" when you are), in one compact paragraph:
   - subject: who or what, how many, looks, clothes
   - action: what is happening, the moment caught
   - setting: place, time of day, weather
   - camera: shot size, angle, lens feel, depth of field
   - light: where it comes from, hard or soft, its colour
   - colours and grade, style or medium (photo, 3D, painting, screenshot...), mood
   - any text in the picture, word for word in quotes (or "no text")
   Do not include private details you can read in the picture (names, messages, emails) unless the person wants them in the prompt.
2. **Call `forge_reverse`** with `ai`, your `description`, and `notes` if the person said what to keep or change.
   - If the person gave a **PNG file path** (Claude Code), also pass `image_path`: Forge measures size, aspect and colours from the pixels, read only. For JPEG or WebP do not pass it; if they want exact measurements, say they can measure it on the Forge website (Reverse tab) and paste the numbers as `measures`.
   - If they pasted measurements from the Forge website, pass them as `measures`.
   Do not show Forge's answer to the person.
3. **Write the prompt yourself** for that AI, following the returned rules, "How it wants prompts", the measured aspect and colours, and the "Reply with" shape (Prompt / Negative / Settings). Use only Settings Forge listed.
4. **Call `forge_check`** with `request` = your description (exactly what you sent to forge_reverse), the same `ai`, and `prompt` = what you wrote. If `ok` is false, fix every problem (or use `fixed_prompt`) and check again until it passes. Hints are not errors.
5. **Show the result**: the final prompt in one code block, then the negative prompt (if any) and the settings as a short list, then one line on where to paste it. If the picture could not be measured, say so in one line.
6. **Use it now, or copy.** Keep the code block so they can copy it. If a tool for that AI is connected in this session (an image or video generator), offer in one line to send it there, and only send after they say yes (it can cost credits). Otherwise copying is the way.
