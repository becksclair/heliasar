# Plan 003: Config and tooling hygiene — sitemap filter, overrides guard, partytown removal, sync-resume hardening

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 5abb562..HEAD -- astro.config.mjs package.json pnpm-workspace.yaml .nvmrc tools/ .github/workflows/ci.yml src/layouts/ResumeLayout.astro`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S (a few hours total; five independent fixes)
- **Risk**: LOW
- **Depends on**: 001 (uses `check:links` as a regression gate; can run
  without it — skip those verify lines if absent)
- **Category**: tech-debt
- **Planned at**: commit `5abb562`, 2026-07-07

## Why this matters

Five small, verified problems, none urgent alone, all cheap together:
(A) the sitemap advertises `/resume-print/` while that page declares
`noindex` — contradictory crawl signals; (B) the security-override maps are
duplicated across `package.json` (read by Vercel's pnpm 9) and
`pnpm-workspace.yaml` (read by local pnpm 11) with **no guard** — editing one
and forgetting the other silently desyncs the two environments; (C) the
partytown integration is registered but nothing uses it — it ships a ~104K
`~partytown/` worker directory and a dependency for zero benefit; (D)
`tools/sync-resume.mjs` interpolates values into single-quoted YAML
frontmatter unescaped (safe today because inputs are constants; a future
apostrophe breaks the build) and its `stripResumeHeader` string-munging has
no tests, so a drifted source format silently publishes a malformed resume;
(E) `.nvmrc` says `22` while `engines` demands `>=22.12.0` — a strict
`.nvmrc` reader can pick a violating version. Plus trivial dead commented-out
CSS.

## Current state

- `astro.config.mjs` (entire file):

  ```js
  import partytown from "@astrojs/partytown";
  import sitemap from "@astrojs/sitemap";
  import vercel from "@astrojs/vercel";
  import { defineConfig } from "astro/config";
  import robotsTxt from "astro-robots-txt";

  export default defineConfig({
      site: "https://heliasar.com",
      integrations: [partytown(), robotsTxt(), sitemap()],
      output: "static",
      adapter: vercel(),
  });
  ```

- `src/layouts/ResumePrintLayout.astro:11` — `<meta name="robots" content="noindex" />`.
  The route `/resume-print/` is a normal page so `sitemap()` includes it.
- **Partytown is unused**: `grep -rn partytown src/ public/` returns nothing
  (no `type="text/partytown"` scripts anywhere). Analytics is
  `@vercel/analytics/astro` rendered as a component in
  `src/layouts/Layout.astro:3,101` — it does not route through partytown.
- **Overrides duplication is intentional** — do NOT delete either copy.
  Commit `42710b5` message: Vercel builds with pnpm 9, which reads
  `package.json` `pnpm.overrides`; local pnpm 11 reads
  `pnpm-workspace.yaml` `overrides`. Both currently list the same 8 pins:
  `ajv@6`, `mdast-util-to-hast`, `path-to-regexp@6`, `picomatch@2`,
  `picomatch@4`, `rollup`, `tar`, `yaml@2`. The problem is only the absence
  of a consistency check.
- `tools/sync-resume.mjs:34-48` — `buildMarkdown` builds frontmatter via
  template literal with single-quoted scalars:

  ```js
  function buildMarkdown({ body, layout, title, imageUrl }) {
      return `---
  layout: ${layout}
  title: '${title}'
  subtitle: 'Senior Systems Engineer · AI Infrastructure · Automation · Distributed Systems'
  ...
  ```

  and `tools/sync-resume.mjs:17-32` — `stripResumeHeader` strips a literal
  `# Rebecca Clair` heading line and a regex-matched subtitle line
  (`/^\*{1,3}Senior Systems Engineer · AI Infrastructure · Automation · Distributed Systems\*{1,3}$/i`),
  silently no-oping when the source format drifts. The script's top-level
  code (line ~50 onward) runs on import: it reads the source file and writes
  both `src/pages/resume.md` and `src/pages/resume-print.md`.
- `.nvmrc` contains exactly `22`. `package.json` `engines.node` is
  `>=22.12.0`. CI resolves Node from `.nvmrc`
  (`.github/workflows/ci.yml`, `node-version-file: .nvmrc`).
- Dead commented CSS: `src/layouts/ResumeLayout.astro:73-74`
  (`// display: flex;` / `// justify-content: center;`) and `:83-84`
  (commented `// filter: sepia(...)` two-line block). Also
  `src/layouts/BlogPostLayout.astro:82-86` has four commented declaration
  lines inside a media query.
- There is no test runner in the repo. Node's built-in `node:test` is
  available (Node >= 22), so tests need no new dependency.
- Conventions: tabs (Biome-enforced), pnpm only, plain Node ESM (`.mjs`) in
  `tools/`.

## Commands you will need

| Purpose   | Command                        | Expected on success |
|-----------|--------------------------------|---------------------|
| Install   | `pnpm install`                 | exit 0              |
| Lint      | `pnpm exec biome ci`           | exit 0              |
| Typecheck | `pnpm check:types`             | exit 0              |
| Build     | `pnpm build`                   | exit 0              |
| Links     | `pnpm check:links`             | exit 0 (if plan 001 landed) |
| Unit tests| `node --test tools/`           | all pass            |

## Scope

**In scope** (the only files you should modify/create):
- `astro.config.mjs` (sitemap filter, remove partytown)
- `package.json` (remove `@astrojs/partytown` dep; add `test` +
  `check:overrides` scripts)
- `pnpm-lock.yaml` (via `pnpm install`)
- `.nvmrc`
- `tools/sync-resume.mjs` (extract pure functions)
- `tools/lib/resume.mjs` (create)
- `tools/lib/resume.test.mjs` (create)
- `tools/check-overrides-sync.mjs` (create)
- `.github/workflows/ci.yml` (add overrides-check + unit-test steps)
- `src/layouts/ResumeLayout.astro`, `src/layouts/BlogPostLayout.astro`
  (delete commented CSS lines only)

**Out of scope** (do NOT touch):
- The override **values** in `package.json` / `pnpm-workspace.yaml` — do not
  add, remove, or bump any pin. The guard script only compares them.
- `src/pages/resume.md` / `resume-print.md` — regenerating them is fine as a
  test (Step 4 verify), but only commit them if the regenerated content is
  byte-identical apart from nothing (it should be — if it differs, STOP).
- The Vercel adapter, robotsTxt, or any other integration besides partytown.

## Git workflow

- Branch: `advisor/003-config-hygiene`
- One commit per lettered fix (A–E) is ideal; message style: conventional
  prefix, e.g. `fix(seo): exclude noindexed resume-print from sitemap`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step A: Sitemap filter for /resume-print/

In `astro.config.mjs`, change `sitemap()` to:

```js
sitemap({ filter: (page) => !page.includes("/resume-print") })
```

**Verify**: `pnpm build && grep -rc "resume-print" dist/sitemap-*.xml` → every
matching file reports `0` (or grep exits 1 with no matches);
`grep -rc "resume/" dist/sitemap-0.xml` → ≥ 1 (the normal resume page is
still listed).

### Step B: Overrides consistency guard

Create `tools/check-overrides-sync.mjs` — dependency-free comparison of the
two override maps. Target shape:

```js
#!/usr/bin/env node
// The security overrides must exist identically in package.json
// (pnpm.overrides — read by Vercel's pnpm 9) and pnpm-workspace.yaml
// (overrides — read by pnpm 11+). See commit 42710b5.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(`${root}/package.json`, "utf8"));
const pkgOverrides = pkg.pnpm?.overrides ?? {};

const workspace = readFileSync(`${root}/pnpm-workspace.yaml`, "utf8");
const wsOverrides = {};
let inOverrides = false;
for (const line of workspace.split("\n")) {
    if (/^overrides:\s*$/.test(line)) { inOverrides = true; continue; }
    if (inOverrides) {
        const m = line.match(/^\s+'?([^':]+)'?:\s*'?([^']+?)'?\s*$/);
        if (m) { wsOverrides[m[1]] = m[2]; continue; }
        if (/^\S/.test(line)) inOverrides = false;
    }
}

const a = JSON.stringify(Object.entries(pkgOverrides).sort());
const b = JSON.stringify(Object.entries(wsOverrides).sort());
if (a !== b) {
    console.error("Override maps differ between package.json and pnpm-workspace.yaml:");
    console.error("package.json:", pkgOverrides);
    console.error("pnpm-workspace.yaml:", wsOverrides);
    process.exit(1);
}
console.log(`Overrides in sync (${Object.keys(wsOverrides).length} entries).`);
```

Add script to `package.json`: `"check:overrides": "node tools/check-overrides-sync.mjs"`.
Add a CI step after `Install dependencies`:

```yaml
      - name: Check override maps in sync
        run: pnpm check:overrides
```

**Verify**: `pnpm check:overrides` → exit 0, prints `Overrides in sync (8 entries).`
Then temporarily edit one version in `pnpm-workspace.yaml`, re-run → exit 1;
revert the edit, re-run → exit 0.

### Step C: Remove partytown

1. In `astro.config.mjs`: delete the `partytown` import and the
   `partytown()` entry from `integrations`.
2. `pnpm remove @astrojs/partytown`

**Verify**: `pnpm build` → exit 0 and `test ! -d "dist/~partytown"` → exit 0
(directory gone); `grep -rn partytown src/ astro.config.mjs package.json` →
no matches; `pnpm check:links` (if present) → exit 0.

### Step D: Harden and test sync-resume.mjs

1. Create `tools/lib/resume.mjs`. Move `stripResumeHeader` and
   `buildMarkdown` there verbatim as named exports, with two changes to
   `buildMarkdown`:
   - Add a local helper and use it for every single-quoted scalar
     (`title`, `imageUrl` — and the hardcoded subtitle/description/author
     strings can stay literal):

     ```js
     // Single-quoted YAML scalar: escape by doubling embedded quotes.
     const yamlQuote = (value) => `'${String(value).replace(/'/g, "''")}'`;
     ```

     so e.g. `title: ${yamlQuote(title)}` replaces `title: '${title}'`.
   - No other behavior changes. Keep the exact frontmatter field order and
     values (`pubDate: 2023-05-09`, etc.) so regenerated output is
     byte-identical for current inputs.
2. In `tools/sync-resume.mjs`, delete the moved functions and import them:
   `import { buildMarkdown, stripResumeHeader } from "./lib/resume.mjs";`
3. Create `tools/lib/resume.test.mjs` using `node:test` + `node:assert/strict`
   covering at least:
   - `stripResumeHeader` removes the `# Rebecca Clair` line and the
     starred subtitle line plus surrounding blanks;
   - `stripResumeHeader` **returns input unchanged** (aside from newline
     normalization/trailing newline) when the header is absent — the
     silent-no-op contract, now explicit;
   - `stripResumeHeader` handles CRLF input;
   - `buildMarkdown` output starts with `---\nlayout: <layout>` and
     round-trips a title containing an apostrophe (assert the doubled `''`
     appears and the document still has exactly two `---` fence lines).
