---
name: dialect-skill-builder
description: Builds a dialect mastery skill for any language market from real evidence, the way a Saudi Arabic skill (seven dialect families, generations, humour, online writing, legal register rules) was built in one day. Harvests YouTube captions and comments and Snapchat Spotlight, "watches" videos as frame contact sheets plus dialect-prompted speech-to-text, runs parallel literature, slang and raw-voice research, splits the deep work into one fresh session per dialect family plus a culture layer and a national layer, merges everything into a router SKILL.md with a leak table, and QA's it with a blind test. Use when the user says "build a skill for <dialect / country>", "make a dialect skill", "I want an Egyptian / Levantine / Moroccan / Kuwaiti / Emirati (any) dialect skill", "teach the agent how people really talk in X", "dialect mastery", "slang and memes skill for a market", or wants copy that reads native in a regional language variety. Not for translating a single line or judging one draft (use the finished dialect skill for that).
---

# dialect-skill-builder

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for. Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill shows `{{NAME}}`, use the value saved in `config/user-config.md`.

## What you are building

A skill that writes, judges, adapts and decodes one market's speech in the right dialect, generation, gender and register, grounded in evidence instead of the model's memory. The bar: "watch as many videos as you can", "read comments, see how they write, key words, memes, jokes, sense of humour", "do not just take from the first thing you find", "separate the work into different sessions with different rules".

The first build (Saudi Arabic) took one long day and hit about ten avoidable failures (bot flags, encrypted media, encoding, broken edits). This is the route without them. Follow the phases in order and reuse the files in `tools/` and `templates/` instead of rewriting them. Make the calls yourself; the user corrects the one or two that matter.

## Phase 0. Set up (10 min)

- New folder `{{PROJECT_ROOT}}/<market>` with `tools/ corpus/ watch/ digest/ research/sources/ skill-build/references/ logs/`.
- Copy this skill's `tools/*` into it and change the market-specific parts:
  - `watch.py`: write a 2-line speech-to-text prompt in the target dialect's own spelling (it keeps dialect spelling instead of normalising to the standard language), save it as `whisper_prompt.txt`, and set env `WHISPER_PROMPT_FILE`. Set `WHISPER_CMD` to {{TOOL_SPEECH_TO_TEXT}} (prefixed by {{TOOL_GPU_QUEUE}} if used) and `WHISPER_LANG` to the language code.
  - `digest.py`: write `markers.txt` with 100 to 150 marker words spanning the target's regions plus neighbour dialects (used for leak counts) and pass it as the 4th argument.
  - `install_skill.sh`: takes the skill name as its argument.
- Copy `templates/DIALECT-TEMPLATE.md` to `skill-build/` and `templates/research-brief.md` to `research/sources/_brief.md`, then swap in the market's names and sources.
- Check that no other session is already building the same skill.

## Phase 1. Plan the buckets

Buckets = regions x genres x generations. The Saudi build used one per region family, plus compare, rap, songs, series, films, comedy, the market's flagship creator network (its own bucket), elders, young, women, podcasts, sports.

- `tools/queries.tsv` (`bucket<TAB>query`): about 100 searches written in the target dialect's own spelling. Patterns: "<dialect> dialect", "<dialect> chat/banter", "old <dialect> words", "difference between the dialects", top series and films by name, "old man/woman talking", "new generation words", club and derby names.
- `tools/niches.tsv`, then `python -I tools/find_channels.py niches.tsv channels_found.tsv` (keeps channels with 15k+ subscribers), then CURATE BY HAND: keyword search pulls in other countries (the Saudi run pulled in Egyptian and Iranian-American comedians and K-pop). Add the big names the user will expect even if search misses them. Each kept channel = its `/videos` and `/shorts` URLs (Shorts comments are the Gen Z voice).
- After the literature pass, add `gaps.tsv` for every sub-region the papers could not cover.

## Phase 2. Harvest (hours, background)

- YouTube through `yt-dlp` via `tools/harvest.py`: 2 workers, 6 videos per query, 150 to 200 top comments, original-language captions. The script already sleeps between requests (`--sleep-requests 1.5 --sleep-interval 4 --max-sleep-interval 10 --sleep-subtitles 3`). Never remove the sleeps: the Saudi run got bot-flagged at about 150 fast videos and lost an hour.
- Put the flagship bucket first in the list (in the Saudi run it was empty when the block hit).
- Run through `tools/yt_lane.sh`: it probes until YouTube stops challenging, then resumes; finished videos are skipped, and several markets can share one lane (one IP).
- Snapchat where the market uses it (Gulf markets): `tools/snap_harvest.py` on about 60 city, tribe and topic hashtags. Saves creator caption, creator name (often states tribe or city), comments and the unencrypted mp4 URL.
- X: a public mirror reached through {{TOOL_WEB_SEARCH}} is often all that works without a login. Quote-and-correct threads ("we don't say that, in the south we say...") are the richest data.
- TikTok, Instagram and Reddit need logins. Ask the user once per market, and only if the market lives there.

## Phase 3. Watch

