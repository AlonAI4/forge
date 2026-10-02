# Stable Diffusion (`sdxl`)

Category: Image. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**What it does.** SDXL / 3.5 by Stability AI. The control rig: tag syntax, real weighting, a true negative field, and the deepest LoRA and ControlNet ecosystem. Offline work, character training, style fine-tunes. Weak at in-image text, hands, complex multi-subject scenes, and out-of-the-box aesthetics.
**Write it as.** Comma-separated tags, 20 to 75 words. `(word)` is x1.1, `(word:1.4)` is explicit, `BREAK` starts a new 75-token chunk. Stack two `(word:1.2)` terms rather than one `(word:1.8)`: above about 1.5 you fry the image.
**Settings.** Respect the resolution buckets: 1024x1024, 1152x896, 1344x768, 832x1216 and so on, then upscale. Generating at 1920x1080 directly is the number one mistake. Boilerplate negatives help SDXL and hurt SD 3.5 and Flux, so use the negative below only on SDXL.

**Master prompt (SD-00)**

```
Prompt: portrait of a young witch, (freckles:1.2), green eyes, wide-brim hat, holding a glowing jar of fireflies, autumn forest at dusk, (soft rim light:1.2), shallow depth of field, 85mm, painterly digital art, muted greens and warm orange BREAK detailed fabric, embroidered cloak
Negative: text, watermark, signature, blurry, low quality, extra fingers, deformed hands, extra limbs, cropped, out of frame
Settings: 832x1216, 30 steps, cfg 6, DPM++ 2M Karras, seed -1, upscale 2x with the same prompt
```

