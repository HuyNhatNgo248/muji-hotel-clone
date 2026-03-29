'use client'

import { motion, HTMLMotionProps } from 'motion/react'

import type { Variants } from 'motion/react'

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

interface FadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
}

const FadeIn: React.FC<FadeInProps> = ({ children, ...props }) => {
  return (
    <motion.div initial="hidden" whileInView="visible" variants={fadeInVariants} {...props}>
      {children}
    </motion.div>
  )
}

export default FadeIn
