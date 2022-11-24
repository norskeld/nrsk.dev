import { format, parseISO } from 'date-fns'

export function formatDate(date: Date | string, template: string): string {
  return date instanceof Date ? format(date, template) : format(parseISO(date), template)
}
