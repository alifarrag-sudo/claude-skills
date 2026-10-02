# Mode A: Monthly Calendar Build

Trigger: `/social-calendar [Brand] [Month Year]`, or natural phrasings like "plan
next month's posts", "build the calendar", "what should we post in [month]".

Produces a research-led, platform-native monthly content calendar as an `.xlsx`
file. The narrative brief (Phase 4) is the one mandatory approval gate in the whole
skill.

Read `platform-profiles.md` alongside this file: every caption, hook, and script
follows the platform rules there.

---

## Phase 1: Study the brand

`web_fetch` (or batch-scrape with {{TOOL_WEB_RESEARCH}}) the homepage and up to five sub-pages,
prioritising product, solutions, platform, pricing, about. Store as `BRAND_PROFILE`:

**Core identity:** USPs (what genuinely makes them different), product/service
pillars, key terminology the brand owns (coined terms, product names), ICP (who they
sell to, pain points, job titles that appear in the copy).

**Tone of voice:** register (assertive, technical, empathetic, conversational,
executive-facing), what they avoid (hype, jargon, salesiness), distinctive patterns.
For bilingual brands, note the Arabic voice separately: Gulf brands often carry a
warmer, more relational Arabic voice than their English copy.

**Social presence:** for each platform in `ACTIVE_CHANNELS`, scrape the profile and
study the last 10 to 15 posts. Document follower count, posting frequency, formats in
use, hook style, caption length and structure, hashtag strategy, engagement pattern
relative to following, what performs, what does not, visual consistency, and whether
the content is truly platform-native or cross-posted. Store per platform inside
`BRAND_PROFILE`.

## Phase 2: Extract keywords and research targets

From `BRAND_PROFILE`, store as `RESEARCH_KEYWORDS`:
- Primary keywords (3 to 5): core product/category terms.
- Pain-point keywords (3 to 5): the problems solved, in the ICP's own words.
- Competitor keywords (3 to 5): named rivals and alternative approaches.
- ICP role keywords (3 to 5): job titles and personas.

For GCC and MENA brands, build the keyword set in **both languages**: the Arabic a
real customer types is rarely a literal translation of the English marketing term.
Capture the colloquial Gulf or Egyptian phrasing, not just Modern Standard Arabic.
If `ICP_HINT` was given, use it to sharpen extraction.

## Phase 3: Community research (last 30 days)

This is where the calendar earns its "research-led" claim. Prefer the
`deep-listening-intelligence` skill (GCC-first, bilingual) for capturing real
audience language. If running searches directly, use batched search from
{{TOOL_WEB_RESEARCH}} geo-targeted to `MARKET`, and run the set in **English and Arabic**
for GCC/MENA brands.

A four-query plan:

| Query | Focus |
|-------|-------|
| 1 | Top three to four primary keywords |
| 2 | Pain-point keywords: what the ICP is actively struggling with |
| 3 | Category and industry trends: what is shifting this month |
| 4 | Competitor brand mentions: sentiment, claims, community reactions |

Supplement with searches for: platform-specific trending content in each active
channel this month; industry news relevant to the ICP in `TARGET_MONTH`; trending
formats and sounds on TikTok/Reels if active; any viral content in the category; and
the **market calendar** (national days, Ramadan, seasonal moments, school terms) that
should shape timing and theme. Store as `RESEARCH_OUTPUT`.

## Phase 3.5: Mine the comments for insight

Listening tells you the topics. Insight mining tells you the truth underneath them,
which is what makes a month of content feel earned rather than assembled. Read
`references/insight-mining.md` and run it now, on the comment threads and interactions
surfaced during Phase 3 (not just the posts). Harvest replies, quote-tweets, and
reviews bilingually, then produce two to three named insight candidates, each anchored
to verbatim audience quotes.

The recommended insight becomes the spine of the narrative brief: the pillars in Phase
4 should each ladder up to a real audience truth, and the strongest verbatim quotes
carry into the brief as proof. Store as `AUDIENCE_INSIGHT`.

