'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'motion/react'
import { kapable } from '@/content/kapable'
import { cn } from '@/lib/utils'
import type { ProgramModule } from '@/content/kapable'

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChooseProgram() {
  const sectionRef     = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const { chooseProgram } = kapable

  // Drives the parallax inside the tall card image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [prefersReduced ? 0 : -18, prefersReduced ? 0 : 18])

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink py-20 px-5 sm:px-6 noise overflow-hidden hairline-top"
    >
      {/* Amber ambient glows */}
      <div className="absolute top-0 left-0 w-[560px] h-[380px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(232,149,86,0.09) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 right-0 w-[480px] h-[340px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(232,149,86,0.07) 0%, transparent 65%)' }} />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ y: 24 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            {chooseProgram.heading}
          </h2>
          <p className="text-white/55 max-w-2xl mx-auto font-sans">
            {chooseProgram.subheading}
          </p>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="grid md:grid-cols-3 gap-4">
          {chooseProgram.modules.map((module) => (
            <ModuleCard
              key={module.title}
              module={module}
              imageY={imageY}
              prefersReduced={!!prefersReduced}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

// ─── Module card ──────────────────────────────────────────────────────────────

interface ModuleCardProps {
  module: ProgramModule
  imageY: MotionValue<number>
  prefersReduced: boolean
}

function ModuleCard({ module, imageY, prefersReduced }: ModuleCardProps) {
  const isTall = module.layout === 'tall'
  const isWide = module.layout === 'wide'

  return (
    <motion.div
      whileHover={
        prefersReduced
          ? {}
          : { y: -5, borderColor: 'rgba(232,149,86,0.25)' }
      }
      transition={{ type: 'spring', stiffness: 360, damping: 26 }}
      style={{ borderColor: 'rgba(255,255,255,0.05)' }}
      className={cn(
        'group relative bg-neutral-900 rounded-2xl border overflow-hidden',
        isTall && 'md:row-span-2 flex flex-col p-6',
        isWide && 'md:col-span-2 p-6',
        !isTall && !isWide && 'p-6',
      )}
    >
      {/* Subtle inner glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(232,149,86,0.18)' }} />

      {/* Module icon + title + description */}
      <div className={cn(isTall ? 'mb-6' : isWide ? 'max-w-sm' : '')}>
        <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center mb-4 group-hover:bg-amber-500/25 transition-colors duration-300">
          <ModuleIcon title={module.title} />
        </div>
        <h4 className="font-bold text-base mb-2 font-sans leading-snug">{module.title}</h4>
        <p className="text-white/52 text-sm leading-relaxed font-sans">{module.description}</p>
      </div>

      {/* ── Tall card: gradient "photo" with parallax ── */}
      {isTall && module.accentGradient && (
        <div className="mt-auto aspect-[4/5] rounded-xl overflow-hidden relative">
          <motion.div
            className="absolute inset-0 scale-105"
            style={{ background: module.accentGradient, y: imageY }}
          >
            {/* Subtle radial highlight simulating a face/body light */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse 60% 45% at 50% 28%, rgba(255,255,255,0.12) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        </div>
      )}

      {/* ── Wide card: accent badge on desktop ── */}
      {isWide && module.accentGradient && (
        <div
          className="absolute right-5 top-1/2 -translate-y-1/2 w-24 h-24 rounded-xl hidden md:block transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
          style={{ background: module.accentGradient }}
        >
          <div
            className="absolute inset-0 rounded-xl"
            style={{
              background:
                'radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.22) 0%, transparent 65%)',
            }}
          />
        </div>
      )}
    </motion.div>
  )
}

// ─── Per-module icons ─────────────────────────────────────────────────────────

function ModuleIcon({ title }: { title: string }) {
  const p = { width: 16, height: 16, viewBox: '0 0 24 24', fill: '#E89556', 'aria-hidden': true as const }

  if (title.includes('Thinking'))
    return <svg {...p}><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>

  if (title.includes('Leadership') || title.includes('Team'))
    return <svg {...p}><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>

  if (title.includes('Influence') || title.includes('Charisma'))
    return <svg {...p}><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>

  if (title.includes('Presentation') || title.includes('Storytelling'))
    return <svg {...p}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>

  if (title.includes('Negotiation') || title.includes('Persuasion'))
    return <svg {...p}><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>

  // Communication & Public Speaking
  return <svg {...p}><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>
}
