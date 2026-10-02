# sonnet-delegate: user config (example)

Copy this file to `user-config.md` in the same folder, or let the skill fill it on first run.
`user-config.md` is git-ignored: your details never get committed.

| Placeholder | What it means | Example (not real) |
|---|---|---|
| `{{OWNER_NAME}}` | The person who makes the judgement calls and receives flags, handovers and recommendations. | Sam Taylor |
| `{{DELEGATE_MODEL}}` | The cheaper model that does no-judgement work. Use the exact value the Agent tool's `model` field takes. | haiku |
| `{{MAIN_MODEL}}` | The session's own model, which keeps every judgement call. | opus |
| `{{HOUSE_STYLE_RULES}}` | Writing rules every prompt and report must follow. | Plain words, short sentences, no jargon |

## My values

OWNER_NAME: {{OWNER_NAME}}
DELEGATE_MODEL: {{DELEGATE_MODEL}}
MAIN_MODEL: {{MAIN_MODEL}}
HOUSE_STYLE_RULES: {{HOUSE_STYLE_RULES}}
