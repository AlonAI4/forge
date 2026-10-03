# Forge model catalogue

57 models. Generated from the Forge engine: do not edit by hand. Pick the AI here, then read its full guide in `models/<id>.md`.

## Image

### Midjourney (`midjourney`)

V8.2 · Midjourney. Known for beautiful, artistic pictures. Describe the scene in plain sentences, like briefing a film camera crew, not a list of keywords.

- Needs: What is the one thing the picture is about? Where is it, and what time of day? Photo, painting, 3D, or something else? Where will you use it? A post, a poster, a website?
- Length: 40 to 150 words
- Best at: Aesthetic and painterly quality, cinematic lighting, style consistency across a set via --sref and --p, fashion, concept art.
- Weak at: Literal instruction following, long in-image text, infographics, UI mockups, exact brand hex, counting objects.
- Tip: V8 parses the prompt as language, so the sentence order is the emphasis order. The first clause gets the most weight.
- Tip: One lighting description and one lens do more than five stacked adjectives. Midjourney reads extra style words as noise.
- Tip: --sref locks the look across a whole set. Get one image you like, then reuse its style code for everything else in the campaign.
- Watch out: Adjective spam (masterpiece, 8k, hyper detailed) is a V5-era habit that actively hurts V7/V8. Forge strips it.
- Watch out: --stylize and --exp fight each other. If you are using --sref or a personalization profile, keep --exp at or below 25.
- Sources (checked 2026-09-29): https://docs.midjourney.com/hc/en-us/articles/32199405667853-Version
- Full guide: [models/midjourney.md](models/midjourney.md)

### GPT Image (`gptimage`)

2.5 Sunburst / Flare · OpenAI. The instruction follower. Best in class for words inside the picture, in almost any script.

- Needs: What is the one thing the picture is about? Where is it, and what time of day? Photo, painting, 3D, or something else? Where will you use it? A post, a poster, a website?
- Length: 60 to 300 words
- Best at: In-image text, multilingual scripts, editorial and magazine layouts, infographics, instruction following, identity-preserving edits.
- Weak at: Unforced photorealism: a slightly over-lit plasticky look persists. Fine-art texture. Hitting a specific film-stock aesthetic.
- Tip: It reads a structured brief better than a paragraph, which is why Forge labels the sections.
- Tip: Put literal on-image copy inside quotes and state placement and contrast separately.
- Tip: Iterate in small layout nudges. A full re-prompt rerolls the whole composition.
- Watch out: Every custom edge must be a multiple of 16, ceiling 3840x2160, or the call fails.
- Watch out: Draft at quality: low. A dense-text render at high quality is the single biggest latency sink.
- Not confirmed: notes and settings were written for gpt-image-2, not rechecked for 2.5
- Sources (checked 2026-09-29): https://developers.openai.com/api/docs/guides/image-generation https://developers.openai.com/api/docs/models
- Full guide: [models/gptimage.md](models/gptimage.md)

### Nano Banana Pro (`nanobanana`)

gemini-3-pro-image · Google. Reasons about the picture before it renders it. The one to use when the image has to be factually right.

- Needs: What is the one thing the picture is about? Where is it, and what time of day? Photo, painting, 3D, or something else? Where will you use it? A post, a poster, a website?
- Length: 50 to 180 words
- Best at: Legible multilingual in-image text, factually grounded infographics, native 4K, character consistency across many references, conversational multi-turn editing.
- Weak at: No negative lever at all. Conservative default aesthetic. Heavy restriction around real people. SynthID on every output.
- Tip: Google's own docs ask for narrative descriptive paragraphs, not keyword lists. Forge writes it that way.
- Tip: Because it reasons first, giving it something to reason about pays: 'make the ratios in this chart mathematically correct' measurably improves output.
- Tip: Holds likeness for up to five people across references: the strongest option for a cast that has to stay consistent.
- Watch out: image_size must be written with a capital K: 1K, 2K, 4K. Lowercase 4k is ignored.
- Watch out: Do not port Imagen calls forward. negativePrompt, sampleCount and personGeneration do not exist here: Imagen shut down 17 Aug 2026.
- Sources (checked 2026-09-29): https://ai.google.dev/gemini-api/docs/interactions/image-generation
- Full guide: [models/nanobanana.md](models/nanobanana.md)

### FLUX.2 (`flux`)

[pro] / [flex] · Black Forest Labs. Photorealism and material texture. Long, dense, specific prompts are productive here in a way they are not on Midjourney.

- Needs: What is the one thing the picture is about? Where is it, and what time of day? Photo, painting, 3D, or something else? Where will you use it? A post, a poster, a website?
- Length: 100 to 300 words
- Best at: Photorealism, skin and material texture, typography, multi-reference consistency, product visualisation, spatial logic.
- Weak at: No negative prompt on the API. Narrower stylistic range than Midjourney. [dev] weights are non-commercial.
- Tip: The text encoder is a Mistral-3 VLM, so it follows structured multi-part instructions well. Detail is rewarded, not diluted.
- Tip: [klein] at 4B is Apache 2.0 and runs in about 8GB of VRAM: the right free local recommendation now, ahead of SDXL.
- Watch out: [pro] and [max] deliberately expose no steps and no guidance. If you need those dials you must switch to [flex].
- Watch out: prompt_upsampling rewrites your prompt with an LLM. Leave it off once the prompt is engineered.
- Sources (checked 2026-09-29): https://docs.bfl.ai/flux_2 https://bfl.ai/blog/flux-2
- Full guide: [models/flux.md](models/flux.md)

### Stable Diffusion (`sdxl`)

SDXL / 3.5 · Stability AI. The one you run and control yourself: short keyword prompts, word weights, a separate 'leave out' box, and many add-on styles you can download.

- Needs: What is the one thing the picture is about? Where is it, and what time of day? Photo, painting, 3D, or something else? Where will you use it? A post, a poster, a website?
- Length: 20 to 75 words
- Best at: Total control, LoRA and ControlNet composability, offline work, character training, style fine-tunes.
- Weak at: In-image text, hands, prompt adherence on complex multi-subject scenes, out-of-box aesthetics.
- Tip: This is the one major family where comma-separated tags are correct rather than lazy. Forge writes tags here and prose everywhere else.
- Tip: Weight syntax: (word) is x1.1, (word:1.4) is explicit, BREAK forces a new 75-token chunk.
- Tip: Stack two (word:1.2) terms rather than one (word:1.8). Above about 1.5 you stop strengthening a concept and start frying the image.
- Watch out: Respect the resolution buckets. Generating SDXL at 1920x1080 directly is the number one amateur mistake: render at 1344x768 and upscale.
- Watch out: Boilerplate negatives help SDXL and genuinely hurt SD 3.5 and the Flux family. Forge only emits them for SDXL.
- Sources (checked 2026-09-29): https://stability.ai/stable-image https://stability.ai/news-updates/introducing-stable-diffusion-3-5
- Full guide: [models/sdxl.md](models/sdxl.md)

### Ideogram (`ideogram`)

4.0 · Ideogram. Trained on structured JSON captions, so a JSON prompt goes straight to the engine. Best text rendering measured anywhere.

- Needs: What is the one thing the picture is about? Where is it, and what time of day? Photo, painting, 3D, or something else? Where will you use it? A post, a poster, a website?
- Length: 40 to 160 words
- Best at: In-image text, posters, logos, packaging, typographic design. Highest OCR accuracy of any model tested.
- Weak at: Photorealistic skin and portraits. Alpha channels and editable text layers are still roadmap.
- Tip: Prose prompts get rewritten by Magic Prompt before generation, which is a train/inference gap. JSON does not.
- Tip: Bounding boxes are normalised [y_min, x_min, y_max, x_max] on a 0–1000 canvas.
- Tip: Ideogram 4.0 has no negative prompt. Say the keep-outs inside the description, aimed at this design's likely mistakes: colours outside the stated palette, misspelt, extra or reordered words, a sheet of logo variants instead of one mark, and the clichés of its theme it should not drift into.
- Watch out: Send a structured prompt as json_prompt, not pasted into text_prompt: only json_prompt turns Magic Prompt off and goes to the model as written.
- Watch out: rendering_speed FLASH is announced but returns an error for now.
- Sources (checked 2026-09-29): https://developer.ideogram.ai/api-reference/api-reference/generate-v4 https://docs.ideogram.ai/using-ideogram/generation-settings/available-models
- Full guide: [models/ideogram.md](models/ideogram.md)

