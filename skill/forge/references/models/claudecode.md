# Claude Code (`claudecode`)

Category: Coding agents. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every coding agents model.** Every coding agent needs the same four things: what exactly to build or change, what the project is built with, a pattern to follow, and a check that can be run by a command. A success criterion that cannot be checked by a command is not a success criterion.

**What it does.** Current, by Anthropic. Explore, plan, implement, commit: the documented prescription is a workflow, not a prompt. Long autonomous runs with real verification, codebase questions and onboarding, parallel fan-out migrations. Weak at cheap one-liners (the context ramp costs more than it saves) and anything with no runnable check.
**Write it as.** Give it something that exits 0: tests, a build, a screenshot diff. Plan first in plan mode, then execute. For big features, have it interview you, write SPEC.md, then start a fresh session. Adversarial review works in fresh context, not the same session.
**Watch out.** Keep CLAUDE.md lean: test every line with "would removing this cause a mistake?" After two failed corrections, clear the context and rewrite the prompt.

**Master prompt (CC-00)**

```
Plan mode first. Add a "shuffle questions" toggle to the quiz app.
Context: vanilla JS, single index.html plus quiz.js, tests in test/ run with `npm test`. Follow the pattern of the existing "show timer" toggle in quiz.js (search for `timerToggle`).
Done means: a new test in test/shuffle.test.mjs passes, `npm test` exits 0, and the toggle state survives a page reload via localStorage like the timer one does.
Do not touch the scoring code. Show me the plan before editing anything.
```

1. **CC-01 Onboarding question.** Explain how a question gets from questions.json to the screen in this repo. Name the files and functions in order. Do not change anything.
2. **CC-02 Bug with a check.** The score shows NaN after the last question. Find the cause and fix it. Done means: `npm test` exits 0 and a new test reproduces the old bug and passes.
3. **CC-03 Refactor with tests.** Split quiz.js into quiz-state.js and quiz-render.js with no behaviour change. Done means `npm test` still exits 0 and the diff of the rendered HTML for the golden fixture is empty.
4. **CC-04 Interview to spec.** Interview me about the multiplayer mode, one question at a time, at most ten questions, then write SPEC.md with Goal, Players, Core loop, Screens, Data, Out of scope. Do not write code in this session.
5. **CC-05 Parallel migration.** Migrate every `var` to `const` or `let` across src/, one file per subagent, then run `npm run lint` and `npm test`. Done means both exit 0. Report files changed as a list.
6. **CC-06 Screenshot check.** Make the quiz layout work at 375px wide with no horizontal scroll. Done means: Playwright screenshot at 375x812 shows no overflow and `npm run e2e` exits 0.
7. **CC-07 Adversarial review, fresh session.** You are reviewing someone else's PR. Find gaps in the shuffle feature: missing tests, edge cases, accessibility. Output a numbered list with file and line. Do not fix anything.
8. **CC-08 Add a feature end to end.** Add a leaderboard stored in localStorage: top five scores with names. Follow the pattern of the settings storage in storage.js. Done means: new tests in test/leaderboard.test.mjs pass and `npm test` exits 0.
9. **CC-09 Dependency update.** Update all dev dependencies to their latest minor versions. Done means `npm install`, `npm run build` and `npm test` all exit 0. If any fails, revert that one package and tell me.
10. **CC-10 Write CLAUDE.md.** Write a CLAUDE.md for this repo under 25 lines: commands, where things live, three rules that would prevent real mistakes. Emphasise one thing with IMPORTANT, not five.
11. **CC-11 Performance.** The questions page takes 3 seconds to render 500 questions. Make it under 300ms. Done means a new benchmark script in scripts/bench.mjs prints under 300 and `npm test` exits 0.
12. **CC-12 Accessibility pass.** Make every control keyboard reachable with a visible focus ring. Done means `npm run a11y` (axe) reports 0 violations in both themes.
13. **CC-13 Commit discipline.** Commit the current changes in three logical commits with messages under 60 characters on the first line. Show me the log after.
14. **CC-14 Reproduce then fix.** A user says the timer keeps running after the quiz ends. Write a failing test first, show me it failing, then fix it, then show `npm test` exiting 0.
15. **CC-15 Docs from code.** Generate docs/API.md describing every exported function in src/ with a one-line purpose, parameters and an example. Done means every export in src/index.js appears in the file (check with a script).
