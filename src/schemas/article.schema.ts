import { z } from 'astro:content'

function intoTimestamp(date: Date | string): number {
  return (date instanceof Date ? date : new Date(date)).valueOf()
}

export default z.object({
  title: z.string(),
  description: z.string(),
  createdAt: z.string().or(z.date()).transform(intoTimestamp),
  updatedAt: z.string().or(z.date()).transform(intoTimestamp).optional(),
  draft: z.boolean().optional(),
  tags: z.array(z.string())
})
