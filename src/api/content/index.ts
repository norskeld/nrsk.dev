import {
  getCollection,
  type CollectionEntry,
  type CollectionKey,
  type ContentCollectionKey
} from 'astro:content'

import { collectionsMap } from '@/content/config'

export * from './articles'
export * from './projects'

export type Order = 'asc' | 'none' | 'desc'

export interface LoaderOptions {
  sort: Order
  limit: number
}

export interface Collection {
  key: CollectionKey
  name: string
  series: boolean
}

export function defaults(options?: Partial<LoaderOptions>): LoaderOptions {
  return {
    sort: 'none',
    limit: -1,
    ...options
  }
}

export async function getWithOptions<K extends ContentCollectionKey>(
  collection: K,
  options?: Partial<LoaderOptions>
): Promise<Array<CollectionEntry<K>>> {
  const { sort, limit } = defaults(options)

  // Filter out drafts right away when building for production.
  let entries = await getCollection(collection, ({ data }) =>
    import.meta.env.PROD ? data.draft !== true : true
  )

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
