# claude-skills

Strategy, insight and workflow skills for Claude Code and claude.ai, written for brand strategists, planners and the agencies they work in.

Every skill **sets itself up on first use**. The first time you run one, it looks for `config/user-config.md` inside its folder. If that file is missing or still has `{{PLACEHOLDERS}}`, it fills what it can from what Claude already knows about you (memory, CLAUDE.md, your profile, your projects), then asks you only for what is still missing, one question at a time, each with a suggested answer. Your answers are saved to `config/user-config.md`, which is git-ignored, so your details never get committed back.

## Install

Copy any skill folder from `skills/` into `~/.claude/skills/` (Claude Code), or zip the folder and upload it in claude.ai under Settings, Capabilities, Skills. Then just describe the task: each skill triggers from its description.

## The skills

### Strategy chain

These work alone or as a chain: interrogate the brief, listen, find the insight, make the leap, write it, structure it, attack it.

| Skill | What it does | Who it's for |
|---|---|---|
| [brief-interrogation](skills/brief-interrogation) | Pressure-tests a brief before any strategy is written: five ways briefs mislead, eight interrogation questions, and a one-sentence reframed brief. | Strategists and account leads starting a pitch or campaign. |
| [deep-listening-intelligence](skills/deep-listening-intelligence) | A field-research method for capturing real audience voice across platforms, languages and dialects (six listening streams, with deep Gulf Arabic coverage), producing a report ready for insight mining. | Strategists and researchers grounding a brief in what audiences actually say. |
| [cultural-insight-mining](skills/cultural-insight-mining) | Digs the non-obvious human or cultural tension out of a brief and turns it into named, testable insight statements, with a deep Gulf reference built in. | Planners who need a culturally specific insight before strategy or creative work. |
| [global-insight-scout](skills/global-insight-scout) | Sweeps any market, language and platform for human truths and trends, then translates the strongest findings into your home markets with a timing and opportunity read. | Strategists who want global inspiration turned into locally usable insight. |
| [insight-to-idea-leap](skills/insight-to-idea-leap) | Turns a true insight into a brand idea through six reframing moves, a naming guide and a provocation test. | Strategists and creative leads stuck between the insight and the idea. |
| [competitive-blind-spot-finder](skills/competitive-blind-spot-finder) | Maps a category's visual, verbal, audience and emotional conventions, then runs five blind-spot lenses and a durability test to find positioning territory no competitor owns. | Brand strategists positioning in a crowded category. |
| [brand-storytelling-voice](skills/brand-storytelling-voice) | Writes and edits strategy language so insights, brand ideas and deck copy land with weight, not just clarity. | Strategists and brand writers whose documents read flat or corporate. |
| [strategic-narrative-architecture](skills/strategic-narrative-architecture) | Structures strategy decks and pitches as a five-act narrative, with slide titles written as arguments, transition language and a narrative audit. | Strategists building decks that have the content but don't land. |
| [strategy-red-team](skills/strategy-red-team) | Adversarial review: assumption ledger, pre-mortem, competitor attack simulation, strongest counterargument and a client-room test, ending with the strongest objection still standing. | Anyone who wants a strategy attacked before the client sees it. |
| [fact-conscious-response](skills/fact-conscious-response) | Adds confidence labels, search-before-citing for time-sensitive figures, and a clear split between verified fact, assumption and opinion. | Anyone putting AI-assisted numbers or claims into client work. |

### Markets and categories

