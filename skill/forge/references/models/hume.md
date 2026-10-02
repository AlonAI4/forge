# Hume Octave (`hume`)

Category: Voice & speech. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**What it does.** 2 by Hume AI. Acting instructions as a first-class input, with a documented rule that shorter direction beats longer. Emotionally precise delivery, character work, direction that changes mid-line.
**Write it as.** The script plus an acting instruction under about 100 characters. Precise emotions beat generic ones: melancholy and frustrated, not sad. Audience context shapes delivery: "speaking to a child", "addressing a large crowd".
**Watch out.** Speed runs 0.5 to 2.0 and is non-linear. Limits are 5000 characters of text and 1000 of description per utterance.

**Master prompt (HU-00)**

```
Voice description: a young woman, warm, slightly husky, unhurried.
Acting instruction: Relieved and a little embarrassed, speaking to a close friend.
Text: It's done. It actually works. I know I said that yesterday — and the day before — but this time I ran the tests. All of them. I may have cried a bit. Don't tell anyone.
Speed: 1.0.
```

1. **HU-01 Frightened.** Instruction: Frightened, rushed, whispering to a sibling. Text: Don't turn on the light. It's in the hallway. I heard it stop right outside the door.
2. **HU-02 Proud teacher.** Instruction: Quietly proud, addressing a class of twelve-year-olds. Text: Every one of you finished. Some of you finished twice because you didn't like your first answer. That's the whole job. That's it.
3. **HU-03 Frustrated then amused.** Instruction: Frustrated, then amused at herself by the last line. Text: Four hours. Four hours on a missing semicolon. I'm going to frame it. I'm going to put it on the wall.
4. **HU-04 Villain, calm.** Instruction: Icy calm, amused, addressing a captured hero. Text: You thought the map was the treasure. Everyone does. The map was the bait.
5. **HU-05 Melancholy.** Instruction: Melancholy, tender, speaking to an empty room. Text: The kettle still clicks off at the same second. I don't know why I expected that to change.
6. **HU-06 Crowd.** Instruction: Confident, warm, addressing a large crowd. Text: Two years ago this was a folder called "untitled". Tonight it's yours. Thank you for building it with us.
7. **HU-07 Bedtime.** Instruction: Sleepy, gentle, speaking to a small child. Text: And the little dragon curled up in the teapot, and the steam went up, and up, and up... and that's where we'll stop tonight.
8. **HU-08 Sports.** Instruction: Breathless, elated, live commentary. Text: She's through — she's clear — nobody's catching her now — and that's the record! That is the record!
9. **HU-09 Deadpan.** Instruction: Deadpan, dry, mildly annoyed. Text: Yes. I have tried turning it off and on again. Yes, both times.
10. **HU-10 Mid-line shift.** Instruction: Cheerful at first, then suddenly serious. Text: Great news, the demo went perfectly and everyone loved it. Also we've lost the database. Both things are true.
11. **HU-11 Nervous.** Instruction: Nervous, hopeful, asking a favour. Text: So — hypothetically — if someone had pushed to main by accident, how bad would that be? Asking for a friend.
12. **HU-12 Slow narration.** Instruction: Awed, slow, documentary narration. Speed 0.85. Text: At this depth, no sunlight has ever reached. And yet, here, something is glowing.
