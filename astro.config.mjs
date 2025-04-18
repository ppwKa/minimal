// @ts-check
import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

import pageInsight from "astro-page-insight";

// https://astro.build/config
export default defineConfig({
  site: "https://clinquant-sunburst-e31f17.netlify.app/",
  integrations: [preact(), pageInsight()]
});