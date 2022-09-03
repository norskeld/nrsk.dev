const { fontFamily } = require('tailwindcss/defaultTheme')

// Used (so far) weights: normal (400), semibold (600), bold (700).
const fonts = {
  fontFamily: {
    sans: ['Inter', ...fontFamily.sans]
  }
}

const colors = {
  colors: {
    // Accents.
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
      100: '#f4f5f5',
      200: '#e2e3e4',
      300: '#999c9f',
      400: '#888c90',
      500: '#686b6e',
      600: '#45474a',
      700: '#3d4042',
      800: '#252628',
      900: '#141415'
    }
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,mdx,ts,tsx}'
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp')
  ],
  theme: {
    extend: {
      ...fonts,
      ...colors,

      typography: ({ theme }) => ({
        astro: {
          css: {
            // Light theme.
            '--tw-prose-body': theme('colors.gray[700]'),
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
            '--tw-prose-invert-body': theme('colors.gray[200]'),
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
}
