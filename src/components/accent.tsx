import styles from './accent.module.css'

interface Props {
  color?: string
  children: React.ReactNode
}

export default function Accent({ color, children }: Props) {
  return (
    <span style={{ color }} className={styles.accent}>
      {children}
    </span>
  )
}
