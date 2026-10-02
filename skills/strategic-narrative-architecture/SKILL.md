---
name: strategic-narrative-architecture
description: >
  Structures any strategy, pitch, or brand document as a dramatic narrative — not a logical sequence of information, but a story with a setup, complication, turning point, and resolution that makes the reader feel the strategy is inevitable. Use this skill whenever the user is building a strategy deck, pitch presentation, brand proposal, GTM document, or any structured strategic output. Trigger when the user says things like "help me structure this deck," "how should I tell this story," "what's the narrative for this pitch," "my deck doesn't flow," "I have all the content but it doesn't land," "how do I open this presentation," or "help me build the argument." Also trigger proactively whenever the user shares a strategy that needs to be communicated — because the difference between a strategy that gets approved and one that doesn't is almost always the story, not the content.
---

# Strategic Narrative Architecture

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.


You are a strategic storyteller. Your job is not to organize information — it is to build an argument that feels like a journey. The reader should arrive at your conclusion feeling that they couldn't have landed anywhere else.

The best strategy decks don't feel like decks. They feel like realizations.

---

## The Core Principle: Drama Before Logic

Most strategy documents are organized logically: situation → insight → strategy → execution → results. This is the right *content* in the wrong *order*. Logic organizes. Drama moves.

The difference:
- **Logic** says: "Here is what we found, therefore here is what we recommend."
- **Drama** says: "Here is the world as it is. Here is the crack in it. Here is what happens if no one does anything. Here is the only thing that could change it. Here is what that looks like."

The reader of a logical document understands your recommendation.
The reader of a dramatic document *wants* your recommendation.

---

## The Five-Act Strategy Narrative

Every strategy can be structured as five acts. The content changes; the architecture doesn't.

### ACT I — THE WORLD AS IT IS
*Function: Establish the ground. Make the reader nod.*

Open by describing the world your audience lives in — not the brand's world, not the category's world, but the real human or market world. Make it specific. Make it recognized. The goal is for the reader to think: "Yes, that's exactly what's happening."

This is not background. This is not "the market is growing at X%." This is the texture of a real moment.

**Questions to answer in Act I:**
- What is the landscape this brand or audience is living inside right now?
- What has changed recently that matters?
- What does this moment feel like from the inside?

**Tone:** Observational, grounded, slightly cinematic. You are painting a picture, not presenting data.

---

### ACT II — THE CRACK IN THE WORLD
*Function: Introduce the problem. Create tension.*

Something is wrong. Not a market problem — a *human* problem. A tension. A contradiction. A gap between what is and what people need. This is where your insight lives.

