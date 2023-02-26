import type { Entry, Frontmatter } from './shared'

export type WithTags<T> = T & { tags?: Array<string> }

export interface StaticPath {
  params: Record<string, unknown>
  props: Record<string, unknown>
}

export type StaticPathMapper<F extends Frontmatter> = (
  entries: [string, Array<Entry<F>>]
) => StaticPath

export function resolveTagsStaticPaths<T extends Frontmatter, F extends WithTags<T>>(
  sources: Array<Entry<F>>,
  fn: StaticPathMapper<F>
) {
  const entries = sources
    .filter(({ frontmatter }) => frontmatter.tags && frontmatter.tags.length)
    .reduce((map, entry) => {
      if (entry.frontmatter.tags) {
        return entry.frontmatter.tags.reduce(
          (acc, tag) => acc.set(tag, [...(acc.get(tag) ?? []), entry]),
          map
        )
      }

      return map
    }, new Map<string, Array<Entry<F>>>())

  return Array.from(entries).map(fn)
}
