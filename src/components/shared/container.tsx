import { motion } from 'framer-motion'

import styles from './container.module.css'

interface ContainerProps {
  children: React.ReactNode
}

const variants = {
  hidden: { opacity: 0, x: 0, y: -20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

const transition = {
  type: 'spring',
  damping: 20,
  stiffness: 100,
  duration: 0.25
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
