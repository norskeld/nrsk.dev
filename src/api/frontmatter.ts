export interface Tag {
  name: string
  url?: string
}

export function toTagsWithURL(url: string, tags: Array<string>): Array<Tag> {
  return tags.map((tag) => ({ name: tag, url: url + tag }))
}
