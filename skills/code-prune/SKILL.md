---
name: code-prune
description: Shrink a codebase safely. Six-phase pipeline that scans for dead code, unused files, exports, dependencies and duplication, audits for security issues, triages every finding by confidence, deletes only what is proven safe, then verifies with tests and mutation testing. Use whenever the user wants to clean up code, reduce lines, remove unused or dead code, delete what is not needed, find bloat, audit a repo, shrink a bundle, or pay down tech debt. Trigger on phrases like "clean my code", "prune this repo", "reduce the lines", "find dead code", "audit this codebase", "this repo is bloated", "too many dependencies", "why is my bundle so big", or "/code-prune". Also trigger proactively on AI-generated or vibe-coded projects, which accumulate orphaned files, duplicated helpers and half-wired dependencies faster than hand-written code. Do NOT use for writing new features or debugging a single failing test.
---

# code-prune

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.

Delete code safely, in a way a human can approve and a test suite can prove.

## The governing principle

**Static analysis finds. Claude triages. Tests decide.**

Never hunt dead code by reading files and forming an opinion. An LLM reading a repo cannot see every dynamic import, every DI resolution, every string-keyed lookup, so it deletes things that are used and misses things that are not. Tools that build a real reference graph do this correctly and cheaply. Claude's job is the part tools are bad at: separating true findings from false positives, and deciding what is worth the risk.

That split is also where the measurable payoff sits. Scanners produce very high false-positive rates on their own. Having the model triage scanner output removes most of those false positives. So run the scanner, then triage the report. Not the other way around.

## Tools are capabilities, not requirements

Every scanner below is named by the job it does, as a `{{TOOL_*}}` value from `config/user-config.md`. The commands shown are worked examples with one well-known open-source tool per job. If the user's config names a different tool for a job, run that one instead and write its output to `.prune/` the same way. If no tool for a job is installed, say so, offer the example tool, and do not fake that phase from reading code.

## The six phases

Run them in order. Do not skip Phase 0 or Phase 5. Announce which phase you are entering so the user can follow along.

---

### Phase 0: Safety gate

Nothing is deleted without a rollback point and a known-green baseline.

1. Confirm the git tree is clean. If not, stop and ask the user to commit or stash.
2. Create a working branch: `git checkout -b prune/<yyyy-mm-dd>`
3. Record the baseline. Save to `.prune/baseline.json`:
   - Total lines of code, from {{TOOL_LOC_COUNTER}} (for example `npx cloc . --exclude-dir=node_modules,dist,build,.next --json` or `tokei --output json`)
   - Dependency count from the manifest
   - File count in source directories
   - Test result: run the suite, record pass/fail counts
   - Coverage percentage if a coverage script exists
   - Build output size if there is a build step
4. If the test suite is red at baseline, stop and say so. Pruning against a red suite means every later failure is ambiguous.
5. If there is no test suite at all, say so plainly and offer two options: proceed in report-only mode (Phases 1 to 3, no deletion), or write characterisation tests for the highest-risk modules first. Do not delete code that nothing tests and nothing verifies.

---

### Phase 1: Inventory

Find everything. Delete nothing.

Detect the stack from the manifest files present, then read the matching reference. Each one shows worked examples of {{TOOL_STATIC_ANALYSIS}} (unused files, exports and dependencies), {{TOOL_DUPLICATION}} and {{TOOL_LINTER}} for that stack:
- `package.json` present: read `references/js-ts.md`
- `pyproject.toml`, `requirements.txt` or `setup.py` present: read `references/python-go.md`
- `go.mod` or `Cargo.toml` present: read `references/python-go.md`
- Monorepo or several of the above: run each stack's toolchain separately, keep the reports separate

Regardless of stack, always run the two universal scanners: {{TOOL_SECRETS_SCAN}} for hardcoded secrets and {{TOOL_DEPENDENCY_AUDIT}} for dependency CVEs. For example:

```bash
gitleaks detect --no-git -f json -r .prune/secrets.json      # hardcoded secrets
osv-scanner scan source --format json --output .prune/vulns.json  # dependency CVEs
```

Write every scanner's output to `.prune/` as JSON or SARIF. Structured output is what Phase 3 triages against. Do not summarise a scanner's output from memory.

---

### Phase 2: Audit

Run {{TOOL_SAST}}. The worked example is Semgrep:

```bash
semgrep --config auto --json --output .prune/semgrep.json
```

Semgrep makes a good default auditor because it is fast, its rules are readable, and its out-of-the-box security detection tends to beat quality-first tools on default settings. It has a real weakness: custom rules matter enormously, and writing rules for the patterns your codebase actually gets wrong improves detection a great deal over the defaults.

So after the default run, check whether the project already holds custom rules for its auditor (for Semgrep, a `.semgrep/` folder). If not, offer to write three to five rules targeting the failure modes visible in this specific repo.

If the project is AI-generated or AI-assisted, add the AI-code failure patterns from `references/false-positives.md`, section "AI-code specific audit checks". Generic SAST rules are written for human-written patterns and miss things like auth middleware applied to eleven of twelve routes, or a row-level security policy that was scaffolded but never enabled.