1. **SD-01 Pixel sprite sheet.** Prompt: pixel art sprite sheet, small knight character, idle walk attack poses, side view, 32px style, (clean outlines:1.2), flat colours, white background. Negative: blurry, gradient, photo, text, watermark. Settings: 1024x1024, 25 steps, cfg 7.
2. **SD-02 Cyberpunk street.** Prompt: rainy cyberpunk alley at night, neon signs, (wet reflections:1.3), steam vents, lone figure with umbrella, 24mm wide, cinematic composition, teal and magenta. Negative: text, watermark, blurry, low quality, daylight. Settings: 1344x768, 30 steps, cfg 6.
3. **SD-03 Anime portrait.** Prompt: anime girl, short silver hair, (red scarf:1.2), city rooftop at sunset, wind, soft cel shading, clean lineart, detailed eyes, upper body. Negative: photo, 3d, blurry, extra fingers, bad anatomy, text. Settings: 832x1216, 28 steps, cfg 6.5.
4. **SD-04 Game item icon.** Prompt: game item icon, (healing potion:1.3), glass bottle with red liquid, cork stopper, glowing, simple dark background, centred, painterly, high contrast. Negative: text, multiple objects, blurry, low quality. Settings: 1024x1024, 25 steps, cfg 7.
5. **SD-05 Landscape, mountains.** Prompt: alpine valley at sunrise, snowy peaks, (mist in valley:1.2), pine forest, still lake reflection, 16mm ultra wide, natural colours, landscape photography. Negative: people, text, watermark, blurry, oversaturated. Settings: 1344x768, 30 steps, cfg 5.5.
6. **SD-06 Steampunk mech.** Prompt: steampunk mech suit, brass and copper, (exposed gears:1.2), steam pipes, standing in Victorian workshop, dramatic side light, concept art, detailed. Negative: modern, plastic, text, blurry, low quality. Settings: 1024x1024, 30 steps, cfg 6.
7. **SD-07 Food, burger.** Prompt: gourmet burger, (melted cheese:1.2), brioche bun, sesame seeds, lettuce, tomato, wooden board, studio light, shallow depth of field, food photography. Negative: text, plate stacking, blurry, deformed, low quality. Settings: 1024x1024, 30 steps, cfg 6.
8. **SD-08 Tileable texture.** Prompt: seamless tileable texture, (mossy cobblestone:1.3), top down, even lighting, game texture, 4 by 4 stones, no shadows at edges. Negative: seams, border, text, perspective, blurry. Settings: 1024x1024, 25 steps, cfg 7, tiling on.
9. **SD-09 Watercolour bird.** Prompt: watercolour painting, (robin on a snowy branch:1.2), soft wet edges, white paper texture, minimal, red and brown, loose brush. Negative: photo, 3d, text, harsh outlines, low quality. Settings: 1024x1024, 25 steps, cfg 6.
10. **SD-10 Space station.** Prompt: massive ring space station orbiting a gas giant, (sunlight from behind:1.2), tiny ships, hard sci-fi, wide shot, detailed hull panels, deep space. Negative: text, blurry, cartoon, low quality, lens flare. Settings: 1344x768, 30 steps, cfg 6.
11. **SD-11 Character with LoRA.** Prompt: <lora:myhero:0.8> myhero character, standing on a cliff, cape in wind, (dramatic sky:1.2), full body, digital painting. Negative: extra limbs, deformed, text, blurry. Settings: 832x1216, 30 steps, cfg 6.
12. **SD-12 Isometric building.** Prompt: isometric medieval tavern, (thatched roof:1.2), warm windows, hanging sign, stone base, clean 3D render style, plain background, game asset. Negative: text, people, blurry, perspective distortion. Settings: 1024x1024, 25 steps, cfg 7.
13. **SD-13 Vintage poster.** Prompt: 1950s travel poster style, (seaside town:1.2), flat colours, halftone texture, cream sky, red and teal, bold shapes, minimal detail. Negative: text, photo, blurry, modern. Settings: 832x1216, 25 steps, cfg 6.
14. **SD-14 Portrait, studio.** Prompt: studio portrait, young man, (dark curly hair:1.1), denim jacket, grey backdrop, (butterfly lighting:1.2), 85mm, sharp eyes, photography. Negative: blurry, extra fingers, deformed, text, watermark, oversaturated. Settings: 832x1216, 30 steps, cfg 5.5.
15. **SD-15 Horror corridor.** Prompt: abandoned hospital corridor, (flickering light:1.2), peeling paint, wheelchair, fog, low angle, horror game screenshot style, desaturated green. Negative: people, text, bright, cheerful, blurry. Settings: 1344x768, 30 steps, cfg 6.
16. **SD-16 Cute mascot.** Prompt: cute round robot mascot, (big eyes:1.2), pastel blue, waving, simple shapes, flat vector style, white background, sticker. Negative: text, realistic, dark, blurry, extra limbs. Settings: 1024x1024, 25 steps, cfg 7.
17. **SD-17 ControlNet pose.** Prompt: (openpose control) archer drawing a bow, leather armour, forest, side light, digital painting, full body. Negative: extra limbs, deformed hands, text, blurry. Settings: 832x1216, 30 steps, cfg 6, ControlNet openpose weight 0.8 with the attached pose.
18. **SD-18 Coral reef.** Prompt: coral reef, (clownfish:1.2), anemone, sun rays through water, clear turquoise, wide angle underwater photo, vivid but natural. Negative: text, murky, blurry, deformed fish. Settings: 1344x768, 30 steps, cfg 6.
19. **SD-19 Desert temple.** Prompt: ancient desert temple half buried in sand, (golden hour:1.2), long shadows, carved pillars, lone traveller for scale, matte painting. Negative: text, modern, blurry, people crowd, low quality. Settings: 1344x768, 30 steps, cfg 6.
20. **SD-20 Kitchen still life.** Prompt: still life, (copper pot:1.2), garlic, tomatoes, wooden table, window light from left, oil painting style, Dutch masters, dark background. Negative: text, modern, blurry, photo, low quality. Settings: 1024x1024, 28 steps, cfg 6.
