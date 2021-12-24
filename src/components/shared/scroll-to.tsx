import styles from './scroll-to.module.css'

interface ScrollToProps extends ScrollToOptions {
  children: React.ReactNode
}

export default function ScrollTo({ children, ...scrollOptions }: ScrollToProps) {
  return (
    <a className={styles.link} onClick={() => window.scrollTo(scrollOptions)}>
      {children}
    </a>
  )
}
