# Stable Audio (`stableaudio`)

Category: Music. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every music model.** Five things to decide before you write any music prompt: genre, mood, instrumentation, tempo in BPM, and era. Say BPM and key as numbers and letters, not "fast" and "sad".

**What it does.** 2.5 by Stability AI. Built for brand and production sound: loops and beds, brand sound, and audio inpainting that regenerates a specific span of an existing track. Vocals and song structure are not its strength.
**Write it as.** Stability's order: core style, key instruments, mood, specific details, then additional instructions. Use their tempo bands: 60 to 80 ballads, 80 to 100 R&B and house, 100 to 120 pop-rock and jazz, 120 to 140 disco and techno, 140 to 160 dubstep and metal. Use sophisticated mood words: euphoric not happy, melancholic not sad, soaring not energetic. Naming an era does real work.

**Master prompt (SA-00)**

```
Core style: modern corporate indie pop. Key instruments: clean electric guitar, soft synth pads, tight acoustic drums, warm bass. Mood: optimistic, uplifting, understated. Specific details: 112 BPM, major key, 2010s production, a clear four-bar loop point, no vocals. Additional instructions: keep dynamics even for use under voice-over, end cleanly on the downbeat. 45 seconds.
```

1. **SA-01 Loop, house.** Core style: deep house. Instruments: kick, sidechained pad, rolling sub bass, shaker. Mood: hypnotic, warm. Details: 122 BPM, seamless loop, 8 bars, 2010s. Instructions: no melody, just groove.
2. **SA-02 Brand sting.** Core style: minimal electronic. Instruments: marimba synth, sub, one clap. Mood: confident, clean. Details: 100 BPM, 5 seconds, a rising three-note motif ending on a single hit. Instructions: leave silence after the hit.
3. **SA-03 Melancholic piano.** Core style: cinematic piano. Instruments: felt piano, distant strings. Mood: melancholic, tender. Details: 66 BPM, minor key, sparse. Instructions: no drums, 60 seconds, slow fade.
4. **SA-04 80s workout.** Core style: 80s synth pop. Instruments: gated reverb drums, analogue bass synth, bright lead. Mood: euphoric, driving. Details: 126 BPM, 80s gated reverb, 30-second loop. Instructions: no vocals.
5. **SA-05 Inpaint.** Using the attached 90-second track, regenerate seconds 30 to 45 only: replace the distorted guitar with a clean tremolo guitar, keep drums and bass unchanged, match the level.
6. **SA-06 Metal bed.** Core style: modern metal. Instruments: down-tuned guitars, double-kick, bass. Mood: menacing, relentless. Details: 150 BPM, drop C, 90s grunge distortion on the rhythm guitars. Instructions: no vocals, 30 seconds, loop.
7. **SA-07 Jazz cafe.** Core style: cool jazz. Instruments: brushed drums, upright bass, piano. Mood: relaxed, sophisticated. Details: 104 BPM, 1950s, swung. Instructions: stays in the background, no solos, 2 minutes.
8. **SA-08 Techno.** Core style: Berlin techno. Instruments: kick, metallic percussion, dark pad. Mood: hypnotic, cold. Details: 132 BPM, 2000s, 16-bar loop. Instructions: no melody.
9. **SA-09 Podcast intro.** Core style: indie electronic. Instruments: plucked synth, light drums, bass. Mood: curious, bright. Details: 108 BPM, 12 seconds, ends on a clean hit. Instructions: leave a gap for a voice at 6 seconds.
10. **SA-10 Dubstep drop.** Core style: dubstep. Instruments: wobble bass, heavy snare, sub. Mood: aggressive, soaring on the build. Details: 140 BPM, 2010s, build for 8 bars then drop. Instructions: 30 seconds, no vocals.
11. **SA-11 Ambient bed.** Core style: ambient. Instruments: evolving pad, granular texture. Mood: serene, expansive. Details: 60 BPM, no drums, 3 minutes. Instructions: very slow changes, loopable.
12. **SA-12 R&B groove.** Core style: neo-soul R&B. Instruments: Rhodes, warm bass, laid-back drums. Mood: sultry, laid-back. Details: 88 BPM, 2000s, swung hi-hats. Instructions: no vocals, 8-bar loop.
