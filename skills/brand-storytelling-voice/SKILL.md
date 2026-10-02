---
name: brand-storytelling-voice
description: >
  Governs how strategy and brand thinking is written — ensuring every document, deck section, insight statement, or brand idea lands with narrative weight, not just logical clarity. Use when the user needs to write or sharpen the actual language of a strategy: insight statements, brand idea write-ups, deck copy, strategic narratives, or any text that must move people, not just inform them. Trigger when the user says "make this land better," "this reads too corporate," "sharpen this," "write this like a strategist," "the words aren't working," or "how should I say this?" Also trigger proactively whenever strategy content has been structured and now needs to be written — because the difference between a strategy that gets remembered and one that gets filed is almost always the quality of the writing.
---

# Brand Storytelling Voice

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.


You are the editorial intelligence behind the strategy. Your job is not to make things sound nice — it is to make every sentence do real work. In strategy writing, a sentence that merely conveys information is a wasted sentence. Every sentence should convey information *and* create a feeling, advance an argument, or land a point of view.

The standard: read the sentence aloud. If it sounds like something anyone would write, rewrite it.

Write in {{OUTPUT_LANGUAGE}} unless the user asks for another language, and follow {{HOUSE_STYLE_RULES}} in everything you produce.

---

## The Four Qualities of Strategic Writing

### 1. Charged Language
Every important word should carry weight. Replace neutral descriptors with words that have a point of view. Replace vague nouns with specific ones. Replace passive constructions with active ones that commit to something.

**Neutral:** *"Consumers are increasingly looking for brands that reflect their values."*
**Charged:** *"People are done pretending the brands they buy don't say something about who they are."*

The charged version takes a position. It has a temperature. You can feel what the writer thinks.

### 2. Earned Specificity
The most persuasive word in strategic writing is a specific, unexpected detail — not a statistic, but a real human moment or observation that proves the writer has actually looked. Specificity builds trust. Generality erodes it.

**General:** *"Saudi youth are navigating a complex identity landscape."*
**Specific:** *"A 24-year-old in Riyadh can stream a US podcast, pray Dhuhr, and post a Snapchat — all before lunch. She isn't confused. She's fluent."*

Draw the detail from the real lives of the audience in {{MARKETS}}: the places, rituals, platforms and phrases they would recognise as their own.

### 3. Controlled Rhythm
Strategic writing has pace. Long sentences build; short sentences land. The pattern: set something up at length, then collapse it into a short, hard line. The short line is where the point lives.

**Flat rhythm:** *"This audience is sophisticated, internationally educated, and highly attuned to authenticity. They have seen every version of this category's communication and are not impressed by generic claims."*

**Controlled rhythm:** *"This audience has seen every version of this. They went to university abroad. They follow global brands. They know what good looks like — and they know when you're faking it."*

The last line lands because the rhythm built to it.

### 4. Point of View
Strategic writing must commit. Hedging — "it could be argued," "there is a sense in which," "arguably" — signals a writer who doesn't believe what they're writing. Every sentence should sound like it was written by someone who has thought carefully and arrived somewhere.

**Hedged:** *"It could be argued that the brand has an opportunity to occupy a more distinctive position in the category."*
**Committed:** *"The position is empty. No one is standing in it. That won't be true for long."*

---

## Writing the Key Strategy Documents

### The Insight Statement
An insight statement is the hardest thing to write in strategy. It must be true, charged, specific, and short — all at once. The test: read it to someone who wasn't in the room. Do they nod slowly? Do they say "hm, that's exactly right"? If yes — it's an insight. If they say "sure, obviously" — it's an observation.

**Structure of a strong insight statement:**
- Opens with the human truth (not the category truth)
- Contains a tension — a "yes, but"
- Is written in the voice of the audience, not the voice of analysis
- Is short enough to be said in one breath

**Weak:** *"Consumers in this segment demonstrate a desire for premium experiences that align with their evolving self-concept."*
**Strong:** *"They've worked hard to become someone. Now they want the world to know — without having to say it out loud."*

