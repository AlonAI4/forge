# Hailuo (`hailuo`)

Category: Video. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every video model.** The one rule that matters on every video model: describe motion over time, not a photograph. Write what happens from the first second to the last. One camera move per shot.

**What it does.** MiniMax H3 by MiniMax. Facial emotion and micro-expression, natural physics, text and brand rendering, motion transfer, 2K output. Limits: aspect ratios between 2:5 and 5:2, no 4K, and the audio is jointly modelled so you cannot get a clean dialogue stem.
**Write it as.** Prose, 60 to 180 words, with inline bracketed camera instructions: [pan], [zoom], [static], and similar. The brackets are Hailuo-only; pasted into any other model they become noise.
**Settings.** Duration must be an integer. If you need separate audio stems, generate silent and dub.

**Master prompt (HL-00)**

```
[static] A close-up of a teenage boy at a desk, eyes on a laptop, tapping a pen. His brow tightens, he bites his lip, then his eyes widen a fraction as something on the screen changes. [slow zoom in] A smile creeps in one corner at a time until he laughs and covers his mouth. Warm desk-lamp light against the cool blue of the screen, a dark bedroom behind. Audio: the pen tapping, one soft laugh. 6 seconds, 16:9, 2K.
```

1. **HL-01 Reaction, surprise.** [static] A woman opens her front door to find a puppy in a box on the step. Her face runs from confusion to a gasp to melting delight. [slow zoom in] on her face as she kneels. Morning light. Audio: a small whimper, her gasp. 6s, 16:9.
2. **HL-02 Physics, glass.** [static] A glass of water on a table tips over in slow motion, water arcing out and splashing across the wood, droplets catching window light. Audio: the tip, the splash. 5s, 16:9, 2K.
3. **HL-03 Brand text.** [pan right] across a shop counter to a coffee cup with the printed words "Good Morning Club" on its sleeve, steam rising, a hand picking it up. Warm cafe light. Audio: cafe murmur. 5s, 16:9.
4. **HL-04 Motion transfer.** Use the attached clip as the motion source. [static] A cartoon penguin in a scarf performs the same dance on an ice floe at sunset, wobbling with real weight. Audio: a light drum loop. 8s, 9:16.
5. **HL-05 Silent for dubbing.** [slow zoom out] from a man's face at a podium to reveal a small hall of listeners. He speaks with calm gestures, no audio. Neutral stage light. 8s, 16:9, audio off.
6. **HL-06 Micro-expression, doubt.** [static] A close-up of a chess player staring at the board, eyes flicking between two pieces, a swallow, a tiny shake of the head, then a decisive nod. Cool tournament light. Audio: a clock ticking. 6s, 16:9.
7. **HL-07 Fabric physics.** [pan left] A silk scarf drifts down onto a chair, folding on itself as it lands, a breeze from an open window lifting one corner. Soft daylight. Audio: a faint rustle. 5s, 4:5.
8. **HL-08 Kid and cake.** [static] A five-year-old leans in to blow out three candles, cheeks puffed, gets two, blows again, then claps. [zoom in] on the grin. Warm party light. Audio: a breath, small cheers. 6s, 16:9.
9. **HL-09 Rain on a face.** [static] A close-up of a girl standing in warm summer rain, eyes closed, drops running down her cheeks, then she opens her eyes and grins at the sky. Audio: rain. 6s, 9:16.
10. **HL-10 Product with text.** [zoom in] on a matte bottle labelled "Sea Salt Spray" standing on a wet rock as a wave splashes behind it, droplets on the label. Bright coastal light. Audio: the wave. 5s, 16:9.
11. **HL-11 Nervous speech.** [static] A teenage girl steps up to a microphone in a school hall, glances at her notes, takes a breath, and the fear on her face turns into a steady confidence as she starts to speak. Audio: a hall hush, her first word. 8s, 16:9.
12. **HL-12 Ball physics.** [pan right] A basketball bounces down a flight of stone steps, each bounce lower and faster, rolls across a plaza and stops against a bench. Late sun. Audio: the bounces. 6s, 16:9.
13. **HL-13 Dog reaction.** [static] A dog watches a treat being placed on its nose, eyes crossed, trembling with effort, then flips it and catches it. [zoom in] on the chew. Audio: a snap, chewing. 5s, 1:1.
14. **HL-14 Two friends, silent.** [static] Two friends on a rooftop at dusk, one tells a story with big gestures, the other laughs harder and harder until she has to hold the railing. No audio, for a music bed. 8s, 16:9, audio off.
15. **HL-15 Glass reflection text.** [slow zoom out] from a neon sign reading "OPEN LATE" reflected in a rain-soaked window to reveal the diner behind it, one waitress wiping a counter. Audio: rain, a distant radio. 6s, 16:9, 2K.
