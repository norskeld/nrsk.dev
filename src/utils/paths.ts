import { relative, isAbsolute } from 'path'

export function isActive(parent: string, sub: string): boolean {
  if (parent === sub) {
    return true
  }

  const solved = relative(parent, sub)

  if (solved.length) {
    const isSolvedUp = solved.startsWith('..')
    const isSolvedAbsolute = isAbsolute(solved)

    return !isSolvedUp && !isSolvedAbsolute
  }

  return false
}
