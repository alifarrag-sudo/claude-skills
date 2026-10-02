---
name: loyalty-cx-commerce
description: Retail CX, CRM, loyalty programme design and partnership and payments strategy for MENA markets, with an Egypt payments-ecosystem research layer. Covers service blueprinting, journey mapping, friction analysis, lifecycle and first-party data strategy, points economics, tiering, cashback, gamification, member value proposition, and bank, fintech, wallet, telco and coalition partnership design. Use for loyalty programme design or diagnosis, retention and reactivation strategy, customer journey or service design work, omnichannel experience, or any question about cashback, instalments, BNPL, wallets or bank offers in Egypt. Trigger on "loyalty", "points", "tiers", "cashback", "retention", "churn", "CRM strategy", "journey map", "service blueprint", "customer friction", "partnership", "bank offer", "BNPL", "تقسيط", "wallet", "Fawry", "InstaPay", "Valu".
metadata:
  version: 1.0.0
---

# Loyalty, CX, CRM, Partnerships & Payments

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.


Four disciplines that share one substrate: what the business knows about a customer, and what it does with that knowledge across visits.

The market guidance below is written for MENA, with an Egypt payments layer. When the brief sits in one of the user's other markets ({{MARKETS}}), keep the frameworks and re-research the market-specific parts (identifiers, mechanics that suit the economy, the payments ecosystem) with the same verification rule.

---

## PART 1: CX AND SERVICE DESIGN

### Journey map vs service blueprint
A journey map is what the customer experiences. A service blueprint is what the organisation must do to make that happen. Deliver both or the journey map becomes a wish list.

**Blueprint layers**, top to bottom:
1. Physical evidence (what the customer sees or touches)
2. Customer actions
3. Frontstage (staff and interfaces the customer sees)
4. Backstage (staff and systems the customer does not see)
5. Support processes (supply, IT, finance, HR)
6. Time and ownership (how long each step takes, who owns it)

The line of visibility sits between 3 and 4. The line of internal interaction sits between 4 and 5. Most failed CX strategies die below the line of visibility, because nobody costed the backstage change.

### Friction analysis
For each journey step score:
- **Effort**: steps, time, cognitive load, documents required
- **Uncertainty**: does the customer know what happens next
- **Recovery**: what happens when it goes wrong, and who has authority to fix it
- **Dignity**: does the step make the customer feel competent or foolish

In Egypt and the Gulf, dignity and recovery outrank effort. A slow process handled respectfully beats a fast process handled dismissively, and `معاملة` (treatment) is the word consumers reach for first in complaint threads. Weight accordingly.

### Experience principles
Write three to five. Each must be decidable: a staff member or designer facing a real trade-off can use it to choose. "Be customer-centric" is not a principle. "Never make the customer explain the problem twice" is.

---

## PART 2: CRM AND LIFECYCLE

### First-party data strategy comes first
Before any lifecycle design, answer:
- What identifier links a visit to a person (phone number is usually the only workable one in Egypt)
- What is captured at what moment, and what does the customer get in return for giving it
- Where does it live, who can query it, what is the consent basis
- What is the minimum viable dataset: identity, recency, frequency, monetary value, category mix, channel

If the answer is "we do not have this", the loyalty programme is a data-acquisition project first and a rewards project second. Say that plainly rather than designing rewards on top of nothing.

### Lifecycle stages and the job of each
| Stage | Job | Primary metric |
|---|---|---|
| Acquire | First transaction | Cost per first purchase |
| Onboard | Second transaction | Rate of first-to-second conversion |
| Grow | Basket and category expansion | Category penetration per member |
| Retain | Frequency maintenance | Inter-purchase interval |
| Reactivate | Recover lapsed | Win-back rate by lapse depth |
| Advocate | Referral and review | Referred members per active member |

The second purchase is the highest-leverage moment in almost every retail dataset. Most programmes over-invest in acquisition and under-invest here.

### Frequency analysis
Segment by RFM before designing anything. Then check the distribution shape: if a small share of members drives most revenue, the programme must be built for them and made merely pleasant for everyone else. If revenue is flat across members, a tiered programme will underperform and a simpler value-back mechanic is better.

---

## PART 3: LOYALTY PROGRAMME DESIGN

### Points economics
Get the arithmetic right before the creative. Four numbers:
1. **Earn rate**: points per currency unit spent
2. **Redemption value**: currency value per point when redeemed
3. **Effective give**: earn rate multiplied by redemption value, expressed as a percentage of spend. This is the real discount.
4. **Breakage**: the share of points never redeemed, which reduces true cost

A typical retail effective give sits in the low single digits of spend. Anything approaching double digits must be funded by a proven incremental behaviour change, not by hope. Model the programme as: incremental margin from changed behaviour, minus effective give net of breakage, minus platform and operational cost. If that is negative, the programme is a discount with extra steps.

