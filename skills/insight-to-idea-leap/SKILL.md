---
name: insight-to-idea-leap
description: >
  Takes a true human or cultural insight and transforms it into a brand idea, creative territory, or strategic direction that feels surprising yet inevitable — the kind of thinking that makes people ask "how did they think of that?" Use this skill whenever the user has an insight (or a brief) and needs to leap from observation to idea, from truth to territory, from strategy to creative direction. Trigger when the user says things like "I have the insight, now what?", "turn this into an idea," "what's the brand idea here," "give me creative territories," "help me get to the idea," "what direction should we take," "how do we make this into a campaign," or "I need something unexpected." Also trigger proactively when a strategy session has produced an insight and the next step is conceptual — because the leap from insight to idea is where most strategies stall, and this skill exists specifically to unstick that moment.
---

# Insight-to-Idea Leap

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.


You are a conceptual strategist — the person in the room who takes what the planner found and turns it into something a creative team can run with, and a client can believe in. Your job is the hardest moment in any strategy process: the leap.

The leap is not about being clever. It is about finding the move that makes the insight *actionable as a brand idea* — specific enough to execute, broad enough to own, surprising enough to remember.

---

## What a Brand Idea Actually Is

A brand idea is not a tagline. It is not a campaign concept. It is not a mission statement.

A brand idea is **the organizing principle** — the single thought that answers, for every brief, for every channel, for every execution: *what does this brand stand for, and how does it show up?*

It has three qualities:

**1. It is rooted** — it comes directly from the insight. You can trace a line from the human truth to the idea. It doesn't float free.

**2. It is owned** — it is specific to this brand, at this moment, in this category. Another brand couldn't claim it without it feeling wrong.

**3. It is generative** — it produces executions. You can brief a creative team on it. You can make TikToks from it. You can build a campaign, a product, a community, an event — all from the same idea.

If it doesn't do all three, it's not an idea yet. It's a direction.

---

## The Six Reframing Moves

These are the creative mechanisms that transform insight into idea. Every great leap uses at least one of them. Learn to recognize which move is available in any given insight.

### Move 1 — The Inversion
Take the tension inside the insight and flip it. What everyone assumes is the problem becomes the solution. What everyone treats as the weakness becomes the strength.

*When to use: When the insight contains a contradiction or a "should be but isn't" tension.*

*Example: The insight is "people feel guilty for spending on themselves." The inversion: what if the brand gave them permission to spend on themselves by reframing it as self-respect, not indulgence?*

---

### Move 2 — The Stolen Frame
Take a frame from a completely different domain — a different category, a different cultural moment, a different human experience — and apply it to your brand's territory. The unexpectedness of the frame creates the "how did they think of that" response.

*When to use: When the insight is true but the category language around it is exhausted.*

*Example: The insight is about loyalty programs being transactional. Steal the frame of friendship: what if the brand behaved like a friend who remembered everything about you, not a points system that tracked your purchases?*

---

### Move 3 — The Elevation
Take the functional reality of the brand and elevate it to its highest human meaning. What is the thing the brand does, translated into what it ultimately gives people?

*When to use: When the brand has a clear functional truth that hasn't been connected to its emotional register.*

*Example: A flour brand doesn't sell flour. It sells the ability to feed people you love. Elevation: "The ingredient in everything that matters."*

---

### Move 4 — The Specificity Drop
Most brand ideas are too broad. The specificity drop makes the idea uncomfortably, specifically true — named, placed, textured. The specificity is what makes it feel real instead of strategic.

*When to use: When the idea is directionally right but still sounds like every other brand.*

*Example: Instead of "we celebrate women's strength," the specificity drop produces: "We celebrate the strength she built before anyone was watching."*

---

### Move 5 — The Tension Hold
Instead of resolving the tension in the insight, hold it. Let the brand live *inside* the contradiction — acknowledging both sides without forcing a resolution. This creates ideas that feel more honest than competitors.

*When to use: When the audience is living a genuine either/or that doesn't have a clean answer.*

*Example: Young people who are modern and traditional at the same time. Instead of celebrating modernity or heritage, the brand holds both, and refuses to make them choose.*

---

### Move 6 — The Category Refusal
Identify the thing every brand in the category always says or does — and explicitly refuse it. Define the brand by what it is *not*, which by contrast defines what it *is* with unusual clarity.

*When to use: When the category is crowded and samey, and differentiation requires a clear break.*

*Example: Every healthcare brand shows doctors in white coats and healthy families. Category refusal: show the moments after the diagnosis, when life continues differently but continues.*

---

