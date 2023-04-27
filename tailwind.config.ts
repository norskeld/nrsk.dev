import type { Config, PluginAPI } from 'tailwindcss/types/config'
import { fontFamily } from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'

// const { fontFamily } = defaultTheme

/** Used (so far) weights: normal (400), semibold (600), bold (700). */
const fonts = {
  fontFamily: {
    sans: ['Inter', ...fontFamily.sans]
  }
}

/** Custom color palettes. */
const colors = {
  colors: {
    // Used as accent.
    crayola: {
      0: '#e5f1ff',
      100: '#b3d6ff',
      200: '#80baff',
      300: '#4d9fff',
      400: '#1a83ff',
      500: '#006ae6',
      600: '#0052b3',
      700: '#003b80',
      800: '#00234d',
      900: '#000c1a'
    },

    // Re-defining default gray colors.
    gray: {
      0: '#ffffff',
      50: '#f9fafb',
      100: '#f4f5f5',
      200: '#e2e3e4',
      250: '#bdbfc2',
      300: '#999c9f',
      400: '#888c90',
      450: '#7c7f83',
      500: '#686b6e',
      600: '#45474a',
      700: '#3d4042',
      800: '#252628',
      850: '#1c1c1c',
      900: '#141415'
    },

    // Nord.
    nord: {
      100: '#1a1b1e',
      200: '#25272d'
    }
  }
}

export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,mdx,ts,tsx}'],
  plugins: [typography()],
  theme: {
    extend: {
      ...fonts,
      ...colors,

      transitionTimingFunction: {
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)'
      },

      boxShadow: {
        neon: '0 25px 50px -12px #006ae620'
      },

      animation: {
        boing: 'boing 700ms ease-in-out 1'
      },

      keyframes: {
        boing: {
          '16.65%': { transform: 'scale(1.05)' },
          '49.95%': { transform: 'scale(0.95)' },
          '83.25%': { transform: 'scale(1.01)' },
          '100%': { transform: 'scale(1)' }
        }
      },

      typography: ({ theme }: PluginAPI) => ({
        vm: {
          css: {
            // Disable quotes on blockquotes.
            'blockquote p:first-of-type::before': { content: `''` },
            'blockquote p:last-of-type::after': { content: `''` },

            // Make <li> elements tighter.
            'li': {
              marginTop: '0.25em',
              marginBottom: '0.25em'
            },

            // Light theme.
            '--tw-prose-body': theme('colors.gray[800]'),
            '--tw-prose-headings': theme('colors.gray[900]'),
            '--tw-prose-lead': theme('colors.gray[600]'),
            '--tw-prose-links': theme('colors.gray[900]'),
            '--tw-prose-bold': theme('colors.gray[900]'),
            '--tw-prose-counters': theme('colors.gray[500]'),
            '--tw-prose-bullets': theme('colors.gray[300]'),
            '--tw-prose-hr': theme('colors.gray[200]'),
            '--tw-prose-quotes': theme('colors.gray[900]'),
            '--tw-prose-quote-borders': theme('colors.gray[200]'),
            '--tw-prose-captions': theme('colors.gray[500]'),
            '--tw-prose-code': theme('colors.gray[900]'),
            '--tw-prose-pre-code': theme('colors.gray[200]'),
            '--tw-prose-pre-bg': theme('colors.gray[800]'),
            '--tw-prose-th-borders': theme('colors.gray[300]'),
            '--tw-prose-td-borders': theme('colors.gray[200]'),

            // Dark theme.
            '--tw-prose-invert-body': theme('colors.gray[250]'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.gray[400]'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.gray[400]'),
            '--tw-prose-invert-bullets': theme('colors.gray[600]'),
            '--tw-prose-invert-hr': theme('colors.gray[700]'),
            '--tw-prose-invert-quotes': theme('colors.gray[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.gray[700]'),
            '--tw-prose-invert-captions': theme('colors.gray[400]'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.gray[300]'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.gray[600]'),
            '--tw-prose-invert-td-borders': theme('colors.gray[700]')
          }
        }
      })
    }
  }
} satisfies Config