### Adobe Firefly (`firefly`)

Image 5 · Adobe. The commercially safe one. Content Credentials on every output and indemnified training data.

- Needs: What is the one thing the picture is about? Where is it, and what time of day? Photo, painting, 3D, or something else? Where will you use it? A post, a poster, a website?
- Length: 40 to 140 words
- Best at: Client-facing work where provenance matters, brand-consistent stock-like imagery, Photoshop and Illustrator round-trips, in-image text.
- Weak at: Aggressive safety filters that block benign creative requests. Less abstract than Midjourney.
- Tip: Adobe's own recommended order is image type, subject, action, angle, lighting, background, palette, style. Forge writes that order.
- Tip: Firefly is the right default when the deliverable is for a client and Content Credentials are part of the deliverable.
- Watch out: 9:16 is not available on Image 5. If you need vertical social you must fall back to Image 4 or 4 Ultra.
- Watch out: A prose style description that contradicts a chosen Effect preset produces mush. Pick one or the other.
- Sources (checked 2026-09-29): https://developer.adobe.com/firefly-services/docs/firefly-api/guides/how-tos/cm-generate-image/feature-guide
- Full guide: [models/firefly.md](models/firefly.md)

### Recraft (`recraft`)

V4.1 · Recraft. The only model producing genuine editable SVG: real paths that open in Figma and Illustrator.

- Needs: What is the one thing the picture is about? Where is it, and what time of day? Photo, painting, 3D, or something else? Where will you use it? A post, a poster, a website?
- Length: 25 to 100 words
- Best at: Logos, icon sets, brand kits, vector illustration, structured text hierarchy, utility and product shots.
- Weak at: Cinematic drama and frontier-level human photorealism. V4 dropped style creation and prompt-based editing that V3 had.
- Tip: Recraft's own framing: short prompts mean the model designs with you, long prompts mean it executes your architecture.
- Tip: Order matters and runs global to local: core concept, background, subject framing, attributes, spatial relations, lighting, camera, mood.
- Tip: controls.colors with explicit RGB is far more accurate for brand colours than naming them in prose.
- Watch out: The prompt cap is 1000 bytes, not characters. Accented and CJK text eats it fast.
- Watch out: V4 is not a strict superset of V3. Route style-creation jobs back to V3.
- Not confirmed: notes compare V4 with V3; not rechecked for V4.1
- Sources (checked 2026-09-29): https://www.recraft.ai/docs/api-reference/getting-started https://www.recraft.ai/ai-models
- Full guide: [models/recraft.md](models/recraft.md)

### Seedream (`seedream`)

5.0 Pro · ByteDance. Ten-plus languages natively, with correct script direction and diacritics. The right routing for Arabic, Hebrew and Thai typography.

- Needs: What is the one thing the picture is about? Where is it, and what time of day? Photo, painting, 3D, or something else? Where will you use it? A post, a poster, a website?
- Length: 60 to 200 words
- Best at: Multilingual and right-to-left typography, complex information visualisation, pixel-level editing, photorealistic textures.
- Weak at: Portrait photorealism trails Nano Banana Pro. No native 4K. No seed and no batch.
- Tip: Write the spatial arrangement explicitly and quote the exact on-image text, then state the reading order.
- Tip: The cap is 4000 tokens but ByteDance recommend staying under about 600 English words.
- Watch out: 1.5K costs the same as 1K and looks better. There is no reason ever to request 1K.
- Watch out: No seed and n locked to 1: reproducibility and cheap variation exploration are both unavailable.
- Sources (checked 2026-09-29): https://docs.byteplus.com/en/docs/ModelArk/2582774
- Full guide: [models/seedream.md](models/seedream.md)

### Qwen-Image (`qwenimage`)

3.0 Pro · Alibaba. Built for one-pass dense layouts. Renders text as small as ten pixels legibly, across twelve languages.

- Needs: What is the one thing the picture is about? Where is it, and what time of day? Photo, painting, 3D, or something else? Where will you use it? A post, a poster, a website?
- Length: 150 to 600 words
- Best at: Infographic grids, newspaper pages, academic-paper mockups, nested UI designs, multi-line maths notation, Chinese typography.
- Weak at: Portrait photorealism. Heavily rate-limited at five requests a minute. No open weights at the 3.0 tier.
- Tip: This is the model where a very long, layout-explicit prompt is the point. Describe every region and its contents.
- Tip: Twelve languages natively, and it is the strongest option for dense Chinese text.
- Watch out: size uses an asterisk: 1024*1024, not 1024x1024. Silent-failure class bug.
- Watch out: prompt_extend defaults to true and will rewrite an engineered prompt. Turn it off.
- Sources (checked 2026-09-29): https://www.alibabacloud.com/help/en/model-studio/qwen-image-3-0-pro
- Full guide: [models/qwenimage.md](models/qwenimage.md)

### Leonardo (`leonardo`)

Lucid Origin · Leonardo AI / Canva. A full picture studio. Its big strength: you can train it on your own pictures so a character or style stays the same.

- Needs: What is the one thing the picture is about? Where is it, and what time of day? Photo, painting, 3D, or something else? Where will you use it? A post, a poster, a website?
- Length: 30 to 120 words
- Best at: Trainable character models, sketch-to-image on Realtime Canvas, game and concept-art asset pipelines, cost-efficient volume.
- Weak at: Raw fidelity trails frontier models. Quality is really a function of which hosted model you selected.
- Tip: Keep the prompt simple, then add targeted aesthetic cues: lighting, lens and mood for photoreal, medium and palette for illustration.
- Tip: Leonardo's own recommended sweet spot is Fast mode, 1440x1440, 15 steps or fewer.
- Tip: Lucid Origin has no negative prompt. Say what you want instead of what you don't ("a plain white background", not "no clutter"), and put any must-avoid in one short line of the prompt.
- Watch out: Dimensions must be multiples of 8, up to 3840 wide and 3616 tall.
- Watch out: Lucid Realism is tuned as a video input frame generator. For stills, Lucid Origin is the correct default.
- Sources (checked 2026-09-29): https://docs.leonardo.ai/docs/lucid-origin
- Full guide: [models/leonardo.md](models/leonardo.md)

### Any other image model (`generic-image`)

category wildcard. Your picture AI is not on the list? Forge writes a prompt that works for any picture AI, plus the settings most of them have.

- Needs: What is the one thing the picture is about? Where is it, and what time of day? Photo, painting, 3D, or something else? Where will you use it? A post, a poster, a website?
- Length: 50 to 180 words
- Best at: Any image model. Forge emits a prose version and a tag version so you can paste whichever one your tool prefers.
- Weak at: Nothing model-specific. If your model is in the rack, use it instead.
- Tip: Two grammars are produced: prose for modern language-encoder models, comma tags for older CLIP-based ones.
- Tip: Every 2026 model rewards a lens, a light and a grade. Almost none of them reward the word masterpiece.
- Watch out: Check whether your model has a negative field before pasting the negative block into the main prompt.
- Full guide: [models/generic-image.md](models/generic-image.md)

## Video

### Veo (`veo`)

3.1 · Google DeepMind. Synced dialogue and native audio in one pass. Google publishes an exact prompt formula and it works.

