import { parseISO, format } from 'date-fns'

import styles from './date.module.css'

interface Props {
  date: string
}

export default function Date({ date }: Props) {
  return (
    <time className={styles.date} dateTime={date}>
      {format(parseISO(date), 'LLLL d, yyyy')}
    </time>
  )
}
