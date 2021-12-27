import { css } from '@emotion/react'

interface AboutSectionProps {
  children: React.ReactNode
}

const aboutCss = css`
  text-align: left;
`

export function AboutSection({ children }: AboutSectionProps) {
  return <section css={aboutCss}>{children}</section>
}
