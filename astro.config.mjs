import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";
import partytown from "@astrojs/partytown";

import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), partytown(), compress()]
});