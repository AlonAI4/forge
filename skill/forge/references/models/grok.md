# Grok (`grok`)

Category: Chat & reasoning. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every chat & reasoning model.** These are the models that do quiz generation, explaining, summarising, code, planning, stories, tables and translation. Every vendor's own guide agrees on one thing: state the output format. It is the strongest lever there is. Chain-of-thought instructions ("think step by step") are largely obsolete on 2026 frontier models: use the model's own reasoning control instead.

**What it does.** 4.7 by xAI. Cheap frontier-adjacent tool calling with a 500k window, low hallucination about its own positioning. Smaller context than peers, and xAI publish almost no prompting guidance. Knowledge cutoff is February 2026, so enable server-side search for anything current.
**Write it as.** A plain, clear brief. Keep prompts under 200k tokens: above that the price doubles.
**Watch out.** Set `prompt_cache_key` on the Responses API or you land on cache-cold servers and pay full input price.

**Master prompt (GR-00)**

```
Search: on. prompt_cache_key: forge-tutor-v1.
You are helping a 13-year-old who knows JavaScript basics. Review the code below. Return bugs with line numbers and one-line fixes, one improvement that teaches something new with a short example, and a rewrite of only the function that needs it most. Under 300 words, plain prose and short code blocks.

[paste quiz.js]
```

1. **GR-01 Current news quiz.** Search on. Write a 10-question multiple-choice quiz about this week's science news for age 13, four options each, answer key at the end, one source link per question.
2. **GR-02 Quiz JSON.** Output only a JSON array of 15 objects with q, options (4), answer (index), explain, on the topic of famous inventions.
3. **GR-03 Explain.** Explain how a for loop works to a 13-year-old in under 150 words, with one five-line JavaScript example.
4. **GR-04 Summarise.** Summarise the text below in five bullets under 20 words each. [paste]
5. **GR-05 Tool call plan.** You have tools: get_weather(city), send_message(to, text). The user says "tell my mum if it will rain in Manchester tomorrow". Call the tools in the right order and report what you sent.
6. **GR-06 Debug.** Cause in one sentence, fixed line, and why in two sentences. [paste code and error]
7. **GR-07 Current prices.** Search on. What are the current free-tier limits of Supabase, Netlify and Vercel? Table with a source link per row.
8. **GR-08 Story.** A 400-word story for teenagers about a boy whose game predicts tomorrow. Third person, past tense, ends on a choice.
9. **GR-09 Names.** Ten names for a 2D platformer about a fox delivering letters, as a table: Name, Why, Risk.
10. **GR-10 Function.** Write shuffle(array) in browser JavaScript returning a new shuffled copy, with a usage example and one sentence on the algorithm.
11. **GR-11 Compare.** Compare Netlify and Vercel for a static site with one form: cost, setup, forms, free tier, as a table, then a one-sentence pick.
12. **GR-12 Study plan.** A 10-day maths revision table (Day, Topic, Activity, Self-check) for fractions and percentages, 30 minutes a day.
13. **GR-13 Current events essay.** Search on. Outline a five-paragraph essay on a technology story from the last month, with one cited source per paragraph.
14. **GR-14 Riddles.** Ten riddles about everyday objects with the answer in bold on the next line.
15. **GR-15 Cheap batch.** prompt_cache_key: forge-classify-v1. Classify each of the 500 support messages below as bug, question or praise. Output CSV: id, label. [paste]
