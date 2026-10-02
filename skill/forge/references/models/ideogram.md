# Ideogram (`ideogram`)

Category: Image. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**What it does.** 4.0 by Ideogram. Trained on structured JSON captions, so a JSON prompt goes straight to the engine. The highest text-rendering accuracy measured anywhere: posters, logos, packaging, typographic design. Weak at photoreal skin and portraits. No alpha channels or editable text layers yet.
**Write it as.** JSON, 40 to 160 words of content. Plain-English keys you choose (subject, setting, style, text, layout, palette). Prose prompts get rewritten by Magic Prompt before generation, so set `magic_prompt` to OFF when sending engineered JSON. Bounding boxes are `[y_min, x_min, y_max, x_max]` on a 0 to 1000 canvas.
**Settings.** `style_codes` and `style_reference_images` are mutually exclusive.

**Master prompt (ID-00)**

```
{
  "type": "event poster",
  "subject": "a retro arcade night for teenagers",
  "setting": "a dark room lit by the glow of arcade cabinets, a checkerboard floor fading into the distance",
  "style": "1980s synthwave poster, chrome and neon, halftone shading, grid horizon",
  "palette": "hot pink, electric blue, black, white highlights",
  "text": [
    {"content": "ARCADE NIGHT", "box": [60, 100, 220, 900], "style": "chrome 3D block letters"},
    {"content": "Friday 14 Nov, 7pm", "box": [780, 250, 840, 750], "style": "clean white sans-serif"},
    {"content": "Free entry", "box": [860, 350, 910, 650], "style": "small pink outline"}
  ],
  "avoid": "any other text, real brand logos"
}
magic_prompt: OFF, aspect 2:3
```

