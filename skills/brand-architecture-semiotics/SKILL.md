---
name: brand-architecture-semiotics
description: Brand architecture, distinctive asset strategy and applied semiotics. Solves entity confusion (multiple businesses sharing one name), builds distinctive asset systems that create memory structure, decodes category and retail visual codes, and diagnoses the cheap-versus-value, traditional-versus-modern and poor-versus-smart meaning axes. Use when a brand has namespace collision, sub-brands, a house-of-brands question, a descriptor or naming problem, a "which one are we" problem, or when the work needs semiotic decoding of category codes rather than generic positioning. Trigger on "brand architecture", "distinctive assets", "semiotics", "brand codes", "which [brand] is which", "entity separation", "descriptor", "naming", "memory structure", "category codes", "visual codes".
metadata:
  version: 1.0.0
---

# Brand Architecture, Distinctive Assets & Semiotics

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.


Three disciplines that solve one problem: making a brand findable, distinguishable and correctly meant.

---

## PART 1: ENTITY SEPARATION

Use when several businesses, branches, franchises, family offshoots or legacy entities share a name and consumers cannot tell them apart.

### Step 1: Map the namespace
Build a table before any strategy:

| Entity | Legal name | Category | Geography | Ownership link | Digital footprint | Consumer-visible name |
|---|---|---|---|---|---|---|

Include: genuine group entities, family splinters trading on the name, unrelated businesses with the same name, defunct entities still holding search real estate, and the semantic homonym (see below).

### Step 2: Diagnose the collision type
- **Semantic collision.** The name is also a common word, a religious term, a place or a poetic phrase. The name has no search ownership because the language already owns it. Fix with a descriptor and a compound lock-up, not with advertising weight.
- **Sibling collision.** Related entities under one house, unclear hierarchy. Fix with architecture.
- **Impostor collision.** Unrelated or estranged entities trading on equity. Fix with a distinctive asset system that cannot be copied, plus legal and channel control.
- **Legacy collision.** An old entity holds the memory and the new one holds the business. Fix with a heritage-transfer narrative.

Most real cases are two or three at once. Name them all.

### Step 3: Score consumer cost
For each collision, score 1 to 5:
- **Misdirected demand.** Do people arrive at the wrong entity.
- **Misattributed reputation.** Does the other entity's service failure land on us.
- **Diluted recall.** Can a consumer describe which one they mean.
- **Commercial leakage.** Does the confusion lose a transaction.

Only fix what scores. Confusion that costs nothing is a vanity problem.

### Step 4: Choose the architecture
- **Branded house.** One master brand, descriptors differentiate. Cheapest, weakest separation.
- **Endorsed.** Sub-brand leads, master endorses. Best when sub-brands need distinct meaning but shared trust.
- **House of brands.** Full separation. Most expensive, only justified when meanings actively repel each other.
- **Descriptor-led hybrid.** Master name plus a locked, always-present, category-explicit descriptor. Usually the correct answer for semantic collision, and the cheapest thing that actually works.

### Step 5: Write the separation test
One sentence a consumer must be able to complete unaided after exposure. If they cannot, the architecture failed. Write it before you design anything.

---

## PART 2: DISTINCTIVE ASSET STRATEGY

Positioning is what you mean. Distinctive assets are how you are recognised before anyone reads anything. In a namespace collision, assets do the work that the name cannot.

### The asset audit
List every candidate asset across these classes:

| Class | Examples |
|---|---|
| Colour | Single ownable shade, or a two-colour pairing |
| Shape | Silhouette, container form, architectural element, packaging geometry |
| Typography | A lock-up, an Arabic letterform treatment, a numeral style |
| Symbol | Mark, mascot, icon, motif |
| Sound | Sonic logo, jingle, in-store audio |
| Verbal | Tagline, a repeated phrase, a naming convention, a greeting |
| Behavioural | A ritual staff do, a service gesture, a delivery act |
| Spatial | Store layout, shelf logic, facade, lighting temperature |

### Score each asset on two axes
- **Fame.** What share of the category audience recognises it at all.
- **Uniqueness.** Of those who recognise it, what share attributes it to us and not to the category or a competitor.

