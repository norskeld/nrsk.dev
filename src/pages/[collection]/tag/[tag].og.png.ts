import type { APIRoute } from 'astro'

import { Common } from '@/config'

import { getAllTags } from '@/api/content'
import { createOgImage } from '@/api/og'

interface Props {
  tag: string
}

export async function getStaticPaths() {
  return (await getAllTags()).map(({ tag, collection }) => ({
    params: { tag, collection },
    props: { tag }
  }))
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const png = await createOgImage({
    host: Common.host,
    title: `Articles tagged with #${props.tag}`
  })

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png'
    }
  })
}
