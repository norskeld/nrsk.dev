import styles from './about.module.css'

interface AboutSectionProps {
  children: React.ReactNode
}

export function AboutSection({ children }: AboutSectionProps) {
  return <section className={styles.about}>{children}</section>
}
