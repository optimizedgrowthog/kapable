'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { kapable } from '@/content/kapable'
import { useCountdown } from '@/lib/hooks'

export default function StickyBar() {
  const [visible, setVisible]           = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)
  const prefersReduced = useReducedMotion()
  const { h, m, s, isUrgent } = useCountdown(kapable.stickyBar.countdownSeconds)
  const bar = kapable.stickyBar

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setVisible(total > 0 && scrolled / total > 0.2)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const io = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 },
    )
    io.observe(footer)
    return () => io.disconnect()
  }, [])

  const slideVariants = prefersReduced
    ? { hidden: {}, visible: {}, exit: {} }
    : {
        hidden:  { y: '100%', opacity: 0 },
        visible: { y: 0,      opacity: 1 },
        exit:    { y: '100%', opacity: 0 },
      }

  const breatheAnimate = prefersReduced ? undefined : { scale: [1, 1.016, 1] as number[] }
  const breatheTransition = prefersReduced
    ? undefined
    : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' as const }

  return (
    <AnimatePresence>
      {visible && !footerVisible && (
        <motion.div
          key="sticky-bar"
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: 'spring', damping: 32, stiffness: 280 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-cream border-t border-ink/10 shadow-[0_-4px_24px_rgba(0,0,0,0.1)]"
          role="region"
          aria-label="Program offer"
        >
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">

            {/* Meta info */}
            <div className="flex items-center gap-x-4 gap-y-1 flex-wrap">
              <span className="text-xs font-bold text-ink">{bar.cohortLabel}</span>
              {bar.features.map((f) => (
                <span key={f} className="flex items-center gap-2">
                  <span className="text-ink/25 hidden sm:inline text-xs">|</span>
                  <span className="text-xs text-ink/70">{f}</span>
                </span>
              ))}
            </div>

            {/* CTA + price + countdown */}
            <div className="flex items-center gap-3">

              {/* Breathing CTA */}
              <motion.button
                className="cta-btn text-sm py-2.5 px-5"
                aria-label={bar.ctaText}
                animate={breatheAnimate}
                transition={breatheTransition}
              >
                {bar.ctaText}
              </motion.button>

              {/* Price + countdown — desktop only */}
              <div className="hidden md:flex flex-col items-end gap-0.5">
                <p className="text-xs leading-none">
                  <span className="text-ink/40 line-through mr-1">{bar.originalPrice}</span>
                  <span className="text-ink font-bold">{bar.currentPrice}</span>
                </p>
                <p
                  className={`text-[10px] font-mono font-bold tabular-nums transition-colors duration-300 ${
                    isUrgent ? 'text-red-500 animate-pulse' : 'text-ink/50'
                  }`}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {h}:{m}:{s}
                </p>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
