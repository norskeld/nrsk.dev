import styles from './wrapper.module.css'

interface Props {
  children: React.ReactNode
}

export default function Wrapper({ children }: Props) {
  return <div className={styles.wrapper}>{children}</div>
}
