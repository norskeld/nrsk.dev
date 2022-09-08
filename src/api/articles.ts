import type { MarkdownInstance as Markdown, MarkdownHeading } from 'astro'
import { basename, extname } from 'path'

import { processMarkdown } from './markdown'

interface FrontmatterRaw {
  title: string
  description: string
  draft?: boolean
  createdAt: string
  updatedAt?: string
}

export interface Frontmatter extends FrontmatterRaw {
  draft: boolean
}

export interface Article {
  slug: string
  content: string
  frontmatter: Frontmatter
  headings: Array<MarkdownHeading>
}

export interface LoaderOptions {
  limit?: number
  sort?: 'asc' | 'none' | 'desc'
}

export async function loadArticles({ limit = -1, sort = 'none' }: LoaderOptions = {}) {
  const entriesRaw = import.meta.glob<Markdown<FrontmatterRaw>>('../../content/blog/*.md', {
    eager: true
  })

  const entriesDefaulted = Object.values(entriesRaw).map<Markdown<Frontmatter>>((entry) => ({
    ...entry,
    frontmatter: {
      ...entry.frontmatter,
      draft: entry.frontmatter.draft ?? false
    }
  }))

  const entriesSorted =
    sort === 'none'
      ? entriesDefaulted
      : entriesDefaulted.sort((prev, next) => {
          const prevDate = new Date(prev.frontmatter.createdAt).valueOf()
          const nextDate = new Date(next.frontmatter.createdAt).valueOf()

          switch (sort) {
            case 'asc':
              return prevDate - nextDate
            case 'desc':
              return nextDate - prevDate
          }
        })

  const entriesLimited = limit > 0 ? entriesSorted.slice(0, limit) : entriesSorted

  const entries = entriesLimited.map<Promise<Article>>(async (article) => ({
    content: await processMarkdown(article.rawContent(), 'norskeld'),
    slug: basename(article.file, extname(article.file)),
    frontmatter: article.frontmatter,
    headings: article.getHeadings()
  }))

  return await Promise.all(entries)
}
