import type { APIRoute } from 'astro'

import { createOgImage } from '@/api/og'

export async function getStaticPaths() {
  return []
}

export const GET: APIRoute = async () => {
  const png = await createOgImage({
    title: 'Error: 404',
    titleColor: '#c45245'
  })

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png'
    }
  })
}
