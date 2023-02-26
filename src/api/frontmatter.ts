export interface Tag {
  name: string
  url?: string
}

export function toTags(tags: Array<string>): Array<Tag> {
  return tags.map((tag) => ({ name: tag }))
}

export function toTagsWithURL(url: string, tags: Array<string>): Array<Tag> {
  return tags.map((tag) => ({ name: tag, url: url + tag }))
}

export function hasLinkableTags(tags: Array<Tag>): tags is Array<Required<Tag>> {
  return tags.some(Boolean)
}
