# Gemini (`gemini`)

Category: Chat & reasoning. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every chat & reasoning model.** These are the models that do quiz generation, explaining, summarising, code, planning, stories, tables and translation. Every vendor's own guide agrees on one thing: state the output format. It is the strongest lever there is. Chain-of-thought instructions ("think step by step") are largely obsolete on 2026 frontier models: use the model's own reasoning control instead.

**What it does.** 3.8 Flash / 3.1 Pro by Google. Price and performance on coding and agents, document comprehension, enterprise automation, huge multimodal context. Direct and terse by default: if you want it detailed or conversational, say so.
**Write it as.** Pick one delimiter system, XML tags or markdown headings, and stay on it. Large data blocks at the top, the specific ask at the very end.
**Watch out.** Do not set temperature, top_p or top_k: Google strongly recommend the defaults, and low temperature causes looping. Thought signatures must round-trip across calls or multi-turn reasoning breaks.

**Master prompt (GE-00)**

```
## Code
[paste quiz.js]

## Reader
A 13-year-old who knows JavaScript basics.

## Task
Review the code. Give bugs with line numbers and one-line fixes, then one improvement that teaches something new with a short example, then a rewrite of only the function that needs it most. Be detailed in the explanation, but keep the whole answer under 300 words.
```

1. **GE-01 Quiz.** ## Topic: the water cycle, age 13. ## Task: a 10-question multiple-choice quiz, four options each, answer key at the end.
2. **GE-02 Quiz JSON.** ## Format: JSON array of objects with q, options (4), answer (index), explain. ## Task: 15 questions on the solar system. Output only JSON.
3. **GE-03 Flashcards from a PDF.** ## Source: [attach the chapter PDF]. ## Task: 20 flashcards as a table, Front and Back, backs under 15 words.
4. **GE-04 Explain, detailed.** ## Reader: 13, knows Python basics. ## Task: explain recursion with one everyday example and one five-line Python example. Be conversational and detailed, up to 250 words.
5. **GE-05 Summarise a long doc.** ## Document: [paste the 80-page report]. ## Task: five bullets under 20 words, then one line on who should read it.
6. **GE-06 Essay outline.** ## Topic: schools should teach coding from age 10. ## Task: a five-paragraph persuasive outline with a heading, claim and two points per paragraph.
7. **GE-07 Function.** ## Environment: browser JavaScript, no libraries. ## Task: shuffle(array) returning a new shuffled copy, a two-line usage example, one sentence on the algorithm.
8. **GE-08 Debug.** ## Code and error: [paste]. ## Task: cause in one sentence, the fixed line, why in two sentences.
9. **GE-09 Video comprehension.** ## Video: [attach the 10-minute tutorial]. ## Task: a timestamped list of every step shown, one line each.
10. **GE-10 Image to data.** ## Image: [attach photo of a handwritten timetable]. ## Task: transcribe it as a markdown table with days as columns.
11. **GE-11 Story.** ## Audience: 12 to 15. ## Task: a 400-word story about a girl whose game predicts tomorrow, third person, past tense, ends on a choice. Flowing prose.
12. **GE-12 NPC lines.** ## Character: grumpy dwarf blacksmith. ## Task: eight shop greetings under 15 words, varied moods, numbered.
13. **GE-13 Names.** ## Game: 2D platformer, fox delivering letters. ## Task: ten names as a table, Name, Why, Risk.
14. **GE-14 Plan.** ## Constraints: two weekends, one person, HTML/CSS/JS. ## Task: a to-do app in four milestones with build, test, hours, as a table.
15. **GE-15 Translate.** ## Text: [paste]. ## Task: Hebrew for a 13-year-old, names and code words stay English, output only the translation.
16. **GE-16 Compare.** ## Case: static site with one form. ## Task: Netlify vs Vercel on cost, setup, forms, free tier, as a table, then a one-sentence pick.
17. **GE-17 README.** ## Files: [paste package.json and main]. ## Task: README with What it is, Install, Run, How it works, Licence, under 250 words.
18. **GE-18 Tests.** ## Function: [paste]. ## Task: six Node test-runner tests, two normal, two edge, two error, code only.
19. **GE-19 Study plan.** ## Situation: maths test in 10 days, weak on fractions and percentages, 30 minutes a day. ## Task: day-by-day table with Day, Topic, Activity, Self-check.
20. **GE-20 Actions.** ## Notes: [paste]. ## Task: table of Action, Owner, Due, Source line, then decisions as bullets.
21. **GE-21 Word problems.** ## Level: age 13, percentages. ## Task: five word problems of rising difficulty, each with a three-step solution.
22. **GE-22 Spreadsheet formula.** ## Sheet: column A names, column B scores. ## Task: a Google Sheets formula for the top three names by score, then explain it in two sentences.
23. **GE-23 Regex.** ## Use: browser form. ## Task: a JavaScript regex for UK postcodes, three matches, three non-matches, one sentence per part.
24. **GE-24 Automation.** ## Data: [paste 200 rows of CSV]. ## Task: find every row where the email is invalid and output those rows as CSV, nothing else.
25. **GE-25 Long-context question last.** ## Spec: [paste 60 pages]. ## Plan: [paste]. ## Task: where does the plan contradict the spec? Under 150 words.
