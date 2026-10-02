---
name: global-insight-scout
description: >
  Activated by the word "Globally" — conducts wide-spectrum research and listening across all world markets, languages, cultures, and platforms to surface insights, trends, human truths, and strategic territories from anywhere on earth, then translates the most relevant findings into intelligence the user can act on in their home markets. Use when the user starts a request with "Globally" or says "globally research this," "find this globally," "what's happening globally around X," "search globally for," or "look at this from a global lens." The skill searches without geographic constraint — any language, any market, any platform — then applies a home-market translation layer to make findings actionable for local strategy. Companion to deep-listening-intelligence (local-first) and cultural-insight-mining. Think of it as the satellite view before the street-level view.
---

# Global Insight Scout

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.


**Activation word: "Globally"**

When the user begins a request with "Globally" — or uses any variant of that framing — this skill activates. Everything that follows is conducted without geographic constraint, then landed into home-market relevance.

**Home markets: {{MARKETS}}.** Every finding is translated into these markets. The worked examples in this skill and its reference files use Gulf (GCC) markets as the home market; the method is the same for any market.

The premise: the best ideas in any category have already been thought somewhere in the world. The most interesting human tensions are playing out right now in markets you haven't looked at. The insight that will make your home-market strategy distinctive may have already been articulated — in Portuguese, in Korean, in Hindi — by an audience on the other side of the planet facing the same underlying human truth.

Your job is to find it. Then bring it home.

---

## The Two-Phase Structure

Every Global Insight Scout session runs in two phases. They are not optional — both are required.

### Phase 1 — The Global Sweep
Search without constraint. No geographic filter. No language preference. Cast the widest possible net across markets, languages, and platforms. The goal is to surface what is actually happening globally around a topic — not what you expect to find, not what confirms the brief, but what is actually out there.

### Phase 2 — The Home-Market Translation
Take the strongest global findings and ask: what does this mean for the home markets? Not "can we copy this?" — but "what is the underlying human truth here, and does that truth exist in the home culture in a different form?" The translation is never direct. It is always interpretive.

---

## Phase 1 — The Global Sweep

### Search Scope: Languages to Cover

Cast across language families. Each language family unlocks a different cultural worldview and a different way of experiencing the same human truth.

