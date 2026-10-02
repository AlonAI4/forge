# Luma Ray (`luma`)

Category: Video. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every video model.** The one rule that matters on every video model: describe motion over time, not a photograph. Write what happens from the first second to the last. One camera move per shot.

**What it does.** 3.2 by Luma AI. Sixteen keyframes per clip and native 16-bit HDR with EXR export, the only model that drops into a colour-managed post pipeline. Precise pacing via keyframes, performance preservation, colour-critical work. Not the cheapest or fastest, and audio is not its story.
**Write it as.** Narrative prose, 40 to 100 words, X happens then Y. Ray3 has a reasoning mode that plans event sequences, so it favours story over keyword stacks. Place keyframes on beat changes to lock timing.
**Settings.** Iterate in Draft mode, master only the final. Mastering every take at 4K HDR is the biggest credit waste on the platform.

**Master prompt (LR-00)**

```
A paper boat drifts down a rain-swollen gutter. It bumps a leaf, spins once, then slips under a bridge of two bricks and comes out the other side into sunlight, where it catches on a twig and stops. Keyframes: frame 1 the boat entering from the left, frame 8 the spin at the leaf, frame 16 resting on the twig in the sun. Low angle at water level, overcast turning to sun. Draft mode first, then master in 16-bit HDR, EXR export. 10 seconds, 16:9.
```

1. **LR-01 Two keyframes.** A candle flame burns steadily, then a door opens off-screen and the flame bends hard to the right and nearly goes out, then straightens as the door closes. Keyframes: frame 1 steady, frame 16 steady again. Dark room, warm. Draft.
2. **LR-02 Character beat.** A boy sits on a bench holding a paper plane. He tests the wind with a finger, throws, and the plane loops once and lands back in his lap. He laughs. Keyframes on the throw and the landing. Park, afternoon light. Draft, then master.
3. **LR-03 Colour-critical product.** A deep red lipstick rotates on a black surface as a soft light sweeps across it, then stops with the highlight on the tip. Keyframes at start, mid-sweep and stop. Master in HDR, EXR, for grading. 6s.
4. **LR-04 Weather sequence.** Fog sits over a lake, then a breeze pushes it aside to reveal a wooden jetty, then the sun breaks through and the water glitters. Keyframes at fog, jetty reveal, glitter. Static wide. Draft.
5. **LR-05 Dance on beats.** A dancer holds a pose, drops into a spin on the first beat, freezes on the second, and slides back on the third. Keyframes on each beat: frames 1, 6, 11, 16. Dark stage, single spotlight. Draft.
6. **LR-06 Pour.** Coffee pours into a clear glass, layering over milk, then the pour stops and the layers slowly swirl together. Keyframes at the first drop, the full glass, the swirl. Close macro, window light. Master in HDR.
7. **LR-07 Reveal.** A cloth is pulled from a small sculpture on a plinth, the cloth falls in slow folds, then a gallery light brightens on the piece. Keyframes on the pull and the light change. Quiet, cool white. Draft.
8. **LR-08 Vehicle.** A motorbike waits at a red light in the rain, the light turns green, it pulls away and its tail light streaks off into the wet dark. Keyframes on the green and the streak. Low angle, night. Draft, then master.
9. **LR-09 Nature micro.** A dewdrop on a leaf trembles, slides to the tip, hangs, then falls into a puddle with a ring. Keyframes at hang and fall. Macro, morning. Master in HDR.
10. **LR-10 Sports.** A gymnast runs, vaults, twists twice in the air, and lands with a small hop. Keyframes on take-off, peak, landing. Side wide shot, arena light. Draft.
11. **LR-11 Story in three beats.** A cat watches a bird on a windowsill, crouches, then the bird flies and the cat bumps its nose on the glass and looks offended. Keyframes on crouch, flight, bump. Warm indoor light. Draft.
12. **LR-12 Architectural light.** Sun moves across the face of a concrete building, shadows of the window recesses stretching then shrinking, then a cloud dims everything. Keyframes at start, peak shadow, cloud. Static, time-lapse feel. Master in HDR, EXR.
13. **LR-13 Hand lettering.** A hand with a brush writes the word "calm" on paper in one stroke per letter, then lifts away and the ink darkens as it dries. Keyframes at each letter. Overhead, soft light. Draft.
14. **LR-14 Fantasy.** A stone statue's eyes glow, cracks spread across it, then it breaks apart and a small bird flies out of the dust. Keyframes on glow, crack, bird. Temple interior, dusty light. Draft, then master.
