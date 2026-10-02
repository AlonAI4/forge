# LTX-2 (`ltx`)

Category: Video. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every video model.** The one rule that matters on every video model: describe motion over time, not a photograph. Write what happens from the first second to the last. One camera move per shot.

**What it does.** 2.5 by Lightricks. Genuinely open weights, native 4K, and the only model here exposing 48 and 50fps. Built as a shot-list platform: end-to-end narrative production, local and self-hosted work, lip sync, cost-free at scale. Raw per-shot fidelity trails Seedance and Kling.
**Write it as.** A per-shot list, 50 to 160 words. In LTX Studio, @Element references keep characters consistent; in a raw API call they mean nothing. Retake regenerates a 2 to 16 second segment without a full reshoot.
**Settings.** 48 and 50fps for sports and PAL conform. Free use is capped by a revenue threshold, so check before commercial deployment.

**Master prompt (LX-00)**

```
Elements: @Sam (teen, grey hoodie, curly hair), @Workshop (cluttered garage with a workbench and one hanging bulb).
Shot 1, 4s, wide static: @Sam enters @Workshop and flicks on the bulb, light swinging.
Shot 2, 4s, medium, slow push in: @Sam sets a small wheeled robot on the bench and plugs in a cable.
Shot 3, 3s, close-up, static: the robot's eyes blink on, blue.
Shot 4, 5s, medium, slight handheld: the robot rolls off the bench edge, @Sam lunges and catches it, exhales, laughs.
Style: warm tungsten, handheld realism, light grain. Audio: bulb buzz, servo whirr, the laugh. 16 seconds total, 16:9, 4K, 24fps.
```

1. **LX-01 Sports at 50fps.** Shot 1, 5s, low tracking: a sprinter powers down a track, camera keeping pace. Shot 2, 3s, static close-up: spikes hitting the track in slow motion. Shot 3, 4s, wide: the finish and a raised fist. Style: hard stadium light, crisp. 50fps, 4K, 16:9.
2. **LX-02 Lip sync.** Shot 1, 8s, medium static: @Presenter (attached) looks into the camera and says, lips synced, "Welcome back. Today we build a timer in under ten minutes." Style: clean studio, soft key. Audio: the line, room tone. 24fps, 1080p.
3. **LX-03 Retake one beat.** Retake shot 2 of the previous project, seconds 4 to 8 only: the robot should plug itself in, not be plugged in by @Sam. Keep everything else identical.
4. **LX-04 Fantasy three shots.** Elements: @Ivy (archer, green cloak), @Ruins (mossy stone arch in a forest). Shot 1, 5s, wide crane up: @Ivy walks under @Ruins. Shot 2, 4s, close-up: she draws an arrow. Shot 3, 5s, tracking: the arrow flies through the arch and splits a hanging apple. Style: painterly, dappled light. 14s, 16:9, 4K.
5. **LX-05 Local test, no elements.** Shot 1, 6s, static wide: a red kite flies over a hill against a blue sky, its tail whipping. Shot 2, 4s, slow tilt down: the string leads to a child's hands. Style: bright, natural. 10s, 16:9, 1080p, 24fps.
6. **LX-06 Product shot list.** Element: @Lamp (attached desk lamp). Shot 1, 3s, macro: the switch clicks on. Shot 2, 4s, slow orbit: @Lamp glows on a dark desk. Shot 3, 3s, wide: the lamp lighting a notebook and a mug. Style: clean commercial, warm. 10s, 1:1.
7. **LX-07 Vertical story.** Element: @Nia (girl, red headphones). Shot 1, 4s: @Nia on a bus, looking out at rain. Shot 2, 3s: her phone lights up with a message. Shot 3, 5s: she smiles and starts typing, the bus pulling into sun. Style: soft, shallow depth of field. 12s, 9:16, 1080p.
8. **LX-08 Animal documentary.** Shot 1, 6s, long lens static: a heron in reeds. Shot 2, 4s, slow pan: it steps forward. Shot 3, 4s, static: it strikes and lifts a fish. Style: natural, muted morning. Audio: water, insects. 14s, 16:9, 4K, 24fps.
9. **LX-09 Game cutscene.** Elements: @Knight (attached), @Gate (huge iron gate). Shot 1, 4s, wide: @Knight approaches @Gate. Shot 2, 3s, close-up: a hand on a glowing rune. Shot 3, 5s, push in: @Gate opens, light floods out. Style: dark fantasy, cold blue and warm reveal. 12s, 16:9, 4K.
10. **LX-10 Cooking tutorial.** Shot 1, 4s, overhead: hands dice a tomato. Shot 2, 4s, side: tomato into a sizzling pan. Shot 3, 4s, medium: a stir and a taste, a nod. Style: bright kitchen, natural. Audio: knife, sizzle. 12s, 16:9, 1080p.
11. **LX-11 Music cut.** Shot 1, 2s: a drumstick hits a snare. Shot 2, 2s: a hand slides on a bass neck. Shot 3, 2s: a singer's mouth at a mic. Shot 4, 4s, wide: the whole band in a garage. Style: gritty, one red light. 10s, 16:9, 48fps.
12. **LX-12 Weather.** Shot 1, 5s, static wide: a city street as rain starts. Shot 2, 4s, low angle: drops hitting a puddle, neon reflections. Shot 3, 5s, wide: umbrellas opening, a bus passing. Style: blue hour, moody. Audio: rain, traffic. 14s, 16:9, 4K.
13. **LX-13 Explainer with text card.** Shot 1, 3s: a plain title card reading "Step 1: Plan". Shot 2, 6s, medium: a teen at a desk sketching boxes on paper. Shot 3, 3s: a card reading "Step 2: Build". Style: clean, white and one accent blue. 12s, 16:9, 1080p.
14. **LX-14 Horror.** Shot 1, 5s, static: a dark corridor, one door ajar with light flickering. Shot 2, 4s, slow push in: the door creaks wider. Shot 3, 3s, close-up: a hand on the frame from inside. Style: desaturated, cold. Audio: creak, hum. 12s, 16:9.