### The subsidy question
Every loyalty programme rewards behaviour that would have happened anyway. Estimate the share. A programme that pays 3 percent to customers where only 20 percent of rewarded spend is incremental is paying 15 percent on the spend that actually changed. Make this visible to the client early.

### Mechanic selection
- **Points**: flexible, familiar, slow to gratify, needs scale and a redemption catalogue.
- **Cashback or instant value-back**: simplest, strongest in inflationary markets, weakest at building emotional attachment. Usually the right first mechanic in Egypt.
- **Tiers**: works only where status is visible and the top tier is genuinely aspirational and reachable. Invisible status is wasted spend.
- **Stamps and punch-card**: high-frequency low-ticket categories only.
- **Surprise and delight**: cheap, memorable, unbudgetable at scale. Use as garnish.
- **Gamification**: streaks, progress bars, challenges. Lifts engagement metrics reliably and revenue occasionally. Never let engagement metrics stand in for commercial proof.
- **Paid membership**: strongest retention mechanic that exists, but requires a benefit stack worth more than the fee to the heavy user and visibly so at the point of sale.

### Member value proposition
Write it as one sentence the member would say, containing: what I do, what I get, how fast I get it. If the sentence needs a footnote, the programme is too complex. Complexity in loyalty is not sophistication, it is breakage by design, and consumers eventually name it as such.

### Tiering rules
- Three tiers maximum for most retail.
- The entry tier must give something on day one.
- The top tier must be achievable by a real customer in a real year.
- Publish the qualification threshold. Hidden thresholds destroy trust.
- Decide the downgrade policy before launch, not at the first renewal cycle.

---

## PART 4: PARTNERSHIPS AND ECOSYSTEM

### Partnership types, ranked by effort
1. **Offer partnerships**: a discount for another party's customers. Fast, low commitment, low durability.
2. **Payment partnerships**: bank card offers, wallet promotions, instalment provider tie-ups. Medium effort, strong volume effect, competitive on cost.
3. **Distribution partnerships**: presence in another party's channel.
4. **Coalition loyalty**: shared currency across merchants. High effort, high value, needs a credible neutral operator and real scale.
5. **Employee benefit schemes**: corporate deals as a B2B2C acquisition channel. Chronically underused, low cost, high intent.

### Partnership evaluation
For each candidate, assess: audience overlap versus audience extension (extension is worth more), brand fit on the value axes, what each side gives and gets, the operational burden at branch level, exclusivity terms, and the exit. If the partnership requires branch staff to do something new, the branch will decide whether it succeeds. Budget for that.

---

## PART 5: EGYPT PAYMENTS AND FINTECH RESEARCH LAYER

**Research only. Never execute, initiate or advise on a financial transaction. Never provide personalised financial advice.**

### Ecosystem categories to research for any Egyptian retail brief
- **Bank cards and bank offer programmes**: the major Egyptian retail banks run merchant discount and instalment campaigns that consumers actively track.
- **Domestic scheme**: Meeza, the national card scheme, with its own merchant economics.
- **Account-to-account**: InstaPay, the instant transfer rail, and its growing use at merchant level.
- **Mobile wallets**: the telco-operated wallets and bank wallets.
- **Payment aggregators and gateways**: Fawry and others, both as acceptance infrastructure and as a consumer-facing bill and payment brand.
- **Instalment and BNPL providers**: a crowded and fast-moving category in Egypt, spanning card-based instalment plans, standalone consumer-finance apps, and merchant-embedded checkout financing.
- **Cashback platforms and aggregator apps** that sit on top of bank offers.

### Mandatory verification rule
The Egyptian fintech landscape changes faster than any model's training data. Every provider name, fee, tenor, merchant discount rate, regulatory status and partnership must be verified by live search before it enters a deliverable, and cited with a date. Provider names recalled from training are a starting list for searching, never a finding. If verification is not possible, mark the item Unverified and leave the number blank rather than estimating it.

---

## Output contract

- **Journey map plus service blueprint** for the priority journeys, with the visibility line drawn.
- **Friction register** scored on effort, uncertainty, recovery, dignity.
- **Data readiness assessment** before any programme design.
- **Programme model**: earn rate, redemption value, effective give, breakage assumption, incrementality assumption, net position. Assumptions labelled as assumptions.
- **Member value proposition** as a one-sentence member quote.
- **Partnership shortlist** with the give, the get and the branch-level operational cost.
- **Payments landscape** with every item dated and sourced.

## Hard rules

- Never design rewards before establishing the identifier and the data path.
- Never present a loyalty model without the incrementality assumption stated.
- Never quote an Egyptian fintech fee, rate or provider status without a live-verified source and date.
- Never recommend a mechanic the client's POS and branch staff cannot execute.
- Never let engagement metrics substitute for commercial proof.

## Reference files

- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.
