import { css } from '@emotion/react'

import NavMotion from '@/components/transitions/nav'

import AppLink from './link'
import Logo from './logo'
import { useRouter } from 'next/router'

interface NavContainerProps {
  style?: React.CSSProperties
  children: React.ReactNode
}

interface NavLinkProps {
  href: string
  blank?: boolean
  external?: boolean
  children: React.ReactNode
}

interface NavLinksProps {
  children: React.ReactNode
}

interface NavBrandProps {
  children: React.ReactNode
}

const navCss = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 2rem;

  @media screen and (min-width: 560px) {
    padding-top: 6rem;
  }

  @media screen and (min-width: 768px) {
    max-width: var(--container-w);
  }
`

const brandCss = css`
  display: block;
  padding: 0;
`

const linksCss = css`
  display: flex;
  align-items: center;
`

const linkCss = css`
  padding: 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 800;

  &:hover {
    color: var(--accent);
  }

  @media screen and (min-width: 560px) {
    padding-left: 0.5rem;
  }
`

const dividerCss = css`
  padding: 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 800;
  pointer-events: none;
  user-select: none;
  color: var(--contrast-800);
`

export function NavContainer({ style, children }: NavContainerProps) {
  return (
    <nav css={navCss} style={style}>
      {children}
    </nav>
  )
}

export function Nav() {
  const { asPath } = useRouter()

  return (
    <NavMotion location={asPath}>
      <NavBrand>
        <Logo />
      </NavBrand>

      <NavLinks>
        <NavLink href="/blog">
          <a title="Blog articles">Blog</a>
        </NavLink>

        <NavDivider />

        <NavLink href="/about">
          <a title="About author of this site">About</a>
        </NavLink>
      </NavLinks>
    </NavMotion>
  )
}

export function NavBrand({ children }: NavBrandProps) {
  return (
    <div css={brandCss}>
      <AppLink href="/">
        <a title="Back to homepage">{children}</a>
      </AppLink>
    </div>
  )
}

export function NavLinks({ children }: NavLinksProps) {
  return <div css={linksCss}>{children}</div>
}

export function NavLink({ children, ...props }: NavLinkProps) {
  return (
    <div css={linkCss}>
      <AppLink {...props}>{children}</AppLink>
    </div>
  )
}

export function NavDivider() {
  return <div css={dividerCss}>&middot;</div>
}

export default Nav
