# Any other coding agent (`generic-code`)

Category: Coding agents. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every coding agents model.** Every coding agent needs the same four things: what exactly to build or change, what the project is built with, a pattern to follow, and a check that can be run by a command. A success criterion that cannot be checked by a command is not a success criterion.

**What it does.** The wildcard. The four things every coding agent needs, in the order they need them, plus an AGENTS.md block that most of them now read (Cursor, Codex, Copilot and Devin Desktop all read it).

**Master prompt (GC-00)**

```
AGENTS.md:
Vanilla JS quiz app. Tests: `npm test`. State in src/quiz-state.js, rendering in src/quiz-render.js, storage in src/storage.js. Every feature gets a test. No new dependencies.

Task: Add a shuffle-questions toggle.
Built with: vanilla JS, node:test.
Pattern: the timer toggle in src/quiz-state.js and its test.
Check: `npm test` exits 0 and the new test covers on, off and reload.
```

1. **GC-01** Task: fix the NaN score. Built with: vanilla JS. Pattern: test/score.test.mjs. Check: regression test passes, `npm test` exits 0.
2. **GC-02** Task: split src/quiz.js into state and render. Pattern: src/storage.js layout. Check: `npm test` exits 0, golden fixture unchanged.
3. **GC-03** Task: leaderboard, top five in localStorage. Pattern: settings storage. Check: tests pass, persists across reload.
4. **GC-04** Task: mobile layout at 375px. Pattern: header responsive rules. Check: `npm run e2e` exits 0.
5. **GC-05** Task: timer stops at quiz end. Pattern: test/timer.test.mjs. Check: failing test first, then `npm test` exits 0.
6. **GC-06** Task: JSDoc for every export. Pattern: the existing comment on `loadQuestions`. Check: a script lists exports without docs and prints none.
7. **GC-07** Task: CI on push. Pattern: forge-public workflow. Check: the workflow passes.
8. **GC-08** Task: convert `var` to `const`/`let`. Pattern: src/storage.js. Check: lint and tests exit 0.
9. **GC-09** Task: explain the question flow, no changes. Check: names the files and functions in order.
10. **GC-10** Task: performance with 500 questions under 300ms. Pattern: none, add scripts/bench.mjs. Check: the benchmark prints under 300 and tests pass.
