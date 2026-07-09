import assert from "node:assert/strict";
import { test } from "node:test";
import { buildMarkdown, parseResumeHeader } from "./resume.mjs";

test("parseResumeHeader extracts the subtitle and strips the header lines", () => {
	const input = [
		"# Rebecca Clair",
		"",
		"**Staff Systems Software Engineer · AI Infrastructure**",
		"",
		"## Experience",
		"",
		"Some body content.",
	].join("\n");

	const result = parseResumeHeader(input);

	assert.equal(
		result.subtitle,
		"Staff Systems Software Engineer · AI Infrastructure",
	);
	assert.equal(result.body, "## Experience\n\nSome body content.\n");
});

test("parseResumeHeader returns input unchanged when the header is absent", () => {
	const input = "## Experience\n\nSome body content.";

	const result = parseResumeHeader(input);

	assert.equal(result.subtitle, "");
	// Only newline normalization/trailing newline may differ.
	assert.equal(result.body, "## Experience\n\nSome body content.\n");
});

test("parseResumeHeader handles CRLF input and triple-asterisk emphasis", () => {
	const input = [
		"# Rebecca Clair",
		"",
		"***Staff Systems Software Engineer · Automation***",
		"",
		"## Experience",
		"",
		"Some body content.",
	].join("\r\n");

	const result = parseResumeHeader(input);

	assert.equal(result.subtitle, "Staff Systems Software Engineer · Automation");
	assert.equal(result.body, "## Experience\n\nSome body content.\n");
});

test("buildMarkdown round-trips a title containing an apostrophe and embeds the subtitle", () => {
	const markdown = buildMarkdown({
		body: "Body text.",
		layout: "../layouts/ResumeLayout.astro",
		title: "Rebecca's Résumé",
		subtitle: "Staff Systems Software Engineer",
		imageUrl: "/images/rebecca_clair5.webp",
	});

	assert.ok(markdown.startsWith("---\nlayout: ../layouts/ResumeLayout.astro"));
	assert.ok(markdown.includes("title: 'Rebecca''s Résumé'"));
	assert.ok(markdown.includes("subtitle: 'Staff Systems Software Engineer'"));
	assert.ok(
		markdown.includes(
			"description: 'Rebecca''s Résumé - Staff Systems Software Engineer'",
		),
	);

	const fenceCount = markdown
		.split("\n")
		.filter((line) => line === "---").length;
	assert.equal(fenceCount, 2);
});
