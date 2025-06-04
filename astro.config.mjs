import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
	site: "https://heliasar.com",
	integrations: [partytown(), robotsTxt(), sitemap()],
	output: "static",
	adapter: vercel(),
});
