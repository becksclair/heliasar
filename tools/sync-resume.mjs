#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildMarkdown, stripResumeHeader } from "./lib/resume.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath =
	process.env.RESUME_SOURCE ||
	"/home/bex/HeliasMind/30 Areas/Personal/Rebecca Clair - Resume.md";
const websiteTargetPath = `${root}/src/pages/resume.md`;
const printTargetPath = `${root}/src/pages/resume-print.md`;

function assertFile(path) {
	if (!existsSync(path)) throw new Error(`Missing required file: ${path}`);
}

assertFile(sourcePath);
assertFile(`${root}/package.json`);

const source = readFileSync(sourcePath, "utf8");
const body = stripResumeHeader(source);

const websiteMarkdown = buildMarkdown({
	body,
	layout: "../layouts/ResumeLayout.astro",
	title: "Rebecca Clair",
	imageUrl: "/images/rebecca_clair5.webp",
});

const printMarkdown = buildMarkdown({
	body,
	layout: "../layouts/ResumePrintLayout.astro",
	title: "Rebecca Clair",
	imageUrl: "/images/rebecca_clair5.webp",
});

mkdirSync(dirname(websiteTargetPath), { recursive: true });
writeFileSync(websiteTargetPath, websiteMarkdown, "utf8");
writeFileSync(printTargetPath, printMarkdown, "utf8");

console.log(`Synced website resume: ${websiteTargetPath}`);
console.log(`Synced print resume: ${printTargetPath}`);
