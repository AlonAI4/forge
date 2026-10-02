---
description: Forge Map. A map of your chat or project: the main topics, how they connect, and what is still missing
argument-hint: "[paste text, or say 'this chat']"
allowed-tools: ["mcp__plugin_forge_forge__forge_map", "mcp__plugin_forge_forge__forge_chat_context"]
---

Make a Forge Map of: $ARGUMENTS

1. Use only what the person gives you: text they pasted, files they point to, or this conversation if they say "this chat" (that counts as turning "Read this chat" on, for this request only).
2. Call `forge_map` with that text.
3. Show the map: the main topics first (most connected), then each group with its members, then "Still missing" and Forge's questions. A small Mermaid diagram (graph LR) of the topics and their groups is welcome if it stays under 20 nodes.
4. Offer one next step: "Want a prompt that uses this context?" If yes, run /forge with the context.

Forge keeps nothing: the map exists only in this chat.
