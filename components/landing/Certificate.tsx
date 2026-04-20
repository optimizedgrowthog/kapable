'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate, useSpring, useTransform, useReducedMotion } from 'motion/react'
import { kapable } from '@/content/kapable'

// ─── Variants ─────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Certificate() {
  const prefersReduced = useReducedMotion()
  const { certificate } = kapable

  return (
    <section className="bg-cream py-20 px-5 sm:px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* ── Two-column layout ── */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* ── Left: copy ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="mb-12 lg:mb-0"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display text-3xl md:text-4xl font-bold text-ink mb-6 leading-tight capitalize"
            >
              {certificate.heading}
            </motion.h2>

            <motion.ul variants={fadeUp} className="space-y-4 mb-8">
              {certificate.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-ink/65 font-sans text-sm leading-relaxed">
                  <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-amber-500/15 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#E89556" aria-hidden="true">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </span>
                  {bullet}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp}>
              <button className="cta-btn text-sm">
                Earn Your Certificate →
              </button>
            </motion.div>
          </motion.div>

          {/* ── Right: 3D tilting certificate ── */}
          <motion.div
            initial={{ opacity: 0, x: 32, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <CertificateMockup prefersReduced={!!prefersReduced} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

// ─── Certificate mockup with 3D tilt ─────────────────────────────────────────

function CertificateMockup({ prefersReduced }: { prefersReduced: boolean }) {
  const { certificate } = kapable
  const ref = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springConfig = { stiffness: 160, damping: 22, mass: 0.6 }
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), springConfig)
  const glareX  = useSpring(useTransform(rawX, [-0.5, 0.5], [0, 100]), springConfig)
  const glareY  = useSpring(useTransform(rawY, [-0.5, 0.5], [0, 100]), springConfig)
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, transparent 60%)`

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <div
      ref={ref}
      className="w-full max-w-[420px] cursor-default"
      style={{ perspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={prefersReduced ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative rounded-2xl overflow-hidden"
        /* Paper shadow */
        whileHover={prefersReduced ? {} : { boxShadow: '0 32px 80px rgba(10,10,10,0.18), 0 8px 24px rgba(10,10,10,0.1)' }}
        transition={{ duration: 0.3 }}
      >
        {/* ── Certificate body ── */}
        <div
          className="relative rounded-2xl p-8"
          style={{
            background: 'linear-gradient(160deg, #FFFDF9 0%, #FFF8EE 50%, #FDF4E7 100%)',
            boxShadow: '0 20px 60px rgba(10,10,10,0.12), 0 4px 16px rgba(10,10,10,0.06)',
          }}
        >
          {/* Paper grain overlay */}
          <div
            className="absolute inset-0 rounded-2xl opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'url(/noise.svg)', backgroundSize: '180px 180px' }}
          />

          {/* Diagonal "KAPABLE" watermark */}
          <svg
            className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none"
            style={{ opacity: 0.045 }}
            aria-hidden="true"
          >
            <defs>
              <pattern id="wm" x="0" y="0" width="120" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
                <text x="10" y="24" fontSize="10" fontFamily="Georgia, serif" fontWeight="bold" fill="#8B4513" letterSpacing="4">KAPABLE</text>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wm)" rx="16"/>
          </svg>

          {/* Border frame */}
          <div
            className="absolute inset-3 rounded-xl pointer-events-none"
            style={{ border: '1.5px solid rgba(219,127,58,0.22)' }}
          />
          <div
            className="absolute inset-4 rounded-xl pointer-events-none"
            style={{ border: '0.5px solid rgba(219,127,58,0.1)' }}
          />

          {/* Corner ornaments */}
          {['top-3 left-3', 'top-3 right-3 rotate-90', 'bottom-3 right-3 rotate-180', 'bottom-3 left-3 -rotate-90'].map((pos) => (
            <div key={pos} className={`absolute ${pos} w-5 h-5 pointer-events-none`}>
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M2 2 L8 2 L8 4 L4 4 L4 8 L2 8 Z" fill="rgba(219,127,58,0.35)" />
              </svg>
            </div>
          ))}

          {/* Logo mark */}
          <div className="flex justify-center mb-5">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold font-display"
              style={{ background: 'linear-gradient(135deg,#E89556,#B45309)', boxShadow: '0 4px 16px rgba(219,127,58,0.4)' }}
            >
              K
            </div>
          </div>

          {/* Eyebrow */}
          <p className="text-center font-sans text-[10px] tracking-[0.18em] uppercase text-amber-600 mb-2">
            Certificate of Completion
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-amber-500/20" />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(219,127,58,0.5)" aria-hidden="true">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <div className="flex-1 h-px bg-amber-500/20" />
          </div>

          {/* This is to certify */}
          <p className="text-center text-ink/45 font-sans text-xs mb-1 italic">This is to certify that</p>

          {/* Name */}
          <h3 className="font-display text-2xl font-bold text-ink text-center mb-3 leading-tight">
            {certificate.sampleName}
          </h3>

          {/* Completion text */}
          <p className="text-center text-ink/55 text-[11px] font-sans leading-relaxed px-4 mb-5">
            {certificate.completionText}
          </p>

          {/* Program name badge */}
          <div
            className="mx-auto w-fit px-4 py-1.5 rounded-full mb-6 text-[11px] font-bold font-sans tracking-wide text-amber-700"
            style={{ background: 'rgba(232,149,86,0.12)', border: '1px solid rgba(232,149,86,0.25)' }}
          >
            {certificate.programName}
          </div>

          {/* Footer: dual signatures + seal */}
          <div className="pt-4" style={{ borderTop: '1px solid rgba(219,127,58,0.15)' }}>
            <div className="flex items-end justify-between gap-3">

              {/* Signature 1 */}
              <div className="text-left flex-1">
                <div className="font-display italic text-base text-ink/55 leading-none mb-1.5" style={{ fontVariant: 'small-caps' }}>Arjun Kapoor</div>
                <div className="h-px bg-ink/18 mb-1" />
                <div className="text-[8px] font-sans text-ink/40 tracking-wide uppercase">Program Director</div>
                <div className="text-[8px] font-sans text-ink/30 tracking-wide">Kapable Academy</div>
              </div>

              {/* Gold foil seal */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: 'radial-gradient(circle at 32% 32%, #FDE68A 0%, #F59E0B 38%, #B45309 100%)',
                  boxShadow: '0 6px 20px rgba(219,127,58,0.55), inset 0 1px 3px rgba(255,255,255,0.35), inset 0 -1px 2px rgba(0,0,0,0.15)',
                }}
              >
                <svg width="50" height="50" viewBox="0 0 50 50" aria-hidden="true">
                  {Array.from({ length: 20 }, (_, i) => {
                    const angle = (i * 360) / 20
                    const rad = (angle * Math.PI) / 180
                    const x1 = 25 + 19 * Math.cos(rad); const y1 = 25 + 19 * Math.sin(rad)
                    const x2 = 25 + 23 * Math.cos(rad); const y2 = 25 + 23 * Math.sin(rad)
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
                  })}
                  <circle cx="25" cy="25" r="14" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8"/>
                  <circle cx="25" cy="25" r="10" fill="rgba(255,255,255,0.12)"/>
                  <text x="25" y="22" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="white" fontFamily="serif" letterSpacing="0.5">KAPABLE</text>
                  <text x="25" y="30" textAnchor="middle" fontSize="8" fill="white" fontFamily="serif">✦</text>
                </svg>
              </div>

              {/* Signature 2 */}
              <div className="text-right flex-1">
                <div className="font-display italic text-base text-ink/55 leading-none mb-1.5" style={{ fontVariant: 'small-caps' }}>Sejal Mehta</div>
                <div className="h-px bg-ink/18 mb-1" />
                <div className="text-[8px] font-sans text-ink/40 tracking-wide uppercase">Chief Coach</div>
                <div className="text-[8px] font-sans text-ink/30 tracking-wide">Kapable Academy</div>
              </div>
            </div>

            {/* Accreditation */}
            <p className="text-center text-[8px] font-sans text-ink/35 tracking-widest uppercase mt-3">
              Accredited by the International Leadership Coaching Association · ILCA-2024
            </p>
          </div>
        </div>

        {/* ── Glare overlay (mouse-tracked) ── */}
        {!prefersReduced && (
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  )
}
