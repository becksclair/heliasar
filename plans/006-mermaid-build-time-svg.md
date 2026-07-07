# Plan 006: Render Mermaid diagrams at build time — ship SVG, not the mermaid runtime

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 5abb562..HEAD -- src/components/MermaidDiagram.astro src/pages/projects/ package.json`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P3
- **Effort**: L
- **Risk**: MED (visual parity of pre-rendered SVGs; committed-artifact drift)
- **Depends on**: 001 (link check as regression gate); run AFTER 004 if both
  are scheduled (both touch project pages' rendering — sequencing avoids
  merge conflicts)
- **Category**: perf
- **Planned at**: commit `5abb562`, 2026-07-07

## Why this matters

Every project page hydrates the full Mermaid runtime in the browser to draw
diagrams whose source text is hardcoded in the page at build time. Verified
bundle cost in `dist/_astro/`: a 648K base chunk, plus per-diagram-type
chunks (cytoscape 428K, katex 256K, sequence 116K, etc.). Visitors pay
~750K+ of JS per project page to render static pictures. Pre-rendering the
diagrams to SVG once, committing the SVGs, and deleting the client script
drops that to zero runtime JS — and removes `mermaid` from the production
dependency graph entirely. The chosen approach (commit the SVGs, regenerate
via a pnpm script) deliberately avoids needing a headless browser in CI.

## Current state

- `src/components/MermaidDiagram.astro` — the whole component (76 lines):
  props `{ title, chart, caption? }`; renders
  `<figure class="mermaid-diagram"><figcaption>…</figcaption><pre class="mermaid-diagram__chart">{chart}</pre></figure>`;
  a client `<script>` at lines 19–43 does `import mermaid from "mermaid"`,
  `mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: "base", themeVariables: {…} })`
  and `await mermaid.run({ nodes: diagrams })`. The `themeVariables` block
  (lines 26–35) defines the site's diagram palette — preserve it exactly:

  ```js
  themeVariables: {
      background: "#ffffff",
      primaryColor: "#faefff",
      primaryTextColor: "#0e0016",
      primaryBorderColor: "#7c3aed",
      lineColor: "#475467",
      secondaryColor: "#f7d9ff",
      tertiaryColor: "#fff7ed",
      fontFamily: "ChiKareGo2, Geneva, sans-serif",
  },
  ```

- Six diagrams across three pages, each defined as a template-literal const
  in the page frontmatter and passed as `chart`:
  - `src/pages/projects/sky-cua.astro:5` `architectureDiagram` (flowchart),
    `:39` `actionLoopDiagram` (sequenceDiagram); used at lines 144, 150.
  - `src/pages/projects/emeet-pixy-controller.astro:5`
    `reverseEngineeringDiagram` (flowchart), `:25` `previewPipelineDiagram`
    (flowchart); used at lines 113, 119.
  - `src/pages/projects/voyager-golden-record-explorer.astro:5`
    `decodePipelineDiagram` (flowchart), `:25` `workerDiagram`
    (sequenceDiagram); used at lines 109, 115.
- `mermaid` is a production dependency in `package.json` (`^11.16.0`).
- The component's `<style lang="scss">` block (figure border, gradient
  background, figcaption styling) is presentation-only — keep it.
- Conventions: tabs, Biome, pnpm, Node ESM `.mjs` scripts in `tools/` (see
  `tools/generate-og-card.mjs` for the established script style: `#!/usr/bin/env node`,
  header comment documenting usage, `node:` imports, env-var overrides).

## Commands you will need

| Purpose    | Command                        | Expected on success |
|------------|--------------------------------|---------------------|
| Install    | `pnpm install`                 | exit 0              |
| Lint       | `pnpm exec biome ci`           | exit 0              |
| Typecheck  | `pnpm check:types`             | exit 0              |
| Build      | `pnpm build`                   | exit 0              |
| Links      | `pnpm check:links`             | exit 0 (if plan 001 landed) |
| Render     | `pnpm generate:diagrams`       | writes 6 SVGs (created in Step 3) |

## Suggested executor toolkit

- `@mermaid-js/mermaid-cli` (`mmdc`) — the official CLI; uses Puppeteer with
  a bundled/system Chromium. This machine has Chromium available (see
  `tools/export-resume-pdf.mjs`'s detection list — the repo's PDF tooling
  already assumes a local Chrome/Chromium). If `mmdc`'s Puppeteer download is
  blocked, point it at the system browser via a `puppeteer-config.json` with
  `{ "executablePath": "<path from `which chromium chromium-browser google-chrome-stable google-chrome | head -1`>" }`
  and pass `-p tools/puppeteer-config.json`.

## Scope

