# Plan 004: Serve project images through astro:assets instead of raw public/ files

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 5abb562..HEAD -- src/pages/projects/ public/images/projects/`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: LOW
- **Depends on**: 001 (link check verifies no image URL broke)
- **Category**: perf
- **Planned at**: commit `5abb562`, 2026-07-07

## Why this matters

The Voyager project page ships ~1.2 MB of images straight from `public/`
with zero build-time processing: seven decoded-frame PNGs at ~140–164 KB each
plus a 228 KB JPG cover. Nothing in `src/` uses `astro:assets` — no format
negotiation (WebP/AVIF), no responsive `srcset`, no build-time resizing. The
decoded-frame PNGs are exactly the kind of image that re-encodes to a
fraction of its size as WebP. Moving them through Astro's `<Image>` component
gets optimization for free with no visual redesign, and establishes the
pattern (`src/assets/` + `astro:assets`) for future images.

## Current state

- All project images live in `public/images/projects/voyager/`:
  `golden-record-cover.jpg` (228K), `spectrogram-first-frames.png`,
  `decoded-calibration-circle.png`, `decoded-measurement-diagram.png`,
  `decoded-earth.png`, `decoded-anatomy.png`, `decoded-fish.png`,
  `decoded-record-instructions.png`.
- The ONLY consumer is `src/pages/projects/voyager-golden-record-explorer.astro`,
  which references them as plain `<img>` tags at lines 134, 145, 160, 168,
  176, 184, 192, 200 — all shaped like:

  ```astro
  <img
      src="/images/projects/voyager/golden-record-cover.jpg"
      alt="The Voyager Golden Record cover diagram"
      loading="lazy"
  />
  ```

  Each sits inside a `<figure>` with a `<figcaption>`; the page's scoped SCSS
  styles them via `.voyager-visuals img` / `.decoded-grid img`
  (`display: block; width: 100%; height: auto; ...` — see lines 275–281).
  Confirm with: `grep -rn "/images/projects" src/` → only this file.
- The other two project pages (`sky-cua.astro`, `emeet-pixy-controller.astro`)
  use no images — only Mermaid diagrams. Do not touch them.
- Astro 7 with `output: "static"`. **Correction (learned during execution):**
  sharp being an allowed build dependency (`pnpm-workspace.yaml`
  `onlyBuiltDependencies`) is NOT sufficient — with pnpm's strict isolation,
  the image service's prerender chunks resolve `sharp` from the project
  root, where a transitive dep is not exposed. Astro requires sharp as a
  **direct** dependency on pnpm; without it, `pnpm build` fails with
  `MissingSharp` for every `<Image>`. Step 1.5 installs it.
- Other `public/images/` files (portraits, `og-card.jpg`, blog post images)
  are referenced from markdown frontmatter, `Layout.astro`'s OG tags, and
  the index page — those need stable public URLs or a separate migration and
  are OUT of scope.
- Conventions: tabs, SCSS in scoped `<style lang="scss">` blocks, Biome
  formatting (`pnpm check` to auto-fix).

## Commands you will need

| Purpose   | Command                        | Expected on success |
|-----------|--------------------------------|---------------------|
| Install   | `pnpm install`                 | exit 0              |
| Lint      | `pnpm exec biome ci`           | exit 0              |
| Typecheck | `pnpm check:types`             | exit 0              |
| Build     | `pnpm build`                   | exit 0              |
| Links     | `pnpm check:links`             | exit 0 (if plan 001 landed) |
| Dev       | `pnpm dev`                     | serves localhost    |

## Scope

**In scope** (the only files you should modify/create/move):
- `src/assets/projects/voyager/` (create; images move here via `git mv`)
- `src/pages/projects/voyager-golden-record-explorer.astro`
- `public/images/projects/voyager/` (removed — contents moved)
- `package.json`, `pnpm-lock.yaml` (add `sharp` devDependency — Step 1.5)

**Out of scope** (do NOT touch):
- `public/images/og-card.jpg` and every portrait/post image in
  `public/images/` — the OG card MUST remain a stable public URL
  (external scrapers fetch it; `Layout.astro:21` and
  `tools/generate-og-card.mjs` both point at it).
- `src/pages/index.astro`, `src/pages/resume*.md`, blog post images —
  frontmatter-referenced; separate concern.
- `sky-cua.astro`, `emeet-pixy-controller.astro` — no images.
- The page's prose, headings, figcaptions, and SCSS layout rules (except the
  minimal tweaks Step 3 allows).

## Git workflow

- Branch: `advisor/004-astro-assets`
- Use `git mv` for the image relocation so history follows the files.
  Suggested single commit: `perf: serve voyager project images via astro:assets`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Move the images into src/assets

```
mkdir -p src/assets/projects/voyager
git mv public/images/projects/voyager/* src/assets/projects/voyager/
```

**Verify**: `ls src/assets/projects/voyager | wc -l` → `8`;
`ls public/images/projects 2>/dev/null` → empty or the directory is gone.

### Step 1.5: Install sharp as a direct devDependency

Required by Astro's default image service under pnpm (see the correction in
"Current state"). Match the version astro already resolves so the pnpm store
is reused:

```
pnpm add -D "sharp@$(grep -o 'sharp@[0-9][0-9.]*' pnpm-lock.yaml | head -1 | cut -d@ -f2)"
```

**Verify**: `grep -n '"sharp"' package.json` → one devDependencies entry.

### Step 2: Convert the page to `<Image>`

In `src/pages/projects/voyager-golden-record-explorer.astro` frontmatter,
add:

```astro
import { Image } from "astro:assets";
import goldenRecordCover from "../../assets/projects/voyager/golden-record-cover.jpg";
import spectrogramFirstFrames from "../../assets/projects/voyager/spectrogram-first-frames.png";
// ...one import per image, camelCase names matching the filenames
```

Replace each `<img src="/images/projects/voyager/..." alt="..." loading="lazy" />`
with:

```astro
<Image
    src={goldenRecordCover}
    alt="The Voyager Golden Record cover diagram"
    widths={[480, 760, 980]}
    sizes="(max-width: 760px) 100vw, 760px"
/>
```

Notes for correctness:
- Keep every `alt` text EXACTLY as it is today (they're descriptive and
  load-bearing for accessibility).
- `loading="lazy"` and `decoding="async"` are `<Image>` defaults — drop the
  explicit attribute.
- For the six `.decoded-grid` frames use
  `sizes="(max-width: 760px) 100vw, 320px"` and `widths={[320, 480, 640]}`
  (they render in an auto-fit grid with ~220–320px columns).
- Let `<Image>` infer output format (it defaults to WebP for PNG/JPG
  sources). Do not set `quality` unless a diagram becomes visibly mushy —
  then `quality="high"` on that one image.

**Verify**: `pnpm check:types` → exit 0 (bad import paths fail here);
`pnpm build` → exit 0.

### Step 3: Confirm optimized output and visual parity

1. `ls dist/_astro/ | grep -Ei '\.(webp|avif)' | head` → optimized variants
   exist.
2. `grep -rn "/images/projects/voyager" dist/` → NO matches (no page still
   references the old public URLs).
3. Compare weight: `du -sh src/assets/projects/voyager` (source, ~1.2M) vs
   the sum of the emitted voyager variants in `dist/_astro/` — expect a
   large reduction for the largest served width.
4. Visual check: `pnpm preview`, open
   `http://localhost:4321/projects/voyager-golden-record-explorer/` and
   confirm the two-column `.voyager-visuals` block and the `.decoded-grid`
   layout are intact (the existing CSS `img { width: 100%; height: auto; }`
   overrides `<Image>`'s width/height attributes, so layout should be
   unchanged). If figures look wrong, the ONLY allowed CSS change is within
   this page's scoped style block.

**Verify**: all four checks above pass; `pnpm check:links` (if present) →
exit 0.

## Test plan

No unit tests apply (template-only change). The gates are:
- build success + typecheck (import paths),
- `grep` proving zero references to the old `/images/projects/voyager/`
  URLs in `dist/`,
- link check (plan 001) proving no broken asset URLs site-wide,
- manual visual pass in `pnpm preview` (Step 3.4).

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `pnpm check:types`, `pnpm exec biome ci`, `pnpm build` all exit 0
- [ ] `grep -rn "/images/projects/voyager" src/ dist/` → no matches
- [ ] `ls dist/_astro/ | grep -ci webp` → ≥ 8 (or avif equivalents)
- [ ] `public/images/projects/` no longer contains the voyager images
- [ ] `git status --porcelain` touches only in-scope paths
- [ ] `pnpm check:links` exits 0 (skip if plan 001 not landed; note it)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `grep -rn "/images/projects" src/ public/ tools/` reveals a consumer of
  these images OTHER than `voyager-golden-record-explorer.astro` (e.g. added
  since this plan was written) — the move would break it.
- The build fails inside the image service (sharp missing/failing on this
  machine) — do not swap image services or add config to work around it.
- Visual layout breaks in a way the page's scoped CSS can't fix without
  touching global styles.

## Maintenance notes

- New images for future project pages should follow this pattern:
  file under `src/assets/`, rendered via `astro:assets` `<Image>`. Reserve
  `public/images/` for assets needing stable URLs (OG card, frontmatter-
  referenced images).
- Deferred, deliberately: migrating portraits/blog/OG images (frontmatter
  and external-scraper constraints), and `<Picture>` with AVIF — add only if
  the WebP sizes still feel heavy.
- Reviewer should eyeball the decoded-frame WebPs for compression artifacts;
  they're diagnostic images where banding would mislead.
