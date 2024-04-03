import { defineCollection, z } from 'astro:content'

import { language } from '@/api/content/projects'

function intoTimestamp(date: Date | string): number {
  return (date instanceof Date ? date : new Date(date)).valueOf()
}

const articles = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdAt: z.string().or(z.date()).transform(intoTimestamp),
    updatedAt: z.string().or(z.date()).transform(intoTimestamp).optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string())
  })
})

const languages = z.union([
  z.literal('typescript'),
  z.literal('rust'),
  z.literal('haskell'),
  z.literal('fsharp')
])

const projects = defineCollection({
  schema: z.object({
    order: z.number().optional().default(-1),
    name: z.string(),
    description: z.string(),
    url: z.string().url(),
    language: languages.transform(language),
    wip: z.boolean().optional().default(false)
  })
})

export const collections = {
  articles,
  projects
}