**In scope** (the only files you should modify/create):
- `src/diagrams/*.mmd` (create — 6 files, diagram sources extracted)
- `src/assets/diagrams/*.svg` (create — 6 committed rendered SVGs)
- `tools/render-diagrams.mjs` (create)
- `tools/mermaid-theme.json` (create)
- `src/components/MermaidDiagram.astro` (rewrite: inline SVG, no client JS)
- `src/pages/projects/sky-cua.astro`,
  `src/pages/projects/emeet-pixy-controller.astro`,
  `src/pages/projects/voyager-golden-record-explorer.astro`
  (swap chart-string props for SVG imports)
- `package.json`, `pnpm-lock.yaml` (remove `mermaid` dep; add
  `@mermaid-js/mermaid-cli` as devDependency; add `generate:diagrams` script)

**Out of scope** (do NOT touch):
- CI (`.github/workflows/ci.yml`) — deliberately NOT regenerating diagrams
  in CI (needs a browser). The SVGs are committed artifacts like
  `og-card.jpg`.
- Page prose, figcaptions, and the voyager images (plan 004's territory).
- The component's figure/figcaption SCSS.

## Git workflow

- Branch: `advisor/006-mermaid-prerender`
- Suggested commits: `feat(tools): add mermaid diagram pre-renderer`, then
  `perf: replace client-side mermaid with committed build-time SVGs`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Extract diagram sources to .mmd files

Create `src/diagrams/` and move each template-literal chart into its own
file, content EXACTLY as the current string (unindent to column 0):

| File | Source |
|---|---|
| `sky-cua-architecture.mmd` | `sky-cua.astro:5` |
| `sky-cua-action-loop.mmd` | `sky-cua.astro:39` |
| `emeet-reverse-engineering.mmd` | `emeet-pixy-controller.astro:5` |
| `emeet-preview-pipeline.mmd` | `emeet-pixy-controller.astro:25` |
| `voyager-decode-pipeline.mmd` | `voyager-golden-record-explorer.astro:5` |
| `voyager-worker-loop.mmd` | `voyager-golden-record-explorer.astro:25` |

Leave the `.astro` pages untouched for now (the consts stay until Step 5).

**Verify**: `ls src/diagrams/*.mmd | wc -l` → 6.

### Step 2: Theme config

Create `tools/mermaid-theme.json` reproducing the current init options:

```json
{
    "theme": "base",
    "themeVariables": {
        "background": "#ffffff",
        "primaryColor": "#faefff",
        "primaryTextColor": "#0e0016",
        "primaryBorderColor": "#7c3aed",
        "lineColor": "#475467",
        "secondaryColor": "#f7d9ff",
        "tertiaryColor": "#fff7ed",
        "fontFamily": "ChiKareGo2, Geneva, sans-serif"
    }
}
```

(`securityLevel` is irrelevant at build time with author-controlled input;
`startOnLoad` is a browser concern. Omit both.)

**Verify**: `node -e "JSON.parse(require('node:fs').readFileSync('tools/mermaid-theme.json','utf8'))"` → exit 0.

### Step 3: Renderer script

`pnpm add -D @mermaid-js/mermaid-cli`, then create `tools/render-diagrams.mjs`
following the house style of `tools/generate-og-card.mjs` (shebang, usage
header comment). Behavior: for each `src/diagrams/*.mmd`, run `mmdc` to
produce `src/assets/diagrams/<name>.svg`:

```js
// core of the loop — spawn per file, arg-array style like the other tools
execFileSync("pnpm", [
    "exec", "mmdc",
    "-i", inputPath,
    "-o", outputPath,
    "-c", `${root}/tools/mermaid-theme.json`,
    "-b", "transparent",
], { stdio: "inherit" });
```

Add `"generate:diagrams": "node tools/render-diagrams.mjs"` to package.json
scripts. Run it.

**Verify**: `pnpm generate:diagrams` → exit 0;
`ls src/assets/diagrams/*.svg | wc -l` → 6; each SVG starts with `<svg`
(`head -c 200 src/assets/diagrams/*.svg`). Open one in a browser and confirm
the purple/lavender palette matches the current site's diagrams (compare
against `pnpm preview` of the unmodified build if unsure).

### Step 4: Rewrite MermaidDiagram.astro

Replace the component with an SVG-inlining version — same props shape except
`chart` (string) becomes `svg` (raw SVG string); keep the figure/figcaption
markup and the entire `<style lang="scss">` block; DELETE the whole
`<script>` block:

```astro
---
export interface Props {
    title: string;
    svg: string;
    caption?: string;
}

const { title, svg, caption } = Astro.props;
---

<figure class="mermaid-diagram">
    <figcaption>
        <strong>{title}</strong>
        {caption && <span>{caption}</span>}
    </figcaption>
    <div class="mermaid-diagram__chart" set:html={svg} />
</figure>
```

