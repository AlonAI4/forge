# GitHub Copilot (`copilot`)

Category: Coding agents. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every coding agents model.** Every coding agent needs the same four things: what exactly to build or change, what the project is built with, a pattern to follow, and a check that can be run by a command. A success criterion that cannot be checked by a command is not a success criterion.

**What it does.** Current, by GitHub. Repo-wide conventions, path-scoped rules in large monorepos, broad model choice. GitHub state plainly that long instruction files break on large diverse repositories.
**Write it as.** Short, self-contained, broadly applicable instructions. Path-scoped .instructions.md files with applyTo frontmatter are the escape valve. Do not write instructions that require external lookups, mandate tone, or set word limits.
**Watch out.** Agent-file support varies by feature: do not assume AGENTS.md is read everywhere.

**Master prompt (CP-00)**

```
.github/copilot-instructions.md:
This is a vanilla JavaScript quiz app with no framework. Tests use node:test in test/ and run with `npm test`. State lives in src/quiz-state.js, rendering in src/quiz-render.js, storage in src/storage.js. New features get a test next to the existing ones. Use `const` and `let`, never `var`. Do not add dependencies.

Chat: Add a shuffle-questions toggle following the timer toggle pattern in src/quiz-state.js, persisted with src/storage.js, with a test in test/shuffle.test.mjs.
```

1. **CP-01** Explain the flow from questions.json to the screen in this repo, naming files and functions.
2. **CP-02** Fix the NaN score at the end of the quiz in src/score.js and add a regression test.
3. **CP-03** Write .github/instructions/tests.instructions.md with applyTo "test/**": use node:test, no DOM mocks, name tests after the behaviour.
4. **CP-04** Generate JSDoc for every exported function in src/index.js.
5. **CP-05** Add a leaderboard using the same storage pattern as settings in src/storage.js, with tests.
6. **CP-06** Make the timer stop when the quiz ends. Write the failing test first.
7. **CP-07** Convert every `var` in src/ to `const` or `let` and run the tests.
8. **CP-08** Review this pull request for bugs only and comment with line numbers.
9. **CP-09** Write a path-scoped instruction for src/render/**: rendering functions are pure, they take state and return a string, no side effects.
10. **CP-10** Add a GitHub Actions workflow that runs `npm test` on every push to main.
