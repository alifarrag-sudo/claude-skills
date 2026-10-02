---
name: competitive-blind-spot-finder
description: >
  Scans category conventions and competitor positioning to identify the space no one is owning — the white space where a strategy can be genuinely distinct. Use whenever the user needs to understand the competitive landscape before building a positioning, or when a strategy feels too similar to what competitors are already doing. Trigger when the user says "what are competitors doing?", "how do we stand out?", "what's the white space here?", "everyone in this category sounds the same," "help me find our differentiation," or "what are we up against?" Also trigger proactively when a brand idea is being developed — because the most elegant idea is worthless if a competitor already owns the territory. Run before or alongside insight-to-idea-leap to ensure the idea being built is genuinely available.
---

# Competitive Blind Spot Finder

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.


Your job is not to catalog what competitors are doing. Anyone can do that. Your job is to find what *none* of them are doing — the territory that exists, that the audience needs, that no brand has claimed. That gap is where the most durable positioning lives.

The competitive audit is not a defensive exercise. It is a map-making exercise. You are drawing the territory so you can find the empty space on it.

---

## The Core Principle: Category Conventions Are Positioning Opportunities

Every category develops conventions — the things every brand says, shows, and sounds like. These conventions feel safe to brands because they are familiar. They feel invisible to audiences because they are ubiquitous.

The brand that refuses a category convention doesn't just sound different. It creates a new comparison class. It becomes the brand that people use to measure everyone else.

**The strategic question is never:** "How do we do the category convention better?"
**It is always:** "Which convention can we refuse — and what does refusing it make available?"

---

## Step 1 — Map the Category Conventions

Before looking at individual competitors, map what the category does as a whole. Conventions operate at four levels:

### Visual Conventions
What does this category look like? What colors, imagery, photography styles, and design languages does every brand use? What visual codes signal "this is a [category] brand"?

*Examples by category:*
- Healthcare: White coats, clean environments, stock-photo families, clinical blue
- Automotive: Open roads, dramatic lighting, lone driver, chrome and speed
- F&B: Overhead food photography, warm lighting, hands reaching for food
- Luxury retail: Minimal space, high contrast, aspirational but distant figures
- Loyalty programs: Points accumulating, rewards unlocking, celebration moments

### Verbal Conventions
What words, phrases, and tones does every brand use? What do they promise? What emotional territory do they claim?

*Common category verbal conventions (examples from Gulf markets; re-map for {{MARKETS}}):*
- Healthcare: "World-class care," "Your health is our priority," "Trusted by thousands"
- F&B: "Made with love," "Family moments," "Fresh ingredients"
- Automotive: "Performance," "Innovation," "Drive your ambition"
- Retail: "Discover," "Express yourself," "For every you"

### Audience Conventions
Who does every brand claim to speak to? Most categories converge on the same aspirational audience — the happy family, the successful professional, the empowered young woman — regardless of who actually buys.

### Emotional Conventions
What feelings does every brand try to produce? Most categories have two or three emotional territories that everyone fights over — and a much larger emotional landscape that nobody has touched.

---

## Step 2 — Audit Individual Competitors

For each significant competitor, map across five dimensions:

```
COMPETITOR NAME:

POSITIONING CLAIM:
[What they say they stand for — their explicit or implicit promise]

PRIMARY AUDIENCE (as they've defined it):
[Who they appear to be speaking to]

EMOTIONAL TERRITORY:
[What feeling they are trying to create]

VISUAL SIGNATURE:
[What makes them visually recognizable — or not]

VERBAL SIGNATURE:
[Key phrases, tone, language patterns]

WHAT THEY OWN WELL:
[The territory they've genuinely claimed and would be hard to take]

WHAT THEY'VE LEFT OPEN:
[The gaps — what they don't say, don't show, don't feel like]
```

Run this for every competitor with meaningful market presence. Then look across all audits together.

---

## Step 3 — The Five Blind Spot Lenses

After mapping competitors individually, run the collective picture through these five lenses. Each one reveals a different type of available territory.

### Lens 1 — The Emotional Gap
What feelings does no brand in the category produce? Most categories converge on 2-3 emotional territories and leave vast emotional space unclaimed.

*How to find it:* List every emotion the category's advertising is trying to create. Then list emotions the audience actually feels in this category context — including uncomfortable ones: anxiety, embarrassment, impatience, pride that can't be expressed, frustration, quiet joy. The emotions that brands avoid are often the ones audiences feel most acutely.

*The question:* What does this audience feel that no brand is willing to acknowledge?

---

### Lens 2 — The Audience Gap
Who is the audience that every brand in the category has ignored, misrepresented, or addressed only as an afterthought?

Most categories have an assumed primary audience that every brand fights over, and a real audience (or a segment of it) that is commercially significant but culturally invisible in the category's communication.

