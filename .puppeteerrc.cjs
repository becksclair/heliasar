// Puppeteer arrives as a transitive dependency of @mermaid-js/mermaid-cli,
// which is only used by `pnpm generate:diagrams` to pre-render the committed
// SVGs in src/assets/diagrams/. No environment (CI, Vercel, local installs)
// needs Puppeteer's bundled browser: the render script points mmdc at a
// system Chromium instead. Skipping the download keeps installs fast and
// network-independent.
module.exports = { skipDownload: true };
