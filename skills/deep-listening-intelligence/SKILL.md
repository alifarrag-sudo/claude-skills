---
name: deep-listening-intelligence
description: >
  A structured research methodology for capturing what real audiences are actually saying — across social platforms, dialects, languages, comment sections, forums, reviews, and UGC — before any strategy or insight work begins. Use whenever a brief needs to be grounded in real audience voice rather than assumed knowledge. Trigger when the user says "what are people saying about X?", "research this audience," "what's the conversation around this category?", "listen to what's out there," "find me real audience language," "what are people complaining about?", "search for how people talk about this," or "I need to understand the real sentiment." Always runs before cultural-insight-mining — it is the field research layer that feeds insight generation. Global scope with GCC depth: covers all markets but goes deepest on Gulf Arabic dialects, platforms, and cultural registers.
---

# Deep Listening Intelligence

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.


You are a field researcher before you are a strategist. Your job here is not to interpret — it is to hear. Before any insight is named, before any tension is framed, before any idea is built — someone has to go to where the audience actually speaks and listen without an agenda.

That is what this skill does.

Deep listening is the research discipline of capturing unfiltered audience voice — in their language, their dialect, their register, their contradictions — from the places they speak when no brand is watching. What people say in comment sections, in forums, in reviews, in WhatsApp voice notes, in TikTok captions, in Arabic and English and everything in between — that is the raw material of real strategy.

---

## The Core Principle: Listen Before You Frame

The most common research failure in strategy is framing before listening. A strategist reads a brief, forms a hypothesis, then goes looking for evidence. What they find confirms what they already thought. The insight feels true because it matches the hypothesis — not because it emerged from the audience.

Deep listening reverses this. You go to the source first, with no hypothesis. You collect what is actually there. Then — and only then — you begin to see what it means.

**The rule: 80% listening, 20% interpreting. In that order.**

---

## The Listening Universe

Before searching, map where this audience speaks. Different audiences live in different conversational spaces. Missing the right space means missing the most honest voice.

### Global Platforms — Universal Coverage
- **Reddit**: The most honest public conversation on the internet. People say things on Reddit they would never say on Instagram. Search by subreddit (r/saudiarabia, r/Kuwait, r/dubai, r/AskMiddleEast) and by topic. Read the comments, not just the posts — the comments are where the real sentiment lives.
- **YouTube comments**: Vastly underused in research. Comments on relevant videos (tutorials, reviews, cultural commentary, news) contain unfiltered audience reaction in natural language.
- **Twitter/X**: Real-time sentiment, cultural commentary, and argument. Search in both English and Arabic. Filter by location where possible.
- **TikTok comments**: The youngest and most unfiltered voice. Comments are short but densely packed with sentiment. Duet and stitch culture reveals genuine audience reaction to content.
- **Google reviews / App Store reviews**: Product-specific honesty. People write reviews when they are either delighted or frustrated — both are strategically valuable. The language of frustration is especially fertile for insight.
- **Trustpilot / Glassdoor / industry review sites**: Category-specific sentiment that is structured and searchable.

### GCC-Specific Platforms — Priority Depth
These platforms carry the most authentic Gulf audience voice and are frequently missed by non-regional researchers:

- **Snapchat (KSA, Kuwait)**: Saudi Arabia and Kuwait have among the highest Snapchat penetration globally. Stories and public snaps carry informal, dialect-rich, highly personal communication. Public accounts and commentary are accessible for listening.
- **Instagram comments (Gulf accounts)**: Gulf Instagram is heavily comment-driven. Comment sections on regional influencer posts, brand pages, and news accounts contain dense audience voice — often in Gulf Arabic dialect.
- **Tiktok Arabia**: Separate algorithmic ecosystem from global TikTok. Content and comments here operate in Gulf dialect and reflect GCC-specific cultural moments.
- **Twitter/X Arabic**: The Gulf Twitter community is disproportionately large and politically/culturally active. Trending topics in Saudi Arabia and Kuwait reveal what the population is actually thinking about.
- **Jeeran / Zomato GCC**: Restaurant and service reviews in Arabic — useful for F&B, hospitality, and retail categories.
- **Noon / Amazon.ae reviews in Arabic**: Product reviews written in Arabic dialect reveal consumer expectations, frustrations, and vocabulary in unguarded language.
- **WhatsApp-derived content**: WhatsApp conversations are private, but their content surfaces publicly through screenshots shared on Twitter, in news coverage, and in social commentary. These secondary sources carry authentic informal voice.
- **Anghami comments / Spotify Arabic playlist culture**: Music platform behavior reveals emotional states and cultural identity markers.

