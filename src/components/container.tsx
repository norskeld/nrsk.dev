import styles from './container.module.css'

interface Props {
  children: React.ReactNode
}

export default function Container({ children }: Props) {
  return <main className={styles.container}>{children}</main>
}
