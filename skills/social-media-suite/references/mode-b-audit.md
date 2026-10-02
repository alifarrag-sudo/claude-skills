# Mode B: Social Media Audit

Trigger: `/social-audit [Brand]`, or "audit our social media", "how are we doing on
social", "grade our channels".

Produces a scored, actionable audit of the brand's own channels, from public data
only. Delivered as {{DELIVERY_FORMAT}} unless a file is requested.

Fact-consciousness applies throughout: every follower count and engagement rate is an
estimate from visible signals. Label them as estimates and tell the user to pull
native platform analytics for anything client-facing. Do not present a read of public
likes as a measured engagement rate.

Read `platform-profiles.md` alongside this file: the audit scores each channel
against that platform's actual rules.

---

## Phase B1: Channel discovery

If `ACTIVE_CHANNELS` was not given, find where the brand is. Prefer batched search
from {{TOOL_WEB_RESEARCH}} (one batch, all queries at once, geo-targeted to `MARKET`);
fall back to `web_search`.

```
[Brand] site:linkedin.com/company
[Brand] site:x.com OR twitter.com
[Brand] site:instagram.com
[Brand] site:tiktok.com
[Brand] site:youtube.com
[Brand] site:facebook.com
[Brand] site:pinterest.com
[Brand] site:threads.net
```

Scrape each profile found (batch scrape). Store as `DISCOVERED_CHANNELS`. Then
confirm with the user in one line: "Found [Brand] on [platforms]. Audit all of
these?" This is a quick list-confirm, not an approval gate.

## Phase B2: Per-platform audit

For each channel, study the last 20 to 30 posts and assess:

**Profile completeness (score /10):** profile photo/logo present and quality (2);
header/banner present, on-brand, current (2); bio clear, keyworded, with a CTA or
link (3); contact/website link correct (1); pinned post or highlight used well (2).
For bilingual brands, check the bio works in the audience's language, not only
English.

**Content performance (last 20 to 30 posts):**
- Posting frequency: actual vs recommended for this platform and market.
- Content mix: share of static / carousel / video / text / stories.
- Estimated engagement rate from visible likes and comments vs followers:
  Excellent >5%, Good 2 to 5%, Average 0.5 to 2%, Poor <0.5%. (Estimate, flagged.)
- Best content: top three by engagement, what they share.
- Worst content: bottom three, what pattern emerges.
- Hook quality: Strong / Weak / Absent.
- CTA usage: Consistent / Occasional / Never.
- Hashtag strategy: present, relevant, over/under-used.
- Visual consistency: Strong / Moderate / Inconsistent.
- Brand voice: Consistent / Varies / Off-brand. For bilingual brands, check the
  Arabic and English voices are both intentional, not one machine-translated.
- Cross-posting: Original / Mixed / Cross-posted.

**Audience signals:** follower count (growing, flat, declining from visible signals);
comment quality (substantive or emoji-only); response rate (does the brand reply);
community engagement (does the brand engage with others).

**What the audience is actually saying (insight mining):** go past counting comments to
reading them. Read `references/insight-mining.md` and run it on the brand's own comment
threads, harvesting the replies under the strongest and weakest posts (bilingually for
GCC/MENA). Surface what the audience praises, complains about, keeps asking for, and
quietly reveals about itself, anchored to verbatim quotes. This is often the most
valuable part of an audit: it turns "engagement is low" into "here is what your audience
is telling you and no one is answering". Store as `AUDIENCE_INSIGHT` and let it sharpen
the recommendations.

## Phase B3: Report

Deliver as {{DELIVERY_FORMAT}}, following {{HOUSE_STYLE_RULES}}.

```
# [Brand]: Social Media Audit
Date: [date]
Channels: [list]

## Executive summary
Overall Social Health Score: [X/100]
[3 to 5 sentences: what works, what's broken, the number-one fix]

Top 3 wins:
1. [specific]
2. [specific]
3. [specific]

Top 3 critical issues:
1. [specific, with impact]
2. [specific, with impact]
3. [specific, with impact]

## Platform by platform

### [Platform]: Score [X/100]
Profile health: [X/10]
[what's complete / missing / needs updating]

Content performance:
- Frequency: [X/week] vs recommended [Y/week]
- Mix: [% by format]
- Est. engagement: [%] ([band]), estimate from public signals
- Hook quality: [rating]
- CTA usage: [rating]
- Visual consistency: [rating]
- Original vs cross-posted: [%/%]

Best-performing patterns: [what the top posts share]
What's not working: [what the weak posts share]
Platform-specific observations: [e.g. hook buried in line 3; no on-screen text on
video so sound-off viewers get nothing]
Recommendations:
1. [priority, specific, measurable]
2. [priority]
3. [priority]

[repeat per platform]

## What your audience is actually saying
[The recommended named insight from AUDIENCE_INSIGHT, with 2 to 4 verbatim comments as
proof (Arabic originals with an English gloss where relevant). The one thing the
audience keeps telling the brand that the brand is not yet acting on.]

## Cross-platform analysis
Brand voice consistency: [Consistent / Varies / Fragmented] + note
Visual consistency: [Strong / Moderate / Inconsistent] + note
Content repurposing: [Strategic / Ad hoc / None] + note
Platform prioritisation: [does effort match opportunity]
Language execution (bilingual brands): [is the Arabic native and intentional]

## Priority action plan
| # | Action | Platform | Expected impact | Effort |
|---|--------|----------|-----------------|--------|
| 1 | ... | ... | ... | Low/Med/High |
| 2 | ... | ... | ... | Low/Med/High |
| 3 | ... | ... | ... | Low/Med/High |
| 4 | ... | ... | ... | Low/Med/High |
| 5 | ... | ... | ... | Low/Med/High |
```

If the user asks for a file, save to
`OUTPUT_DIR/[Brand]-Social-Audit-[Date].md` and present it.
