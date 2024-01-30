import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { shikigami, loadTheme } from '@nrsk/shikigami'
import anchor from 'markdown-it-anchor'
import footnote from 'markdown-it-footnote'
import markdown from 'markdown-it'

import { Theme } from '@/config'

/**
 * Extremely hacky workaround for building for production.
 *
 * The `import.meta.url`, when building for production, for whatever reason contains the
 * `/path/to/dist/entry.mjs`, not the *actual* file url.
 */
function resolveSourceDir(metaUrl: string, level: number): string {
  let url = fileURLToPath(metaUrl)

  if (import.meta.env.MODE === 'production') {
    for (let index = 0; index < level; index += 1) {
      url = dirname(url)
    }

    return join(url, 'src')
  }

  return dirname(dirname(url))
}

export async function render(input: string) {
  const highlighter = await createHighlighter(Theme.themeSyntax)
  const permalink = createPermalinkTransformer()
  const slugify = createSlugTransformer()

  const parser = markdown('default', {
    html: true,
    linkify: true,
    typographer: true
  })
    .use(anchor, { permalink, slugify })
    .use(footnote)
    .use(highlighter)

  customizeFootnotes(parser)

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

function customizeFootnotes(markdown: markdown) {
  markdown.renderer.rules.footnote_ref = (tokens, idx, options, env, renderer) => {
    const id = renderer.rules.footnote_anchor_name!(tokens, idx, options, env, renderer)
    const caption = renderer.rules.footnote_caption!(tokens, idx, options, env, renderer)

    let refid = id

    if (tokens[idx].meta.subId > 0) {
      refid += `:${tokens[idx].meta.subId}`
    }

    return `
      <sup class="footnotes-ref">
        <a id="ref:${refid}" href="#note:${id}">${caption}</a>
      </sup>
    `
  }

  markdown.renderer.rules.footnote_block_open = () => {
    return `
      <hr class="footnotes-sep">

      <div class="footnotes">
        <ol class="footnotes-list">
    `
  }

  markdown.renderer.rules.footnote_block_close = () => {
    return `
        </ol>
      </div>
    `
  }

  markdown.renderer.rules.footnote_open = (tokens, idx, options, env, renderer) => {
    let id = renderer.rules.footnote_anchor_name!(tokens, idx, options, env, renderer)

    if (tokens[idx].meta.subId > 0) {
      id += `:${tokens[idx].meta.subId}`
    }

    return `<li id="note:${id}" class="footnotes-item">`
  }

  markdown.renderer.rules.footnote_close = () => {
    return '</li>'
  }

  markdown.renderer.rules.footnote_anchor = (tokens, idx, options, env, renderer) => {
    let id = renderer.rules.footnote_anchor_name!(tokens, idx, options, env, renderer)

    if (tokens[idx].meta.subId > 0) {
      id += `:${tokens[idx].meta.subId}`
    }

    return `
      <a href="#ref:${id}" class="footnotes-backref">
        &#10548;
      </a>
    `
  }
}

/** Creates permalink handler for the `markdown-it-anchor` plugin. */
function createPermalinkTransformer() {
  return anchor.permalink.linkInsideHeader({
    placement: 'after',
    symbol: '§'
  })
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