Four outcomes:
- High fame, high uniqueness: **protect**. Do not redesign. Do not let a new agency "refresh" it.
- High fame, low uniqueness: **category code**. Necessary for legitimacy, useless for differentiation. Keep it, stop investing in it.
- Low fame, high uniqueness: **invest**. This is where the budget goes.
- Low fame, low uniqueness: **retire or rebuild**.

In practice in many markets, including {{MARKETS}}, you will rarely have measured fame data. Say so. Use a structured proxy: prevalence in category imagery, competitor overlap count, and a small qualitative recognition test. Grade the finding Inferred, not Measured.

### The local-script asset rule
In bilingual markets the local-script letterform (Arabic, in Arabic-speaking markets) is usually the most under-exploited distinctive asset available. A distinctive local-script wordmark travels further with the mass audience than a Latin one and is far harder for an impostor entity to copy convincingly. Always evaluate local-script-first asset options, not the local script as a translation of the Latin system.

### Memory structure
Assets only work if they are attached to a category entry point. For each asset, write the trigger: the moment, need or occasion at which the consumer should retrieve the brand. An asset with no entry point is decoration.

---

## PART 3: SEMIOTICS

Decoding what things already mean in a culture, so a brand can borrow, break or own that meaning deliberately rather than accidentally.

### The method
1. **Collect the corpus.** Category imagery, competitor assets, retail environments, packaging, ads, consumer-generated imagery. Minimum 20 artefacts across the price spectrum.
2. **Split by register.** Residual (fading codes, heritage, nostalgia), dominant (current category norm), emergent (early signals, where the category is heading).
3. **Name the codes.** For each: the signifier (what is literally there) and the signified (what it is understood to mean). Be specific. "Gold means premium" is not a finding. "Embossed gold on matte black means imported-premium, while flat gold on white means local-traditional-premium" is a finding.
4. **Map the axes.** Plot the category on the tensions that matter.
5. **Find the vacant quadrant.** Then test whether it is vacant because nobody claimed it or because it is uninhabitable.

### The four working axes for value retail

**Cheap vs Value**
- Cheap codes: crowded layouts, shouted numerals, red-and-yellow, visible discount stickers, unbranded bulk, fluorescent light, price as the hero.
- Value codes: calm space, one clear number, earned-quality proof, provenance, staff competence, price as the conclusion rather than the headline.
- The tell: cheap communicates to your wallet, value communicates to your judgement. Value flatters the shopper for being smart. Cheap reminds them they are constrained.

**Traditional vs Modern**
- In many markets, especially unstable or inflationary economies, traditional is not backward. It codes trust, continuity, family, and "these people will still be here next year." That is valuable equity in an unstable economy.
- Modern codes efficiency, transparency and standardisation, but can read as cold, foreign-owned, or as "they will upcharge me."
- The strongest local positions are usually not one or the other. They are traditional trust delivered with modern reliability, and both codes must be visibly present.

**Poor vs Smart**
- Poor codes: apology, constraint, "this is all you can afford."
- Smart codes: agency, discovery, "you found the thing others overpaid for."
- Same price point, opposite self-image. Smart is the only sustainable position for a value brand, because poor is a position the consumer will abandon the moment they can.

**Affordable vs Aspirational**
- These are not opposites. The strongest value brands in inflationary markets are aspirational about the shopper, not about the product. The product is honest. The shopper is elevated.

### Retail semiotics specifics
Read the store as a text. Entrance threshold, sightlines, aisle width, shelf height, lighting temperature and evenness, staff uniform and posture, where price sits relative to product, queue and payment ritual, exit experience, and what happens when something goes wrong. Each is a sentence the brand is saying whether it intends to or not.

---

## Output contract

- **Namespace map** with collision types and scored consumer cost.
- **Recommended architecture** with the one-sentence separation test.
- **Asset register**: keep / retire / invest, with the entry point for each kept asset.
- **Code map**: residual, dominant, emergent, with the artefacts cited.
- **Axis plot** with the vacant quadrant named and its habitability judged.
- **Three territories maximum**, each stated as a meaning the brand would own, not as a slogan.

## Hard rules

- Never recommend a rebrand where a descriptor plus asset discipline would solve it.
- Never present a semiotic reading without the artefacts it came from.
- Never redesign a high-fame high-uniqueness asset.
- Never propose an architecture the client cannot staff or fund.
- Always run the separation test before the creative work, not after.

## Reference files

- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.
