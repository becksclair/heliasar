# heliasar.com

Personal website of Rebecca Clair: resume, projects, and blog. Built with Astro, deployed on Vercel.

## Stack

- [Astro 7](https://astro.build) with static output (`output: "static"` in `astro.config.mjs`), adapted for Vercel via `@astrojs/vercel`.
- Integrations: `@astrojs/partytown`, `astro-robots-txt`, `@astrojs/sitemap`.
- Styling: one global stylesheet (`src/styles/styles.scss`) plus scoped `<style lang="scss">` blocks in components, layered on top of the retro `public/systemcss/system.css` theme.
- Linting/formatting: [Biome](https://biomejs.dev) (`biome.jsonc`, tabs).
- Types: `astro check` via `@astrojs/check`.
- Package manager: pnpm 11 (`packageManager` field in `package.json`). Node >= 22.12.0 (see `.nvmrc` / `engines`).

## Getting started

```sh
pnpm install
pnpm dev
```

All scripts are run with pnpm — this repo is pnpm-only, never `npm`/`yarn`:

| Command                  | Action                                                   |
| ------------------------- | --------------------------------------------------------- |
| `pnpm dev` / `pnpm start` | Start the local dev server                               |
| `pnpm build`              | Build the production site to `./dist/`                   |
| `pnpm preview`            | Preview the production build locally                     |
| `pnpm astro ...`          | Run Astro CLI commands (e.g. `pnpm astro -- --help`)      |
| `pnpm check`              | Run Biome checks with auto-fix                            |
| `pnpm check:types`        | Type-check with `astro check`                              |
| `pnpm sync:resume`        | Regenerate the resume pages from the external source file |
| `pnpm export:resume-pdf`  | Build the site and export the print resume as a PDF       |
| `pnpm generate:og`        | Regenerate the Open Graph / social card image             |

## Project structure

```
src/
├── components/       # NavBar, Card, Social, MermaidDiagram
├── layouts/
│   ├── Layout.astro          # site shell: OG/Twitter/canonical meta, applies to all pages
│   ├── BlogPostLayout.astro
│   ├── ResumeLayout.astro        # web resume
│   └── ResumePrintLayout.astro   # standalone A4 page for PDF export (noindex)
├── pages/             # routes — one file = one page
│   ├── blog.astro
│   ├── index.astro
│   ├── projects.astro
│   ├── posts/
│   ├── projects/
│   ├── resume.md            # GENERATED — see Resume pipeline below
│   ├── resume-print.md      # GENERATED — see Resume pipeline below
│   ├── _music.astro         # underscore prefix = intentionally unrouted draft
│   └── _photography.astro   # underscore prefix = intentionally unrouted draft
└── styles/
    └── styles.scss   # global stylesheet
tools/                # Node scripts — see Resume pipeline below
runtime/              # gitignored local artifacts (e.g. exported PDFs)
```

Astro only routes files directly under `src/pages/`; files prefixed with an underscore (`_music.astro`, `_photography.astro`) are a deliberate Astro convention for excluding a page from routing while keeping it in the tree as a draft.

## Resume pipeline

The resume content lives in an external source file and is synced into the repo by the scripts in `tools/`. **`src/pages/resume.md` and `src/pages/resume-print.md` are generated — do not hand-edit them**; edit the source file and re-run `pnpm sync:resume`.

- **`tools/sync-resume.mjs`** — reads the resume source (default `/home/bex/HeliasMind/30 Areas/Personal/Rebecca Clair - Resume.md`, overridable via `RESUME_SOURCE`) and writes both `src/pages/resume.md` (using `ResumeLayout`) and `src/pages/resume-print.md` (using `ResumePrintLayout`) with identical bodies and different frontmatter.
- **`tools/export-resume-pdf.mjs`** — runs `sync:resume`, then `pnpm build`, serves `dist/` via `python -m http.server` on `127.0.0.1:4328` (override with `RESUME_EXPORT_PORT`), and prints `/resume-print/` to PDF using headless Chrome/Chromium (auto-detected from `google-chrome-stable`, `google-chrome`, `chromium`, `chromium-browser`; override with `CHROME_BIN`). Output defaults to `runtime/resume-export/Rebecca_Clair_Resume.pdf` (override via argv or `RESUME_PDF`). Requires `python` and a Chrome/Chromium binary on the host.
- **`tools/generate-og-card.mjs`** — regenerates the 1200x630 social card at `public/images/og-card.jpg` using ImageMagick (`magick` CLI required). Title/subtitle text is pulled from `src/pages/resume.md` frontmatter; the photo defaults to `public/images/rebecca_clair6.webp`, falling back to `rebecca_clair5.webp` (overrides: `OG_CARD_PHOTO`, `OG_CARD_OUT`).

## Deployment

The site deploys to Vercel as a static build (`output: "static"` with the `@astrojs/vercel` adapter). GitHub Actions CI (`.github/workflows/ci.yml`) gates every push/PR with:

1. Install dependencies (`pnpm install --frozen-lockfile`)
2. Lint & format (`pnpm exec biome ci`)
3. Type check (`pnpm check:types`)
4. Build (`pnpm build`)
