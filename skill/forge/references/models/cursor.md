# Cursor (`cursor`)

Category: Coding agents. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every coding agents model.** Every coding agent needs the same four things: what exactly to build or change, what the project is built with, a pattern to follow, and a check that can be run by a command. A success criterion that cannot be checked by a command is not a success criterion.

**What it does.** Composer 2.5 plus frontier models, by Cursor. Fast in-editor iteration, glob-scoped rules for monorepos, plan-then-build on medium features. Rule bloat is the documented number one failure mode.
**Write it as.** Reference files with @filename rather than pasting content. When output is wrong, revert and refine the plan: patching a bad output iteratively is the documented anti-pattern.
**Watch out.** Rules must be .mdc inside .cursor/rules/. A plain .md there does nothing, silently. Team rules override yours.

**Master prompt (CU-00)**

```
Plan mode. Add a "shuffle questions" toggle to @quiz.js, following the existing timer toggle pattern in the same file. Persist it in localStorage like @storage.js does for settings. Add a test in @test/shuffle.test.mjs. Done when `npm test` passes. Do not modify @score.js. Show the plan first.
```

1. **CU-01** Explain what @quiz.js does in five bullets. No changes.
2. **CU-02** Fix the NaN score in @score.js. Add a test in @test/score.test.mjs that fails before and passes after. Run `npm test`.
3. **CU-03** Split @quiz.js into quiz-state.js and quiz-render.js, no behaviour change, `npm test` must pass.
4. **CU-04** Write .cursor/rules/style.mdc, under 15 lines: no `any`, tests next to code, no native `<select>`. Scope it with globs to src/**.
5. **CU-05** Make @index.html work at 375px with no horizontal scroll. Check with the Playwright test in @test/e2e/mobile.spec.ts.
6. **CU-06** Add a leaderboard following the storage pattern in @storage.js. Test in @test/leaderboard.test.mjs. `npm test` green.
7. **CU-07** The plan you produced put the shuffle in render. Revert. New plan: shuffle in state, render stays pure. Then build.
8. **CU-08** Rename every `qList` to `questions` across src/ and tests. `npm run lint` and `npm test` must pass.
9. **CU-09** Add JSDoc to every exported function in @src/index.js, one line each plus params.
10. **CU-10** Write a path-scoped rule .cursor/rules/tests.mdc for test/** only: use node:test, no mocks of the DOM, one assertion per test where possible.
11. **CU-11** Make the timer in @timer.js stop when the quiz ends. Failing test first in @test/timer.test.mjs, then fix.
12. **CU-12** Review @quiz.js for bugs only, list with line numbers, do not edit.
