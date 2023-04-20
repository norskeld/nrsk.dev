import { defineConfig } from 'astro/config'
import astrowind from '@nrsk/astrowind'
import sitemap from '@astrojs/sitemap'
import compress from 'astro-compress'
import image from '@astrojs/image'

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
    sitemap({
      lastmod: new Date()
    }),
    compress({
      css: false,
      img: true
    })
  ]
})
