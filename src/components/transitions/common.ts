interface Transition {
  prop: string
  duration: number
  easing: string
}

export function transitionWith(transitions: Array<Transition>) {
  return transitions
    .map(({ prop, duration, easing }) => `${prop} ${duration}ms ${easing}`)
    .join(', ')
}

export function transitionWithOpacityTransform(duration: number) {
  const easing = 'ease-in-out'

  return transitionWith([
    {
      easing,
      duration,
      prop: 'opacity'
    },
    {
      easing,
      duration,
      prop: 'transform'
    }
  ])
}
