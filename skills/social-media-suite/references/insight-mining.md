# Insight Mining from Comments and Interactions

This is the suite's cultural-insight engine. It takes the raw audience voice the suite
already scrapes (comment threads, replies, quote-tweets, reviews, forum posts, UGC)
and excavates the non-obvious human truth underneath it. It is adapted from the
`cultural-insight-mining` skill, with one difference: that skill mines a brief; this
one mines what real people actually said, and anchors every insight to verbatim
comments so it survives a pitch room.

Every mode calls this. Mode A uses it to root the narrative brief. Mode B uses it to
hear what the brand's own audience is really saying. Mode C uses it to find the unmet
need in competitors' comment sections that becomes whitespace.

An insight is not an observation, a statistic, or a category truth everyone knows. It
is a revealed tension: non-obvious, charged (it has a "yes, but" in it), actionable,
and felt rather than merely known. The test: read it aloud. A slow nod and "hm, that's
true" means insight. "Yeah, obviously" means observation. Confusion means it is a
thought, not yet an insight.

---

## Step 0: Harvest the raw voice (the part the suite skips by default)

Reading posts is not enough. The insight lives in the replies, not the caption. Before
mining, deliberately pull comment-level data. Batch-scrape the comment and review
surfaces with {{TOOL_WEB_RESEARCH}}, run bilingually (English and Arabic) with results
geo-targeted to `MARKET`. `deep-listening-intelligence` is the right companion skill here.

Sources to harvest, in rough order of signal quality:
- Comment threads under the brand's own top and bottom posts (praise, complaints,
  questions, tag-a-friend behaviour).
- Comment threads under competitors' posts (this is where defection and unmet need
  surface most honestly).
- Quote-tweets and reply chains on X.
- Reviews (App Store, Google, Trustpilot, category sites, and regional review
  surfaces where Western sites are thin).
- Relevant Reddit threads and forum discussions.
- Recurring DMs or FAQs the brand surfaces publicly, if any.

Capture each meaningful comment verbatim, with: source (platform + which post/brand),
language, and a faithful English gloss if the original is Arabic. Do not paraphrase at
harvest time. The exact words are the evidence, and Gulf and Egyptian dialect phrasing
often carries the emotional charge that MSA translation flattens.

Store as `VOICE_CORPUS`.

## Step 1: Read before you mine

Sit with the corpus before analysing it. Cluster comments by what they are really
doing: venting, defending, comparing, asking permission, signalling identity, warning
others, quietly bragging, seeking reassurance. The emotional job a comment performs
matters more than its topic. Note the phrases that repeat: repeated language is the
audience handing you their own words.

## Step 2: Five mining lenses

Run the corpus through all five. Each is a different route to the non-obvious truth.

**Lens 1, the behavioural contradiction.** Where do commenters say one thing and do
another? Where does stated value diverge from actual behaviour visible in the thread?
The gap is where insight lives. Frame: "They say they want X, but in the comments they
actually do Y, because..."

**Lens 2, the cultural tension.** What push-pull is this audience living through:
tradition vs modernity, aspiration vs reality, public identity vs private self? In the
GCC specifically, watch the tension between collective expectation and individual
desire. Frame: "On the surface they want A, but underneath the comments are quietly
negotiating B..."

**Lens 3, the category assumption nobody challenges.** What does every brand in this
category assume, that the comments quietly resent or contradict? Frame: "Every brand
here assumes X, but the audience keeps saying..."

**Lens 4, the unarticulated want.** What do commenters want that they have never
cleanly named? Not the stated need, the emotional job underneath it. The comments circle
it without saying it. Frame: "What they are really asking for is not [stated need], it
is [deeper emotional need]..."

**Lens 5, the cultural moment.** What has shifted right now, in this market and
generation, that makes this conversation urgent? What in the comments would not have
appeared two years ago? Frame: "Something changed: [shift], which means the audience is
now [different emotional state]..."

## Step 3: The insight statement

