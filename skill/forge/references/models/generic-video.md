# Any other video model (`generic-video`)

Category: Video. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every video model.** The one rule that matters on every video model: describe motion over time, not a photograph. Write what happens from the first second to the last. One camera move per shot.

**What it does.** The wildcard. Forge writes a portable cinematic prompt with every layer a video model can use, and flags which parts to delete if your model does not support them.
**Write it as.** 50 to 150 words. Motion over time, not a photograph. One camera move per shot. "Cinematic" is a null token in 2026: name the shot. For image-to-video, delete everything that re-describes the still and keep only what changes.

**Master prompt (GV-00)**

```
Shot: slow push-in, eye level.
Subject: a girl in a red coat on a wooden pier at dawn.
Action, start to end: she stands still, then a gull lands on the post beside her, she turns to it, laughs, and it flies off as she watches it go.
Setting: a calm grey lake, mist on the water, first warm light on the far shore.
Style: naturalistic, soft, slight grain.
Audio (delete if unsupported): water lapping, the gull's wingbeats, her laugh.
Duration: 8 seconds. Aspect: 16:9.
Image-to-video version: keep only "a gull lands on the post, she turns, laughs, it flies off, slow push-in".
```

1. **GV-01** Shot: static wide. Subject: a red bus at a rainy stop. Action: doors open, three people run on, doors close, it pulls away leaving a spray. Setting: city dusk. Style: moody, cool. 8s, 16:9.
2. **GV-02** Shot: slow orbit. Subject: a ceramic vase. Action: light sweeps across as the camera circles once. Setting: a plain studio. Style: clean. 6s, 1:1.
3. **GV-03** Shot: handheld follow. Subject: a dog on a beach. Action: it chases a ball into the shallows, splashes, and shakes off. Setting: bright noon. Style: playful. 8s, 16:9.
4. **GV-04** Shot: slow tilt up. Subject: a rocket on a pad. Action: engines ignite, smoke billows, it lifts off and leaves frame. Setting: dawn. Style: documentary. 8s, 9:16.
5. **GV-05** Shot: static close-up. Subject: a hand and a pencil. Action: it sketches a circle, then adds two eyes and a smile. Setting: a desk in daylight. Style: simple. 6s, 1:1.
6. **GV-06** Shot: slow push-in. Subject: a knight at a gate. Action: the gate opens, light floods, he steps through. Setting: dark fantasy. Style: painterly. 8s, 16:9.
7. **GV-07** Shot: static wide. Subject: a market street. Action: from empty at dawn to busy at noon, stalls opening, crowds filling in. Setting: an old town. Style: time-lapse. 10s, 16:9.
8. **GV-08** Shot: tracking from the side. Subject: a cyclist. Action: rides through a puddle, water arcing, and out into sunlight. Setting: a tree-lined lane after rain. Style: fresh, bright. 6s, 16:9.
9. **GV-09** Shot: static macro. Subject: a snowflake on wool. Action: it slowly melts into a drop. Setting: a dark coat. Style: quiet. 6s, 1:1.
10. **GV-10** Shot: slow crane up. Subject: a boy on a hill. Action: he lets go of a balloon and watches it rise past the camera. Setting: a green field, evening. Style: soft. 8s, 16:9.
11. **GV-11** Shot: static medium. Subject: a robot barista. Action: it pours a coffee, slides the cup forward, and gives a small bow. Setting: a bright cafe. Style: 3D, friendly. 8s, 16:9.
12. **GV-12** Shot: slow pan right. Subject: a mountain ridge. Action: clouds pour over the ridge like a waterfall, sun breaking through. Setting: high alpine dawn. Style: documentary. 10s, 21:9.
