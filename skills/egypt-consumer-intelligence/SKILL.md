---
name: egypt-consumer-intelligence
description: Egypt-first consumer, language and cultural intelligence. Runs Arabic-first listening and digital ethnography on Egyptian audiences, covering Egyptian Colloquial Arabic (ECA), Franco-Arabic, slang, dialect detection, Arabic search-query expansion, Arabic sentiment, and the post-devaluation consumer economics that govern how Egyptians actually spend. Use whenever a brief, audience, listening task, insight hunt, copy check or market question concerns Egypt or Egyptian consumers. Trigger on "what are Egyptians saying", "Egyptian audience", "Egyptian Arabic", "عامية مصرية", "Franco", "trading down", "الغلاء", "listen to the Egyptian market", or any Egypt-market brief. Companion to gcc-cultural-decoder (Gulf) and deep-listening-intelligence (GCC-first); this one is the Egypt equivalent and takes precedence for Egyptian work.
metadata:
  version: 1.0.0
---

# Egypt Consumer & Arabic Intelligence

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.


Egypt is not a GCC market with a different accent. The money works differently, the status codes work differently, and the language is a separate register with its own comedy, complaint and bargaining vocabulary. Never port a Gulf insight into Egypt without re-testing it here.

## Operating principle

**Arabic-first, English-second.** English-only listening on an Egyptian audience returns the expat, the marketer and the press release. It does not return the consumer. If a research pass produced only English sources, the pass is incomplete and must be marked as such in the evidence ledger.

---

## 1. Language layers to search and read

Egyptian consumers write in four registers at once. Query all four or you miss most of the corpus.

| Layer | Looks like | Where it lives |
|---|---|---|
| MSA (فصحى) | Formal, press, corporate | News, official pages, PR |
| Egyptian Colloquial (عامية) | How people actually talk | Comments, groups, reviews, TikTok captions |
| Franco-Arabic (Arabizi) | `3ayez`, `7elw`, `2olt`, `msh 3arf` | Younger skew, older Facebook habit, DMs, some comments |
| Code-switched | `الprice غالي` / `delivery وحش` | Middle and upper segments, e-commerce reviews |

### Franco-Arabic transliteration key
`2` = ء/أ, `3` = ع, `5` or `kh` = خ, `6` = ط, `7` = ح, `8` or `gh` = غ, `9` = ص, `q`/`2` = ق, `g` = ج (Cairene hard g)

When expanding a query, generate the Franco variants of the core term, not just the Arabic. `مش حلو` also appears as `msh 7elw`, `mesh helw`, `m4 7lw`.

### Vocabulary that actually signals meaning

Value and price:
- `غالي` expensive, neutral. `بيسرق` / `حرامي` he is robbing us, anger. `مولع` / `نار` prices on fire.
- `رخيص` cheap, and it is usually an insult about quality, not a compliment about price.
- `بسعره` / `يستاهل` / `فلوسه فيه` worth its price. This is the value phrase. Note it is NOT `رخيص`.
- `لقطة` a steal, a find. Positive, smart-shopper framing.
- `على قد الإيد` within reach, modest but dignified.
- `تقليد` / `صيني` imitation, low trust. `أصلي` original, high trust.

Trust and recommendation:
- `تجربتي` my experience. The single highest-signal comment opener in Egyptian reviews.
- `أنصح` / `ماتشتريش منهم` recommend / do not buy from them.
- `ناس محترمة` decent people, the relational trust marker that matters more than product specs.
- `نصب` a scam. Reputational red alert, track it.

Quality and service:
- `وحش` bad, `زفت` rubbish, `تحفة` / `جامد` / `تجنن` excellent.
- `معاملة` treatment, how staff behaved. Often outranks product in Egyptian complaint threads.
- `مستريح` at ease. The CX goal state.

Status and aspiration:
- `شياكة` sharp, put-together. `على الآخر` all out. `بريستيج` borrowed prestige.
- `فشخرة` / `منظرة` showing off. Can be mocking, watch valence carefully.
- `بيت محترم` a respectable household. Family-respectability framing beats individual-luxury framing in most Egyptian categories.

Complaint and humour:
- Egyptians complain through jokes. A meme is a complaint with the anger removed. Treat viral jokes about a category as primary sentiment data, not as noise.

---

## 2. Arabic search-query expansion protocol

Do this before any Egypt listening run.

1. **Write the seed term in all four spellings**: MSA, Egyptian colloquial, Franco, English.
2. **Add the intent modifier** in Egyptian, not MSA:
   - Reviews: `تجربتي مع`, `رأيكم في`, `ينفع`, `حد جرب`
   - Price: `سعر`, `بكام`, `غالي ولا رخيص`, `أرخص`
   - Comparison: `ولا`, `الفرق بين`, `أحسن`
   - Complaint: `مشكلة`, `شكوى`, `نصب`, `ماتشتريش`
