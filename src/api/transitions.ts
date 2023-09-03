/** Easing: in-out-back */
const easing = 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'

/** Transition: slide vertically. */
export function slideVertically(options: { duration?: string } = {}) {
  const { duration = '500ms' } = options

  return {
    forwards: {
      old: [
        {
          name: 'fadeOut',
          duration,
          easing,
          fillMode: 'both'
        },
        {
          name: 'slideToBottom',
          duration,
          easing,
          fillMode: 'both'
        }
      ],
      new: [
        {
          name: 'fadeIn',
          duration,
          easing,
          delay: '200ms',
          fillMode: 'both'
        },
        {
          name: 'slideFromTop',
          duration,
          easing,
          fillMode: 'both'
        }
      ]
    },
    backwards: {
      old: [{ name: 'fadeOut' }, { name: 'slideToTop' }],
      new: [{ name: 'fadeIn' }, { name: 'slideFromBottom' }]
    }
  }
}