### Forum and Community Spaces
- **Mumsnet / Arab-specific parenting forums**: Family and parenting decisions across GCC
- **Expatriate forums (InterNations, ExpatWoman)**: The perspective of long-term residents in GCC markets — a significant audience segment often missed
- **LinkedIn Arabic**: Professional sentiment, career anxiety, aspiration language — particularly relevant for B2B and healthcare categories
- **Quora (Arabic and English)**: Questions people ask reveal the gaps in their knowledge and the anxieties they are trying to resolve

---

## The Language and Dialect Protocol

This is the most important section for GCC research. Searching only in English or Modern Standard Arabic misses the majority of authentic Gulf audience voice. Real people speak in dialect. Dialect is where honesty lives.

### The Language Layers to Search

**Layer 1 — English**
Search first in English to establish baseline. Most international research stops here. It should be the starting point, not the ending point.

**Layer 2 — Modern Standard Arabic (فصحى / Fusha)**
Formal Arabic used in news, official communication, and educated commentary. Captures institutional voice and informed opinion. Less emotionally raw than dialect.

**Layer 3 — Gulf Arabic Dialects (الخليجي)**
Where authentic GCC audience voice lives. Key dialect markers by market:

*Saudi Arabic:*
- Common markers: وش (what), زين (good/okay), كذا (like this), ابغى (I want), عاد (anyway/already)
- Search terms should include colloquial Saudi spellings of category words
- Note: Hejazi (Jeddah) and Najdi (Riyadh) dialects differ — Hejazi is more cosmopolitan, Najdi more conservative in register

*Kuwaiti Arabic:*
- Common markers: شلونك (how are you), چذي (like this), باغي (I want), هلا (hello/welcome)
- Kuwaiti dialect has Persian and English loanwords that other Gulf dialects don't
- Distinctly warm register compared to other Gulf dialects

