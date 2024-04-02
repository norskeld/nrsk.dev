import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import compress from 'astro-compress'
import icon from 'astro-icon'

import { unslash } from './src/api/utils'

export default defineConfig({
  site: 'https://vm.codes',
  trailingSlash: 'never',
  compressHTML: true,
  integrations: [
    tailwind({
      configFile: 'tailwind.config.ts',
      applyBaseStyles: false
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
      html: false,
      img: true
    }),

    icon()
  ]
})
