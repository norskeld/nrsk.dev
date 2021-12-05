import styles from './hero.module.css'

interface Props {
  children: React.ReactNode
}

export function HeroAbout({ children }: Props) {
  return <section className={styles.catch}>{children}</section>
}

export function HeroArticles({ children }: Props) {
  return <section className={styles.articles}>{children}</section>
}
