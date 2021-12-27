import { m, domAnimation, LazyMotion, Variants } from 'framer-motion'
import { css } from '@emotion/react'

import AppLink from './link'
import Logo from './logo'

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
  font-size: 1.5rem;
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
  font-size: 1.5rem;
  font-weight: 800;
  user-select: none;
  pointer-events: none;
  color: var(--contrast-800);
`

const variants: Variants = {
  hidden: { opacity: 0, y: '-1.65rem' },
  enter: { opacity: 1, y: '0rem', transition: { duration: 0.55 } },
  exit: { opacity: 0, y: '1.25rem', transition: { duration: 0.5 } }
}

export function Nav() {
  return (
    <LazyMotion features={domAnimation}>
      <m.nav css={navCss} variants={variants} initial="hidden" animate="enter" exit="exit">
        <NavBrand>
          <Logo />
        </NavBrand>

        <NavLinks>
          <NavLink href="/blog">
            <a title="Blog articles">Blog</a>
          </NavLink>

          <NavDivider />

          <NavLink href="/about">
            <a title="About me">About</a>
          </NavLink>
        </NavLinks>
      </m.nav>
    </LazyMotion>
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
