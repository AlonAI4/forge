# Midjourney Video (`mjvideo`)

Category: Video. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every video model.** The one rule that matters on every video model: describe motion over time, not a photograph. Write what happens from the first second to the last. One camera move per shot.

**What it does.** V1 by Midjourney. Inherits the Midjourney look frame by frame. Motion-only prompts, five to twenty-one seconds, no audio at all. Per-frame aesthetic quality, stylisation, looping motion graphics. Weak at resolution, duration, physics, and anything with dialogue.
**Write it as.** Motion only, 5 to 25 words. Let the still carry the look. `--motion low` is the default and produces near-still results, so say `--motion high` when things should move. `--raw` makes it obey the prompt rather than Midjourney's taste. Extend x4 at about four seconds each to reach twenty-one seconds.

**Master prompt (MV-00)**

```
From the attached still: the clouds drift slowly right, her hair lifts in the wind, the camera pushes in gently. --motion high
```

1. **MV-01** Leaves fall past the window, the candle flickers, nothing else moves. --motion low
2. **MV-02** The knight turns his head toward the camera, cape billowing. --motion high
3. **MV-03** Rain streaks down the glass, neon reflections pulse. --motion high
4. **MV-04** Slow zoom out from the lighthouse as waves crash below. --motion high
5. **MV-05** The cat's tail twitches, its eyes follow something off screen. --motion low
6. **MV-06** Steam rises from the mug, the light shifts warmer. --motion low
7. **MV-07** The dragon's wings beat twice, embers drift up. --motion high
8. **MV-08** Slow orbit around the floating island, birds crossing the frame. --motion high --raw
9. **MV-09** The city lights flicker on one block at a time. --motion high
10. **MV-10** Snow falls softly, the cabin window glows brighter. --motion low
11. **MV-11** She smiles slowly and looks down. --motion low --raw
12. **MV-12** The kite loops once and pulls the string taut. --motion high
13. **MV-13** Fog rolls through the forest from left to right. --motion high
14. **MV-14** The record spins, the needle drops. --motion low
15. **MV-15** Fireflies rise from the grass, the moon brightens. --motion high
16. **MV-16** The spaceship banks left, stars streak. --motion high --raw
17. **MV-17** Waves lap at the rocks, seamless loop. --motion low
18. **MV-18** The flag ripples, the sun breaks through. --motion high
19. **MV-19** Extend: the camera keeps pushing in, the fog thickens. --motion high
20. **MV-20** Petals drift down, the koi turn under the surface. --motion low
