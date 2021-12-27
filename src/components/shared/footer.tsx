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
    opacity: 1;
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

export default function Footer() {
  const NextJsLink = () => (
    <AppLink external blank href="https://nextjs.org/">
      Next.js
    </AppLink>
  )

  return (
    <footer css={footerCss}>
      <FooterItem>&copy; 2021</FooterItem>
      <FooterDot />

      <FooterItem>
        Built with <NextJsLink />
      </FooterItem>
    </footer>
  )
}

function FooterItem({ children }: FooterItemProps) {
  return <span css={itemCss}>{children}</span>
}

function FooterDot() {
  return <span css={dotCss}>&middot;</span>
}
