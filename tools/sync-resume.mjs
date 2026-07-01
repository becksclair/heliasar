#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath =
	process.env.RESUME_SOURCE ||
	"/home/bex/HeliasMind/30 Areas/Personal/Rebecca Clair - Resume.md";
const websiteTargetPath = `${root}/src/pages/resume.md`;
const printTargetPath = `${root}/src/pages/resume-print.md`;

function assertFile(path) {
	if (!existsSync(path)) throw new Error(`Missing required file: ${path}`);
}

function stripResumeHeader(markdown) {
	const lines = markdown.replace(/\r\n/g, "\n").split("\n");
	if (lines[0]?.trim() === "# Rebecca Clair") {
		lines.shift();
		while (lines[0]?.trim() === "") lines.shift();
	}
	if (
		/^\*{1,3}Senior Systems Engineer · AI Infrastructure · Automation · Distributed Systems\*{1,3}$/i.test(
			lines[0]?.trim() ?? "",
		)
	) {
		lines.shift();
		while (lines[0]?.trim() === "") lines.shift();
	}
	return `${lines.join("\n").trimEnd()}\n`;
}

function buildMarkdown({ body, layout, title, imageUrl }) {
	return `---
layout: ${layout}
title: '${title}'
subtitle: 'Senior Systems Engineer · AI Infrastructure · Automation · Distributed Systems'
pubDate: 2023-05-09
description: 'Rebecca Clair - Senior Systems Engineer · AI Infrastructure · Automation · Distributed Systems'
author: 'Rebecca Clair'
image:
    url: '${imageUrl}'
    alt: 'Rebecca Clair'
---

${body}`;
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
