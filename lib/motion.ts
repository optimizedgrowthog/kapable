'use client'

import type { Variants } from 'motion/react'

// ─── Easing curves ────────────────────────────────────────────────────────────

export const easeOutQuart  = [0.16, 1, 0.3, 1]  as const
export const easeOutQuint  = [0.22, 1, 0.36, 1] as const
export const easeInOutSoft = [0.45, 0, 0.55, 1] as const

// ─── Variant factories ────────────────────────────────────────────────────────

/** Fade + vertical rise. Default matches the most common usage across sections. */
export const fadeRise = (distance = 18, duration = 0.6): Variants => ({
  hidden:  { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: { duration, ease: easeOutQuart } },
})

/** Fade + horizontal slide. Positive = from right, negative = from left. */
export const slideX = (distance = 24, duration = 0.6): Variants => ({
  hidden:  { opacity: 0, x: distance },
  visible: { opacity: 1, x: 0, transition: { duration, ease: easeOutQuart } },
})

/** Fade + scale up from a smaller size (badges, icons, cards). */
export const scaleIn = (from = 0.93, duration = 0.5): Variants => ({
  hidden:  { opacity: 0, scale: from },
  visible: { opacity: 1, scale: 1, transition: { duration, ease: easeOutQuart } },
})

/** Stagger container — wrap child items to get sequential entrance. */
export const staggerContainer = (
  staggerChildren = 0.06,
  delayChildren   = 0.08,
): Variants => ({
  hidden:  {},
  visible: { transition: { staggerChildren, delayChildren } },
})

// ─── Reusable viewport config ─────────────────────────────────────────────────

/** Pass to `viewport` prop on whileInView elements to fire once at low threshold. */
export const viewportOnce = { once: true, amount: 0.05 } as const
