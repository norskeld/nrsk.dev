import { getCollection, type CollectionEntry } from 'astro:content'

import { defaults, type LoaderOptions } from '@/api/content'

export type NoteEntry = CollectionEntry<'notes'>

export async function loadNotes(options?: Partial<LoaderOptions>): Promise<Array<NoteEntry>> {
  const { sort, limit } = defaults(options)

  let entries = await getCollection('notes')

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
