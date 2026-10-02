---
name: social-media-suite
description: >
  End-to-end social media intelligence and content production for one brand, across
  four capabilities that run alone or chained: a monthly content CALENDAR, a channel
  AUDIT, COMPETITOR intelligence with gap and whitespace analysis, and cultural
  INSIGHT mined from real comments and interactions. Use whenever the user wants to
  plan a month of content, audit or grade a brand's channels, benchmark competitors,
  find content gaps or whitespace, or mine what audiences actually say in comments for
  insight. Trigger on phrasings like "plan
  next month's posts for [brand]", "audit our channels", "how are we doing on social",
  "what are competitors doing", "find the gaps we can own", "what are people really
  saying in the comments", or "full social analysis for the [brand] pitch". Built for
  GCC and MENA: bilingual Arabic/English listening, never AI-renders Arabic. Do NOT
  trigger for a single one-off caption (that is social-content), paid media planning,
  or pure brand strategy with no social component.
---

# Social Media Suite

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.


A complete social intelligence and production system for one brand at a time. Three
modes, run individually or chained into a full suite.

| Mode | Command | What it produces |
|------|---------|------------------|
| A: Calendar | `/social-calendar [Brand] [Month Year]` | A full monthly content calendar (`.xlsx`) for the selected platforms, research-led and platform-native |
| B: Audit | `/social-audit [Brand]` | A scored, actionable audit of the brand's own channels |
| C: Competitor | `/competitor-audit [Brand]` | A comparison matrix plus gap and whitespace analysis vs named competitors |
| Full suite | `/social-suite [Brand] [Month Year]` | B, then C, then A, with the calendar informed by both |
| Insight (standalone) | `/insight-mine [Brand]` | Named cultural insights mined from real comments and interactions, each anchored to verbatim audience quotes |

Insight mining is not only a fifth command, it is a cross-cutting engine that runs
inside the other three modes. It takes the audience voice the suite scrapes (comment
threads, replies, quote-tweets, reviews, UGC) and excavates the non-obvious human
truth underneath, then anchors it to actual quotes. Read `references/insight-mining.md`
whenever you need to answer "what are people really saying" rather than "what did the
brand post". It roots the Mode A brief, sharpens the Mode B audit, and feeds the Mode C
whitespace section, and it can also run on its own.

The mode files carry the detail. Read the one you need when you need it:
- Calendar: `references/mode-a-calendar.md`
- Audit: `references/mode-b-audit.md`
- Competitor: `references/mode-c-competitor.md`
- Insight mining (cross-cutting): `references/insight-mining.md`
- Platform rules (every mode leans on this): `references/platform-profiles.md`
- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.

## The one hard rule about pausing

There is exactly one mandatory pause across all modes: after the narrative brief in
Mode A, before the calendar is built. Everything else runs to completion without
stopping to ask permission. Do not invent extra confirmation gates. The exceptions
are the two natural confirmation points below (competitor list, discovered channels),
which are quick list-confirms, not approval gates.

---

## House rules (the parts that are non-negotiable)

These apply to every output this skill produces. They are not stylistic suggestions.

**House style: {{HOUSE_STYLE_RULES}}.** These rules hold everywhere: in captions, in
reports, in the brief, and in this skill's own working notes back to the user. A
house-style slip is the quickest way to make the work look like it wasn't made by
the team, so hold the line on it.

**Arabic is never AI-rendered.** For GCC and MENA brands, any Arabic that appears in
a deliverable image, key visual, or caption card is typeset properly (Amiri or
Tajawal, RTL shaping via HarfBuzz or Pillow raqm), never generated as pixels by an
image model and never left as broken glyphs. In this skill's context that mostly
means: when you write Arabic captions or on-screen text, write them as real editable
Arabic text in the deliverable, and flag any Arabic-in-image asset for proper
typesetting at production. Do not silently drop the Arabic layer for a bilingual
brand.

**Decisions are offered as numbered options.** When you need the user to choose
(mode, platforms, competitor list), present a numbered list, not a paragraph of
prose they have to parse.

**Strategy deliverables follow the delivery format: {{DELIVERY_FORMAT}}, unless a
file is asked for.** The narrative brief (Mode A), the audit report (Mode B), and the
competitor report (Mode C) are strategy documents: deliver them in that format so
they go straight into the team's workflow, not saved as files by default. The one
genuine exception is the Mode A calendar itself, which is a
structured production artifact with dozens of rows and per-platform columns: that is
delivered as an `.xlsx` file. If the user explicitly wants any report as a file too,
give them a file.

**One proof before a batch.** Before generating a full month of calendar content,
show roughly three finished sample posts (a mix of platforms) and get a quick read.
Better to catch a tone or format problem on three than on sixty.

**Numbers are estimates, and you say so.** Follower counts, engagement rates, and
growth trends are read from public signals, not analytics access. Present them as
estimates and tell the user to pull native platform analytics for anything they will
put in front of a client as fact. Never launder a guess into a hard figure.

---

## Tool stack (use these, in this order)

This skill runs on the tools that are actually available in the user's setup, not
generic web tools. Reach for them in this priority.

