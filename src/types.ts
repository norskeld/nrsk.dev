import type { MDXInstance as MDX, MarkdownInstance as MD, Page } from 'astro'
import type { DataMap } from 'vfile'

type Theme = 'light' | 'dark'

interface Meta {
  title: string
  description?: string
  image?: string
}

interface ArticleMd {
  title: string
  description: string
  draft?: boolean
  createdAt?: Date
  updatedAt?: Date
}

type Article = ArticleMd & DataMap['astro']['frontmatter']

type Unwrap<T> = T extends Array<infer R> ? R : unknown

export type {
  Theme,
  Article,
  Page,
  Meta,
  MDX,
  MD,
  Unwrap
}
