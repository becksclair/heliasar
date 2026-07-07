// Single-quoted YAML scalar: escape by doubling embedded quotes.
export const yamlQuote = (value) => `'${String(value).replace(/'/g, "''")}'`;

export function stripResumeHeader(markdown) {
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

export function buildMarkdown({ body, layout, title, imageUrl }) {
	return `---
layout: ${layout}
title: ${yamlQuote(title)}
subtitle: 'Senior Systems Engineer · AI Infrastructure · Automation · Distributed Systems'
pubDate: 2023-05-09
description: 'Rebecca Clair - Senior Systems Engineer · AI Infrastructure · Automation · Distributed Systems'
author: 'Rebecca Clair'
image:
    url: ${yamlQuote(imageUrl)}
    alt: 'Rebecca Clair'
---

${body}`;
}
