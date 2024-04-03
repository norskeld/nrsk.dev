import { getCollection, type CollectionEntry } from 'astro:content'

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
    },
    {
      kind: 'fsharp',
      name: 'F#',
      ext: '.fs',
      color: ['#b845fc', '#b845fc']
    }
  ]

  return languages.find(({ kind }) => kind === lang)!
}

export async function loadProjects(): Promise<Array<ProjectEntry>> {
  return (await getCollection('projects')).sort((prev, next) => prev.data.order - next.data.order)
}
