# Midjourney (`midjourney`)

Category: Image. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**What it does.** V8.2 by Midjourney. Aesthetic-first diffusion: painterly quality, cinematic lighting, fashion, concept art, and a consistent look across a whole set via `--sref`. Weak at literal instructions, long in-image text, infographics, UI mockups, exact brand colours and counting objects.
**Write it as.** Prose, 40 to 150 words. V8 reads the prompt as language, so the first clause carries the most weight. One light, one lens. Flags at the end: `--ar`, `--stylize` (0 to 1000, default 100), `--chaos`, `--raw` for documentary and product work, `--no` for exclusions, `--sref` to lock a style, `--hd` for the final at 2048px. Keep `--exp` at or below 25 when using `--sref`.
**Avoid.** Adjective spam (masterpiece, 8k, hyper detailed) actively hurts V8. Decimals in `--ar` (use 139:100, not 1.39:1).

**Master prompt (MJ-00)**

```
A lone knight standing at the edge of a floating island, looking out over a sea of clouds at sunrise, a small figure against a vast sky. Wide shot on a 24mm lens, soft rim light from behind the figure, mist catching the low sun. Painterly concept art in muted blues with a single warm accent on the horizon. Clean space in the upper third for a game title. --ar 16:9 --stylize 300 --v 8.2 --no text, watermark
```

1. **MJ-01 Game key art, sci-fi.** A pilot climbing out of a scorched starfighter on a desert runway at dusk, heat haze rising, hangar lights flickering on behind. Low angle, 35mm, warm backlight. Painted concept art, dusty orange and steel blue. --ar 16:9 --stylize 250
2. **MJ-02 Character portrait, fantasy.** A young elven archer with a scarred cheek and a green hooded cloak, half turned to the camera, forest light dappling her face. Close portrait, 85mm, soft overcast light. Oil painting with visible brushwork. --ar 4:5 --stylize 200
3. **MJ-03 Product photo, headphones.** Matte black over-ear headphones resting on a slab of raw concrete, one soft window light from the left, deep shadow on the right. Macro-ish 50mm, shallow depth of field. Studio product photography. --ar 1:1 --raw --stylize 50
4. **MJ-04 Website hero, calm app.** An empty wooden desk by a tall window at early morning, a single mug and a closed notebook, sunlight in a long stripe across the floor. Wide, 28mm, natural light. Quiet editorial photo, warm neutral tones, lots of negative space on the right for text. --ar 21:9 --raw
5. **MJ-05 Pixel-art style scene.** A tiny village on a hill at night, windows glowing yellow, a river of stars overhead, rendered as chunky 16-bit pixel art with a limited eight-colour palette. --ar 3:2 --stylize 100
6. **MJ-06 Food, editorial.** A bowl of ramen with a soft-boiled egg and spring onions, steam rising, chopsticks resting on the rim, on a dark wooden counter under a single warm overhead light. 50mm, top-down angle. Food magazine photo. --ar 4:5 --raw
7. **MJ-07 Architecture, brutalist.** A concrete library with deep window recesses on a rainy afternoon, one person with a red umbrella crossing the plaza. Wide 24mm, flat grey light, wet reflections. Documentary architecture photo. --ar 3:2 --raw --stylize 50
8. **MJ-08 Album cover, lo-fi.** A cat asleep on a windowsill above a rainy city at night, neon reflections on the glass, a record player glowing in the corner. Illustrated in soft anime style, grainy, purple and teal. Square. --ar 1:1 --stylize 400
9. **MJ-09 Creature design.** A moss-covered forest guardian shaped like a stag, antlers grown into branches with lanterns hanging from them, standing in shallow water at blue hour. Full body, 35mm. Painterly, cool greens and a single warm lantern glow. --ar 2:3 --stylize 300
10. **MJ-10 Sports action.** A skateboarder mid-kickflip over a set of stairs, motion frozen, dust in the air, late afternoon sun low and hard from the side. 24mm from ground level. Gritty documentary photo. --ar 3:2 --raw
11. **MJ-11 Isometric room, game asset.** A cosy isometric bedroom for a life-sim game: bed, desk with a glowing laptop, bookshelf, a plant in the window. Clean 3D render, soft global illumination, pastel palette, plain white background. --ar 1:1 --stylize 100
12. **MJ-12 Fashion, streetwear.** A model in an oversized cream puffer jacket and wide trousers standing in an empty underground car park, one fluorescent tube overhead. Full length, 35mm, cold flat light. Fashion lookbook photo. --ar 4:5 --raw
13. **MJ-13 Landscape, volcanic.** Black sand dunes leading to a steaming volcanic ridge at dawn, a thin line of orange light on the horizon, mist in the low ground. Very wide 16mm, cool shadows. Landscape photograph. --ar 21:9 --raw
14. **MJ-14 Vehicle concept.** A rugged electric off-road buggy parked on a cliff road, dust on the tyres, storm clouds behind. Three-quarter front view, 35mm, dramatic side light. Automotive concept render, muted olive and orange. --ar 16:9 --stylize 200
15. **MJ-15 Storybook page.** A small fox in a yellow raincoat sharing an umbrella with a hedgehog at a bus stop in the rain. Watercolour and ink, soft edges, warm and gentle, plenty of white paper showing. --ar 3:2 --stylize 350
16. **MJ-16 Abstract wallpaper.** Slow ribbons of translucent glass in deep blue and copper twisting through darkness, lit from within. Macro, smooth gradients. Abstract 3D render, phone wallpaper. --ar 9:16 --stylize 500
17. **MJ-17 Underwater.** A freediver drifting past a sunlit kelp forest, rays of light cutting through green water, bubbles rising. Wide 20mm, natural light from above. Underwater photograph, teal and gold. --ar 3:2 --raw
18. **MJ-18 Boss monster, top-down.** A giant armoured crab boss seen from above on a stone arena floor, glowing cracks in its shell, four claws raised. Clean game-art render, readable silhouette, dark background. --ar 1:1 --stylize 150
19. **MJ-19 Consistent set, with sref.** Three medieval market stalls, a baker, a blacksmith and a potion seller, in the same painterly style as the reference. Mid shot each, morning light, warm earth tones. --ar 3:2 --sref [paste your style code] --stylize 200
20. **MJ-20 Interior, hero.** A small plant shop interior at golden hour, shelves crowded with green, light pouring through the front window, an empty counter in the foreground for a product overlay. 28mm, warm natural light. --ar 16:9 --raw
