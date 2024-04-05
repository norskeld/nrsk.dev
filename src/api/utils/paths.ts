import { relative, isAbsolute } from 'node:path'

export function stripSuffix(path: string, suffix: string): string {
  return path.endsWith(suffix) ? path.slice(0, -suffix.length) : path
}

export function isActive(parentSrc: string, subSrc: string): boolean {
  const parent = stripSuffix(parentSrc, '/')
  const sub = stripSuffix(subSrc, '/')

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
