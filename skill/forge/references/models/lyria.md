# Google Lyria (`lyria`)

Category: Music. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every music model.** Five things to decide before you write any music prompt: genre, mood, instrumentation, tempo in BPM, and era. Say BPM and key as numbers and letters, not "fast" and "sad".

**What it does.** 3 Pro by Google DeepMind. Three-minute full-structure songs with timestamp prompting, vocals with timed lyrics, scoring to picture, and music from a reference image or PDF. Every output carries SynthID and C2PA. No documented negative prompting.
**Write it as.** Google's formula: genre and style, mood, instrumentation, tempo and rhythm, vocal style and language, then lyrics. Timestamp prompting with [MM:SS] tags assigns actions to timed segments, which is how you score to a cut.

**Master prompt (LY-00)**

```
Genre and style: cinematic indie folk. Mood: hopeful, slowly building. Instrumentation: fingerpicked acoustic guitar, upright bass, soft strings, light brushed drums. Tempo and rhythm: 92 BPM, steady 4/4. Vocal style and language: soft male vocal, English.
[00:00] guitar alone, sparse. [00:20] bass and brushes enter. [00:40] vocal begins, verse one. [01:10] strings swell into the chorus. [01:40] verse two, drums slightly fuller. [02:10] final chorus with harmonies. [02:40] everything drops to guitar and one voice. [02:55] end.
Lyrics: verse one "Blank page, first light, nothing built yet, nothing right"; chorus "Ship it, then fix it, nobody's waiting for perfect tonight".
```

1. **LY-01 Score to a cut.** Genre: orchestral hybrid. Mood: tense to triumphant. Instrumentation: low strings, taiko, brass, choir. Tempo: 100 BPM. No vocals. [00:00] low drone. [00:08] ticking pulse. [00:16] brass hit on the title reveal. [00:24] full percussion. [00:40] choir. [00:58] hard stop. Length 60 seconds.
2. **LY-02 From an image.** Reference: the attached painting of a rainy harbour at night. Genre: jazz noir. Mood: lonely, elegant. Instrumentation: muted trumpet, piano, upright bass, brushes. Tempo: 70 BPM. No vocals. Three minutes.
3. **LY-03 Timed lyrics pop.** Genre: synth pop. Mood: bright, nostalgic. Instrumentation: analogue synths, gated drums, bass synth. Tempo: 118 BPM. Vocal: female, English. [00:00] intro synth arp. [00:15] verse one vocal. [00:45] chorus. [01:15] verse two. [01:45] chorus. [02:10] bridge, drums out. [02:30] final chorus. [03:00] end. Lyrics: chorus "Run the level one more time, the jump is yours, the jump is mine".
4. **LY-04 Kids' theme.** Genre: playful acoustic. Mood: cheerful. Instrumentation: ukulele, glockenspiel, hand claps, whistle. Tempo: 112 BPM. Vocal: children's chorus, English. [00:00] ukulele. [00:08] claps. [00:16] whistled hook. [00:30] end. Lyrics: "Wash, wash, count to ten".
5. **LY-05 Hebrew ballad.** Genre: Israeli singer-songwriter. Mood: tender. Instrumentation: nylon guitar, piano, soft strings. Tempo: 76 BPM. Vocal: female, Hebrew. [00:00] guitar. [00:20] vocal verse. [00:55] chorus with piano. [01:30] verse two. [02:05] chorus with strings. [02:45] end. Lyrics: chorus "הבית עוד זוכר את השם שלי".
6. **LY-06 Lo-fi bed.** Genre: lo-fi hip hop. Mood: calm. Instrumentation: Rhodes, dusty drums, vinyl crackle. Tempo: 84 BPM. No vocals. [00:00] drums and crackle. [00:16] Rhodes. [00:48] muted bass. [02:50] fade. Three minutes.
7. **LY-07 From a PDF.** Reference: the attached PDF of a short poem about the sea. Genre: chamber folk. Mood: wistful. Instrumentation: cello, harp, soft vocal. Tempo: 68 BPM. Vocal: female, English, singing the poem's lines. Three minutes.
8. **LY-08 Game boss theme.** Genre: orchestral metal. Mood: menacing, driving. Instrumentation: distorted guitars, orchestral strings, choir, double-kick drums. Tempo: 160 BPM. No vocals. [00:00] choir and strings. [00:10] guitars and drums crash in. [01:00] half-time breakdown. [01:20] full speed. [02:00] loop point.
9. **LY-09 Advert sting.** Genre: upbeat indie. Mood: fresh. Instrumentation: clean guitar, claps, bass. Tempo: 120 BPM. No vocals. [00:00] guitar riff. [00:05] claps and bass. [00:12] stop on a single chord. Length 15 seconds.
10. **LY-10 Rap with timed verses.** Genre: boom bap. Mood: confident. Instrumentation: piano sample, dusty drums, bass. Tempo: 90 BPM. Vocal: male rap, English. [00:00] intro scratch. [00:10] verse one. [00:40] hook. [00:55] verse two. [01:25] hook. [01:40] end. Lyrics: hook "Thirteen and I ship it, no waiting, no limit".
11. **LY-11 Ambient sleep.** Genre: ambient. Mood: still. Instrumentation: soft pads, distant piano. Tempo: 56 BPM, free. No vocals. [00:00] pad. [01:00] a single piano phrase. [02:00] pad thickens slightly. [03:00] end. Three minutes.
12. **LY-12 Surf rock.** Genre: surf rock. Mood: sunny, fast. Instrumentation: reverb guitar, bass, drums. Tempo: 165 BPM. No vocals. [00:00] drum roll. [00:03] guitar riff. [00:30] break with bass. [00:45] riff returns. [01:00] end.
