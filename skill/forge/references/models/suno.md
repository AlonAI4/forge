# Suno (`suno`)

Category: Music. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every music model.** Five things to decide before you write any music prompt: genre, mood, instrumentation, tempo in BPM, and era. Say BPM and key as numbers and letters, not "fast" and "sad".

**What it does.** v6 by Suno. Full songs with vocals, fast iteration, personas and custom models. A Style field, a Lyrics field, and a dedicated Exclude Styles box that is the only reliable way to say no. Artist names, exact mix settings and hard BPM enforcement do not work in Style.
**Write it as.** Style: four to seven descriptors, no more: genre, subgenre, tempo, key instruments, vocal style, production, mood. Lyrics: metatags [Intro] [Verse 1] [Pre-Chorus] [Chorus] [Bridge] [Breakdown] [Outro], and parameterised sections like [Chorus: full band, soaring vocals].
**Watch out.** Never put negatives in Style. Weirdness sits at 50% by default; Style Influence controls how strictly it follows your descriptors. Download caps apply from 3 September 2026.

**Master prompt (SU-00)**

```
Style: indie pop, mid-tempo, jangly electric guitar, female vocal, lo-fi warm production, hopeful
Exclude Styles: metal, EDM, autotune
Lyrics:
[Intro: guitar only]
[Verse 1]
Blank file, blinking line
Every idea I had was fine
Until I typed it, watched it fall
[Pre-Chorus]
But there's a version that works
[Chorus: full band, layered harmonies]
Ship it, then fix it
Ship it, then fix it
Nobody's waiting for perfect tonight
[Verse 2]
Red text, line ten
Read it twice and try again
[Chorus]
[Bridge: drums drop out, one voice]
It doesn't have to be good yet
It has to be there
[Chorus]
[Outro: guitar fades]
```

1. **SU-01 Rock anthem.** Style: alt rock, driving, distorted guitars, male vocal, big drums, anthemic. Exclude: pop punk, rap. Lyrics: [Intro: drums] [Verse 1] Ran the level forty times / Same jump, same fall, same line [Chorus: gang vocals] One more try, one more try / We don't quit, we just retry [Verse 2] Save point, deep breath, go [Chorus] [Outro: feedback]
2. **SU-02 Lo-fi study.** Style: lo-fi hip hop, slow, Rhodes, soft female humming, vinyl crackle, calm. Exclude: rap verses, heavy drums. Lyrics: [Intro] [Verse 1: hummed, no words] [Chorus: soft "mm" harmonies] [Outro]
3. **SU-03 Chiptune theme.** Style: chiptune, fast, 8-bit synths, no vocals, retro game, heroic. Exclude: vocals, orchestral. Lyrics: [Instrumental] [Intro] [Main theme] [Bridge: bass only] [Main theme] [Outro: power-down]
4. **SU-04 Country ballad.** Style: country, slow, acoustic guitar and pedal steel, warm male vocal, intimate, wistful. Exclude: pop, drums. Lyrics: [Verse 1] The porch light's on, the truck won't start / Same as last year, same old heart [Chorus] But the road home still knows my name [Verse 2] [Chorus] [Outro: pedal steel]
5. **SU-05 EDM drop.** Style: EDM, festival big room, 128, huge synth lead, chopped vocal, euphoric. Exclude: acoustic, ballad. Lyrics: [Intro: build] [Drop: no words, vocal chop "up"] [Breakdown: piano] [Build] [Drop] [Outro]
6. **SU-06 Kids' song.** Style: children's, bouncy, ukulele and claps, playful female vocal, bright, sing-along. Exclude: rock, sad. Lyrics: [Verse 1] Wash your hands, count to ten / Splash splash splash, and then again [Chorus: claps] Bubbles bubbles everywhere [Verse 2] [Chorus] [Outro: giggle]
7. **SU-07 Hebrew pop.** Style: Israeli pop, mid-tempo, synths and acoustic guitar, female vocal in Hebrew, polished, sunny. Exclude: rap, metal. Lyrics: [Verse 1] בוקר של שמש על הכביש / רדיו פתוח, אין מה להרגיש [Chorus] קדימה, קדימה, הים מחכה [Verse 2] [Chorus] [Outro]
8. **SU-08 Trailer chant.** Style: cinematic hybrid, slow, taiko drums and choir, no lead vocal, epic, tense. Exclude: pop, guitar. Lyrics: [Intro: drone] [Build: drums enter] [Chant: "rise" repeated] [Hit] [Silence] [Final hit]
9. **SU-09 Jazz standard style.** Style: vocal jazz, slow swing, piano trio and brushes, smoky female vocal, vintage, tender. Exclude: modern production, synths. Lyrics: [Verse 1] The last train left and I let it go / Some nights the city just moves too slow [Chorus] [Verse 2] [Piano solo] [Chorus] [Outro]
10. **SU-10 Punk, short.** Style: punk, very fast, power chords, shouted male vocal, raw, furious. Exclude: ballad, synths. Lyrics: [Intro: four count] [Verse 1] Homework, homework, every night / Turn it in, it's never right [Chorus: shouted] NO MORE! [Verse 2] [Chorus] [Outro: crash]
11. **SU-11 R&B.** Style: R&B, slow, smooth bass and Rhodes, male falsetto, silky, late night. Exclude: rock, fast. Lyrics: [Intro] [Verse 1] Two a.m. and the screen still glows / You said go to sleep, but the code, it flows [Chorus: layered falsetto] [Verse 2] [Bridge: bass only] [Chorus] [Outro]
12. **SU-12 Persona reuse.** Style: same persona as "Ship it", indie pop, uptempo, jangly guitar, female vocal, hopeful. Exclude: metal. Lyrics: [Verse 1] New week, new bug, same chair [Chorus: full band] Fix one thing, then one more [Verse 2] [Chorus] [Outro]
13. **SU-13 Hip-hop.** Style: hip hop, boom bap, 90, dusty drums and piano sample, confident male rap, gritty. Exclude: trap, autotune. Lyrics: [Intro: scratch] [Verse 1] Thirteen with a laptop, nobody asked / Built a whole game while the class did the task [Hook] Ship it, ship it [Verse 2] [Hook] [Outro]
14. **SU-14 Ambient with voice.** Style: ambient, very slow, pads and reverb piano, breathy female vocal, dreamy, calm. Exclude: drums, rap. Lyrics: [Intro: pads] [Verse 1: whispered] Slow down, slow down [Chorus: sustained "oh"] [Outro: piano alone]
15. **SU-15 Folk duet.** Style: folk, mid-tempo, acoustic guitar and fiddle, male and female duet, earthy, warm. Exclude: electronic. Lyrics: [Verse 1: male] I built the boat [Verse 1: female] I drew the map [Chorus: both] And neither one of us can swim [Verse 2] [Chorus] [Outro: fiddle]