*How to find it:* Look at who appears in the category's advertising. Who is never shown? Who is shown but stereotyped? Who is addressed but not understood?

*The question:* Who in this category feels unseen — and is commercially worth owning?

---

### Lens 3 — The Conversation Gap
What is the conversation happening around this category — in social media, in family discussions, in cultural discourse — that no brand has entered?

Audiences talk about categories without brands, all the time. They share opinions, frustrations, moments, and observations that have nothing to do with any brand's communication. Those conversations are territory waiting to be claimed.

*How to find it:* Social listening, comment sections, forum threads, WhatsApp conversations (as reported by your audience), the things people say when they're not being marketed to.

*The question:* What is the audience already saying about this category that no brand has had the courage to agree with?

---

### Lens 4 — The Timing Gap
Is there a moment in the audience's relationship with this category — a specific stage, a transition, a before or after — that no brand addresses?

Most brands communicate at the moment of purchase intent. The moments before purchase (consideration, anxiety, research) and after purchase (integration, habit, advocacy) are often unclaimed.

*How to find it:* Map the full journey — not just the purchase funnel, but the emotional journey from first awareness of a need to long-term relationship with a solution. Mark every moment that no brand currently owns.

*The question:* Where in the audience's journey has every brand abandoned them?

---

### Lens 5 — The Values Gap
What does this audience believe — about themselves, about the world, about what matters — that no brand in the category reflects?

Most categories communicate aspirational values (success, family, wellness) that are safe and widely claimed. Audiences often hold more specific, more complicated, or more unexpected values that have never been reflected back to them by a brand.

*How to find it:* Look at what the audience respects, what they are proud of, what they refuse, what they are quiet about but deeply committed to. Then look at whether any brand in the category reflects those things.

*The question:* What does this audience believe that no brand in this category has been willing to say it believes too?

---

## Step 4 — The White Space Statement

After running all five lenses, consolidate the findings into a **White Space Statement** — the clearest possible articulation of the available territory.

Structure:

```
THE CATEGORY CONVENTION:
[What every brand does / says / sounds like — the thing that could be refused]

THE BLIND SPOT:
[What no brand has addressed — stated in terms of audience need or feeling, 
not just competitive absence]

THE WHITE SPACE:
[The territory available — what a brand could own that no one else can currently claim]

THE ENTRY POINT:
[The specific angle through which the brand being developed can claim this space — 
why this brand specifically, not just any brand]

THE WHITE SPACE IN ONE SENTENCE:
[The sharpest possible statement of the available territory]
```

---

## Step 5 — The Durability Test

Before declaring white space available, run the durability test. Not all white space is worth occupying.

**Test 1 — The Reason It's Empty:**
Is this space empty because no one has noticed it, or because everyone has tried it and it doesn't work? Some spaces are empty for good strategic reasons. Understand why before claiming them.

**Test 2 — The Followability:**
If the brand claims this space and succeeds, how quickly can a competitor follow? White space that can be immediately copied produces a brief advantage, not a durable position. The best white space has structural barriers to followership — brand history, cultural permission, product truth, or audience trust that can't be immediately replicated.

**Test 3 — The Audience Need:**
Is this white space empty because the audience doesn't need it there? Some gaps are gaps because they don't correspond to genuine audience desire. Confirm that the unclaimed territory is unclaimed because brands haven't been paying attention — not because the audience doesn't care.

**Test 4 — The Brand Permission:**
Does the brand being positioned have the right to claim this space? White space is only available if the brand has the credibility, product truth, or cultural position to occupy it. Uncredentialed claims of white space produce positioning that feels aspirational and hollow.

---

## Output Format

```
CATEGORY CONVENTION MAP:
[Visual, verbal, audience, and emotional conventions — what every brand does]

COMPETITOR AUDIT SUMMARIES:
[Key findings per competitor — what they own and what they've left open]

BLIND SPOT ANALYSIS:
[Findings from each of the five lenses]

WHITE SPACE STATEMENT:
[Full template including the one-sentence summary]

DURABILITY ASSESSMENT:
[Results of the four durability tests — is this space worth occupying?]

RECOMMENDATION:
[Which white space to build the positioning from, and why]
```

---

## Reference Files

- `references/category-convention-maps.md` — Pre-mapped category conventions for common client categories (healthcare, F&B/QSR, automotive, retail/fashion, loyalty, and B2B tech), mapped for Gulf (GCC) markets as a worked set. Read to accelerate the convention-mapping step, then re-map for {{MARKETS}} where they differ.
- `references/white-space-examples.md` — Five worked examples of white space identification across Gulf (GCC) categories, showing the convention refused and the territory claimed. Read to calibrate what genuine white space looks and feels like.
- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.
