import { readFile } from 'fs/promises'
import { join } from 'path'

import anchor from 'markdown-it-anchor'
import markdown from 'markdown-it'
import * as shiki from 'shiki'

export async function processMarkdown(input: string) {
  const theme = await loadSyntaxTheme('norskeld')
  const syntax = await shiki.getHighlighter({ theme })
  const permalink = anchor.permalink.ariaHidden({ placement: 'before' })

  const parser = markdown('default', {
    html: true,
    linkify: true,
    highlight(code, lang) {
      return syntax.codeToHtml(code, lang)
    }
  }).use(anchor, { permalink, slugify })

  return parser.render(input)
}

/**
 * Loads a custom syntax theme (any Visual Studio Code theme in JSON format will do), or fallbacks
 * to the built-in `Nord`.
 */
async function loadSyntaxTheme(theme: string) {
  const path = join(process.cwd(), 'src', 'syntax', `${theme}.json`)

  try {
    const contents = await readFile(path, { encoding: 'utf8' })
    const theme = JSON.parse(contents)

    return theme
  } catch {
    return 'nord'
  }
}

/** Slugifies a given string. Almost certain i doesn't work with Unicode, but I don't care. */
function slugify(string: string) {
  return string
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
