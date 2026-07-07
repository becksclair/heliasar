# Plan 002: Replace the starter README with real docs and add CLAUDE.md

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 5abb562..HEAD -- README.md tools/ package.json`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs
- **Planned at**: commit `5abb562`, 2026-07-07

## Why this matters

`README.md` is still the verbatim "Astro Starter Kit: Basics" boilerplate — it
documents a fictional file tree and `npm` commands for a pnpm-only repo. Worse,
the three non-obvious workflows in `tools/` (resume sync from an external
source file, headless-Chrome PDF export, ImageMagick OG-card generation) are
completely undocumented, and two committed files (`src/pages/resume.md`,
`src/pages/resume-print.md`) are **generated artifacts** that look hand-editable
but get clobbered by the next sync. There is also no `CLAUDE.md`, so coding
agents re-derive the repo's conventions every session. This plan replaces the
README with accurate docs and adds a concise `CLAUDE.md`.

## Current state

- `README.md:1` — begins `# Astro Starter Kit: Basics`, includes the
  "🧑‍🚀 Seasoned astronaut? Delete this file." placeholder and an `npm`
  command table. Nothing in it describes this project.
- No `CLAUDE.md` or `AGENTS.md` exists at the repo root (`.claude/` is
  gitignored — see the last line of `.gitignore`).
- Facts to document (all verified against the code at `5abb562`; re-verify
  quickly if drifted):

  **Stack**: Astro 7 static site (`output: "static"` in `astro.config.mjs`)
  for https://heliasar.com, deployed on Vercel via `@astrojs/vercel`.
  Integrations: partytown, robots-txt, sitemap (NOTE: plan 003 may remove
  partytown — if `astro.config.mjs` no longer lists it when you write this,
  document the current list, not this snapshot). Styling: one global
  `src/styles/styles.scss` plus scoped `<style lang="scss">` blocks, and the
  retro `public/systemcss/system.css` theme. Lint/format: Biome
  (`biome.jsonc`, tabs). Types: `astro check`. Node >= 22.12.0, pnpm 11
  (`packageManager` field).

  **Layout**: `src/pages/` (routes; underscore-prefixed files like
  `_photography.astro` and `_music.astro` are unrouted drafts — an Astro
  convention worth stating), `src/layouts/` (`Layout` = site shell with all
  OG/Twitter/canonical meta; `BlogPostLayout`; `ResumeLayout` = web resume;
  `ResumePrintLayout` = standalone A4 page for PDF export, `noindex`),
  `src/components/` (`NavBar`, `Card`, `Social`, `MermaidDiagram`),
  `tools/` (Node scripts, below), `runtime/` (gitignored local artifacts,
  e.g. exported PDFs).

  **Scripts** (from `package.json`): `dev`, `build`, `preview`,
  `check` (biome, auto-fix), `check:types`, `sync:resume`,
  `export:resume-pdf`, `generate:og`. If plan 001 has landed there is also
  `check:links`. Document whatever is present.

  **The `tools/` pipeline** (verified by reading the scripts):
  - `tools/sync-resume.mjs` — regenerates BOTH `src/pages/resume.md` and
    `src/pages/resume-print.md` (identical body, different `layout:`
    frontmatter) from a single external source. Source path defaults to
    `/home/bex/HeliasMind/30 Areas/Personal/Rebecca Clair - Resume.md`
    (`tools/sync-resume.mjs:8-9`), overridable via the `RESUME_SOURCE` env
    var. Key consequence to document: **`src/pages/resume.md` and
    `src/pages/resume-print.md` are generated — do not hand-edit them.**
  - `tools/export-resume-pdf.mjs` — runs `sync:resume`, `pnpm build`, serves
    `dist/` via `python -m http.server` on 127.0.0.1:4328 (override:
    `RESUME_EXPORT_PORT`), and prints `/resume-print/` to PDF with headless
    Chrome/Chromium (auto-detected from `google-chrome-stable`,
    `google-chrome`, `chromium`, `chromium-browser`; override: `CHROME_BIN`).
    Output: `runtime/resume-export/Rebecca_Clair_Resume.pdf` (override: argv
    or `RESUME_PDF`). Host requirements: `python`, a Chrome/Chromium binary.
  - `tools/generate-og-card.mjs` — regenerates the 1200x630 social card
    `public/images/og-card.jpg` using ImageMagick (`magick` CLI required).
    Text comes from `src/pages/resume.md` frontmatter; the photo defaults to
    `public/images/rebecca_clair6.webp` with fallback to `rebecca_clair5.webp`
    (overrides: `OG_CARD_PHOTO`, `OG_CARD_OUT`).

  **Dependency pinning gotcha** (from commit `42710b5`): the security
  overrides exist in BOTH `pnpm-workspace.yaml` (read by local pnpm 11) and
  `package.json` `pnpm.overrides` (read by Vercel's pnpm 9). They must be
  kept identical. Document this in CLAUDE.md — it's exactly the kind of trap
  an agent will "clean up" otherwise.

- Repo conventions for the docs themselves: clean professional prose, no
  emoji, no persona. Markdown files are Biome-formatted (tabs don't apply to
  prose, but run `pnpm check` before committing).

## Commands you will need

| Purpose   | Command              | Expected on success |
|-----------|----------------------|---------------------|
| Lint      | `pnpm exec biome ci` | exit 0              |
| Typecheck | `pnpm check:types`   | exit 0              |
| Build     | `pnpm build`         | exit 0              |

## Scope

**In scope** (the only files you should create/modify):
- `README.md` (rewrite)
- `CLAUDE.md` (create)

**Out of scope** (do NOT touch):
- `tools/*.mjs` — document them, don't refactor them (plan 003 touches
  `sync-resume.mjs`).
