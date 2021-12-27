import { m, domAnimation, LazyMotion, Variants } from 'framer-motion'
import { css } from '@emotion/react'

import AppLink from './link'

interface FooterItemProps {
  children: React.ReactNode
}

const footerCss = css`
  margin-top: auto;
  padding-bottom: 4rem;
  opacity: 0.5;
  transition: opacity 150ms ease-in-out;
  user-select: none;

  &:hover {
    opacity: 1 !important;
  }
`

const dotCss = css`
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--contrast-800);
  padding: 0 0.5rem;
`

const itemCss = css`
  font-size: 1rem;
  color: var(--contrast-600);
`

const variants: Variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 0.5, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
}

export default function Footer() {
  const NextJsLink = () => (
    <AppLink external blank href="https://nextjs.org/">
      Next.js
    </AppLink>
  )

  return (
    <LazyMotion features={domAnimation}>
      <m.footer css={footerCss} variants={variants} initial="hidden" animate="enter" exit="exit">
        <FooterItem>&copy; 2021</FooterItem>
        <FooterDot />

        <FooterItem>
          Built with <NextJsLink />
        </FooterItem>
      </m.footer>
    </LazyMotion>
  )
}

function FooterItem({ children }: FooterItemProps) {
  return <span css={itemCss}>{children}</span>
}

function FooterDot() {
  return <span css={dotCss}>&middot;</span>
}
