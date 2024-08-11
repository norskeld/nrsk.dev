import { defineCollection, z, type CollectionEntry, type CollectionKey } from 'astro:content'

import { intoTimestamp, partitionBy } from '@/api/utils'

import { getWithOptions, type LoaderOptions } from '.'

export type ArticleEntry = CollectionEntry<'articles' | 'zeal'>

export interface ArticleTag {
  tag: string
  collection: CollectionKey
  articles: Array<ArticleEntry>
}

export const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    draft: z.boolean().optional(),
    title: z.string(),
    description: z.string(),
    createdAt: z.string().or(z.date()).transform(intoTimestamp),
    updatedAt: z.string().or(z.date()).transform(intoTimestamp).optional(),
    tags: z.array(z.string()).optional()
  })
})

export async function getArticles(options?: Partial<LoaderOptions>): Promise<Array<ArticleEntry>> {
  return getWithOptions('articles', options)
}

export async function getZealArticles(
  options?: Partial<LoaderOptions>
): Promise<Array<ArticleEntry>> {
  return getWithOptions('zeal', options)
}

export async function getAllArticles(
  options?: Partial<LoaderOptions>
): Promise<Array<ArticleEntry>> {
  return (await Promise.all([getArticles(options), getZealArticles(options)])).flat()
}

export async function getAllTags(): Promise<Array<ArticleTag>> {
  const allArticles = await getAllArticles()
  const allTags = [] as Array<ArticleTag>

  const uniqueTags = new Set(allArticles.flatMap(({ data }) => data?.tags ?? []))

  for (const tag of uniqueTags) {
    const partitioned = partitionBy(
      allArticles.filter(({ data }) => (data?.tags ?? []).includes(tag)),
      ({ collection }) => collection
    )

    const tags = partitioned.flatMap((articles) =>
      articles.map(({ collection }) => ({
        tag,
        collection,
        articles
      }))
    )

    allTags.push(...tags)
  }

  return allTags
}
