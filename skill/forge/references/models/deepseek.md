# DeepSeek (`deepseek`)

Category: Chat & reasoning. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every chat & reasoning model.** These are the models that do quiz generation, explaining, summarising, code, planning, stories, tables and translation. Every vendor's own guide agrees on one thing: state the output format. It is the strongest lever there is. Chain-of-thought instructions ("think step by step") are largely obsolete on 2026 frontier models: use the model's own reasoning control instead.

**What it does.** V4 Pro / V4.1 Flash by DeepSeek. An order of magnitude cheaper than peers, MIT-licensed weights, 384k output, and one of the last frontier APIs that still supports prefilling. Cost per token, coding, very long outputs, self-hosting. Weak at multimodal, and the vision variant's vision is incompatible with thinking mode.
**Write it as.** A plain brief. Prefilling works: hit the beta base URL and send the last message as an assistant turn with prefix true, and the model continues from your text.
**Watch out.** Off-peak is half price at 01:00 to 04:00 and 06:00 to 10:00 UTC. Batch there.

**Master prompt (DS-00)**

```
User: Review the JavaScript below for a 13-year-old who knows the basics. Give bugs with line numbers and one-line fixes, one improvement that teaches something new with a short example, and a rewrite of only the function that needs it most. Under 300 words.

[paste quiz.js]

Assistant (prefix, prefill): ## Bugs
```

1. **DS-01 Quiz.** A 10-question multiple-choice quiz on the water cycle for age 13, four options each, answer key at the end.
2. **DS-02 Quiz JSON with prefill.** Output a JSON array of 15 objects with q, options (4), answer (index), explain, topic: the solar system. Prefill the assistant turn with `[` so it starts the array immediately.
3. **DS-03 Very long output.** Write a complete 12-chapter beginner's guide to JavaScript for 13-year-olds, about 1,500 words per chapter, with exercises at the end of each chapter. Output the whole thing in one response.
4. **DS-04 Explain.** Explain recursion in under 200 words with one everyday example and a five-line Python example.
5. **DS-05 Summarise.** Five bullets under 20 words each, then one line on who should read it. [paste article]
6. **DS-06 Function.** shuffle(array) in browser JavaScript, new shuffled copy, usage example, one sentence on the algorithm.
7. **DS-07 Debug.** Cause in one sentence, fixed line, why in two sentences. [paste code and error]
8. **DS-08 Code review.** Bugs only, table with line, severity, one-line fix. [paste file]
9. **DS-09 Story.** A 400-word story about a girl whose game predicts tomorrow, third person, past tense, ends on a choice.
10. **DS-10 Bulk generation.** Generate 200 distinct NPC greeting lines for a fantasy market, under 12 words each, numbered, no repeats of the first three words.
11. **DS-11 Test data.** Output 100 fake player records as CSV with columns id, name, country, score, joined_at, realistic values, no header repetition.
12. **DS-12 Translate.** Translate into Hebrew for a 13-year-old, names and code words in English, output only the translation. [paste]
13. **DS-13 Self-host question.** I want to run the open weights locally on one 24GB GPU. List the exact steps and the quantisation to use, as a numbered list.
14. **DS-14 Prefilled table.** Compare Netlify and Vercel on cost, setup, forms and free tier. Prefill the assistant turn with `| Feature | Netlify | Vercel |` so the answer is only the table.
15. **DS-15 Study plan.** Ten-day maths revision table (Day, Topic, Activity, Self-check), fractions and percentages, 30 minutes a day.
