---
name: strategy-red-team
description: Adversarial review of strategy work. Runs pre-mortems, assumption ledgers, failure-mode analysis, competitive attack simulation and counterargument generation against a brief, an insight, a positioning, an architecture recommendation, a loyalty model or a pitch narrative. Use at the end of every strategic loop, not only before a pitch. Trigger on "red team", "attack this", "pre-mortem", "devil's advocate", "stress test this", "where does this break", "what would a competitor do", "poke holes", "am I wrong about this", or automatically after any strategic recommendation is drafted.
metadata:
  version: 1.0.0
---

# Strategy Red Team

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.


## Standing instruction

Run at the close of every loop, before the work is shown to anyone. A red team applied only before the final pitch is a rubber stamp with better vocabulary.

## Independence caveat, stated up front

In this chat environment there is no separate process to host the red team. The same reasoning that produced the strategy also attacks it, which means self-serving bias is present and cannot be fully engineered out. Two partial mitigations, both of which must be used:

1. **Argue from a named seat.** Adopt a specific hostile party with a real motive: the competitor's strategy director, the client's CFO, the client's most sceptical regional manager, the consumer who chose someone else. Not "a critic" in the abstract.
2. **Declare the strongest surviving objection.** Every red team pass must end by naming the one objection that was not satisfactorily answered. A pass that resolves every objection has failed and must be rerun.

Where a genuinely independent review is needed, escalate to a human reviewer ({{HUMAN_REVIEWER}}) or a separate session with the recommendation supplied but the reasoning withheld.

---

## The five passes

### Pass 1: Assumption ledger
List every load-bearing assumption in the work. For each:

| Assumption | Grade | If false, what breaks | Cost to test |
|---|---|---|---|

Grades: **Measured** (counted from real data, source cited), **Stated** (a named source asserts it), **Inferred** (reasoned, not evidenced).

Rule: no Inferred assumption may sit under a recommendation that costs the client money without being flagged in the deliverable itself. Not in an appendix. In the body.

Second rule: find at least one assumption that has silently upgraded from Inferred to Measured between loops. There is almost always one.

### Pass 2: Pre-mortem
Set the clock 18 months forward. The strategy has failed publicly and the client has fired the agency. Write the post-hoc explanation in the client's voice, not the agency's.

Then work backwards to the earliest visible signal of each failure, and state what would have to be monitored now to catch it.

Force at least one failure mode from each category:
- **Execution failure**: right strategy, the organisation could not do it
- **Insight failure**: the human truth was not true, or not true of the paying segment
- **Competitive failure**: someone copied it faster or fought harder than modelled
- **Context failure**: currency, regulation, supply, platform or political change
- **Internal failure**: the client's own politics killed it

### Pass 3: Competitive attack simulation
Take the seat of the two most credible competitors in turn. For each:
- What is the cheapest counter that neutralises our advantage
- What can they do that we cannot match, and how fast
- If they simply copied our positioning tomorrow, what would we still own
- What would they be relieved to see us do

That last question is the most useful one in the whole protocol. Ask it every time.

### Pass 4: Counterargument generation
For the central recommendation, build the strongest opposing case. Not a straw version. The version a smart, well-briefed opponent would actually make, with its own evidence.

Then answer it. If the answer relies on an assumption from Pass 1 graded Inferred, the recommendation is weaker than it reads and must be labelled provisional.

### Pass 5: The client-room test
Six questions the work must survive:
1. **So what.** If the client already believed this, what changed.
2. **Says who.** Point to the evidence for the central claim. Name the source.
3. **Why us.** Could a competitor put their logo on this deck and run it unchanged. If yes, it is category wallpaper.
4. **What does it cost.** Money, headcount, time, and what gets dropped to make room.
5. **How do we know it worked.** Name the metric, the baseline, and the read date. "Brand health" is not an answer.
6. **What if the money is halved.** What survives, in priority order.

---

## Severity classification

- **RED**: kills the recommendation. Stop and rework before showing anyone.
- **AMBER**: survivable but must be disclosed in the deliverable and mitigated.
- **GREEN**: noted, monitored, no action now.

An honest red team on genuinely new work produces at least one AMBER. A pass that is all GREEN means the work is either trivially safe or has not been attacked properly.

---

## Output contract

- Assumption ledger, graded, with the load-bearing ones marked.
- Pre-mortem narrative in the client's voice, with early warning signals.
- Two competitor attack scenarios, including what they would be relieved to see.
- The strongest counterargument and its answer.
- Client-room test results, six answers.
- Severity list: RED, AMBER, GREEN.
- **The strongest surviving objection**, stated plainly, in one sentence.

## Hard rules

- Never conclude that the work is sound without naming the surviving objection.
- Never soften a RED because the deadline is close. Say it is RED and say what the fast fix costs.
- Never attack the craft when the problem is the logic, and never attack the logic when the problem is that there is no evidence.
- Never let a red team pass end with a list of questions for the strategist. End with a judgement.

## Reference files

- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.