Crystallise the strongest findings into named insights. Produce two to three candidates,
not one: the first is rarely the best. Label them Primary, Alternative 1, Alternative 2.

```
INSIGHT NAME: [2 to 5 evocative words that capture the tension]

THE TRUTH: [1 to 2 sentences. The non-obvious human truth, written in the audience's
voice, not clinical. It should feel true read aloud.]

THE TENSION: [1 sentence. The "yes, but" friction inside the truth that makes it useful.]

WHY NOW: [1 sentence. What makes this the right moment for a brand to step in.]

BRAND ENTRY POINT: [1 sentence. The specific, authentic angle from which THIS brand can
own this truth without forcing it.]

EVIDENCE: [2 to 4 verbatim comments that ground the insight, each with source and, for
Arabic, the original plus an English gloss. This is what makes the insight defensible.
No invented quotes: if the corpus does not support it, it is not yet an insight.]
```

The EVIDENCE field is the addition that matters. An insight with no comment behind it is
a hunch. Never fabricate a quote to fit a nice-sounding insight; find a real one or drop
the insight.

## Step 4: GCC cultural filters

GCC work fails when it applies generic Arab tropes. Run each insight through the specific
texture before finalising.

- **Saudi:** Vision 2030 opened a permission structure for aspiration, but aspiration is
  earned, not declared. Under-35s (around 65% of the population) are not their parents and
  are not abandoning them. Social proof runs through community and family even when the
  behaviour is individual. Humility codes still operate under new legitimacy for
  lifestyle and ambition.
- **Kuwait:** Identity is invested in distinction (from the region, from newcomers).
  Generosity is structural social currency, not performance. Luxury is expected;
  boasting about it is not.
- **UAE:** The audience is plural (national identity and expat ambition at once).
  Aspiration is usually outward-facing, what the world sees.
- **Egypt:** Humour and self-deprecation are load-bearing; dialect carries warmth and
  irony that MSA loses. Value-consciousness sits next to real aspiration without
  contradiction.
- **Pan-GCC:** Ramadan is an emotional state, not a media slot. Family is the primary
  decision unit even for individual choices. Arabic and English carry different
  emotional registers for the same person, so translation is not equivalence.

For deeper regional texture, chain the `cultural-insight-mining` and `gcc-cultural-decoder`
skills; this section is the working subset.

## Output format

Deliver as {{DELIVERY_FORMAT}}, following {{HOUSE_STYLE_RULES}}.

```
# [Brand]: What the Audience Is Actually Saying
Sources mined: [platforms/threads/reviews] | Comments read: [approx count] | Languages: [x]

## Immersion notes
[What the corpus is really doing: the emotional jobs, the repeated phrases, the mood]

## Mining notes
[The single most interesting finding from each of the 5 lenses, one line each]

## Insight candidates
Primary: [full insight block with EVIDENCE]
Alternative 1: [full block with EVIDENCE]
Alternative 2 (optional): [full block with EVIDENCE]

## Recommended direction
[One short paragraph: which insight to build on and why it is strongest and most
ownable for this brand]
```

## Tone and voice

Plain, charged language. No jargon, no consulting-speak, no passive voice. An insight
should read like something a perceptive person said after sitting with a community for
six months, not something generated from a spreadsheet.

Weak: "Consumers in the 18 to 34 cohort demonstrate increasing desire for authentic
self-expression within culturally sanctioned parameters."

Strong: "They want to be seen as individuals, but only by people who already get them.
Public boldness terrifies them. Private ambition drives everything."

## How each mode plugs in

- **Mode A:** run after Phase 3 listening. The insight candidates become the root of the
  narrative brief's pillars, so the month is built on a truth, not a topic list.
- **Mode B:** run on the brand's own comment threads. It answers "what is our audience
  actually telling us" and sharpens the audit's recommendations.
- **Mode C:** run on competitors' comment threads. Unmet needs and complaints found here
  feed directly into the whitespace section, with the comment as proof.
- **Standalone:** run on its own when the user just wants the insight from the
  conversation, with no calendar or audit attached.
