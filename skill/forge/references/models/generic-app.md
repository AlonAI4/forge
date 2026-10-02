# Any other app builder (`generic-app`)

Category: App builders. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every app builders model.** Three rules hold across every builder: plan first, one slice at a time, and always say what to leave alone. A prompt that describes a whole app produces an app-shaped demo, not a working slice.

**What it does.** The wildcard. Scope the slice, name the data, protect what already works. Every builder in this category recommends the same thing.

**Master prompt (GA-00)**

```
Slice: the question screen only.
Data: questions (text, four options, correct index), score (number).
Build: load questions from a local JSON, show one at a time with four buttons, track the score, show a simple results card at the end.
Leave alone: everything else. No auth, no database, no leaderboard in this slice.
Check: I can play through five questions and see the right score.
```

1. **GA-01** Slice: results screen. Data: score, total. Build: show both and a Play again button. Leave alone: the question screen. Check: Play again restarts at question one.
2. **GA-02** Slice: leaderboard. Data: scores (name, score, date). Build: top ten table. Leave alone: quiz and results. Check: a new high score appears at the top.
3. **GA-03** Slice: settings. Data: shuffle, timer (booleans). Build: two toggles persisted locally. Leave alone: all other screens. Check: reload keeps the toggles.
4. **GA-04** Slice: header dark-mode toggle. Data: theme. Build: toggle and persistence. Leave alone: page content. Check: reload keeps the theme.
5. **GA-05** Slice: timer. Data: seconds left. Build: 30-second bar that auto-submits. Leave alone: scoring. Check: letting it run out moves to the next question.
6. **GA-06** Slice: task list. Data: tasks (title, done, due). Build: list sorted by due, tick to complete. Leave alone: nothing exists yet. Check: ticking hides the task.
7. **GA-07** Slice: sale entry. Data: products (name, price), sales (product, qty, time). Build: a form to record a sale. Leave alone: nothing yet. Check: daily total updates.
8. **GA-08** Slice: mobile layout. Data: none. Build: 375px with no horizontal scroll. Leave alone: logic. Check: no overflow on a real phone.
9. **GA-09** Slice: share button. Data: score. Build: copies a link with the score. Leave alone: everything else. Check: the link opens the results with the score.
10. **GA-10** Slice: empty state. Data: scores. Build: a message and a button when there are none. Leave alone: the table. Check: it shows only when the list is empty.