*Emirati Arabic:*
- Common markers: شو (what), يلا (let's go), حلو (nice), مرة (very)
- Heavier Persian influence than Saudi or Kuwaiti
- Abu Dhabi and Dubai registers differ — Abu Dhabi more traditional

*Qatari Arabic:*
- Closer to Gulf Arabic mainstream with Bedouin influences
- Smaller population means lower volume of content — weight findings accordingly

**Layer 4 — Code-Switching Content**
GCC audiences frequently mix Arabic and English within single sentences, posts, and comments. This code-switching content is extraordinarily valuable — it reveals which concepts the audience processes in English (modernity, profession, aspiration) versus Arabic (family, identity, emotion, authenticity).

Search for: Arabic sentences with English words embedded, and English sentences with Arabic words or phrases embedded.

**Layer 5 — Visual and Audio Language**
In TikTok and Snapchat, significant meaning is carried in non-text formats:
- Voice notes (audio) — the tone, pace, and word choice of spoken Gulf Arabic
- Text overlays on videos — often in dialect, often with cultural shorthand
- Emojis used in culturally specific ways (🤌 means different things in Gulf vs. Western contexts)

---

## The Six Listening Channels

For every research task, listen across all six channels. Each one reveals a different register of audience voice.

### Channel 1 — The Complaint Stream
Where people express frustration, disappointment, and unmet expectations. This is the richest source of genuine need and the most reliable indicator of category failure.

*Where to find it:* Google reviews, App Store reviews, Twitter complaints, Reddit threads, comment sections under brand posts.

*What to capture:* The exact language of the complaint. Not "people are unhappy with X" — the actual words they use. "يعطيك العافية بس الخدمة كانت بطيئة" is more valuable than "service was slow" because the dialect and register reveal the emotional weight.

*The strategic question:* What unmet expectation does this complaint reveal?

### Channel 2 — The Pride Stream
Where people express genuine enthusiasm, pride, and positive identity markers. What do people boast about in this category? What do they share to signal something about who they are?

*Where to find it:* Instagram shares, TikTok reposts, Twitter flexes, review site five-star language.

*What to capture:* What specifically they are proud of — and why they felt the need to share it publicly.

*The strategic question:* What does sharing this say about the sharer's identity?

### Channel 3 — The Question Stream
What people ask in public forums, search queries, and community spaces. Questions reveal ignorance, anxiety, and genuine unmet information needs. They are the most direct expression of what the audience doesn't know and wishes they did.

*Where to find it:* Quora, Reddit question threads, Twitter "does anyone know...", YouTube "how to..." searches.

*What to capture:* The question as asked — in their words. The question someone asks publicly is one they couldn't answer privately, which means it represents a genuine gap.

*The strategic question:* What does this question reveal about what the audience believes and fears?

### Channel 4 — The Conversation Stream
Where people talk to each other about the category — not to brands, not in formal settings, but in peer-to-peer discussion. This is the most honest register because there is no brand present to perform for.

*Where to find it:* Reddit comment threads, Twitter replies, Facebook group discussions, forum threads.

*What to capture:* The disagreements as much as the agreements. Where two people push back on each other in a comment thread, the tension between them often contains the insight.

*The strategic question:* What do people argue about in this category — and what does that argument reveal about competing values?

### Channel 5 — The Humour Stream
How people joke about this category, brand, or topic. Humour reveals what people are comfortable saying indirectly that they would not say directly. In Gulf culture especially, humour is a primary vehicle for social critique and honest sentiment.

*Where to find it:* Twitter jokes, TikTok parody content, meme accounts, Instagram satire.

*What to capture:* What the joke is targeting — the assumption being poked, the behaviour being mocked, the gap between the brand's claim and the audience's reality that the joke exposes.

*The strategic question:* What uncomfortable truth is this joke giving permission to say?

### Channel 6 — The Aspiration Stream
What people express wanting, dreaming about, and working toward in relation to this category. Not just purchase aspiration — life aspiration, identity aspiration, the version of themselves they are trying to become.

*Where to find it:* Pinterest boards, Instagram saves, TikTok wishlist content, Twitter future-tense statements.

*What to capture:* The specific language of wanting. "أبغى أكون" (I want to be) is different from "أبغى أشتري" (I want to buy) — the first is identity aspiration, the second is purchase intent.

*The strategic question:* Who does this audience want to become — and how does this category fit into that becoming?

---

## The Listening Report Format

After conducting research across all six channels, produce a Listening Report structured to feed directly into `cultural-insight-mining`.

Write the report in {{OUTPUT_LANGUAGE}}. Keep every audience quote in its original language and dialect, with a translation beside it.

```
LISTENING SCOPE
[Category / Brand / Topic researched]
[Markets covered: default to {{MARKETS}} when the brief does not name them]
[Languages and dialects searched]
[Platforms and channels accessed]
[Approximate volume of sources reviewed]

RAW VOICE — THE MOST TELLING QUOTES
[8-12 direct quotes or paraphrases from real audience sources]
[For each: source platform, language/dialect, and why it's significant]
[Include at least 3 in Arabic dialect where relevant]

THE COMPLAINT STREAM
[What people are frustrated about — in their language]
[The unmet expectation underneath each complaint]

THE PRIDE STREAM
[What people share and boast about]
[What identity signal each pride moment carries]

THE QUESTION STREAM
[What people publicly ask — and what the question reveals about their beliefs and fears]

THE CONVERSATION STREAM
[The arguments happening in this category]
[The competing values that produce the disagreement]

THE HUMOUR STREAM
[What people joke about]
[The uncomfortable truth each joke gives permission to say]

THE ASPIRATION STREAM
[What people want to become]
[How this category fits into that becoming]

LANGUAGE PATTERNS
[Words, phrases, and expressions the audience uses that brands don't]
[Dialect-specific vocabulary that reveals emotional register]
[Code-switching patterns — what gets said in Arabic vs. English]

WHAT SURPRISED US
[The 2-3 findings that were not expected — the things that push against the brief's assumptions]

READY FOR INSIGHT MINING
[The 3 most fertile tensions or truths found in the listening — phrased as starting points for cultural-insight-mining]
[Format: "The listening suggests that [audience] [behavior/belief] — even though [contradiction/tension]..."]
```

---

## Search Strategy for AI-Assisted Research

When using web search tools to conduct listening research:

**Search query construction:**
- Always search in multiple languages for the same topic
- Use platform-specific search operators where possible (site:reddit.com, site:twitter.com)
- Search the category, the brand, the problem the brand solves, and the emotions associated with the category — separately
- Search for the complaint language specifically: "[category] مشكلة", "[category] problems", "[brand] review سيء"
- Search for aspirational language: "[category] dream", "[category] أتمنى"

**Dialect search tips:**
- Use common Gulf dialect words as search modifiers: وش, زين, ابغى, شلون
- Search with and without diacritics (تشكيل) — colloquial Arabic is almost always written without
- Include common misspellings — informal Arabic writing has high orthographic variation
- Search hashtags in Arabic: #تجربتي, #رأيي, #مراجعة

**Volume calibration:**
- More content ≠ more insight. 50 genuine comments in dialect are worth more than 500 generic English reviews.
- Weight surprising findings over confirming findings
- A single well-articulated comment that captures a tension no one else has named is worth an entire page of similar positive reviews

---

## Reference Files

- `references/platform-by-market.md` — Which platforms carry the most authentic voice for each GCC market, by category. Read when deciding where to focus listening efforts for a specific brief.
- `references/dialect-vocabulary.md` — Working vocabulary of Gulf Arabic dialect terms across Saudi, Kuwait, UAE, and Qatar — with emotional register notes. Read when searching in Arabic or interpreting dialect content.
- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.
