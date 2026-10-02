# ElevenLabs Speech (`el-tts`)

Category: Voice & speech. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**What it does.** v4 / v3 / multilingual v2 / flash v2.5 by ElevenLabs. Three different models under one product. Expressive long-form narration, character acting, audiobooks, seventy-plus languages, multi-speaker dialogue in one pass. Very short inputs are unstable. It is not a general SSML engine: only break, phoneme and lexeme tags exist.
**Write it as.** The script itself is the prompt. On v3, inline audio tags in brackets like [whispers], [sighs], [sarcastic], and natural-language direction inside brackets. Ellipses add hesitation, dashes make short pauses, CAPITALS carry stress. Give it a full paragraph even if you only need one line: under 250 characters gets inconsistent output.
**Watch out.** v3 does not support break tags. The phoneme tag only works on flash v2; on v3 write IPA between forward slashes.

**Master prompt (ET-00)**

```
Model: eleven_v3. Voice: a warm British narrator, mid-forties.
[calm, unhurried] There is a moment, just before a game loads, when nothing has gone wrong yet. The screen is black. The music has not started. You have not missed the jump, or lost the save, or rage-quit at two in the morning... [soft laugh] Not yet, anyway. [slightly brighter] This is a story about that moment, and about the thirteen-year-old who decided to build one of his own. It starts, as these things do, with a blank file — and a very bad first idea.
```

1. **ET-01 Audiobook opening.** eleven_v3, warm female narrator. [gentle] The lighthouse had been dark for eleven years when Mara first saw it flicker. She stopped on the cliff path, one hand on the rail, and waited... Nothing. [quieter] Then, again — a single pulse, like a held breath let go. She did not run. She walked, because running would have meant she believed it.
2. **ET-02 Two-speaker dialogue.** eleven_v3, multi-speaker. Speaker A, teenage boy, excited: "Okay okay okay — it WORKS. Look. Look at it!" Speaker B, calm older sister, dry: "[sighs] It's a button, Sam." Speaker A: "It's a button that SAVES. Do you know how long that took?" Speaker B: "[warmer] ...Yeah. I do. Nice one."
3. **ET-03 Explainer, YouTube.** eleven_v3, clear young male presenter. [upbeat] So a variable is just a box with a name on it. That's it. You put something in the box — a number, a word, a list — and later you ask for it by name. [slower, emphasis] The mistake everyone makes is thinking the box IS the thing. It isn't. It's a label. Change what's inside, the label stays the same.
4. **ET-04 Whisper.** eleven_v3. [whispers] Don't move. It's right behind the door... [pause] Can you hear it? That scratching? [barely audible] On three, we run. One... two...
5. **ET-05 Sarcasm.** eleven_v3. [sarcastic] Oh, brilliant. Another update. I LOVE waiting forty minutes to play a game I already own. [flat] Truly, this is the future. [mutters] ...it had better fix the jump bug.
6. **ET-06 Game NPC lines.** eleven_v3, gruff dwarven blacksmith. [gruff, hearty] Back again, are ye? [chuckles] That blade won't sharpen itself. Twenty gold and it'll split a hair — forty and it'll split the hair's opinion of itself. [serious] Mind the north road tonight. Wolves.
7. **ET-07 Meditation.** eleven_multilingual_v2, soft female voice. Breathe in... slowly... and hold. Feel the weight of your shoulders drop. Now let it go — all of it — on a long, quiet breath out. There is nowhere you need to be. Nothing you need to finish. Just this breath, and the next one.
8. **ET-08 News read.** eleven_flash_v2_5, neutral newsreader. Good evening. The city council has approved plans for a new cycle route linking the harbour to the university, with construction expected to begin in March. Meanwhile, local schools reported record attendance at this year's science fair — more on that after the break.
9. **ET-09 Pronunciation fix on v3.** eleven_v3. Welcome to /ˈfɔːdʒ/ — Forge — the prompt tool that asks what you left out. [warm] Type what you want, pick your model, and press the button. That's it.
10. **ET-10 Angry then calm.** eleven_v3. [angry] I told you NOT to touch the config! Three hours — THREE — of work, gone. [long exhale] [calmer] ...Okay. Okay. It's fine. We have git. [quiet laugh] We have git, right? Please tell me we have git.
11. **ET-11 Kids' story.** eleven_multilingual_v2, playful female storyteller. Once upon a time, in a teapot at the bottom of the garden, there lived a very small dragon called Pip. Pip could not breathe fire — only steam — which was, if you think about it, PERFECT for a teapot.
12. **ET-12 Spanish narration.** eleven_multilingual_v2, Spanish (Spain), male. Hay un momento, justo antes de que empiece la partida, en el que todavía nada ha salido mal. La pantalla está en negro. La música no ha empezado. Todavía no has fallado el salto... [ríe suavemente] Todavía no.
13. **ET-13 Hebrew announcement.** eleven_multilingual_v2, Hebrew, female. שלום לכולם וברוכים הבאים ליום הפתוח. הסיורים יוצאים כל חצי שעה מהכניסה הראשית. אנא שמרו על השקט בזמן השיעורים... ותיהנו.
14. **ET-14 Trailer voice.** eleven_v3, deep male trailer voice. [low, slow] In a world... where every prompt is a little bit worse than it should be... [beat] one tool asks the questions nobody else does. [building] What did you leave out? What clashes? What's just... filler? [big] Forge. Coming to a browser near you.
15. **ET-15 Phone IVR.** eleven_flash_v2_5, friendly neutral female. Thanks for calling Northside Dental. For appointments, press one. For opening hours, press two. To speak to a receptionist, please hold — we'll be with you shortly.