- Needs: What is the one thing the picture is about? What happens from the start to the end of the clip? Where is it, and what time of day? Where will you use it? A post, a poster, a website?
- Length: 40 to 120 words
- Best at: Dialogue and audio in sync, physical plausibility, prompt adherence, clean 1080p and 4K delivery.
- Weak at: Eight seconds maximum. Only two aspect ratios. No true camera-parameter control: camera is language-driven.
- Tip: Google's official order is cinematography, subject, action, context, style and ambiance. Forge writes exactly that order.
- Tip: Dialogue goes in quotes. SFX and ambience get their own labelled lines: that is the documented syntax.
- Watch out: 1080p and 4K are eight-second-only. Requesting them at 4s or 6s fails or silently downgrades. Extending drops you to 720p.
- Watch out: The prompt rewriter is on by default and will silently rewrite engineered wording. Turn it off for deterministic work.
- Sources (checked 2026-09-29): https://ai.google.dev/gemini-api/docs/veo
- Full guide: [models/veo.md](models/veo.md)

### Kling (`kling`)

3.0 / O1 · Kuaishou. The shot-list model. It will genuinely plan several shots in one generation, and its element binding is the strongest identity lock available.

- Needs: What is the one thing the picture is about? What happens from the start to the end of the clip? Where is it, and what time of day? Where will you use it? A post, a poster, a website?
- Length: 60 to 150 words
- Best at: Multi-shot narrative in a single generation, character and element consistency, motion transfer, 4K, non-English dialogue.
- Weak at: Prompt sensitivity. It over-reads long prompts and will invent shot changes you did not ask for.
- Tip: Kling's own formula is shot type, movement direction, duration or speed descriptor, then style elements. Forge writes one block per shot in that order.
- Tip: Master Shots camera presets are more stable than prompted camera language. When the move matters, use the preset.
- Tip: If they have reference images of a person or product, bind them as elements: without that, identity drifts past about eight seconds. With no references, write the prompt alone and do not ask for elements.
- Watch out: Multi-shot auto-planning is on by default in some modes. If you want one continuous take you must say so explicitly.
- Watch out: Audio is billed per second and on by default. Turn it off for silent b-roll or you burn about a third extra.
- Sources (checked 2026-09-29): https://ir.kuaishou.com/news-releases/news-release-details/kling-ai-launches-30-model-ushering-era-where-everyone-can-be https://ir.kuaishou.com/news-releases/news-release-details/kling-o1-launches-worlds-first-unified-multimodal-video-model-0
- Full guide: [models/kling.md](models/kling.md)

### Seedance (`seedance`)

2.5 · ByteDance. Thirty seconds in one take, the longest of any major model. Which means you have to write the whole timeline, not a tableau.

- Needs: What is the one thing the picture is about? What happens from the start to the end of the clip? Where is it, and what time of day? Where will you use it? A post, a poster, a website?
- Length: 80 to 200 words
- Best at: Long single takes, identity consistency across many references, product and multi-SKU e-commerce, native editing and extension.
- Weak at: Prompt discipline. Thirty seconds of unspecified time invites drift.
- Tip: Budget the prompt across the timeline. A 30-second prompt describing only the opening image gives you five seconds of intent and twenty-five of hallucination.
- Tip: Structure: subject, performance across the full duration, ambience, camera, then audio and continuity cues.
- Watch out: In video_edit mode duration and aspect_ratio are ignored and you are billed by source length. Passing them is a silent no-op.
- Watch out: 4K and 1080p need mode std. Fast mode caps at 720p.
- Sources (checked 2026-09-29): https://seed.bytedance.com/en/blog/one-take-creation-flexible-referencing-introducing-seedance-2-5
- Full guide: [models/seedance.md](models/seedance.md)

### Runway (`runway`)

Gen-4.5 · Runway. Best-in-class prompt adherence on sequenced instructions and facial nuance, held back by a 720p, ten-second ceiling.

- Needs: What is the one thing the picture is about? What happens from the start to the end of the clip? Where is it, and what time of day? Where will you use it? A post, a poster, a website?
- Length: 30 to 90 words
- Best at: Prompt adherence on complex sequenced instructions, character emotion and facial nuance, photoreal and stylised range.
- Weak at: 720p ceiling and ten-second cap. Runway itself has conceded model leadership and now routes to other models.
- Tip: Runway's own template for text-to-video is: [camera] shot of [subject] [action] in [environment], then supporting description.
- Tip: For image-to-video, describe only what changes. Re-describing what is already in the image creates conflict and burns credits.
- Tip: Runway states element order does not matter and there is no ideal length. Clarity beats word count.
- Watch out: Text-to-video is locked to 16:9. For vertical you must generate a still first and go image-to-video.
- Watch out: Prompting motion that contradicts implied motion in the source image massively increases iteration count.
- Sources (checked 2026-09-29): https://docs.dev.runwayml.com/
- Full guide: [models/runway.md](models/runway.md)

### Hailuo (`hailuo`)

MiniMax H3 · MiniMax. Facial micro-expression and natural physics, with inline bracketed camera instructions and joint stereo audio.

- Needs: What is the one thing the picture is about? What happens from the start to the end of the clip? Where is it, and what time of day? Where will you use it? A post, a poster, a website?
- Length: 60 to 180 words
- Best at: Facial emotion and micro-expression, natural physics, text and brand rendering, motion transfer, 2K output.
- Weak at: Aspect ratios bounded between 2:5 and 5:2. No 4K. You cannot get a clean dialogue stem.
- Tip: Camera moves go in brackets, using MiniMax's documented commands: [Push in], [Pull out], [Pan left], [Pan right], [Tilt up], [Tilt down], [Truck left], [Truck right], [Pedestal up], [Pedestal down], [Zoom in], [Zoom out], [Shake], [Tracking shot], [Static shot]. Up to 3 in one bracket run together, e.g. [Pan left,Pedestal up] (MiniMax docs, checked 1 Oct 2026).
- Tip: Voice, SFX and music are jointly modelled, so the audio is cohesive but inseparable. Generate silent and dub if you need stems.
- Watch out: Duration must be an integer. Sending 7.5 fails.
- Watch out: The bracket syntax is model-specific. Do not paste a Hailuo prompt into another model: the brackets become literal noise.
- Sources (checked 2026-09-29): https://platform.minimax.io/docs/guides/video-generation
- Full guide: [models/hailuo.md](models/hailuo.md)

### Luma Ray (`luma`)

3.2 · Luma AI. Sixteen keyframes per clip and native 16-bit HDR with EXR export. The only model that drops into a colour-managed post pipeline.

- Needs: What is the one thing the picture is about? What happens from the start to the end of the clip? Where is it, and what time of day? Where will you use it? A post, a poster, a website?
- Length: 40 to 100 words
- Best at: Professional post pipelines, precise pacing via keyframes, performance preservation, colour-critical work.
- Weak at: Not the cheapest or fastest. Audio is not its story.
- Tip: Ray3 has a reasoning mode that plans event sequences, so it favours narrative prose (X happens, then Y) over dense keyword stacks.
- Tip: Keyframes are optional images that pin moments (up to sixteen). Only use them if the person has those images; otherwise the prompt alone carries the clip.
- Watch out: Always iterate in Draft mode and only then master. Mastering every take at 4K HDR is the biggest credit waste on the platform.
- Watch out: Dream Machine is deprecated branding. The model is Ray3.2.
- Not confirmed: exact API model string (ray3.2)
- Sources (checked 2026-09-29): https://lumalabs.ai/news/introducing-ray-3-2
- Full guide: [models/luma.md](models/luma.md)

### LTX-2 (`ltx`)

2.5 · Lightricks. Genuinely open weights, native 4K, and the only model here that exposes 48 and 50fps. Built as a shot-list platform.

