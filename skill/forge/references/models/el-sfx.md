# ElevenLabs Sound Effects (`el-sfx`)

Category: Sound effects. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**What it does.** eleven_text_to_sound_v2 by ElevenLabs. One effect per generation, then layer them in an editor: that is the documented workflow. Foley, impacts, ambience beds, UI sounds, musical one-shots and loops. Sequential multi-event prompts do not work well.
**Write it as.** Production language earns its place: "high-quality, professionally recorded footsteps on grass, sound effects foley". The terms the model knows are impact, whoosh, ambience, braam, glitch, drone, one-shot, loop, stem, foley.
**Settings.** `prompt_influence` defaults to 0.3, deliberately loose. Raise toward 0.8 for literal. Loop only works on v2, and WAV at 48kHz is non-looping only.

**Master prompt (SX-00)**

```
High-quality, professionally recorded foley: a heavy wooden door creaking open slowly in a stone hallway, dry close-mic'd recording, subtle hinge squeak, no reverb tail, no other sounds. One-shot, 4 seconds, prompt_influence 0.7.
```

1. **SX-01 UI click.** Clean, short UI button click, soft plastic tap with a tiny high tick, one-shot, 0.3 seconds, prompt_influence 0.8.
2. **SX-02 Success chime.** Bright two-note success chime, glassy bell, quick decay, UI notification, one-shot, 1 second, prompt_influence 0.8.
3. **SX-03 Error buzz.** Short low error buzz, muted square wave, two quick pulses, UI, one-shot, 0.5 seconds, prompt_influence 0.8.
4. **SX-04 Footsteps, grass.** High-quality, professionally recorded footsteps on dry grass, single person walking at a steady pace, foley, close-mic'd, loop, 6 seconds, prompt_influence 0.6.
5. **SX-05 Rain ambience.** Steady rain on a tin roof, medium distance, gentle wind, ambience bed, no thunder, loop, 30 seconds, prompt_influence 0.5.
6. **SX-06 Sword impact.** Heavy metal sword impact on a wooden shield, sharp transient, short wooden crack, foley one-shot, 1 second, prompt_influence 0.8.
7. **SX-07 Whoosh.** Fast cinematic whoosh, airy, rising pitch, for a title transition, one-shot, 1.5 seconds, prompt_influence 0.6.
8. **SX-08 Braam.** Deep cinematic braam, brassy, slow swell and long decay, trailer hit, one-shot, 4 seconds, prompt_influence 0.6.
9. **SX-09 Coin pickup.** Retro 8-bit coin pickup, bright ascending blip, game one-shot, 0.4 seconds, prompt_influence 0.8.
10. **SX-10 Jump.** Cartoon jump sound, springy upward boing, short, game one-shot, 0.5 seconds, prompt_influence 0.7.
11. **SX-11 Forest ambience.** Daytime forest ambience, distant birds, light breeze in leaves, no water, ambience bed, loop, 30 seconds, prompt_influence 0.5.
12. **SX-12 Glitch.** Digital glitch stutter, bit-crushed, short burst, sci-fi UI, one-shot, 0.8 seconds, prompt_influence 0.7.
13. **SX-13 Drone.** Low dark drone, slowly shifting, cinematic tension bed, no melody, loop, 20 seconds, prompt_influence 0.5.
14. **SX-14 Drum loop.** 90s hip-hop drum loop, 90 BPM, dusty kick and snare, light vinyl crackle, loop, 4 bars, prompt_influence 0.6.
15. **SX-15 Brass stab.** Vintage brass stab in F minor, punchy, short, musical one-shot, 1 second, prompt_influence 0.7.
16. **SX-16 Car pass.** Single car passing on a wet road, left to right, tyre spray, medium distance, one-shot, 4 seconds, prompt_influence 0.6.
17. **SX-17 Keyboard.** Mechanical keyboard typing, fast, clicky switches, close-mic'd, foley, loop, 8 seconds, prompt_influence 0.7.
18. **SX-18 Explosion.** Distant explosion, deep low thump with a rolling tail, outdoor, one-shot, 5 seconds, prompt_influence 0.6.
19. **SX-19 Magic.** Sparkling magic shimmer, rising glassy particles, fantasy spell cast, one-shot, 2 seconds, prompt_influence 0.6.
20. **SX-20 Crowd.** Small indoor crowd murmur, cafe, no distinct words, cups clinking occasionally, ambience bed, loop, 30 seconds, prompt_influence 0.5.
