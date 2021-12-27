import { css } from '@emotion/react'

interface ContainerProps {
  style?: React.CSSProperties
  children: React.ReactNode
}

const containerCss = css`
  max-width: var(--container-w);
  width: 100%;
  padding: 4rem 0;

  @media screen and (min-width: 560px) {
    padding: 6rem 0;
  }
`

export default function Container({ style, children }: ContainerProps) {
  return (
    <main css={containerCss} style={style}>
      {children}
    </main>
  )
}
