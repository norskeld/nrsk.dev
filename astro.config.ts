import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import expressive from 'astro-expressive-code'
import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import sitemap from '@astrojs/sitemap'
import rehypeSlug from 'rehype-slug'
import { h } from 'hastscript'
import mdx from '@astrojs/mdx'
import icon from 'astro-icon'

import { compress } from './src/api/integrations'
import { unslash } from './src/api/utils'

export default defineConfig({
  site: 'https://vm.codes',
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
          behavior: 'append',
          content: () => h(null, '§'),
          properties: {
            tabIndex: -1,
            ariaHidden: 'true',
            class: 'heading-anchor'
          }
        }
      ]
    ]
  },
  integrations: [
    tailwind({
      configFile: 'tailwind.config.ts',
      applyBaseStyles: false
    }),

    sitemap({
      lastmod: new Date(),
      filter: (page) => !['articles/tag'].some((pattern) => page.includes(pattern)),
      serialize: (item) => ({ ...item, url: unslash(item.url) })
    }),

    expressive({
      themes: ['nord'],
      styleOverrides: {
        codeBackground: 'var(--ec-code-bg)',
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
    icon(),
    compress()
  ]
})
