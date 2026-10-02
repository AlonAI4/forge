# Any other research tool (`generic-research`)

Category: Research. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every research model.** A research prompt without a named decision produces a summary. With one, it produces an argument. Always specify the date range: every tool is weak on very recent events unless you pin it.

**What it does.** The wildcard. A portable research brief with the question, the decision, the scope, the structure and the missing-evidence rule.

**Master prompt (GRS-00)**

```
Question: what is the best free way to host a static site with one contact form?
Decision: where to host a school club website.
Scope: official docs, updated in the last 12 months.
Structure: table of options, then a one-paragraph recommendation.
Missing evidence: mark any claim without a source as "unsourced".
```

1. **GRS-01** Question: free-tier limits of Supabase, Netlify, Vercel. Decision: stack for a student project. Scope: pricing pages, this month. Structure: table with links. Missing evidence rule.
2. **GRS-02** Question: is localStorage safe for a leaderboard? Decision: whether to add a backend. Scope: security docs, 2 years. Structure: answer, three bullets, sources.
3. **GRS-03** Question: which AI image APIs have a free tier? Decision: which to use at school. Scope: official docs, 6 months. Structure: table. Missing evidence rule.
4. **GRS-04** Question: how do extensions inject UI in Manifest V3? Decision: how to build the Forge button. Scope: Chrome docs. Structure: numbered steps with links.
5. **GRS-05** Question: what changed in JavaScript this year? Decision: what to learn next. Scope: MDN and proposals, 12 months. Structure: bullets with links.
6. **GRS-06** Question: best practice for prompt injection defence. Decision: how Forge handles pasted text. Scope: vendor guides, 12 months. Structure: five rules with sources.
7. **GRS-07** Question: do leaderboards help or hurt motivation in learning games? Decision: whether to add one. Scope: research, 10 years. Structure: summary, findings, guidance, sources.
8. **GRS-08** Question: commercial terms of free video model tiers. Decision: which to use for a school film. Scope: terms pages, 6 months. Structure: table with links.
9. **GRS-09** Question: accessibility rules for custom dropdowns. Decision: how to build Forge's picker. Scope: WAI-ARIA. Structure: checklist with links.
10. **GRS-10** Question: what did similar prompt tools ship in the last two years? Decision: Forge's next feature. Scope: changelogs, 2024 to 2026. Structure: table, gaps, recommendation.
