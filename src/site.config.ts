import { createRequire } from 'module'

import type { Config } from 'tailwindcss'

interface ThemePair {
  themePair: {
    light: string
    dark: string
  }
}

/** Creating Node `require` manually to load Tailwind's config. */
const require = createRequire(import.meta.url)

/** Load Tailwind's config and type cast it to reflect the monkey-patched prop `themePair`. */
const config = require('../tailwind.config.cjs') as Config & ThemePair

export const Site = {
  url: 'https://vm.codes',
  canonical: 'https://vm.codes',

  localeSite: 'en-GB',
  localeOpenGraph: 'en_GB',

  themeDark: config.themePair.dark,
  themeLight: config.themePair.light,

  title: 'Vladislav M.',
  description:
    'A TypeScript devotee, Rust tyro, and front-end shepherd. Interested in functional programming, compilers and PL design.'
} as const
