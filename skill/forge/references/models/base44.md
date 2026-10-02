# Base44 (`base44`)

Category: App builders. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every app builders model.** Three rules hold across every builder: plan first, one slice at a time, and always say what to leave alone. A prompt that describes a whole app produces an app-shaped demo, not a working slice.

**What it does.** Current, by Wix. Managed backend, auth and hosting come with it. Internal tools and small products where having data, auth and hosting handled is worth more than framework control. No published model identity or context limits, so no model-specific tuning is possible.
**Write it as.** Entities and their relationships first, then screens, then logic. The data model is what everything else hangs off.
**Watch out.** Treat prompt advice here as generic app-builder advice: Base44 publish no formal prompting guidance.

**Master prompt (B4-00)**

```
Entities first. Quiz has id, title, created_by. Question belongs to Quiz, has text, options (list of 4), correct_index. Attempt belongs to Quiz and to a User, has score, finished_at.
Screens, in this order: 1. Quiz list. 2. Play a quiz, one question at a time. 3. Results with score. 4. Leaderboard per quiz.
Logic: when an attempt finishes, save score and finished_at; leaderboard shows top ten attempts by score.
Use built-in auth so a User is whoever is signed in. Build screen 1 and 2 only for now.
```

1. **B4-01** Entities: Task has title, done, due, belongs to User. Screens: task list, add task. Logic: sort by due. Build the list only.
2. **B4-02** Add to the quiz app: the Results screen (screen 3). Do not change Quiz, Question or the play screen.
3. **B4-03** Add the Leaderboard screen: top ten Attempts by score for one Quiz, showing user name and score. Nothing else changes.
4. **B4-04** Entities: Lemonade stand: Product (name, price), Sale (product, qty, sold_at). Screens: record a sale, daily totals. Build both.
5. **B4-05** Add a Category entity to the quiz app: Quiz belongs to Category. Add a filter on the quiz list. Leave play and results alone.
6. **B4-06** Logic only: prevent a User from having more than one Attempt per Quiz per day. No screen changes.
7. **B4-07** Entities: Team (name), Player (name, team, position), Match (home, away, date, score). Screens: fixtures list, match detail. Build fixtures first.
8. **B4-08** Add an admin screen to create Quizzes and Questions, visible only to users with an admin flag. Leave player screens untouched.
9. **B4-09** Entities: Book (title, author, status), Note (book, text, page). Screens: shelf, book detail with notes. Build the shelf.
10. **B4-10** Add an email integration: when an Attempt finishes with a top-ten score, send the user a message. Logic only.