| Skill | What it does | Who it's for |
|---|---|---|
| [gcc-cultural-decoder](skills/gcc-cultural-decoder) | Country-level Gulf cultural intelligence (Saudi Arabia, Kuwait, UAE, Qatar): communication codes, Ramadan and seasonal timing, and psychological audience portraits. | Teams making work for Gulf audiences. |
| [egypt-consumer-intelligence](skills/egypt-consumer-intelligence) | Arabic-first listening and digital ethnography for Egypt: colloquial and Franco-Arabic query building, value vocabulary, where Egyptians talk online, and post-devaluation spending. | Strategists, researchers and copywriters briefed on Egyptian audiences. |
| [brand-architecture-semiotics](skills/brand-architecture-semiotics) | Brand architecture, distinctive asset strategy and applied semiotics: fixes name collisions between entities, scores assets on fame and uniqueness, decodes category codes. | Brand strategists on naming, sub-brand, rebrand or category-code problems. |
| [loyalty-cx-commerce](skills/loyalty-cx-commerce) | Retail CX, CRM and loyalty programme design: service blueprints, friction scoring, points economics, tiers and partnerships, plus a live-verified MENA payments layer. | CX, CRM and loyalty strategists, especially in MENA retail. |
| [dialect-skill-builder](skills/dialect-skill-builder) | Builds a dialect mastery skill for any market from real evidence: YouTube and Snapchat harvest scripts, videos "watched" as frame sheets plus dialect-prompted transcripts, parallel literature and slang research, one session per dialect family, a router skill with a leak table, and a blind QA test. | Anyone who needs an agent to write and judge copy that reads native in a regional dialect. |
| [social-media-suite](skills/social-media-suite) | Monthly content calendar, channel audit, competitor gap analysis and comment-level insight mining for one brand, with bilingual Arabic and English listening. | Social and brand strategists running organic social, especially in Arabic-speaking markets. |

### Decks, web and motion

| Skill | What it does | Who it's for |
|---|---|---|
| [magic-scroll](skills/magic-scroll) | Scroll-scrubbed product animation: an object transforms frame by frame on a sticky canvas as the visitor scrolls, with liquid glass panes over it, a frame-extraction script and a 26-check Chrome QA harness. | Front-end developers and creative technologists building Apple-style product reveals. |
| [geometric-art](skills/geometric-art) | A posterised, dithered gradient field with a pixel dissolve: one engine for a WebGL2 web hero background and a seek-safe HyperFrames title card. | Designers and developers who want a calm, print-style hero or title card. |

### Working with agents and code

| Skill | What it does | Who it's for |
|---|---|---|
| [mother](skills/mother) | Interviews you about the goal, then checks your machine (GPU and VRAM, RAM, disk, toolchains) and everything already installed: skills, plugins, subagents, MCP servers, plus local apps, packages, clones and models, and what can be upgraded. It recommends a tight kit in three parts: use what you have, upgrade, and pull new. Pull new is split into skills to pull and tools to pull and set up, with what each needs from your machine. External tools follow your tool policy (for example free and local only). It installs approved tools safely, then launches the lead skill. When category "Git Mother" skills (`git-<category>-mother`) are installed, it hands tool choices to them. | People with a large skill library, or a job that needs local tools, who don't know which ones to use. |
| [sonnet-delegate](skills/sonnet-delegate) | A delegation rule for multi-agent work: hand no-judgement tasks to a cheaper model's subagents with a STOP-AND-FLAG prompt template, and keep every judgement call on the main model. | Claude Code users orchestrating subagents who want lower cost without losing quality control. |
| [code-prune](skills/code-prune) | Six-phase safe deletion: scanners find dead code, secrets and vulnerable dependencies, every finding is sorted into SAFE, VERIFY or KEEP, nothing is cut without approval, and tests plus mutation testing prove the result. | Developers cleaning up bloated or AI-generated repos who want proof before deleting anything. |

## Tools are yours to choose

No skill here is tied to a vendor. Where a skill needs a capability (image or video generation, web search, hosting, a static analyser), it names the capability as a `{{TOOL_*}}` value. On first run it checks what your agent already has connected, proposes a match, or asks you what to use. It stores only the tool name and the name of the environment variable that holds its key, never the key itself.

## Configuration

Each skill ships `config/user-config.example.md`, a table of every placeholder it uses with a plain-language description and an example. You can fill it in by hand (copy it to `user-config.md`) or let the skill do it on first run.

## License

MIT. See [LICENSE](LICENSE).
