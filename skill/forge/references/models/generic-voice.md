# Any other voice model (`generic-voice`)

Category: Voice & speech. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**What it does.** The wildcard. A portable text-to-speech brief: the script marked up for prosody, a voice description, and the settings almost every engine exposes.
**Write it as.** Punctuation is prosody on every modern engine. Ellipses hesitate, dashes clip, capitals stress. Bracketed audio tags are an ElevenLabs v3 convention: strip them if your engine does not document them.

**Master prompt (GVO-00)**

```
Voice: a warm, clear female narrator, mid-thirties, British English, medium pace.
Script: Before we start — one thing. You do not need to understand everything today. You need to understand ONE thing well enough to use it tomorrow... That's it. That's the whole plan.
Settings: speed 1.0, stability medium, output mp3 44.1kHz. Strip any bracket tags if unsupported.
```

1. **GVO-01** Voice: young male, energetic, American. Script: Three, two, one — go! Okay, first checkpoint is the red door. Don't stop for the coins. Trust me.
2. **GVO-02** Voice: older female, gentle, Irish. Script: Sit down, love. Tea first... then we'll talk about the exam.
3. **GVO-03** Voice: neutral announcer, any dialect. Script: The next train to arrive at platform four is the 10:42 service to Brighton, calling at all stations.
4. **GVO-04** Voice: deep male, slow, dramatic. Script: Every kingdom falls. The only question... is who is standing when it does.
5. **GVO-05** Voice: friendly robot, slightly synthetic. Script: Hello! I am Bolt. I can help with maths, spelling, and, if you ask nicely, jokes.
6. **GVO-06** Voice: teenage girl, quick, sarcastic. Script: Sure. I'll "just restart it". Because that has DEFINITELY never been tried.
7. **GVO-07** Voice: calm male, meditative. Script: Breathe in for four... hold for four... and out for six. Again.
8. **GVO-08** Voice: cheerful female, Australian. Script: G'day and welcome aboard! Grab a seat anywhere — we'll be off in two minutes.
9. **GVO-09** Voice: nervous young male. Script: Um — hi. So, this is my first video, and I'm going to show you how I built a timer app in a weekend.
10. **GVO-10** Voice: authoritative female newsreader. Script: Good evening. Tonight: a breakthrough in battery storage, and the town that banned cars for a day.
