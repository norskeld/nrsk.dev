import styles from './about.module.css'

interface AboutSectionProps {
  children: React.ReactNode
}

interface AboutDescriptionProps {
  children: React.ReactNode
}

export function AboutSection({ children }: AboutSectionProps) {
  return <section className={styles.about}>{children}</section>
}

export function AboutDescription({ children }: AboutDescriptionProps) {
  return <section className={styles.description}>{children}</section>
}
