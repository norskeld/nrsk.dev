import { readdirSync, readFileSync } from 'fs'
import matter from 'gray-matter'
import { join } from 'path'

import { processMarkdown } from './markdown'

export interface PostId {
  id: string
  [id: string]: string
}

export interface PostMatter {
  title: string
  date: string
}

export interface PostData {
  content: string
  excerpt?: string
}

export type Post = PostId & PostMatter & PostData

const postsDirectory = join(process.cwd(), 'posts')

export function getSortedPostsData(): Array<PostId & PostMatter> {
  const fileNames = readdirSync(postsDirectory)

  const posts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = join(postsDirectory, fileName)
    const fileContents = readFileSync(fullPath, 'utf8')

    const { content: _, ...rest } = extractFrontmatter(fileContents)

    return {
      id,
      ...rest
    }
  })

  return posts.sort((left, right) => (left.date < right.date ? 1 : -1))
}

export function getAllPostIds(): Array<{ params: PostId }> {
  const fileNames = readdirSync(postsDirectory)

  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, '')
    }
  }))
}

export async function getPostData(id: string): Promise<Post> {
  const fullPath = join(postsDirectory, `${id}.md`)
  const fileContents = readFileSync(fullPath, 'utf8')

  const { content: rawContent, ...rest } = extractFrontmatter(fileContents)
  const content = await processMarkdown(rawContent)

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
