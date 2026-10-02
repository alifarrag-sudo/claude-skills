# Mode C: Competitor Intelligence and Gap Analysis

Trigger: `/competitor-audit [Brand]`, or "what are competitors doing on social",
"find the gaps we can own", "competitor social benchmark".

Studies competitor channels, builds a comparison matrix, and identifies content gaps
and whitespace the brand can own. Delivered as {{DELIVERY_FORMAT}} unless a file is
requested. This is the mode most often run before a new-business pitch, so
the whitespace section is the payload: make it specific and ownable.

Read `platform-profiles.md` alongside this file.

---

## Phase C1: Competitor discovery

If `COMPETITORS` was not given, discover them. Prefer batched search from
{{TOOL_WEB_RESEARCH}} (geo-targeted to `MARKET`, run English and Arabic query sets for
GCC/MENA); fall back to `web_search`.

```
[Brand] competitors alternatives [year]
best [brand's product category] tools [year]
[Brand] vs [category] comparison
```
Also check category comparison sites (G2, Capterra, or the regional equivalent for
GCC categories where G2 coverage is thin).

Identify three to six direct competitors. Present the list and get a one-line
confirmation before Phase C2: the user may have strategic reasons to include or
exclude a name. Store as `COMPETITOR_LIST` (name, website, social handles per
platform).

## Phase C2: Competitor channel analysis

For each competitor, on each relevant platform, scrape the profile (batch scrape)
and study the last 20 to 30 posts. Document: follower count and estimated growth
trajectory; posting frequency; primary formats; top-performing content (topics,
formats, hooks); tone and voice; hashtag strategy; estimated engagement rate; notable
campaigns or series; what they are NOT doing (gaps in their own strategy); any viral
or breakout moment in the last 30 days. For GCC/MENA, note each competitor's language
posture: Arabic-first, English-first, or code-switching, and how well they do it.
Store as `COMPETITOR_PROFILES`.

All counts and rates are estimates from public signals: label them as such.

## Phase C2.5: Mine competitor comment sections

The most honest signal in competitive intel is not what a competitor posts, it is what
their audience complains about underneath it. Read `references/insight-mining.md` and
run it on the comment threads under competitors' posts (and their reviews), bilingually
for GCC/MENA. Look specifically for unmet needs, recurring complaints, feature requests,
and defection signals ("I switched to...", "wish they would...", "anyone else find..."),
captured verbatim. Store as `COMPETITOR_VOICE`. Every unmet need found here is a
candidate whitespace opportunity with the comment already attached as proof.

## Phase C3: Gap analysis

Compare `BRAND_PROFILE` and audit data (if Mode B ran) against `COMPETITOR_PROFILES`.

Lead with `COMPETITOR_VOICE`: the unmet needs and complaints mined from competitor
comment sections are the highest-confidence gaps because the audience named them
itself. Carry the verbatim quote into the whitespace section as proof.

**Content angle gaps:** topics the ICP cares about that nobody covers; questions the
community asks that no brand answers; pain points from research nobody addresses;
anything in `COMPETITOR_VOICE` that competitors are visibly failing to answer.

**Format gaps:** formats nobody uses (nobody's doing LinkedIn carousels; nobody's on
TikTok); format experiments working in adjacent categories but not adopted here.

**Tone gaps:** is everyone too corporate (room for a human voice) or too casual (room
for authority)? Is anyone doing humour, memes, real education? For GCC, is everyone
defaulting to formal MSA when the audience lives in dialect?

**Platform gaps:** platforms the brand is absent from that competitors grow on;
platforms competitors are absent from that the brand could own early.

**Engagement gaps:** are competitors ignoring comments (community win available)? Are
they absent from Reddit or relevant communities (whitespace)?

**Narrative gaps:** a story nobody in the space is telling; a category position
nobody owns.

## Phase C4: Report

Deliver as {{DELIVERY_FORMAT}}, following {{HOUSE_STYLE_RULES}}.

```
# [Brand]: Competitor Intelligence Report
Date: [date]
Competitors: [list]

## Executive summary
[3 to 5 sentences: who's winning, why, and where the biggest opportunity sits]

## Comparison matrix

### [Platform]
| Metric | [Brand] | [Comp A] | [Comp B] | [Comp C] |
|--------|---------|----------|----------|----------|
| Followers (est.) | | | | |
| Posts/week | | | | |
| Est. engagement | | | | |
| Primary format | | | | |
| Tone | | | | |
| Top topics | | | | |
| Hashtag strategy | | | | |
| Language posture | | | | |

[repeat per platform with 2+ active competitors]

## What's working for competitors
### [Competitor A]
Platform: [x] | Format: [x] | Why it works: [observation with a specific example]
### [Competitor B]
[same]

## What's not working for competitors
[shared failures across several competitors]
- [e.g. every competitor opens with the brand name, so hooks are dead on arrival]
- [...]
- [...]

## Whitespace opportunities

### High-impact (own these first)
1. [Gap name]
   - What it is: [description]
   - Why nobody does it: [reason]
   - Proof from the comments: [verbatim audience quote from COMPETITOR_VOICE, source cited]
   - How to own it: [specific approach]
   - Platforms: [where]
   - Effort: Low / Medium / High
2. [Gap name]
   [same shape]

### Medium-impact (build toward)
[2 to 3, lower urgency]

### Emerging (monitor)
[1 to 2 unproven but worth watching]

## Recommended competitive positioning
Content positioning: [how to position content vs competitors]
Tone positioning: [the voice to own that nobody else has]
Platform positioning: [which platforms to prioritise and why]
Format positioning: [the formats to lead with]

## 30-day competitive action plan
| Week | Action | Platform | Goal |
|------|--------|----------|------|
| 1 | ... | ... | ... |
| 2 | ... | ... | ... |
| 3 | ... | ... | ... |
| 4 | ... | ... | ... |
```

If the user asks for a file, save to
`OUTPUT_DIR/[Brand]-Competitor-Intel-[Date].md` and present it.
