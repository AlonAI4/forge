# The Forge master prompt

From Forge's prompt library. For one model's own shape, read `models/<id>.md`.

Every model in Forge wants the same nine things. What changes is the order, the wording and the length. This is the template. Fill it in once, then let Forge (or you) reshape it for the model.

```
SUBJECT       The one thing this is about. It goes first, because on most models first means most important.
ACTION / ASK  What happens (image, video), or exactly what you want back (chat, code, research).
SETTING       Where and when (image, video), or what the AI needs to know first (chat, code).
MEDIUM        Photo, painting, 3D, vector; or the answer shape: list, table, steps, code, JSON.
PURPOSE       Where it will be used and who it is for. A poster, a hero image, a lesson for 13-year-olds.
DETAILS       At most four. One light, one lens, one grade, one mood. Or the four facts that matter most.
AVOID         What to leave out. Say it as a positive where the model prefers that ("plain background", not "no clutter").
SETTINGS      Only the dials this model exposes: aspect, size, duration, quality, effort.
CHECK         How you will know it worked. A count, a test that passes, a word that must appear in the picture.
```

## One brief, three models

The same idea, a poster for a school game jam, written for three image models. Read them side by side and you will see what Forge does.

**Midjourney (prose, emphasis by order, flags at the end)**

```
A hand-painted poster for a school game jam: a teenage coder at a glowing desk in a dark classroom, pixel-art sprites drifting out of the monitor like fireflies. Late evening, lit only by the screen and one warm desk lamp. Gouache on textured paper, bold flat shapes, a palette of teal, orange and cream. Clear space in the top third for a title. --ar 2:3 --stylize 250 --v 8.2
```

**GPT Image (labelled brief, the words in quotes)**

```
Subject: a poster for a school game jam.
Scene: a teenage coder at a glowing desk in a dark classroom, pixel-art sprites drifting out of the monitor like fireflies. Late evening, lit by the screen and one warm desk lamp.
Style: gouache poster, bold flat shapes, palette of teal, orange and cream.
Text: "GAME JAM" in large blocky pixel letters across the top third. "Friday 4pm, Room 12" small at the bottom. Both in cream on the dark background for contrast.
Constraints: no other text, no logos, no photoreal faces.
Settings: size 1024x1536, quality high, output_format png.
```

**Stable Diffusion (tags, weights, a real negative field)**

```
Prompt: poster illustration, teenage coder at glowing desk, dark classroom, pixel art sprites floating from monitor, (warm desk lamp:1.2), gouache texture, flat shapes, teal and orange palette, empty space top third
Negative: text, watermark, blurry, extra fingers, deformed hands, low quality
Settings: 832x1216, 30 steps, cfg 6, DPM++ 2M Karras, upscale 2x after
```

## Rules that hold on every model

- Put the subject first. On Midjourney, Veo, Kling and most others, order is emphasis.
- One light and one lens beat five adjectives. Extra style words are read as noise.
- Filler is dead: "masterpiece", "8k", "trending on artstation", "cinematic" on its own. Forge strips them, and on modern models they hurt.
- Say what you want, not what you do not want, unless the model has a real negative field (SDXL, Midjourney --no, Suno Exclude Styles).
- Stay inside the model's length range. Too short scores low on Covered. Too long scores low on Fits and invites drift.
- Never pair things that clash: golden hour and blue hour, a 24mm and an 85mm, a whisper and a shout in the same line.
- For chat and research, state the output format. It is the single strongest lever in every vendor's own guide.
- For anything with a timeline (video, music, speech), write what happens across the whole duration, not just the opening frame.
