import type { APIRoute } from 'astro'

import { loadTags } from '@/api/content'
import { createOgImage } from '@/api/og'

interface Props {
  tag: string
}

export async function getStaticPaths() {
  const tags = await loadTags()

  return tags.map(({ tag }) => ({
    params: { tag },
    props: { tag }
  }))
}

export const GET: APIRoute<Props> = async ({ props }) => {
  const png = await createOgImage({
    title: `Articles tagged with #${props.tag}`
  })

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png'
    }
  })
}
