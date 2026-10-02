# Any other music model (`generic-music`)

Category: Music. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every music model.** Five things to decide before you write any music prompt: genre, mood, instrumentation, tempo in BPM, and era. Say BPM and key as numbers and letters, not "fast" and "sad".

**What it does.** The wildcard. A portable style line plus a structured arrangement narration, which is what every music model actually wants.
**Write it as.** BPM and key as numbers and letters. Section metatags like [Chorus] are a Suno and ElevenLabs convention: check your tool before pasting them.

**Master prompt (GM-00)**

```
Style: indie folk, 96 BPM, key of G major, acoustic guitar, upright bass, brushed drums, soft male vocal, warm and hopeful, 2010s.
Arrangement: 0 to 15s guitar alone. 15 to 45s bass and brushes join, verse one. 45 to 75s chorus with light harmonies. 75 to 105s verse two. 105 to 135s final chorus. 135 to 150s guitar alone, fade.
Lyrics (if supported): chorus "Ship it, then fix it, nobody's waiting for perfect tonight".
If your tool takes section tags, wrap the sections as [Intro] [Verse 1] [Chorus] [Verse 2] [Chorus] [Outro].
```

1. **GM-01** Style: lo-fi hip hop, 84 BPM, A minor, Rhodes, dusty drums, no vocals, calm. Arrangement: drums first, Rhodes at 16s, bass at 32s, fade at 80s.
2. **GM-02** Style: synthwave, 118 BPM, F minor, analogue synths, gated drums, no vocals, nostalgic. Arrangement: arp intro 10s, drums in, lead at 30s, breakdown at 60s, full to 90s.
3. **GM-03** Style: orchestral trailer, 100 BPM, D minor, strings, brass, taiko, choir, no vocals, tense to triumphant. Arrangement: drone, pulse at 8s, brass at 16s, full at 30s, hard stop at 60s.
4. **GM-04** Style: chiptune, 140 BPM, C major, square lead, triangle bass, noise drums, no vocals, heroic. Arrangement: bass and drums 4 bars, lead in, bridge at 30s, loop point at 45s.
5. **GM-05** Style: acoustic ballad, 72 BPM, E major, nylon guitar, piano, soft female vocal, tender. Arrangement: guitar 15s, vocal verse, piano chorus at 45s, verse two, chorus, end at 150s.
6. **GM-06** Style: deep house, 122 BPM, G minor, kick, pad, sub bass, no vocals, hypnotic. Arrangement: 8-bar loop, filter opens over 32 bars.
7. **GM-07** Style: punk, 170 BPM, A major, power chords, live drums, shouted male vocal, raw. Arrangement: four count, verse, chorus, verse, chorus, crash ending at 90s.
8. **GM-08** Style: jazz trio, 100 BPM, Bb major, piano, upright bass, brushes, no vocals, relaxed. Arrangement: head 30s, piano solo 30s, head, end at 120s.
9. **GM-09** Style: children's, 110 BPM, C major, ukulele, glockenspiel, claps, kids' chorus, cheerful. Arrangement: uke, claps at 8s, hook at 16s, end at 30s.
10. **GM-10** Style: ambient, 60 BPM, free key, pads, distant piano, no drums, serene. Arrangement: pad throughout, piano phrase at 60s and 120s, end at 180s.
