import { m, domAnimation, LazyMotion, Transition, Variants } from 'framer-motion'
import { css } from '@emotion/react'

interface ContainerProps {
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

const variants: Variants = {
  hidden: { opacity: 0, y: '-0.75rem' },
  enter: { opacity: 1, y: '0rem', transition: { duration: 0.5 } },
  exit: { opacity: 0, y: '1.25rem', transition: { duration: 0.3 } }
}

export default function Container({ children }: ContainerProps) {
  return (
    <LazyMotion features={domAnimation}>
      <m.main css={containerCss} variants={variants} initial="hidden" animate="enter" exit="exit">
        {children}
      </m.main>
    </LazyMotion>
  )
}
