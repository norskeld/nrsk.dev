import { format, parseISO, toDate } from 'date-fns'

export function formatDate(date: Date | string | number, template: string): string {
  if (date instanceof Date) {
    return format(date, template)
  } else if (typeof date === 'string') {
    return format(parseISO(date), template)
  } else if (typeof date === 'number') {
    return format(toDate(date), template)
  }

  return format(new Date(date), template)
}

export function intoTimestamp(date: Date | string): number {
  return (date instanceof Date ? date : new Date(date)).valueOf()
}