- Needs: What is the one thing the picture is about? What happens from the start to the end of the clip? Where is it, and what time of day? Where will you use it? A post, a poster, a website?
- Length: 50 to 160 words
- Best at: End-to-end narrative production, local and self-hosted work, true frame-rate control, lip sync, cost-free at scale.
- Weak at: Raw per-shot fidelity trails Seedance and Kling.
- Tip: LTX Studio is built around a shot list and @Element references, so Forge writes per-shot rather than one paragraph.
- Tip: Retake regenerates a 2–16 second segment without a full reshoot. It is the correct fix for one bad beat.
- Tip: The 48 and 50fps options are a real differentiator for sports and for PAL broadcast conform.
- Watch out: @Element tags only resolve inside LTX Studio projects. They are meaningless in a raw LTX-2 API call.
- Watch out: Free use is capped by a revenue threshold, not by feature. Check it before commercial deployment.
- Not confirmed: notes and durations were written for LTX-2.3
- Sources (checked 2026-09-29): https://github.com/Lightricks/LTX-2
- Full guide: [models/ltx.md](models/ltx.md)

### Higgsfield (`higgsfield`)

Cinema Studio 4.0 · Higgsfield. Sixty-three named camera presets and a prompt-adherence dial almost nobody else exposes.

- Needs: What is the one thing the picture is about? What happens from the start to the end of the clip? Where is it, and what time of day? Where will you use it? A post, a poster, a website?
- Length: 40 to 140 words
- Best at: Named camera moves you can rely on, ad and marketing formats, motion transfer, access to many models behind one interface.
- Weak at: Most presets are image-to-video only and require an uploaded still.
- Tip: The preset library is the reason to be here: Bullet Time, Crash Zoom In, Snorricam, Super Dolly In, Through Object In, 360 Orbit, Whip Pan, YoYo Zoom and more.
- Tip: cfg_scale is exposed here and almost nowhere else. Around 0.3 gives the model creative latitude, around 0.8 gives literal adherence and stiffer motion.
- Watch out: It is an aggregator. The same prompt hits a different underlying model depending on what you selected: branch your prompt on the real model.
- Watch out: Camera presets generally need a start image.
- Not confirmed: notes and settings were written for Cinema Studio 3.0
- Sources (checked 2026-09-29): https://higgsfield.ai/blog/cinema-studio-4-0
- Full guide: [models/higgsfield.md](models/higgsfield.md)

### Wan (`wan`)

2.6 / 2.7 · Alibaba. Two very different models under one name. 2.6 is open-weight and rewards keyword density; 2.7 is closed and rewards intent.

- Needs: What is the one thing the picture is about? What happens from the start to the end of the clip? Where is it, and what time of day? Where will you use it? A post, a poster, a website?
- Length: 40 to 140 words
- Best at: Open-weight local deployment on 2.6, stylised and experimental output, multilingual audio.
- Weak at: Speed. Around four minutes for a five-second clip on 2.7.
- Tip: 2.7's Thinking Mode builds a compositional blueprint before generating, so it rewards intent-level narrative prompts: state what the scene means.
- Tip: 2.6 is a classic diffusion model and rewards the opposite: dense, keyword-stacked description.
- Watch out: Wan is no longer simply open source. 2.7 is closed-weights and API-only. Pin to 2.6 if you need local.
- Watch out: Four-minute generations will time out synchronous request patterns. Use polling or webhooks.
- Sources (checked 2026-09-29): https://www.alibabacloud.com/blog/alibaba-unveils-wan2-7-video-to-elevate-creators-from-executors-to-directors_603009 https://www.alibabacloud.com/press-room/alibaba-unveils-wan2-6-series-enabling-everyone
- Full guide: [models/wan.md](models/wan.md)

### Midjourney Video (`mjvideo`)

V1 · Midjourney. Inherits the Midjourney look frame by frame. Motion-only prompts, five to twenty-one seconds, no audio at all.

- Needs: What is the one thing the picture is about? What happens from the start to the end of the clip?
- Length: 5 to 25 words
- Best at: Per-frame aesthetic quality, stylisation, looping motion graphics.
- Weak at: Resolution, duration, physics, and anything involving dialogue or audio: there is none.
- Tip: This is not a cinematic-paragraph model. Describe only the motion, in a handful of words, and let the still carry the look.
- Tip: Extend x4 at about four seconds each gets you to twenty-one seconds total.
- Watch out: --motion low is the default and produces near-still results. If nothing moves, that is why.
- Watch out: --raw disables the house styling. Use it when you want the video to obey the prompt rather than Midjourney's taste.
- Sources (checked 2026-09-29): https://docs.midjourney.com/hc/en-us/articles/37460773864589-Video https://updates.midjourney.com/introducing-our-v1-video-model/
- Full guide: [models/mjvideo.md](models/mjvideo.md)

### Any other video model (`generic-video`)

category wildcard. Writes a portable cinematic prompt with every layer a video model can use, and flags which parts to delete if your model does not support them.

- Needs: What is the one thing the picture is about? What happens from the start to the end of the clip? Where is it, and what time of day? Where will you use it? A post, a poster, a website?
- Length: 50 to 150 words
- Best at: Any video model. The five rules Forge applies hold across every model tested.
- Weak at: Nothing model-specific.
- Tip: Describe motion over time, not a photograph. This is the number one failure mode on every model.
- Tip: One camera move per shot. Stacking dolly, orbit and tilt produces mush everywhere.
- Tip: Cinematic is a null token in 2026. Name the shot instead.
- Watch out: If your model is image-to-video, delete everything that re-describes the source still and keep only what changes.
- Full guide: [models/generic-video.md](models/generic-video.md)

## Voice & speech

### ElevenLabs · Speech (`el-tts`)

v4 / v3 / multilingual v2 / flash v2.5 · ElevenLabs. Three different models under one product. Forge picks the right one for the job and writes the delivery direction into the script itself.

- Needs: What exactly should be said? What is the voice for? Who does the voice sound like? Age, accent, manner?
- Best at: Expressive long-form narration, character acting, audiobooks, seventy-plus languages, multi-speaker dialogue in a single pass.
- Weak at: Very short inputs are unstable. It is not a general SSML engine: only break, phoneme and lexeme tags exist.
- Tip: v3 takes inline audio tags like [whispers], [sighs], [sarcastic], and interprets natural-language direction inside brackets.
- Tip: Ellipses add hesitation and weight, dashes make short pauses, CAPITALS carry stress. That is the real prosody control.
- Tip: Under 250 characters gets inconsistent output. Give it a full paragraph even if you only need one line.
- Watch out: v3 does not support break tags. Use tags, punctuation and line structure instead.
- Watch out: The phoneme tag only works on eleven_flash_v2: not on multilingual v2, not on v3. On v3 use inline IPA between forward slashes.
- Not confirmed: voice presets not rechecked for v4
- Sources (checked 2026-09-29): https://elevenlabs.io/docs/overview/models https://elevenlabs.io/blog/eleven-v4
- Full guide: [models/el-tts.md](models/el-tts.md)

### ElevenLabs · Voice Design (`el-voicedesign`)

eleven_ttv_v3 · ElevenLabs. Invents a voice from a description. The description has a documented shape, and following it is most of the quality.

- Needs: Who does the voice sound like? Age, accent, manner? What kind of character is the voice? Which language and accent?
- Best at: Original characters, brand voices, narrators that must not sound like a stock voice.
- Weak at: It models the voice, not the space. Anything about the room belongs in the mix, not the prompt.
- Tip: Order that works: native language and locale, gender and age, quality descriptor, persona in two to five words, two or three emotion adjectives, then timbre and pacing.
- Tip: The official quality ladder is Ok, Good, Very good, Excellent, Studio, Broadcast. Naming a rung genuinely changes the output.
- Tip: Longer preview text gives more stable and expressive results, and it must agree with the description.
- Watch out: Never use audio-FX words like reverb, echo or delay here. Voice Design models the voice, not the acoustics. This is the opposite of Sound Effects and Music.
- Watch out: Do not write 'accent' when you mean intonation. Name the actual dialect.
- Sources (checked 2026-09-29): https://elevenlabs.io/docs/api-reference/text-to-voice/design
- Full guide: [models/el-voicedesign.md](models/el-voicedesign.md)

