import { defineCollection, z } from 'astro:content'

import { articlesSchema, projectsSchema } from '@/api/content'

const articles = defineCollection({
  type: 'content',
  schema: articlesSchema
})

const projects = defineCollection({
  type: 'data',
  schema: projectsSchema
})

export const collections = {
  articles,
  projects
}
