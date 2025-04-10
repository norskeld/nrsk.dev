import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import image from '@astrojs/image'

export default defineConfig({
  site: 'https://1saifj.me',

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
    })
    
  ]
})
