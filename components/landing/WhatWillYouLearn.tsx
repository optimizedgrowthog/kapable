'use client'

import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { motion, useReducedMotion } from 'motion/react'
import { kapable } from '@/content/kapable'
import { cn } from '@/lib/utils'
import type { IconKey } from '@/content/kapable'


// ─── Component ────────────────────────────────────────────────────────────────

export default function WhatWillYouLearn() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const prefersReduced = useReducedMotion()
  const { whatWillYouLearn } = kapable
  const { items } = whatWillYouLearn

  // Row-mate dimming: for a 2-column grid, index i is in the same row as
  // index (i % 2 === 0 ? i+1 : i-1). Dim the row-mate when the cell is open.
  const getDimmed = (index: number): boolean => {
    const siblingIndex = index % 2 === 0 ? index + 1 : index - 1
    if (siblingIndex < 0 || siblingIndex >= items.length) return false
    return openItems.includes(items[siblingIndex].title)
  }

  return (
    <section className="relative bg-ink py-20 px-5 sm:px-6 noise overflow-hidden hairline-top">
      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[360px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(232,149,86,0.08) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 left-0 w-[440px] h-[320px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, rgba(232,149,86,0.06) 0%, transparent 65%)' }} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            {whatWillYouLearn.heading}
          </h2>
          <p className="text-white/55 max-w-2xl mx-auto font-sans">
            {whatWillYouLearn.subheading}
          </p>
        </motion.div>

        {/* ── Accordion grid ── */}
        <Accordion.Root
          type="multiple"
          value={openItems}
          onValueChange={setOpenItems}
        >
          <div className="grid md:grid-cols-2 gap-3">
            {items.map((item, i) => {
              const isOpen   = openItems.includes(item.title)
              const isDimmed = !isOpen && getDimmed(i)

              return (
                /* Layer 1 — scroll-triggered stagger */
                <motion.div key={item.title}>
                  {/* Layer 2 — row-mate dimming (independent of stagger) */}
                  <motion.div
                    animate={{
                      opacity: isDimmed && !prefersReduced ? 0.52 : 1,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <Accordion.Item
                      value={item.title}
                      className={cn(
                        'bg-neutral-900 rounded-xl border transition-colors duration-300 overflow-hidden',
                        isOpen ? 'border-amber-500/22' : 'border-white/5',
                      )}
                    >
                      {/* Trigger */}
                      <Accordion.Header asChild>
                        <div>
                          <Accordion.Trigger className="group w-full flex items-center gap-3 px-5 py-4 text-left focus-visible:outline-none">
                            {/* Icon */}
                            <div
                              className={cn(
                                'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-300',
                                isOpen
                                  ? 'bg-amber-500/30'
                                  : 'bg-amber-500/12 group-hover:bg-amber-500/22',
                              )}
                            >
                              <LearnIcon icon={item.icon} active={isOpen} />
                            </div>

                            {/* Title */}
                            <span className="font-semibold text-sm flex-1 font-sans leading-snug">
                              {item.title}
                            </span>

                            {/* Animated chevron — distinct from the icon */}
                            <motion.svg
                              width="15" height="15"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                              className={cn(
                                'shrink-0 transition-colors duration-200',
                                isOpen ? 'text-amber-500' : 'text-white/35',
                              )}
                              aria-hidden="true"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </motion.svg>
                          </Accordion.Trigger>
                        </div>
                      </Accordion.Header>

                      {/* Content */}
                      <Accordion.Content>
                        <div className="px-5 pb-4 pt-0.5">
                          {/* Amber divider */}
                          <div className="h-px bg-amber-500/15 mb-3" />
                          <ul className="space-y-2.5">
                            {item.bullets.map((bullet) => (
                              <li key={bullet} className="flex gap-2.5 text-sm text-white/58 font-sans leading-relaxed">
                                <span className="text-amber-500 shrink-0 mt-0.5 font-bold">✓</span>
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Accordion.Content>
                    </Accordion.Item>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </Accordion.Root>

      </div>
    </section>
  )
}

// ─── Per-category icons ───────────────────────────────────────────────────────

function LearnIcon({ icon, active }: { icon: IconKey; active: boolean }) {
  const fill = active ? '#E89556' : '#DB7F3A'
  const p = { width: 15, height: 15, viewBox: '0 0 24 24', fill, 'aria-hidden': true as const }

  switch (icon) {
    case 'mic':
      return <svg {...p}><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>
    case 'star':
      return <svg {...p}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
    case 'person':
      return <svg {...p}><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
    case 'slides':
      return <svg {...p}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
    case 'story':
      return <svg {...p}><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 14H8v-2h8v2zm0-4H8v-2h8v2zm0-4H8V6h8v2z"/></svg>
    case 'network':
      return <svg {...p}><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
    case 'brain':
      return <svg {...p}><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
    case 'heart':
      return <svg {...p}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    case 'shield':
      return <svg {...p}><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93C9.33 17.79 7 14.5 7 11V7.18L12 5z"/></svg>
    case 'handshake':
      return <svg {...p}><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
    case 'lens':
      return <svg {...p}><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
    case 'peace':
      return <svg {...p}><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
    default:
      return <svg {...p}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
  }
}
