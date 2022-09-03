import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import { shikigami, loadTheme } from '@nrsk/shikigami'
import anchor from 'markdown-it-anchor'
import markdown from 'markdown-it'

/**
 * Extremely hacky workaround. When building for production, the `import.meta.url` for whatever
 * reason contains the `/path/to/dist/entry.mjs`, not the *actual* file url...
 */
function resolveSourceDir() {
  const url = fileURLToPath(import.meta.url)

  return import.meta.env.MODE === 'production'
    ? join(dirname(dirname(url)), 'src')
    : dirname(dirname(url))
}

export async function processMarkdown(input: string, theme: string) {
  const highlighter = await createHighlighter(theme)
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
  const theme = await loadTheme(`${resolveSourceDir()}/syntax/${themeName}.json`)

  return await shikigami({
    withLanguage: true,
    withLineNumbers: true,
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
