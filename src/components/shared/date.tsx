import { parseISO, format } from 'date-fns'
import { css } from '@emotion/react'

interface DateProps {
  date: string
}

const dateCss = css`
  display: block;
  color: var(--contrast-400);
  font-size: 1.15rem;
`

export default function Date({ date }: DateProps) {
  return (
    <time css={dateCss} dateTime={date}>
      {format(parseISO(date), 'LLLL d, yyyy')}
    </time>
  )
}
