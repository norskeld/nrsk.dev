import styles from './accent.module.css'

interface AccentProps {
  color?: string
  children: React.ReactNode
}

export default function Accent({ color, children }: AccentProps) {
  return (
    <span style={{ color }} className={styles.accent}>
      {children}
    </span>
  )
}
