import { defineCollection, getCollection, z, type CollectionEntry } from 'astro:content'

export type ProjectEntry = CollectionEntry<'projects'>

export interface Language {
  kind: string
  color: [light: string, dark: string]
  name: string
  ext: string
}

export const languages: Record<z.infer<typeof language>, Language> = {
  typescript: {
    kind: 'typescript',
    name: 'TypeScript',
    ext: '.ts',
    color: ['#3178c6', '#4c83bd']
  },
  rust: {
    kind: 'rust',
    name: 'Rust',
    ext: '.rs',
    color: ['#a9643d', '#dea584']
  },
  haskell: {
    kind: 'haskell',
    name: 'Haskell',
    ext: '.hs',
    color: ['#5e5086', '#8576ad']
  },
  fsharp: {
    kind: 'fsharp',
    name: 'F#',
    ext: '.fs',
    color: ['#b845fc', '#b845fc']
  }
}

const language = z.union([
  z.literal('typescript'),
  z.literal('rust'),
  z.literal('haskell'),
  z.literal('fsharp')
])

export const projectsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    order: z.number().optional().default(-1),
    name: z.string(),
    description: z.string(),
    url: z.string().url(),
    language: language.transform((lang) => languages[lang]),
    wip: z.boolean().optional().default(false)
  })
})

export async function getProjects(): Promise<Array<ProjectEntry>> {
  return (await getCollection('projects')).sort((prev, next) => prev.data.order - next.data.order)
}
