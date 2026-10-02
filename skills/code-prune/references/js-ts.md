# JavaScript and TypeScript toolchain

> The tools below are worked examples, one well-known open-source tool per job. If `config/user-config.md` names a different tool for a job ({{TOOL_STATIC_ANALYSIS}}, {{TOOL_DUPLICATION}}, {{TOOL_LINTER}}, {{TOOL_MUTATION_TESTING}}), run that tool instead and write its output to `.prune/` the same way.

## Contents
- [Phase 1 commands](#phase-1-commands)
- [Knip: the primary tool](#knip-the-primary-tool)
- [Framework configs that matter](#framework-configs-that-matter)
- [Phase 5 mutation testing](#phase-5-mutation-testing)

---

## Phase 1 commands

Run one tool for each job. Each job finds a different kind of waste. Write every output to `.prune/`.

```bash
# Unused files, exports, dependencies. The heavy lifter.
npx knip --reporter json > .prune/knip.json

# Copy-paste detection. Knip does not find duplication.
npx jscpd . --reporters json --output .prune/ \
  --ignore "**/node_modules/**,**/dist/**,**/.next/**,**/build/**"

# Lint and autofixable dead weight. Rust-speed, no config needed.
npx @biomejs/biome check --reporter=json . > .prune/biome.json
# or, if the project already has ESLint and you do not want to migrate:
npx oxlint --format json > .prune/oxlint.json

# Circular dependencies and orphan modules
npx madge --circular --json src > .prune/cycles.json

# Bundle composition, if there is a build
npx source-map-explorer 'dist/**/*.js' --json > .prune/bundle.json
```

Nothing here needs installing globally. All of it runs through `npx`.

---

## Knip: the example primary tool

Knip builds a real reference graph and reports what nothing points at. It distinguishes `dependencies` from `devDependencies` and has a production mode that ignores test-only references, which is what lets you delete dead code and its tests together.

```bash
npx knip                      # full report
npx knip --production         # production code only, ignores test-only refs
npx knip --fix                # applies the safe fixes. Only after Phase 3 approval.
npx knip --include files      # one issue type at a time
```

### Work the types top-down

This is the single most important operating detail. Findings come in chains:

```
unused files = project files - (entry files + resolved files)
```

Dependencies imported only by unused files get reported as unused dependencies. So resolving unused **files** first makes a large share of the unused-exports and unused-dependencies findings disappear on their own. Getting the file list right trickles down into everything else.

Order: files, then exports, then dependencies, then types.

### Configure entry points before trusting the output

Most Knip false positives are a missing entry point, not a real bug. `knip.json` at the repo root:

```json
{
  "entry": ["src/index.ts"],
  "project": ["src/**/*.{ts,tsx}"],
  "ignore": ["**/*.generated.ts"],
  "ignoreDependencies": []
}
```

Reach for `ignore*` options last, never first. Hiding a result is not the same as resolving it. Fix the entry and project globs, and most of the noise goes away properly.

Knip also ships an MCP server through its editor extension that can write `knip.json` for a project by reading its own docs. If the user is in Claude Code with that extension available, use it rather than hand-authoring config.

---

## Framework configs that matter

These three break naive dead-code detection in specific, predictable ways. If the repo uses any of them and the config is not set, the report will be full of confident nonsense.

### Next.js (App Router)

Route files are entry points reached by convention, not by import. Nothing in the codebase imports `app/dashboard/page.tsx`.

```json
{
  "entry": [
    "app/**/{page,layout,loading,error,not-found,route,template,default}.{ts,tsx}",
    "middleware.ts",
    "instrumentation.ts",
    "next.config.{js,mjs,ts}"
  ]
}
```

Also watch for: `next/dynamic` with a computed path, and anything referenced only from `generateStaticParams`.

### NestJS

The worst offender, because dependency injection means almost nothing is imported the way the graph expects. Providers are resolved by decorator metadata at runtime. Entities are loaded by glob in `TypeOrmModule.forRoot({ entities: [...] })`.

```json
{
  "entry": [
    "src/main.ts",
    "src/**/*.module.ts",
    "src/**/*.controller.ts",
    "src/**/*.entity.ts",
    "src/**/*.dto.ts",
    "src/migrations/*.ts"
  ]
}
```

Treat every Knip finding inside a `@Injectable()`, `@Controller()`, `@Entity()` or custom decorator as VERIFY, never SAFE, unless you have traced the module that provides it. Guards, interceptors, pipes and filters registered globally in `main.ts` or via `APP_GUARD` tokens are especially prone to false flags.

### Expo and React Native

File-based routing in `app/` behaves like Next.js. On top of that:

- Platform-specific files (`Component.ios.tsx`, `Component.android.tsx`) resolve at bundle time by extension. The graph may see only one of them.
- `expo-router` typed routes are generated, so generated files look unused
- Native module registrations and `app.json` plugin references are outside the JS graph
- Assets referenced by `require()` with a computed path never resolve

```json
{
  "entry": [
    "app/**/*.{ts,tsx}",
    "app.config.{js,ts}",
    "metro.config.js",
    "**/*.{ios,android,web,native}.{ts,tsx}"
  ]
}
```

---

## Phase 5 mutation testing

```bash
npx stryker init                  # picks the runner plugin for jest, vitest, mocha or karma
npx stryker run --incremental     # only mutates changed files
```

`stryker.config.mjs`:

```js
export default {
  testRunner: 'vitest',           // or 'jest', 'mocha', 'karma'
  mutate: ['src/**/*.ts', '!src/**/*.spec.ts', '!src/**/*.test.ts'],
  incremental: true,
  thresholds: { high: 80, low: 60, break: 50 },
  reporters: ['html', 'json', 'progress']
};
```

First full run takes 10 to 60 minutes depending on suite size. Incremental runs on changed files only take 2 to 5 minutes, which is what makes it usable as a per-batch gate rather than a once-a-quarter exercise.

What a surviving mutant means: Stryker changed `>` to `>=`, or `a + b` to `a - b`, or emptied a function body, and every test still passed. That code path is not actually tested, whatever the coverage number says. The classic tell is a test suite full of `expect(x).toBeTruthy()` assertions, which pass against almost any mutation.

Add `.stryker-tmp/` and `reports/` to `.gitignore`.
