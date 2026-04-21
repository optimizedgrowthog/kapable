'use client'

import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { motion } from 'motion/react'
import { kapable } from '@/content/kapable'
import { cn } from '@/lib/utils'
import { easeOutQuart, viewportOnce } from '@/lib/motion'

// ─── Component ────────────────────────────────────────────────────────────────

export default function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([])
  const { faq } = kapable

  // Split items into two columns
  const col1 = faq.items.filter((_, i) => i % 2 === 0)
  const col2 = faq.items.filter((_, i) => i % 2 !== 0)

  return (
    <section className="relative bg-ink py-20 px-5 sm:px-6 noise overflow-hidden hairline-top">
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[380px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(232,149,86,0.06) 0%, transparent 65%)' }} />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: easeOutQuart }}
          className="font-display text-3xl md:text-4xl font-bold text-center mb-12"
        >
          {faq.heading}
        </motion.h2>

        {/* ── Two-column accordion grid ── */}
        <Accordion.Root
          type="multiple"
          value={openItems}
          onValueChange={setOpenItems}
        >
          <div className="md:grid md:grid-cols-2 md:gap-x-6">
            {[col1, col2].map((col, colIdx) => (
              <div key={colIdx} className="space-y-3">
                {col.map((item) => {
                  const isOpen = openItems.includes(item.question)
                  return (
                    <div key={item.question}>
                      <Accordion.Item
                        value={item.question}
                        className={cn(
                          'bg-neutral-900 rounded-xl border transition-colors duration-300 overflow-hidden',
                          isOpen ? 'border-amber-500/22' : 'border-white/5',
                        )}
                      >
                        <Accordion.Header asChild>
                          <div>
                            <Accordion.Trigger className="group w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none">
                              <span className="font-sans font-semibold text-sm leading-snug">
                                {item.question}
                              </span>

                              {/* Animated chevron */}
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

                        <Accordion.Content>
                          <div className="px-5 pb-4 pt-0.5">
                            <div className="h-px bg-amber-500/12 mb-3" />
                            <p className="text-white/55 text-sm font-sans leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </Accordion.Root>

      </div>
    </section>
  )
}
