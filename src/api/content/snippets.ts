import { defaultLoaderOptions, fromRaw, sortEntries, limitEntries, toEntries } from './shared'
import type { Entry, Loader, Frontmatter } from './shared'

export type SnippetFrontmatter = Frontmatter & { tags?: Array<string> }
export type SnippetEntry = Entry<SnippetFrontmatter>

export const loadSnippets: Loader<SnippetFrontmatter> = async (options) => {
  const { sort, limit } = defaultLoaderOptions(options)

  const entries = fromRaw(
    import.meta.glob('/content/snippets/*.md', {
      eager: true
    })
  )

  const sorted = sortEntries(entries, sort)
  const limited = limitEntries(sorted, limit)

  return await toEntries(limited)
}
