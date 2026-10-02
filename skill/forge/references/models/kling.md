# Kling (`kling`)

Category: Video. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every video model.** The one rule that matters on every video model: describe motion over time, not a photograph. Write what happens from the first second to the last. One camera move per shot.

**What it does.** 3.0 / O1 by Kuaishou. The shot-list model: it plans several shots in one generation, and its element binding is the strongest identity lock available. Multi-shot narrative, character consistency, motion transfer, 4K, non-English dialogue. Weak point: it over-reads long prompts and invents shot changes you did not ask for.
**Write it as.** One block per shot, 60 to 150 words, in Kling's order: shot type, movement direction, duration or speed descriptor, then style elements. Use Master Shots camera presets when the move matters. Bind elements or identity drifts past about eight seconds. Say "one continuous take" explicitly if you want no cuts.
**Settings.** Audio is billed per second and on by default. Turn it off for silent b-roll.

**Master prompt (KL-00)**

```
Element: @Mira (bound from the attached reference: red jacket, short dark hair).
Shot 1: wide shot, slow push in, 3 seconds. @Mira stands alone on an empty train platform at dawn, fog rolling in. Muted blue palette, film grain.
Shot 2: medium shot, static, 3 seconds. @Mira checks her watch, then looks up as headlights appear in the fog.
Shot 3: close-up, slight handheld drift, 4 seconds. @Mira's face lit by the approaching train, a small smile. Warm light rising over the blue.
Three shots, cut cleanly between them, same location and light throughout. Audio on: platform ambience, a distant train horn. 10 seconds, 16:9, 1080p.
```

1. **KL-01 One continuous take.** One continuous take, no cuts. Medium tracking shot, moving right to left at walking pace, 8 seconds. A courier cycles through a narrow market street, weaving past stalls of fruit and hanging lanterns, morning light. Warm, lively, handheld feel. Audio off.
2. **KL-02 Product, three shots.** Shot 1: macro, slow orbit, 3s. A wireless earbud case opens on a white surface. Shot 2: close-up, static, 3s. One earbud lifts out and rotates. Shot 3: wide, slow pull back, 4s. The case and earbuds on a desk beside a laptop. Clean commercial look, soft studio light. Audio off. 16:9.
3. **KL-03 Character intro with element.** Element: @Kade (attached, tall, green cloak). Shot 1: low wide, slow tilt up, 4s. @Kade walks toward the camera across a snowy field. Shot 2: close-up, static, 4s. @Kade pulls back the hood, breath visible. Cool palette, soft overcast light. Audio on: wind, footsteps in snow.
4. **KL-04 Dance, motion transfer.** Use the attached dance video as the motion source. Medium full-body shot, static, 8s. A cartoon fox in a hoodie performs the same moves on a rooftop at sunset, city behind. Stylised 3D, warm backlight. Audio off.
5. **KL-05 Non-English dialogue.** Shot 1: medium two-shot, static, 5s. Two friends at a cafe table. The first says in Spanish "¿Lo terminaste?" and the second nods and says "Anoche." Shot 2: close-up on the second friend, 3s, a proud smile. Natural daylight, warm. Audio on with dialogue. 16:9.
6. **KL-06 Car, Master Shot preset.** Master Shot: low tracking. 8 seconds. A red vintage car drives along a coastal road at golden hour, waves crashing below, the camera keeping pace at wheel height. Warm, glossy, commercial. Audio on: engine, waves.
7. **KL-07 Fantasy, three shots.** Shot 1: extreme wide, static, 3s. A dragon circles a mountain fortress at dusk. Shot 2: medium, slow pan left, 3s. Guards on the wall raise torches. Shot 3: close-up, static, 4s. The dragon lands on the tower, eyes glowing. Painterly epic, cool dusk with warm torchlight. Audio on: wingbeats, a roar.
8. **KL-08 Cooking sequence.** Shot 1: overhead, static, 3s. Hands slice an onion on a board. Shot 2: side close-up, static, 3s. The onion slides into a hot pan, sizzling. Shot 3: medium, slow push in, 4s. The cook stirs and tastes. Bright kitchen, natural light. Audio on: knife, sizzle.
9. **KL-09 Silent b-roll.** One continuous take. Wide static, 8s. Waves rolling onto an empty beach at dawn, foam sliding up the sand and back. Soft pastel light. Audio off.
10. **KL-10 Game cinematic.** Element: @Hero (attached). Shot 1: wide, slow crane up, 4s. @Hero stands before a huge iron gate. Shot 2: close-up, static, 2s. @Hero's hand presses a glowing rune. Shot 3: wide, slow push in, 4s. The gate grinds open, light pouring out. Dark fantasy, cold blue with a warm reveal. Audio on: stone grinding.
11. **KL-11 Vertical ad.** Shot 1: close-up, static, 3s. A hand taps a phone showing a fitness app timer starting. Shot 2: medium, slight handheld, 5s. A runner sets off along a river path at sunrise. Bright, energetic. 9:16. Audio on: a beep, footsteps.
12. **KL-12 Animal documentary.** One continuous take. Long lens medium shot, slow pan right, 8s. A fox trots along a snowy ridge, pauses to sniff the air, and continues. Natural, muted winter light. Audio on: wind only.
13. **KL-13 Interview style.** Medium shot, static, 8s. A young inventor at a workbench holds up a small robot and says "It took forty tries, but it walks now." then sets it down and it takes two steps. Warm workshop light. Audio on with dialogue.
14. **KL-14 Horror beat.** Shot 1: wide, static, 4s. A dark hallway, one door slightly open, light flickering inside. Shot 2: slow push in, 4s. The door creaks wider on its own. Desaturated, cold. Audio on: the creak, a low hum.
15. **KL-15 Motion transfer, sport.** Use the attached video of a basketball crossover as the motion source. Medium shot, static, 6s. A stylised low-poly player performs the same crossover on an outdoor court at dusk. Audio off.
16. **KL-16 Two elements together.** Elements: @Mira and @Kade (both attached). Medium two-shot, static, 8s. @Mira hands @Kade a folded map across a wooden table by candlelight; he unfolds it and looks up. Warm, intimate, one continuous take. Audio on: paper rustle.