## Phase 4: Narrative brief (APPROVAL GATE)

Synthesise `BRAND_PROFILE`, `RESEARCH_OUTPUT`, and `AUDIENCE_INSIGHT`. Deliver this as
{{DELIVERY_FORMAT}}, not a file.

```
# [Brand]: [Month Year] Social Media Narrative Brief

## What the community is talking about
[3 to 5 bullets, most-discussed topics, platform source cited]

## Key pain points and blockers surfaced
[3 to 5 specific frustrations from real posts/threads, cite the source]

## The audience truth (from AUDIENCE_INSIGHT)
[The recommended named insight in a line or two, with one or two verbatim comments as
proof. This is the truth the month is built on, not just a topic.]

## Landscape signals
[what's trending, what competitors are doing, what the ICP is worried about]

## How [Brand] addresses this
[one sentence per pain point on how the brand responds]

## Recommended monthly narrative
[one to two sentence theme running through all content this month]

## Narrative pillars (3 to 4 themes, each laddering up to the audience truth)
1. [Pillar]: [one line]
2. [Pillar]: [one line]
3. [Pillar]: [one line]

## Tone of voice for this month
[assertive? data-led? empathetic? provocative? and why]

## Language and market notes
[bilingual mix per platform; any market-calendar moments to ride this month]

## Platform strategy notes
[platform-specific angle or opportunity, e.g. a trending sound relevant to Pillar 2]

## Suggested content mix
[by platform and format]
```

Note: the brief follows {{HOUSE_STYLE_RULES}}.

**Pause here. Present the brief and get approval before building anything.**

## Phase 5: Build the calendar (only after approval)

### 5a: Volume

Base: 20 posts plus 4 video reels a month (one video a week), scaled per platform:

| Platform | Monthly guidance |
|----------|------------------|
| LinkedIn | 20 (5/week) |
| X | 25 to 30 (6 to 7/week, includes thread openers) |
| Instagram Feed | 12 to 16 (3 to 4/week) |
| Instagram Reels | 8 to 12 (2 to 3/week) |
| Instagram Stories | daily (5 to 7 frames/day, plan themes not frames) |
| Facebook | 12 to 16 (3 to 4/week) |
| TikTok | 20 to 30 (daily or near-daily) |
| YouTube Shorts | 8 to 12 (2 to 3/week) |
| YouTube Long-form | 2 to 4 (weekly or bi-weekly) |
| Threads | 10 to 15 (3 to 4/week) |
| Pinterest | 20 to 40 (5 to 10/week, can repurpose) |
| Reddit | 4 to 8 (1 to 2/week, value-first) |

Organise by week, then by platform within each week.

### 5b: Per-post data structure

```python
{
  "num": int,
  "week": int,                 # 1 to 4
  "pillar": str,               # narrative pillar
  "date": str,                 # "Mon 4 Aug"
  "platform": str,
  "topic": str,
  "format": str,               # platform-specific (see platform-profiles.md)
  "hook": str,                 # scroll-stopper; never starts with the brand name
  "post_copy": str,            # what goes ON the image/slide/screen
  "carousel_slides": str,      # slide-by-slide, if carousel (LinkedIn, IG)
  "video_script": str,         # if video/reel/Short
  "tiktok_script": str,        # TikTok-specific (see platform-profiles.md)
  "youtube_spec": str,         # title, thumbnail, description, chapters
  "stories_plan": str,         # IG/FB Stories frame plan
  "pinterest_spec": str,       # pin title, description, board, link
  "visual": str,               # designer brief
  "meme_concept": str,         # meme format + panels, if used
  "caption": str,              # platform-native caption (per platform rules)
  "caption_ar": str,           # Arabic caption for bilingual brands (real text, not transliteration)
  "hashtags": str,
  "cta": str,
  "reddit_sub": str,           # target subreddit, Reddit only
  "trending_audio_note": str,  # TikTok/Reels: where trending audio goes
  "best_time": str,            # optimal time for this platform and market
}
```

