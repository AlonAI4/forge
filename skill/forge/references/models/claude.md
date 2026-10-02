# Claude (`claude`)

Category: Chat & reasoning. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every chat & reasoning model.** These are the models that do quiz generation, explaining, summarising, code, planning, stories, tables and translation. Every vendor's own guide agrees on one thing: state the output format. It is the strongest lever there is. Chain-of-thought instructions ("think step by step") are largely obsolete on 2026 frontier models: use the model's own reasoning control instead.

**What it does.** Opus 5.5 / Sonnet 5.5 / Fable 5.1 by Anthropic. Agentic coding, long-horizon autonomy, multi-file refactors, code review precision, 1M-context consistency, documents and decks. Verbose unless told otherwise. Sampling parameters are blocked on the 5-series.
**Write it as.** XML tags are the documented structure: `<instructions>`, `<context>`, `<document>`, `<example>`. Put long material at the top and the question at the end: Anthropic measure up to 30% improvement on complex multi-document inputs. Tell it what to do, not what not to do ("compose flowing prose" beats "do not use markdown"). If you want it short, say so in words: effort does not shorten the answer.
**Watch out.** Remove legacy "verify your work" lines on Opus 5: they cause over-verification with no gain.

**Master prompt (CL-00)**

```
<context>
I am 13 and learning JavaScript. I am building a small browser quiz game for my class. I know variables, if statements and functions. I have not used arrays of objects much.
</context>

<document>
[paste the 40-line quiz.js file here]
</document>

<instructions>
Review the file above and then give me three things, in this order:
1. A list of any bugs, each with the line number and a one-sentence fix.
2. One improvement that would teach me something new, explained in plain words with a short example.
3. A rewritten version of only the function that needs the most change.
Keep the whole answer under 300 words. Use plain prose and short code blocks. Explain any new term in one sentence the first time you use it.
</instructions>

What are the bugs, the one improvement, and the rewritten function?
```

