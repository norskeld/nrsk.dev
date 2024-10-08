import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import expressive from 'astro-expressive-code'
import { defineConfig } from 'astro/config'
import webmanifest from 'astro-webmanifest'
import astropress from '@nrsk/astropress'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import rehypeSlug from 'rehype-slug'
import { h } from 'hastscript'
import mdx from '@astrojs/mdx'
import icon from 'astro-icon'

import { Common, Manifest } from './src/config'

import { stripSuffix } from './src/api/utils'

export default defineConfig({
  site: Common.host,
  trailingSlash: 'never',
  compressHTML: true,
  build: {
    format: 'file'
  },
  markdown: {
    remarkRehype: {
      footnoteBackContent: '⤴'
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          content: () => h(null, '§'),
          properties: {
            ariaHidden: 'true',
            class: 'heading-anchor'
          }
        }
      ]
    ]
  },
  integrations: [
    icon({
      iconDir: 'src/assets/icons'
    }),

    tailwind({
      configFile: 'tailwind.config.ts',
      applyBaseStyles: false
    }),

    webmanifest(Manifest),

    sitemap({
      lastmod: new Date(),
      filter: (page) => !['articles/tag'].some((pattern) => page.includes(pattern)),
      serialize: (item) => ({ ...item, url: stripSuffix(item.url, '/') })
    }),

    expressive({
      themes: ['nord'],
      styleOverrides: {
        codeBackground: 'var(--ec-code-bg)',
        borderRadius: 'var(--ec-code-radius)',
        frames: {
          frameBoxShadowCssValue: 'var(--ec-frames-shadow)',
          inlineButtonBorder: 'var(--ec-frames-inline-button-border)',
          tooltipSuccessBackground: 'var(--ec-frames-tooltip-bg)',
          terminalBackground: 'var(--ec-code-bg)',
          terminalTitlebarBackground: 'var(--ec-code-bg)'
        },
        textMarkers: {
          markBackground: 'var(--ec-markers-bg)',
          markBorderColor: 'var(--ec-markers-lb)',
          delBackground: 'var(--ec-markers-del-bg)',
          insBackground: 'var(--ec-markers-ins-bg)'
        }
      }
    }),

    mdx(),
    astropress()
  ]
})
