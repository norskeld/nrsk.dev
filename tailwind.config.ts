import type { Config, PluginAPI } from 'tailwindcss/types/config'
import defaultTheme from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'

export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,mdx,ts,tsx}'],
  plugins: [typography()],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono]
      },
      maxWidth: {
        '2.5xl': '45rem'
      },
      colors: {
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
        gray: {
          0: '#fcfcfc',
          50: '#f9fafb',
          100: '#e4e4e7',
          200: '#c7c7c8',
          250: '#b5b5b6',
          300: '#a3a3a4',
          400: '#919193',
          450: '#7a7a7b',
          500: '#69696b',
          600: '#58585a',
          700: '#474749',
          800: '#363638',
          850: '#252528',
          900: '#141417'
        },
        nord: {
          100: '#1c1c22',
          200: '#25252d'
        }
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
      transitionTimingFunction: {
        'cubic-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)'
      },
      typography: ({ theme }: PluginAPI) => ({
        DEFAULT: {
          css: {
            // Light theme.
            '--tw-prose-body': theme('colors.gray.800'),
            '--tw-prose-headings': theme('colors.gray.900'),
            '--tw-prose-lead': theme('colors.gray.600'),
            '--tw-prose-links': theme('colors.black'),
            '--tw-prose-bold': theme('colors.black'),
            '--tw-prose-counters': theme('colors.gray.500'),
            '--tw-prose-bullets': theme('colors.gray.300'),
            '--tw-prose-hr': theme('colors.gray.200'),
            '--tw-prose-quotes': theme('colors.gray.900'),
            '--tw-prose-quote-borders': theme('colors.gray.200'),
            '--tw-prose-captions': theme('colors.gray.500'),
            '--tw-prose-code': theme('colors.gray.900'),
            '--tw-prose-pre-code': theme('colors.gray.200'),
            '--tw-prose-pre-bg': theme('colors.gray.800'),
            '--tw-prose-th-borders': theme('colors.gray.300'),
            '--tw-prose-td-borders': theme('colors.gray.200'),

            // Dark theme.
            '--tw-prose-invert-body': theme('colors.gray.250'),
            '--tw-prose-invert-headings': theme('colors.white'),
            '--tw-prose-invert-lead': theme('colors.gray.400'),
            '--tw-prose-invert-links': theme('colors.white'),
            '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.gray.400'),
            '--tw-prose-invert-bullets': theme('colors.gray.600'),
            '--tw-prose-invert-hr': theme('colors.gray.700'),
            '--tw-prose-invert-quotes': theme('colors.gray.100'),
            '--tw-prose-invert-quote-borders': theme('colors.gray.700'),
            '--tw-prose-invert-captions': theme('colors.gray.400'),
            '--tw-prose-invert-code': theme('colors.white'),
            '--tw-prose-invert-pre-code': theme('colors.gray.300'),
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': theme('colors.gray.600'),
            '--tw-prose-invert-td-borders': theme('colors.gray.700'),

            // Fix line height.
            'lineHeight': '1.5',

            // Re-style blockquotes.
            'blockquote': {
              fontStyle: 'normal',
              fontWeight: theme('fontWeight.normal'),
              borderLeftWidth: theme('spacing.1'),

              'p:first-of-type::before': {
                content: `''`,
                marginTop: 0
              },

              'p:last-of-type::after': {
                content: `''`,
                marginBottom: 0
              }
            },

            // Re-style inline code blocks.
            'code': {
              '&::before, &::after': {
                content: `''`,
                display: 'none'
              }
            },

            // Re-style horizontal divider.
            'hr': {
              display: 'block',
              width: theme('width[1/6]'),
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.6'),
              borderTopWidth: theme('spacing[0.5]')
            },

            // Re-style links.
            'a': {
              display: 'inline',
              textDecorationLine: 'underline',
              lineHeight: theme('spacing.5'),
              fontWeight: theme('fontWeight.normal'),
              transitionProperty: 'color,text-decoration-color',
              transitionDuration: theme('transitionDuration.150'),
              transitionTimingFunction: theme('transitionTimingFunction.in-out'),

              '&:where(:hover, :focus-visible)': {
                color: theme('colors.crayola.500'),
                textDecorationColor: 'transparent'
              },

              '.dark &': {
                '&:where(:hover, :focus-visible)': {
                  color: theme('colors.crayola.300'),
                  textDecorationColor: 'transparent'
                }
              }
            },

            // Re-style headers.
            ':where(h1, h2, h3, h4, h5, h6)': {
              position: 'relative',
              fontWeight: theme('fontWeight.semibold'),

              '&:focus-visible': {
                outline: 'none'
              },

              [`@media (min-width: ${theme('screens.md')})`]: {
                '&:hover .heading-anchor': {
                  opacity: 1
                }
              }
            },

            // Re-style anchor links.
            '.heading-anchor': {
              opacity: 1,
              border: 'none',
              display: 'inline-block',
              position: 'absolute',
              left: `-${theme('spacing.6')}`,
              width: theme('width.6'),
              lineHeight: 'inherit',
              userSelect: 'none',
              textAlign: 'center',
              textDecorationLine: 'none',
              color: theme('colors.gray.400'),
              transitionProperty: 'color, opacity',
              transitionDuration: theme('transitionDuration.150'),
              transitionTimingFunction: theme('transitionTimingFunction.in-out'),

              '&:is(:hover, :focus)': {
                opacity: 1,
                color: theme('colors.gray.900')
              },

              '.dark &': {
                color: theme('colors.gray.500'),

                '&:is(:hover, :focus)': {
                  color: theme('colors.gray.50')
                }
              },

              [`@media (min-width: ${theme('screens.md')})`]: {
                '&': {
                  opacity: 0
                }
              }
            },

            // Re-style list elements.
            'li': {
              marginTop: theme('spacing.1'),
              marginBottom: theme('spacing.1')
            },

            // Re-style expressive code blocks.
            '.expressive-code': {
              position: 'relative',
              margin: `${theme('spacing.4')} -${theme('spacing.8')}`,

              [`@media (min-width: ${theme('screens.sm')})`]: {
                '&': {
                  margin: `${theme('spacing.6')} 0`
                }
              }
            }
          }
        }
      })
    }
  }
} satisfies Config