3. **Add the geography**: `مصر`, `القاهرة`, `الإسكندرية`, plus the district if relevant. Brand names collide across markets and eras without it.
4. **Disambiguate proper nouns.** Egyptian brand names routinely collide with religious, poetic or historical vocabulary. Always qualify with category plus geography plus a commercial modifier (`فرع`, `فروع`, `أسعار`, `شركة`, `محل`, `أونلاين`) or the search returns the semantic homonym, not the business.
5. **Run the platform-scoped variant**: `site:facebook.com`, `site:reddit.com`, `site:tiktok.com`, `site:youtube.com`, plus `جروب` for Facebook group content.
6. **Log null results.** A query that returns nothing is evidence about category salience. Record it.

---

## 3. Where Egyptians actually talk

Ranked by usefulness for consumer listening, not by user numbers.

1. **Facebook groups.** Still the centre of Egyptian consumer discourse. Buying-and-selling groups, neighbourhood groups, `ستات مصر` style groups, brand complaint groups. Highest-density source for real purchase language.
2. **Facebook page comments** on brand and news posts. Complaint-heavy, unfiltered.
3. **TikTok comments.** Youth, price-reveal content, `جربت` hauls. Captions are often Franco.
4. **YouTube comments** on review and unboxing videos. Long-form opinion, good for reasons-to-believe.
5. **Google Maps reviews.** The most underused Egyptian source. Branch-level service truth, Arabic-heavy, timestamped, geolocated. Critical for retail.
6. **Marketplace reviews**: Amazon.eg, Noon Egypt, Jumia. Verified-purchase language.
7. **Reddit** r/Egypt. English-skewed, educated, young, urban. Useful but not representative. Label it as such.
8. **X**. Political and media skew in Egypt. Low commercial signal. Deprioritise.

### Access honesty rule
Check which listening and scraping tools are actually connected in this setup ({{TOOL_WEB_RESEARCH}}). Where platform APIs are not connected, everything above is reached through search-engine indexed results, public pages and permitted scraping. Say so. Never present search-indexed comment fragments as if they were a platform-native listening export, and never quantify share of voice from them.

---

## 4. Egyptian consumer economics (the layer that governs everything)

Since the successive EGP devaluations, Egyptian purchase behaviour is organised around protecting dignity while spending less. The standard behaviours to look for:

- **Trading down without admitting it.** Switching to a cheaper brand while keeping the ritual intact. The consumer needs a story that is not "I got poorer."
- **Pack-size migration.** Smaller pack, same brand, more often. Watch for `العبوة الصغيرة` language.
- **Occasion compression.** Fewer occasions, higher spend per occasion. The remaining occasions become more emotionally loaded, not less.
- **Instalment normalisation.** `تقسيط` is mainstream across income levels, not a subprime signal. Valu, Contact, Aman, Sympl, bank instalment plans, and merchant-level `تقسيط بدون فوائد`.
- **Cash-back and bank-offer hunting.** Offer literacy is high. Consumers know which card gets which discount at which chain.
- **Gold and durable-goods hedging.** Big-ticket purchase timing is inflation-driven, not need-driven.
- **Price memory and anger.** Egyptians remember the old price and say it out loud. Any pricing communication that ignores price memory reads as contempt.

### The cheap / value distinction (load-bearing)
`رخيص` cheap carries shame and quality doubt.
`بسعره` / `يستاهل` / `لقطة` value carries pride and cleverness.
A brand that wins on affordability in Egypt must be positioned in the second vocabulary, never the first. Getting this wrong is the single most common failure in Egyptian value-brand communication.

---

## 5. Digital ethnography protocol

Do not stop at "what are they saying." Run all five passes.

1. **Verbatim capture.** Collect actual strings in the original script. Never paraphrase into English before analysis. Translation destroys the signal.
2. **Language coding.** Tag each verbatim: register (MSA / colloquial / Franco / code-switched), valence, speaker role (buyer, non-buyer, staff, reseller).
3. **Tension mapping.** Name the contradiction the consumer is living inside, in their own words. Format: "They say X, they do Y, because Z is not sayable."
4. **Ritual mapping.** What is the occasion, who else is present, who decides, who pays, who is being impressed. Egyptian purchase is rarely solo.
5. **Silence mapping.** What is conspicuously absent from the conversation. Absence is data. Record it as an explicit finding, not as a gap in the research.

---

## 6. Output contract

Every Egypt intelligence pass returns:

- **Verbatims** in original script, with source URL and date, minimum 10, translated into {{OUTPUT_LANGUAGE}} only in a parallel column.
- **Language register split** as a rough count, so the reader can see whether the corpus was Arabic-first or accidentally English-first.
- **Three to five cultural tensions**, each phrased as a consumer sentence, not an analyst sentence.
- **Vocabulary ledger**: the exact words the category uses for good, bad, expensive, worth-it, trusted.
- **Source quality grade** per finding: Measured (counted from a real corpus), Stated (a named source says it), Inferred (reasoned, not evidenced). Never let Inferred travel forward as Measured.
- **Coverage note**: which platforms were reachable and which were not.

## Hard rules

- Never AI-render Arabic into an image. Arabic is typeset, never generated.
- Never translate a verbatim and then analyse the translation.
- Never quantify sentiment percentages from search-indexed fragments. Describe shape, not share.
- Never use Gulf vocabulary in Egyptian copy or Egyptian analysis.
- If the Arabic corpus is thin, say the corpus is thin. Do not backfill with reasoning.

## Reference files

- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.