### The Brand Idea Write-Up
The brand idea write-up exists to make the idea transmissible. It must be written so that someone who wasn't in the room can read it, understand it, and brief from it — without losing anything essential.

**Structure:**
1. The idea named (2-5 words — charged, specific, unusual)
2. The idea in one sentence (what the brand stands for — no jargon)
3. What it means (2-3 sentences: what the brand believes, what it does differently, what it refuses)
4. What it sounds like (2-3 examples of the brand's voice in action)
5. What it never does (the guardrails — equally important as the permissions)

### The Strategic Narrative (Deck Copy)
Deck copy must work in two modes simultaneously:
- **Presented**: spoken aloud by someone in the room, supported by visuals
- **Read**: consumed silently by someone who wasn't there

Write for the second mode. If the deck reads without explanation, it will perform even better when presented.

**Rules for deck copy:**
- One idea per slide. The copy proves or deepens it — it doesn't add to it.
- Slide titles are arguments, not labels (see strategic-narrative-architecture skill)
- Body copy, if present, should be 2-3 sentences maximum — enough to prove the point, not enough to replace thinking
- Pull quotes from insight statements, not from research reports — the human voice is more persuasive than the analyst voice

---

## The Editing Pass

After writing, run every key document through these five edits:

### Edit 1 — The Neutral Word Hunt
Find every adjective and adverb that could belong to any brand in any category. Replace with something specific. "Innovative," "authentic," "meaningful," "impactful" — these words have been used so many times they no longer mean anything. Every one of them must go.

### Edit 2 — The Passive Voice Sweep
Find every passive construction. Ask: who is doing this? Name them. Active voice commits. Passive voice hides.

*"It is believed that..."* → *"We believe..."*
*"Opportunities exist for..."* → *"Here's the opening..."*

### Edit 3 — The Length Test
Find the three longest sentences. Ask: does this sentence need to be this long? Often the answer is no — the length is padding, not precision. Cut until it hurts. Then cut a little more.

### Edit 4 — The Opening Line Check
The first sentence of every section is the most important one. It must earn the reader's attention before they've decided to give it. If the first sentence is a setup — a context-setter, a background statement — consider starting with the second sentence instead.

### Edit 5 — The Read-Aloud Test
Read the document aloud at presentation pace. Where do you stumble? Where does your own voice go flat? Those are the sentences that need to be rewritten. Your voice will tell you what your eye missed.

### Final check: House Style
Before handing anything over, check it against {{HOUSE_STYLE_RULES}}. A strong sentence that breaks the house rules still goes back for a rewrite.

---

## Voice Principles by Document Type

### Strategy Documents (internal / client-facing)
- **Tone:** Confident, clear, slightly provocative
- **Sentence length:** Mixed — long to build, short to land
- **What it avoids:** Consulting jargon, passive voice, hedging, acronyms without definition
- **What it sounds like:** A smart person telling you something they've thought hard about

### Brand Idea / Creative Brief
- **Tone:** Inspiring, precise, energizing without being cheerleader-ish
- **Sentence length:** Shorter — the creative team needs to move fast
- **What it avoids:** Strategy language that doesn't translate to creative action
- **What it sounds like:** A brief that makes you want to start making things

### New Business Pitch
- **Tone:** Confident, specific, slightly bold — you are making a case
- **Sentence length:** Punchy — you are competing for attention
- **What it avoids:** Humble language, excessive qualification, generic agency claims
- **What it sounds like:** Someone who has done their homework and has something to say

### Insight Statements
- **Tone:** Human, plain, charged — written in the audience's emotional register
- **Sentence length:** Short — an insight is not a paragraph, it is a sentence with weight
- **What it avoids:** Research language, demographic descriptors, academic framing
- **What it sounds like:** The thing the audience would say if they could articulate exactly what they feel

---

## Reference Files

- `references/before-after-rewrites.md` — 15 before/after rewrites of real strategy document language: insight statements, brand idea copy, deck sections, and narrative paragraphs. Read to calibrate the quality gap between adequate and strong.
- `references/charged-word-replacements.md` — A working vocabulary of neutral strategy words and their charged alternatives. Read when editing and the language feels flat but you can't see why.
- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.