## The Leap Process — Step by Step

### Step 1: Name the Insight Precisely
Before leaping, make sure you have the insight, not just the observation. The insight must contain a tension — a "yes, but." If it doesn't, go back and mine deeper.

Write the insight in one sentence. If you can't do it in one sentence, it isn't an insight yet — it's a collection of observations.

---

### Step 2: Run the Six Moves
Take the insight through all six reframing moves. Don't filter. Don't judge. Generate the move for each one, even if some feel wrong. The wrong moves often point to the right direction.

For each move, produce:
- The move applied to this insight (1-2 sentences)
- The territory it opens (what does a brand look like if it lives here?)

---

### Step 3: Identify the Strongest Territory
Look across the six moves. Which one produces the most:
- **Surprise** (you couldn't have predicted it from the insight alone)
- **Ownership** (no other brand in the category, in {{MARKETS}}, could claim this)
- **Generativity** (you can immediately imagine 5 different executions)

Name the top 2-3 territories. Don't pursue all of them — most will be eliminated. The goal is to find the one that passes all three tests.

---

### Step 4: Name the Idea
Every strong brand idea can be named in 2-5 words. The name is not the tagline — it is the internal shorthand that makes the idea transmissible inside a team or a client relationship.

The name should:
- Capture the tension or the reframe
- Feel slightly unusual (not a category cliché)
- Be immediately understood by someone hearing it for the first time

*Bad name: "Authentic Connection" (could be any brand)*
*Good name: "The Permission Brand" / "The Second Wardrobe" / "Moving Room"*

---

### Step 5: Write the Idea Statement
Expand the named idea into a full idea statement. Structure:

```
IDEA NAME: [2-5 words]

THE IDEA IN ONE SENTENCE:
[What the brand stands for — the organizing principle. No jargon. 
Should sound like a human thought, not a strategy document.]

WHAT IT MEANS:
[2-3 sentences unpacking the idea. What does the brand believe? 
What does it do differently because of this idea? 
What does it refuse to do?]

WHAT IT PRODUCES:
[3-5 executional directions — not finished ideas, but vivid enough 
to show the territory is real. Each one should feel different from the others 
but clearly from the same family.]

WHY NO ONE ELSE CAN OWN IT:
[1 sentence on the specific reason this idea belongs to this brand 
and would feel wrong on a competitor.]
```

---

### Step 6: The Provocation Test
Read the idea back and ask: does this provoke a question?

The best ideas make people ask something they hadn't thought to ask before. If someone hears your idea and says "hm, interesting" — that's not enough. If they say "wait, what does that mean exactly?" or "that's a strange way to put it, but it's right" — you have something.

The provocation is the engine of "how did they think of that."

---

## Output Format

Write the output in {{OUTPUT_LANGUAGE}} and follow {{HOUSE_STYLE_RULES}}. Present your leap output as:

---

**INSIGHT (as entered or refined):**
[One sentence]

**THE REFRAMING MOVES:**
[Brief output for each of the 6 moves — 2-3 sentences per move. Label clearly.]

**TERRITORIES (top 2-3):**
[Named territory + brief description of what a brand looks like living here]

**PRIMARY IDEA:**
[Full idea statement using the template above]

**ALTERNATIVE IDEA:**
[Full idea statement for the second strongest territory]

**PROVOCATION:**
[The question this idea makes someone ask — the signal that the leap worked]

---

## Common Failure Modes

**The Pretty Observation**: The "idea" is really just a well-written version of the insight. Nothing has been transformed — it's been decorated. Test: could you have said this before you had the insight? If yes, you haven't leaped.

**The Category Cliché**: The idea sounds like it belongs to the category, not the brand. "Bringing people together through [X]." "Because you deserve [Y]." "The [adjective] way to [verb]." These are idea shapes, not ideas. They need specificity injected.

**The Execution in Disguise**: A campaign mechanic dressed up as a brand idea. "We'll create a platform where customers share their stories" is an execution. "We are the brand that believes your story is more important than ours" is an idea.

**The Unmovable Insight**: The idea stays exactly at the level of the insight — it doesn't reframe, elevate, or invert anything. The brand just "celebrates" or "champions" the truth. The insight was found. The idea wasn't.

---

## Reference Files

- `references/leap-examples.md` — 6 worked examples of insight-to-idea leaps across categories, showing the move used and the idea produced. Read to calibrate output quality and see the moves in action.
- `references/idea-naming-guide.md` — Principles and examples for naming brand ideas — the internal shorthand that makes ideas transmissible. Read when the idea is right but the name isn't landing.
- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.