### ElevenLabs · Dubbing (`el-dubbing`)

v2 · ElevenLabs. Ninety-plus languages, keeps the original voices and the background bed, handles overlapping speech.

- Needs: Which language and accent? Who does the voice sound like? Age, accent, manner?
- Best at: Localising finished video without re-mixing, preserving emotional tone and the original performance.
- Weak at: Not a script tool. If you need to change what is said, dub from an edited transcript in Dubbing Studio instead.
- Tip: source_lang and target_lang take ISO 639 codes (es, pt, en), not dialect tags like es-MX: the API rejects those. Say the dialect you want in the project notes, and check the dub by ear.
- Tip: The dub clones each speaker's own voice by default; set disable_voice_cloning only when you want stock Voice Library voices instead. There is no similarity dial in the API (checked 1 Oct 2026).
- Watch out: API limit is 3GB per file, 180 minutes in-app. Dubbing Studio (v1) is the editable-transcript path and caps much lower at 45 minutes.
- Watch out: Concurrency is three jobs on self-serve. Plan batches around it.
- Sources (checked 2026-09-29): https://elevenlabs.io/docs/eleven-creative/products/dubbing
- Full guide: [models/el-dubbing.md](models/el-dubbing.md)

### Cartesia Sonic (`cartesia`)

3.6 · Cartesia. Sub-90ms first audio and currently top of both Artificial Analysis speech boards. Built for realtime agents.

- Needs: What exactly should be said? What is the voice for? Who does the voice sound like? Age, accent, manner?
- Best at: Realtime voice agents, telephony, code-switching, alphanumerics like order and phone numbers.
- Weak at: Beta API, no open weights, smaller voice library than ElevenLabs.
- Tip: Sonic 3 takes tags inside the transcript: <emotion value="excited"/>, <speed ratio="1.2"/> (0.6 to 1.5), <volume ratio="0.8"/> (0.5 to 2.0), <break time="500ms"/> and <spell>A1B2</spell>. Use them to change delivery mid-script; emotion is beta and English only (Cartesia docs, checked 1 Oct 2026).
- Tip: Custom pronunciation dictionaries with IPA overrides are the reliable fix for brand names.
- Watch out: Sonic-2, Sonic-turbo and older snapshots sunset after 20 October 2026. Pin to 3.6.
- Sources (checked 2026-09-29): https://docs.cartesia.ai/build-with-cartesia/tts-models/latest https://www.cartesia.ai/blog/sonic-3.6
- Full guide: [models/cartesia.md](models/cartesia.md)

### Hume Octave (`hume`)

1 · Hume AI. Acting instructions as a first-class input, with a documented rule that shorter direction beats longer.

- Needs: What exactly should be said? Who does the voice sound like? Age, accent, manner?
- Best at: Emotionally precise delivery, character work, direction that changes mid-line.
- Weak at: Acting instructions (the description field) work on Octave 1 only; Octave 2 is a preview where they are 'coming soon'.
- Tip: Hume's own guidance: keep acting instructions under about 100 characters. 'Frightened, rushed' beats a paragraph.
- Tip: Precise emotions beat generic ones: melancholy and frustrated, not sad.
- Tip: Audience context shapes delivery: 'speaking to a child', 'addressing a large crowd'.
- Watch out: Speed runs 0.5 to 2.0 and is non-linear. 2.0 does not double the rate.
- Watch out: Limits are 5000 characters of text and 1000 characters of description per utterance.
- Not confirmed: model id spelling 'octave-2' not found on an official page
- Sources (checked 2026-09-29): https://www.hume.ai/blog/octave-2-launch https://dev.hume.ai/docs/text-to-speech-tts/overview
- Full guide: [models/hume.md](models/hume.md)

### Any other voice model (`generic-voice`)

category wildcard. A portable TTS brief: the script marked up for prosody, a voice description, and the settings almost every engine exposes.

- Needs: What exactly should be said? What is the voice for? Who does the voice sound like? Age, accent, manner?
- Best at: Any TTS engine.
- Weak at: Nothing model-specific.
- Tip: Punctuation is prosody on every modern engine. Ellipses hesitate, dashes clip, capitals stress.
- Watch out: Bracketed audio tags are an ElevenLabs v3 convention. Strip them if your engine does not document them.
- Full guide: [models/generic-voice.md](models/generic-voice.md)

## Sound effects

### ElevenLabs · Sound Effects (`el-sfx`)

eleven_text_to_sound_v2 · ElevenLabs. One effect per generation, then layer them in an editor. That is the documented workflow, not a limitation.

- Needs: What is the sound? What kind of sound is it?
- Best at: Foley, impacts, ambience beds, UI sounds, musical one-shots and loops.
- Weak at: Sequential multi-event prompts. The docs themselves recommend generating each element and layering.
- Tip: Production language earns its place here: 'high-quality, professionally recorded footsteps on grass, sound effects foley'.
- Tip: The terms the model knows are impact, whoosh, ambience, braam, glitch, drone, one-shot, loop, stem, foley.
- Tip: Musical one-shots work well: '90s hip-hop drum loop, 90 BPM', 'vintage brass stabs in F minor'.
- Watch out: prompt_influence defaults to 0.3, which is deliberately loose. Raise it toward 0.8 when you need literal.
- Watch out: Loop only works on eleven_text_to_sound_v2, and WAV at 48kHz is non-looping only.
- Sources (checked 2026-09-29): https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert
- Full guide: [models/el-sfx.md](models/el-sfx.md)

### Any other sound model (`generic-sfx`)

category wildcard. A portable sound-design brief with the source, the space, the capture and the shape of the envelope.

- Needs: What is the sound? What kind of sound is it?
- Best at: Any text-to-audio model.
- Weak at: Nothing model-specific.
- Tip: Name the source, the material it hits, the space it happens in, and how the tail behaves. That is the whole craft.
- Watch out: One event per generation, everywhere. Layer in a DAW.
- Full guide: [models/generic-sfx.md](models/generic-sfx.md)

## Music

### ElevenLabs · Music (`el-music`)

music_v2_5 · ElevenLabs. Studio language moves real levers here. Sidechained, close-mic'd, bone-dry, tape saturation and plate reverb all produce audible change.

- Needs: What genre? What should the music feel like? Which instruments? How fast? Give a tempo in BPM.
- Best at: Underscore and beds, full songs with structure, mid-track genre transitions, section-level inpainting.
- Weak at: Prompt and composition_plan are mutually exclusive. You pick one path.
- Tip: The five dimensions to decide up front are genre, mood, instrumentation, tempo in BPM, and era.
- Tip: Narrate the arrangement sequentially. 'Start with… just… then… bring in…' are load-bearing words.
- Tip: Negative space is the prompt for loops: 'no melody, just drums'. Timing directives work too: 'lyrics begin at 15 seconds'.
- Watch out: music_length_ms only applies when you use prompt, not composition_plan.
- Watch out: Prompt cap is 4100 characters.
- Not confirmed: tips written for music_v2
- Sources (checked 2026-09-29): https://elevenlabs.io/docs/overview/capabilities/music
- Full guide: [models/el-music.md](models/el-music.md)

### Suno (`suno`)

v6 · Suno. Style field, lyrics field, and a dedicated Exclude Styles box that is the only reliable way to say no.

