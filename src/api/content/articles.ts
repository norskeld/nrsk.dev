import { getCollection, type CollectionEntry } from 'astro:content'

import { defaults, type LoaderOptions } from '@/api/content'

export type ArticleEntry = CollectionEntry<'articles'>

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
