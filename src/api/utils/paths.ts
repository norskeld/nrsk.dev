import { relative, isAbsolute } from 'node:path'

export function unslash(path: string): string {
  return path.endsWith('/') ? path.slice(0, -1) : path
}

export function ogImageUrl(canonical: string): { url: string; secureUrl: string } {
  const PAGE_EXT = '.html'
  const OG_EXT = '.og.png'

  let url = canonical + OG_EXT

  if (canonical.endsWith(PAGE_EXT)) {
    const idx = canonical.lastIndexOf(PAGE_EXT)
    const unsuffixed = canonical.slice(0, idx + 1)

    url = unsuffixed + OG_EXT
  }

  const secureUrl = new URL(url)

  // Ensure the protocol is secure.
  secureUrl.protocol = 'https:'

  return {
    url,
    secureUrl: secureUrl.toString()
  }
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
