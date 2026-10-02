# Python, Go and Rust toolchains

> The tools below are worked examples, one well-known open-source tool per job. If `config/user-config.md` names a different tool for a job ({{TOOL_STATIC_ANALYSIS}}, {{TOOL_DUPLICATION}}, {{TOOL_LINTER}}, {{TOOL_MUTATION_TESTING}}), run that tool instead and write its output to `.prune/` the same way.

## Python

### Phase 1

```bash
# Unused imports, variables and a large simplification ruleset. Very fast.
ruff check . --output-format json > .prune/ruff.json
ruff check . --select F401,F841,ARG,ERA,SIM,C4,RET --statistics

# Dead code: unused functions, classes, attributes
vulture . --min-confidence 80 > .prune/vulture.txt

# Unused third-party packages
deptry . --json-output .prune/deptry.json

# Duplication
npx jscpd . --format python --reporters json --output .prune/
```

Ruff rule groups worth knowing for a line-reduction pass:
- `F401` unused imports, `F841` unused local variables
- `ERA` commented-out code, which is the single biggest source of dead lines in most repos
- `SIM` simplifiable constructs, `C4` comprehension rewrites, `RET` return-statement simplification
- `ARG` unused function arguments

`ruff check --fix` handles most of these mechanically. Run it as its own Phase 4 batch so the diff stays readable.

### Vulture confidence levels

Vulture reports a confidence percentage. Treat it as a tier map:
- 100 percent: unused imports and unreachable code. SAFE.
- 90 percent: unused variables and attributes. Usually SAFE, check for `__getattr__` tricks.
- 60 percent and below: unused functions and classes. Always VERIFY. Vulture cannot see `getattr()`, Django signal handlers, Celery tasks, pytest fixtures, Flask or FastAPI route decorators, or anything registered by entry point.

Build a whitelist file rather than lowering the threshold:
```bash
vulture . --make-whitelist > .prune/whitelist.py
```

### Python dynamic-access blind spots

These get flagged as dead and are not:
- FastAPI and Flask route handlers reached only by decorator
- Pydantic validators and model config classes
- Celery `@task` functions
- Django signals, migrations, admin registrations, management commands
- pytest fixtures and `conftest.py` contents
- Anything loaded via `importlib`, `__init_subclass__`, or a plugin entry point in `pyproject.toml`
- ORM model fields, which look like unused class attributes

### Phase 5

```bash
mutmut run
mutmut results
```

Alternative: `cosmic-ray` for more configurable mutation operators. Both are slower than Stryker, so scope them to the modules you actually cut.

---

## Go

### Phase 1

```bash
# Official unreachable-function analysis
go run golang.org/x/tools/cmd/deadcode@latest ./... > .prune/deadcode.txt

# Aggregated linters including unused, ineffassign, unparam
golangci-lint run --out-format json > .prune/golangci.json

# Unused module dependencies
go mod tidy -diff
```

Enable these linters in `.golangci.yml` for a pruning pass: `unused`, `deadcode`, `ineffassign`, `unparam`, `dupl`, `gocyclo`, `unconvert`.

Blind spots: anything called through an interface where the implementation is selected at runtime, `init()` side effects, anything reached only via `reflect`, and build-tag-gated files. Run `deadcode` once per build tag combination that ships.

### Phase 5

```bash
go test -cover ./...
go run github.com/zimmski/go-mutesting/cmd/go-mutesting@latest ./...
```

---

## Rust

### Phase 1

```bash
cargo clippy --all-targets --message-format json > .prune/clippy.json
cargo +nightly udeps --all-targets          # unused dependencies
cargo machete                                # faster udeps alternative, no nightly needed
```

The compiler already reports unused code as `dead_code` warnings, so start with a clean `cargo build` and read the warnings before reaching for anything else. Add clippy groups `clippy::pedantic` and `clippy::nursery` for a pruning pass, then turn them back off.

Blind spots: `#[cfg(feature = "...")]` gated code looks dead when the feature is off, and anything exported from a `lib.rs` public API has consumers outside the crate.

### Phase 5

```bash
cargo install cargo-mutants
cargo mutants
```

---

## Universal, any stack

Examples for {{TOOL_SECRETS_SCAN}}, {{TOOL_DEPENDENCY_AUDIT}}, {{TOOL_SAST}} and {{TOOL_LOC_COUNTER}}:

```bash
gitleaks detect --no-git -f json -r .prune/secrets.json
osv-scanner scan source --format json --output .prune/vulns.json
semgrep --config auto --json --output .prune/semgrep.json
npx cloc . --json > .prune/loc.json
```
