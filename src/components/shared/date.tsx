import { parseISO, format } from 'date-fns'

import styles from './date.module.css'

interface DateProps {
  date: string
}

export default function Date({ date }: DateProps) {
  return (
    <time className={styles.date} dateTime={date}>
      {format(parseISO(date), 'LLLL d, yyyy')}
    </time>
  )
}
