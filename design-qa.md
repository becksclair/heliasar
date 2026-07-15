# Design QA

## Target

Restyle the existing site around the visual language of the supplied hiring-story audit: compact glass navigation, Chicago display typography, dash-led eyebrow labels, pale lavender canvas, violet-to-pink accents, and readable contemporary body copy. Preserve the site's content, project structure, portrait, and retro-window character rather than reproducing the audit page literally.

Reference: `/tmp/codex-clipboard-cf1c3307-997a-43b6-a1d1-29d269f088c0.png`

Comparison: `output/playwright/design-qa-comparison.png`

## Iteration history

### Pass 1

- Implemented shared light/dark color tokens, display/body typography roles, navigation, eyebrow treatment, surfaces, buttons, cards, project pages, blog, and resume styling.
- Laptop review at 1627 x 944 found the homepage thesis too large: it consumed nearly the entire first viewport and delayed both actions and supporting context.
- Severity: P1 visual hierarchy issue.

### Pass 2

- Reduced the laptop thesis scale while retaining the reference's decisive editorial weight.
- Verified homepage, projects index, Skynet case study, resume, and blog at the target laptop viewport.
- Result: primary actions and the beginning of the personal introduction are visible in the first viewport; long-form pages retain readable measure and hierarchy.

### Pass 3

- Phone review at 390 x 844 found the wide display face wrapping too aggressively.
- Reduced phone-only headline and page-title scales without changing the laptop composition.
- Verified the responsive navigation opens, exposes all four destinations, reports its expanded state, and remains keyboard dismissible.

### Pass 4 — card interaction restoration

- Compared the supplied original hover-state screenshot with the restyled project cards.
- Initially replaced the old interaction with a newly designed gloss treatment. This did not match the requested effect and was removed.
- Restored the original 400% background-position sweep, translucent inner surface, 0.6-second easing curve, radius, shadow, and title-color transition from Git.
- The original card effect depended on a purple-pink-white `--accent-gradient` formerly declared by `Layout.astro`. The redesign changed that global token to a dark hero gradient, which produced an incorrect dark border. The card now carries its original `45deg` purple → `#da62c4` → white gradient locally, preserving the historical animated border independently of the hero gradient.
- Verified with a focused-card capture at 1627 x 944 in the user's Brave browser: the animated rim resolves to pink/purple with no dark outline.

### Pass 5 — project index type scale

- The audit-inspired global display scale made the project index read like a second landing-page hero and consumed too much of the laptop viewport.
- Added a project-index-specific scale: the page title now tops out at 4.75rem, section headings at 2.75rem, intro copy at 1rem, and the intro surface uses tighter padding.
- Tightened group spacing while leaving the homepage thesis and long-form case-study hierarchy unchanged.
- Verified at the target 1627 x 944 viewport in the user's Brave browser. The title, introduction, section heading, lede, and first row of cards now fit together in one readable laptop view.

### Pass 6 — blog removal

- Removed Blog from desktop and mobile navigation.
- Removed the `/blog`, `/posts/*`, and `/rss.xml` routes, the blog content collection and post layout, the sole post and its image, the RSS dependency, and RSS discovery metadata.
- Updated the default site description and README so the site presents only the resume and selected systems work.
- Verified the three-item navigation in the user's Brave browser, a clean 15-page production build, and 52 passing internal links.

### Pass 7 — resume export integrity

- Reproduced the audited defect: the baseline export was four A4 pages, page 2 began with a continued bullet list, and page 4 contained only the technology tail with most of the page blank.
- Fixed exporter argument handling so `pnpm export:resume-pdf -- path/to/file.pdf` no longer writes to a file literally named `--`.
- Reworked print-only type, spacing, margins, and pagination. Project and employment entries are grouped into indivisible print units, and Experience has an intentional page-3 boundary after its first three entries.
- The final tagged PDF is three balanced A4 pages. Every page begins with a named section or role; no page begins with an orphaned bullet or stranded subheading.
- The exporter now writes its reviewed artifact to `output/pdf/Rebecca_Clair_Resume.pdf`, publishes the same bytes to `public/Rebecca_Clair_Resume.pdf`, and updates the current build output.
- Added prominent Download resume and Contact actions to the web resume and verified them visually at 1627 x 1001 in the user's Brave browser.
- Verified PDF rendering with Poppler, text extraction with `pdftotext`, byte parity across output/public/dist, a clean typecheck, four passing resume-tool tests, and 53 passing internal links including the PDF.

