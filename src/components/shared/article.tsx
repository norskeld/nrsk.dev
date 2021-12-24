import { format, parseISO } from 'date-fns'
import Link from 'next/link'

import styles from './article.module.css'

interface ArticleProps {
  href: string
  title: string
  date: string
  excerpt?: string
}

interface ArticleHeadingProps {
  href: string
  title: string
}

interface ArticleDateProps {
  date: string
}

interface ArticleExcerptProps {
  children: React.ReactNode
}

export default function Article({ title, href, excerpt, date }: ArticleProps) {
  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <ArticleHeading href={href} title={title} />
        <ArticleDate date={date} />
      </header>

      <ArticleExcerpt>{excerpt}</ArticleExcerpt>
    </article>
  )
}

function ArticleHeading({ href, title }: ArticleHeadingProps) {
  return (
    <h2 className={styles.heading}>
      <Link href={href} passHref>
        <a>{title}</a>
      </Link>
    </h2>
  )
}

function ArticleDate({ date }: ArticleDateProps) {
  return (
    <time className={styles.date} dateTime={date}>
      {format(parseISO(date), 'LLLL d, yyyy')}
    </time>
  )
}

function ArticleExcerpt({ children }: ArticleExcerptProps) {
  return <p className={styles.excerpt}>{children}</p>
}
