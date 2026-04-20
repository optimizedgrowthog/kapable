'use client'

import { motion, useReducedMotion } from 'motion/react'
import { kapable } from '@/content/kapable'

// ─── Variants ─────────────────────────────────────────────────────────────────

const gridContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const cardVariant = {
  hidden:  { y: 28, scale: 0.97 },
  visible: {
    y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function GoogleReviews() {
  const prefersReduced   = useReducedMotion()
  const { googleReviews } = kapable

  return (
    <section className="relative bg-ink py-20 px-5 sm:px-6 noise overflow-hidden hairline-top">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(232,149,86,0.07) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
        >
          <div className="flex items-center gap-3">
            {/* Google colour G */}
            <span className="font-sans font-bold text-2xl leading-none select-none">
              <span className="text-blue-400">G</span>
              <span className="text-red-400">o</span>
              <span className="text-amber-400">o</span>
              <span className="text-blue-400">g</span>
              <span className="text-green-400">l</span>
              <span className="text-red-400">e</span>
            </span>
            <span className="text-white/30 font-sans text-sm">Reviews</span>
          </div>

          {/* Aggregate rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#E89556" aria-hidden="true">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              ))}
            </div>
            <span className="font-sans font-bold text-white text-sm">4.9</span>
            <span className="text-white/35 text-sm font-sans">/ 5.0</span>
          </div>
        </motion.div>

        {/* ── Review cards ── */}
        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          className="grid md:grid-cols-3 gap-4"
        >
          {googleReviews.reviews.map((review) => (
            <motion.div
              key={review.name}
              variants={cardVariant}
              whileHover={prefersReduced ? {} : { y: -5, boxShadow: '0 20px 48px rgba(0,0,0,0.28)' }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="group bg-neutral-900 rounded-2xl p-6 border border-white/5 hover:border-amber-500/20 transition-colors duration-300 flex flex-col"
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ background: review.gradient }}
                  >
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-sans font-bold text-sm text-white leading-none">{review.name}</p>
                    <p className="font-sans text-white/40 text-[11px] mt-0.5">Verified Review</p>
                  </div>
                </div>

                {/* Google G mark */}
                <span className="font-sans font-bold text-base leading-none select-none opacity-40">
                  <span className="text-blue-400">G</span>
                </span>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#E89556" aria-hidden="true">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>

              {/* Review text */}
              <p className="text-white/55 text-sm font-sans leading-relaxed flex-1 line-clamp-6">
                {review.text}
              </p>

              {/* Amber rule on hover */}
              <div className="mt-5 h-px bg-white/5 group-hover:bg-amber-500/20 transition-colors duration-300" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
