import type { APIRoute } from 'astro'

import { loadArticles, type ArticleEntry } from '@/api/content'
import { createOgImage } from '@/api/og'

interface Props {
  entry: ArticleEntry
}

export async function getStaticPaths() {
  const articles = await loadArticles()

  return articles.map((entry) => ({
    params: { entry: entry.slug },
    props: { entry }
  }))
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const { data } = props.entry

  const png = await createOgImage({
    title: data.title
  })

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png'
    }
  })
}