4. Add `"test": "node --test tools/"` to `package.json` scripts and a CI
   step after `Check override maps in sync`:

   ```yaml
      - name: Unit tests
        run: pnpm test
   ```

**Verify**: `node --test tools/` → all tests pass (≥ 4 tests). Then run
`RESUME_SOURCE=<path> pnpm sync:resume` ONLY IF the default source path
exists (`test -f "/home/bex/HeliasMind/30 Areas/Personal/Rebecca Clair - Resume.md"`);
if it does: run `pnpm sync:resume` and `git diff --stat src/pages/` → **no
changes** (byte-identical regeneration). If the source file doesn't exist on
this machine, skip this regeneration check and note it in your report.

### Step E: .nvmrc pin and dead CSS

1. Set `.nvmrc` content to `22.12.0` (matches the `engines` floor; CI's
   setup-node resolves it exactly).
2. Delete the commented-out CSS lines: `src/layouts/ResumeLayout.astro`
   lines 73–74 and 83–84 (the `// display:`/`// justify-content:` pair and
   the two `// filter:` lines), and the four commented declarations inside
   the `@media (max-width: 700px)` block of
   `src/layouts/BlogPostLayout.astro` (lines 82–86 region). Delete ONLY
   comment lines; do not reflow surrounding rules.

