import timeToRead from 'reading-time'

import { inflect } from './inflect'

export function readingTime(text: string, wordsPerMinute = 200): string {
  const { minutes } = timeToRead(text, { wordsPerMinute })

  const minutesCeiled = Math.ceil(minutes)
  const minutesInflected = inflect(['minute', 'minutes'], minutesCeiled)

  return `${minutesCeiled} ${minutesInflected} to read`
}
