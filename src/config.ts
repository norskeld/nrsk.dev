import type { Webmanifest } from 'astro-webmanifest'
import type { SEOProps } from 'astro-seo'

import { merge } from './api/utils'

type Optional<T> = {
  [P in keyof T]?: Optional<T[P]> | undefined
}

export const Common = {
  host: 'https://nrsk.dev',
  email: 'vlad@nrsk.dev',
  localeSite: 'en-US',
  localeOpenGraph: 'en_US',
  author: 'Vladislav Mamon',
  title: 'Vladislav Mamon',
  description:
    `Software engineer building polished products and web experiences using modern tech stack. ` +
    `Interested in Rust, functional programming, compilers and programming languages design.`
} as const

export const Theme = {
  themeLight: '#f9fafb',
  themeDark: '#141415',
  themeSyntax: 'nord',
  classDark: 'dark',
  classLight: 'light',
  classHidden: 'hidden',
  localStorageKey: 'color-scheme'
} as const

export const Manifest: Webmanifest = {
  name: Common.title,
  description: Common.description,
  start_url: Common.host,
  short_name: new URL(Common.host).host,
  dir: 'ltr',
  lang: Common.localeSite,
  display: 'standalone',
  orientation: 'portrait-primary',
  theme_color: Theme.themeDark,
  background_color: Theme.themeDark,
  icons: [
    {
      src: 'icon-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: 'icon-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
}

export const Seo: SEOProps = {
  title: Common.title,
  description: Common.description,
  openGraph: {
    basic: {
      type: 'website',
      title: Common.title,
      image: `${Common.host}/index.og.png`,
      url: Common.host
    },
    optional: {
      description: Common.description,
      locale: Common.localeOpenGraph
    },
    image: {
      alt: Common.title,
      url: `${Common.host}/index.og.png`,
      secureUrl: `${Common.host}/index.og.png`,
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

export function withSeoOptions(options: Optional<SEOProps> = {}): SEOProps {
  return merge(structuredClone(Seo), options)
}
