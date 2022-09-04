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

export async function loadArticles() {
  const entriesRaw = import.meta.glob<Markdown<FrontmatterRaw>>('../../content/blog/*.md', {
    eager: true
  })

  const entriesWithDefaults = Object
    .values(entriesRaw)
    .map<Markdown<Frontmatter>>((entry) => ({
      ...entry,
      frontmatter: {
        ...entry.frontmatter,
        draft: entry.frontmatter.draft ?? false
      }
    }))

  const entries = entriesWithDefaults
    .map<Promise<Article>>(async (article) => ({
      content: await processMarkdown(article.rawContent(), 'norskeld'),
      slug: basename(article.file, extname(article.file)),
      frontmatter: article.frontmatter,
      headings: article.getHeadings()
    }))

  return await Promise.all(entries)
}

export async function loadRecentArticles(amount: number) {
  const articles = await loadArticles()

  return articles
    .sort((prev, next) => {
      const prevDate = new Date(prev.frontmatter.createdAt).valueOf()
      const nextDate = new Date(next.frontmatter.createdAt).valueOf()

      return nextDate - prevDate
    })
    .slice(0, amount)
}