- Needs: What genre? What should the music feel like? Which instruments? How fast? Give a tempo in BPM.
- Best at: Full songs with vocals, fast iteration, personas and custom models.
- Weak at: Artist names, exact mix parameters and hard BPM enforcement do not work in the Style field.
- Tip: The Style field wants four to seven descriptors, no more: genre, subgenre, tempo, key instruments, vocal style, production, mood.
- Tip: Metatags go in the Lyrics field: [Intro] [Verse 1] [Pre-Chorus] [Chorus] [Bridge] [Breakdown] [Outro]. Parameterised sections work too: [Chorus: full band, soaring vocals].
- Tip: Weirdness sits at 50% by default. Style Influence controls how strictly it obeys your descriptors.
- Watch out: Never put negatives in the Style box. They go in Exclude Styles or they are ignored.
- Watch out: Download caps take effect from 3 September 2026: 20 a month on Pro, 60 on Premier. Check before you plan a release.
- Not confirmed: tips written for v5.5, not rechecked for v6
- Sources (checked 2026-09-29): https://suno.com/release-notes
- Full guide: [models/suno.md](models/suno.md)

### Google Lyria (`lyria`)

3.5 · Google DeepMind. Three-minute full-structure songs with timestamp prompting, and SynthID plus C2PA on everything it makes.

- Needs: What genre? What should the music feel like? Which instruments? How fast? Give a tempo in BPM.
- Best at: Scoring to picture, vocals with timed lyrics, provenance-clean delivery, music from a reference image or PDF.
- Weak at: No documented negative prompting. Thirty seconds only on the non-Pro tiers.
- Tip: Google's formula is genre and style, mood, instrumentation, tempo and rhythm, vocal style and language, then lyrics.
- Tip: Timestamp prompting with [MM:SS] tags assigns actions to timed segments. That is how you score to a cut.
- Watch out: Every output carries SynthID watermarking and C2PA credentials. That is a feature for provenance and a constraint if you need a clean asset.
- Sources (checked 2026-09-29): https://ai.google.dev/gemini-api/docs/models/lyria-3-pro-preview
- Full guide: [models/lyria.md](models/lyria.md)

### Stable Audio (`stableaudio`)

2.5 · Stability AI. Built for brand and production sound. Audio inpainting lets you regenerate a specific span of an existing track.

- Needs: What genre? What should the music feel like? Which instruments? How fast? Give a tempo in BPM.
- Best at: Brand sound, loops and beds, regenerating a bad span without redoing the track.
- Weak at: Vocals and song structure are not its strength.
- Tip: Stability's own prompt order is core style, key instruments, mood, specific details, then additional instructions.
- Tip: They publish tempo bands: 60–80 ballads, 80–100 R&B and house, 100–120 pop-rock and jazz, 120–140 disco and techno, 140–160 dubstep and metal.
- Tip: Their guidance asks for sophisticated mood words: euphoric not happy, melancholic not sad, soaring not energetic.
- Watch out: Naming an era does real work here: '80s gated reverb', '90s grunge distortion'.
- Sources (checked 2026-09-29): https://stability.ai/news-updates/stability-ai-introduces-stable-audio-25-the-first-audio-model-built-for-enterprise-sound-production-at-scale
- Full guide: [models/stableaudio.md](models/stableaudio.md)

### Any other music model (`generic-music`)

category wildcard. A portable style line plus a structured arrangement narration, which is what every music model actually wants.

- Needs: What genre? What should the music feel like? Which instruments? How fast? Give a tempo in BPM.
- Best at: Any music model.
- Weak at: Nothing model-specific.
- Tip: BPM and key both work on the major models. State them as numbers and letters, not as 'fast' and 'sad'.
- Watch out: Section metatags like [Chorus] are a Suno and ElevenLabs convention. Check your tool before pasting them.
- Full guide: [models/generic-music.md](models/generic-music.md)

## Chat & reasoning

### Claude (`claude`)

Opus 5.5 / Sonnet 5.5 / Fable 5.1 · Anthropic. Wants XML tags, examples, and long material at the top with the question at the end. Anthropic measure up to 30% quality gain from that last one alone.

- Needs: What exactly do you want back? What does the AI need to know first? What shape should the answer be? A list, a table, steps?
- Best at: Agentic coding, long-horizon autonomy, multi-file refactors, code review precision, 1M-context consistency, documents and decks.
- Weak at: Brevity by default: it is verbose unless told otherwise. Sampling parameters are blocked on the 5-series.
- Tip: XML tags are the documented structure: <instructions>, <context>, <document>, <example>. Forge writes them.
- Tip: Put long context at the top and the question at the end. Anthropic measure up to a 30% improvement on complex multi-document inputs.
- Tip: Tell it what to do, not what not to do. 'Do not use markdown' works worse than 'compose flowing prose paragraphs'.
- Watch out: Effort does not shorten the visible answer. If you want it short, say so in words.
- Watch out: Remove legacy 'verify your work' instructions on Opus 5: they cause over-verification with no quality gain.
- Not confirmed: temperature and prompting notes were written for Sonnet 5 and Opus 5
- Sources (checked 2026-09-29): https://platform.claude.com/docs/en/models/overview
- Full guide: [models/claude.md](models/claude.md)

### GPT (`gpt`)

GPT-6 Astra / Sol / Luna · OpenAI. Clear and short beats long. OpenAI measured better results (10–15%) from simpler instructions that were also about half as long.

- Needs: What exactly do you want back? What does the AI need to know first? What shape should the answer be? A list, a table, steps?
- Best at: Knowledge work with browsing, coding agents, cybersecurity, computer use, design judgment.
- Weak at: Bloated rule-wall prompts. Cheap ultra-long context: above 272k input tokens you pay a 2x surcharge.
- Tip: The documented section order is Identity, Instructions, Examples, Context. Put reused content first so it caches.
- Tip: State each instruction exactly once. Repetition measurably lowers scores.
- Tip: Reasoning models want goals, not steps. OpenAI frame it as briefing a senior co-worker rather than a junior one.
- Watch out: reasoning.context defaults to all_turns on 5.6, which silently re-renders prior reasoning and bills for it.
- Watch out: Above 272k input tokens you pay 2x input and 1.5x output. The 1.05M window is not uniformly priced.
- Not confirmed: notes about reasoning settings were written for GPT-5.6
- Sources (checked 2026-09-29): https://developers.openai.com/api/docs/models https://openai.com/index/gpt-6-astra/
- Full guide: [models/gpt.md](models/gpt.md)

### Gemini (`gemini`)

3.8 Flash / 3.1 Pro · Google. Direct and terse by default. Google's own advice is to stop tuning sampling parameters and to be concise.

- Needs: What exactly do you want back? What does the AI need to know first? What shape should the answer be? A list, a table, steps?
- Best at: Price and performance on coding and agents, document comprehension, enterprise automation, huge multimodal context.
- Weak at: No stable Pro-class GA offering. Terse and unconversational unless you ask otherwise.
- Tip: Pick one delimiter system, XML tags or markdown headings, and stay on it. Mixing them costs quality.
- Tip: Large data blocks at the top, the specific ask at the very end.
- Tip: Default output is terse. If you want it conversational or detailed you must say so explicitly.
- Watch out: Do not set temperature, top_p or top_k. Google strongly recommend the defaults, and low temperature specifically causes looping.
- Watch out: Thought signatures must round-trip across calls or multi-turn reasoning continuity breaks.
- Not confirmed: tips written for 3.7 Flash
- Sources (checked 2026-09-29): https://ai.google.dev/gemini-api/docs/models
- Full guide: [models/gemini.md](models/gemini.md)

### Grok (`grok`)

4.7 · xAI. Cheap frontier-adjacent tool calling with a 500k window, and a cache key you must remember to set.

