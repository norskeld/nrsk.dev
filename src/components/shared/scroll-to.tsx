import { css } from '@emotion/react'

interface ScrollToProps extends ScrollToOptions {
  children: React.ReactNode
}

const linkCss = css`
  padding-bottom: 0.05rem;
  border-bottom: 2px solid rgba(var(--accent-base), 0.125);
  color: rgba(var(--accent-base), 0.9);
`

export default function ScrollTo({ children, ...scrollOptions }: ScrollToProps) {
  return (
    <a css={linkCss} onClick={() => window.scrollTo(scrollOptions)}>
      {children}
    </a>
  )
}
