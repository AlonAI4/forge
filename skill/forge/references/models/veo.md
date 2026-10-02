# Veo (`veo`)

Category: Video. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every video model.** The one rule that matters on every video model: describe motion over time, not a photograph. Write what happens from the first second to the last. One camera move per shot.

**What it does.** 3.1 by Google DeepMind. Synced dialogue and native audio in one pass, physical plausibility, strong prompt adherence, clean 1080p and 4K. Limits: eight seconds maximum, only 16:9 and 9:16, and camera is language-driven with no true parameter control.
**Write it as.** Google's exact order, 40 to 120 words: cinematography, subject, action, context, style and ambiance. Dialogue goes in quotes. SFX and ambience get their own labelled lines.
**Settings.** 1080p and 4K are eight-second-only. Extending drops you to 720p. The prompt rewriter is on by default: turn it off for deterministic work.

**Master prompt (VE-00)**

```
Slow dolly-in at eye level. A teenage girl at a kitchen table late at night, a laptop glowing in front of her. She stares at the screen, then slumps back and laughs in relief as a green "All tests passed" flashes. Context: a small dim kitchen, a fridge humming, rain on the window. Style: naturalistic, handheld feel, warm lamp light against the cool screen glow.
Dialogue: she whispers "Finally."
SFX: a soft keyboard tap, then a chair creak.
Ambience: rain, a distant fridge hum.
8 seconds, 16:9, 1080p, prompt rewriter off.
```

1. **VE-01 Product reveal.** Slow orbit from left to right. A matte black smartwatch on a stone plinth, its screen lighting up with a rising heart-rate line. Context: a dark studio, a single soft top light. Style: clean commercial, shallow depth. SFX: a soft chime when the screen wakes. 8s, 16:9, 1080p.
2. **VE-02 Dialogue, two people.** Static medium two-shot. Two friends on a park bench, one holding a phone. The first says "You actually shipped it?" and the second grins and says "Last night. Go check." Context: an autumn park, leaves drifting. Style: warm, natural. Ambience: birds, distant traffic. 8s, 16:9.
3. **VE-03 Nature.** Slow aerial push forward over a misty pine valley at sunrise, the sun breaking over the ridge and light spilling down the slopes. Style: documentary, soft and quiet. Ambience: wind, one bird call. 8s, 16:9, 4K.
4. **VE-04 Vertical social.** Handheld close-up, phone height. A hand opens a takeaway box to reveal loaded fries, steam rising, then picks one up. Context: a bright kitchen counter. Style: punchy, saturated food content. SFX: cardboard opening, a crunch. 6s, 9:16.
5. **VE-05 Game trailer beat.** Fast tracking shot from behind. A knight sprints down a collapsing stone bridge as chunks fall into the void below, leaping the final gap. Style: painterly fantasy, dramatic side light. SFX: cracking stone, a heavy landing. Ambience: wind and distant rumbling. 8s, 16:9.
6. **VE-06 Cooking step.** Overhead static shot. Hands crack two eggs into a bowl and whisk them until frothy. Context: a wooden counter with a jug of milk beside. Style: bright, clean tutorial. SFX: a shell crack, whisking. 6s, 16:9.
7. **VE-07 Weather mood.** Static wide from a window. Rain hits a city street at dusk, umbrellas crossing, a bus splashing past, streetlights flickering on. Style: moody, blue hour. Ambience: rain, tyres on wet road, the bus hiss. 8s, 16:9.
8. **VE-08 Pet.** Low static shot at floor level. A ginger cat creeps toward the camera, stops, then pounces at a toy mouse that slides into frame from the right. Context: a sunny wooden floor. Style: playful, natural light. SFX: paws skittering. 6s, 16:9.
9. **VE-09 Explainer, single speaker.** Static medium shot. A young presenter at a plain desk looks into the camera and says "Here is the one thing most people get wrong about loops." while holding up one finger. Context: a tidy room, soft key light. Style: clean YouTube explainer. 5s, 16:9.
10. **VE-10 Sports.** Slow-motion tracking shot at track level. A sprinter explodes from the blocks, dust kicking up, muscles tensing, crossing in front of the lens. Style: gritty, hard low sun. SFX: the starting gun, a breath. 8s, 16:9, 4K.
11. **VE-11 Sci-fi corridor.** Steady push forward. A spaceship corridor with blue strip lights flickering, a door at the end hissing open to reveal a bright white room. Style: cold, clean sci-fi. SFX: the electrical flicker, the door hiss. Ambience: low engine hum. 8s, 16:9.
12. **VE-12 Time lapse.** Static wide. A cup of tea on a windowsill as the sky outside runs from morning to night, shadows sweeping across the sill. Style: soft, calm. Ambience: a clock ticking. 8s, 16:9.
13. **VE-13 Toy stop-motion.** Static tabletop shot. Two clay figures build a tiny tower of blocks, the tower wobbles and falls, they look at each other. Style: handmade stop-motion, slightly jerky, warm. SFX: soft clay taps, blocks tumbling. 8s, 16:9.
14. **VE-14 Music beat.** Slow tilt up. A drummer's hands on a kit in a dark room, sticks hitting a snare on the beat, sweat catching a single red light. Style: gritty, music video. SFX: the snare and kick in time. 6s, 9:16.
15. **VE-15 Fantasy reveal.** Slow crane up. A hooded traveller crests a hill and a huge floating city comes into view over the clouds beyond, banners rippling. Style: painterly epic, dawn light. Ambience: wind, a distant bell. 8s, 16:9, 4K.
16. **VE-16 Skate.** Handheld follow shot. A skater rolls toward a rail, grinds it, lands and rides off, the camera chasing. Context: a concrete plaza, late sun. Style: raw, fisheye feel. SFX: wheels on concrete, the grind, the landing. 8s, 16:9.
