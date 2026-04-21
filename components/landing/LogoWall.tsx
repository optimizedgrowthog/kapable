'use client'

import { motion, useReducedMotion } from 'motion/react'
import { kapable } from '@/content/kapable'
import { cn } from '@/lib/utils'
import { Marquee } from '@/components/ui/Marquee'
import type { LogoItem } from '@/content/kapable'

// ─── Variants ─────────────────────────────────────────────────────────────────

const headingVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } },
}

const wallReveal = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 } },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LogoWall() {
  const prefersReduced = useReducedMotion()
  const { logoWall } = kapable
  const rowTop    = logoWall.logos.slice(0, 6)
  const rowBottom = logoWall.logos.slice(6, 12)

  return (
    <section className="bg-cream py-16 px-5 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">

        {/* ── Heading ── */}
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="text-xl md:text-2xl font-bold text-ink mb-10 font-sans"
        >
          {logoWall.heading}
        </motion.h2>

        {/* Screen-reader-accessible company list (visual marquee is aria-hidden) */}
        <ul className="sr-only" role="list" aria-label="Trusted companies">
          {logoWall.logos.map((logo, i) => (
            <li key={i}>{logo.name}</li>
          ))}
        </ul>

        {/* ── Reduced-motion: static wrap grid ── */}
        {prefersReduced ? (
          <div className="flex flex-wrap gap-4 justify-center">
            {logoWall.logos.map((logo, i) => (
              <LogoChip key={i} logo={logo} />
            ))}
          </div>
        ) : (
          /* ── Animated: one-shot fade-rise, then continuous reverse-marquee ── */
          <motion.div
            aria-hidden="true"
            variants={wallReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="flex flex-col gap-4 md:gap-5"
          >
            <Marquee direction="right" speed={32} fadeColor="#FAF6F0">
              {rowTop.map((logo, i) => <LogoChip key={i} logo={logo} />)}
            </Marquee>
            <Marquee direction="left" speed={32} fadeColor="#FAF6F0">
              {rowBottom.map((logo, i) => <LogoChip key={i} logo={logo} />)}
            </Marquee>
          </motion.div>
        )}

      </div>
    </section>
  )
}

// ─── Logo chip ────────────────────────────────────────────────────────────────

function LogoChip({ logo }: { logo: LogoItem }) {
  const prefersReduced = useReducedMotion()

  return (
    <motion.div
      className="bg-white rounded-xl flex items-center justify-center shadow-sm select-none border border-ink/5 shrink-0 min-w-[110px] md:min-w-[160px] h-12 md:h-14 py-2.5 md:py-3 px-4 md:px-5 mx-2 md:mx-2.5"
      whileHover={prefersReduced ? {} : { y: -3, boxShadow: '0 8px 28px rgba(0,0,0,0.12)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
    >
      <BrandMark name={logo.name} colorClass={logo.colorClass ?? ''} style={logo.style} />
    </motion.div>
  )
}

// ─── Brand mark renderer ──────────────────────────────────────────────────────

function BrandMark({ name, colorClass, style }: { name: string; colorClass: string; style?: string }) {
  // Amazon — wordmark + smile arrow
  if (name === 'amazon') return (
    <span className="flex flex-col items-center gap-0.5">
      <span className="font-sans font-bold text-sm text-amber-500 tracking-tight">amazon</span>
      <svg width="32" height="7" viewBox="0 0 32 7" fill="none" aria-hidden="true">
        <path d="M2 4.5 C8 8, 24 8, 30 4.5" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M28 3 L30 4.5 L28 6" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </span>
  )

  // Adobe — red square mark + wordmark
  if (name === 'Adobe') return (
    <span className="flex items-center gap-1.5">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path d="M0 14 L7 0 L14 14 Z" fill="#FF0000"/>
        <path d="M4 14 L7 7 L10 14 Z" fill="#fff"/>
      </svg>
      <span className="font-sans font-bold text-sm text-red-600 tracking-tight">Adobe</span>
    </span>
  )

  // airbnb — bélo-inspired mark + text
  if (name === 'airbnb') return (
    <span className="flex items-center gap-1.5">
      <svg width="12" height="16" viewBox="0 0 12 16" fill="#FF5A5F" aria-hidden="true">
        <path d="M6 1 C4 1, 2 2.8, 2 5 C2 6.5, 2.8 7.8, 4 9.2 L6 12 L8 9.2 C9.2 7.8, 10 6.5, 10 5 C10 2.8, 8 1, 6 1 Z M6 6.5 C5.2 6.5, 4.5 5.8, 4.5 5 C4.5 4.2, 5.2 3.5, 6 3.5 C6.8 3.5, 7.5 4.2, 7.5 5 C7.5 5.8, 6.8 6.5, 6 6.5 Z"/>
        <ellipse cx="6" cy="15" rx="4" ry="1" fill="#FF5A5F" opacity="0.3"/>
      </svg>
      <span className="font-sans font-bold text-sm text-red-500 tracking-tight">airbnb</span>
    </span>
  )

  // TATA — arc mark + wordmark
  if (name === 'TATA') return (
    <span className="flex items-center gap-1.5">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="#00008B" strokeWidth="1.5" fill="none"/>
        <path d="M4 8 Q8 4, 12 8" stroke="#00008B" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </svg>
      <span className="font-sans font-bold text-sm text-ink tracking-widest">TATA</span>
    </span>
  )

  // VISA — classic blue/gold
  if (name === 'VISA') return (
    <span className="flex items-center">
      <span style={{ fontFamily: 'Georgia, serif' }} className="font-bold text-base tracking-tight">
        <span className="text-blue-600">VI</span>
        <span className="text-amber-500">SA</span>
      </span>
    </span>
  )

  // HDFC BANK
  if (name === 'HDFC BANK') return (
    <span className="flex items-center gap-1">
      <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true">
        <rect x="0" y="0" width="10" height="14" rx="1" fill="#DC2626"/>
        <rect x="2" y="2" width="6" height="10" rx="0.5" fill="#fff"/>
        <rect x="3.5" y="3.5" width="3" height="7" fill="#DC2626"/>
      </svg>
      <span className="font-sans font-bold text-[11px] text-red-600 tracking-wide leading-tight text-center">
        <span className="block">HDFC</span>
        <span className="block text-[9px] font-normal text-ink/60">BANK</span>
      </span>
    </span>
  )

  // Google (same as DesignedByAlumni)
  if (name === 'Google' || name === 'google') return (
    <span className="font-sans font-bold text-base leading-none">
      <span className="text-blue-500">G</span>
      <span className="text-red-500">o</span>
      <span className="text-amber-500">o</span>
      <span className="text-blue-500">g</span>
      <span className="text-green-500">l</span>
      <span className="text-red-500">e</span>
    </span>
  )

  // Morgan Stanley — serif
  if (name.startsWith('Morgan')) return (
    <span className="font-serif font-bold text-[11px] leading-tight text-center text-ink">
      <span className="block">Morgan</span>
      <span className="block">Stanley</span>
    </span>
  )

  // American Express — blue card mark
  if (name.startsWith('AMERICAN')) return (
    <span className="flex items-center gap-1">
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
        <rect width="18" height="12" rx="2" fill="#016FD0"/>
        <text x="9" y="8.5" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="sans-serif">AMEX</text>
      </svg>
    </span>
  )

  // HSBC — hexagon mark
  if (name === 'HSBC') return (
    <span className="flex items-center gap-1.5">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <polygon points="7,0 14,3.5 14,10.5 7,14 0,10.5 0,3.5" fill="#DB0011"/>
        <polygon points="7,3 11,5 11,9 7,11 3,9 3,5" fill="#fff"/>
      </svg>
      <span className="font-sans font-bold text-sm text-red-600 tracking-widest">HSBC</span>
    </span>
  )

  // BARCLAYS — eagle-inspired mark
  if (name === 'BARCLAYS') return (
    <span className="flex items-center gap-1.5">
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
        <path d="M6 1 L1 5 L1 13 L6 10 L11 13 L11 5 Z" fill="#00AEEF"/>
        <path d="M6 5 L4 7 L6 9 L8 7 Z" fill="#fff"/>
      </svg>
      <span className="font-sans font-bold text-[11px] text-blue-900 tracking-wider">BARCLAYS</span>
    </span>
  )

  // Booking.com
  if (name === 'Booking') return (
    <span className="flex items-center gap-1">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect width="16" height="16" rx="3" fill="#003580"/>
        <text x="8" y="11.5" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">B.</text>
      </svg>
      <span className="font-sans font-bold text-sm text-blue-800">Booking</span>
    </span>
  )

  // Intuit
  if (name === 'Intuit') return (
    <span className="flex items-center gap-1.5">
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="5" stroke="#365EBF" strokeWidth="1.5" fill="none"/>
        <line x1="6" y1="3" x2="6" y2="9" stroke="#365EBF" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="6" cy="11.5" r="1" fill="#365EBF"/>
      </svg>
      <span className="font-sans font-bold text-sm text-ink tracking-tight">Intuit</span>
    </span>
  )

  // Default — styled text
  const lines = name.split('\n')
  const isMultiline = lines.length > 1
  return (
    <span className={cn(
      style === 'serif' ? 'font-serif' : 'font-sans',
      'font-bold leading-tight text-center',
      colorClass,
      isMultiline ? 'text-[10px]' : 'text-sm',
    )}>
      {lines.map((l, i) => <span key={i} className="block">{l}</span>)}
    </span>
  )
}
