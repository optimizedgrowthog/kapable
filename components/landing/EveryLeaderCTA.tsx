'use client'

import { motion } from 'motion/react'
import { kapable } from '@/content/kapable'
import { useMagnetic } from '@/lib/hooks'
import { easeOutQuart, viewportOnce } from '@/lib/motion'

export default function EveryLeaderCTA() {
  const { everyLeaderCTA } = kapable
  const { ref: btnRef, style: magneticStyle, onMouseMove, onMouseLeave } = useMagnetic(0.28)

  return (
    <section className="relative bg-ink py-24 px-5 sm:px-6 noise overflow-hidden hairline-top">
      {/* Full-section amber glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(232,149,86,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto relative z-10 text-center">

        {/* ── Eyebrow ── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease: easeOutQuart }}
          className="font-sans text-amber-500 text-sm font-semibold tracking-widest uppercase mb-5"
        >
          Personalised for You
        </motion.p>

        {/* ── Headline ── */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOutQuart, delay: 0.05 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8"
        >
          {everyLeaderCTA.headingBefore}{' '}
          <span className="relative inline-block">
            {/* Strikethrough line */}
            <span className="relative z-10 text-amber-500">{everyLeaderCTA.emphasisWord}</span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
              className="absolute left-0 right-0 top-1/2 h-[3px] bg-amber-500/50 origin-left"
              style={{ transformOrigin: 'left' }}
              aria-hidden="true"
            />
          </span>{' '}
          {everyLeaderCTA.headingAfter}
        </motion.h2>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: easeOutQuart, delay: 0.15 }}
        >
          <motion.button
            ref={btnRef}
            style={magneticStyle}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="cta-btn text-base px-8 py-4"
          >
            {everyLeaderCTA.ctaText}
          </motion.button>
        </motion.div>

      </div>
    </section>
  )
}
