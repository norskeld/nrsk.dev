import type { AstroUserConfig } from 'astro'
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import image from '@astrojs/image'

const config: AstroUserConfig = {
  base: '/',

  integrations: [
    image(),
    tailwind({
      config: {
        applyBaseStyles: false
      }
    })
  ]
}

export default defineConfig(config)
