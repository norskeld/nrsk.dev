import { motion, Transition, Variants } from 'framer-motion'

import styles from './container.module.css'

interface ContainerProps {
  children: React.ReactNode
}

const variants: Variants = {
  hidden: { opacity: 0, x: 0, y: -20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

const transition: Transition = {
  type: 'linear'
}

export default function Container({ children }: ContainerProps) {
  return (
    <motion.main
      className={styles.container}
      variants={variants}
      transition={transition}
      initial="hidden"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.main>
  )
}
