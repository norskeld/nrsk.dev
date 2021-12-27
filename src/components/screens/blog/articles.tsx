import { css } from '@emotion/react'

import { Post } from '@/api/posts'

import ArticlePreview from '@/components/shared/article'

interface ArticlesProps {
  posts: Array<Post>
}

const articlesCss = css`
  padding-top: 2rem;
`

export function Articles({ posts }: ArticlesProps) {
  return (
    <section css={articlesCss}>
      {posts.map(({ id, ...props }) => (
        <ArticlePreview key={id} href={`/blog/${id}`} {...props} />
      ))}
    </section>
  )
}
