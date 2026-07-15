#!/usr/bin/env node
import { spawn, spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.RESUME_EXPORT_PORT || 4328);
const positionalArgs = process.argv.slice(2).filter((arg) => arg !== "--");
const outputPath = resolve(
	positionalArgs[0] ||
		process.env.RESUME_PDF ||
		`${root}/output/pdf/Rebecca_Clair_Resume.pdf`,
);
const publicPath = `${root}/public/Rebecca_Clair_Resume.pdf`;
const additionalPublicPath = process.env.RESUME_PUBLIC_PDF
	? resolve(process.env.RESUME_PUBLIC_PDF)
	: null;
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

function waitForServerStart(server, timeoutMs = 10000) {
	return new Promise((resolvePromise, reject) => {
		let output = "";
		const timer = setTimeout(() => {
			cleanup();
			reject(
				new Error("Timed out waiting for the resume export server to bind"),
			);
		}, timeoutMs);

		function cleanup() {
			clearTimeout(timer);
			server.stdout?.off("data", onData);
			server.off("error", onError);
			server.off("exit", onExit);
		}

		function onData(chunk) {
			const text = String(chunk);
			process.stdout.write(text);
			output += text;
			if (output.includes("Serving HTTP on")) {
				cleanup();
				resolvePromise();
			}
		}

		function onError(error) {
			cleanup();
			reject(error);
		}

		function onExit(code, signal) {
			cleanup();
			reject(
				new Error(
					`Resume export server exited before startup (code ${code}, signal ${signal})`,
				),
			);
		}

		server.stdout?.on("data", onData);
		server.once("error", onError);
		server.once("exit", onExit);
	});
}

async function waitFor(url, expectedText, timeoutMs = 10000) {
	const deadline = Date.now() + timeoutMs;
	while (Date.now() < deadline) {
		try {
			const response = await fetch(url);
			if (response.ok && (await response.text()).includes(expectedText)) return;
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
			"-u",
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
			stdio: ["ignore", "pipe", "inherit"],
		},
	);

	try {
		await waitForServerStart(server);
		await waitFor(
			`http://127.0.0.1:${port}/resume-print/`,
			'class="resume-page"',
		);
		rmSync(outputPath, { force: true });
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
		mkdirSync(dirname(publicPath), { recursive: true });
		if (outputPath !== publicPath) copyFileSync(outputPath, publicPath);
		if (
			additionalPublicPath &&
			additionalPublicPath !== outputPath &&
			additionalPublicPath !== publicPath
		) {
			mkdirSync(dirname(additionalPublicPath), { recursive: true });
			copyFileSync(outputPath, additionalPublicPath);
		}
		if (existsSync(`${root}/dist`)) {
			copyFileSync(publicPath, `${root}/dist/Rebecca_Clair_Resume.pdf`);
		}
		console.log(`PDF written: ${outputPath}`);
		console.log(`Public PDF updated: ${publicPath}`);
		if (additionalPublicPath)
			console.log(`Additional PDF updated: ${additionalPublicPath}`);
	} finally {
		server.kill("SIGTERM");
		rmSync(chromeProfilePath, { recursive: true, force: true });
	}
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
