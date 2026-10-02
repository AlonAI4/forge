# Runway (`runway`)

Category: Video. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every video model.** The one rule that matters on every video model: describe motion over time, not a photograph. Write what happens from the first second to the last. One camera move per shot.

**What it does.** Gen-4.5 by Runway. Best-in-class prompt adherence on sequenced instructions, character emotion and facial nuance, with a photoreal and stylised range. Limits: 720p ceiling, ten-second cap, and text-to-video is locked to 16:9.
**Write it as.** Runway's own template, 30 to 90 words: [camera] shot of [subject] [action] in [environment], then supporting description. Order does not matter and there is no ideal length; clarity beats word count. For image-to-video, describe only what changes.
**Settings.** For vertical, generate a still first and go image-to-video. Never prompt motion that contradicts motion implied in the source image.

**Master prompt (RW-00)**

```
Slow push-in shot of a young woman in a yellow raincoat turning from a rainy window to look at the camera and slowly smile, in a dim apartment lit by a single lamp. Her expression moves from worried to relieved. Soft rain on the glass, warm lamp light against blue dusk outside. 10 seconds, 16:9, 720p.
```

1. **RW-01 Emotion shift.** Static close-up shot of an old man reading a letter and slowly starting to laugh, in a sunlit kitchen. His eyes crinkle, shoulders shake. Natural morning light. 8s.
2. **RW-02 Image to video, minimal.** Image to video from the attached still of a lake at dawn. Only the mist drifts slowly to the right and the water ripples gently. Nothing else moves. 5s.
3. **RW-03 Sequenced action.** Handheld medium shot of a chef flipping a pancake, catching it, then sliding it onto a plate and pushing the plate toward the camera, in a bright home kitchen. Warm, natural. 10s.
4. **RW-04 Stylised.** Wide tracking shot of a paper-cutout fox running through a paper forest, trees sliding past in layers, in a handmade diorama style. Warm paper textures, soft light. 8s.
5. **RW-05 Vertical via still.** Image to video from the attached vertical still of a skateboarder mid-air. He lands, rolls forward and out of frame bottom left. Slight camera shake on landing. 5s.
6. **RW-06 Two-person moment.** Static medium two-shot of a boy handing a girl a small wrapped box, her surprised then delighted expression, in a school corridor. Fluorescent light, natural. 8s.
7. **RW-07 Product turn.** Slow orbit shot of a ceramic teapot with steam rising from the spout, on a wooden table by a window. Soft daylight, shallow depth. 6s.
8. **RW-08 Weather change.** Static wide shot of a hilltop tree as clouds race over and rain begins, then sun breaks through, in an open green field. 10s.
9. **RW-09 Sci-fi character.** Slow push-in shot of an android's face as its eyes light up blue and it blinks for the first time, in a dark lab. Cold blue light with a warm flicker. 8s.
10. **RW-10 Kids animation.** Static wide shot of a round cartoon bear trying to catch a butterfly, jumping and missing twice, then the butterfly lands on its nose, in a bright meadow. Soft 3D style. 10s.
11. **RW-11 Cityscape.** Slow tilt-up shot of a wet city street at night rising to reveal neon signs and rain, in a narrow alley. Cool blues and pink neon. 8s.
12. **RW-12 Facial nuance.** Static close-up shot of a girl trying not to laugh while keeping a straight face, then failing, in a quiet library. Soft window light. 8s.
13. **RW-13 Drone style.** Slow forward aerial shot over a winding river toward mountains at sunrise, in a wide valley with mist in the low ground. Golden and cool. 10s.
14. **RW-14 Image to video, product.** Image to video from the attached still of a perfume bottle. Only a soft light sweeps across the glass from left to right and a few dust motes drift. 5s.
15. **RW-15 Sports.** Slow-motion tracking shot of a footballer striking a ball and the net rippling, in a floodlit stadium at night. Hard white light, grass spray. 8s.
