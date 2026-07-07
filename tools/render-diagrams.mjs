#!/usr/bin/env node
// Renders the Mermaid diagram sources in src/diagrams/*.mmd to committed SVGs
// in src/assets/diagrams/, using the site's diagram theme (tools/mermaid-theme.json).
// The output is checked in and consumed at build time by the project pages via
// `?raw` imports, so no mermaid runtime ships to the browser. Re-run this
// script (`pnpm generate:diagrams`) after editing any .mmd source and commit
// both files together.
//
// Usage:
//   pnpm generate:diagrams
//
// Requires a local Chrome/Chromium (Puppeteer's bundled download is disabled
// repo-wide via .puppeteerrc.cjs). The browser is auto-detected, or set
// CHROME_BIN to point at one explicitly.
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const inputDir = `${root}/src/diagrams`;
const outputDir = `${root}/src/assets/diagrams`;
const themeConfig = `${root}/tools/mermaid-theme.json`;

function firstAvailable(commands) {
	// Puppeteer requires an absolute executablePath, so resolve via `which`.
	if (process.env.CHROME_BIN) return process.env.CHROME_BIN;
	for (const command of commands) {
		const result = spawnSync("which", [command], { encoding: "utf8" });
		if (result.status === 0 && result.stdout.trim()) {
			return result.stdout.trim();
		}
	}
	return null;
}

const chrome = firstAvailable([
	"chromium",
	"chromium-browser",
	"google-chrome-stable",
	"google-chrome",
]);
if (!chrome) {
	console.error(
		"No Chrome/Chromium executable found; install one or set CHROME_BIN.",
	);
	process.exit(1);
}

const puppeteerConfig = join(
	tmpdir(),
	`heliasar-mermaid-puppeteer-${process.pid}.json`,
);
writeFileSync(puppeteerConfig, JSON.stringify({ executablePath: chrome }));

mkdirSync(outputDir, { recursive: true });

const sources = readdirSync(inputDir).filter((f) => f.endsWith(".mmd"));

if (sources.length === 0) {
	console.error(`No .mmd sources found in ${inputDir}`);
	process.exit(1);
}

// mmdc hardcodes the SVG root id to "my-svg", and every internal id, url(#…)
// reference, and #my-svg style selector derives from it. Two diagrams inlined
// on the same page would collide (duplicate ids; url(#…) resolves to the
// first match in document order), so rewrite the id to a per-file unique
// prefix derived from the diagram name.
function uniquifySvgIds(svg, name) {
	const prefix = `diagram-${name}`;
	return svg.replaceAll("my-svg", prefix);
}

for (const file of sources) {
	const name = file.replace(/\.mmd$/, "");
	const inputPath = join(inputDir, file);
	const outputPath = join(outputDir, `${name}.svg`);
	console.log(`Rendering ${file} -> ${outputPath}`);
	execFileSync(
		"pnpm",
		[
			"exec",
			"mmdc",
			"-i",
			inputPath,
			"-o",
			outputPath,
			"-c",
			themeConfig,
			"-p",
			puppeteerConfig,
			"-b",
			"transparent",
		],
		{ stdio: "inherit" },
	);
	const rendered = readFileSync(outputPath, "utf8");
	writeFileSync(outputPath, uniquifySvgIds(rendered, name));
}

console.log(`Rendered ${sources.length} diagram(s) to ${outputDir}`);