- `tools/pick_watch.py` sets quotas (flagship 16, series 10, comedy 10, films 8, elders 8, regions 5 each), then `tools/watch.py` makes 4x4 frame contact sheets plus a dialect-prompted transcript. Snaps: top 12 per bucket by comment count.
- `watch.py` deletes each video and audio file once its frames and transcript exist. Sweep any test downloads at the end. Keep only frames, transcripts and comments.
- Speech-to-text is worse than YouTube captions on songs and better on talk; keep both.

## Phase 4. Web research (3 helpers, parallel, at the start)

Run with {{TOOL_SUBAGENTS}}:
1. Dialectology literature (phonology, grammar, sub-regions, generations, gender, online spelling; target language and English; every claim with a URL) into `research/literature.md`.
2. Slang, memes, humour, red lines (150+ lexicon rows with region, age, register, source).
3. Raw voice from X (250+ verbatim posts by region, with URLs).

Every helper prompt: {{TOOL_WEB_SEARCH}} first, `[unsourced]` tags, never invent, and STOP-AND-FLAG (if a tool, drive or source is missing or quality is degrading, stop and report it rather than working around it).

## Phase 5. One session per dialect family

- The Saudi build used 7: Najdi, Hijazi, Southern, Eastern+Northern, Bedouin+Nabati poetry, a CULTURE LAYER (generations, gender, humour, memes, pop culture, rap, sports, online writing, red lines) and a NATIONAL LAYER (dictionaries, courses, the shared "white" koine default, cross-dialect comparison grids, the market's legal rules on when ads must use the standard language). Keep the culture and national layers: they made the skill usable.
- Every session prompt has: what it owns and what it must not touch; two deliverables (`research/sources/<x>.md` per `_brief.md` and `skill-build/references/<x>.md` in the 13-section template, with sub-files where evidence supports them); the input files and corpus buckets; named deep sources to start from (books, dictionaries, theses, heritage authors, the archive.org API); the market's sensitivities for that region (stigmatised accents, sect, tribe); the comment-filter rule (name the neighbour-dialect giveaways); up to 3 helpers; STOP-AND-FLAG; a DONE definition.
- Start each with {{TOOL_SESSIONS}}, fresh context, the project folder as working directory, a few seconds apart. Run at most {{MAX_PARALLEL_SESSIONS}} at once and start the next wave when the user says.
- Send each session corpus pack v1 (`tools/digest.py`) as soon as it exists and v2 when the harvest finishes.
- Expect about 1.5 hours per session. The Saudi first pass produced 25 reference files and 11 deep-source files.

## Phase 6. Merge into the skill

- `skill-build/SKILL.md` is a router:
  - Step 1 register: legal and medium rules decide standard language vs dialect.
  - Step 2 voice coordinates: region, pole, sub-region, generation, gender, medium.
  - Step 3 file map.
  - Step 4 write rules: shared core first, light flavour, native spelling.
  - Step 5 leak table: neighbour-dialect markers taken from the sessions' files, never from memory.
  - Modes WRITE / JUDGE / ADAPT / DECODE, hard rules, evidence pointers.
  - State that a "max two tells per line" rule counts regional tells, not shared-core words.
- `skill-build/evidence/` = the research files plus every `research/sources/*.md`.
- `skill-build/native-check.md`, compiled by a helper from every [gap], [contested] and [native-check] item, top 30 first. This is the list a native speaker should review.
- `bash tools/install_skill.sh <skill-name>` copies it to `{{SKILLS_DIR}}/<skill-name>`; rerun after every update.

## Phase 7. QA

- Blind test: one helper writes 24 items across every region and generation using the skill, plus a separate answer key; separate judges label them blind; every miss becomes a rule fix.
- Live test with the user on a real task (the Saudi one was a "Riyadh Snapchat caption"). It surfaced a contradiction (a word listed as both fading and safe), so read the output against the files, not just for fluency.

## Pitfalls already paid for

- `python -I` ignores PYTHONIOENCODING: every script calls `sys.stdout.reconfigure(encoding="utf-8")`. Keep that in new scripts.
- A scripted `.replace()` edit with escaped `\\n` silently did nothing (the URL column was ignored for an hour). Grep after every scripted edit, or use a real edit tool.
- Titles with newlines break TSV rows: collapse whitespace before writing lists.
- Comments under any market's videos mix nationalities: filter by markers before quoting (the Saudi run dropped about 14% of one region's comments).
- Stop background processes by PID tree, never by keyword match.

## Files in this skill

- `tools/harvest.py`: YouTube search, captions and top comments per query into `corpus/<bucket>/<id>.json`.
- `tools/find_channels.py`: channel search per niche, 15k+ subscribers.
- `tools/snap_harvest.py`: Snapchat Spotlight cards and comments per hashtag or account, no login.
- `tools/pick_watch.py`: picks what to watch per bucket by views.
- `tools/watch.py`: contact sheets plus dialect-prompted transcript, deletes media after.
- `tools/digest.py`: per-bucket reading packs plus marker-frequency stats for the sessions.
- `tools/yt_lane.sh`: one rate-safe YouTube lane with bot-challenge waits.
- `tools/install_skill.sh`: installs the built skill.
- `templates/DIALECT-TEMPLATE.md`: the 13-section reference shape every dialect session fills.
- `templates/research-brief.md`: depth rules for deep-source researchers.
