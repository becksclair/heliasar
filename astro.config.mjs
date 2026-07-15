import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
	site: "https://heliasar.com",
	integrations: [
		robotsTxt(),
		sitemap({ filter: (page) => !page.includes("/resume-print") }),
	],
	output: "static",
	adapter: vercel(),
	vite: {
		server: {
			watch: {
				ignored: ["**/output/**", "**/.playwright-cli/**", "**/artifacts/**"],
			},
		},
	},
});
