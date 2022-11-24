import { basename, extname } from 'node:path'

import type { MarkdownInstance as Markdown, MarkdownHeading } from 'astro'

import { render } from '../markdown'

export interface FrontmatterRaw {
  title: string
  description: string
  draft?: boolean
  createdAt: string
  updatedAt?: string
}

export type Frontmatter = Required<FrontmatterRaw>

export interface Entry<F extends Frontmatter = Frontmatter> {
  slug: string
  content: string
  frontmatter: F
  headings: Array<MarkdownHeading>
}

export interface LoaderOptions {
  sort: 'asc' | 'none' | 'desc'
  limit: number
}

export type Loader<F extends Frontmatter = Frontmatter> = (
  options?: Partial<LoaderOptions>
) => Promise<Array<Entry<F>>>

export function defaultLoaderOptions(options?: Partial<LoaderOptions>): LoaderOptions {
  return {
    sort: 'none',
    limit: -1,

    ...options
  }
}

export function fromRaw<F extends Frontmatter>(
  raw: Record<string, Markdown<FrontmatterRaw>>
): Array<Markdown<F>> {
  return Object.values(raw).map<Markdown<F>>((entry) => ({
    ...entry,
    frontmatter: {
      ...entry.frontmatter,
      draft: entry.frontmatter.draft ?? false,
      updatedAt: entry.frontmatter.updatedAt ?? entry.frontmatter.createdAt
    } as F
  }))
}

export function sortEntries<F extends Frontmatter>(
  entries: Array<Markdown<F>>,
  sort: 'asc' | 'none' | 'desc'
): Array<Markdown<F>> {
  return sort === 'none'
    ? entries
    : entries.sort((prev, next) => {
        const prevDate = new Date(prev.frontmatter.createdAt).valueOf()
        const nextDate = new Date(next.frontmatter.createdAt).valueOf()

        // prettier-ignore
        switch (sort) {
        case 'asc': return prevDate - nextDate
        case 'desc': return nextDate - prevDate
      }
      })
}

export function limitEntries<F extends Frontmatter>(
  entries: Array<Markdown<F>>,
  limit: number
): Array<Markdown<F>> {
  return limit > 0 ? entries.slice(0, limit) : entries
}

export async function toEntries<F extends Frontmatter>(
  entries: Array<Markdown<F>>
): Promise<Array<Entry<F>>> {
  return await Promise.all(
    entries.map<Promise<Entry<F>>>(async (entry) => ({
      slug: basename(entry.file, extname(entry.file)),
      content: await render(entry.rawContent()),
      frontmatter: entry.frontmatter,
      headings: entry.getHeadings()
    }))
  )
}
