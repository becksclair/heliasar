import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import { defineConfig } from "astro/config";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
	site: "https://heliasar.com",
	integrations: [partytown(), robotsTxt(), sitemap()],
	output: "static",
	adapter: vercel(),
});
