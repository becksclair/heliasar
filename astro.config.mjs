import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
	site: "https://heliasar.com",
	integrations: [partytown(), robotsTxt(), sitemap()],
	output: "static",
	adapter: vercel(),
});
