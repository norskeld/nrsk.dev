import { relative, isAbsolute } from 'path'

export function unslash(path: string): string {
  return path.endsWith('/') ? path.slice(0, -1) : path
}

export function isActive(parentSrc: string, subSrc: string): boolean {
  const parent = unslash(parentSrc)
  const sub = unslash(subSrc)

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
