import cx from 'classnames'

import styles from './heading.module.css'

type Level = 1 | 2 | 3 | 4 | 5 | 6
type Size = 'xxl' | 'xl' | 'lg' | 'md'
type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps extends React.ComponentPropsWithoutRef<Headings> {
  level: Level
  size?: Size
}

export default function Heading({ level = 1, size = 'xl', children, ...rest }: HeadingProps) {
  const Tag = `h${level}`

  const baseStyle = styles.heading
  const sizeStyle = styles[size]

  const props = {
    ...rest,
    className: cx(baseStyle, sizeStyle)
  }

  return <Tag {...props}>{children}</Tag>
}
