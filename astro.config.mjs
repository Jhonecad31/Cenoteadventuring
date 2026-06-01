// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import partytown from '@astrojs/partytown';
import node from '@astrojs/node';
import vercel from '@astrojs/vercel';

// En producción (Vercel) usamos el adaptador de Vercel.
// En desarrollo local usamos el adaptador de Node para poder hacer SSR.
const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: "https://cenoteadventuring.com/",
  adapter: isProduction ? vercel() : node({ mode: 'standalone' }),
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
      forward: ['fbq', 'gtag', 'dataLayer.push'],
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
    plugins: [tailwindcss()]
  }
});