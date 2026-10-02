# Report formats

## Phase 3: triage report

Present this in the chat, and save a copy to `.prune/triage.md`. Keep it scannable. The user should be able to approve or reject each batch without opening a single scanner output.

```markdown
# Prune triage: <repo name>
Branch: prune/<date> | Baseline: <N> files, <N> lines, <N> deps | Tests: <N> passing

## Proposed cuts

### Batch 1: unused dependencies (<N> packages, ~<N> lines of lockfile)
| Package | Evidence | Tier |
|---|---|---|
| <name> | <tool>: no import in project files | SAFE |
| <name> | <tool>: only referenced in <file>, itself unused | SAFE |

### Batch 2: unused files (<N> files, <N> lines)
| File | Evidence | Tier |
|---|---|---|
| <path> | <tool>: not reachable from any entry point | SAFE |
| <path> | <tool> flagged, but matches <dynamic pattern> | VERIFY |

### Batch 3: unused exports (<N> exports, <N> lines)
### Batch 4: dead branches (<N> blocks, <N> lines)
### Batch 5: duplication (<N> clones, <N> lines recoverable)

**Total if all SAFE items are cut: <N> lines, <N>% of the codebase.**

## Needs your call (VERIFY)
1. <cluster>: <what the tool says> vs <why it might be live>. Cut or keep?
2. ...

## Leaving alone (KEEP)
- <item>: <reason>

## Audit findings (separate from deletion)
| Severity | Finding | Location | Source |
|---|---|---|---|
| Critical | <what> | <file:line> | <SAST tool> <rule-id> |
| High | <what> | <file:line> | <secrets scanner> |

Triaged <N> raw findings down to <N> real ones. <N> were false positives.

## Approve
Reply with the batch numbers to run, or "all SAFE".
```

Two things that make this report worth reading:

**Always state evidence per row.** "knip: no import in project files" is evidence. "appears unused" is not, and any row that reads like the second one belongs in VERIFY.

**Always report the triage ratio.** Saying that 340 raw findings became 22 real ones tells the user what the filtering was worth, and warns them when a scanner is badly tuned for this repo.

---

## Phase 6: final report

```markdown
# Prune complete: <repo name>
Branch: prune/<date> | <N> commits

## Result
| Metric | Before | After | Delta |
|---|---|---|---|
| Lines of code | | | -<N> (-<N>%) |
| Source files | | | |
| Dependencies | | | |
| Duplication % | | | |
| Bundle size | | | |
| Tests passing | | | |
| Coverage % | | | |
| **Mutation score** | | | |

## Commits
1. `<sha>` <message> (-<N> lines)
2. ...

## Security fixed
| Severity | Finding | Fix |
|---|---|---|

## Still open
- VERIFY items awaiting a decision: <list>
- KEEP items and why: <list>
- Coverage gaps found during triage: <list>

## Next
<merge instruction, and the one or two follow-ups worth doing>
```

The mutation score row is the one that matters most, and it is the one people skip. Lines removed measures effort. Mutation score measures whether the remaining tests still prove the remaining code works. A prune that removed 15 percent of the lines and dropped the mutation score by 10 points made the codebase smaller and less safe, and the report should say so plainly rather than leading with the line count.
