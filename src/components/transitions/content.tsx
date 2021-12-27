import Motion, { MotionVariants } from '@/components/shared/motion'
import Container from '@/components/shared/container'

import { transitionWithOpacityTransform } from './common'

interface ContentMotionProps {
  location: string
  children: React.ReactNode
}

const enterDuration = 350
const exitDuration = 250

const variants: MotionVariants = {
  entering: {
    opacity: 0,
    position: `absolute`,
    transform: `translateY(-0.85rem)`,
    transition: transitionWithOpacityTransform(enterDuration)
  },
  entered: {
    opacity: 1,
    transform: `translateY(0px)`,
    transition: transitionWithOpacityTransform(enterDuration)
  },
  exiting: {
    opacity: 0,
    transform: `translateY(1.25rem)`,
    transition: transitionWithOpacityTransform(exitDuration)
  }
}

export default function ContentMotion({ location, children }: ContentMotionProps) {
  return (
    <Motion
      location={location}
      variants={variants}
      timeout={{
        enter: enterDuration,
        exit: exitDuration
      }}
      container={(props) => <Container {...props} />}
    >
      {children}
    </Motion>
  )
}
