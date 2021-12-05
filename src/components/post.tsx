import styles from './post.module.css'

interface Props {
  children: React.ReactNode
}

export default function Post({ children }: Props) {
  return <article className={styles.post}>{children}</article>
}
