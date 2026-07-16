# Project diagram viewer QA

- Source visual truth: `/tmp/codex-clipboard-d4cb9919-a52e-435b-9683-6819d4f002b7.png`
- Preview implementation: `/run/user/1000/sky-cua/captures/browser-379562050-1784196071078-0001.webp`
- Lightbox implementation: `/run/user/1000/sky-cua/captures/browser-379562188-1784196378016-0003.webp`
- Compact-control and typography implementation: `/run/user/1000/sky-cua/captures/browser-379562188-1784198405598-0005.webp`
- Wide-diagram implementation: `/run/user/1000/sky-cua/captures/browser-379562050-1784195855050-0000.webp`
- Source viewport: 1870 x 1219 pixels
- Implementation viewport: 1627 x 944 CSS pixels
- State: desktop, dark color scheme, Skynet project route, preview and open viewer states

## Full-view comparison evidence

The source showed the diagram inside a large rounded, shadowed card. The generated Mermaid labels overflowed or clipped inside multiple nodes and the figure consumed more than a viewport without providing closer inspection. The implementation removes the diagram card, gradient, radius, and shadow. The caption now sits directly in the article flow, followed by a fixed-height technical preview bounded only by horizontal rules. The preview deliberately fits the complete diagram at thumbnail scale and exposes a top-left Expand control.

The open viewer uses the site's dark palette, a restrained technical grid, compact controls, and the original vector diagram. It fills the available viewport without clipping and provides zoom, reset, wheel zoom, pointer/touch panning, Escape/close behavior, and a scale readout.

The source and implementation screenshots have different viewport sizes because the selected in-app browser surface could not be resized to the supplied screenshot. The comparison therefore used the diagram component region rather than treating the surrounding page crop as a pixel-identical target.

## Focused-region comparison evidence

The source and final Skynet diagram regions were opened together at original resolution. Every node and edge label that was visibly truncated in the source is complete in both the preview and viewer. The final lightbox screenshot was also inspected at original resolution to verify label sharpness, control alignment, diagram fit, and absence of viewport clipping.

The Voyager worker-loop sequence diagram and Sky Phone signal-path diagram were separately inspected to cover the widest and tallest diagram shapes. Sequence messages use an adaptive foreground color in dark mode; tall diagrams fit the preview rather than overflowing it.

## Required fidelity surfaces

- Fonts and typography: Mermaid now renders stable Arial/Liberation Sans native SVG text rather than HTML labels measured against the unavailable Chicago display font. Project captions retain the site's Chicago/sans hierarchy. No truncation or incorrect wrapping remains in the tested diagrams.
- Spacing and layout rhythm: Figure chrome is flat and editorial. Preview height is bounded, Expand reserves its own top-left space, and modal controls align to the top-left with Close isolated at top-right. No additional card elevation or decorative radius stack was introduced.
- Colors and visual tokens: The viewer reuses page-surface, line, foreground, and accent tokens. Sequence connector text and lines adapt to the active site theme. The diagram nodes retain the established pale violet Mermaid palette.
- Image and asset quality: The diagrams remain vector SVG at every zoom level. All 22 committed SVGs were regenerated from their Mermaid sources; no rasterization, placeholder, or duplicate inline asset was introduced.
- Copy and content: Existing figure titles, captions, node labels, and project copy are unchanged. Controls use concise, explicit labels and accessible names.

## Interaction and runtime checks

- Expand opens the selected diagram in a native modal dialog.
- Zoom In changes the scale readout and SVG transform; Reset returns to the fitted 100% state.
- Wheel zoom changed the production viewer from 100% to 109%; the Zoom In control changed it to 128%.
- Pointer-drag changes the SVG pan transform after zooming.
- Two consecutive open/zoom/close cycles restored the same SVG to its preview, removed the Panzoom instance, cleared transforms, and returned the scale readout to 100% each time.
- Escape is provided by the native dialog behavior.
- The production preview on port 4174 loaded the bundled viewer JavaScript and opened successfully.
- All 22 diagrams contain zero `foreignObject` labels and retain unique generated SVG IDs.
- No horizontal page overflow or visible Vite error overlay was present. The selected browser surface did not expose a historical console stream.

## Comparison history

### Iteration 1

- P1: The source diagram was raised as a large card and multiple node labels were clipped by Mermaid's HTML-label sizing.
- Fix: Replaced the raised container with a flat figure preview, switched Mermaid to native SVG labels with a stable generation font, and added the zoom/pan lightbox.
- Evidence: `/run/user/1000/sky-cua/captures/browser-379562050-1784196071078-0001.webp` and `/run/user/1000/sky-cua/captures/browser-379562188-1784196378016-0003.webp`.

### Iteration 2

- P1: Tall generated SVGs initially retained their intrinsic height because raw injected SVG nodes did not receive Astro's scoped attribute, causing preview overflow. Wide sequence-diagram connector labels were too dark against the dark page.
- Fix: Applied sizing through a global SVG descendant selector, constrained grid-item minimum sizes, reserved top space for the Expand control, and added theme-aware sequence text and line overrides.
- Evidence: Sky Phone's 272 x 868 signal path fits its preview and viewer; Voyager's 1296 x 559 worker loop is fully visible with readable connector labels in `/run/user/1000/sky-cua/captures/browser-379562050-1784195855050-0000.webp`.

### Iteration 3

- P2: The preview and viewer controls were visually oversized relative to the diagrams, and `font-display: swap` allowed Chicago headings to flash through the fallback face on full-page navigation.
- Fix: Reduced diagram controls from 42 px to 30 px, tightened their icon and label scale, preloaded Chicago and Proxima Vara before the stylesheet, and changed both above-the-fold faces to blocking display. Proxima Vara now owns body copy, Berkeley Mono NF owns code and technical controls, and Chicago remains the display face.
- Evidence: `/run/user/1000/sky-cua/captures/browser-379562188-1784198405598-0005.webp`; browser font checks report Chicago, Proxima Vara, and Berkeley Mono NF loaded, with the expected computed family on display, body, and code text.

## Findings

No actionable P0, P1, or P2 findings remain at the tested desktop viewport.

## Follow-up polish

- P3: The responsive mobile viewer rules are implemented, but the selected browser surface remained at a fixed desktop viewport, so pinch zoom and the 390-pixel layout were not visually captured.
- P3: Light-mode token behavior is implemented and statically checked, but the selected browser was using the OS dark theme and did not expose media-emulation controls.

final result: passed
