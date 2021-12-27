import { Transition, TransitionGroup, TransitionStatus } from 'react-transition-group'
import { CSSProperties } from 'react'

export type MotionVariants = {
  [S in TransitionStatus]+?: CSSProperties
}

export interface MotionConfig {
  timeout: MotionTimeout | number
  variants: MotionVariants
}

export interface MotionTimeout {
  appear?: number
  enter?: number
  exit?: number
}

export interface MotionInjectableProps {
  style: CSSProperties
  children: React.ReactNode
}

export interface MotionProps {
  location: string
  timeout: MotionTimeout | number
  variants: MotionVariants
  children: React.ReactNode
  container?: (props: MotionInjectableProps) => JSX.Element
}

export function Motion({ location, variants, timeout, children, container }: MotionProps) {
  return (
    <TransitionGroup component={null}>
      <Transition key={location} timeout={timeout}>
        {(status) => {
          const style = variants[status] ?? {}
          const props = { style, children }

          return container ? container(props) : <div {...props} />
        }}
      </Transition>
    </TransitionGroup>
  )
}

export default Motion
