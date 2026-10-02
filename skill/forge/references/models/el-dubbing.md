# ElevenLabs Dubbing (`el-dubbing`)

Category: Voice & speech. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**What it does.** v2 by ElevenLabs. Ninety-plus languages, keeps the original voices and the background bed, handles overlapping speech. Localising finished video without re-mixing, preserving the performance. It is not a script tool: to change what is said, dub from an edited transcript in Dubbing Studio.
**Write it as.** Settings, not a prompt. Use BCP-47 tags with the dialect: en-AU, es-MX, pt-BR. Speaker similarity runs 0 to 10, default 7.
**Watch out.** API limit 3GB per file, 180 minutes in-app. Dubbing Studio caps at 45 minutes. Concurrency is three jobs on self-serve.

**Master prompt (DB-00)**

```
Source: the attached 12-minute tutorial video, source language en-GB.
Targets: es-MX, pt-BR, he-IL.
Speakers: 1 (auto-detect on).
Speaker similarity: 8, because the presenter's voice is the brand.
Keep background music and keyboard sounds. Watermark off. Output: one MP4 per language plus SRT.
```

1. **DB-01 Game trailer.** Source: 90-second trailer, en-US. Targets: ja-JP, ko-KR, de-DE, fr-FR. Speakers: 2. Similarity 9 to keep the trailer voice. Keep the score. Output MP4 per language.
2. **DB-02 Interview, two voices.** Source: 25-minute interview, en-AU. Target: es-ES. Speakers: 2, overlapping speech expected. Similarity 7. Keep room tone. Output MP4 plus transcript.
3. **DB-03 Edited transcript path.** Source: 8-minute explainer, en-GB. Target: he-IL. Use Dubbing Studio: I will correct the transcript first, then dub. Similarity 7.
4. **DB-04 Kids' cartoon.** Source: 11-minute episode, en-US. Targets: it-IT, nl-NL, sv-SE. Speakers: 5. Similarity 8, the character voices matter. Keep the music and effects stems. Output MP4 per language.
5. **DB-05 Lecture, long.** Source: 170-minute lecture recording, en-US. Target: pt-BR. Speakers: 1. Similarity 6, clarity over likeness. Output MP4 and SRT. Note: under the 180-minute in-app cap, plan for one job.
6. **DB-06 Product demo, batch.** Source: three 3-minute demo clips, en-GB. Targets: fr-CA, es-MX, ar-SA. Speakers: 1. Similarity 8. Run three at a time to respect concurrency. Output MP4 per clip per language.
7. **DB-07 Podcast.** Source: 40-minute podcast audio, en-US. Target: de-DE. Speakers: 3, overlapping laughter. Similarity 7. Output MP3.
8. **DB-08 Hebrew to English.** Source: 6-minute school announcement video, he-IL. Target: en-GB. Speakers: 1. Similarity 7. Keep background. Output MP4 plus SRT.
9. **DB-09 Short social clips.** Source: ten 30-second vertical clips, en-US. Targets: es-419, pt-BR. Speakers: 1. Similarity 8. Watermark off. Output MP4 per clip.
10. **DB-10 Documentary.** Source: 48-minute documentary, fr-FR. Target: en-US. Speakers: 4 including a narrator. Similarity 8 for the narrator. Keep the music bed. Output MP4 and SRT.
