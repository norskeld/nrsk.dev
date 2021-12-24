import { Post } from '@/api/posts'

import ArticlePreview from '@/components/shared/article'

import styles from './recent-articles.module.css'

interface RecentArticlesSectionProps {
  children: React.ReactNode
}

interface RecentArticlesProps {
  posts: Array<Post>
}

export function RecentArticlesSection({ children }: RecentArticlesSectionProps) {
  return <section className={styles.section}>{children}</section>
}

export function RecentArticles({ posts }: RecentArticlesProps) {
  return (
    <section className={styles.articles}>
      {posts.map(({ id, ...props }) => (
        <ArticlePreview key={id} href={`/blog/${id}`} {...props} />
      ))}
    </section>
  )
}
