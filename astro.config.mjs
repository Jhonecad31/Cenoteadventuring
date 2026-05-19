// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import partytown from '@astrojs/partytown';
import { visualizer } from 'rollup-plugin-visualizer';

import vercel from '@astrojs/vercel';

export default defineConfig({
  site: "https://cenoteadventuring.com/",
  adapter: vercel(),
  output: 'server',
  trailingSlash: 'always',
  integrations: [react(), sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: {
        en: 'en',
        es: 'es',
      }
    },
    filter: (page) =>
      !page.includes('/thanks')
  }),
  partytown({
    config: {
      forward: ['fbq'],
      resolveUrl: (url, location) => {
        if (url.hostname === 'connect.facebook.net') {
          return new URL(`/api/proxy-facebook-pixel?url=${encodeURIComponent(url.href)}`, location.origin);
        }
        return url;
      },
    },
  }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
      process.env.NODE_ENV === 'production' && visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true
      })
    ].filter(Boolean)
  }
});