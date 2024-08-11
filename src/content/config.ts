import { articlesCollection, projectsCollection, type Collection } from '@/api/content'

export const collectionsMap: Record<Collection['key'], Collection> = {
  articles: {
    key: 'articles',
    name: 'Articles',
    series: false
  },
  projects: {
    key: 'projects',
    name: 'Projects',
    series: false
  },
  zeal: {
    key: 'zeal',
    name: 'Zeal Devlog',
    series: true
  }
}

export const collections = {
  articles: articlesCollection,
  projects: projectsCollection,
  zeal: articlesCollection
}
