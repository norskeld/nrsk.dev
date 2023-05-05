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
      kind: 'golang',
      name: 'Go',
      ext: '.go',
      color: ['#00ADD8', '#4DC1F7']
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
