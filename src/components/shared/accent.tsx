import { css } from '@emotion/react'

interface AccentProps {
  color?: string
  children: React.ReactNode
}

const AccentCss = css`
  color: var(--accent);
`

export default function Accent({ children }: AccentProps) {
  return <span css={AccentCss}>{children}</span>
}
