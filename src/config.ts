import type { Props as AstroSeo } from 'astro-seo'

import { merge } from '@/api/utils'

type Optional<T> = {
  [P in keyof T]?: Optional<T[P]> | undefined
}

export const Common = {
  host: 'https://vm.codes',

  localeSite: 'en-US',
  localeOpenGraph: 'en_US',

  title: 'Vladislav Mamon',
  description:
    `A TypeScript and Rust aficionado doing front-end for a living. ` +
    `Interested in functional programming, compilers and PL design.`,

  themeDark: '#141415',
  themeLight: '#f9fafb',

  themeSyntax: 'nord'
} as const

export const Seo: AstroSeo = {
  title: `${Common.title}`,
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
