# Any other image model (`generic-image`)

Category: Image. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**What it does.** The wildcard. Forge writes a model-agnostic image prompt with every layer a diffusion or autoregressive model can use, in two grammars: prose for modern language-encoder models, comma tags for older CLIP-based ones. Paste whichever your tool prefers.
**Write it as.** 50 to 180 words. Every 2026 model rewards a lens, a light and a grade. Almost none reward the word masterpiece. Check whether your model has a negative field before pasting a negative block into the main prompt.

**Master prompt (GX-00)**

```
Prose: A small red kite caught in a bare oak tree on a hill at the end of a windy autumn day, a child looking up at it from below with hands on hips. Wide shot, 35mm, low warm sun from the left, long shadows, slight haze. Colour grade: warm highlights, cool shadows, gentle grain. Mood: patient, a little funny. No text.

Tags: red kite in bare oak tree, hill, autumn, child looking up, hands on hips, wide shot, 35mm, low warm sunlight, long shadows, haze, warm highlights, cool shadows, film grain, no text

Negative (only if your model has a field): text, watermark, blurry, deformed, extra limbs
Settings: aspect 3:2, size whatever your model's native square or 3:2 bucket is, then upscale
```

1. **GX-01 Portrait.** Prose: A young woman with braided hair in a mustard jumper, seated by a window, looking out. 85mm, soft window light from the left, gentle contrast, warm grade. Tags: woman, braided hair, mustard jumper, window seat, 85mm, soft window light, warm grade. 4:5.
2. **GX-02 City night.** Prose: An empty crossing in a city at night after rain, traffic lights reflected in the wet road, one cyclist crossing. 24mm, sodium and neon light, cool grade with warm accents. Tags: city crossing, night, rain, wet road, reflections, cyclist, 24mm, neon, cool grade. 16:9.
3. **GX-03 Product.** Prose: A ceramic mug with a speckled glaze on a linen cloth, one soft light from the upper left, faint shadow, plain background. 50mm. Tags: ceramic mug, speckled glaze, linen, soft light, plain background, 50mm, product photo. 1:1.
4. **GX-04 Fantasy.** Prose: A dragon curled asleep around a lighthouse on a cliff at blue hour, the lamp glowing through its wings. Wide, 28mm, cool ambient with a warm lamp. Painterly. Tags: dragon, lighthouse, cliff, blue hour, glowing lamp, wide, painterly. 16:9.
5. **GX-05 Pixel art.** Prose: A pixel-art shop interior with shelves of potions and a sleeping cat, 16-bit style, limited palette. Tags: pixel art, shop interior, potion shelves, sleeping cat, 16-bit, limited palette. 1:1.
6. **GX-06 Landscape.** Prose: A green valley with a winding river and a single stone bridge, morning mist, low sun from the right, 24mm. Natural grade. Tags: valley, river, stone bridge, mist, morning, low sun, 24mm, landscape. 3:2.
7. **GX-07 Food.** Prose: A slice of lemon tart with a torched meringue on a white plate, top-down, soft daylight, bright grade. 50mm. Tags: lemon tart, meringue, white plate, top down, soft daylight, 50mm, food photo. 4:5.
8. **GX-08 Sci-fi.** Prose: A rover on a red dusty plain with two small moons rising, dust in the air, 35mm, hard low light. Slightly desaturated grade. Tags: rover, red planet, two moons, dust, 35mm, hard light, desaturated. 21:9.
9. **GX-09 Animal.** Prose: A barn owl on a fence post at dusk, head turned to the camera, 200mm, soft backlight, muted grade. Tags: barn owl, fence post, dusk, 200mm, backlight, muted. 4:5.
10. **GX-10 Interior.** Prose: A reading nook with a green armchair, a floor lamp and shelves of books, evening, warm lamp light, 28mm. Cosy grade. Tags: reading nook, green armchair, floor lamp, bookshelves, evening, warm light, 28mm. 4:5.
11. **GX-11 Abstract.** Prose: Overlapping translucent circles in coral, teal and gold on off-white, soft paper texture, flat lighting. Tags: abstract, translucent circles, coral, teal, gold, paper texture, flat. 1:1.
12. **GX-12 Character.** Prose: A cheerful robot barista with a tiny bow tie pouring coffee, full body, 3D render, soft studio light, pastel palette. Tags: robot barista, bow tie, pouring coffee, full body, 3D render, studio light, pastel. 1:1.
