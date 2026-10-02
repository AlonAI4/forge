# Leonardo (`leonardo`)

Category: Image. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**What it does.** Lucid Origin by Leonardo AI / Canva. A platform as much as a model: trainable personal models and character LoRAs are the reason to be here. Sketch-to-image on Realtime Canvas, game and concept-art asset pipelines, cost-efficient volume. Raw fidelity trails frontier models, and quality depends on which hosted model you pick.
**Write it as.** Simple prose, 30 to 120 words, then targeted cues: lighting, lens and mood for photoreal, medium and palette for illustration.
**Settings.** Leonardo's own sweet spot is Fast mode, 1440x1440, 15 steps or fewer. Dimensions must be multiples of 8 and cap at 2496px. Lucid Origin for stills; Lucid Realism is tuned for video input frames.

**Master prompt (LE-00)**

```
A young adventurer with a red bandana and a leather satchel standing at the mouth of a glowing cave, holding up a lantern. Full body, three-quarter view. Painted concept art, warm lantern light against cool blue cave light, soft brushwork, muted earth palette. Plain enough background to cut out for a game menu. Lucid Origin, Fast mode, 1440x1440, 12 steps.
```

1. **LE-01 Enemy set.** Three cartoon slime enemies in a row, green, blue and red, each a different size, simple shapes, big eyes, flat shading, plain white background. Game asset sheet. Lucid Origin, 1440x1440, 12 steps.
2. **LE-02 Background, forest.** A side-scrolling game background of a misty forest with layered trees getting lighter toward the back, no characters, soft painterly style, green and grey palette. Wide. Lucid Origin, 2048x1024, 15 steps.
3. **LE-03 Hero portrait.** A determined teenage hero with short black hair and a blue jacket, head and shoulders, looking at the camera. Anime style, clean lines, soft cel shading. Lucid Origin, 1440x1440, 12 steps.
4. **LE-04 Weapon icons.** Four fantasy weapon icons in a row: sword, axe, bow, staff, each glowing slightly, dark background, painterly, consistent size. Lucid Origin, 2048x512, 12 steps.
5. **LE-05 Sketch to image.** From the attached rough sketch of a castle on a hill, render a finished painting with sunset light, warm sky, cool shadows, painterly style. Realtime Canvas, strength 0.6.
6. **LE-06 Photoreal coffee.** A latte with leaf art on a marble table by a window, morning light from the left, 50mm, shallow depth of field, warm and calm. Lucid Origin, 1440x1440, 15 steps.
7. **LE-07 Character LoRA use.** My trained character Mika standing on a beach at sunset, wind in her hair, waving. Full body, painterly, warm palette. Custom model Mika, strength 0.8, Lucid Origin base, 1440x1440.
8. **LE-08 Tileable ground.** A seamless top-down grass and dirt path texture for a 2D game, flat shading, no shadows, tile-ready. Lucid Origin, 1024x1024, 12 steps, tiling on.
9. **LE-09 Vehicle.** A small rusty hover-bike parked in a junkyard, side view, sci-fi, painterly, orange rust and grey metal. Concept sheet style, plain background. Lucid Origin, 1440x1440.
10. **LE-10 UI frame.** An ornate golden fantasy UI frame, empty in the middle, rounded corners, small gems at the corners, on a transparent-looking dark background. Lucid Origin, 1440x1440, 12 steps.
11. **LE-11 Boss concept.** A giant stone golem with glowing blue cracks, standing in a ruined temple, low angle, dramatic side light, painterly concept art, grey and blue palette. Lucid Origin, 1024x1440.
12. **LE-12 Food illustration.** A stack of pancakes with syrup and berries, illustrated in a soft cartoon style, warm colours, plain cream background. Lucid Origin, 1440x1440.
13. **LE-13 Poster background.** An abstract background of soft purple and teal waves with a subtle grain, no subject, for text overlay. Lucid Origin, 1024x1440, 10 steps.
14. **LE-14 Pet photo.** A ginger cat sitting in a cardboard box on a wooden floor, window light, 35mm, eye level, natural colours. Lucid Origin, 1440x1440, 15 steps.
15. **LE-15 Item card art.** A glowing blue crystal on a stone pedestal, centred, dark cave background, painterly, item card art for a mobile game. Lucid Origin, 1024x1440.
16. **LE-16 Batch variations.** A cosy wooden cabin in snow at night, warm windows, painterly. Generate four variations with different roof shapes. Lucid Origin, 1440x1440, 12 steps, 4 images.
17. **LE-17 Sci-fi corridor.** An empty spaceship corridor with blue strip lights, straight-on view, clean and cold, game background. Lucid Origin, 2048x1024.
18. **LE-18 Villain portrait.** A masked villain in a dark cloak with one red glowing eye, head and shoulders, dramatic rim light, painterly, dark palette. Lucid Origin, 1440x1440.
19. **LE-19 Loading screen art.** A wide painting of a caravan crossing a desert under two moons, night, cool purple sky, warm lanterns, painterly, space at the bottom for a tip line. Lucid Origin, 2048x1024, 15 steps.
20. **LE-20 Style test.** The same red apple on a white table rendered in three styles: photoreal, watercolour, pixel art, as three separate generations with the same seed. Lucid Origin, 1024x1024, 12 steps, seed 4242.
