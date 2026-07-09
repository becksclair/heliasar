// Single-quoted YAML scalar: escape by doubling embedded quotes.
export const yamlQuote = (value) => `'${String(value).replace(/'/g, "''")}'`;

/**
 * Splits the resume source into its header (name + emphasized subtitle line)
 * and body. Returns the subtitle text so the generated frontmatter tracks the
 * source instead of hardcoding it here.
 */
export function parseResumeHeader(markdown) {
	const lines = markdown.replace(/\r\n/g, "\n").split("\n");
	if (lines[0]?.trim() === "# Rebecca Clair") {
		lines.shift();
		while (lines[0]?.trim() === "") lines.shift();
	}
	let subtitle = "";
	const subtitleMatch = /^\*{1,3}(.+?)\*{1,3}$/.exec(lines[0]?.trim() ?? "");
	if (subtitleMatch) {
		subtitle = subtitleMatch[1].trim();
		lines.shift();
		while (lines[0]?.trim() === "") lines.shift();
	}
	return { subtitle, body: `${lines.join("\n").trimEnd()}\n` };
}

export function buildMarkdown({ body, layout, title, subtitle, imageUrl }) {
	return `---
layout: ${layout}
title: ${yamlQuote(title)}
subtitle: ${yamlQuote(subtitle)}
pubDate: 2026-07-07
description: ${yamlQuote(`${title} - ${subtitle}`)}
author: 'Rebecca Clair'
image:
    url: ${yamlQuote(imageUrl)}
    alt: 'Rebecca Clair'
---

${body}`;
}
