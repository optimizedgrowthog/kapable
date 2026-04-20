'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  animate,
} from 'motion/react'
import { kapable } from '@/content/kapable'
import type { StatItem } from '@/content/kapable'

// ─── Variants ─────────────────────────────────────────────────────────────────

const gridContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
}

const cardVariant = {
  hidden:  { y: 32, scale: 0.96 },
  visible: {
    y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

// ─── Stat value parser ────────────────────────────────────────────────────────

function parseStatValue(value: string) {
  const suffix    = value.includes('+') ? '+' : ''
  const cleaned   = value.replace(/,/g, '').replace('+', '')
  const num       = parseFloat(cleaned)
  const isDecimal = cleaned.includes('.')
  return { num, suffix, isDecimal }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function JourneyAndImpact() {
  const prefersReduced = useReducedMotion()
  const { journeyAndImpact } = kapable

  return (
    <section className="bg-cream py-20 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <motion.h2
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl md:text-4xl font-bold text-ink text-center mb-12"
        >
          {journeyAndImpact.heading}
        </motion.h2>

        {/* ── Stats grid ── */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {journeyAndImpact.stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} prefersReduced={!!prefersReduced} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ stat, index, prefersReduced }: { stat: StatItem; index: number; prefersReduced: boolean }) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={prefersReduced ? {} : { y: -6, boxShadow: '0 18px 44px rgba(0,0,0,0.10)' }}
      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      className="group bg-white rounded-2xl py-10 px-4 shadow-sm text-center relative overflow-hidden"
    >
      {/* Amber accent top edge — brightens on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, transparent, #E89556 40%, #E89556 60%, transparent)' }}
      />

      {/* Animated number */}
      <AnimatedCounter stat={stat} index={index} prefersReduced={prefersReduced} />

      {/* Label */}
      <p className="text-ink/55 mt-2 text-sm font-sans">{stat.label}</p>
    </motion.div>
  )
}

// ─── Animated counter ─────────────────────────────────────────────────────────

function AnimatedCounter({
  stat,
  index,
  prefersReduced,
}: {
  stat: StatItem
  index: number
  prefersReduced: boolean
}) {
  const ref                              = useRef<HTMLDivElement>(null)
  const isInView                         = useInView(ref, { once: true, amount: 0.05 })
  const { num, suffix, isDecimal }       = parseStatValue(stat.value)
  const motionValue                      = useMotionValue(0)
  const [display, setDisplay]            = useState(isDecimal ? `0.00${suffix}` : `0${suffix}`)

  // Sync motion value → formatted display string
  useMotionValueEvent(motionValue, 'change', (v) => {
    if (isDecimal) setDisplay(v.toFixed(2) + suffix)
    else           setDisplay(Math.floor(v).toLocaleString() + suffix)
  })

  useEffect(() => {
    if (!isInView) return

    if (prefersReduced) {
      // Skip animation, jump straight to final value
      setDisplay(stat.value)
      return
    }

    const controls = animate(motionValue, num, {
      duration:  1.9,
      delay:     index * 0.07,   // slight stagger offset per card
      ease:      [0.16, 1, 0.3, 1] as [number, number, number, number],
    })
    return controls.stop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return (
    <div ref={ref}>
      <span className="font-display text-4xl md:text-5xl font-bold text-ink tabular-nums">
        {display}
      </span>
    </div>
  )
}
