# NotebookLM (`notebooklm`)

Category: Research. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every research model.** A research prompt without a named decision produces a summary. With one, it produces an argument. Always specify the date range: every tool is weak on very recent events unless you pin it.

**What it does.** Gemini Notebook by Google. Source-grounded by construction: it refuses to go beyond your sources, and that is the feature. Synthesising a fixed corpus you control, with citations back to your own documents. It hedges rather than reach outside your sources.
**Write it as.** A question about your uploaded sources. Ask it to quote the passage it is relying on before it answers: that converts a summary into something checkable.
**Watch out.** The real ceiling is chat queries per day, not tokens. Plan long sessions around it.

**Master prompt (NL-00)**

```
Sources: the Forge build spec, the Forge plan, and the model catalogue.
Question: where does the plan change the build order set out in the spec?
Before answering, quote the exact passage from each source you rely on, with the source name. Then answer in under 150 words. If the sources do not say, say so.
```

1. **NL-01** Sources: my history notes for the term. Quote the passages, then write a 15-question quiz with an answer key, using only facts in the notes.
2. **NL-02** Sources: the biology textbook chapter PDF. Quote first, then make 20 flashcards as Front and Back, backs under 15 words.
3. **NL-03** Sources: three research papers on sleep and teenagers. Quote the relevant lines, then list where the papers disagree, as a table.
4. **NL-04** Sources: the game design document. Quote, then list every feature marked as "later" or "maybe".
5. **NL-05** Sources: last month's meeting notes. Quote, then list every decision and who made it.
6. **NL-06** Sources: the Forge policy manual. Quote, then answer: what does it say about auto-merging catalogue changes? If nothing, say so.
7. **NL-07** Sources: a novel we are studying. Quote three passages that show the main character changing, then explain each in one sentence.
8. **NL-08** Sources: the JavaScript course PDF. Quote, then write a study plan for the next five days based only on chapters 3 to 5.
9. **NL-09** Sources: five product reviews. Quote, then summarise the three most common complaints with a count each.
10. **NL-10** Sources: the school handbook. Quote, then answer: what is the rule on phones during lessons? Cite the section.
11. **NL-11** Sources: my own essay draft and the marking rubric. Quote the rubric lines, then say which criteria the draft misses.
12. **NL-12** Sources: the Forge model catalogue. Quote, then list every model marked "Not confirmed" and what is unconfirmed about each.
