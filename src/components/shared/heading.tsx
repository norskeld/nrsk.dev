import { css } from '@emotion/react'

type Level = 1 | 2 | 3 | 4 | 5 | 6
type Size = 'xxl' | 'xl' | 'lg' | 'md'
type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps extends React.ComponentPropsWithoutRef<Heading> {
  level: Level
  size?: Size
  className?: string
  children: React.ReactNode
}

const baseCss = css`
  margin: 1.5rem 0;
`

const components = {
  xxl: css`
    ${baseCss}
    font-size: 2.5rem;
    line-height: 1.2;
    font-weight: 800;
  `,

  xl: css`
    ${baseCss}
    font-size: 2rem;
    line-height: 1.3;
    font-weight: 700;
  `,

  lg: css`
    ${baseCss}
    font-size: 1.5rem;
    line-height: 1.4;
  `,

  md: css`
    ${baseCss}
    font-size: 1.2rem;
    line-height: 1.5;
  `
}

export default function Heading({ level, size, children, ...rest }: HeadingProps) {
  const headingLevel = level ?? 1
  const headingSize = size ?? 'xl'
  const headingCss = components[headingSize]

  const Component = `h${headingLevel}`

  const props = {
    ...rest,
    css: headingCss
  }

  return <Component {...props}>{children}</Component>
}
