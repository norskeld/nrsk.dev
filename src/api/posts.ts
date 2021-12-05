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
  excerpt?: string
}

export interface PostData {
  content: string
}

export type Post = PostId & PostMatter & PostData

const postsDirectory = join(process.cwd(), 'posts')

export function getSortedPostsData(): Array<PostId & PostMatter> {
  const fileNames = readdirSync(postsDirectory)

  const posts = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = join(postsDirectory, fileName)
    const fileContents = readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    return {
      id,
      ...(matterResult.data as PostMatter)
    }
  })

  return posts.sort((left, right) => (left.date < right.date ? 1 : -1))
}

export function getAllPostIds(): Array<{ params: PostId }> {
  const fileNames = readdirSync(postsDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(id: string): Promise<Post> {
  const fullPath = join(postsDirectory, `${id}.md`)
  const fileContents = readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)
  const content = await processMarkdown(matterResult.content)

  return {
    id,
    content,
    ...(matterResult.data as PostMatter)
  }
}
