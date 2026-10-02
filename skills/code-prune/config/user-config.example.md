# code-prune: user config (example)

Copy this file to `user-config.md` in the same folder, or let the skill fill it on first run.
`user-config.md` is git-ignored: your details never get committed.

Each value is the tool you want for that job. Name one per stack if you work in several (for example "knip for JS/TS, vulture for Python"). The reference files show worked commands for the first example in each row.

| Placeholder | What it means | What the skill sends and expects back | Example tools (not required) |
|---|---|---|---|
| `{{TOOL_LOC_COUNTER}}` | Counts lines of code for the Phase 0 baseline and the Phase 6 delta. | Runs on the repo root, excluding build and vendor folders. Expects total and per-language line counts as JSON. | cloc, tokei, scc |
| `{{TOOL_STATIC_ANALYSIS}}` | Builds a reference graph and reports unused files, exports and dependencies (dead code). | Runs on the repo with its entry points configured. Expects a JSON or text list of findings, each with a file, a symbol and a rule or confidence. | knip (JS/TS), vulture plus deptry (Python), deadcode (Go) |
| `{{TOOL_DUPLICATION}}` | Finds copy-pasted and near-duplicate blocks. | Runs on source folders with a minimum clone size. Expects clone pairs with file and line ranges, and an overall duplication percentage. | jscpd, PMD CPD, dupl (Go) |
| `{{TOOL_LINTER}}` | Flags unused imports and variables, commented-out code and autofixable dead weight. | Runs on the repo. Expects JSON findings with rule ids, and an autofix mode for Phase 4. | Biome or oxlint (JS/TS), Ruff (Python), golangci-lint or clippy |
| `{{TOOL_SECRETS_SCAN}}` | Finds hardcoded secrets, keys and connection strings. | Runs on the working tree. Expects JSON findings with file, line and secret type (never the secret printed in chat). | gitleaks, TruffleHog, detect-secrets |
| `{{TOOL_DEPENDENCY_AUDIT}}` | Finds known vulnerabilities (CVEs) in dependencies. | Reads the manifests and lockfiles. Expects JSON findings with package, version, advisory id and severity. | osv-scanner, npm audit, pip-audit |
| `{{TOOL_SAST}}` | Static security audit of the source (Phase 2). | Runs on the repo with default rules plus any project rules. Expects JSON or SARIF findings with rule id, file, line and severity. | Semgrep, CodeQL, SonarQube |
| `{{TOOL_MUTATION_TESTING}}` | Introduces deliberate small bugs and checks whether the tests catch them (Phase 5). | Runs the test suite against mutated code, incrementally where possible. Expects a mutation score and the list of surviving mutants. | Stryker (JS/TS), mutmut (Python), cargo-mutants (Rust) |

## My values

TOOL_LOC_COUNTER: {{TOOL_LOC_COUNTER}}
TOOL_STATIC_ANALYSIS: {{TOOL_STATIC_ANALYSIS}}
TOOL_DUPLICATION: {{TOOL_DUPLICATION}}
TOOL_LINTER: {{TOOL_LINTER}}
TOOL_SECRETS_SCAN: {{TOOL_SECRETS_SCAN}}
TOOL_DEPENDENCY_AUDIT: {{TOOL_DEPENDENCY_AUDIT}}
TOOL_SAST: {{TOOL_SAST}}
TOOL_MUTATION_TESTING: {{TOOL_MUTATION_TESTING}}
