'use client'

import { motion, useReducedMotion } from 'motion/react'

export function HairlineReveal() {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) return null
  return (
    <motion.div
      aria-hidden="true"
      className="hairline-reveal"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}
