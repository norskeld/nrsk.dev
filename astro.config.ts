import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import compress from 'astro-compress'
import image from '@astrojs/image'

export default defineConfig({
  site: 'https://vm.codes',

  integrations: [
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    }),
    tailwind({
      config: {
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
