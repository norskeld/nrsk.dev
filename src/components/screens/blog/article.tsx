import styles from './article.module.css'

interface ArticleFooterProps {
  children: React.ReactNode
}

interface ArticleContentProps {
  html: string
}

export function ArticleFooter({ children }: ArticleFooterProps) {
  return <footer className={styles.footer}>{children}</footer>
}

export function ArticleContent({ html }: ArticleContentProps) {
  return <article className={styles.content} dangerouslySetInnerHTML={{ __html: html }} />
}
