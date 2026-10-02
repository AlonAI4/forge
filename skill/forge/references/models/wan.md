# Wan (`wan`)

Category: Video. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every video model.** The one rule that matters on every video model: describe motion over time, not a photograph. Write what happens from the first second to the last. One camera move per shot.

**What it does.** 2.6 / 2.7 by Alibaba. Two very different models under one name. 2.6 is open-weight, a classic diffusion model that rewards keyword density. 2.7 is closed, API-only, with a Thinking Mode that builds a compositional blueprint first and rewards intent-level narrative. Stylised and experimental output, multilingual audio. Slow: about four minutes for a five-second clip on 2.7.
**Write it as.** 40 to 140 words. For 2.6, dense keyword stacks. For 2.7, say what the scene means.
**Settings.** Pin to 2.6 if you need local. Four-minute generations time out synchronous requests: use polling or webhooks.

**Master prompt, 2.7 (WN-00)**

```
Wan 2.7, Thinking Mode. A boy releases a paper lantern from a rooftop at night and watches it rise over the city. The scene is about letting go of something he has held onto too long: the release should feel slow and deliberate, his hands lingering a moment after the lantern leaves them, then dropping to his sides as the light drifts up among hundreds of others. Warm lantern glow against a deep blue night. 5 seconds, 16:9.
```

**Master prompt, 2.6 (WN-00b)**

```
Wan 2.6. boy on rooftop, night, releasing paper lantern, lantern rising, hundreds of lanterns in sky, warm orange glow, deep blue night sky, city lights below, slow motion, hands lifting, medium shot, slight low angle, soft focus background, film grain, soft key light, 5 seconds, 16:9.
```

1. **WN-01 2.7, meaning.** 2.7. An old woman waters a single plant on a balcony above a busy street. It is about routine as care: her movements are practised and unhurried, the city rushing below is soft and irrelevant. Morning light. 5s.
2. **WN-02 2.6, keywords.** 2.6. old woman, balcony, watering can, small green plant, busy street below, morning sunlight, warm tones, medium shot, slow pan, shallow depth of field, calm, 5s.
3. **WN-03 2.7, tension.** 2.7. Two players face each other across a table at a board game, the final move pending. It is about the silence before a decision: hold on the hesitating hand, let the other player's stillness do the work. Cool overhead light. 5s.
4. **WN-04 2.6, action.** 2.6. dragon flying over snowy mountains, wings spread, snow blowing, low sun, dramatic clouds, wide shot, tracking camera, fantasy, painterly, 5s.
5. **WN-05 2.7, joy.** 2.7. A dog meets its owner at an airport arrivals gate. It is about recognition before reaction: the dog freezes, then everything happens at once. Bright hall light. 5s.
6. **WN-06 2.6, stylised.** 2.6. paper cutout city, layered cardboard buildings, tiny paper cars, rotating slowly, soft studio light, pastel colours, stop-motion feel, top-down angle, 5s.
7. **WN-07 2.7, multilingual audio.** 2.7. A street vendor calls out her prices in Arabic as customers gather, the scene is about the rhythm of a market morning, voices overlapping warmly. Audio on. 5s.
8. **WN-08 2.6, loop.** 2.6. ocean waves rolling onto black sand beach, foam, overcast sky, seamless loop, static wide shot, muted colours, slow motion, 5s.
9. **WN-09 2.7, ending.** 2.7. A girl closes a laptop at the end of a long night and looks out at the first light. It is about finishing something: exhaustion and quiet pride in the same face. Cool dawn light through blinds. 5s.
10. **WN-10 2.6, sci-fi.** 2.6. robot walking through neon rain, wet street reflections, pink and cyan lights, steam, tracking shot from behind, cyberpunk, detailed, 5s.
11. **WN-11 2.7, experimental.** 2.7. Ink drops fall into water and bloom into the shape of a running horse, then dissolve. It is about form appearing from chance. Black and white, macro. 5s.
12. **WN-12 2.6, food.** 2.6. pizza pulled from wood-fired oven, melted cheese, steam, warm orange glow, close-up, slow motion, rustic kitchen, 5s.