- Needs: What exactly do you want back? What does the AI need to know first? What shape should the answer be? A list, a table, steps?
- Best at: Agentic tool calling, cheap coding, low hallucination on its own positioning.
- Weak at: Smaller context than peers. xAI publish almost no prompting guidance.
- Tip: Above 200k prompt tokens the price doubles. Keep prompts under that line where you can.
- Watch out: Set prompt_cache_key on the Responses API. Without it your requests land on cache-cold servers and you pay full input price.
- Watch out: The knowledge cutoff is February 2026, so enable server-side search for anything current.
- Not confirmed: tips written for Grok 4.6
- Sources (checked 2026-09-29): https://docs.x.ai/developers/models
- Full guide: [models/grok.md](models/grok.md)

### DeepSeek (`deepseek`)

V4 Pro / V4.1 Flash · DeepSeek. An order of magnitude cheaper than peers, MIT-licensed weights, 384k output, and one of the last APIs that still supports prefilling.

- Needs: What exactly do you want back? What does the AI need to know first? What shape should the answer be? A list, a table, steps?
- Best at: Cost per token, coding, very long outputs, self-hosting.
- Weak at: Multimodal. Almost no official prompting guidance.
- Tip: Prefilling still works here and nowhere else at the frontier: hit the beta base URL and send the last message as an assistant turn with prefix true.
- Watch out: The vision variant's vision is incompatible with thinking mode. Pick one.
- Watch out: Off-peak is half price at 01:00–04:00 and 06:00–10:00 UTC. Batch scheduling is a real 50% lever.
- Not confirmed: tips about Flash were written for V4 Flash
- Sources (checked 2026-09-29): https://api-docs.deepseek.com/updates/ https://api-docs.deepseek.com/news/news260910/
- Full guide: [models/deepseek.md](models/deepseek.md)

### Any other chat model (`generic-text`)

category wildcard. A model-agnostic prompt built on the techniques with the strongest documented evidence, and nothing that only works on one vendor.

- Needs: What exactly do you want back? What does the AI need to know first? What shape should the answer be? A list, a table, steps?
- Best at: Any chat or reasoning model, including local ones.
- Weak at: Nothing vendor-specific.
- Tip: Output format specification is the single strongest lever across every vendor guide. Forge always emits it.
- Tip: Delimiters separating instructions from data reduce misattribution and prompt-injection surface everywhere.
- Watch out: Chain-of-thought instructions are largely obsolete on 2026 frontier models. Use the model's own reasoning control instead.
- Full guide: [models/generic-text.md](models/generic-text.md)

## Coding agents

### Claude Code (`claudecode`)

current · Anthropic. Explore, plan, implement, commit. The documented prescription is a workflow, not a prompt, and giving it a verifiable check is most of the quality.

- Needs: What exactly should be built or changed? What is the project built with? How will you know it worked?
- Best at: Long autonomous runs with real verification, codebase questions and onboarding, parallel fan-out migrations.
- Weak at: Cheap one-liners: the context ramp costs more than it saves. Anything with no runnable check.
- Tip: Give it something that exits 0. Tests, a build, a screenshot diff. Without a check it cannot tell done from nearly done.
- Tip: Plan first in plan mode, then execute. For big features, have it interview you, write SPEC.md, then start a fresh session.
- Tip: Adversarial review works in fresh context, not in the same session. A reviewer prompted to find gaps will find some even when the work is sound.
- Watch out: Keep CLAUDE.md lean. Test every line with: would removing this cause a mistake? Emphasise one thing with IMPORTANT, not five.
- Watch out: After two failed corrections, clear the context and rewrite the prompt rather than correcting a third time.
- Sources (checked 2026-09-29): https://code.claude.com/docs/en/permission-modes https://code.claude.com/docs/en/memory
- Full guide: [models/claudecode.md](models/claudecode.md)

### Cursor (`cursor`)

Composer 2.5 + frontier models · Cursor. Four kinds of rules with a real precedence order, and a plan mode whose official recovery advice is to fix the plan rather than patch the output.

- Needs: What exactly should be built or changed? What is the project built with? How will you know it worked?
- Best at: Fast in-editor iteration, glob-scoped rules for monorepos, plan-then-build on medium features.
- Weak at: Rule bloat. It is the documented number one failure mode.
- Tip: Reference files with @filename.ts rather than pasting their content.
- Tip: When output is wrong, revert and refine the plan. Iteratively patching a bad output is the documented anti-pattern.
- Watch out: Rules must be .mdc inside .cursor/rules/. A plain .md file there does nothing at all, silently.
- Watch out: Team rules override yours and can be made non-disableable. Check the hierarchy before blaming the model.
- Sources (checked 2026-09-29): https://cursor.com/docs/models/cursor-composer-2-5 https://cursor.com/docs/context/rules
- Full guide: [models/cursor.md](models/cursor.md)

### GitHub Copilot (`copilot`)

current · GitHub. Unusually explicit about what not to put in instructions: no external lookups, no tone rules, no word limits.

- Needs: What exactly should be built or changed? What is the project built with? How will you know it worked?
- Best at: Repo-wide conventions, path-scoped rules in large monorepos, broad model choice.
- Weak at: Long instruction files. GitHub state plainly that these break on large diverse repositories.
- Tip: Effective instructions are short, self-contained and broadly applicable. Path-scoped .instructions.md files with applyTo frontmatter are the escape valve.
- Watch out: Do not write instructions that require looking something up externally, mandate tone, or set word limits.
- Watch out: Agent-file support varies by Copilot feature. Do not assume AGENTS.md is read everywhere.
- Sources (checked 2026-09-29): https://docs.github.com/copilot/concepts/about-customizing-github-copilot-chat-responses https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
- Full guide: [models/copilot.md](models/copilot.md)

### Codex (`codex`)

GPT-6 · OpenAI. Reads AGENTS.md and has its own effort ladder. The official rule is to use the lowest effort that produces the result.

- Needs: What exactly should be built or changed? What is the project built with? How will you know it worked?
- Best at: Deep analysis on ambiguous high-value work at Sol, everyday work at Terra, repeatable extraction at Luna.
- Weak at: Ultra spawns parallel agents and the cost is non-linear.
- Tip: Codex will point at any model implementing Chat Completions or Responses, not only OpenAI's.
- Watch out: Effort names differ between the API and the Codex UI. Do not map reasoning.effort to Light and Ultra one-to-one.
- Sources (checked 2026-09-29): https://learn.chatgpt.com/docs/agent-configuration/agents-md https://learn.chatgpt.com/docs/config-file/config-reference
- Full guide: [models/codex.md](models/codex.md)

### Devin (`devin`)

Cloud / Desktop · Cognition. Four components in every good Devin prompt: context, step-by-step instructions, measurable success criteria, and an existing pattern to follow.

- Needs: What exactly should be built or changed? What is the project built with? How will you know it worked?
- Best at: Async remote work on well-scoped tasks with a clear finish line.
- Weak at: Open-ended decisions. Cognition's own guidance is to be opinionated and not leave major decisions open.
- Tip: Break work into verified checkpoints. Use Playbooks for procedures and Knowledge for standards that persist.
- Watch out: Rules files are hard-capped: 6,000 characters global, 12,000 per workspace file. A longer file silently truncates.
- Watch out: Windsurf is now Devin Desktop. .devin/ beats .windsurf/, and leftover Windsurf configs can be shadowed.
- Sources (checked 2026-09-29): https://docs.devin.ai/cli/extensibility/rules
- Full guide: [models/devin.md](models/devin.md)

### Any other coding agent (`generic-code`)

category wildcard. The four things every coding agent needs, in the order they need them, plus an AGENTS.md block that most of them now read.

- Needs: What exactly should be built or changed? What is the project built with? How will you know it worked?
- Best at: Any coding agent.
- Weak at: Nothing tool-specific.
- Tip: AGENTS.md is the closest thing to a cross-tool standard: Cursor, Codex, Copilot and Devin Desktop all read it.
- Watch out: A success criterion that cannot be checked by a command is not a success criterion.
- Full guide: [models/generic-code.md](models/generic-code.md)

