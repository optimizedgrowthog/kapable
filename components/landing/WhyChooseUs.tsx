'use client'

import { useRef, useCallback, useState } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { kapable } from '@/content/kapable'
import { easeOutQuart, viewportOnce } from '@/lib/motion'
import type { WhyItem, IconKey } from '@/content/kapable'

// ─── Constants ────────────────────────────────────────────────────────────────

const CARD_H    = 64    // collapsed title-bar height (px)
const BASE_TOP  = 96    // first card sticky-top (= lg:top-24)
const EASE_DIST = 100   // scroll px over which collapse animates
const RADIUS    = 16    // card corner radius when expanded / outermost

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhyChooseUs() {
  const prefersReduced = useReducedMotion()
  const { whyChooseUs } = kapable
  const { scrollY } = useScroll()
  const total = whyChooseUs.items.length

  // Discrete collapsed state for neighbor-aware border-radius merge effect.
  // Updates only when a card crosses the 50% threshold — not per frame.
  const [collapsedFlags, setCollapsedFlags] = useState<boolean[]>(() =>
    Array(total).fill(false)
  )

  const handleCollapseChange = useCallback((index: number, isCollapsed: boolean) => {
    setCollapsedFlags(prev => {
      if (prev[index] === isCollapsed) return prev
      const next = [...prev]
      next[index] = isCollapsed
      return next
    })
  }, [])

  return (
    <section className="relative bg-ink py-20 px-5 sm:px-6 noise overflow-clip hairline-top">
      <div
        className="absolute top-0 left-0 w-[520px] h-[380px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(232,149,86,0.07) 0%, transparent 65%)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[460px] h-[340px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom right, rgba(232,149,86,0.05) 0%, transparent 65%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-16 lg:items-start">

          {/* ── Sticky heading — left column ── */}
          <div className="lg:sticky lg:top-24 mb-10 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.65, ease: easeOutQuart }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4">
                {whyChooseUs.heading}
              </h2>
              <p className="text-white/50 text-sm font-sans leading-relaxed">
                {whyChooseUs.subheading}
              </p>
              <div className="mt-6 h-px w-12 bg-amber-500/60" />
            </motion.div>
          </div>

          {/* ── Card stack — space-y-4 mobile / packed desktop ── */}
          <div className="space-y-4 lg:space-y-0">
            {whyChooseUs.items.map((item, i) => {
              const isCollapsed   = collapsedFlags[i]
              const prevCollapsed = i > 0 && collapsedFlags[i - 1]
              const nextCollapsed = i < total - 1 && collapsedFlags[i + 1]

              // Square the inner corners where two adjacent collapsed cards touch
              const topRadius    = isCollapsed && prevCollapsed ? 0 : RADIUS
              const bottomRadius = isCollapsed && nextCollapsed ? 0 : RADIUS

              return (
                <StickyCard
                  key={item.title}
                  item={item}
                  index={i}
                  total={total}
                  scrollY={scrollY}
                  prefersReduced={!!prefersReduced}
                  topRadius={topRadius}
                  bottomRadius={bottomRadius}
                  showTopDivider={!!(isCollapsed && prevCollapsed)}
                  onCollapseChange={handleCollapseChange}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Sticky card ──────────────────────────────────────────────────────────────

function StickyCard({
  item, index, total, scrollY, prefersReduced,
  topRadius, bottomRadius, showTopDivider, onCollapseChange,
}: {
  item: WhyItem
  index: number
  total: number
  scrollY: MotionValue<number>
  prefersReduced: boolean
  topRadius: number
  bottomRadius: number
  showTopDivider: boolean
  onCollapseChange: (index: number, isCollapsed: boolean) => void
}) {
  const outerRef  = useRef<HTMLDivElement>(null)
  const stickyTop = BASE_TOP + index * CARD_H
  const collapseP = useMotionValue(0)

  useMotionValueEvent(scrollY, 'change', () => {
    if (typeof window === 'undefined' || window.innerWidth < 1024 || prefersReduced) {
      if (collapseP.get() !== 0) {
        collapseP.set(0)
        onCollapseChange(index, false)
      }
      return
    }
    if (!outerRef.current) return
    const top = outerRef.current.getBoundingClientRect().top
    const raw = 1 - (top - stickyTop) / EASE_DIST
    const clamped = Math.min(1, Math.max(0, raw))
    collapseP.set(clamped)
    onCollapseChange(index, clamped > 0.5)
  })

  const contentMaxH    = useTransform(collapseP, [0, 1], [280, 0])
  const contentOpacity = useTransform(collapseP, [0, 0.45], [1, 0])
  const chevronOpacity = useTransform(collapseP, [0.55, 1], [0, 0.5])
  const boxShadow      = useTransform(
    collapseP,
    [0, 1],
    ['0 6px 32px rgba(0,0,0,0.12)', '0 1px 4px rgba(0,0,0,0.06)'],
  )

  return (
    <div
      ref={outerRef}
      className="why-outer"
      style={{
        '--why-z':   total - index,
        '--why-top': `${stickyTop}px`,
      } as React.CSSProperties}
    >
      <motion.div
        className="why-inner overflow-hidden"
        style={{
          background: '#FAF6F0',
          borderTopLeftRadius:     topRadius,
          borderTopRightRadius:    topRadius,
          borderBottomLeftRadius:  bottomRadius,
          borderBottomRightRadius: bottomRadius,
          boxShadow,
        }}
      >
        {/* Thin separator visible when merged with the collapsed card above */}
        {showTopDivider && (
          <div className="h-px bg-amber-700/20" />
        )}

        {/* ── Header — always visible ── */}
        <div className="flex items-center px-6 gap-3" style={{ height: CARD_H }}>
          <h3 className="font-sans font-bold text-[17px] text-ink leading-snug flex-1">
            {item.title}
          </h3>
          <motion.svg
            width="13" height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#92400E"
            strokeWidth="2.5"
            style={{ opacity: chevronOpacity }}
            className="shrink-0"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </motion.svg>
        </div>

        {/* ── Expandable: bullets + illustrated icon ── */}
        <motion.div
          style={{ maxHeight: contentMaxH, opacity: contentOpacity, overflow: 'hidden' }}
        >
          <div className="px-6 pb-6">
            <div className="h-px bg-amber-700/15 mb-5" />
            <div className="flex items-start gap-5">
              <ul className="flex-1 space-y-3">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-[13.5px] text-ink/65 font-sans leading-relaxed"
                  >
                    <AmberCheckCircle />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="shrink-0 w-[60px] h-[60px] flex items-start justify-center pt-1">
                <WhyIconLarge icon={item.icon} />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// ─── Amber circle checkmark ───────────────────────────────────────────────────

function AmberCheckCircle() {
  return (
    <svg
      width="17" height="17"
      viewBox="0 0 17 17"
      fill="none"
      aria-hidden="true"
      className="shrink-0 mt-[1px]"
    >
      <circle cx="8.5" cy="8.5" r="8.5" fill="rgba(232,149,86,0.22)" />
      <path
        d="M5 8.5l2.5 2.5 4.5-4.5"
        stroke="#B45309"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Large illustrated icons (58×58, outlined amber style) ───────────────────

function WhyIconLarge({ icon }: { icon: IconKey }) {
  const s = '#B45309'
  const f = 'rgba(180,83,9,0.1)'

  switch (icon) {
    case 'live':
      return (
        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" stroke={s} aria-hidden="true">
          {/* Monitor */}
          <rect x="7" y="16" width="30" height="20" rx="3" strokeWidth="2" fill={f} />
          <path d="M7 30h30" strokeWidth="2" />
          <rect x="20" y="36" width="6" height="4" strokeWidth="1.8" fill={f} />
          <path d="M16 40h16" strokeWidth="2" strokeLinecap="round" />
          {/* Person silhouette on screen */}
          <circle cx="22" cy="21" r="3.5" strokeWidth="1.6" fill={f} />
          <path d="M15 29c0-3.9 3.1-7 7-7s7 3.1 7 7" strokeWidth="1.6" strokeLinecap="round" />
          {/* Live badge */}
          <circle cx="44" cy="19" r="6" fill={f} strokeWidth="1.8" />
          <circle cx="44" cy="19" r="2.2" fill={s} stroke="none" />
          <circle cx="44" cy="19" r="5" fill="none" stroke={s} strokeWidth="1.2" strokeOpacity="0.4" />
        </svg>
      )

    case 'curriculum':
      return (
        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" stroke={s} aria-hidden="true">
          {/* Left page */}
          <path d="M29 14C21 13 11 17 11 17L11 43C11 43 21 39 29 40Z" strokeWidth="2" strokeLinejoin="round" fill={f} />
          {/* Right page */}
          <path d="M29 14C37 13 47 17 47 17L47 43C47 43 37 39 29 40Z" strokeWidth="2" strokeLinejoin="round" fill={f} />
          {/* Spine */}
          <line x1="29" y1="14" x2="29" y2="40" strokeWidth="2" />
          {/* Left text lines */}
          <line x1="16" y1="24" x2="25" y2="24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="29" x2="25" y2="29" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="16" y1="34" x2="23" y2="34" strokeWidth="1.5" strokeLinecap="round" />
          {/* Right text lines */}
          <line x1="33" y1="24" x2="42" y2="24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="33" y1="29" x2="42" y2="29" strokeWidth="1.5" strokeLinecap="round" />
          {/* Pencil decoration */}
          <path d="M39 10l3.5 3.5-6 6-3.5 0 0-3.5z" strokeWidth="1.6" strokeLinejoin="round" fill={f} />
          <line x1="39" y1="10" x2="42.5" y2="13.5" strokeWidth="1.6" />
        </svg>
      )

    case 'cohort':
      return (
        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" stroke={s} aria-hidden="true">
          {/* Centre person */}
          <circle cx="29" cy="18" r="7" strokeWidth="2" fill={f} />
          <path d="M15 46c0-7.7 6.3-14 14-14s14 6.3 14 14" strokeWidth="2" strokeLinecap="round" fill={f} />
          {/* Left person */}
          <circle cx="12" cy="22" r="5.5" strokeWidth="1.8" fill={f} />
          <path d="M2 45c0-5.5 4.5-10 10-10" strokeWidth="1.8" strokeLinecap="round" />
          {/* Right person */}
          <circle cx="46" cy="22" r="5.5" strokeWidth="1.8" fill={f} />
          <path d="M56 45c0-5.5-4.5-10-10-10" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )

    case 'feedback':
      return (
        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" stroke={s} aria-hidden="true">
          {/* Main speech bubble */}
          <path
            d="M8 10h36c2.2 0 4 1.8 4 4v18c0 2.2-1.8 4-4 4H30l-8 9v-9H12c-2.2 0-4-1.8-4-4V14c0-2.2 1.8-4 4-4z"
            strokeWidth="2" strokeLinejoin="round" fill={f}
          />
          {/* Star */}
          <path
            d="M26 18l1.8 5h5.2l-4.2 3 1.6 5-4.4-3-4.4 3 1.6-5-4.2-3h5.2z"
            strokeWidth="1.5" strokeLinejoin="round" fill="rgba(180,83,9,0.15)"
          />
          {/* Small second bubble */}
          <path
            d="M40 30h10c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2h-2v4l-3.5-4H40c-1.1 0-2-.9-2-2v-7c0-1.1.9-2 2-2z"
            strokeWidth="1.6" strokeLinejoin="round" fill={f}
          />
        </svg>
      )

    case 'integrated':
      return (
        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" stroke={s} aria-hidden="true">
          {/* Centre node */}
          <circle cx="29" cy="29" r="7" strokeWidth="2" fill="rgba(180,83,9,0.15)" />
          {/* Outer nodes */}
          <circle cx="10" cy="13" r="5" strokeWidth="1.8" fill={f} />
          <circle cx="48" cy="13" r="5" strokeWidth="1.8" fill={f} />
          <circle cx="10" cy="45" r="5" strokeWidth="1.8" fill={f} />
          <circle cx="48" cy="45" r="5" strokeWidth="1.8" fill={f} />
          <circle cx="29" cy="8"  r="4" strokeWidth="1.6" fill={f} />
          <circle cx="29" cy="50" r="4" strokeWidth="1.6" fill={f} />
          {/* Connections */}
          <line x1="15" y1="17" x2="23" y2="23" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="43" y1="17" x2="35" y2="23" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="15" y1="41" x2="23" y2="35" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="43" y1="41" x2="35" y2="35" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="29" y1="12" x2="29" y2="22" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="29" y1="36" x2="29" y2="46" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )

    case 'flex':
      return (
        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" stroke={s} aria-hidden="true">
          {/* Calendar body */}
          <rect x="6" y="12" width="33" height="30" rx="3" strokeWidth="2" fill={f} />
          {/* Header bar */}
          <path d="M6 12h33a3 3 0 0 1 3 3v5H6v-5a3 3 0 0 1 3-3z" fill="rgba(180,83,9,0.14)" stroke="none" />
          <line x1="6" y1="20" x2="39" y2="20" strokeWidth="2" stroke={s} />
          {/* Binding knobs */}
          <line x1="16" y1="9" x2="16" y2="15" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="29" y1="9" x2="29" y2="15" strokeWidth="2.5" strokeLinecap="round" />
          {/* Day dots */}
          {([13, 20, 27, 34] as const).map(x =>
            ([26, 32, 38] as const).map(y => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" fill={s} stroke="none" />
            ))
          )}
          {/* Clock overlay */}
          <circle cx="44" cy="42" r="11" strokeWidth="2" fill="#FAF6F0" stroke={s} />
          <circle cx="44" cy="42" r="11" strokeWidth="2" fill={f} />
          <line x1="44" y1="42" x2="44" y2="35" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="44" y1="42" x2="50" y2="45" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="44" cy="42" r="1.5" fill={s} stroke="none" />
        </svg>
      )

    default:
      return (
        <svg width="58" height="58" viewBox="0 0 58 58" fill="none" stroke={s} aria-hidden="true">
          <circle cx="29" cy="29" r="18" strokeWidth="2" fill={f} />
          <path d="M29 20v10l6 4" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
  }
}