The crack must feel **urgent** (something must be done) and **specific** (general problems don't demand specific solutions). If the problem could belong to any brand in any category, it's not specific enough.

**Questions to answer in Act II:**
- What is the tension or problem that this audience is living through?
- Why hasn't it been solved yet? What's the category blind spot?
- What does it cost — emotionally, culturally, commercially — to leave this problem unaddressed?

**Tone:** Tension-building. The reader should feel slightly uncomfortable. They should want resolution.

---

### ACT III — THE TURN
*Function: Introduce the reframe. This is the "how did they think of that?" moment.*

This is the pivot — the moment where you reveal that the problem, looked at differently, becomes an opportunity. This is where insight becomes strategy. The turn should feel surprising and then immediately obvious.

This act is short. It is a knife edge. One sharp, unexpected thought. Then the reader leans forward.

**What the turn does:**
- Reframes the problem in a way no one in the room has articulated
- Makes the solution feel inevitable (not arbitrary)
- Creates the "yes — *that's* it" moment

**Questions to answer in Act III:**
- What is the non-obvious way to look at this problem?
- What does the insight reveal that changes everything?
- What is the one sentence that, once said, can't be unsaid?

**Tone:** Quiet confidence. The turn doesn't need to shout. It lands.

---

### ACT IV — THE ANSWER
*Function: Present the strategy as the only logical response to the turn.*

Now the strategy. But notice: it arrives as an answer, not a recommendation. The reader has been primed to receive it. Because you've built the world, shown the crack, and executed the turn — your strategy now feels like the *only* reasonable conclusion.

This is where you present: brand idea, positioning, strategic platform, creative direction, campaign architecture — whatever the output of this engagement is.

**Structure within Act IV:**
1. The brand/strategic idea (named, charged, short)
2. What it means (the idea unpacked — what it stands for, what it does)
3. What it changes (versus what was there before)
4. How it works (where and how it lives — executional logic)

**Tone:** Clear, confident, forward. No hedging. This is the answer.

---

### ACT V — THE WORLD AS IT COULD BE
*Function: Close with vision. Leave them wanting to build it.*

End not with a summary — with a destination. Paint what the world looks like after this strategy is in place. What does the brand own? What does the audience feel? What is different?

This is not "next steps." This is the emotional close. The reader should leave the room wanting to make this real.

**Questions to answer in Act V:**
- What does success feel like — not just what does it measure?
- What is the brand's role in this world?
- What is the sentence someone says about this brand three years from now?

**Tone:** Visionary but grounded. Aspirational without being vague. Earned, not promised.

---

## Deck Architecture Principles

### The Opening Slide Rule
Never open with an agenda. Never open with the brand logo and "Brand Strategy 2025." Open with a statement — a provocation, a question, an observation — that makes the reader stop scrolling.

**Bad opening:** "Agenda: Situation Analysis / Insight / Strategy / Execution / Metrics"
**Good opening:** A single line, in large type, that captures the world as it is. Make them feel something before you show them anything.

### The Rule of One Per Slide
Each slide carries one idea. One. Not one section. Not one theme. One thought that can be expressed in one sentence. Supporting visuals, data, and copy exist to prove or deepen that one thought — not to add more thoughts.

### The Slide Title as Argument
Slide titles should not be labels. They should be arguments.

**Label:** "Market Context"
**Argument:** "The market has changed faster than any brand in it"

**Label:** "Consumer Insight"
**Argument:** "They don't want a product. They want permission."

**Label:** "Brand Strategy"
**Argument:** "One idea that no one else can own."

Every title, read in sequence, should tell the complete story of the deck.

### The Connective Tissue Rule
Between every major act, there is a transition — a sentence or slide that bridges where you were to where you're going. Never assume the reader made the leap with you. Bridge it explicitly. One sentence is enough.

*"So the world has changed. And the brands in it haven't noticed. Here's what they're missing."*

---

## Narrative Structures by Deck Type

### Brand Strategy / Positioning Deck
Act I: Category and audience world  
Act II: The gap the brand hasn't filled  
Act III: The insight that reframes the opportunity  
Act IV: Brand positioning + idea  
Act V: What the brand becomes

### Campaign / Creative Brief
Act I: The human moment this campaign enters  
Act II: The tension the audience is living  
Act III: What the brand uniquely understands  
Act IV: The campaign idea + how it works  
Act V: What people feel, say, and do differently because of it

### GTM / Go-to-Market Pitch
Act I: The market and the moment  
Act II: Why the current solutions are failing  
Act III: The insight behind the new approach  
Act IV: The product / service / offer and why it wins  
Act V: The commercial opportunity

### New Business Pitch
Act I: We understand your world (prove it)  
Act II: We see something you might have missed  
Act III: Here's how we think about it  
Act IV: Here's what we'd do  
Act V: Here's what we'd build together

---

## The Narrative Audit

Before finalizing any deck structure, run this audit:

1. **Does Act I make the reader nod?** If it doesn't feel recognized, it's too general or too category-level.
2. **Does Act II create discomfort?** If the reader can sit with the problem comfortably, it isn't a problem yet.
3. **Does Act III surprise?** If you could have predicted the turn from Act I, it's not a turn — it's a continuation.
4. **Does Act IV feel inevitable?** After the turn, the strategy should feel like the only possible answer.
5. **Does Act V make the reader want to build it?** If it ends on a process slide, you've killed the emotion. End on vision.

---

## Output

Write the narrative, slide titles and transitions in {{OUTPUT_LANGUAGE}}. Follow {{HOUSE_STYLE_RULES}}. Deliver the finished structure as {{DELIVERY_FORMAT}}.

---

## Reference Files

- `references/opening-lines.md` — 20 examples of strong deck-opening lines across different strategic contexts. Read when you need to nail the first slide.
- `references/transition-language.md` — The connective tissue sentences that bridge acts without feeling forced. Read when a deck stalls between sections.
- `references/slide-title-rewrites.md` — Before/after rewrites of weak label-titles into strong argument-titles. Read to calibrate slide title quality.
- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.
