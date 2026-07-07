# Plan 001: Add a broken-link check over the built site, locally and in CI

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 5abb562..HEAD -- package.json .github/workflows/ci.yml`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: tests
- **Planned at**: commit `5abb562`, 2026-07-07

## Why this matters

This is a static, link-heavy personal site (nav links, cross-links between
project pages, blog post links, a `← Projects` back-link). CI currently
verifies lint, types, and that the build *succeeds* — but a renamed page or a
typo'd `href` still builds fine and ships a 404. For a static site, internal
link rot is the single most likely real defect class, and nothing catches it
today. This plan adds an internal-link check over the built `dist/` output as
a local script and a CI gate. It is also the verification baseline that later
plans (image migration, content-collections migration) rely on to prove they
didn't break any URLs.

## Current state

- `.github/workflows/ci.yml` — the only CI workflow. Steps today: checkout,
  pnpm setup, node setup (via `.nvmrc`), `pnpm install --frozen-lockfile`,
  `pnpm exec biome ci`, `pnpm check:types`, `pnpm build`. The build step is
  the last one:

  ```yaml
  # .github/workflows/ci.yml (last step)
      - name: Build
        run: pnpm build
  ```

- `package.json` — scripts block as of this plan:

  ```json
  "scripts": {
      "dev": "astro dev",
      "start": "astro dev",
      "build": "astro build",
      "preview": "astro preview",
      "astro": "astro",
      "sync:resume": "node tools/sync-resume.mjs",
      "export:resume-pdf": "node tools/export-resume-pdf.mjs",
      "generate:og": "node tools/generate-og-card.mjs",
      "check": "biome check --fix",
      "check:types": "astro check"
  }
  ```

- `pnpm build` writes the static site to `dist/` (Astro 7, `output: "static"`
  in `astro.config.mjs`). Internal links in the HTML are root-relative
  (e.g. `href="/resume"`, `href="/projects/"`), so the checker must serve
  `dist/` over HTTP rather than crawl the filesystem — `linkinator` does this
  automatically when pointed at a directory.
- Repo conventions: pnpm only (`packageManager: "pnpm@11.9.0"`), tabs for
  indentation (Biome-enforced), Node >= 22.12.0.

## Commands you will need

| Purpose   | Command                        | Expected on success |
|-----------|--------------------------------|---------------------|
| Install   | `pnpm install`                 | exit 0              |
| Lint      | `pnpm exec biome ci`           | exit 0              |
| Typecheck | `pnpm check:types`             | exit 0, 0 errors    |
| Build     | `pnpm build`                   | exit 0, `dist/` populated |

## Scope

**In scope** (the only files you should modify):
- `package.json` (add devDependency + script)
- `pnpm-lock.yaml` (updated by `pnpm add`)
- `.github/workflows/ci.yml` (add one step)

**Out of scope** (do NOT touch):
- Any file under `src/` — even if the link checker finds a broken link.
  Report broken links as findings; fixing them is not this plan.
- `pnpm-workspace.yaml` — the overrides in it are load-bearing security pins.
- External-link checking — deliberately excluded (see Step 2) to keep CI
  deterministic; do not "improve" the config to include external URLs.

## Git workflow

- Branch: `advisor/001-broken-link-check` (repo has no strict branch
  convention; recent history commits directly to `main` — still use a branch).
- Commit style: short imperative subject, optionally conventional-commit
  prefixed — e.g. `fix(ci): mirror pnpm overrides into package.json for
  Vercel's pnpm 9` is a recent example from `git log`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add linkinator as a devDependency

Run:

```
pnpm add -D linkinator
```

**Verify**: `pnpm exec linkinator --version` → prints a version number, exit 0.

### Step 2: Add a `check:links` script

In `package.json` scripts, after `"check:types"`, add:

```json
"check:links": "linkinator ./dist --recurse --skip \"^(?!http://localhost)\""
```

The `--skip "^(?!http://localhost)"` regex skips every URL that does not
resolve to the local static server linkinator spins up for `./dist` — i.e.
it checks **internal links only**. External links are excluded on purpose:
third-party sites rate-limit CI crawlers and would make the gate flaky.

**Verify**: `pnpm build && pnpm check:links` → exit 0, output ends with a
summary reporting scanned links and `0` failures (all non-skipped links
return 200).

### Step 3: Prove the check catches a broken link

Temporary sanity check (revert afterwards, do not commit):

1. In `dist/index.html`, hand-edit one nav href (e.g. change
   `href="/resume"` to `href="/resume-typo"`).
2. Run `pnpm check:links` → it must exit **non-zero** and name the broken URL.
3. Run `pnpm build` again to regenerate a clean `dist/`.

**Verify**: after the rebuild, `pnpm check:links` → exit 0 again.

### Step 4: Add the CI step

In `.github/workflows/ci.yml`, append after the `Build` step (same
indentation as the other steps):

```yaml
      - name: Check internal links
        run: pnpm check:links
```

**Verify**: `pnpm exec biome ci` → exit 0 (biome checks the workflow file is
untouched by formatting issues; YAML is not biome-linted, so also visually
confirm the step indentation matches the `Build` step exactly).

## Test plan

The check *is* the test. Coverage added:

- Every internal `href`/`src` in every built page is verified to resolve
  (Step 2's script, run in CI by Step 4).
- Negative case exercised manually once in Step 3 (not committed).

No unit-test files are added; there is no test runner in this repo yet.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `pnpm exec biome ci` exits 0
- [ ] `pnpm check:types` exits 0
- [ ] `pnpm build && pnpm check:links` exits 0
- [ ] `grep -n "check:links" package.json` → one match
- [ ] `grep -n "check:links" .github/workflows/ci.yml` → one match
- [ ] `git status --porcelain` shows only `package.json`, `pnpm-lock.yaml`,
      `.github/workflows/ci.yml` modified
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `pnpm check:links` on a clean build reports genuinely broken internal links
  in the current site. That means the site has live link rot **today** —
  report the URLs; do not fix pages and do not silently `--skip` them.
- `pnpm add -D linkinator` fails to resolve (registry/network issue).
- The regex skip pattern doesn't behave as described (e.g. linkinator's CLI
  changed its `--skip` semantics in the installed major version).

## Maintenance notes

- Plans 004 (image migration) and 005 (content collections) use this check as
  their URL-stability gate; if you tune the skip pattern later, keep internal
  coverage complete.
- If a future page legitimately links to something not in `dist/` (e.g. a
  `mailto:`), linkinator skips non-http schemes by default — no config needed.
- Deliberately deferred: external-link checking (flaky in CI) and HTML
  validation (low value for Astro-generated markup).
