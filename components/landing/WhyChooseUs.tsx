'use client'

import { motion, useReducedMotion } from 'motion/react'
import { kapable } from '@/content/kapable'
import type { WhyItem, IconKey } from '@/content/kapable'

// ─── Variants ─────────────────────────────────────────────────────────────────

const listContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}

const rowVariant = {
  hidden:  { y: 22 },
  visible: {
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhyChooseUs() {
  const prefersReduced = useReducedMotion()
  const { whyChooseUs } = kapable

  return (
    <section className="relative bg-ink py-20 px-5 sm:px-6 noise overflow-hidden hairline-top">
      <div className="absolute top-0 left-0 w-[520px] h-[380px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(232,149,86,0.07) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 right-0 w-[460px] h-[340px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(232,149,86,0.05) 0%, transparent 65%)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-16 lg:items-start">

          {/* ── Sticky heading ── */}
          <div className="lg:sticky lg:top-24 mb-10 lg:mb-0">
            <motion.div
              initial={{ x: -20 }}
              whileInView={{ x: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4">
                {whyChooseUs.heading}
              </h2>
              <p className="text-white/50 text-sm font-sans leading-relaxed">
                {whyChooseUs.subheading}
              </p>
              <div className="mt-6 h-px w-12 bg-amber-500/60" />
            </motion.div>
          </div>

          {/* ── Vertical card list ── */}
          <div className="space-y-3">
            {whyChooseUs.items.map((item, i) => (
              <WhyRow key={item.title} item={item} index={i} prefersReduced={!!prefersReduced} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Feature row card ─────────────────────────────────────────────────────────

function WhyRow({
  item,
  prefersReduced,
}: {
  item: WhyItem
  index: number
  prefersReduced: boolean
}) {
  return (
    <motion.div
      whileHover={prefersReduced ? {} : { x: 4 }}
      transition={{ type: 'spring', stiffness: 360, damping: 26 }}
      className="group flex items-center gap-5 rounded-2xl px-5 py-4 border border-white/6 hover:border-amber-500/25 transition-colors duration-300"
      style={{ background: 'rgba(232,149,86,0.04)' }}
    >
      {/* Text block */}
      <div className="flex-1 min-w-0">
        <h3 className="font-sans font-bold text-[15px] mb-2 leading-snug">{item.title}</h3>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-1.5 text-xs text-white/50 font-sans">
              <span className="text-amber-500 font-bold text-[10px]">✓</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {/* Icon circle */}
      <div className="shrink-0 w-12 h-12 rounded-full bg-cream/8 group-hover:bg-cream/12 transition-colors duration-300 flex items-center justify-center">
        <WhyIcon icon={item.icon} />
      </div>
    </motion.div>
  )
}

// ─── Per-feature icons ────────────────────────────────────────────────────────

function WhyIcon({ icon }: { icon: IconKey }) {
  const p = { width: 22, height: 22, viewBox: '0 0 24 24', fill: '#E89556', 'aria-hidden': true as const }

  switch (icon) {
    case 'live':
      return <svg {...p}><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
    case 'curriculum':
      return <svg {...p}><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>
    case 'cohort':
      return <svg {...p}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
    case 'feedback':
      return <svg {...p}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9l-1 2-1-2-2-1 2-1 1-2 1 2 2 1-2 1z"/></svg>
    case 'integrated':
      return <svg {...p}><path d="M3 3v8h8V3H3zm6 6H5V5h4v4zm-6 4v8h8v-8H3zm6 6H5v-4h4v4zm4-16v8h8V3h-8zm6 6h-4V5h4v4zm-6 4v8h8v-8h-8zm6 6h-4v-4h4v4z"/></svg>
    case 'flex':
      return <svg {...p}><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
    default:
      return <svg {...p}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
  }
}
