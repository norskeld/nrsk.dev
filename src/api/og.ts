import { readFile } from 'node:fs/promises'

import satori, { type SatoriOptions } from 'satori'
import sharp from 'sharp'

import { stripSuffix } from './utils'

export interface OgOptions {
  host: string
  title: string
  titleColor?: string
}

export interface OgImageUrl {
  url: string
  secureUrl: string
}

export async function createOgImage({ host: url, title, titleColor }: OgOptions): Promise<Buffer> {
  const icon = await readFile('./public/icon-inverted.png')
  const interRegular = await readFile('./public/fonts/og/inter-regular.ttf')
  const interSemiBold = await readFile('./public/fonts/og/inter-semibold.ttf')

  const host = url.startsWith('http') ? new URL(url).host : url

  const options = {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Inter',
        style: 'normal',
        weight: 400,
        data: interRegular
      },
      {
        name: 'Inter',
        style: 'normal',
        weight: 600,
        data: interSemiBold
      }
    ]
  } satisfies SatoriOptions

  const markup = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#141415',
        fontFamily: 'Inter'
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: 96,
              position: 'absolute',
              left: 64,
              top: 64
            },
            children: [
              // Icon.
              {
                type: 'img',
                props: {
                  width: 96,
                  height: 96,
                  src: icon.buffer
                }
              },

              // Domain name + Page title.
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16
                  },
                  children: [
                    // Domain name.
                    {
                      type: 'div',
                      props: {
                        style: {
                          color: '#f9fafb',
                          opacity: 0.5,
                          fontSize: 48
                        },
                        children: host
                      }
                    },

                    // Page title.
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          flexWrap: 'wrap',
                          width: 'auto',
                          maxWidth: 750,
                          fontSize: 48,
                          fontWeight: 600,
                          lineHeight: 1.25,
                          color: titleColor ?? '#f9fafb'
                        },
                        children: title
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      ]
    }
  }

  const svg = await satori(markup, options)
  const png = await sharp(Buffer.from(svg)).png().toBuffer()

  return png
}

export function ogImageUrl(canonical: string): OgImageUrl {
  const url = stripSuffix(canonical, '.html') + '.og.png'
  const secureUrl = new URL(url)

  // Ensure the protocol is secure.
  secureUrl.protocol = 'https:'

  return {
    url,
    secureUrl: secureUrl.toString()
  }
}
