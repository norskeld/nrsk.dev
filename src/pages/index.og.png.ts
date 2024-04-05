import type { APIRoute } from 'astro'

import { Common } from '@/config'

import { createOgImage } from '@/api/og'

export async function getStaticPaths() {
  return []
}

export const GET: APIRoute = async () => {
  const png = await createOgImage({
    title: Common.title
  })

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png'
    }
  })
}
