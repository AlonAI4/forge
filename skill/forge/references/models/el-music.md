# ElevenLabs Music (`el-music`)

Category: Music. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every music model.** Five things to decide before you write any music prompt: genre, mood, instrumentation, tempo in BPM, and era. Say BPM and key as numbers and letters, not "fast" and "sad".

**What it does.** music_v2_5 by ElevenLabs. Studio language moves real levers: sidechained, close-mic'd, bone-dry, tape saturation and plate reverb all produce audible change. Underscore and beds, full songs with structure, mid-track genre transitions, section-level inpainting.
**Write it as.** Narrate the arrangement in order: "Start with... just... then... bring in..." are load-bearing words. Negative space is the prompt for loops: "no melody, just drums". Timing directives work: "lyrics begin at 15 seconds".
**Settings.** `prompt` and `composition_plan` are mutually exclusive. `music_length_ms` only applies with `prompt`. Prompt cap is 4100 characters.

**Master prompt (EM-00)**

```
Lo-fi hip-hop, 82 BPM, warm and nostalgic, late-night study mood, 2010s bedroom-producer era. Start with just a dusty drum loop and vinyl crackle for eight bars. Then bring in a soft Rhodes chord progression, close-mic'd and slightly detuned, with light tape saturation. At 30 seconds add a muted upright bass following the chords. At 45 seconds a short muted-trumpet melody, bone-dry, no reverb. Keep it steady with no big changes, then let everything fade over the last ten seconds except the crackle. No vocals. music_length_ms 90000.
```

1. **EM-01 Drum loop only.** Boom-bap drums, 90 BPM, dusty and heavy, no melody, just drums, kick and snare with a swung hi-hat, light vinyl crackle, loopable, 8 bars. music_length_ms 21000.
2. **EM-02 Game menu underscore.** Ambient synth underscore, 70 BPM, calm and mysterious, fantasy game menu, 2020s. Start with a slow pad in D minor, then at 20 seconds bring in a soft plucked harp figure, then a low drone under it. No drums, no vocals. Loopable. music_length_ms 60000.
3. **EM-03 Full song with lyrics timing.** Indie pop, 118 BPM, bright and hopeful, jangly guitars, 2000s. Start with just a clean guitar riff, drums enter at 8 seconds, lyrics begin at 15 seconds with a female vocal, chorus at 45 seconds with layered harmonies, bridge at 1:30 dropping to piano only, final chorus at 1:50. music_length_ms 150000.
4. **EM-04 Genre transition.** Start as a slow acoustic folk ballad, 76 BPM, fingerpicked guitar and a soft male vocal, warm and intimate. Then at 40 seconds transition into a driving synthwave version of the same melody, 120 BPM, gated reverb drums and arpeggiated bass. music_length_ms 90000.
5. **EM-05 Trailer cue.** Epic orchestral hybrid, 100 BPM, tense and building, cinematic trailer, 2020s. Start with just a low string drone and a ticking pulse. Then bring in braams every eight bars, then a rising choir, then full percussion. Hard stop at the end with a single hit. No vocals with words. music_length_ms 60000.
6. **EM-06 Sidechained house.** Deep house, 124 BPM, warm and groovy, late-night club, 2010s. Four-on-the-floor kick, a sidechained pad pumping against it, a rolling sub bass, a filtered vocal chop with plate reverb. Build the filter open over 32 bars. No lead vocal. music_length_ms 120000.
7. **EM-07 Kids' theme.** Playful ukulele and glockenspiel tune, 110 BPM, cheerful and bouncy, children's app theme, 2020s. Start with just ukulele strumming, then bring in glockenspiel melody, hand claps on two and four, a short whistled hook. Under 30 seconds, ends cleanly. music_length_ms 28000.
8. **EM-08 Sad piano.** Solo piano, 64 BPM, melancholic and sparse, film underscore, timeless. Close-mic'd felt piano, slight room reverb, a simple repeating left-hand figure in A minor, a melody that enters at 15 seconds and never resolves. No other instruments. music_length_ms 75000.
9. **EM-09 Inpaint a section.** Using the attached track, regenerate only seconds 40 to 55: replace the current synth lead with a distorted electric guitar playing the same melody, keep the drums and bass identical.
10. **EM-10 Rock intro.** Garage rock, 150 BPM, raw and urgent, 2000s, fuzz guitar, live drums, bone-dry mix. Start with just a four-count on sticks, then guitar and drums together, a two-bar bass break at 20 seconds, then a full band ending. No vocals. music_length_ms 35000.
11. **EM-11 Jazz bed.** Cool jazz trio, 96 BPM, relaxed and smoky, cafe background, 1950s. Brushed drums, upright bass walking, a Rhodes comping softly, tape saturation. No solos, no vocals, stays in the background. Loopable. music_length_ms 120000.
12. **EM-12 Retro game chiptune.** Chiptune, 140 BPM, energetic and heroic, 8-bit game level theme, 1980s. Square-wave lead melody, triangle bass, noise-channel drums. Start with just the bass and drums for four bars, then the lead. Loopable, ends where it starts. music_length_ms 40000.
13. **EM-13 Ambient nature.** Ambient, 60 BPM, peaceful and wide, meditation bed, 2020s. A slow evolving pad, soft granular textures, a distant piano note every sixteen bars, no drums, no vocals, no melody as such. music_length_ms 180000.
14. **EM-14 Hype sports.** Trap, 145 BPM, aggressive and confident, sports highlight reel, 2020s. Start with just a dark 808 and a hi-hat roll, bring in a brass stab hook at 8 seconds, a chant-style vocal "go" on the drop at 16 seconds. music_length_ms 45000.
15. **EM-15 Composition plan.** composition_plan: intro 0 to 10s acoustic guitar only; verse 10 to 40s add soft drums and bass; chorus 40 to 60s full band with strings; outro 60 to 75s guitar and strings fading. Style: folk pop, 104 BPM, warm, 2010s. No lyrics.
