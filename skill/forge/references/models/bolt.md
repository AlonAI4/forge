# Bolt (`bolt`)

Category: App builders. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**For every app builders model.** Three rules hold across every builder: plan first, one slice at a time, and always say what to leave alone. A prompt that describes a whole app produces an app-shaped demo, not a working slice.

**What it does.** Current, by StackBlitz. Bills by token, so Plan Mode and file locking are cost controls rather than conveniences. Fast first drafts where you compare several opening prompts before committing. Vague aesthetic direction fails: it wants design vocabulary, not "make it nicer".
**Write it as.** Real design words: font weight, line height, padding, margin, radius, contrast. Get three first drafts of the opening prompt and compare: the opening prompt disproportionately determines the architecture.
**Watch out.** Plan Mode agrees the plan before building. Lock files you do not want touched.

**Master prompt (BT-00)**

```
Plan Mode first. A quiz app in vanilla HTML, CSS and JS, no framework. Screens: question, results. Design: Inter font, 16px base, 1.5 line height, 24px section padding, 12px radius on buttons, 4.5:1 contrast minimum, one accent colour #FF6A1F on a near-white background. Mobile first, 375px up. Agree the plan, then build only the question screen. Lock index.html once it works.
```

1. **BT-01 Draft A.** A quiz app, vanilla JS, question and results screens, Inter 16px, 12px radius, accent #FF6A1F. Plan first.
2. **BT-02 Draft B.** A quiz app as three files (index.html, style.css, app.js), state in one object, render function, question and results, Inter, 12px radius, accent #FF6A1F. Plan first.
3. **BT-03 Draft C.** A quiz app with a tiny state machine (idle, asking, done), vanilla JS, same design tokens as above. Plan first. Compare with A and B before building.
4. **BT-04** Add a results screen: score in 48px semibold, total in 16px regular grey, a 44px tall Play again button with 12px radius. Lock app.js scoring functions.
5. **BT-05** Increase answer button padding to 16px vertical and 20px horizontal, add 12px gap between buttons, keep the 12px radius. Only style.css changes.
6. **BT-06** Add a header with the app name at 20px semibold, 56px tall, 1px bottom border at 10% black. Lock everything else.
7. **BT-07** Add a leaderboard screen: a table with 14px rows, 12px vertical padding, zebra stripes at 3% black, top five from localStorage. Plan first.
8. **BT-08** Dark theme: background #111, text #EEE, accent unchanged, contrast 4.5:1 minimum, toggle in the header persisted in localStorage. Only style.css and the header change.
9. **BT-09** Add a 30-second timer bar under the question, 4px tall, accent colour, shrinking linearly. Lock the results screen.
10. **BT-10** Make every focusable element show a 2px accent outline with 2px offset on keyboard focus only. Only style.css.