**Tier 1 — Always Search**
These languages have the highest content volume and broadest market representation:
- **English** — US, UK, Australia, Canada, India, global expat communities
- **Spanish** — Spain, Mexico, Latin America (especially Brazil-adjacent themes)
- **Arabic** — MENA, diaspora communities globally
- **Hindi / Hinglish** — India, South Asian diaspora (enormous digital voice)
- **Portuguese** — Brazil (the world's most social digital culture by engagement)

**Tier 2 — Search When Category-Relevant**
- **French** — France, West Africa, Francophone communities (luxury, culture)
- **German** — Germany, Austria, Switzerland (quality, engineering, sustainability)
- **Japanese** — Japan (design, precision, consumer behavior extremes)
- **Korean** — South Korea (beauty, entertainment, K-culture global influence)
- **Turkish** — Turkey (cultural crossroads between East and West, especially relevant to Middle East home markets)
- **Indonesian / Malay** — Southeast Asia (world's largest Muslim-majority market, culturally proximate to other Muslim-majority markets on some dimensions)
- **Swahili** — East Africa (emerging middle class with rapid digital adoption)

**Tier 3 — Search for Specific Angles**
- **Italian** — luxury goods, food culture, craft
- **Mandarin Chinese** — scale of trend, speed of adoption
- **Dutch / Scandinavian** — progressive social trends that often arrive in other markets years later
- **Russian** — Eastern European/Central Asian diaspora communities, plus distinctive consumer behavior

---

### Search Scope: Platforms to Cover Globally

**Social & Community**
- Reddit (global + language-specific subreddits)
- Twitter/X (global trending, language-filtered)
- TikTok (global For You page trends — search by hashtag across languages)
- Instagram (global hashtag search)
- Facebook Groups (particularly strong in Southeast Asia, Latin America, Africa)
- Weibo / Douyin (China) — for scale indicators of global trend direction
- VK (Russia and Eastern Europe)
- Naver Blogs / Kakao (Korea)

**Long-form & Review**
- YouTube (global comments — often in native language on English videos)
- Medium / Substack (English-language global thought)
- Quora (global questions in multiple languages)
- Google Reviews (any market, any language)
- Trustpilot (European-heavy but global brand coverage)
- App Store reviews across markets

**News & Cultural Commentary**
- Google News (language-filtered)
- Local news sites in target markets
- Cultural magazines and online publications
- Academic and NGO reports (often the first to name emerging human trends)

**UGC & Specialist Communities**
- Pinterest (global aspiration — underrated insight source)
- LinkedIn (professional global voice — especially for B2B categories)
- Discord servers (niche communities, highly engaged)
- Forums in language (e.g., Japanese 5ch, Brazilian forums)

---

### The Global Listening Channels

Run the same six channels from `deep-listening-intelligence` — but globally, across all languages:

**1. Global Complaint Stream**
What are people frustrated about in this category across the world? Look for complaints that recur across culturally different markets — a complaint that appears in English, Spanish, and Korean simultaneously is pointing at a universal human frustration, not a local quirk.

**2. Global Pride Stream**
What do people in different cultures share and boast about in this category? Pride expression varies enormously by culture — what Indians share proudly may be what Germans share privately. The variation is as valuable as the finding.

**3. Global Question Stream**
What questions are people asking about this category across the world? A question that appears in ten languages is a universal human uncertainty. That uncertainty is strategy waiting to be named.

**4. Global Conversation Stream**
What are the arguments happening globally around this category? Cultural arguments differ — the debate happening in Brazil may not be happening in your home markets yet. "Not yet" is strategic timing intelligence.

**5. Global Humour Stream**
What do people joke about in this category across cultures? Humour is the most culturally specific language — what is funny in Korea may not translate. But what the joke is targeting (the gap between claim and reality, the pretension being punctured) often does.

**6. Global Aspiration Stream**
What do people globally want to become through this category? Aspiration patterns are globally shared but culturally expressed differently. The aspiration exists in your home markets, but it may wear different clothes.

---

### Global Search Query Construction

**Multi-language parallel searching:**
Run the same search query in multiple languages simultaneously. Use web search tools with explicit language modifiers.

```
Query structure:
[topic/brand/category] + [sentiment/behavior word] + [language modifier]

Examples:
"loyalty program" + "frustration" (English)
"programme de fidélité" + "frustration" (French)
"برنامج الولاء" + "إحباط" (Arabic)
"loyalty program" + "frustrasi" (Indonesian)
"로열티 프로그램" + "불만" (Korean)
```

**Cross-language trend detection:**
When the same theme appears across 3+ language communities independently, it is a global human truth — not a local trend. Flag these as **Universal Tensions** — they have the highest probability of being applicable in {{MARKETS}}.

**Emerging market priority:**
Some of the most fertile global insights come from markets where the category is newer — where audiences are encountering a product or experience for the first time and articulating what they feel without the layer of category conditioning. India, Southeast Asia, and sub-Saharan Africa often produce this kind of unconditioned response.

---

## Phase 2 — The Home-Market Translation Layer

This is where global intelligence becomes home-market strategy. The translation is the skill. It is never "this worked in Korea so let's do it in Kuwait." It is always "there is a human truth playing out in Korea that we now need to find the home-market expression of."

### The Four Translation Questions

For every significant global finding, ask all four:

**Q1 — Does this human truth exist in the home market?**
Not "is this trend happening here?" but "is the underlying human emotion or tension present in the home culture?" A trend can be entirely absent while the human truth that drives it is very much present — expressed differently, perhaps suppressed, perhaps waiting for permission.

*Example (Gulf markets): The global trend of "setting boundaries" with family may not be culturally expressible in the GCC in the same direct way — but the tension between family obligation and personal need absolutely exists. It just wears different language.*

**Q2 — What is the home-market form of this truth?**
If the truth exists, what does it look like here? What are the specific cultural codes, language registers, and behavioral expressions through which local audiences live this truth? This is where a cultural decoder for the market (for example `gcc-cultural-decoder` for Gulf markets) becomes a companion tool.

*Example (Gulf markets): The global "self-care" movement expresses itself in the GCC not as Western individualism ("treat yourself") but as earned restoration ("you've carried enough — now restore yourself"). Same truth. Different cultural register.*

**Q3 — Is there a timing opportunity?**
Is this a truth that is arriving in the home market, already present, or still years away? Global trends often reach a given market on a lag of several years, but some arrive faster where the population is young, digitally connected, and internationally travelled. (In Gulf markets the typical lag is 3-7 years, often shorter for youth.)

*Timing categories:*
- **Ahead of its time** — the truth exists privately but has no public language yet. High-risk, high-reward territory.
- **Arriving** — visible in early adopter communities and youth. 1-2 year window to own it.
- **Present** — actively lived but underserved by brands. The most immediately actionable territory.
- **Saturated** — already widely acknowledged and competed for. Avoid unless you have a genuinely differentiated angle.

**Q4 — What does this make available for home-market brands?**
Given that this truth exists in the home market in this specific form at this timing — what can a brand do with it? What position can it occupy? What conversation can it enter? What does it refuse that everyone else is still saying?

---

### The Home-Market Translation Matrix

Use this matrix to organize findings from the global sweep:

```
GLOBAL FINDING:
[What was found — the truth, tension, trend, or human behavior]

MARKETS WHERE FOUND:
[Which markets + languages surfaced this — the broader the spread, the more universal]

UNIVERSALITY ASSESSMENT:
[Is this a universal human truth, a Western cultural pattern, or a market-specific quirk?]
[Scale: Universal → Broadly cross-cultural → Culturally specific]

HOME-MARKET EXISTENCE CHECK:
[Does this truth/tension exist in the home culture? Evidence?]

HOME-MARKET EXPRESSION:
[How does this truth manifest specifically in each relevant home market?]
[The cultural codes, language, behaviors it wears there]

TIMING:
[Ahead of its time / Arriving / Present / Saturated]

STRATEGIC OPPORTUNITY:
[What a home-market brand can do with this: the territory it opens]

COMPANION SKILL TO ACTIVATE:
[Which skill to hand this finding to next:
 → cultural-insight-mining (to deepen into a named insight)
 → a market cultural decoder, e.g. gcc-cultural-decoder (to apply cultural specificity)
 → insight-to-idea-leap (if the insight is clear and the leap is ready)
 → competitive-blind-spot-finder (to check if the territory is available)]
```

---

## Output Format

Every Global Insight Scout session produces two documents:

### Document 1 — The Global Sweep Report
```
RESEARCH SCOPE
[Topic / category / brand researched]
[Languages searched]
[Platforms accessed]
[Approximate sources reviewed]

GLOBAL FINDINGS — TOP 5-8
[Each finding with: market of origin, language, platform, the actual content found,
and why it's strategically interesting]

UNIVERSAL TENSIONS IDENTIFIED
[Findings that appeared across 3+ language communities — the highest-confidence global truths]

EMERGING SIGNALS
[Early-stage findings from 1-2 markets that haven't reached the home markets yet: timing intelligence]

SURPRISING FINDS
[Things that were not expected — that push against the brief's assumptions or reveal
something no one in the room would have thought to look for]
```

### Document 2 — The Home-Market Translation Brief
```
FOR EACH SIGNIFICANT GLOBAL FINDING:

[Global Finding name — 2-4 words]
Global truth: [One sentence]
Home-market existence: [Yes / Partial / Not yet]
Home-market expression: [How it lives in the home culture specifically]
Timing: [Ahead / Arriving / Present / Saturated]
Strategic opportunity: [What a home-market brand can do with this]
Recommended next step: [Which skill to activate and why]

PRIORITY TRANSLATION:
[The single most actionable global-to-home-market finding: the one most ready to become strategy]
[Written as a handoff brief to cultural-insight-mining]
```

---

## The Handoff Protocol

When a strong global finding has been translated into a home-market truth, hand it off using this format — structured to feed directly into `cultural-insight-mining`:

```
GLOBAL ROOT:
[The finding from the global sweep — what was observed, where, in what language]

THE UNIVERSAL TRUTH UNDERNEATH:
[The human emotion or behavior that transcends the specific market]

THE HOME-MARKET FORM:
[How this truth specifically manifests in the home culture: the local texture]

THE TENSION:
[The "yes, but" — the friction that makes it strategic]

READY FOR INSIGHT MINING: YES
[Hand to cultural-insight-mining to develop into a full named insight]
```

---

## Reference Files

- `references/global-trend-markets.md` — Which global markets to prioritize for trend-scouting by category: where fashion trends originate, where healthcare behavior innovates, where youth culture leads, where brand relationship models are being reinvented. Read before deciding which Tier 2/3 languages to search.
- `references/translation-examples.md` — Five worked examples of global findings translated into strategic opportunities for Gulf (GCC) markets as the home market. Each shows the global source, the universal truth extracted, the local expression found, and the strategic territory it opened. Read to calibrate what a strong global-to-home-market translation looks and feels like.
- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.
