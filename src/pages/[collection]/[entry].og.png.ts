import type { APIRoute } from 'astro'

import { Common } from '@/config'

import { getAllArticles, type ArticleEntry } from '@/api/content'
import { createOgImage } from '@/api/og'

interface Props {
  entry: ArticleEntry
}

export async function getStaticPaths() {
  const articles = await getAllArticles()

  return articles.map((entry) => ({
    params: {
      collection: entry.collection,
      entry: entry.slug
    },
    props: { entry }
  }))
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const { data } = props.entry

  const png = await createOgImage({
    host: Common.host,
    title: data.title
  })

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png'
    }
  })
}
