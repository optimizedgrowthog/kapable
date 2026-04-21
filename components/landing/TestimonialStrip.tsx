'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { kapable } from '@/content/kapable'
import { cn } from '@/lib/utils'
import type { Testimonial } from '@/content/kapable'

// ─── Section header variants ──────────────────────────────────────────────────

const headerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const headerItem = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TestimonialStrip() {
  const [activeId, setActiveId] = useState<string>(kapable.testimonials.items[0].id)
  const prefersReduced = useReducedMotion()
  const { testimonials } = kapable
  const stripRef = useRef<HTMLDivElement>(null)

  // Touch: tap outside strip to collapse to first card
  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      if (stripRef.current && !stripRef.current.contains(e.target as Node)) {
        setActiveId(testimonials.items[0].id)
      }
    }
    document.addEventListener('touchstart', handler, { passive: true })
    return () => document.removeEventListener('touchstart', handler)
  }, [testimonials.items])

  return (
    <section className="bg-cream pb-20 px-5 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="text-center mb-10"
        >
          <motion.p variants={headerItem} className="italic text-ink/60 text-lg font-display">
            {testimonials.eyebrow}
          </motion.p>
          <motion.h2 variants={headerItem} className="font-display text-4xl md:text-5xl font-bold text-ink mt-2 mb-4">
            {testimonials.heading}
          </motion.h2>
          <motion.p variants={headerItem} className="text-ink/60 max-w-2xl mx-auto text-base font-sans">
            {testimonials.subheading}
          </motion.p>
        </motion.div>

        {/* ── The strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Mobile: horizontally scrollable */}
          <div
            ref={stripRef}
            className="flex gap-1.5 overflow-x-auto no-scrollbar md:overflow-visible rounded-xl"
            style={{ height: 460 }}
          >
            {testimonials.items.map((t) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                isActive={activeId === t.id}
                onExpand={() => setActiveId(t.id)}
                prefersReduced={!!prefersReduced}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface CardProps {
  testimonial: Testimonial
  isActive: boolean
  onExpand: () => void
  prefersReduced: boolean
}

// Map each testimonial id → a consistent pravatar img number
const HEADSHOTS: Record<string, number> = {
  marwa:   47,
  roland:  15,
  srikari: 44,
  nikhita: 48,
  jijesh:  52,
  nehya:   26,
  pramod:   7,
  ritika:  55,
  prateek:  3,
  gladys:  16,
  nirupam: 68,
}

function TestimonialCard({ testimonial, isActive, onExpand, prefersReduced }: CardProps) {
  const [hovered, setHovered] = useState(false)
  const imgNum = HEADSHOTS[testimonial.id]

  const springTransition = prefersReduced
    ? { duration: 0.01 }
    : { type: 'spring' as const, stiffness: 210, damping: 25 }

  // On desktop: hover expands. On touch: click expands.
  const handleMouseEnter = () => {
    setHovered(true)
    // matchMedia: if device supports hover (i.e. mouse), expand on hover
    if (window.matchMedia('(hover: hover)').matches) onExpand()
  }

  return (
    <motion.div
      // FLIP-based animation: when flex-grow changes, Framer Motion
      // smoothly animates the card's size using spring physics.
      layout
      transition={{ layout: springTransition }}
      className={cn(
        'relative overflow-hidden cursor-pointer rounded-xl shrink-0',
      )}
      style={{
        flexGrow: isActive ? 4 : 1,
        flexShrink: 1,
        flexBasis: 0,
        // On mobile, enforce a min-width so inactive cards stay legible
        minWidth: isActive ? 220 : 44,
        background: testimonial.gradient,
      }}
      onClick={onExpand}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      aria-label={`${testimonial.name}, ${testimonial.role}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onExpand() }
      }}
    >
      {/* Headshot photo layer */}
      {imgNum && (
        <Image
          src={`https://i.pravatar.cc/300?img=${imgNum}`}
          alt=""
          aria-hidden="true"
          fill
          sizes="300px"
          className="object-cover object-top"
          style={{ mixBlendMode: 'luminosity', opacity: 0.55 }}
        />
      )}

      {/* Gradient overlay — depth layer */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 35%, rgba(0,0,0,0.78) 100%)',
        }}
      />

      {/* ── Shimmer sweep on inactive hover ── */}
      <AnimatePresence>
        {!isActive && hovered && !prefersReduced && (
          <motion.div
            key="shimmer"
            className="shimmer-sweep z-20"
            initial={{ top: '-60%' }}
            animate={{ top: '180%' }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 1.3, ease: 'easeInOut', repeat: Infinity }}
            style={{ position: 'absolute', insetInline: 0, height: '55%' }}
          />
        )}
      </AnimatePresence>

      {/* ── Inactive: vertical name label ── */}
      <AnimatePresence>
        {!isActive && (
          <motion.div
            key="label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.25, delay: 0.08 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          >
            <span
              className={cn(
                'v-label text-sm font-semibold font-sans transition-opacity duration-200',
                hovered ? 'text-white opacity-100' : 'text-white opacity-80',
              )}
            >
              {testimonial.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Active: photo + content ──
           Fades in with a 150ms delay so it appears AFTER the width
           expansion has had a moment to settle. ── */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.18 } }}
            transition={{
              duration: 0.38,
              delay: prefersReduced ? 0 : 0.15,  // 150ms offset after width springs open
            }}
            className="absolute inset-0 flex flex-col justify-end z-30"
          >
            {/* Top vignette — lifts photo brightness in portrait zone */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, transparent 50%, rgba(0,0,0,0.55) 100%)',
              }}
            />

            {/* Text content — pinned to bottom */}
            <div className="relative p-5">
              <span className="inline-block bg-white/90 text-ink text-xs font-bold px-2.5 py-1 rounded-md mb-2.5 font-sans">
                {testimonial.role}
              </span>
              <h4 className="text-white font-bold text-lg leading-snug mb-2 font-sans">
                {testimonial.name}
              </h4>
              <p className="text-white/82 text-sm leading-relaxed font-sans line-clamp-4">
                {testimonial.story}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
