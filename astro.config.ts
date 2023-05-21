import { defineConfig } from 'astro/config'
import astrowind from '@nrsk/astrowind'
import sitemap from '@astrojs/sitemap'
import compress from 'astro-compress'
import image from '@astrojs/image'

import { unslash } from './src/api/utils'

export default defineConfig({
  site: 'https://vm.codes',
  trailingSlash: 'never',
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
      img: true
    })
  ]
})
