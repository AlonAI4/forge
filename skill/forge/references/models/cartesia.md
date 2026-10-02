# Cartesia Sonic (`cartesia`)

Category: Voice & speech. From Forge's prompt library. The 9-part master prompt behind every model is in `../master-prompt.md`.

**What it does.** 3.6 by Cartesia. Sub-90ms first audio, top of both Artificial Analysis speech boards, built for realtime agents, telephony, code-switching, and alphanumerics like order and phone numbers. Beta API, no open weights, smaller voice library than ElevenLabs.
**Write it as.** The script plus API parameters. Emotion, speed and volume are parameters here rather than prompt text, which makes them deterministic. Custom pronunciation dictionaries with IPA overrides fix brand names.
**Watch out.** Sonic-2, Sonic-turbo and older snapshots sunset after 20 October 2026. Pin to 3.6.

**Master prompt (CS-00)**

```
Model: sonic-3.6. Voice: a calm, friendly female support agent, en-GB.
Parameters: emotion neutral-positive, speed 1.0, volume 1.0.
Pronunciation dictionary: "Forge" /fɔːdʒ/, "Shayo" /ˈʃaɪ.oʊ/.
Script: Hi, thanks for calling. I can see your order, number F, 4, 7, 2, 9, was dispatched this morning and should arrive by Thursday. Would you like me to text the tracking link to the number ending 0, 3, 1, 5?
```

1. **CS-01 Order confirmation.** sonic-3.6, en-US, warm male. emotion positive, speed 1.0. Script: Your order 8, 8, 2, 4, 1 is confirmed. Total, forty two dollars and ten cents. Delivery, Tuesday the third.
2. **CS-02 Phone number read-back.** sonic-3.6, en-GB, neutral female. speed 0.9. Script: Let me read that back. Zero, seven, seven, zero, nine, — one, two, three, — four, five, six. Is that right?
3. **CS-03 Code-switching.** sonic-3.6, es-MX with English terms, female. emotion neutral. Script: Perfecto. Ya activé tu plan Premium. Puedes ver tus beneficios en la app, en la sección Rewards.
4. **CS-04 Urgent alert.** sonic-3.6, en-US, male. emotion serious, speed 1.1, volume 1.2. Script: Attention. The server in region E U West is reporting a failure. Two services are affected. Acknowledge to silence this alert.
5. **CS-05 Game voice agent.** sonic-3.6, en-US, playful female. emotion excited, speed 1.05. Script: Nice shot! That's three in a row. Want me to bump the difficulty, or keep it here for one more round?
6. **CS-06 Realtime tutor.** sonic-3.6, en-GB, patient male. emotion calm, speed 0.95. Script: Almost. You've got the loop right, but the counter starts at one, not zero. Try changing that first line and run it again.
7. **CS-07 Brand name fix.** sonic-3.6, en-US, female. Dictionary: "Joya" /ˈhɔɪ.ə/. Script: Welcome to Joya Lemonade. Today's flavours are classic, mint, and blood orange.
8. **CS-08 Appointment reminder.** sonic-3.6, en-AU, friendly female. speed 1.0. Script: Hi, this is a reminder of your appointment on Wednesday at 3:15 p.m. Reply Y to confirm or N to reschedule.
9. **CS-09 Hebrew agent.** sonic-3.6, he-IL, male. emotion neutral. Script: שלום, הזמנה מספר ארבע, שתיים, שבע, אחת, יצאה למשלוח הבוקר. היא צפויה להגיע מחר בין עשר לשתיים.
10. **CS-10 Whispered hint.** sonic-3.6, en-US, female. emotion calm, volume 0.7, speed 0.9. Script: Psst. The key is under the third plant pot. Don't tell the gnome.