The auditor covers security only. It does not do code smells, duplication or coverage. Those come from Phase 1's stack tooling.

---

### Phase 3: Triage report

This is the phase that makes the whole thing safe. Produce one report, and stop for human approval.

Read `references/false-positives.md` before triaging. It lists the patterns that static analysis cannot see, which is where nearly every wrong deletion comes from.

Bucket every finding into exactly one of three tiers:

| Tier | Meaning | Action |
|---|---|---|
| **SAFE** | Tool-confirmed, no dynamic-access pattern, nothing outside the repo can reach it | Delete in Phase 4 |
| **VERIFY** | Tool flagged it, but a dynamic-access or external-consumer pattern applies | Ask the user, one question per cluster |
| **KEEP** | False positive, or true but not worth the risk | Leave it, record why |

For every SAFE item, state the evidence: which tool, which rule, and what reference graph proves nothing points at it. A finding with no stated evidence goes to VERIFY, not SAFE.

Use `references/report-template.md` for the output format. Present the report in the chat, not only as a file.

**Then stop.** Do not proceed to Phase 4 until the user approves. Offer them the batches as a numbered list so they can approve some and reject others.

---

### Phase 4: Cut

Order matters, and it is not arbitrary. Findings come in chains: removing unused files also removes the exports inside them and the dependencies they imported. Working bottom-up means re-running everything repeatedly and chasing findings that would have evaporated on their own.

Cut in this order, one batch at a time:

1. Unused dependencies
2. Unused files
3. Unused exports and types
4. Unreachable branches and dead conditionals
5. Duplicated blocks (extract, then delete the copies)
6. Formatting and lint autofixes

For each batch:
```
1. Make the deletions for that batch only
2. Run the test suite
3. Run the build
4. Green: commit with a message naming the batch and the line delta
   Red: revert that batch, move its items to VERIFY, continue to the next batch
```

One concern per commit. A prune branch that has to be partially reverted three weeks later is only revertible if the commits are separable.

After each batch, re-run the Phase 1 scanner for that stack. The chain effect means the remaining finding count should drop faster than you deleted.

---

### Phase 5: Verify

A green test suite after deletion proves less than it looks like. Coverage tells you which lines the tests execute, not whether the tests would catch a bug in them. A suite can sit at 100 percent coverage and never fail.

So close with mutation testing, using {{TOOL_MUTATION_TESTING}}, which introduces small deliberate bugs and checks whether the tests catch them. For example:

```bash
npx stryker run --incremental     # JS/TS. First run 10 to 60 min, incremental 2 to 5 min
```

Compare the mutation score against the Phase 0 baseline:
- **Score held or rose**: the prune was clean
- **Score dropped**: deleted code was the only thing some test asserted against. Find which mutants newly survived, and either restore the code or strengthen the test

Mutation testing is worth running once a suite is past roughly 80 percent line coverage. Below that, say so and skip it rather than reporting a meaningless number. Example tools for other stacks: `mutmut` for Python, `go-mutesting` for Go, `cargo-mutants` for Rust.

Also verify:
- Build succeeds
- Bundle or artifact size delta against baseline
- The app actually starts

---

### Phase 6: Report

Close with numbers against the Phase 0 baseline, not adjectives:

- Lines removed, and percentage of the original
- Files deleted
- Dependencies removed
- Duplication percentage before and after
- Mutation score before and after
- Security findings fixed, by severity
- Items left in VERIFY and KEEP, with the reason for each

Then delete `.prune/` or add it to `.gitignore`, and tell the user the branch name and how to merge it.

---

## Hard rules

These exist because each one has a real failure behind it.

1. **No deletion without a tool report backing it.** If Claude noticed it by reading, it goes in VERIFY.
2. **Dynamic access is invisible to static analysis.** DI containers, decorators, file-based routing, string-keyed registries, glob imports, reflection. See `references/false-positives.md`.
3. **Unused does not mean deletable for a published package or public API.** Consumers outside the repo do not appear in the reference graph.
4. **Never touch migrations, seed data, or anything reachable by a cron job, webhook or queue consumer** without explicit confirmation. The reference graph stops at the repo boundary.
5. **Never suppress a finding to make a number look better.** Hiding a result is not resolving it. If something must be ignored, it goes in KEEP with a written reason.
6. **Report-only is a valid outcome.** If the repo has no tests and the user does not want to write any, deliver Phases 1 to 3 and stop. That is still most of the value.

## Report-only mode

If the user says "just tell me what is wrong" or there is no test suite, run Phases 0 to 3 and stop at the triage report. Say clearly that nothing was deleted and what it would take to proceed.

## Reference files

- `references/js-ts.md`: the JavaScript and TypeScript toolchain, plus config for Next.js, NestJS and Expo, which all break naive dead-code detection
- `references/python-go.md`: Python, Go and Rust equivalents
- `references/false-positives.md`: the patterns static analysis cannot see, and the AI-code specific audit checks. Read before every triage.
- `references/report-template.md`: the triage and final report formats
- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.
