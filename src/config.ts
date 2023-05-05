import type { Props as AstroSeo } from 'astro-seo'

import { merge } from '@/api/utils'

type Optional<T> = {
  [P in keyof T]?: Optional<T[P]> | undefined
}

export const Common = {
  host: 'https://1saifj.me',

  localeSite: 'en-US',
  localeOpenGraph: 'en_US',

  title: 'Saif Aljanahi - Software Developer',
  description:
    `A Golang developer, love to work on front-end projects too.` +
    `Passionate about embedded systems and databases.`,

  themeDark: '#141415',
  themeLight: '#f9fafb',

  themeSyntax: 'norskeld'
} as const

export const Seo: AstroSeo = {
  title: `A Golang developer, love to work on front-end projects too. — ${Common.title}`,
  description: Common.description,
  openGraph: {
    basic: {
      type: 'website',
      title: Common.title,
      image: `${Common.host}/images/og-image.png`,
      url: Common.host
    },
    optional: {
      description: Common.description,
      locale: Common.localeOpenGraph
    },
    image: {
      alt: 'Logotype with letters V and M combined',
      url: `${Common.host}/images/og-image.png`,
      secureUrl: `${Common.host}/images/og-image.png`,
      type: 'image/png',
      width: 1200,
      height: 630
    }
  },
  twitter: {
    card: 'summary_large_image',
    site: '@norskeld',
    creator: '@norskeld'
  }
}

export function withSeoOptions(options: Optional<AstroSeo> = {}): AstroSeo {
  return merge({ ...Seo }, options)
}