1. **{{TOOL_WEB_RESEARCH}} is the primary listening and scraping layer.** Whatever the
   stack, use it for two jobs:
   - Batched, parallel search queries. For GCC and MENA brands, run the query set
     twice: once in English and once in Arabic, and geo-target the results to the
     target market (for example `SA` for Saudi, `AE` for UAE, `EG` for Egypt) so
     results reflect what that audience actually sees.
   - Batch scraping, to pull multiple profile or post URLs at once rather than
     fetching them one at a time.
2. **`web_search` and `web_fetch`** as the fallback when the primary stack is
   unavailable or for a quick single lookup.
3. **Chain listening skills where they add depth.** For Mode A community research
   and Mode C sentiment, the `deep-listening-intelligence` skill (GCC-first,
   bilingual) is the right companion for capturing real audience language. Use
   `global-insight-scout` when the user asks for a global rather than regional read.
4. **Outputs go to `{{OUTPUT_DIR}}`.** Present files to the user after saving.

If a needed connector is off (for example the primary scraping tool is not
connected), say so plainly and offer to proceed on `web_search`/`web_fetch` with a
note that GCC-market and Arabic-language depth will be thinner.

---

## Step 0: Route the request and gather context

### 0a: Pick the mode

If the ask is clear ("audit our channels", "build the June calendar"), skip straight
to that mode. If it is ambiguous ("help with social media"), ask:

> What would you like to do?
> 1. Build a monthly content calendar
> 2. Audit our existing social channels
> 3. Analyse competitors and find content gaps
> 4. Mine real comments and interactions for cultural insight
> 5. All of the above (full suite, most complete)

### 0b: Gather brand context

Pull what you can from the conversation; ask only for what is genuinely missing.

```
BRAND_NAME      brand name, e.g. the trading name used on its social handles
BRAND_URL       primary website, required for all modes
MARKET          target market(s), e.g. "KSA", "UAE", "Egypt" (drives geo-targeting and language)
TARGET_MONTH    Month Year, required for Mode A only, e.g. "August 2026"
ICP_HINT        optional, who they sell to
COMPETITORS     names/URLs, required for Mode C; discover if not given
LANGUAGE        output language(s): English, Arabic, or bilingual (default bilingual for GCC/MENA)
OUTPUT_DIR      default {{OUTPUT_DIR}}
```

`MARKET` and `LANGUAGE` are the additions that make this work for GCC and MENA. If
the brand is clearly a Gulf or Egyptian brand and the user has not said otherwise,
default `LANGUAGE` to bilingual and set the geo-targeting accordingly.

### 0c: Channel selection (Mode A)

Ask which platforms the calendar should cover:

> Which platforms this month? Pick any:
> 1. LinkedIn
> 2. X (Twitter)
> 3. Instagram (Feed + Reels)
> 4. Instagram Stories
> 5. Facebook
> 6. TikTok
> 7. YouTube Shorts
> 8. YouTube (long-form)
> 9. Threads
> 10. Pinterest
> 11. Reddit (community engagement)
> 12. All major (LinkedIn, X, Instagram, Facebook, TikTok, YouTube Shorts)

Store as `ACTIVE_CHANNELS`. If the user says "all" or nothing, default to option 12.
For Modes B and C, discover the brand's live channels automatically rather than
asking (see those mode files).

---

## Running the modes

- **Single mode:** read that mode's reference file and run it.
- **Insight only (`/insight-mine`):** read `references/insight-mining.md`, harvest the
  comment and interaction corpus, and deliver named insight candidates. No calendar or
  audit attached. This is the fastest way to answer "what are people actually saying".
- **Full suite (`/social-suite`):** run Mode B (audit) to establish the baseline,
  then Mode C (competitor) for the landscape, then Mode A (calendar) with the brief
  in Phase 4 explicitly folding in: audit weaknesses to fix this month, competitor
  gaps to own this month, and the brand's own best-performing formats to double down
  on. This is the strongest way to run the skill because the calendar is not just
  research-led, it is audit-led and competitor-aware.

## Output summary

| Mode | Deliverable | Form |
|------|-------------|------|
| A | Narrative brief (rooted in the audience insight) | {{DELIVERY_FORMAT}} (the approval gate) |
| A | Content calendar | `.xlsx` in `OUTPUT_DIR` |
| B | Audit report (with a "what your audience is saying" section) | {{DELIVERY_FORMAT}} (file on request) |
| C | Competitor report (whitespace backed by mined comments) | {{DELIVERY_FORMAT}} (file on request) |
| Insight | Named insight candidates with verbatim evidence | {{DELIVERY_FORMAT}} |
| Suite | All of the above | As above |

Insight mining runs inside A, B, and C by default (it is where the comment corpus
already exists), and also stands alone via `/insight-mine`.

## Requirements

Python 3.8+ and `openpyxl` (`pip install openpyxl --break-system-packages`) for the
Mode A calendar. A batch search and scraping stack ({{TOOL_WEB_RESEARCH}}) strongly recommended for GCC/MENA depth;
`deep-listening-intelligence` recommended for Mode A Phase 3 and Mode C sentiment.
