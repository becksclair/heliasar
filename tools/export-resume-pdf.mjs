#!/usr/bin/env node
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.RESUME_EXPORT_PORT || 4328);
const outputPath = resolve(
	process.argv[2] ||
		process.env.RESUME_PDF ||
		`${root}/runtime/resume-export/Rebecca_Clair_Resume.pdf`,
);
const chromeProfilePath = `/tmp/resume-chrome-profile-${process.pid}`;

function run(command, args, options = {}) {
	return new Promise((resolvePromise, reject) => {
		const child = spawn(command, args, {
			cwd: options.cwd ?? root,
			stdio: options.stdio ?? "inherit",
			env: { ...process.env, ...options.env },
		});
		child.on("error", reject);
		child.on("exit", (code) => {
			if (code === 0) resolvePromise();
			else
				reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
		});
	});
}

function firstAvailable(commands) {
	if (process.env.CHROME_BIN) return process.env.CHROME_BIN;
	for (const command of commands) {
		const result = spawnSync(command, ["--version"], { stdio: "ignore" });
		if (!result.error && result.status === 0) {
			return command;
		}
	}
	return null;
}

async function waitFor(url, timeoutMs = 10000) {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			const response = await fetch(url);
			if (response.ok) return;
		} catch {}
		await new Promise((resolveWait) => setTimeout(resolveWait, 250));
	}
	throw new Error(`Timed out waiting for ${url}`);
}

async function main() {
	mkdirSync(dirname(outputPath), { recursive: true });
	await run("node", ["tools/sync-resume.mjs"]);
	await run("pnpm", ["build"]);

	const chrome = firstAvailable([
		"google-chrome-stable",
		"google-chrome",
		"chromium",
		"chromium-browser",
	]);
	if (!chrome) throw new Error("No Chrome/Chromium executable found");

	const server = spawn(
		"python",
		[
			"-m",
			"http.server",
			String(port),
			"--bind",
			"127.0.0.1",
			"--directory",
			"dist",
		],
		{
			cwd: root,
			stdio: ["ignore", "ignore", "inherit"],
		},
	);

	try {
		await waitFor(`http://127.0.0.1:${port}/resume-print/`);
		await run(chrome, [
			"--headless=new",
			"--disable-gpu",
			"--disable-dev-shm-usage",
			"--disable-background-networking",
			"--disable-extensions",
			"--no-first-run",
			"--no-default-browser-check",
			`--user-data-dir=${chromeProfilePath}`,
			"--no-pdf-header-footer",
			`--print-to-pdf=${outputPath}`,
			`http://127.0.0.1:${port}/resume-print/`,
		]);
		if (!existsSync(outputPath))
			throw new Error(`PDF was not created: ${outputPath}`);
		console.log(`PDF written: ${outputPath}`);
	} finally {
		server.kill("SIGTERM");
		rmSync(chromeProfilePath, { recursive: true, force: true });
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
