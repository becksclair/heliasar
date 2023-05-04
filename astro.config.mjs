import { defineConfig } from 'astro/config';
import solidJs from "@astrojs/solid-js";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  integrations: [solidJs(), partytown()]
});