## App builders

### v0 (`v0`)

v2 API · Vercel. Headless as well as interactive. Each app is a chat that holds its own state, and the model is a composite that can change under you.

- Needs: What does the app do? Which screens should be built first? What data does it store?
- Best at: Next.js, React and Tailwind on Vercel, invoked from your own product or CI.
- Weak at: Off-stack requests degrade. Composite means the base model can be swapped without a version bump.
- Tip: Do not hard-tune prompts to a specific base model's quirks: v0 swaps them independently.
- Watch out: Three skills per request is a hard cap.
- Sources (checked 2026-09-29): https://vercel.com/changelog/models-api-v0-1.5-beta https://github.com/vercel/v0-sdk
- Full guide: [models/v0.md](models/v0.md)

### Lovable (`lovable`)

current · Lovable. Their own words: the most common mistake is not a bad prompt, it is prompting too early. Plan, then build one slice at a time.

- Needs: What does the app do? Which screens should be built first? What data does it store?
- Best at: Full-stack apps built incrementally with a clear plan.
- Weak at: Whole-app-in-one-prompt. It will refactor working code you did not mention.
- Tip: Plan mode for ideas, Build mode for building (it was called Agent mode until September 2026), and the preview toolbar for looks (it replaced Visual Edits).
- Tip: The preview toolbar is the quick way to change looks, instead of re-prompting.
- Watch out: Always include the leave-alone clause. Omit it and it will rewrite parts that already worked.
- Not confirmed: that the preview toolbar is cheaper than re-prompting
- Sources (checked 2026-09-29): https://docs.lovable.dev/features/plan-mode https://docs.lovable.dev/features/agent-mode https://docs.lovable.dev/features/design
- Full guide: [models/lovable.md](models/lovable.md)

### Bolt (`bolt`)

current · StackBlitz. Bills by token, so Plan Mode and file locking are cost controls rather than conveniences.

- Needs: What does the app do? Which screens should be built first? What data does it store?
- Best at: Fast first drafts where you compare several opening prompts before committing.
- Weak at: Vague aesthetic direction. It wants design vocabulary, not 'make it nicer'.
- Tip: Use real design words: font weight, line height, padding, margin, radius, contrast.
- Tip: Get three first drafts of the opening prompt and compare: the opening prompt disproportionately determines the architecture.
- Watch out: Plan Mode (which replaced Discussion Mode) agrees the plan before building. Planning first is the cheapest way to avoid wasted builds.
- Not confirmed: project system prompt setting; that Plan Mode saves the most tokens
- Sources (checked 2026-09-29): https://support.bolt.new/docs/discussion-mode https://support.bolt.new/building/using-bolt
- Full guide: [models/bolt.md](models/bolt.md)

### Base44 (`base44`)

current · Wix. Entities and data model first, then screens, then logic. Managed backend, auth and hosting come with it.

- Needs: What does the app do? What data does it store? Which screens should be built first?
- Best at: Internal tools and small products where auth, data and hosting being handled is worth more than framework control.
- Weak at: No published model identity or context limits, so no model-specific prompt tuning is possible.
- Tip: Describe the entities and their relationships before you describe a single screen. The data model is what everything else hangs off.
- Watch out: Treat prompt advice here as generic app-builder advice: Base44 publish no formal prompting guidance.
- Not confirmed: the entities, screens, logic build order is not in the official docs
- Sources (checked 2026-09-29): https://docs.base44.com/Integrations/Using-integrations https://docs.base44.com/Getting-Started/Quick-start-guide
- Full guide: [models/base44.md](models/base44.md)

### Any other app builder (`generic-app`)

category wildcard. The three rules that hold across every builder: plan first, one slice at a time, and always say what to leave alone.

- Needs: What does the app do? Which screens should be built first? What data does it store?
- Best at: Any AI app builder.
- Weak at: Nothing tool-specific.
- Tip: Every builder in this category recommends the same thing: scope the slice, name the data, and protect what already works.
- Watch out: A prompt that describes a whole app produces an app-shaped demo, not a working slice.
- Full guide: [models/generic-app.md](models/generic-app.md)

## Research

### Perplexity (`perplexity`)

Agent API · Perplexity. Search-grounded by construction, with a context-size dial that is a real cost and quality lever.

- Needs: What is the question? What time period, places or sources should it cover? What should the finished answer look like?
- Best at: Current questions where citations matter and you want the answer, not a list of links.
- Weak at: Deep Research cost is four-dimensional. Model the budget, do not estimate it from token price.
- Tip: search_context_size is a genuine quality dial, not just a cost setting. Raise it for questions with a wide evidence base.
- Tip: Enforce the kind of source with search_domain_filter (up to 20 domains, an allow list or a deny list with a leading minus, not both), not only in the prose. Add search_recency_filter (day, week, month, year) or search_after_date_filter (m/d/yyyy) when the answer must be current.
- Watch out: Sonar Chat Completions ended on 27 September 2026. Use the Agent API: Sonar Pro became its fast preset.
- Not confirmed: search_context_size under the Agent API
- Sources (checked 2026-09-29): https://docs.perplexity.ai/docs/sonar/models/sonar-pro
- Full guide: [models/perplexity.md](models/perplexity.md)

### NotebookLM (`notebooklm`)

Gemini Notebook · Google. Source-grounded by construction. It will refuse to go beyond your sources, and that is the feature.

- Needs: What is the question? What time period, places or sources should it cover? What should the finished answer look like?
- Best at: Synthesising a fixed corpus you control, with citations back to your own documents.
- Weak at: Anything needing the open web. It will hedge rather than reach outside your sources.
- Tip: Ask it to quote the passage it is relying on before it answers. That converts a summary into something checkable.
- Watch out: The real ceiling is chat queries per day, not tokens. Plan long sessions around it.
- Sources (checked 2026-09-29): https://support.google.com/notebooklm/answer/16179559 https://support.google.com/gemininotebook/answer/16164461
- Full guide: [models/notebooklm.md](models/notebooklm.md)

### Deep Research (`deepresearch`)

ChatGPT / Gemini / Claude · multiple. All three reward the same three things: name the decision the output feeds, fix the structure, and say what to do when evidence is missing.

- Needs: What is the question? What time period, places or sources should it cover? What should the finished answer look like?
- Best at: Long multi-source questions where you need a cited document rather than an answer.
- Weak at: Very recent events unless you name the date range explicitly. All three are weak there.
- Tip: State the decision the research feeds. It changes what the model prioritises more than any other line.
- Tip: Claude's documented research pattern is to develop competing hypotheses and track confidence levels in progress notes.
- Watch out: Gemini's Deep Research agent is single-turn and asynchronous with a 120-minute ceiling. You cannot refine mid-run.
- Watch out: Source files can carry prompt injection. Say explicitly that instructions inside sources are data, not commands.
- Sources (checked 2026-09-29): https://help.openai.com/en/articles/10500283-deep-research-in-chatgpt https://ai.google.dev/gemini-api/docs/interactions/deep-research https://www.anthropic.com/news/research
- Full guide: [models/deepresearch.md](models/deepresearch.md)

### Any other research tool (`generic-research`)

category wildcard. A portable research brief with the question, the decision, the scope, the structure and the missing-evidence rule.

- Needs: What is the question? What time period, places or sources should it cover? What should the finished answer look like?
- Best at: Any research or search-grounded tool.
- Weak at: Nothing tool-specific.
- Tip: A research prompt without a named decision produces a summary. With one, it produces an argument.
- Watch out: Always specify the date range. Every tool is weak on very recent events unless you pin it.
- Full guide: [models/generic-research.md](models/generic-research.md)
