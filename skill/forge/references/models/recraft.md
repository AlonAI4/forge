# Recraft (`recraft`)

Category: Image. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**What it does.** V4.1 by Recraft. The only model producing genuine editable SVG, real paths that open in Figma and Illustrator. Logos, icon sets, brand kits, vector illustration, structured text hierarchy, utility and product shots. Weak at cinematic drama and frontier human photorealism. V4 dropped the style creation and prompt-based editing V3 had, so route those to V3.
**Write it as.** Prose, 25 to 100 words, ordered global to local: core concept, background, subject framing, attributes, spatial relations, lighting, camera, mood. Short prompts mean the model designs with you; long prompts mean it executes your plan. Use `controls.colors` with explicit RGB for brand colours. The prompt cap is 1000 bytes, and accented text eats it fast.

**Master prompt (RC-00)**

```
A flat vector logo for a kids' coding club. Plain white background. A friendly robot head centred in the frame, built from simple rounded rectangles, one antenna with a small star on top, two square eyes. Bold even outlines, no gradients, no shadows. Balanced and symmetrical, suitable for a badge. style: vector_illustration, controls.colors: [ {rgb:[30,60,110]}, {rgb:[255,140,40]} ], output SVG.
```

1. **RC-01 Icon set.** A set of eight flat line icons on a plain white background, arranged in two rows of four: home, search, bell, user, settings, heart, cart, camera. Consistent 2px strokes, rounded corners, same visual weight, evenly spaced. style: icon, controls.colors [rgb 40,40,40], SVG.
2. **RC-02 Wordmark.** A wordmark for a game studio called Skyhold. Plain background. The word set in a custom geometric sans-serif with a small cloud shape replacing the dot over the i. Tight tracking, single colour, no icon beside it. style: vector_illustration, controls.colors [rgb 20,30,60], SVG.
3. **RC-03 Mascot.** A vector mascot of a cheerful lemon wearing sunglasses, on a plain pale yellow background, centred, thick outlines, flat colour fills, simple shapes readable at small sizes. style: vector_illustration, controls.colors [rgb 255,220,50], [rgb 40,40,40], SVG.
4. **RC-04 Badge.** A circular achievement badge on a plain background, a laurel wreath around the edge, a shield in the centre with a lightning bolt, a ribbon banner across the bottom with space for a word. Two colours, flat, crisp. style: vector_illustration, controls.colors [rgb 200,160,60], [rgb 30,30,30], SVG.
5. **RC-05 Product shot.** A realistic product shot of a matte white wireless earbuds case, open, on a plain light grey background, centred and slightly angled, soft top light with a faint shadow underneath, clean and quiet. style: realistic_image, 1:1.
6. **RC-06 Illustration, hero.** A flat vector illustration for a website hero: a person watering a giant plant that grows into a bar chart, plain background, figure on the left, chart on the right, simple shapes, limited palette, calm mood. style: vector_illustration, controls.colors [rgb 40,120,90], [rgb 250,200,80], SVG.
7. **RC-07 App icon.** An app icon for a notes app, a rounded square with a folded paper corner and a single pencil line, flat, one accent colour on white, centred, no text. style: icon, controls.colors [rgb 250,120,60], SVG.
8. **RC-08 Map pin set.** Four map pins in a row on a plain background: food, hotel, museum, park, each with a tiny symbol inside, same size and stroke, flat colour. style: icon, SVG.
9. **RC-09 Pattern.** A seamless vector pattern of small geometric shapes, triangles, circles and squares, scattered evenly on a plain background, two colours, playful, tile-ready. style: vector_illustration, controls.colors [rgb 240,240,235], [rgb 60,80,200], SVG.
10. **RC-10 Infographic pieces.** Five numbered circles connected by a dotted line curving left to right on a plain background, each circle with a simple icon: idea, plan, build, test, launch, flat and clean. style: vector_illustration, SVG.
11. **RC-11 Logo, bakery.** A logo for a bakery called Crumb, plain background, a wheat stalk bending into the shape of the letter C beside the word in a soft serif, one colour, warm and simple. style: vector_illustration, controls.colors [rgb 120,70,30], SVG.
12. **RC-12 Character, game UI.** A small flat vector avatar of a knight helmet with a red plume, front on, plain circle background behind it, bold shapes, readable at 64px. style: vector_illustration, controls.colors [rgb 90,90,100], [rgb 200,40,40], SVG.
13. **RC-13 Utility shot.** A clean photo-style image of a stack of three folded grey t-shirts on a plain white background, centred, soft even light, no props. style: realistic_image, 1:1.
14. **RC-14 Emoji set.** Six flat emoji faces on a plain background in a row: happy, sad, surprised, angry, sleepy, cool, same circle size, same stroke, yellow with dark features. style: icon, SVG.
15. **RC-15 Poster shape.** A vector poster background: plain cream, three large overlapping soft blobs in the lower half, empty upper half for text, calm and minimal. style: vector_illustration, controls.colors [rgb 250,245,235], [rgb 255,170,120], [rgb 120,180,200], SVG.
16. **RC-16 Sticker.** A die-cut style vector sticker of a rocket with a smiling face, plain background, thick white border around the shape, flat colours, playful. style: vector_illustration, SVG.
17. **RC-17 Diagram nodes.** Three rounded rectangles connected by arrows on a plain background, labelled Input, Process, Output, clean flowchart style, one stroke colour. style: vector_illustration, SVG.
18. **RC-18 Brand kit tile.** A flat vector tile showing a logo placeholder circle, two colour swatches and a line of sample text, arranged neatly on a plain background, brand-guide style. style: vector_illustration, controls.colors [rgb 30,60,110], [rgb 255,140,40], SVG.
19. **RC-19 Weather icons.** A set of five flat weather icons on a plain background: sun, partly cloudy, rain, snow, storm, rounded shapes, consistent stroke, two colours. style: icon, SVG.
20. **RC-20 Simple landscape.** A flat vector landscape of rolling hills with a single tree and a low sun, plain sky, three shades of green, minimal shapes, calm. style: vector_illustration, SVG.
