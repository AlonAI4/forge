# Lovable (`lovable`)

Category: App builders. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every app builders model.** Three rules hold across every builder: plan first, one slice at a time, and always say what to leave alone. A prompt that describes a whole app produces an app-shaped demo, not a working slice.

**What it does.** Current, by Lovable. Full-stack apps built incrementally with a clear plan. Their own words: the most common mistake is prompting too early. Whole-app-in-one-prompt refactors working code you did not mention.
**Write it as.** Plan mode for ideas, Build mode for building, the preview toolbar for looks. Always include the leave-alone clause.
**Watch out.** Omit the leave-alone clause and it rewrites parts that already worked.

**Master prompt (LV-00)**

```
Plan mode: I want a quiz app with a question screen, a results screen and a leaderboard stored in Supabase. Propose the build order as four slices, each with what it adds and how I check it works. Do not build yet.

Build mode, slice 1: Build only the question screen: load questions from a local JSON, show one at a time with four answer buttons, track the score in state, and show a simple results card at the end. Leave everything else alone. Do not add auth, database or leaderboard.
```

1. **LV-01** Build mode: add a results screen showing score, total and a Play again button. Leave the question screen exactly as it is.
2. **LV-02** Build mode: connect Supabase and create a scores table (id, name, score, created_at). Add only the insert on quiz end. Leave the UI alone.
3. **LV-03** Build mode: a leaderboard page reading the top ten from the scores table. Leave the quiz and results screens untouched.
4. **LV-04** Plan mode: how should sign-in work if I only need a name, not a password? Propose two options and recommend one. Do not build.
5. **LV-05** Build mode: add a dark-mode toggle in the header, persisted. Change only the header and the theme provider. Leave every page as is.
6. **LV-06** Preview toolbar: make the answer buttons larger with more space between them and a rounded 12px corner. No prompt needed, use the toolbar.
7. **LV-07** Build mode: add a 30-second timer per question that auto-submits when it runs out. Touch only the question screen. Leave scoring and results alone.
8. **LV-08** Build mode: add a settings page with shuffle and timer toggles stored in localStorage. New page only, leave existing pages untouched.
9. **LV-09** Build mode: make the whole app work at 375px wide with no horizontal scroll. Change only CSS and layout wrappers, not logic.
10. **LV-10** Build mode: add an empty state to the leaderboard when there are no scores. Change only the leaderboard page.
11. **LV-11** Plan mode: I want to add multiplayer later. List what in the current data model would need to change and what would not. Do not build.
12. **LV-12** Build mode: add a share button on results that copies a link with the score in the query string. Only the results screen changes.