(`set:html` is safe here: the SVG is a committed, author-generated artifact,
not user input.) Update the `.mermaid-diagram__chart` SCSS selector from
`pre` semantics if needed — it's class-based already, so likely no change;
add `svg { max-width: 100%; height: auto; }` inside it so diagrams stay
responsive.

**Verify**: `pnpm check:types` → exit 0 (pages still pass `chart`, so
EXPECT errors here until Step 5 — run the check after Step 5; treat this
step's verify as deferred).

### Step 5: Swap the pages to SVG imports

In each project page: delete the diagram template-literal consts and import
the SVGs raw instead, e.g. in `voyager-golden-record-explorer.astro`:

```astro
import decodePipelineSvg from "../../assets/diagrams/voyager-decode-pipeline.svg?raw";
import workerLoopSvg from "../../assets/diagrams/voyager-worker-loop.svg?raw";
```

and change each usage:

```astro
<MermaidDiagram
    title="Decode pipeline"
    caption="The audio is treated as an inspectable signal path, not a black-box converter."
    svg={decodePipelineSvg}
/>
```

Titles and captions stay EXACTLY as they are today (six call sites listed in
"Current state").

**Verify**: `pnpm check:types` → exit 0; `pnpm build` → exit 0.

### Step 6: Remove the mermaid dependency and confirm the payload win

1. `pnpm remove mermaid`
2. `pnpm build`

**Verify**:
- `grep -rli "mermaid" dist/_astro/ | head` → no JS chunks containing the
  mermaid runtime (the name may appear in CSS class names within HTML —
  that's fine; check `dist/_astro/*.js` specifically):
  `ls dist/_astro/*.js 2>/dev/null | wc -l` → expect only the small NavBar
  script chunk(s); no 600K+ file: `find dist/_astro -name "*.js" -size +200k`
  → empty.
- `grep -c "<svg" dist/projects/sky-cua/index.html` → ≥ 2 (diagrams inlined).
- `pnpm check:links` (if present) → exit 0.
- Visual: `pnpm preview`, open all three project pages, confirm all six
  diagrams render with correct theme and no layout overflow (the figure has
  `overflow-x: auto` for wide diagrams — keep it working).

## Test plan

No unit tests (rendering pipeline + templates). Gates: the payload
assertions and grep checks in Step 6, typecheck, build, link check, and the
three-page visual pass. Negative check: delete one SVG, run
`pnpm check:types`/`pnpm build` → must fail on the missing import; restore
(regenerate via `pnpm generate:diagrams`).

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `pnpm exec biome ci`, `pnpm check:types`, `pnpm build` all exit 0
- [ ] `find dist/_astro -name "*.js" -size +200k` → empty
- [ ] `grep -c "mermaid" package.json` → matches only `@mermaid-js/mermaid-cli`
      in devDependencies (production `mermaid` gone)
- [ ] All three project pages in `dist/` contain their two inline `<svg`
- [ ] 6 `.mmd` sources and 6 committed `.svg` outputs exist;
      `pnpm generate:diagrams` regenerates them idempotently (run twice,
      `git status` shows no churn — if SVG output is nondeterministic,
      note it in the report; it's acceptable but should be known)
- [ ] `git status --porcelain` touches only in-scope files
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `mmdc` cannot launch a browser even with the `puppeteer-config.json`
  executablePath fallback — do NOT switch to a different rendering library
  (`mermaid-isomorphic`, playwright scripts, etc.) without sign-off; that's
  an architecture change.
- A rendered SVG is visually broken (mis-laid-out sequence diagram,
  overlapping labels) and theme/config tweaks within `tools/mermaid-theme.json`
  don't fix it — the client renderer and mmdc occasionally disagree on
  layout; this needs a human eye.
- The rendered SVGs embed the `ChiKareGo2` font reference but the glyphs
  fall back to something illegible in preview — font handling in SVG output
  may need `fontFamily` adjustment; propose, don't improvise.
- Any diagram source in the pages differs from the "Current state" listing
  (diagrams added/edited since planning).

## Maintenance notes

- **Editing a diagram now means**: edit `src/diagrams/<name>.mmd`, run
  `pnpm generate:diagrams`, commit both the `.mmd` and the `.svg`. Document
  this in README/CLAUDE.md (extends plan 002's tools section).
- The committed-SVG approach trades CI simplicity for drift risk (someone
  edits a `.mmd` and forgets to regenerate). If that bites, the follow-up is
  a CI browser step or a content-hash check — deferred until it actually
  hurts.
- Reviewer: diff the six SVGs against screenshots of the current
  client-rendered diagrams; theme parity is the main quality risk.
- After this plan, `MermaidDiagram.astro` is misnamed (it renders any SVG
  figure). Renaming was deliberately skipped to keep the diff reviewable.
