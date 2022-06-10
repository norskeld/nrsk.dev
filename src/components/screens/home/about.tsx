import { css } from '@emotion/react'
import React from 'react'

const aboutCss = css`
  text-align: left;
`

export function AboutSection({ children }: React.ComponentPropsWithoutRef<'section'>) {
  return <section css={aboutCss}>{children}</section>
}
