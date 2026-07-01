#!/usr/bin/env node
// Generates the 1200x630 Open Graph / social "gradient banner" card at
// public/images/og-card.jpg. Text is pulled dynamically from src/pages/resume.md
// (title + subtitle), and the gradient's teal end is sampled from the photo's own
// background so the photo blends seamlessly into the card.
//
// Usage:
//   node tools/generate-og-card.mjs                 # uses OG_CARD_PHOTO or the default photo
//   OG_CARD_PHOTO=public/images/rebecca_clair6.webp node tools/generate-og-card.mjs
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const resumePath = `${root}/src/pages/resume.md`;
// Card photo, in preference order: explicit override, the intended card shot
// (rebecca_clair6.webp), then a fallback so the card can always be generated.
const preferredPhoto = `${root}/public/images/rebecca_clair6.webp`;
const photoPath = [
	process.env.OG_CARD_PHOTO && resolve(process.env.OG_CARD_PHOTO),
	preferredPhoto,
	`${root}/public/images/rebecca_clair5.webp`,
]
	.filter(Boolean)
	.find((p) => existsSync(p));
const outPath = process.env.OG_CARD_OUT
	? resolve(process.env.OG_CARD_OUT)
	: `${root}/public/images/og-card.jpg`;
const domain = "heliasar.com";
// Left-hand backdrop behind the text; the right end is sampled from the photo.
const backdropEnd = process.env.OG_CARD_BACKDROP || "#15191d";

const fontBold = "/usr/share/fonts/liberation/LiberationSans-Bold.ttf";
const fontReg = "/usr/share/fonts/liberation/LiberationSans-Regular.ttf";

function frontmatter(md, key) {
	const m = md.match(new RegExp(`^${key}:\\s*['"]?(.*?)['"]?\\s*$`, "m"));
	return m ? m[1].trim() : "";
}

function magick(args) {
	return execFileSync("magick", args, { stdio: ["ignore", "pipe", "inherit"] });
}

if (!existsSync(resumePath)) {
	console.error(`Missing resume.md: ${resumePath}`);
	process.exit(1);
}
if (!photoPath) {
	console.error(
		`No card photo found. Save it to ${preferredPhoto} (or set OG_CARD_PHOTO).`,
	);
	process.exit(1);
}
if (photoPath !== preferredPhoto && !process.env.OG_CARD_PHOTO) {
	console.warn(
		`Note: using fallback photo ${photoPath}\n  Save the intended card photo to ${preferredPhoto} and rerun.`,
	);
}

const md = readFileSync(resumePath, "utf8");
const title = frontmatter(md, "title") || "Rebecca Clair";
const subtitle = frontmatter(md, "subtitle");

// Sample the photo's own background teal (top-left corner) for the gradient end.
const teal = magick([photoPath, "-format", "%[pixel:p{8,8}]", "info:"])
	.toString()
	.trim();

const S = mkdtempSync(join(tmpdir(), "og-card-"));
try {
	// Photo panel: cover-crop to the right-hand 460x630 column.
	magick([
		photoPath,
		"-resize",
		"460x630^",
		"-gravity",
		"center",
		"-extent",
		"460x630",
		`${S}/photo.png`,
	]);
	// Gradient: dark backdrop (left, behind text) -> sampled teal (right, into photo).
	// After -rotate 90cw the top color lands on the right, so put teal first.
	magick([
		"-size",
		"630x1200",
		`gradient:${teal}-${backdropEnd}`,
		"-rotate",
		"90",
		`${S}/bg.png`,
	]);
	// Soft depth shadow at the photo's left seam.
	magick([
		"-size",
		"630x70",
		"gradient:rgba(0,0,0,0.30)-rgba(0,0,0,0)",
		"-rotate",
		"90",
		`${S}/shadow.png`,
	]);
	// Subtitle auto-wraps within the left text column.
	magick([
		"-background",
		"none",
		"-fill",
		"#d3dcde",
		"-font",
		fontReg,
		"-pointsize",
		"38",
		"-size",
		"600x",
		`caption:${subtitle}`,
		`${S}/subtitle.png`,
	]);

	// Base: gradient + photo + seam shadow + title + domain.
	magick([
		`${S}/bg.png`,
		`${S}/photo.png`,
		"-gravity",
		"East",
		"-composite",
		`${S}/shadow.png`,
		"-gravity",
		"East",
		"-geometry",
		"+460+0",
		"-composite",
		"-gravity",
		"NorthWest",
		"-font",
		fontBold,
		"-fill",
		"white",
		"-pointsize",
		"84",
		"-annotate",
		"+70+150",
		title,
		"-font",
		fontBold,
		"-fill",
		"white",
		"-pointsize",
		"30",
		"-annotate",
		"+73+545",
		domain,
		`${S}/base.png`,
	]);
	// Overlay the wrapped subtitle beneath the title.
	magick([
		`${S}/base.png`,
		`${S}/subtitle.png`,
		"-gravity",
		"NorthWest",
		"-geometry",
		"+72+280",
		"-composite",
		"-quality",
		"88",
		"-strip",
		outPath,
	]);
} finally {
	rmSync(S, { recursive: true, force: true });
}

console.log(
	`OG card written: ${outPath}\n  title="${title}"\n  subtitle="${subtitle}"\n  photo=${photoPath}\n  teal=${teal}`,
);
