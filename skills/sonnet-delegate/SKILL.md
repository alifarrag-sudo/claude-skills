---
name: sonnet-delegate
description: >-
  {{OWNER_NAME}}'s delegation rule: work that needs no judgement goes to {{DELEGATE_MODEL}}
  subagents (Agent tool, model "{{DELEGATE_MODEL}}"); judgement stays on the session's own model
  ({{MAIN_MODEL}}). Gives the quick test for which is which, a ready prompt template with
  STOP-AND-FLAG, the review step, and the rules for orchestrating several sessions (pass the rule
  on, hand over before context fills). Use this whenever you are about to spawn a subagent, split
  a big build into agents, run or coordinate several sessions, or face bulk mechanical work (copy,
  move, encode, resize, builds, check scripts, screenshots, manifest or STATUS updates, grep
  sweeps, polling or downloading generations, data pulls), and whenever the user says "delegate",
  "use sonnet", "use a cheaper model", "save tokens", "hand this off", or "write a handover". Not
  for handing code to a separate coding CLI or for configuring CLI lanes (use a dedicated skill for
  those if you have one).
---

# Sonnet delegate

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.


Set by {{OWNER_NAME}} while orchestrating a multi-session build. Goal: save cost and keep the
main session's context for the calls only it can make.

Reference files:
- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.

## 1. The rule

**{{DELEGATE_MODEL}} does the no-judgement work.** Spawn it with the Agent tool and
`model: "{{DELEGATE_MODEL}}"`.
- Copying, moving, renaming files
- Encoding, resizing, format conversion
- Builds, deploys from a known command, gates and check scripts
- Screenshots and frame grabs
- Manifest, STATUS and index updates
- Grep sweeps and inventories
- Polling or downloading generations by job ID
- Data pulls into a fixed format

**The main model ({{MAIN_MODEL}}) keeps the judgement.**
- Design, layout, brand fit
- Casting and eye checks on images and video
- Copy, voice, tone, translation quality
- Claims and compliance
- Writing generation prompts
- Picking takes and winners
- Strategy and recommendations to {{OWNER_NAME}}

## 2. The quick test

Ask: **would two careful people get the same result from the same instructions?**
- Yes: {{DELEGATE_MODEL}} work.
- No, it depends on taste, context or risk: keep it.

Mixed task? Split it. {{DELEGATE_MODEL}} gathers or produces, the main model decides. Example:
{{DELEGATE_MODEL}} renders ten frames and saves them; the main model picks the take.

## 3. Prompt template for a {{DELEGATE_MODEL}} agent

A {{DELEGATE_MODEL}} agent does exactly what the prompt says, so the prompt carries everything.
Fill every line; leave nothing to guess.

```
TASK: <one sentence, what to do>

INPUTS (exact paths):
- <path 1>
- <path 2>

OUTPUT: write to <exact folder or file>. Write only inside <your folder>. Do not touch anything else.

STEPS:
1. <step>
2. <step>

DONE-CHECK (run it, paste the result in your report):
- <command or check, e.g. count files, open each, run the gate script, compare sizes>

STOP-AND-FLAG: if a tool, drive, key, cache, model or skill is missing or failing, or quality
drops below what is asked, stop and report it. Never work around it silently and never ship a
reduced version. If a step fails, retry it with another method. In your report, list every
failure, every retry, and what finally worked.

REPORT: what you did, the done-check output, every failure and retry, and the exact output paths.
```

Why each part matters:
- **Exact paths** stop the agent searching or guessing.
- **Own folder only** stops two agents overwriting each other.
- **Done-check** turns "I think it worked" into proof.
- **STOP-AND-FLAG** exists because a silent workaround once shipped pieces without sound and
  cost a full rerun. When an agent flags, tell {{OWNER_NAME}} with a recommended fix; do not
  approve a degraded path on their behalf.

## 4. Orchestrating several sessions

When you run or coordinate more than one session:
- Send each session this rule by SendMessage when you start it. One line is enough:
  "Delegate no-judgement work to {{DELEGATE_MODEL}} subagents (model: {{DELEGATE_MODEL}}), keep
  judgement on your own model, every subagent prompt carries STOP-AND-FLAG."
- Set `model: "{{DELEGATE_MODEL}}"` on every mechanical Agent call you make yourself.
- Run independent {{DELEGATE_MODEL}} agents in parallel in one message.

**Companion rule: hand over before context fills.** Every session stops cleanly while it still
has room, not after it runs out. It then:
1. Writes `HANDOVER.md` in its work folder with:
   - State: what is done, with paths
   - Next steps, in order
   - Commands to rebuild, check and deploy
   - Pending job IDs (generations, renders, uploads) and where results land
   - Open issues and flags waiting on {{OWNER_NAME}}
   - What not to redo, and why
2. Sends the orchestrator a short message: done or stopped, where HANDOVER.md is, what needs a
   decision.

## 5. Review before it reaches {{OWNER_NAME}}

{{DELEGATE_MODEL}} output that feeds a judgement step gets checked by the main model first. Open
the files, look at the images, read the numbers against their source. Only then does it go into
a recommendation, a deck, or a message to {{OWNER_NAME}}. Pure mechanical output with a passing
done-check (a copy, a build, a manifest) can go through on the check alone.

## Writing rules

{{OWNER_NAME}}'s house rules apply to every prompt and report this skill produces:
{{HOUSE_STYLE_RULES}}.
