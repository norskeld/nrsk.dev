import { defineConfig } from 'astro/config'
import astrowind from '@nrsk/astrowind'
import sitemap from '@astrojs/sitemap'
import compress from 'astro-compress'
import image from '@astrojs/image'
import pwa from '@vite-pwa/astro'

import { theme } from './tailwind.config'

export default defineConfig({
  site: 'https://vm.codes',

  integrations: [
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    }),
    astrowind({
      config: {
        path: 'tailwind.config.ts',
        applyBaseStyles: false
      }
    }),
    pwa({
      devOptions: {
        enabled: true
      },
      includeAssets: ['apple-touch-icon.png', 'favicon.ico', 'favicon.svg'],
      manifestFilename: 'site.webmanifest',
      manifest: {
        name: 'Vladislav Mamon',
        short_name: 'vm.codes',
        description:
          'A TypeScript and Rust aficionado doing front-end for a living. ' +
          'Interested in functional programming, compilers and PL design.',
        start_url: 'https://vm.codes',
        dir: 'ltr',
        lang: 'en-US',
        display: 'standalone',
        orientation: 'portrait-primary',
        theme_color: theme.dark,
        background_color: theme.dark,
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    sitemap({
      lastmod: new Date()
    }),
    compress({
      css: false,
      img: true
    })
  ]
})
