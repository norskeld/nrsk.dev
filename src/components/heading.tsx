import styles from './heading.module.css'

type Level = 1 | 2 | 3 | 4 | 5 | 6
type Size = 'xxl' | 'xl' | 'lg' | 'md'
type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface Props extends React.ComponentPropsWithoutRef<Headings> {
  level: Level
  size?: Size
}

export default function Heading({ level = 1, size = 'xl', children, ...rest }: Props) {
  const Tag = `h${level}`

  const baseStyle = styles.heading
  const sizeStyle = styles[size]

  const props = {
    className: `${baseStyle} ${sizeStyle}`,
    ...rest
  }

  return <Tag {...props}>{children}</Tag>
}