- `src/pages/resume.md`, `src/pages/resume-print.md` — generated files.
- `package.json`, `astro.config.mjs` — read-only reference for this plan.

## Git workflow

- Branch: `advisor/002-real-readme`
- One commit, e.g. `docs: replace starter README, document tools pipeline, add CLAUDE.md`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Rewrite README.md

Delete the starter content entirely. Write a README with these sections
(use the facts from "Current state"; verify each against the live code as
you write it):

1. **Title + one-liner** — `# heliasar.com` — personal website of Rebecca
   Clair: resume, projects, blog. Built with Astro, deployed on Vercel.
2. **Stack** — Astro 7 (static output), SCSS + system.css theme, Biome,
   TypeScript via `astro check`, pnpm 11, Node >= 22.12.0.
3. **Getting started** — `pnpm install`, `pnpm dev`, plus a command table
   covering every script in `package.json` (pnpm invocations only).
4. **Project structure** — the real tree (see Current state), including the
   underscore-draft-page convention and that `runtime/` is gitignored output.
5. **Resume pipeline** — the three `tools/` scripts: what each reads/writes,
   env-var overrides, host requirements (Chrome/Chromium + python for PDF
   export; ImageMagick for the OG card), and the generated-files warning for
   `src/pages/resume*.md`.
6. **Deployment** — Vercel, static output, CI gates on GitHub Actions
   (list the actual steps from `.github/workflows/ci.yml`).

**Verify**: `grep -c "Astro Starter Kit\|Seasoned astronaut\|npm run" README.md`
→ `0`; `grep -c "RESUME_SOURCE" README.md` → at least `1`.

### Step 2: Create CLAUDE.md

Keep it short (~40–60 lines) — commands and traps, not prose. Required
content:

- Build/verify commands: `pnpm dev`, `pnpm build`, `pnpm exec biome ci`
  (check) / `pnpm check` (auto-fix), `pnpm check:types`, and `pnpm
  check:links` if it exists.
- pnpm only; never npm/yarn. Node >= 22.12.0.
- Formatting is Biome-enforced (tabs); run `pnpm check` before committing.
- `src/pages/resume.md` and `src/pages/resume-print.md` are GENERATED by
  `tools/sync-resume.mjs` — never hand-edit; edit the source and re-run
  `pnpm sync:resume`.
- Underscore-prefixed files in `src/pages/` are intentional unrouted drafts.
- The pnpm overrides duplication (`pnpm-workspace.yaml` + `package.json`)
  is intentional for Vercel's pnpm 9 — keep both copies identical, never
  delete one (cite commit `42710b5`).
- Page meta (OG/Twitter/canonical) is centralized in
  `src/layouts/Layout.astro` — new pages pass props, they don't add meta tags.

**Verify**: `test -f CLAUDE.md && grep -c "sync-resume\|42710b5" CLAUDE.md`
→ ≥ 2.

### Step 3: Lint and sanity-build

**Verify**: `pnpm exec biome ci` → exit 0; `pnpm build` → exit 0 (docs can't
break the build; this confirms you didn't accidentally touch anything else).

## Test plan

Docs-only change; the verification greps in Steps 1–2 plus the done criteria
are the test. No test files.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `grep -c "Astro Starter Kit" README.md` → 0
- [ ] `grep -ci "pnpm" README.md` → ≥ 5 and `grep -c "npm run" README.md` → 0
- [ ] README documents all three `tools/` scripts (`grep -c "sync-resume\|export-resume-pdf\|generate-og-card" README.md` → ≥ 3)
- [ ] `CLAUDE.md` exists with the generated-files and overrides-duplication warnings
- [ ] `pnpm exec biome ci` exits 0
- [ ] `git status --porcelain` shows only `README.md` and `CLAUDE.md`
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- A fact in "Current state" doesn't match the live code (e.g. partytown
  already removed, scripts renamed) in a way you can't resolve by simply
  documenting the current truth.
- You find yourself wanting to *change* behavior (rename a script, move a
  file) to make it easier to document — that's out of scope.

## Maintenance notes

- Plans 003–006 change scripts, integrations, and the content pipeline; each
  instructs its executor to update README/CLAUDE.md if their content drifts.
  A reviewer should check docs stayed truthful whenever `package.json`
  scripts change.
- Deferred: a `tools/README.md` — the README section covers it; split it out
  only if `tools/` grows.
