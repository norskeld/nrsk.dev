import { getCollection, type CollectionEntry } from 'astro:content'
import markdown from 'markdown-it'

export type ProjectEntry = CollectionEntry<'projects'>

export interface Language {
  kind: string
  color: [light: string, dark: string]
  name: string
  ext: string
}

export function language(lang: string): Language {
  const languages: Array<Language> = [
    {
      kind: 'typescript',
      name: 'TypeScript',
      ext: '.ts',
      color: ['#3178c6', '#4c83bd']
    },
    {
      kind: 'rust',
      name: 'Rust',
      ext: '.rs',
      color: ['#a9643d', '#dea584']
    },
    {
      kind: 'haskell',
      name: 'Haskell',
      ext: '.hs',
      color: ['#5e5086', '#8576ad']
    }
  ]

  return languages.find(({ kind }) => kind === lang)!
}

export async function loadProjects(): Promise<Array<ProjectEntry>> {
  const entries = await getCollection('projects')

  const parser = markdown('default', {
    typographer: true
  })

  return entries
    .sort((prev, next) => prev.data.order - next.data.order)
    .map((entry) => ({
      ...entry,
      data: {
        ...entry.data,
        description: parser.renderInline(entry.data.description)
      }
    }))
}
