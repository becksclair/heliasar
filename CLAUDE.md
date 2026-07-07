# CLAUDE.md

Commands and traps for this repo. See `README.md` for the full project overview.

## Commands

- `pnpm dev` — local dev server.
- `pnpm build` — production build to `./dist/`.
- `pnpm check` — Biome check with auto-fix (run before committing).
- `pnpm exec biome ci` — Biome check without auto-fix (what CI runs).
- `pnpm check:types` — `astro check`.
- `pnpm sync:resume` / `pnpm export:resume-pdf` / `pnpm generate:og` — resume/OG pipeline, see below.

pnpm only — never `npm` or `yarn`. Node >= 22.12.0.

## Traps

- **Formatting is Biome-enforced (tabs).** Run `pnpm check` before committing; CI runs `pnpm exec biome ci` and will fail on unformatted code.
- **`src/pages/resume.md` and `src/pages/resume-print.md` are GENERATED** by `tools/sync-resume.mjs` from an external source file. Never hand-edit them — edit the source and re-run `pnpm sync:resume`, or your changes will be silently clobbered on the next sync.
- **Underscore-prefixed files in `src/pages/`** (e.g. `_music.astro`, `_photography.astro`) are intentional unrouted drafts, not dead code — Astro excludes them from routing by convention.
- **The pnpm `overrides` block is duplicated** in `pnpm-workspace.yaml` (read by local pnpm 11) and `package.json` `pnpm.overrides` (read by Vercel's pnpm 9), added in commit `42710b5`. Both copies must stay identical — do not delete or "deduplicate" one, or Vercel builds will use unpatched transitive dependency versions.
- **Page meta (OG/Twitter/canonical) is centralized** in `src/layouts/Layout.astro`. New pages should pass props into the layout, not add their own meta tags.
- `tools/*.mjs` scripts have real host requirements (Chrome/Chromium + `python` for PDF export, ImageMagick's `magick` CLI for the OG card) — don't assume they'll work in every environment.
