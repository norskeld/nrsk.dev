import { defineConfig } from 'astro/config'
import astrowind from '@nrsk/astrowind'
import sitemap from '@astrojs/sitemap'
import compress from 'astro-compress'

import { unslash } from './src/api/utils'

export default defineConfig({
  site: 'https://vm.codes',
  trailingSlash: 'never',
  compressHTML: false,
  integrations: [
    astrowind({
      config: {
        path: 'tailwind.config.ts',
        applyBaseStyles: false
      }
    }),

    sitemap({
      lastmod: new Date(),

      filter(page) {
        return !['articles/tag'].some((pattern) => page.includes(pattern))
      },

      serialize(item) {
        return {
          ...item,
          url: unslash(item.url)
        }
      }
    }),

    compress({
      css: false,
      html: true,
      img: true
    })
  ]
})
