import { css } from '@emotion/react'

interface WrapperProps {
  children: React.ReactNode
}

const wrapperCss = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1.5rem;

  @media screen and (min-width: 560px) {
    padding: 0 4rem;
  }

  @media screen and (min-width: 1024px) {
    padding: 0;
  }
`

export default function Wrapper({ children }: WrapperProps) {
  return <div css={wrapperCss}>{children}</div>
}
