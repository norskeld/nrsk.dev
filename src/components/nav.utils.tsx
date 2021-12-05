export function isExternalLink(href: unknown, external?: boolean) {
  return external && typeof href === 'string'
}