**Verify**: `cat .nvmrc` → `22.12.0`; `grep -n "// display: flex\|// filter:" src/layouts/*.astro`
→ no matches; `pnpm build` → exit 0.

### Step F: Full gate

**Verify**: `pnpm exec biome ci` → exit 0; `pnpm check:types` → exit 0;
`pnpm build` → exit 0; `pnpm test` → pass; `pnpm check:overrides` → exit 0.

## Test plan

- New unit tests: `tools/lib/resume.test.mjs` (Step D3 cases). There is no
  existing test to pattern-match — this file establishes the pattern:
  `node:test`, `node:assert/strict`, plain ESM.
- New guard: `tools/check-overrides-sync.mjs` wired into CI (negative case
  exercised manually in Step B's verify).
- Verification: `node --test tools/` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `pnpm build` exits 0; `grep -rl "resume-print" dist/sitemap-*.xml` → no files
- [ ] `test ! -d dist/~partytown` and `grep -c partytown package.json` → 0
- [ ] `pnpm check:overrides` exits 0; the script exists and is wired in CI
- [ ] `node --test tools/` exits 0 with ≥ 4 passing tests; `pnpm test` wired in CI
- [ ] `grep -n "yamlQuote" tools/lib/resume.mjs` → ≥ 1 match
- [ ] `cat .nvmrc` → `22.12.0`
- [ ] `pnpm exec biome ci` and `pnpm check:types` exit 0
- [ ] `git status --porcelain` touches only in-scope files
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `grep -rn partytown src/ public/` finds ANY match (something started using
  partytown since this plan was written — removal is then wrong).
- Regenerating the resume in Step D produces a diff in
  `src/pages/resume*.md` — the extraction changed output; do not commit the
  regenerated files, report the diff.
- The two override maps already differ when you first run
  `check:overrides` — that's a live desync; report which side is right
  rather than picking one.
- `astro check` or the build fails after the sitemap filter (API signature
  drift in `@astrojs/sitemap`).

## Maintenance notes

- When a parent dependency update makes a security pin unnecessary, remove it
  from BOTH files in the same commit — `check:overrides` will catch a
  one-sided edit. Re-validating whether each of the 8 pins is still needed
  (remove → `pnpm install` → `pnpm audit`) was deliberately deferred: it
  needs a toggle loop per entry and the audit is currently clean.
- If Vercel's build image moves to pnpm ≥ 10, the `package.json` copy can be
  retired — revisit commit `42710b5`'s rationale first, then update
  CLAUDE.md and the guard script.
- If the resume source heading ever changes, update the regexes in
  `tools/lib/resume.mjs` AND the tests together.
