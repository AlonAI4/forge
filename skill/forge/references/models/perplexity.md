# Perplexity (`perplexity`)

Category: Research. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every research model.** A research prompt without a named decision produces a summary. With one, it produces an argument. Always specify the date range: every tool is weak on very recent events unless you pin it.

**What it does.** Agent API by Perplexity. Search-grounded by construction, with a context-size dial that is a real cost and quality lever. Current questions where citations matter and you want the answer, not a list of links. Deep Research cost is four-dimensional: model the budget.
**Write it as.** The question, the scope, the answer shape, and `search_context_size` raised for questions with a wide evidence base.
**Watch out.** Sonar Chat Completions ended on 27 September 2026. Use the Agent API: Sonar Pro became its fast preset.

**Master prompt (PX-00)**

```
Question: which free static-site hosts in 2026 support a contact form without a backend?
Scope: pages updated in the last 12 months, official docs preferred over blogs.
Decision this feeds: choosing where to host a school club website with one form.
Answer shape: a table of host, form support, free-tier limit, source link, then a one-paragraph recommendation.
search_context_size: high. Preset: fast.
```

1. **PX-01** Question: current free-tier limits of Supabase, Netlify and Vercel. Scope: official pricing pages, this month. Shape: table with source per row. Context size: medium.
2. **PX-02** Question: what changed in JavaScript in the last ES release? Scope: official proposals and MDN, last 12 months. Shape: bullets with one link each. Context size: medium.
3. **PX-03** Question: is it safe to store a quiz leaderboard in localStorage? Scope: security docs, last 2 years. Decision: whether I need a backend. Shape: short answer, then three bullets, sources. Context size: low.
4. **PX-04** Question: what are the top three free image-generation APIs for a student project? Scope: official docs, last 6 months. Decision: which to wire into a school project. Shape: table with limits and links. Context size: high.
5. **PX-05** Question: what happened in the space industry this week? Scope: last 7 days, major outlets. Shape: five bullets, one source each. Context size: medium.
6. **PX-06** Question: how do Chrome extensions inject a button into a web page in Manifest V3? Scope: Chrome developer docs. Shape: numbered steps with the doc link per step. Context size: medium.
7. **PX-07** Question: which UK universities offer a computer science course with a game-design option? Scope: university sites, current year. Shape: table of university, course, link. Context size: high.
8. **PX-08** Question: what is the current best practice for prompt injection defence in LLM apps? Scope: vendor security guides, last 12 months. Decision: how to handle pasted content in Forge. Shape: five rules with sources. Context size: high.
9. **PX-09** Question: average cost of a domain name in 2026 for .com and .dev. Scope: registrar pricing pages. Shape: two lines with links. Context size: low.
10. **PX-10** Question: is Suno's download cap real and what are the numbers? Scope: Suno release notes and help pages. Shape: direct answer with the source. Context size: low.
11. **PX-11** Question: which AI video models allow commercial use on a free tier? Scope: official terms pages, last 6 months. Decision: which to use for a school film. Shape: table with a terms link per row. Context size: high.
12. **PX-12** Question: what are the accessibility requirements for a custom dropdown? Scope: WAI-ARIA authoring practices. Shape: checklist with the spec link. Context size: medium.
