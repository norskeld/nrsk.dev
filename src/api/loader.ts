import type { MarkdownInstance as Markdown, MarkdownHeading } from 'astro'
import { basename, extname } from 'path'

import { processMarkdown } from './processor'

interface FrontmatterRaw {
  title: string
  description?: string
  draft?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface Article {
  slug: string
  content: string
  frontmatter: Frontmatter
  headings: Array<MarkdownHeading>
}

export type Frontmatter = Required<FrontmatterRaw>

export async function loadArticles() {
  const entriesRaw = import.meta.glob<Markdown<FrontmatterRaw>>('../content/blog/*.md', {
    eager: true
  })

  const entriesWithDefaults = Object
    .values(entriesRaw)
    .map<Markdown<Frontmatter>>((entry) => ({
      ...entry,
      frontmatter: {
        ...entry.frontmatter,
        description: entry.frontmatter.description ?? '',
        draft: entry.frontmatter.draft ?? false,
        createdAt: entry.frontmatter.createdAt ?? new Date().toISOString(),
        updatedAt: entry.frontmatter.updatedAt ?? new Date().toISOString()
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
