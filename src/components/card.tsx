import Link from 'next/link'
import { format, parseISO } from 'date-fns'

import styles from './card.module.css'

interface Props {
  children: React.ReactNode
}

interface CardProps {
  href: string
  children: React.ReactNode
}

interface CardDateProps {
  date: string
}

export function Card({ href, children }: CardProps) {
  return (
    <Link href={href} passHref>
      <a className={styles.linkable}>
        <article className={styles.card}>{children}</article>
      </a>
    </Link>
  )
}

export function CardContainer({ children }: Props) {
  return <section className={styles.list}>{children}</section>
}

export function CardHeader({ children }: Props) {
  return <h2 className={styles.header}>{children}</h2>
}

export function CardExcerpt({ children }: Props) {
  return <p className={styles.excerpt}>{children}</p>
}

export function CardDate({ date }: CardDateProps) {
  return (
    <time className={styles.date} dateTime={date}>
      {format(parseISO(date), 'LLLL d, yyyy')}
    </time>
  )
}
