# Codex (`codex`)

Category: Coding agents. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every coding agents model.** Every coding agent needs the same four things: what exactly to build or change, what the project is built with, a pattern to follow, and a check that can be run by a command. A success criterion that cannot be checked by a command is not a success criterion.

**What it does.** GPT-6 by OpenAI. Reads AGENTS.md and has its own effort ladder. Deep analysis on ambiguous high-value work at Sol, everyday work at Terra, repeatable extraction at Luna. The official rule is to use the lowest effort that produces the result. Ultra spawns parallel agents and the cost is non-linear.
**Write it as.** An AGENTS.md block plus a task. Codex will point at any model implementing Chat Completions or Responses, not only OpenAI's.
**Watch out.** Effort names differ between the API and the Codex UI. Do not map reasoning.effort to Light and Ultra one to one.

**Master prompt (CX-00)**

```
AGENTS.md:
Vanilla JS quiz app. Tests: `npm test` (node:test). State in src/quiz-state.js, rendering in src/quiz-render.js, storage in src/storage.js. Add a test for every feature. No new dependencies.

Task (effort Terra): Add a shuffle-questions toggle following the timer toggle pattern, persisted like settings, with a test in test/shuffle.test.mjs. Done when `npm test` exits 0.
```

1. **CX-01 Luna, extraction.** Effort Luna. List every exported function in src/ as a table: file, name, one-line purpose. No changes.
2. **CX-02 Terra, bug.** Effort Terra. Fix the NaN score in src/score.js with a regression test. `npm test` must exit 0.
3. **CX-03 Sol, ambiguous.** Effort Sol. The app feels slow with 500 questions. Investigate, decide what to change, change it, and report before and after timings from a benchmark you add in scripts/.
4. **CX-04 Terra, refactor.** Effort Terra. Split src/quiz.js into state and render modules with no behaviour change. `npm test` must pass.
5. **CX-05 Luna, docs.** Effort Luna. Generate JSDoc for every export in src/index.js.
6. **CX-06 Terra, feature.** Effort Terra. Add a leaderboard following the storage pattern, with tests.
7. **CX-07 Terra, mobile.** Effort Terra. Make the layout work at 375px with no horizontal scroll, checked by the Playwright test in test/e2e/mobile.spec.ts.
8. **CX-08 Sol, design.** Effort Sol. Propose a data model for a multiplayer mode over Supabase. Write it to docs/multiplayer.md with tables, columns and the three main queries. No code.
9. **CX-09 Terra, tests.** Effort Terra. The timer keeps running after the quiz ends. Failing test first, then fix.
10. **CX-10 Other model.** Point Codex at the local DeepSeek endpoint. Effort Terra. Convert every `var` in src/ to `const` or `let` and run the tests.
