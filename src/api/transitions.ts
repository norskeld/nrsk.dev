/** Easing: in-out-back */
export const inOutBack = 'cubic-bezier(0.68, -0.6, 0.32, 1.6)'

interface SlideVerticallyOptions {
  duration?: string
  delay?: string
}

/** Transition: slide vertically. */
export function slideVertically(options: SlideVerticallyOptions = {}) {
  const { duration = '500ms', delay = '100ms' } = options

  return {
    forwards: {
      old: [
        {
          name: 'fadeOut',
          duration,
          easing: inOutBack,
          fillMode: 'both'
        },
        {
          name: 'slideToBottom',
          duration,
          easing: inOutBack,
          fillMode: 'both'
        }
      ],
      new: [
        {
          name: 'fadeIn',
          duration,
          easing: inOutBack,
          delay,
          fillMode: 'both'
        },
        {
          name: 'slideFromTop',
          duration,
          easing: inOutBack,
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
