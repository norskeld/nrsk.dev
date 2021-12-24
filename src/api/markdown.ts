import { join } from 'path'

import { getHighlighter, loadTheme, renderToHtml } from 'shiki'
import anchor from 'markdown-it-anchor'
import markdown from 'markdown-it'

export async function processMarkdown(input: string, theme: string) {
  const permalink = anchor.permalink.ariaHidden({ placement: 'before' })
  const highlighter = await resolveCustomHighlighter(theme)

  const parser = markdown('default', {
    html: true,
    linkify: true,
    typographer: true,

    highlight(code, langId) {
      const tokens = highlighter.codeToThemedTokens(code, langId)
      const fg = highlighter.getForegroundColor(theme ?? 'nord')
      const bg = highlighter.getBackgroundColor(theme ?? 'nord')

      const html = renderToHtml(tokens, {
        langId,
        fg,
        bg
      })

      return html
    }
  }).use(anchor, { permalink, slugify })

  return parser.render(input)
}

/**
 * Loads a custom syntax theme (any Visual Studio Code theme in JSON format will do), or fallbacks
 * to the built-in `Nord`, and resolves to a highlighter.
 */
async function resolveCustomHighlighter(theme: string) {
  const path = join(process.cwd(), 'src', 'syntax', `${theme}.json`)

  try {
    return await getHighlighter({ theme: await loadTheme(path) })
  } catch {
    return await getHighlighter({ theme: 'nord' })
  }
}

/** Slugifies a given string. **It doesn't work with Unicode**. */
function slugify(string: string) {
  return string
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
