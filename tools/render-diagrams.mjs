#!/usr/bin/env node
// Renders the Mermaid diagram sources in src/diagrams/*.mmd to committed SVGs
// in src/assets/diagrams/, using the site's diagram theme (tools/mermaid-theme.json).
// The output is checked in and consumed at build time by the project pages via
// `?raw` imports, so no mermaid runtime ships to the browser.
//
// Usage:
//   pnpm generate:diagrams
//
// If mmdc's bundled Puppeteer Chromium download is unavailable, point it at a
// system browser via tools/puppeteer-config.json (executablePath).
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const inputDir = `${root}/src/diagrams`;
const outputDir = `${root}/src/assets/diagrams`;
const themeConfig = `${root}/tools/mermaid-theme.json`;
const puppeteerConfig = `${root}/tools/puppeteer-config.json`;

mkdirSync(outputDir, { recursive: true });

const sources = readdirSync(inputDir).filter((f) => f.endsWith(".mmd"));

if (sources.length === 0) {
	console.error(`No .mmd sources found in ${inputDir}`);
	process.exit(1);
}

for (const file of sources) {
	const inputPath = join(inputDir, file);
	const outputPath = join(outputDir, file.replace(/\.mmd$/, ".svg"));
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
}

console.log(`Rendered ${sources.length} diagram(s) to ${outputDir}`);
