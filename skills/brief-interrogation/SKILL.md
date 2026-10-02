---
name: brief-interrogation
description: >
  Pressure-tests any brief, client request, or strategic task before a single strategy word is written — surfacing the real problem beneath the stated one, identifying missing context, challenging assumptions, and reframing the question so the work starts from the right place. Trigger when the user shares a brief, a client request, a campaign task, or a problem statement and is about to begin strategy or creative work. Also trigger when the user says "help me respond to this brief," "where do I start with this," "I'm not sure what they're really asking," "something feels off about this brief," or "help me think through this before I start." The single most valuable skill to run before cultural-insight-mining, insight-to-idea-leap, or strategic-narrative-architecture — because a great answer to the wrong question is the most common and most expensive mistake in strategy.
---

# Brief Interrogation

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.


Every brief lies. Not intentionally — but every brief presents the symptom as the problem, the client's assumption as the objective, and the stated audience as the real one. Your job, before doing any strategy work, is to find what the brief is actually asking underneath what it says it's asking.

The interrogation is not about being difficult. It is about being rigorous. A strategy built on the wrong question is worse than no strategy — it is expensive, confident misdirection.

---

## The Five Brief Lies

These are the five most common ways briefs mislead the people responding to them:

### Lie 1 — The Symptom Presented as the Problem
The brief says: *"We need more awareness."*
The real problem might be: poor distribution, pricing misalignment, a product that hasn't earned its positioning, or a loyal but shrinking audience that no new audience is replacing.

Awareness campaigns built on top of unfixed product or distribution problems don't solve awareness — they accelerate disappointment.

**Interrogation question:** *If we got them the awareness they're asking for, what would happen next? Would it convert? If not, what's actually broken?*

### Lie 2 — The Client's Assumption Built Into the Objective
The brief says: *"We need to reach younger audiences."*
The assumption baked in: that younger audiences are the right audience, that the brand can credibly reach them, and that reaching them is the highest-value move available.

Sometimes younger audiences are exactly right. Sometimes the brief is a response to a boardroom conversation about the future that hasn't been tested against the brand's actual commercial reality.

**Interrogation question:** *Why younger audiences specifically? What does the data say about where growth actually comes from for this brand right now?*

### Lie 3 — The Solution Disguised as a Brief
The brief says: *"Create a social media campaign targeting Gen Z on TikTok and Instagram."*
The problem: the client has already decided the solution. The brief describes an execution, not a problem. Responding to it at face value produces competent execution of a potentially wrong idea.

**Interrogation question:** *What is the business or brand problem this campaign is meant to solve? If we solve that problem brilliantly but through a different channel or mechanic, would that be acceptable?*

### Lie 4 — The Wrong Audience Named
The brief names: *"Saudi women, 25-35, interested in wellness."*
What it might actually mean: the client's marketing team thinks this is the audience. The product's actual buyers might be older, or younger, or motivated by something different from wellness. The named audience is often aspirational — who the client wants — rather than descriptive — who actually buys.

**Interrogation question:** *Who actually buys this today? Who advocates for it? Who would be hardest to replace if they stopped?*

### Lie 5 — The Missing Real Constraint
The brief presents: an objective, an audience, a timeline, a budget.
What it omits: the internal politics driving the request, the previous campaign that failed and can't be referenced, the competitor move that triggered the brief, the board directive that created the urgency.

The missing context is almost always more important than the stated context.

**Interrogation question:** *What happened that made this brief exist right now? What would we need to know to understand the full situation?*

---

## The Interrogation Protocol — Eight Questions

Run every brief through these eight questions before beginning any strategy work. Not all eight will yield something useful for every brief — but all eight should be asked.

---

**Q1: What is the real business problem?**
Strip away the communications request. What is the underlying commercial, brand, or organizational challenge that this brief is a response to? What would "solved" look like in business terms — not campaign terms?

*Ask:* "If this campaign works perfectly, what changes in the business?"

---

**Q2: What has already been tried?**
No brief exists in a vacuum. Something came before this — a previous campaign, a strategy that didn't perform, a product that underdelivered. Understanding what failed (and why) is as important as understanding what's being asked for now.

*Ask:* "What have they already done? What worked, what didn't, and what can't be touched?"

