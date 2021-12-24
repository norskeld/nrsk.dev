import AppLink from './link'
import Logo from './logo'

import styles from './nav.module.css'

interface NavBrandProps {
  children: React.ReactNode
}

interface NavLinksProps {
  children: React.ReactNode
}

interface NavLinkProps {
  href: string
  blank?: boolean
  external?: boolean
  children: React.ReactNode
}

export function Nav() {
  return (
    <nav className={styles.nav}>
      <NavBrand>
        <Logo />
      </NavBrand>

      <NavLinks>
        <NavLink href="/blog">Blog</NavLink>
        <NavDivider />
        <NavLink href="/about">About</NavLink>
      </NavLinks>
    </nav>
  )
}

export function NavBrand({ children }: NavBrandProps) {
  return (
    <div className={styles.brand}>
      <a href="/">{children}</a>
    </div>
  )
}

export function NavLinks({ children }: NavLinksProps) {
  return <div className={styles.links}>{children}</div>
}

export function NavLink({ children, ...props }: NavLinkProps) {
  return (
    <div className={styles.link}>
      <AppLink {...props}>{children}</AppLink>
    </div>
  )
}

export function NavDivider() {
  return <div className={styles.divider}>&middot;</div>
}

export default Nav