1. **ID-01 Logo, coffee.** {"type":"logo","subject":"a coffee bean shaped like a crescent moon","style":"flat minimal, single colour on cream","text":[{"content":"Night Owl Coffee","box":[700,150,800,850],"style":"rounded lowercase sans-serif"}],"avoid":"gradients, extra icons"} magic_prompt OFF, 1:1
2. **ID-02 T-shirt print.** {"type":"t-shirt graphic","subject":"a skateboarding cat","style":"bold two-colour screen print, thick outlines","palette":"black and mustard on white","text":[{"content":"STAY ROLLING","box":[820,200,920,800],"style":"arched varsity letters"}]} magic_prompt OFF, 1:1
3. **ID-03 Book cover.** {"type":"book cover","subject":"a lighthouse in a storm","style":"painterly, dramatic, dark sea","text":[{"content":"THE LAST LIGHT","box":[80,100,240,900],"style":"tall serif, white"},{"content":"A novel by Dana Ross","box":[880,250,930,750],"style":"small italic"}]} magic_prompt OFF, 2:3
4. **ID-04 Menu.** {"type":"menu","subject":"a taco stand menu","style":"hand-lettered chalkboard","text":[{"content":"TACO TUESDAY","box":[50,100,180,900]},{"content":"Beef 3 / Chicken 3 / Veggie 2.5","box":[300,100,400,900]},{"content":"Add guac +1","box":[450,100,520,900]}],"palette":"white chalk on black"} magic_prompt OFF, 2:3
5. **ID-05 Game title screen.** {"type":"game title screen","subject":"a floating island city at sunset","style":"painted fantasy, wide","text":[{"content":"SKYHOLD","box":[120,200,300,800],"style":"carved stone letters with gold inlay"},{"content":"Press Start","box":[850,400,900,600],"style":"small pixel font, blinking white"}]} magic_prompt OFF, 16:9
6. **ID-06 Sticker.** {"type":"die-cut sticker","subject":"a smiling avocado lifting a dumbbell","style":"cute kawaii, thick white border","text":[{"content":"GET STRONG","box":[820,150,930,850],"style":"chunky bubble letters"}],"background":"plain white"} magic_prompt OFF, 1:1
7. **ID-07 Packaging label.** {"type":"product label","subject":"a hot sauce bottle label","style":"vintage apothecary, ornate border","palette":"red, black, cream","text":[{"content":"DRAGON'S BREATH","box":[200,100,330,900],"style":"bold condensed serif"},{"content":"Extra Hot Sauce","box":[360,200,420,800]},{"content":"150 ml","box":[850,400,900,600],"style":"small"}]} magic_prompt OFF, 2:3
8. **ID-08 Quote card.** {"type":"social post","subject":"a quote on a textured paper background","style":"minimal, editorial","text":[{"content":"Small steps, every day.","box":[400,100,600,900],"style":"large serif, centred, black"}],"avoid":"illustration, extra decoration"} magic_prompt OFF, 1:1
9. **ID-09 Band poster.** {"type":"gig poster","subject":"a cassette tape with tangled ribbon forming a mountain range","style":"risograph, grainy, two-colour","palette":"navy and orange","text":[{"content":"TAPE DECK MOUNTAIN","box":[60,80,200,920],"style":"stacked condensed type"},{"content":"Live at The Cellar, 3 Dec","box":[880,150,940,850]}]} magic_prompt OFF, 2:3
10. **ID-10 Infographic header.** {"type":"infographic header","subject":"a row of five simple icons: sun, cloud, rain, snow, wind","style":"flat line icons, even spacing","text":[{"content":"Weather This Week","box":[80,100,200,900],"style":"bold sans-serif"}],"palette":"navy on white"} magic_prompt OFF, 16:9
11. **ID-11 Certificate.** {"type":"certificate","subject":"a decorative certificate with a gold seal bottom right","style":"classic, thin double border","text":[{"content":"Certificate of Completion","box":[150,100,260,900],"style":"script"},{"content":"Awarded to","box":[400,300,450,700],"style":"small"},{"content":"Alon Shayo","box":[470,200,570,800],"style":"large serif"},{"content":"Intro to JavaScript, 2026","box":[620,250,670,750]}]} magic_prompt OFF, 3:2
12. **ID-12 App store screenshot.** {"type":"app store screenshot","subject":"a phone showing a habit tracker with green ticks","style":"clean, soft gradient background","text":[{"content":"Build habits that stick","box":[80,100,200,900],"style":"bold rounded sans-serif, white"}],"palette":"mint to teal gradient"} magic_prompt OFF, 9:16
13. **ID-13 Wordmark, tech.** {"type":"wordmark","subject":"only the word, no icon","style":"geometric sans-serif, tight tracking, one accent letter","text":[{"content":"forge","box":[400,150,600,850],"style":"lowercase, black, the letter o replaced by an orange ring"}],"background":"white"} magic_prompt OFF, 3:2
14. **ID-14 Warning sign.** {"type":"sign","subject":"a yellow triangular warning sign on a metal post","style":"photoreal signage","text":[{"content":"CAUTION","box":[350,300,420,700],"style":"black bold"},{"content":"WET FLOOR","box":[440,300,500,700],"style":"black"}]} magic_prompt OFF, 1:1
15. **ID-15 Comic cover.** {"type":"comic cover","subject":"a teen hero leaping between rooftops at night","style":"bold ink, halftone, dynamic angle","text":[{"content":"ROOFTOP","box":[40,60,180,940],"style":"tilted block letters, yellow with black outline"},{"content":"Issue 1","box":[200,700,250,940],"style":"small in a circle"}]} magic_prompt OFF, 2:3
16. **ID-16 Greeting card.** {"type":"greeting card","subject":"a small cake with one candle","style":"soft watercolour, lots of white space","text":[{"content":"Happy Birthday","box":[700,150,800,850],"style":"loose brush script, pink"}]} magic_prompt OFF, 4:5
17. **ID-17 Scoreboard.** {"type":"scoreboard graphic","subject":"a dark sports broadcast lower third","style":"clean broadcast graphics, thin lines","text":[{"content":"LIONS 2 - 1 HAWKS","box":[300,100,450,900],"style":"bold condensed white"},{"content":"FULL TIME","box":[500,350,560,650],"style":"small red"}]} magic_prompt OFF, 16:9
18. **ID-18 Label with style reference.** {"type":"jam jar label","subject":"strawberries and a leaf","style":"match the attached reference","text":[{"content":"Strawberry Jam","box":[500,150,620,850],"style":"hand-drawn serif"},{"content":"Made in small batches","box":[700,250,750,750],"style":"tiny italic"}]} style_reference_images attached, no style_codes, magic_prompt OFF, 1:1
19. **ID-19 Flashcard.** {"type":"flashcard","subject":"a plain card with a thin border","style":"minimal, education","text":[{"content":"photosynthesis","box":[250,100,400,900],"style":"large lowercase, dark green"},{"content":"How plants make food from light, water and CO2","box":[550,100,700,900],"style":"medium, grey"}]} magic_prompt OFF, 3:2
20. **ID-20 Neon sign.** {"type":"neon sign","subject":"a glowing neon sign on a dark brick wall","style":"photoreal neon, soft glow, reflections","text":[{"content":"open late","box":[400,150,600,850],"style":"pink cursive neon tubing"}],"avoid":"other signs, people"} magic_prompt OFF, 3:2
