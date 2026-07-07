#!/usr/bin/env node
// The security overrides must exist identically in package.json
// (pnpm.overrides — read by Vercel's pnpm 9) and pnpm-workspace.yaml
// (overrides — read by pnpm 11+). See commit 42710b5.
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(`${root}/package.json`, "utf8"));
const pkgOverrides = pkg.pnpm?.overrides ?? {};

const workspace = readFileSync(`${root}/pnpm-workspace.yaml`, "utf8");
const wsOverrides = {};
let inOverrides = false;
for (const line of workspace.split("\n")) {
	if (/^overrides:\s*$/.test(line)) {
		inOverrides = true;
		continue;
	}
	if (inOverrides) {
		const m = line.match(/^\s+'?([^':]+)'?:\s*'?([^']+?)'?\s*$/);
		if (m) {
			wsOverrides[m[1]] = m[2];
			continue;
		}
		if (/^\S/.test(line)) inOverrides = false;
	}
}

const a = JSON.stringify(Object.entries(pkgOverrides).sort());
const b = JSON.stringify(Object.entries(wsOverrides).sort());
if (a !== b) {
	console.error("Override maps differ between package.json and pnpm-workspace.yaml:");
	console.error("package.json:", pkgOverrides);
	console.error("pnpm-workspace.yaml:", wsOverrides);
	process.exit(1);
}
console.log(`Overrides in sync (${Object.keys(wsOverrides).length} entries).`);
