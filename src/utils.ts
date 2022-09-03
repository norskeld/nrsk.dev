import { relative, isAbsolute } from 'path'

import { format, parseISO } from 'date-fns'
import timeToRead from 'reading-time'

export function formatDate(date: Date | string, template: string): string {
  return date instanceof Date
    ? format(date, template)
    : format(parseISO(date), template)
}

export function inflect([single, plural]: [single: string, plural: string], length: number) {
  return length === 1 ? single : plural
}

export function readingTime(text: string, wordsPerMinute = 200 ): string {
  const { minutes } = timeToRead(text, { wordsPerMinute })

  const minutesCeiled = Math.ceil(minutes)
  const minutesInflected = inflect(['minute', 'minutes'], minutesCeiled)

  return `${minutesCeiled} ${minutesInflected} to read`
}

/** Naively checks if `sub` is a subpath of `parent` path. */
export function isActive(parent: string, sub: string): boolean {
  const solved = relative(parent, sub)

  if (solved.length) {
    const isSolvedUp = solved.startsWith('..')
    const isSolvedAbsolute = isAbsolute(solved)

    return !isSolvedUp && !isSolvedAbsolute
  }

  return false
}
