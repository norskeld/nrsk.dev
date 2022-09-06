import type { AstroUserConfig } from 'astro'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import compress from 'astro-compress'
import image from '@astrojs/image'

export default (): AstroUserConfig => ({
  site: 'https://vm.codes',

  integrations: [
    image(),
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
