import Link, { LinkProps } from 'next/link'
import { css } from '@emotion/react'

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

const externalLinkCss = css`
  padding-bottom: 0.05rem;
  border-bottom: 2px solid rgba(var(--accent-base), 0.125);
  color: rgba(var(--accent-base), 0.9);

  &:focus,
  &:hover {
    color: var(--link-hover);
    border-color: var(--link-hover);
  }
`

function isExternalLink(href: unknown, external?: boolean) {
  return Boolean(external) && typeof href === 'string'
}

export function ExternalLink({ href, blank, className, title, children }: ExternalLinkProps) {
  const target = blank ? '_blank' : '_self'

  return (
    <a css={externalLinkCss} className={className} rel="noopener" {...{ href, target, title }}>
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
  const props = { ...rest, href, title }

  return isExternalLink(href, external) ? (
    <ExternalLink className={className} blank={blank} href={href as string} title={title}>
      {children}
    </ExternalLink>
  ) : (
    <Link {...props}>{children}</Link>
  )
}

export default AppLink
