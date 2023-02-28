import { defineCollection } from 'astro:content'

import articleSchema from '@/schemas/article.schema'
import projectSchema from '@/schemas/project.schema'

export const collections = {
  articles: defineCollection({ schema: articleSchema }),
  notes: defineCollection({ schema: articleSchema }),
  projects: defineCollection({ schema: projectSchema })
}
