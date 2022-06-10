import { css } from '@emotion/react'

const aboutCss = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 50vh;

  @media screen and (min-width: 640px) {
    flex-direction: row;
  }
`

const descriptionCss = css`
  width: 100%;
  padding: 2rem 0;

  & p {
    margin: 1.25em 0;
    font-size: 1.15rem;
  }

  & p:first-of-type {
    margin: 0 0 1.25rem;
  }

  @media screen and (min-width: 640px) {
    width: 50%;
    padding: 0 2rem;
  }
`

export function AboutSection({ children }: React.ComponentPropsWithoutRef<'section'>) {
  return <section css={aboutCss}>{children}</section>
}

export function AboutDescription({ children }: React.ComponentPropsWithoutRef<'section'>) {
  return <section css={descriptionCss}>{children}</section>
}
