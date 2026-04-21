'use client'

import { motion, useReducedMotion } from 'motion/react'
import { kapable } from '@/content/kapable'
import { staggerContainer, easeOutQuart, viewportOnce } from '@/lib/motion'
import type { ReactElement } from 'react'

// ─── Variants ─────────────────────────────────────────────────────────────────

const gridContainer = staggerContainer(0.1, 0.05)

const cardVariant = {
  hidden:  { opacity: 0, y: 32, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.62, ease: easeOutQuart } },
}

// Per-outcome icons (SVG paths)
const outcomeIcons: Record<number, ReactElement> = {
  0: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#E89556" aria-hidden="true">
      <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
    </svg>
  ),
  1: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#E89556" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
  2: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#E89556" aria-hidden="true">
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
    </svg>
  ),
  3: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#E89556" aria-hidden="true">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93C9.33 17.79 7 14.5 7 11V7.18L12 5z"/>
    </svg>
  ),
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProgramOutcomes() {
  const prefersReduced = useReducedMotion()
  const { programOutcomes } = kapable

  return (
    <section className="relative bg-ink py-20 px-5 sm:px-6 noise overflow-hidden hairline-top">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[360px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(232,149,86,0.08) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 left-0 w-[440px] h-[320px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(232,149,86,0.05) 0%, transparent 65%)' }} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: easeOutQuart }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            {programOutcomes.heading}
          </h2>
          <p className="text-white/50 max-w-xl mx-auto font-sans">
            {programOutcomes.subheading}
          </p>
        </motion.div>

        {/* ── Outcome cards ── */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid sm:grid-cols-2 gap-4"
        >
          {programOutcomes.outcomes.map((outcome, i) => (
            <motion.div
              key={outcome}
              variants={cardVariant}
              whileHover={prefersReduced ? {} : { y: -6, boxShadow: '0 20px 48px rgba(0,0,0,0.28)' }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="group relative bg-neutral-900 rounded-2xl p-7 border border-white/5 hover:border-amber-500/22 transition-colors duration-300 overflow-hidden"
            >
              {/* Amber left edge accent */}
              <div
                className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(180deg, transparent, #E89556 40%, #E89556 60%, transparent)' }}
              />

              {/* Corner number */}
              <span
                className="absolute top-5 right-6 font-mono text-5xl font-bold leading-none select-none pointer-events-none"
                style={{ color: 'rgba(232,149,86,0.07)' }}
              >
                0{i + 1}
              </span>

              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors duration-300 flex items-center justify-center mb-5">
                {outcomeIcons[i]}
              </div>

              {/* Outcome text */}
              <p className="font-display text-xl md:text-2xl font-bold leading-snug pr-8">
                {outcome}
              </p>

              {/* Amber rule — grows on hover */}
              <div className="mt-5 h-px bg-amber-500/15 group-hover:bg-amber-500/40 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
