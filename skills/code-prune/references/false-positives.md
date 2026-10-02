# What static analysis cannot see

Read this before every triage. Nearly every wrong deletion traces back to one of these patterns, and every one of them makes live code look dead.

## Contents
- [The dynamic-access list](#the-dynamic-access-list)
- [The repo-boundary list](#the-repo-boundary-list)
- [Triage heuristic](#triage-heuristic)
- [AI-code specific audit checks](#ai-code-specific-audit-checks)
- [False positives in the other direction](#false-positives-in-the-other-direction)

---

## The dynamic-access list

A reference graph is built from static imports and calls. Anything resolved at runtime is invisible to it. If a finding touches any of these, it is **VERIFY**, never SAFE.

**Resolved by string**
- `registry[name]`, `handlers[event]`, `COMPONENTS[type]` lookup maps
- `getattr(obj, name)` in Python, `obj[key]` dispatch in JS
- i18n and translation key maps, where keys are assembled from variables
- Feature-flag-keyed component or strategy selection
- Anything named by a value read from an env var, config file or database column

**Resolved by decorator or metadata**
- Dependency injection: NestJS providers, Spring beans, Angular services
- Route decorators: FastAPI, Flask, NestJS controllers
- Celery tasks, Django signals, event subscribers
- ORM entities collected by glob rather than import
- Serialisers, validators and schema classes discovered by base class

**Resolved by convention**
- File-based routing: Next.js `app/`, Expo Router, Nuxt, SvelteKit
- Platform extension resolution: `.ios.tsx`, `.android.tsx`, `.native.ts`
- Test discovery: `conftest.py`, `*.spec.ts`, `setupFiles`
- Build-tag or feature-gated files in Go and Rust
- `index` files re-exported by barrel convention

**Resolved at build or load time**
- `importlib`, `require()` with a computed path, `import()` with a template literal
- Webpack `require.context`, Vite `import.meta.glob`
- Reflection, `eval`, `new Function`
- Code generation output, which looks unused until the generator runs

---

## The repo-boundary list

The graph stops at the edge of the repository. These have consumers it cannot see:

- **Published packages.** Every export in the public API has unknown downstream consumers. Unused in-repo is not deletable.
- **Migrations and seed data.** Run once, referenced by a version table, never imported.
- **Cron jobs, queue consumers, webhook handlers.** Entry points invoked by infrastructure.
- **Serverless function handlers.** The platform calls them by path.
- **CLI entry points** declared in `package.json` `bin` or `pyproject.toml` `[project.scripts]`.
- **Anything another repo imports**, in a multi-repo setup, including sibling services in the same org.
- **Public types and interfaces** consumed by a separate frontend or SDK.

Ask about all six before cutting anything in this category. The cost of asking is one message. The cost of being wrong is a production incident with no local test that would have caught it.

---

## Triage heuristic

Walk each finding through this:

```
Does a tool report back this finding, with a named rule?
  No  -> KEEP (or move to a proper scan first)
  Yes -> continue

Does it match anything on the dynamic-access list?
  Yes -> VERIFY
  No  -> continue

Could something outside this repo reach it?
  Yes or unsure -> VERIFY
  No            -> continue

Is there a test that currently exercises it?
  Yes -> SAFE, and the test goes with it
  No  -> SAFE, but note the coverage gap in the report

Is deleting it worth the diff size and review burden?
  No  -> KEEP with a reason
  Yes -> SAFE
```

When genuinely unsure, VERIFY costs one question. SAFE costs an incident. The asymmetry is not close.

---

## AI-code specific audit checks

Generic SAST rules are written against human-written patterns. AI-assisted and agent-generated code fails differently, because generation is locally correct and globally inconsistent: the model writes each route correctly and forgets that the eleventh one needs the same guard.

Grep and reason about these explicitly during Phase 2. Most will not be in the default ruleset of {{TOOL_SAST}}.

**Partially applied controls**
- Auth middleware or guards applied to most routes but not all. List every route, list every guarded route, diff them.
- Row-level security policies scaffolded in a migration but never enabled, or enabled on some tables only
- Rate limiting on the login endpoint but not on password reset
- Input validation on the create handler but not the update handler
- CORS configured permissively "for now" in one place

**Scaffolding that shipped**
- `TODO`, `FIXME`, `// for now`, `placeholder`, `changeme`, `test-key`
- Hardcoded secrets, API keys and connection strings. Gitleaks catches most; also grep for base64 blobs and JWT-shaped literals.
- Default or example credentials left in config or seed data
- Debug endpoints, verbose error handlers that leak stack traces, `console.log` of request bodies
- Mock or simulator code paths still reachable in production builds. Check every `if (__DEV__)`, `NODE_ENV` and sandbox-mode branch for a way to turn it on from outside.

**Duplication with drift**
The highest-value finding in an AI-assisted codebase. The same helper generated four times, then three of the copies fixed and one missed. Run {{TOOL_DUPLICATION}} (for example `jscpd`) with a low threshold, then diff the near-duplicates specifically looking for the one that lacks the fix. This is where real bugs hide, not in the exact copies.

**Prompt-injection sinks**
If the app calls an LLM: trace every path where user-supplied text reaches a prompt, and every path where model output reaches a shell, a database query, a file write or a rendered HTML surface. Both directions matter.

**Dependency reality**
- Packages in the manifest that were imagined rather than installed, or installed and never used
- Version pins that do not match the lockfile
- Two libraries doing the same job because different sessions picked differently

---

## False positives in the other direction

Not everything a tool calls used is genuinely used. Watch for code that only its own tests reach. Some dead-code tools have a production mode built exactly for this (Knip's `--production`, for example): it ignores test-only references, so a module that exists solely to be tested shows up as unused. That is a real finding, and the test goes with it.

Also treat as dead despite looking live:
- Feature-flagged code where the flag has been off in every environment for months
- A/B test variants past the experiment's end date
- Compatibility shims for versions no longer deployed
- Commented-out blocks. Linters can catch these (Ruff's `ERA` group does in Python). Git remembers; the file does not need to.
