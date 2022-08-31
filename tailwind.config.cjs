const { spacing, fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,mdx,ts,tsx}'],
  plugins: [require('@tailwindcss/typography')],
  darkMode: 'class',
  variants: {
    typography: ['dark']
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans]
      },
      colors: {
        crayola: '#0070f3',
        gray: {
          0: '#fff',
          100: '#fafafa',
          200: '#eaeaea',
          300: '#999999',
          400: '#888888',
          500: '#666666',
          600: '#444444',
          700: '#333333',
          800: '#222222',
          900: '#111111'
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'color': theme('colors.gray.700'),
            'a': {
              'color': theme('colors.blue.500'),
              '&:hover': {
                'color': theme('colors.blue.700')
              },
              'code': {
                'color': theme('colors.blue.400')
              }
            },
            'h2, h3, h4': {
              'scroll-margin-top': spacing[32]
            },
            'thead': {
              'border-bottom-color': theme('colors.gray.200')
            },
            'code': {
              'color': theme('colors.gray.800')
            },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false
          }
        },
        dark: {
          css: {
            'color': theme('colors.gray.200'),
            'a': {
              'color': theme('colors.blue.400'),
              '&:hover': {
                'color': theme('colors.blue.600')
              },
              'code': {
                'color': theme('colors.blue.400')
              }
            },
            'blockquote': {
              'border-left-color': theme('colors.gray.700'),
              'color': theme('colors.gray.300')
            },
            'h2, h3, h4': {
              'color': theme('colors.gray.100'),
              'scroll-margin-top': spacing[32]
            },
            'hr': {
              'border-color': theme('colors.gray.700')
            },
            'ol': {
              'li': {
                '&:before': {
                  'color': theme('colors.gray.500')
                }
              }
            },
            'ul': {
              'li': {
                '&:before': {
                  'background-color': theme('colors.gray.500')
                }
              }
            },
            'strong': {
              'color': theme('colors.gray.100')
            },
            'thead': {
              'th': {
                'color': theme('colors.gray.100')
              },
              'border-bottom-color': theme('colors.gray.600')
            },
            'tbody': {
              'tr': {
                'border-bottom-color': theme('colors.gray.700')
              }
            },
            'code': {
              'color': theme('colors.gray.200')
            },
          }
        }
      })
    }
  }
}
