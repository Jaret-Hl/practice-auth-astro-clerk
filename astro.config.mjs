// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import node from "@astrojs/node";
import clerk from "@clerk/astro";
import { dark } from '@clerk/themes';
import { esMX } from '@clerk/localizations';

// https://astro.build/config
export default defineConfig({
  integrations: [clerk({
    localization: esMX,
    appearance:{
      baseTheme: dark
    }
  })],
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: node({ mode: "standalone" }),
  output: "server",

});