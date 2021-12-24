import styles from './container.module.css'

interface ContainerProps {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return <main className={styles.container}>{children}</main>
}