### Pass 8 — project proof compression

- Edited the governing external resume source and regenerated both web and print pages; generated Markdown was not hand-edited.
- Replaced each project's four-item Architecture Highlights list with one `**Highlights:**` sentence that preserves its strongest architectural decisions, platform breadth, and measurable evidence.
- Kept individual Full write-up links on the web resume while removing those redundant lines from the print-only document; the Projects introduction still routes readers to the complete portfolio.
- Applied a compact print-only treatment to the Technologies inventory. The final tagged PDF is now two A4 pages with complete project and employment entries, no orphaned headings or bullets, and no blank tail page.
- Verified the web project treatment in the user's Brave browser and the final PDF as a same-scale two-page contact sheet.

### Pass 9 — site-wide H1 scale

- Normalized rendered page H1s to `clamp(2.75rem, 4vw, 3.75rem)` with a 3rem mobile cap, replacing the previous 6vw / 6.25rem billboard scale.
- Applied the same ceiling to project-detail and project-index titles. The homepage thesis retains its gradient identity but now inherits the restrained global cap.
- Verified the resume, homepage, Skynet case study, and project index at the user's 1627px-wide laptop viewport in Brave. Titles now establish hierarchy without overwhelming the first viewport.
- The dedicated PDF title remains independently sized in print points and was intentionally unchanged.

### Pass 10 — actual nested hero selector correction

- The first H1 normalization missed the homepage because its H1 is nested inside `.hero-thesis`; `main > h1` never matched it. The surviving local `4.7vw` rule computed to 76.48px at the laptop viewport.
- Replaced the homepage-specific rule and normalized all rendered H1s to a 32px maximum, with H2s capped at 28px.
- Verified via computed style in the user's Brave browser: homepage H1 is exactly `32px` at a 1627px viewport. The complete thesis, actions, portrait, and introduction now fit in the first screen.

### Pass 11 — experience hierarchy compression

- Consolidated each employer, specific role, and date range into one scan-friendly heading; removed the repeated all-caps role subheadings.
- Renamed the confidential-work entry to `NDA Protected Projects` and replaced the full HeliaSar Productions entry with a single earlier independent engineering and consulting timeline marker.
- Reduced employer headings to 17.6px on the web and 10.2pt in print so they sit clearly below the 28px section heading without losing scanability.
- Verified the Experience section at a 1440 x 900 laptop viewport and rendered the final tagged PDF as a same-scale two-page contact sheet. Both pages remain balanced with no orphaned headings or bullets.

### Pass 12 — landing-page hiring story

- Source visual truth: `output/playwright/home-redesign/reference.png`, the consolidated proposal-3 composition with proposal-1 typography and proposal-2 evidence architecture.
- Implementation evidence: `output/playwright/home-redesign/implementation-full.webp` at a 1627 × 944 light-mode laptop viewport, with `comparison-full.png` and `comparison-top.png` used for normalized side-by-side review.
- State: homepage at rest with the sticky navigation visible. Focused checks covered the hero, approach/proof rows, Sky capability band, staff-level impact section, and final contact line.
- Initial P1: the original homepage joined a polished editorial thesis to a retro-computer biography window, creating two competing visual systems and repeating the same biography. Fixed by replacing the window with one portrait-led editorial sequence.
- Initial P2: the first implementation made the hero too tall for the target laptop and delayed the method/proof section. Fixed by reducing the top inset, portrait height, hero padding, and section spacing; the final first viewport contains the complete hero and the beginning of both evidence columns.
- Initial P1 interaction defect: writing comparison artifacts under `output/` exhausted the host's file-watcher limit and left a transparent Vite error overlay intercepting clicks. Fixed by excluding generated artifact directories from the dev watcher and restarting the local server. Post-fix browser inspection confirmed no overlay, and both `Selected work` and `View resume` completed their intended navigation.
- Fonts and typography: passed. The geometric system sans owns the hero and long-form copy; Chicago is restricted to identity, labels, numerals, and compact signal text. The 48px desktop headline remains within the approved laptop scale.
- Spacing and layout rhythm: passed. The implementation intentionally compresses the generated mock's long scroll while preserving its section order, alignment, and editorial hierarchy.
- Colors and visual tokens: passed. Existing light/dark canvas, plum ink, lavender surface, and purple-magenta emphasis tokens are preserved.
- Image quality and asset fidelity: passed. The existing 900 × 1121 portrait is used directly with a responsive crop; all interface symbols come from the Phosphor icon family rather than improvised CSS or SVG artwork.
- Copy and content: passed. The hero states philosophy, territory, operating method, and outcome without repeating a toolbox; the lower sections supply evidence and staff-level residue.
- Focused region comparison: the full-view comparison was supplemented by direct browser captures of the hero, Sky capability band, and impact section because full-page scaling made their body type too small to judge reliably.
- Remaining P3: the live portrait crop shows slightly more torso than the generated target at some wide aspect ratios. This is acceptable because it avoids upscaling or inventing a replacement portrait.
- Final result for this pass: passed.

