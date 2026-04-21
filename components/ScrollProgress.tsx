'use client'

import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react'

export default function ScrollProgress() {
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.3 })

  if (prefersReduced) return null

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 inset-x-0 h-[2px] origin-left z-50 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-700"
    />
  )
}
