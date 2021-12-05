import Link from 'next/link'

import styles from './back.module.css'

export default function Back() {
  return (
    <footer className={styles.back}>
      <Link href="/">
        <a>← Back to Home</a>
      </Link>
    </footer>
  )
}
