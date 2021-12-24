import { readdir as readDir, readFile } from 'fs/promises'
import { join } from 'path'

import matter from 'gray-matter'

import { blogDir, blogSyntaxTheme } from '@/content.config'
import { processMarkdown } from '@/api/markdown'

export interface PostId {
  id: string
  [param: string]: string
}

export interface PostMatter {
  title: string
  date: string
}

export interface PostData {
  content: string
  excerpt: string
}

export type Post = PostId & PostMatter & PostData

function getPostsLocation(): string {
  return blogDir ?? 'blog'
}

function getSyntaxTheme(): string {
  return blogSyntaxTheme ?? 'nord'
}

export async function getPosts(): Promise<Array<Post>> {
  const entriesPath = join(process.cwd(), getPostsLocation())
  const entries = await readDir(entriesPath)

  const posts = await Promise.all(
    entries.map(async (fileName) => await getPost(fileName.replace(/\.md$/, '')))
  )

  return posts.sort((left, right) => (left.date < right.date ? 1 : -1))
}

export async function getPostsId(): Promise<Array<{ params: PostId }>> {
  const postsPath = join(process.cwd(), getPostsLocation())
  const entries = await readDir(postsPath, { withFileTypes: true })

  return entries
    .filter((entry) => entry.isFile())
    .map(({ name }) => ({
      params: {
        id: name.replace(/\.md$/, '')
      }
    }))
}

export async function getPost(id: string): Promise<Post> {
  const fullPath = join(process.cwd(), getPostsLocation(), `${id}.md`)
  const fileContents = await readFile(fullPath, { encoding: 'utf8' })

  const { content: rawContent, ...rest } = extractFrontmatter(fileContents)
  const content = await processMarkdown(rawContent, getSyntaxTheme())

  return {
    id,
    content,
    ...rest
  }
}

function extractFrontmatter(md: string): PostData & PostMatter {
  const {
    content: rawContent,
    excerpt: rawExcerpt,
    data
  } = matter(md, {
    excerpt: true
  })

  const excerpt = rawExcerpt ?? ''
  const content = rawContent.replace(excerpt, '')

  return {
    content: content.trim(),
    excerpt: excerpt.trim(),
    ...(data as PostMatter)
  }
}
