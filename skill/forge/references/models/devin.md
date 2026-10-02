# Devin (`devin`)

Category: Coding agents. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every coding agents model.** Every coding agent needs the same four things: what exactly to build or change, what the project is built with, a pattern to follow, and a check that can be run by a command. A success criterion that cannot be checked by a command is not a success criterion.

**What it does.** Cloud / Desktop by Cognition. Async remote work on well-scoped tasks with a clear finish line. Weak at open-ended decisions: Cognition's own guidance is to be opinionated and not leave major decisions open.
**Write it as.** Four components in every good Devin prompt: context, step-by-step instructions, measurable success criteria, and an existing pattern to follow. Break work into verified checkpoints. Use Playbooks for procedures and Knowledge for standards that persist.
**Watch out.** Rules files are hard-capped at 6,000 characters global and 12,000 per workspace file; longer silently truncates. Windsurf is now Devin Desktop: .devin/ beats .windsurf/.

**Master prompt (DV-00)**

```
Context: a vanilla JS quiz app, tests with node:test via `npm test`, state in src/quiz-state.js, storage in src/storage.js.
Steps: 1. Read the timer toggle in src/quiz-state.js. 2. Add a shuffle toggle with the same shape. 3. Persist it with the settings helper in src/storage.js. 4. Write test/shuffle.test.mjs. 5. Run `npm test`. 6. Open a PR titled "Add shuffle toggle".
Success: `npm test` exits 0, the new test covers on, off and reload, the PR touches only the three files above.
Pattern: the existing timer toggle and its test in test/timer.test.mjs.
```

1. **DV-01** Context: the quiz shows NaN after the last question. Steps: reproduce with a test, fix src/score.js, run tests, open a PR. Success: test passes, `npm test` exits 0. Pattern: test/score.test.mjs.
2. **DV-02** Context: src/quiz.js is 900 lines. Steps: split into quiz-state.js and quiz-render.js, update imports, run tests. Success: `npm test` exits 0, no behaviour change per the golden fixture. Pattern: the module layout in src/storage.js.
3. **DV-03** Context: no CI. Steps: add a GitHub Actions workflow running `npm test` on push. Success: the workflow passes on the PR. Pattern: the workflow in the sibling repo forge-public.
4. **DV-04** Context: leaderboard feature. Steps: add storage, state and render pieces, tests for each, PR. Success: tests pass, top five persist across reload. Pattern: settings storage.
5. **DV-05** Context: mobile overflow at 375px. Steps: fix CSS in src/styles.css, verify with the Playwright mobile test, PR. Success: `npm run e2e` exits 0. Pattern: the existing responsive rules for the header.
6. **DV-06** Context: timer runs after the quiz ends. Steps: failing test, fix src/timer.js, run tests, PR. Success: `npm test` exits 0. Pattern: test/timer.test.mjs.
7. **DV-07** Context: every `var` should be `const` or `let`. Steps: convert across src/, lint, test, PR. Success: `npm run lint` and `npm test` exit 0. Pattern: src/storage.js already uses const.
8. **DV-08** Context: new Playbook. Steps: write .devin/playbooks/release.md describing bump version, run tests, build, tag, push. Success: the playbook runs end to end on a dry run. Pattern: scripts/build-public.mjs.
9. **DV-09** Context: Knowledge file. Steps: write a Knowledge entry under 2,000 characters with the repo's conventions. Success: it is under the cap and covers tests, modules and no-dependency rule. Pattern: CLAUDE.md.
10. **DV-10** Context: docs missing. Steps: generate docs/API.md for every export in src/index.js. Success: a script confirms every export is documented. Pattern: the docs format in forge-public/README.md.
