import Link, { LinkProps } from 'next/link'

import Logo from './logo'

import { isExternalLink } from './nav.utils'
import styles from './nav.module.css'

interface NavLinkProps extends LinkProps {
  blank?: boolean
  title?: string
  external?: boolean
  children: React.ReactNode
}

interface ExternalLinkProps {
  href: string
  blank?: boolean
  title?: string
  children: React.ReactNode
}

interface NavItemProps {
  className?: string
  children: React.ReactNode
}

// TODO: Decouple and split this.
export default function Nav() {
  return (
    <nav className={styles.nav}>
      <NavItem className={styles.brand}>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
      </NavItem>

      <NavItem className={styles.links}>
        <NavLink external blank href="https://hypnosense.bandcamp.com">
          Music
        </NavLink>

        <NavDivider />

        <NavLink external href="https://github.com/norskeld">
          GitHub
        </NavLink>
      </NavItem>
    </nav>
  )
}

function NavItem({ className, children }: NavItemProps) {
  return <div className={className}>{children}</div>
}

function NavDivider() {
  return <NavItem className={styles.divider}>&middot;</NavItem>
}

function NavLink({ blank, title, external, children, href, ...rest }: NavLinkProps) {
  return (
    <div className={styles.link}>
      {isExternalLink(href, external) && (
        <ExternalLink blank={blank} href={href as string} title={title}>
          {children}
        </ExternalLink>
      )}

      {!isExternalLink(href, external) && (
        <Link href={href} {...rest}>
          {children}
        </Link>
      )}
    </div>
  )
}

function ExternalLink({ href, blank, title, children }: ExternalLinkProps) {
  const target = blank ? '_blank' : '_self'

  return (
    <a rel="noopener" {...{ href, target, title }}>
      {children}
    </a>
  )
}
