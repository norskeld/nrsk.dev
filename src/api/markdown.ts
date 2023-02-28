import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { shikigami, loadTheme } from '@nrsk/shikigami'
import anchor from 'markdown-it-anchor'
import markdown from 'markdown-it'

import { Common } from '@/config'

/**
 * Extremely hacky workaround for building for production.
 *
 * The `import.meta.url`, when building for production, for whatever reason contains the
 * `/path/to/dist/entry.mjs`, not the *actual* file url.
 */
function resolveSourceDir(metaUrl: string, level: number) {
  let url = fileURLToPath(metaUrl)

  for (let index = 0; index < level; index += 1) {
    url = dirname(url)
  }

  return import.meta.env.MODE === 'production' ? join(url, 'src') : url
}

export async function render(input: string) {
  const highlighter = await createHighlighter(Common.themeSyntax)
  const permalink = createPermalinkTransformer()
  const slugify = createSlugTransformer()

  const parser = markdown('default', {
    html: true,
    linkify: true,
    typographer: true
  })
    .use(anchor, { permalink, slugify })
    .use(highlighter)

  return parser.render(input)
}

async function createHighlighter(themeName: string) {
  const theme = await loadTheme(`${resolveSourceDir(import.meta.url, 4)}/syntax/${themeName}.json`)

  return await shikigami({
    withLanguage: true,
    withLineNumbers: false,
    highlighter: {
      theme
    }
  })
}

/** Creates permalink handler for the `markdown-it-anchor` plugin. */
function createPermalinkTransformer() {
  return anchor.permalink.linkInsideHeader({ placement: 'after' })
}

/** Creates slugifier for the `markdown-it-anchor` plugin. **It doesn't work with Unicode**. */
function createSlugTransformer() {
  return function (string: string) {
    return string
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
}
