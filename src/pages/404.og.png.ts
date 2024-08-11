import type { APIRoute } from 'astro'

import { Common } from '@/config'

import { createOgImage } from '@/api/og'

export async function getStaticPaths() {
  return []
}

export const GET: APIRoute = async () => {
  const png = await createOgImage({
    host: Common.host,
    title: 'Error: 404',
    titleColor: '#c45245'
  })

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png'
    }
  })
}