## Fidelity assessment

- Typography: passed. Chicago is reserved for identity, eyebrow labels, and major headings; system sans-serif handles navigation and body copy.
- Color: passed. The canvas, purple/pink gradient, dark ink, pale active pill, and restrained borders closely follow the reference. Automatic dark mode keeps the same hierarchy with inverted surfaces.
- Navigation: passed. Sticky translucent bar, split identity lockup, compact links, and rounded active state preserve the reference's proportions and behavior.
- Hero: passed. Dash-led eyebrow, high-impact display statement, gradient emphasis, and generous editorial spacing carry the reference language while using the site's real positioning copy.
- Content surfaces: passed. Existing cards, resume content, diagrams, project prose, portrait, and retro window have been brought into one coherent system.
- Card interactions: passed. The original implementation is restored without reinterpretation.
- Responsive behavior: passed at 1627 x 944 and 390 x 844. No horizontal overflow observed.
- Console: passed. Only expected Vercel Analytics development logs were emitted; no runtime errors were observed.
- Accessibility basics: passed. Navigation state is exposed with `aria-expanded`, active routes use `aria-current`, focus styles are visible, images retain alt text, and text/background contrast remains legible in both schemes.

## Intentional differences

- The audit's two-line verdict becomes a longer systems-engineering thesis, so it wraps to more lines by design.
- Audit-specific navigation labels and date copy are replaced by the site's actual information architecture and professional focus.
- The portrait remains the primary personal identity element. The classic window was removed from the homepage because it conflicted with the selected editorial direction.

## Remaining findings

No P0, P1, or P2 fidelity issues remain. Future additions can focus on richer project storytelling and motion without requiring another foundational redesign.

### Pass 13 — project-card dark theme

- Source visual truth: `/tmp/codex-clipboard-9b804c0d-12fd-4ca2-a9d2-ffc714e3e4b7.png`.
- Browser-rendered implementation: `/run/user/1000/sky-cua/captures/browser-379561762-1784133543404-0007.webp` at 1627 x 944, dark mode, default card state.
- Focused interaction evidence: `/run/user/1000/sky-cua/captures/browser-379561762-1784133724405-0009.webp` at 1627 x 944, dark mode, `sky-vision` focus-within state using the same animated gradient as hover.
- Light-mode preservation evidence: `/run/user/1000/sky-cua/captures/browser-379561762-1784133861875-0000.webp`; the original white surface, 0.8 inner opacity, violet-pink-white gradient, title color, shadow, and timing remain unchanged.
- Full-view comparison: the white-card glare and nearly invisible titles in the supplied dark-mode capture are gone. Default cards now use deep plum surfaces with high-contrast neutral text and restrained violet framing, while retaining the original size, spacing, radius, and grid density.
- Focused-region comparison: hover/focus preserves the original flavor through the same traveling 45-degree violet-to-pink border and translucent inner wash, translated to a darker aubergine endpoint. The state remains obvious without becoming a bright light-mode panel.
- Primary interaction tested: project-card focus-within activates the same selector and animated visual treatment as pointer hover. Navigation and layout were unchanged.
- Browser checks: no horizontal overflow and no Vite error overlay. No P0, P1, or P2 findings remain.

final result: passed
