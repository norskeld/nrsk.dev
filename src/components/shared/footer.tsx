import AppLink from './link'

import styles from './footer.module.css'

interface FooterItemProps {
  children: React.ReactNode
}

export default function Footer() {
  const NextJsLink = () => (
    <AppLink external blank href="https://nextjs.org/">
      Next.js
    </AppLink>
  )

  return (
    <footer className={styles.footer}>
      <FooterItem>&copy; 2021</FooterItem>
      <FooterDot />

      <FooterItem>
        Built with <NextJsLink />
      </FooterItem>
    </footer>
  )
}

function FooterDot() {
  return <span className={styles.dot}>&middot;</span>
}

function FooterItem({ children }: FooterItemProps) {
  return <span className={styles.item}>{children}</span>
}
