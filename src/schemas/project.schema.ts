import { z } from 'astro:content'

import { language } from '@/api/content/projects'

const languages = z.union([
  z.literal('typescript'),
  z.literal('rust'),
  z.literal('haskell'),
  z.literal('go'),
  z.literal('ocaml')
])

export default z.object({
  order: z.number().optional().default(-1),
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
  language: languages.transform(language),
  wip: z.boolean().optional().default(false)
})
