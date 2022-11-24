import { createRequire } from 'node:module'

import type { Props as AstroSeo } from 'astro-seo'
import type { Config } from 'tailwindcss'

import { merge } from '@/api/utils'

type Optional<T> = {
  [P in keyof T]?: Optional<T[P]> | undefined
}

interface ThemePair {
  themePair: {
    light: string
    dark: string
  }
}

// Creating Node `require` manually to load Tailwind's config.
const require = createRequire(import.meta.url)

// Load Tailwind's config and type cast it to reflect the monkey-patched prop `themePair`.
const config = require('../tailwind.config.cjs') as Config & ThemePair

export const Common = {
  host: 'https://vm.codes',

  localeSite: 'en-US',
  localeOpenGraph: 'en_US',

  title: 'Vladislav M.',
  description:
    `A TypeScript devotee, Rust tyro, and front-end shepherd. ` +
    `Interested in functional programming, compilers and PL design.`,

  themeDark: config.themePair.dark,
  themeLight: config.themePair.light,

  themeSyntax: 'norskeld'
} as const

export const Seo: AstroSeo = {
  title: `A TypeScript devotee, Rust tyro, and front-end shepherd — ${Common.title}`,
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
  return merge(Seo, options)
}
