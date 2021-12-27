import { css } from '@emotion/react'

import { Post } from '@/api/posts'

import ArticlePreview from '@/components/shared/article'

interface RecentArticlesProps {
  posts: Array<Post>
}

interface RecentArticlesSectionProps {
  children: React.ReactNode
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

export function RecentArticlesSection({ children }: RecentArticlesSectionProps) {
  return <section css={sectionCss}>{children}</section>
}