`caption_ar` is the bilingual addition. Populate it for GCC/MENA brands where the
platform and audience call for Arabic; leave blank where the content is
English-only. Never machine-translate the English caption into it: write it natively.

### 5c: Content rules

**Universal (every piece, every platform):**
1. Hooks never open with "We", "Our", or the brand name.
2. Every piece makes the ICP feel seen before the brand appears.
3. Week 1 plants the problem, Week 2 the insight, Week 3 the proof, Week 4 authority
   plus action.
4. Banned words: "leverage", "synergy", "excited to announce", "game-changing",
   "seamless", "robust". And every piece follows {{HOUSE_STYLE_RULES}}.
5. One idea, one hook, one CTA per post. Nothing tries to do three jobs.

**Platform-native:** follow every rule in `platform-profiles.md`. If a platform's
content is just a resized version of another's, rewrite it.

**Meme concepts** (use where they amplify, not decorate):

| Post type | Best format |
|-----------|-------------|
| Ironic stat or data gap | Gru's Plan, This is Fine dog |
| Before/after contrast | Drake Pointing, Distracted Boyfriend |
| Challenging a market assumption | Change My Mind, Always Has Been |
| Impossible choice | Two Buttons |
| Perception vs reality | Anakin / Padme |
| Escalating insight | Expanding Brain |
| Single impossible-sounding task | One Does Not Simply |

Each `meme_concept` includes: FORMAT name, panel-by-panel description, caption line,
STYLE notes. For GCC audiences, check the meme reads locally: some Western formats
land, some do not, and Arabic meme culture has its own references worth using.

**Video script format (non-TikTok):**
```
DURATION: ~[N] sec
FORMAT: [text-on-screen + VO / talking head / B-roll + VO]
STYLE: [visual aesthetic]
TONE: [tone]
MUSIC: [direction]

[0:00 to 0:XX] SECTION
VISUAL: [on screen]
ON-SCREEN: [text overlays; if Arabic, real editable text]
VO: [voiceover]
```
Arc: Hook (0 to 7s), Problem (7 to 25s), Reframe (25 to 40s), Answer (40 to 52s),
CTA (52 to 60s).

**YouTube long-form spec:**
```
TITLE: [SEO, under 60 chars, keyword in]
THUMBNAIL BRIEF: [what appears, contrast notes]
DESCRIPTION LINE 1: [hook + keyword]
DESCRIPTION LINE 2: [what they'll learn]
CHAPTERS:
  0:00 Introduction
  [1:30] [Chapter 1]
  [N:NN] [Chapter N]
TAGS: [k1, k2, k3, k4, k5]
END SCREEN CTA: [subscribe / watch next / visit site]
CARDS: [timestamps + targets]
```

TikTok script rules live in `platform-profiles.md` (the single source of truth).
Do not duplicate them here.

### 5d: Proof before the batch

Before generating the full month, produce roughly three finished sample posts across
a mix of platforms (for a bilingual brand, include at least one with a real Arabic
caption). Show them in chat and get a quick read on tone, format, and language mix.
This catches a systemic problem on three examples instead of sixty.

### 5e: Generate and run the build script

Write `build_calendar.py` tailored to `ACTIVE_CHANNELS`. It:
1. Defines all content as a list of dicts (structure in 5b).
2. Uses `openpyxl` to build a styled workbook.
3. Creates sheets by active channel: Overview (narrative summary, platform
   breakdown, legend), Full Calendar (everything), one sheet per active platform,
   Videos (all scripts wide-format), Week 1 to 4.
4. Varies columns by platform (LinkedIn shows carousel slides, TikTok shows the
   TikTok script, YouTube shows the full spec). For bilingual brands, include the
   `caption_ar` column and set those cells right-aligned so the Arabic renders RTL.
5. Colour-codes by platform.
6. Saves to `OUTPUT_DIR/[Month-Year]-[Brand]-Social-Calendar.xlsx`.

Run:
```bash
PYTHONUTF8=1 python3 build_calendar.py
```

Then present the file to the user. UTF-8 mode matters here:
without it, Arabic in the workbook can corrupt.
