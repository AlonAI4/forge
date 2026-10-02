# Higgsfield (`higgsfield`)

Category: Video. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every video model.** The one rule that matters on every video model: describe motion over time, not a photograph. Write what happens from the first second to the last. One camera move per shot.

**What it does.** Cinema Studio 4.0 by Higgsfield. Sixty-three named camera presets you can rely on, ad and marketing formats, motion transfer, and many models behind one interface. Most presets are image-to-video and need an uploaded still.
**Write it as.** A named preset plus prose, 40 to 140 words. Presets include Bullet Time, Crash Zoom In, Snorricam, Super Dolly In, Through Object In, 360 Orbit, Whip Pan, YoYo Zoom. `cfg_scale` around 0.3 gives creative latitude, around 0.8 gives literal adherence and stiffer motion.
**Watch out.** It is an aggregator: the same prompt hits a different underlying model depending on what you selected. Write for the real model underneath.

**Master prompt (HG-00)**

```
Preset: Super Dolly In. Start image: the attached still of a lone runner on a foggy bridge at dawn.
The camera drives fast toward the runner as she turns her head to look back over her shoulder, her breath visible, fog parting around her. Warm sun starting to cut through the grey. Keep her face and jacket exactly as in the still. cfg_scale 0.6, 5 seconds, 16:9.
```

1. **HG-01 Bullet Time.** Preset: Bullet Time. Start image: a skater frozen mid-kickflip over stairs. The world holds still while the camera sweeps around him, dust motes hanging in the air. Late sun. cfg_scale 0.7, 5s.
2. **HG-02 Crash Zoom In.** Preset: Crash Zoom In. Start image: a chess player at a board. A sudden zoom onto her eyes as she spots the winning move, one eyebrow lifting. cfg_scale 0.8, 4s.
3. **HG-03 360 Orbit, product.** Preset: 360 Orbit. Start image: a matte black sneaker on a concrete block. A clean full circle around the shoe, soft studio light sliding across the material. cfg_scale 0.8, 6s, 1:1.
4. **HG-04 Through Object In.** Preset: Through Object In. Start image: a bakery window with a cake on display. The camera passes through the glass to land on the cake as a hand adds a final strawberry. Warm light. cfg_scale 0.6, 5s.
5. **HG-05 Snorricam.** Preset: Snorricam. Start image: a teenager walking down a school corridor. The camera locks to his body as he strides, the corridor swinging behind him, a grin spreading. cfg_scale 0.5, 5s, 9:16.
6. **HG-06 Whip Pan, two shots.** Preset: Whip Pan. Start image: a drummer counting in. A whip to the right lands on the guitarist hitting the first chord. Gritty garage light. cfg_scale 0.7, 4s.
7. **HG-07 YoYo Zoom.** Preset: YoYo Zoom. Start image: a cat sitting on a windowsill. A quick zoom in and out as the cat's ears flick and it turns to the camera. Playful. cfg_scale 0.5, 4s, 1:1.
8. **HG-08 Ad format.** Preset: Super Dolly In. Start image: a can of sparkling water on ice. The camera pushes in as condensation runs down the can and bubbles rise, the label crisp. cfg_scale 0.8, 5s, 9:16.
9. **HG-09 Creative latitude.** Preset: 360 Orbit. Start image: a lone tree on a hill at dusk. Let the model invent drifting clouds and moving grass as the camera circles. cfg_scale 0.3, 6s.
10. **HG-10 Motion transfer.** Motion source: the attached dance clip. Start image: a cartoon robot on a stage. The robot performs the same moves with real weight, spotlight following. cfg_scale 0.6, 8s, 9:16.
11. **HG-11 Fantasy reveal.** Preset: Crash Zoom In. Start image: a hooded figure on a cliff. A crash zoom to the figure's face as the hood falls back and eyes glow gold. Dusk. cfg_scale 0.7, 4s.
12. **HG-12 Food.** Preset: Through Object In. Start image: a bowl of ramen. The camera dives through the steam to the egg as chopsticks lift a noodle. Warm. cfg_scale 0.7, 5s.
13. **HG-13 Branch by model.** Same prompt, two underlying models. For Kling underneath: one continuous take, audio off. For Veo underneath: add "Ambience: wind." Start image: a kite over a hill. Preset: Super Dolly In. cfg_scale 0.6, 5s.
14. **HG-14 Portrait mood.** Preset: Snorricam. Start image: a girl in a yellow raincoat in rain. She spins once, arms out, rain streaking past, laughing. cfg_scale 0.5, 5s, 9:16.
