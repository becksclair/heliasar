import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import partytown from "@astrojs/partytown";
import compress from "astro-compress";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://heliasar.com",
  integrations: [solidJs(), partytown(), compress(), robotsTxt(), sitemap()],
  output: "server",
  adapter: vercel()
});