---

**Q3: Who is the audience — really?**
Name the audience more specifically than the brief does. Not a demographic — a psychological state, a specific moment, a particular tension they're living through right now. If you can't name it, the brief hasn't been interrogated enough.

*Ask:* "Who specifically is this for? What are they feeling right now? What do they believe about this category that may or may not be true?"

---

**Q4: What does the audience currently believe — and what needs to change?**
Every strategy is trying to move someone from one mental state to another. What does the target audience currently think, feel, or believe about this brand or category? And what would they need to think, feel, or believe for the objective to be achieved?

*Ask:* "What belief or behavior needs to shift? From what, to what?"

---

**Q5: What is the one thing this communication must do?**
Most briefs ask for too many things simultaneously — awareness AND consideration AND purchase intent AND brand love. Strategy that tries to do everything does nothing well. Force a single priority.

*Ask:* "If this work could only do one thing, what would it be? What is the single most valuable shift we could create?"

---

**Q6: What is the brand permission for this?**
Every brand has a territory it can credibly own and territory it cannot. The most strategically exciting idea is useless if the brand doesn't have the credibility to execute it. What does this brand have the right to say — and what would sound wrong coming from it?

*Ask:* "Why is this brand specifically the one to say this? What would make this feel authentic from them? What would make it feel like borrowing?"

---

**Q7: What is the category doing — and where is the gap?**
What are the competitors saying? What are the category conventions that everyone is following? The gap — what no one is saying or doing — is often where the most available strategic territory sits.

*Ask:* "What does every brand in this category sound like? What would a brand have to do to sound completely different — and would that be better or worse?"

---

**Q8: What would make this work feel wrong?**
Think about the failure modes before you start. What assumptions, if wrong, would invalidate the entire strategy? What cultural, market, or timing factors could make the most elegant idea land badly?

*Ask:* "What are we assuming that we haven't tested? If that assumption is wrong, what breaks?"

---

## The Reframed Brief

After running the interrogation, produce a **Reframed Brief** — a sharper version of the original that reflects what the work is actually trying to do.

Structure:

```
ORIGINAL REQUEST:
[What the brief said, verbatim or summarized]

THE REAL PROBLEM:
[What the brief is actually trying to solve — stripped of the communications request]

THE REAL AUDIENCE:
[More specific than the brief named — psychological state, moment, tension]

THE BELIEF TO SHIFT:
[From: what they currently think/feel]
[To: what they need to think/feel]

THE ONE THING:
[The single most valuable shift this work can create]

THE BRAND'S RIGHT TO SAY IT:
[Why this brand specifically can own this territory]

THE OPEN QUESTIONS:
[What we still don't know that could change the strategy]

THE REFRAMED BRIEF IN ONE SENTENCE:
[The sharpest possible version of what this work is for]
```

Write the reframed brief in {{OUTPUT_LANGUAGE}}, follow {{HOUSE_STYLE_RULES}}, and deliver it as {{DELIVERY_FORMAT}}.

The one-sentence reframed brief is the most important output. If you can't write it in one sentence, the interrogation isn't finished.

---

## When to Push Back vs. When to Proceed

Not every brief needs to be reframed. Some briefs are genuinely clear — the problem is real, the audience is right, the objective is achievable. The interrogation will confirm this. When it does, proceed with confidence.

Push back (and surface the interrogation to the client, through {{CLIENT_FACING_OWNER}}) when:
- The objective is unmeasurable or internally contradictory
- The named audience doesn't match the actual buyers
- The solution is embedded in the brief in a way that forecloses better options
- A critical piece of context is missing that would change the entire strategy
- The brief is a response to a problem that the communications work cannot actually solve

Proceed (internally informed) when:
- The interrogation confirms the brief is sound
- The real problem aligns with the stated problem
- The audience is genuinely who the brief says they are
- The one thing is clear and achievable

---

## Reference Files

- `references/brief-failure-cases.md` — Six real-pattern brief failure cases showing the stated problem, the real problem, and what the strategy should have addressed. Read to calibrate when a brief is misleading and in which direction.
- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.
- `references/reframe-examples.md` — Five worked examples of original brief → interrogation → reframed brief, across different categories and client types. Read to see the full protocol in action.