1. **CL-01 Quiz, multiple choice.** `<instructions>`Write a 10-question multiple-choice quiz on the water cycle for 13-year-olds. Each question has four options, one correct. Put the answer key at the end as a numbered list. Format: numbered questions, options labelled A to D.`</instructions>` Give me the quiz.
2. **CL-02 Quiz as JSON for a game.** `<instructions>`Produce 15 quiz questions about the solar system as a JSON array. Each object has "q", "options" (array of 4 strings), "answer" (index 0 to 3) and "explain" (one sentence). Output only the JSON, no prose.`</instructions>` Output the array.
3. **CL-03 Flashcards.** `<document>`[paste chapter notes]`</document>` `<instructions>`Turn the notes above into 20 flashcards as a two-column table: Front, Back. Fronts are questions, backs are answers under 15 words.`</instructions>` Make the table.
4. **CL-04 Explain a concept.** `<context>`I am 13, I know Python basics.`</context>` `<instructions>`Explain recursion in under 200 words using one everyday example and one five-line Python example. Define any new term in one sentence.`</instructions>` Explain recursion.
5. **CL-05 Summarise long text.** `<document>`[paste the article]`</document>` `<instructions>`Summarise the document in five bullet points, each under 20 words, then one sentence on who should read it.`</instructions>` Summarise it.
6. **CL-06 Essay outline.** `<instructions>`Outline a five-paragraph persuasive essay arguing that schools should teach coding from age 10. Give each paragraph a heading, a claim, and two supporting points. Plain prose, no essay text yet.`</instructions>` Write the outline.
7. **CL-07 Write a function.** `<context>`Vanilla JavaScript in the browser, no libraries.`</context>` `<instructions>`Write a function shuffle(array) that returns a new shuffled copy without changing the original. Include a two-line usage example and a one-sentence explanation of the algorithm.`</instructions>` Write it.
8. **CL-08 Debug.** `<document>`[paste the code and the error]`</document>` `<instructions>`Find the cause of the error above. Answer in this order: the cause in one sentence, the fixed line, why it happened in two sentences.`</instructions>` What is wrong?
9. **CL-09 Code review.** `<document>`[paste file]`</document>` `<instructions>`Review for bugs only, not style. List each bug with line number, severity (high, medium, low) and a one-line fix, as a table.`</instructions>` Review it.
10. **CL-10 Story.** `<instructions>`Write a 400-word short story for teenagers about a girl who finds a game that predicts tomorrow. Third person, past tense, end on a choice. Flowing prose, no headings.`</instructions>` Write the story.
11. **CL-11 NPC dialogue.** `<context>`Fantasy game, a grumpy dwarf blacksmith NPC.`</context>` `<instructions>`Write eight lines he could say when the player enters the shop, each under 15 words, varied in mood, as a numbered list.`</instructions>` Write the lines.
12. **CL-12 Name a game.** `<context>`A 2D platformer about a fox delivering letters across a mountain.`</context>` `<instructions>`Give ten game name ideas as a table: Name, Why it fits, One risk.`</instructions>` Suggest names.
13. **CL-13 Plan a project.** `<context>`Two weekends, one person, HTML/CSS/JS only.`</context>` `<instructions>`Plan a to-do app in four milestones. For each: what is built, how I test it, a rough hour estimate. Table format.`</instructions>` Plan it.
14. **CL-14 Translate.** `<document>`[paste English text]`</document>` `<instructions>`Translate into Hebrew for a 13-year-old reader. Keep names and code words in English. Output only the translation.`</instructions>` Translate.
15. **CL-15 Rewrite simpler.** `<document>`[paste paragraph]`</document>` `<instructions>`Rewrite at a reading level for age 12, same meaning, under 80 words, plain prose.`</instructions>` Rewrite it.
16. **CL-16 Compare two options.** `<context>`Choosing between Netlify and Vercel for a static site with one form.`</context>` `<instructions>`Compare on cost, setup time, forms, and free-tier limits as a table, then one sentence recommending one for my case.`</instructions>` Compare them.
17. **CL-17 README.** `<document>`[paste package.json and main file]`</document>` `<instructions>`Write a README with sections: What it is, Install, Run, How it works (five bullets), Licence. Under 250 words.`</instructions>` Write it.
18. **CL-18 Unit tests.** `<document>`[paste function]`</document>` `<instructions>`Write six unit tests in plain Node test runner style: two normal cases, two edge cases, two error cases. Code only, with a one-line comment above each test.`</instructions>` Write the tests.
19. **CL-19 Interview me for a spec.** `<instructions>`Interview me about a game I want to build. Ask one question at a time, at most eight questions, then write a one-page spec with sections Goal, Player, Core loop, Screens, Out of scope. Start with the first question.`</instructions>` Begin.
20. **CL-20 Study plan.** `<context>`Maths test in 10 days, weak on fractions and percentages, 30 minutes a day.`</context>` `<instructions>`Make a day-by-day plan as a table: Day, Topic, Activity, How I check I got it.`</instructions>` Make the plan.
21. **CL-21 Meeting notes to actions.** `<document>`[paste notes]`</document>` `<instructions>`Extract action items as a table: Action, Owner, Due, Source line. Then list any decisions in one bullet each.`</instructions>` Extract them.
22. **CL-22 Word problems.** `<instructions>`Write five maths word problems on percentages for age 13, increasing difficulty, each with a worked solution under it in three short steps.`</instructions>` Write them.
23. **CL-23 Deck outline.** `<context>`A five-minute class presentation on how the internet works.`</context>` `<instructions>`Outline eight slides: title, three bullet points per slide, and one speaker note per slide. Plain list format.`</instructions>` Outline the deck.
24. **CL-24 Regex.** `<instructions>`Write a JavaScript regex that matches UK postcodes. Give the regex, three matching examples, three non-matching examples, and a one-sentence explanation of each part.`</instructions>` Write it.
25. **CL-25 SQL.** `<context>`Tables: players(id, name), scores(player_id, points, played_at).`</context>` `<instructions>`Write a SQL query for the top five players by total points this month. Then explain each clause in one line.`</instructions>` Write the query.
26. **CL-26 Roleplay a customer.** `<instructions>`Play a confused customer who cannot log in to my app. Stay in character, answer only what I ask, and get slightly impatient after three questions. Start with your opening complaint in two sentences.`</instructions>` Begin.
27. **CL-27 Riddles.** `<instructions>`Write ten riddles about everyday objects for a school quiz night, each with its answer on the next line in bold.`</instructions>` Write them.
28. **CL-28 Error message rewrite.** `<document>`[paste ten error strings]`</document>` `<instructions>`Rewrite each so it says what went wrong and how to fix it, under 12 words, no exclamation marks. Two-column table: Old, New.`</instructions>` Rewrite them.
29. **CL-29 Long context, question last.** `<document>`[paste the full 60-page spec]`</document>` `<document>`[paste the current plan]`</document>` `<instructions>`Answer in under 150 words, plain prose.`</instructions>` Where does the plan contradict the spec?
30. **CL-30 Commit message.** `<document>`[paste git diff]`</document>` `<instructions>`Write a commit message: one summary line under 60 characters, blank line, then up to four bullets of what changed and why.`</instructions>` Write it.
