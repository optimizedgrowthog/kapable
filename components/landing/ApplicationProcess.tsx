'use client'

import { motion, useReducedMotion } from 'motion/react'
import { kapable } from '@/content/kapable'

// ─── Variants ─────────────────────────────────────────────────────────────────

const stepsContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
}

const stepVariant = {
  hidden:  { opacity: 0, x: -28 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ApplicationProcess() {
  const prefersReduced = useReducedMotion()
  const { applicationProcess } = kapable

  return (
    <section className="bg-cream py-20 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
            {applicationProcess.heading}
          </h2>
          <p className="text-ink/55 max-w-xl mx-auto font-sans">
            {applicationProcess.subheading}
          </p>
        </motion.div>

        {/* ── Two-column layout: steps left, illustration right ── */}
        <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-16 lg:items-center">

          {/* ── Steps ── */}
          <motion.ol
            variants={stepsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            className="relative space-y-0"
          >
            {/* Connector line */}
            <div
              className="absolute left-[19px] top-10 bottom-10 w-px"
              style={{ background: 'linear-gradient(180deg, #E89556 0%, rgba(232,149,86,0.12) 100%)' }}
              aria-hidden="true"
            />

            {applicationProcess.steps.map((step, i) => (
              <motion.li
                key={step.number}
                variants={stepVariant}
                className="relative flex gap-6 pb-10 last:pb-0"
              >
                {/* Number bubble */}
                <motion.div
                  whileHover={prefersReduced ? {} : { scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="shrink-0 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center z-10 shadow-[0_0_0_4px_#FAF6F0]"
                >
                  <span className="font-mono text-xs font-bold text-white">{step.number}</span>
                </motion.div>

                {/* Text */}
                <div className="pt-1.5 pb-2">
                  <h3 className="font-sans font-bold text-ink text-base mb-1.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-ink/55 text-sm font-sans leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          {/* ── Illustration ── */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="hidden lg:flex items-center justify-center"
          >
            <ProcessIllustration />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ─── CSS illustration ─────────────────────────────────────────────────────────

// Event dot colours for calendar cells
const EVENT_DOTS: Record<number, string> = {
  2:  '#60A5FA', // blue
  5:  '#34D399', // green
  9:  '#FBBF24', // yellow
  12: '#F87171', // red
  16: '#A78BFA', // purple
  19: '#60A5FA',
  22: '#34D399',
  25: '#FBBF24',
}

function ProcessIllustration() {
  const prefersReduced = useReducedMotion()
  return (
    <div className="relative w-full max-w-[340px] select-none" aria-hidden="true">

      {/* Screen glow — soft amber bloom behind the laptop */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20px -30px',
          background: 'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(232,149,86,0.22) 0%, transparent 70%)',
          filter: 'blur(18px)',
          zIndex: 0,
        }}
      />

      {/* Laptop body */}
      <div className="relative mx-auto w-[300px]" style={{ zIndex: 1 }}>

        {/* Screen */}
        <div className="relative bg-ink rounded-xl overflow-hidden"
          style={{ aspectRatio: '16/10', boxShadow: '0 24px 60px rgba(10,10,10,0.18), 0 4px 12px rgba(10,10,10,0.1)' }}
        >
          {/* Screen chrome bar */}
          <div className="h-6 bg-neutral-800 flex items-center px-3 gap-1.5">
            {['#FF5F57','#FFBD2E','#28C840'].map((c) => (
              <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
            ))}
          </div>

          {/* Screen content — mock calendar booking UI */}
          <div className="p-4 space-y-3">
            {/* URL bar with tiny profile avatar */}
            <div className="bg-neutral-800 rounded-md px-3 py-1.5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500/70" />
              <div className="h-1.5 rounded-full bg-neutral-600 flex-1" />
              {/* Tiny profile picture */}
              <div
                className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center text-white overflow-hidden"
                style={{ background: 'linear-gradient(135deg,#E89556,#B45309)', fontSize: 6, fontWeight: 700 }}
              >
                S
              </div>
            </div>

            {/* Calendar grid */}
            <div className="bg-neutral-900 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="h-2 rounded bg-amber-500/60 w-20" />
                <div className="flex gap-1">
                  <div className="w-4 h-4 rounded bg-neutral-700" />
                  <div className="w-4 h-4 rounded bg-neutral-700" />
                </div>
              </div>
              {/* Day grid with event dots */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 28 }, (_, i) => {
                  const isSelected = i === 10
                  const isHighlight = [3, 7, 14, 17, 21].includes(i)
                  const eventDot = EVENT_DOTS[i]
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded flex flex-col items-center justify-center gap-[2px]"
                      style={{
                        background: isSelected
                          ? '#E89556'
                          : isHighlight
                          ? 'rgba(232,149,86,0.15)'
                          : 'rgba(255,255,255,0.04)',
                      }}
                    >
                      <div className="w-1 h-1 rounded-full"
                        style={{ background: isSelected ? '#fff' : 'rgba(255,255,255,0.3)' }} />
                      {eventDot && !isSelected && (
                        <div className="w-[3px] h-[3px] rounded-full" style={{ background: eventDot }} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Time slots */}
            <div className="space-y-1.5">
              {['9:00 AM', '11:00 AM', '2:00 PM'].map((t, i) => (
                <div
                  key={t}
                  className="flex items-center gap-2 bg-neutral-900 rounded-md px-3 py-1.5"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: i === 1 ? '#E89556' : 'rgba(255,255,255,0.2)' }}
                  />
                  <div className="h-1.5 rounded-full flex-1"
                    style={{ background: i === 1 ? 'rgba(232,149,86,0.4)' : 'rgba(255,255,255,0.1)' }} />
                  <div className="text-[9px] font-mono text-white/40">{t}</div>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <div
              className="rounded-lg py-2 text-center text-[10px] font-bold font-sans text-white"
              style={{ background: 'linear-gradient(180deg,#EFA066 0%,#DB7F3A 100%)' }}
            >
              Confirm Session
            </div>
          </div>
        </div>

        {/* Laptop base */}
        <div className="relative mx-2 h-3 bg-neutral-200 rounded-b-xl"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
        <div className="mx-0 h-1.5 bg-neutral-300 rounded-b-xl" />
      </div>

      {/* Floating badge — "Session booked" */}
      <motion.div
        animate={prefersReduced ? {} : { y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-4 top-8 bg-white rounded-xl px-3 py-2 shadow-lg border border-amber-500/20 flex items-center gap-2"
        style={{ zIndex: 2 }}
      >
        <div className="w-6 h-6 rounded-full bg-amber-500/15 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#E89556" aria-hidden="true">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
        </div>
        <div>
          <div className="text-[10px] font-bold text-ink leading-none">Session Booked</div>
          <div className="text-[9px] text-ink/50 mt-0.5 font-sans">Tomorrow, 11:00 AM</div>
        </div>
      </motion.div>

      {/* Floating badge — "Confirmed" checkmark */}
      <motion.div
        animate={prefersReduced ? {} : { y: [0, -4, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute -right-2 bottom-20 bg-emerald-500 rounded-lg px-2.5 py-1.5 shadow-lg flex items-center gap-1.5"
        style={{ zIndex: 2 }}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
        </svg>
        <span className="text-[9px] font-bold text-white">Confirmed</span>
      </motion.div>

      {/* Floating badge — coach avatar */}
      <motion.div
        animate={prefersReduced ? {} : { y: [0, 4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute -left-6 bottom-12 bg-white rounded-xl px-3 py-2 shadow-lg border border-amber-500/20 flex items-center gap-2"
        style={{ zIndex: 2 }}
      >
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
          style={{ background: 'linear-gradient(135deg,#E89556,#B45309)' }}>
          K
        </div>
        <div>
          <div className="text-[10px] font-bold text-ink leading-none">Your Coach</div>
          <div className="text-[9px] text-ink/50 mt-0.5 font-sans">Kapable Expert</div>
        </div>
      </motion.div>

    </div>
  )
}

