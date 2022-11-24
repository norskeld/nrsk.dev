import { defaultLoaderOptions, fromRaw, sortEntries, limitEntries, toEntries } from './shared'
import type { Entry, Loader, Frontmatter } from './shared'

export type ArticleFrontmatter = Frontmatter
export type ArticleEntry = Entry<ArticleFrontmatter>

export const loadArticles: Loader<ArticleFrontmatter> = async (options) => {
  const { sort, limit } = defaultLoaderOptions(options)

  const entries = fromRaw(
    import.meta.glob('/content/blog/*.md', {
      eager: true
    })
  )

  const sorted = sortEntries(entries, sort)
  const limited = limitEntries(sorted, limit)

  return await toEntries(limited)
}
