import { Post } from '@/api/posts'

import ArticlePreview from '@/components/shared/article'

import styles from './articles.module.css'

interface ArticlesProps {
  posts: Array<Post>
}

export function Articles({ posts }: ArticlesProps) {
  return (
    <section className={styles.articles}>
      {posts.map(({ id, ...props }) => (
        <ArticlePreview key={id} href={`/blog/${id}`} {...props} />
      ))}
    </section>
  )
}
