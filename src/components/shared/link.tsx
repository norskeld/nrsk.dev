import Link, { LinkProps } from 'next/link'
import cx from 'classnames'

import styles from './link.module.css'

interface AppLinkProps extends LinkProps {
  blank?: boolean
  title?: string
  external?: boolean
  className?: string
  children: React.ReactNode
}

interface ExternalLinkProps {
  href: string
  blank?: boolean
  title?: string
  className?: string
  children: React.ReactNode
}

function isExternalLink(href: unknown, external?: boolean) {
  return Boolean(external) && typeof href === 'string'
}

export function ExternalLink({ href, blank, className, title, children }: ExternalLinkProps) {
  const target = blank ? '_blank' : '_self'

  return (
    <a className={cx(styles.external, className)} rel="noopener" {...{ href, target, title }}>
      {children}
    </a>
  )
}

export function AppLink({
  href,
  blank,
  external,
  className,
  title,
  children,
  ...rest
}: AppLinkProps) {
  return isExternalLink(href, external) ? (
    <ExternalLink className={className} blank={blank} href={href as string} title={title}>
      {children}
    </ExternalLink>
  ) : (
    <Link href={href} {...rest}>
      {children}
    </Link>
  )
}

export default AppLink
