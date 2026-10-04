---
description: Forge Map. A map of your chat or project: the main topics, how they connect, and what is still missing
argument-hint: "[paste text, or say 'this chat']"
allowed-tools: ["mcp__plugin_forge_forge__forge_map", "mcp__plugin_forge_forge__forge_chat_context"]
---

Make a Forge Map of: $ARGUMENTS

1. Use only what the person gives you: text they pasted, files they point to, or this conversation if they say "this chat" (that counts as turning "Read this chat" on, for this request only).
2. Call `forge_map` with that text. For "this chat", send the conversation itself as turns, one per line, each starting `User:` or `Assistant:` (shorten long turns, keep every decision, rule and open question in the speaker's own words). Never send a prose summary instead: Forge finds the goal, decisions, rules and open questions from the turns.
3. Show the map right here in the chat. In Claude Desktop and claude.ai, Forge draws it by itself: in the Code tab the map tool's result has an **Open** button that shows it in the side panel, so end with one short line: "Click **Open** on the Forge Map result to see the map." Nothing more. Elsewhere, show Forge's text answer as it is: the goal, what was decided, the rules, open questions, the latest ask and the main topics. Never put the map in a file, an artifact, a web page, a browser or a new tab.
4. Offer one next step: "Want a prompt that uses this context?" If yes, run /forge with the context.

Forge keeps nothing: the map exists only in this chat.
