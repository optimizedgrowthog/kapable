'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'motion/react'
import { kapable } from '@/content/kapable'
import VideoPlayer from '@/components/VideoPlayer'
import { useCountdown, useMagnetic } from '@/lib/hooks'

// ─── Animation variants ───────────────────────────────────────────────────────

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.06 },
  },
}

const item = {
  hidden:   { opacity: 0, y: 26 },
  visible:  {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
}

// ─── Avatar data ──────────────────────────────────────────────────────────────

const AVATARS = [
  { init: 'A', grad: 'linear-gradient(135deg,#F59E6B,#E06A35)' },
  { init: 'R', grad: 'linear-gradient(135deg,#6BA3F5,#3578E0)' },
  { init: 'S', grad: 'linear-gradient(135deg,#9B6BF5,#6A35E0)' },
  { init: 'N', grad: 'linear-gradient(135deg,#F56BA3,#E03578)' },
  { init: 'P', grad: 'linear-gradient(135deg,#6BF5A3,#35E078)' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function Hero() {
  const sectionRef     = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const { hero }       = kapable
  const { offer, socialProof } = hero

  // Video card parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const videoY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -48])

  // Magnetic CTA
  const { ref: ctaRef, style: magneticStyle, onMouseMove, onMouseLeave } = useMagnetic(0.26)

  // Countdown
  const cd = useCountdown(offer.countdownSeconds)

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink overflow-hidden"
      style={{
        backgroundImage: [
          'radial-gradient(ellipse 70% 50% at 12% 18%, rgba(232,149,86,0.10) 0%, transparent 100%)',
          'radial-gradient(ellipse 60% 45% at 88% 82%, rgba(232,149,86,0.07) 0%, transparent 100%)',
        ].join(', '),
      }}
    >
      {/* Subtle 1-px grid lines (purely decorative) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-16 pb-28 text-center relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >

          {/* ── Eyebrow ── */}
          <motion.p
            variants={item}
            className="text-[11px] tracking-[0.28em] text-white/50 uppercase mb-5 font-sans"
          >
            {hero.eyebrow}
          </motion.p>

          {/* ── H1 ── */}
          <motion.h1
            variants={item}
            className="font-display text-5xl md:text-6xl lg:text-[4.75rem] leading-[1.06] tracking-tight mb-5"
          >
            {hero.headlineParts.map((part, i) =>
              part.break ? (
                <br key={i} />
              ) : part.italic ? (
                <em key={i} className="italic not-italic font-light text-white/85 font-display">
                  {part.text}
                </em>
              ) : (
                <span key={i} className="font-bold text-white">
                  {part.text}
                </span>
              )
            )}
          </motion.h1>

          {/* ── Subline ── */}
          <motion.p
            variants={item}
            className="text-lg md:text-xl text-white/70 font-sans mb-9"
          >
            {hero.subline}
          </motion.p>

          {/* ── Social proof ── */}
          <motion.div variants={item} className="flex flex-col items-center gap-3 mb-11">
            <div className="flex -space-x-3" aria-hidden="true">
              {AVATARS.map(({ init, grad }) => (
                <div
                  key={init}
                  className="w-10 h-10 rounded-full ring-2 ring-ink flex items-center justify-center text-white font-bold text-sm shrink-0 select-none"
                  style={{ background: grad }}
                >
                  {init}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/70 max-w-md leading-relaxed font-sans">
              <strong className="text-white font-bold">{socialProof.learnersCount}</strong>{' '}
              Professionals Trained with{' '}
              <strong className="text-white font-bold">{socialProof.cohortsCount}</strong>{' '}
              Cohorts Graduated,{' '}
              <strong className="text-white font-bold">{socialProof.npsScore}</strong>{' '}
              NPS Score, and{' '}
              <span className="text-amber-500" aria-hidden="true">★★★★★</span>{' '}
              <strong className="text-white font-bold">{socialProof.rating}</strong>{' '}
              {socialProof.ratingLabel}
            </p>
          </motion.div>

          {/* ── Video card with parallax ── */}
          <motion.div
            variants={item}
            style={{ y: videoY }}
            className="w-full max-w-3xl mx-auto mb-10"
          >
            <VideoPlayer videoId={hero.videoId} />
          </motion.div>

          {/* ── Offer stack ── */}
          <motion.div variants={item} className="flex flex-col items-center gap-2.5 mb-8">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-white/40 line-through text-lg font-sans">
                {offer.originalPrice}
              </span>
              <span className="font-display font-bold text-4xl text-white">
                {offer.currentPrice}
              </span>
              <span className="bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded">
                {offer.discountLabel}
              </span>
            </div>

            {/* Countdown */}
            <p className="text-sm text-white/60 font-sans flex items-center gap-1.5 flex-wrap justify-center">
              Offer ends in
              <span
                className={`inline-flex items-center gap-1 transition-colors duration-500 ${
                  cd.isUrgent ? 'text-red-400' : 'text-white'
                }`}
                aria-live="polite"
                aria-atomic="true"
                aria-label={`${cd.h} hours ${cd.m} minutes ${cd.s} seconds remaining`}
              >
                <span className="cd-pill">{cd.h}</span>
                <span className="opacity-50">:</span>
                <span className="cd-pill">{cd.m}</span>
                <span className="opacity-50">:</span>
                <span className="cd-pill">{cd.s}</span>
              </span>
            </p>
          </motion.div>

          {/* ── Magnetic CTA ── */}
          <motion.div variants={item} className="relative">
            <motion.button
              ref={ctaRef}
              className="cta-btn text-base px-8 py-4"
              style={magneticStyle}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              whileTap={prefersReduced ? {} : { scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
            >
              {hero.ctaText}
            </motion.button>

            {/* Amber glow behind button */}
            {!prefersReduced && (
              <div
                className="absolute inset-0 -z-10 blur-xl opacity-30 rounded-xl pointer-events-none"
                style={{ background: 'linear-gradient(180deg,#EFA066,#DB7F3A)' }}
              />
            )}
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
