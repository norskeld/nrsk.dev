import { css } from '@emotion/react'

import type { Post } from '@/api/posts'

import ArticlePreview from '@/components/shared/article'

interface RecentArticlesProps {
  posts: Array<Post>
}

const sectionCss = css`
  padding-top: 2rem;

  @media screen and (min-width: 560px) {
    padding-top: 5rem;
  }
`

const articlesCss = css`
  padding-top: 1.5rem;
`

export function RecentArticles({ posts }: RecentArticlesProps) {
  return (
    <section css={articlesCss}>
      {posts.map(({ id, ...props }) => (
        <ArticlePreview key={id} href={`/blog/${id}`} {...props} />
      ))}
    </section>
  )
}

export function RecentArticlesSection({ children }: React.ComponentPropsWithoutRef<'section'>) {
  return <section css={sectionCss}>{children}</section>
}
