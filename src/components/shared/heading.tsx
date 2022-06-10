import { css } from '@emotion/react'

type Level = 1 | 2 | 3 | 4 | 5 | 6
type Size = 'xxl' | 'xl' | 'lg' | 'md'
type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps extends React.ComponentPropsWithoutRef<Heading> {
  level: Level
  size?: Size
  className?: string
  shadow?: boolean
  shadowColor?: string
  disableSelection?: boolean
}

interface HeadingSpanProps extends React.ComponentPropsWithoutRef<'span'> {
  color: string
}

const baseCss = (disableSelection: boolean) => css`
  margin: 1.5rem 0;
  user-select: ${disableSelection ? 'none' : 'auto'};
  cursor: ${disableSelection ? 'default' : 'auto'};
`

const spanShadowCss = (color: string) => css`
  --g-color: ${color};

  padding-right: 0.5rem;
  background: linear-gradient(var(--g-color), var(--g-color)) bottom right/calc(100% - 1rem) 1rem;
  background-repeat: no-repeat;
`

const components = (size: Size, disableSelection: boolean) => {
  const variants = {
    xxl: css`
      ${baseCss(disableSelection)}
      font-size: 2.5rem;
      line-height: 1.2;
      font-weight: 800;
    `,

    xl: css`
      ${baseCss(disableSelection)}
      font-size: 2rem;
      line-height: 1.3;
      font-weight: 700;
    `,

    lg: css`
      ${baseCss(disableSelection)}
      font-size: 1.5rem;
      line-height: 1.4;
    `,

    md: css`
      ${baseCss(disableSelection)}
      font-size: 1.2rem;
      line-height: 1.5;
    `
  }

  return variants[size]
}

export default function Heading({
  level,
  size,
  shadow,
  shadowColor,
  children,
  disableSelection,
  ...rest
}: HeadingProps) {
  const headingLevel = level ?? 1
  const headingSize = size ?? 'xl'
  const headingShadow = shadow ?? false
  const headingShadowColor = shadowColor ?? 'rgba(var(--accent-base), 0.15)'
  const headingCss = components(headingSize, disableSelection ?? false)

  const Component = `h${headingLevel}`

  const props = {
    ...rest,
    css: headingCss
  }

  return (
    <Component {...props}>
      {headingShadow ? <HeadingSpan color={headingShadowColor}>{children}</HeadingSpan> : children}
    </Component>
  )
}

function HeadingSpan({ color, children }: HeadingSpanProps) {
  return <span css={spanShadowCss(color)}>{children}</span>
}
