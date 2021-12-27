import Motion, { MotionVariants } from '@/components/shared/motion'
import { NavContainer } from '@/components/shared/nav'

import { transitionWithOpacityTransform } from './common'

interface NavMotionProps {
  location: string
  children: React.ReactNode
}

const enterDuration = 300
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

export default function NavMotion({ location, children }: NavMotionProps) {
  return (
    <Motion
      location={location}
      variants={variants}
      timeout={{
        enter: enterDuration,
        exit: exitDuration
      }}
      container={(props) => <NavContainer {...props} />}
    >
      {children}
    </Motion>
  )
}
