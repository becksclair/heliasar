import assert from "node:assert/strict";
import { test } from "node:test";
import { buildMarkdown, stripResumeHeader } from "./resume.mjs";

test("stripResumeHeader removes the title and subtitle lines plus surrounding blanks", () => {
	const input = [
		"# Rebecca Clair",
		"",
		"**Senior Systems Engineer · AI Infrastructure · Automation · Distributed Systems**",
		"",
		"## Experience",
		"",
		"Some body content.",
	].join("\n");

	const result = stripResumeHeader(input);

	assert.equal(result, "## Experience\n\nSome body content.\n");
});

test("stripResumeHeader returns input unchanged when the header is absent", () => {
	const input = "## Experience\n\nSome body content.";

	const result = stripResumeHeader(input);

	// Only newline normalization/trailing newline may differ.
	assert.equal(result, "## Experience\n\nSome body content.\n");
});

test("stripResumeHeader handles CRLF input", () => {
	const input = [
		"# Rebecca Clair",
		"",
		"***Senior Systems Engineer · AI Infrastructure · Automation · Distributed Systems***",
		"",
		"## Experience",
		"",
		"Some body content.",
	].join("\r\n");

	const result = stripResumeHeader(input);

	assert.equal(result, "## Experience\n\nSome body content.\n");
});

test("buildMarkdown round-trips a title containing an apostrophe", () => {
	const markdown = buildMarkdown({
		body: "Body text.",
		layout: "../layouts/ResumeLayout.astro",
		title: "Rebecca's Résumé",
		imageUrl: "/images/rebecca_clair5.webp",
	});

	assert.ok(markdown.startsWith("---\nlayout: ../layouts/ResumeLayout.astro"));
	assert.ok(markdown.includes("title: 'Rebecca''s Résumé'"));

	const fenceCount = markdown
		.split("\n")
		.filter((line) => line === "---").length;
	assert.equal(fenceCount, 2);
});
