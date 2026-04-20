'use client'

import { motion, useReducedMotion } from 'motion/react'
import { kapable } from '@/content/kapable'
import { cn } from '@/lib/utils'
import type { AlumniInstitution } from '@/content/kapable'

// ─── Variants ─────────────────────────────────────────────────────────────────

const gridContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
}

const logoVariant = {
  hidden:  { opacity: 0, y: 18, scale: 0.9 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] as const },
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DesignedByAlumni() {
  const prefersReduced = useReducedMotion()
  const { designedByAlumni } = kapable
  const marqueeItems = [...designedByAlumni.institutions, ...designedByAlumni.institutions]

  return (
    <section className="bg-cream py-16 px-5 sm:px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">

        {/* ── Heading ── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl md:text-3xl font-bold text-ink mb-12"
        >
          {designedByAlumni.heading}
        </motion.h2>

        {/* ── Mobile: infinite marquee ── */}
        <div className="md:hidden" aria-hidden="true">
          <div className="relative">
            <div className="pointer-events-none absolute left-0 inset-y-0 w-14 z-10"
              style={{ background: 'linear-gradient(90deg, #FAF6F0 0%, transparent 100%)' }} />
            <div className="pointer-events-none absolute right-0 inset-y-0 w-14 z-10"
              style={{ background: 'linear-gradient(270deg, #FAF6F0 0%, transparent 100%)' }} />

            <div className={prefersReduced ? 'flex flex-wrap gap-8 justify-center py-4' : 'overflow-hidden py-4'}>
              <div
                className={prefersReduced ? 'contents' : 'marquee-track'}
                style={prefersReduced ? {} : { animationDuration: '36s' }}
              >
                {marqueeItems.map((inst, i) => (
                  <div key={i} className="mx-6 flex items-center justify-center">
                    <InstitutionLogo institution={inst} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Desktop: staggered grid ── */}
        <motion.div
          className="hidden md:grid grid-cols-6 gap-x-8 gap-y-10 items-center"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {designedByAlumni.institutions.map((inst, i) => (
            <motion.div
              key={i}
              variants={logoVariant}
              whileHover={prefersReduced ? {} : { scale: 1.1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 380, damping: 24 }}
              className="flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity duration-200 cursor-default"
            >
              <InstitutionLogo institution={inst} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

// ─── Institution logo renderer ────────────────────────────────────────────────

function InstitutionLogo({ institution }: { institution: AlumniInstitution }) {
  const { name, subtext, colorClass, style } = institution

  // ── Harvard: crimson shield ──
  if (name === 'HARVARD') return (
    <span className="flex flex-col items-center gap-1 select-none">
      <svg width="22" height="26" viewBox="0 0 22 26" fill="none" aria-hidden="true">
        <path d="M11 1 L21 5 L21 15 C21 20 16 24 11 25 C6 24 1 20 1 15 L1 5 Z" fill="#A51C30"/>
        <text x="11" y="16" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Georgia, serif">VE RI TAS</text>
      </svg>
      <span className="font-serif font-bold text-[11px] text-red-800 tracking-widest leading-none">HARVARD</span>
      {subtext && <span className="font-serif text-[8px] text-red-800/60 tracking-wide">{subtext}</span>}
    </span>
  )

  // ── Wharton: navy pennant ──
  if (name === 'Wharton') return (
    <span className="flex flex-col items-center gap-1 select-none">
      <svg width="26" height="18" viewBox="0 0 26 18" fill="none" aria-hidden="true">
        <path d="M1 2 L25 9 L1 16 Z" fill="#011F5B"/>
        <line x1="1" y1="2" x2="1" y2="16" stroke="#990000" strokeWidth="2"/>
      </svg>
      <span className="font-serif font-bold text-[12px] text-blue-900 tracking-wide">Wharton</span>
      {subtext && <span className="font-sans text-[8px] text-blue-900/50 tracking-wide text-center leading-tight" style={{maxWidth:80}}>{subtext}</span>}
    </span>
  )

  // ── Oxford: open book ──
  if (name === 'OXFORD') return (
    <span className="flex flex-col items-center gap-1 select-none">
      <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden="true">
        <path d="M14 2 L2 6 L2 17 L14 14 L26 17 L26 6 Z" fill="#002147"/>
        <path d="M14 2 L14 14" stroke="#fff" strokeWidth="1"/>
        <path d="M6 8 L12 8 M6 11 L12 11" stroke="#fff" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M16 8 L22 8 M16 11 L22 11" stroke="#fff" strokeWidth="0.8" strokeLinecap="round"/>
      </svg>
      <span className="font-serif font-bold text-[11px] text-blue-900 tracking-widest">OXFORD</span>
      {subtext && <span className="font-serif text-[8px] text-blue-900/55 tracking-wide">{subtext}</span>}
    </span>
  )

  // ── IIT: gear/cog mark ──
  if (name === 'IIT') return (
    <span className="flex flex-col items-center gap-0.5 select-none">
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="9" stroke="#0A0A0A" strokeWidth="1.5" fill="none"/>
        <circle cx="11" cy="11" r="4" fill="#0A0A0A"/>
        {[0,45,90,135,180,225,270,315].map((deg, i) => (
          <rect key={i} x="10" y="1" width="2" height="3.5" rx="0.5" fill="#0A0A0A"
            transform={`rotate(${deg} 11 11)`}/>
        ))}
      </svg>
      <span className="font-sans font-bold text-sm text-ink tracking-widest">IIT</span>
      {subtext && <span className="font-sans text-[9px] text-ink/60">{subtext}</span>}
    </span>
  )

  // ── IIM: lamp of knowledge ──
  if (name === 'IIM') return (
    <span className="flex flex-col items-center gap-0.5 select-none">
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-hidden="true">
        <path d="M9 2 C5 2, 2 5, 2 9 C2 13, 5 15, 8 16 L8 19 L10 19 L10 16 C13 15, 16 13, 16 9 C16 5, 13 2, 9 2 Z" fill="#1E3A8A"/>
        <rect x="6.5" y="19" width="5" height="1.5" rx="0.5" fill="#1E3A8A"/>
        <rect x="7.5" y="20.5" width="3" height="1" rx="0.5" fill="#1E3A8A"/>
        <line x1="9" y1="6" x2="9" y2="14" stroke="#fff" strokeWidth="1" strokeLinecap="round"/>
        <line x1="6" y1="10" x2="12" y2="10" stroke="#fff" strokeWidth="1" strokeLinecap="round"/>
      </svg>
      <span className="font-sans font-bold text-sm text-blue-900 tracking-widest">IIM</span>
      {subtext && <span className="font-sans text-[9px] text-blue-900/60">{subtext}</span>}
    </span>
  )

  // ── Google: iconic multi-colour letters ──
  if (style === 'google') return (
    <span className="font-sans font-bold text-lg leading-none select-none">
      <span className="text-blue-500">G</span>
      <span className="text-red-500">o</span>
      <span className="text-amber-500">o</span>
      <span className="text-blue-500">g</span>
      <span className="text-green-500">l</span>
      <span className="text-red-500">e</span>
    </span>
  )

  // ── ESADE: wide-tracked display ──
  if (name === 'ESADE') return (
    <span className={cn('font-bold text-xl tracking-widest select-none', colorClass)}>
      {name}
    </span>
  )

  // ── TeachForIndia: two-tone text ──
  if (name === 'TEACHFORINDIA') return (
    <span className="font-bold text-[11px] leading-tight select-none">
      <span className="text-red-600">TEACH</span>
      <span className="text-ink">FOR</span>
      <span className="text-red-600">INDIA</span>
    </span>
  )

  // ── Italic (ISB) ──
  if (style === 'italic') return (
    <span className={cn('font-display font-bold text-xl italic select-none', colorClass)}>
      {name}
    </span>
  )

  // ── Amazon wordmark ──
  if (name === 'amazon') return (
    <span className="flex flex-col items-center gap-0.5 select-none">
      <span className="font-sans font-bold text-base text-amber-500 tracking-tight">amazon</span>
      <svg width="28" height="7" viewBox="0 0 28 7" fill="none" aria-hidden="true">
        <path d="M2 4 C7 7.5, 21 7.5, 26 4" stroke="#FF9900" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
        <path d="M24.5 2.5 L26 4 L24.5 5.5" stroke="#FF9900" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </span>
  )

  // ── Deloitte: green dot ──
  if (name === 'Deloitte.') return (
    <span className="flex items-center gap-1 select-none">
      <span className="font-sans font-bold text-base text-green-700 tracking-tight">Deloitte</span>
      <span className="text-green-500 font-bold text-xl leading-none" style={{ lineHeight: 1 }}>·</span>
    </span>
  )

  // ── Times Internet ──
  if (name === 'TIMES') return (
    <span className="flex flex-col items-center select-none">
      <span className="font-serif font-bold text-base text-ink tracking-wide">TIMES</span>
      {subtext && <span className="font-sans text-[9px] text-ink/55 tracking-widest">{subtext}</span>}
    </span>
  )

  // ── Serif fallback (any remaining serif) ──
  if (style === 'serif') return (
    <span className={cn('font-serif font-bold text-sm leading-tight text-center select-none', colorClass)}>
      <span className="block">{name}</span>
      {subtext && (
        <span className="block text-[9px] font-normal opacity-75 tracking-wide mt-0.5">{subtext}</span>
      )}
    </span>
  )

  // ── Sans default ──
  return (
    <span className={cn('font-sans font-bold text-sm leading-tight text-center select-none', colorClass)}>
      <span className="block">{name}</span>
      {subtext && (
        <span className="block text-[10px] font-normal opacity-75 mt-0.5">{subtext}</span>
      )}
    </span>
  )
}
