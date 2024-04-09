import { getCollection, z, type CollectionEntry } from 'astro:content'

import { defaults, type LoaderOptions } from '.'

export type ArticleEntry = CollectionEntry<'articles'>

function intoTimestamp(date: Date | string): number {
  return (date instanceof Date ? date : new Date(date)).valueOf()
}

export const articlesSchema = z.object({
  title: z.string(),
  description: z.string(),
  createdAt: z.string().or(z.date()).transform(intoTimestamp),
  updatedAt: z.string().or(z.date()).transform(intoTimestamp).optional(),
  draft: z.boolean().optional(),
  tags: z.array(z.string())
})

export async function loadArticles(options?: Partial<LoaderOptions>): Promise<Array<ArticleEntry>> {
  const { sort, limit } = defaults(options)

  let entries = await getCollection('articles')

  if (sort !== 'none') {
    entries.sort((prev, next) => {
      // prettier-ignore
      switch (sort) {
        case 'asc': return prev.data.createdAt - next.data.createdAt
        case 'desc': return next.data.createdAt - prev.data.createdAt
      }
    })
  }

  if (limit > 0) {
    entries = entries.slice(0, limit)
  }

  return entries
}

export async function loadTags() {
  const entries = await loadArticles()

  const tags = new Set(entries.map((entry) => entry.data.tags).flat())

  return [...tags].map((tag) => {
    const articles = entries.filter((entry) => entry.data.tags.includes(tag))

    return {
      tag,
      articles
    }
  })
}
