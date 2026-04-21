'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import { kapable } from '@/content/kapable'
import { cn } from '@/lib/utils'

const AUTOPLAY_MS = 5000

// ─── Component ────────────────────────────────────────────────────────────────

export default function RealStories() {
  const prefersReduced     = useReducedMotion()
  const { realStories }    = kapable
  const { stories }        = realStories
  const [active, setActive] = useState(0)
  const [dir, setDir]       = useState(1)          // 1 = forward, -1 = backward
  const [paused, setPaused] = useState(false)
  const timerRef            = useRef<ReturnType<typeof setTimeout> | null>(null)

  const go = useCallback((next: number, direction: number) => {
    setDir(direction)
    setActive(next)
  }, [])

  const prev = useCallback(() => {
    go((active - 1 + stories.length) % stories.length, -1)
  }, [active, go, stories.length])

  const next = useCallback(() => {
    go((active + 1) % stories.length, 1)
  }, [active, go, stories.length])

  // Autoplay
  useEffect(() => {
    if (paused || prefersReduced) return
    timerRef.current = setTimeout(next, AUTOPLAY_MS)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [active, paused, prefersReduced, next])

  const variants = {
    enter:  (d: number) => ({ opacity: 0, x: d > 0 ?  48 : -48, scale: 0.97 }),
    center: {              opacity: 1, x: 0,              scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
    exit:   (d: number) => ({ opacity: 0, x: d > 0 ? -48 :  48, scale: 0.97,
      transition: { duration: 0.3, ease: [0.4, 0, 1, 1]  as const } }),
  }

  const story = stories[active]

  return (
    <section className="bg-cream py-20 px-5 sm:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="font-sans text-amber-600 text-sm font-semibold tracking-widest uppercase mb-2">
            {realStories.eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
            {realStories.heading}
          </h2>
          <p className="text-ink/55 max-w-xl mx-auto font-sans text-sm">
            {realStories.subheading}
          </p>
        </motion.div>

        {/* ── Carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative"
        >
          {/* Card area */}
          <div className="relative overflow-hidden rounded-3xl min-h-[280px] sm:min-h-[240px]">
            <AnimatePresence custom={dir} mode="popLayout">
              <motion.div
                key={active}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <StoryCard story={story} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Nav row ── */}
          <div className="flex items-center justify-between mt-8">

            {/* Prev */}
            <NavButton onClick={prev} aria-label="Previous story" dir="prev" />

            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Story navigation">
              {stories.map((s, i) => (
                <button
                  key={s.name}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Go to story ${i + 1}`}
                  onClick={() => go(i, i > active ? 1 : -1)}
                  className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                  style={{ width: i === active ? 28 : 8, background: i === active ? '#E89556' : 'rgba(10,10,10,0.18)' }}
                >
                  {/* Progress fill when active */}
                  {i === active && !paused && !prefersReduced && (
                    <motion.span
                      key={`progress-${active}`}
                      className="absolute inset-y-0 left-0 bg-amber-600/60 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Next */}
            <NavButton onClick={next} aria-label="Next story" dir="next" />

          </div>
        </motion.div>

      </div>
    </section>
  )
}

// Pravatar image numbers keyed by story initials
const STORY_HEADSHOTS: Record<string, number> = {
  ST: 33,  // Shreyas Tanse — male
  PV: 56,  // Pooja Verma — female
  AM: 22,  // Arjun Mehta — male
  SR: 38,  // Sunita Rao — female
}

// ─── Story card ───────────────────────────────────────────────────────────────

function StoryCard({ story }: { story: typeof kapable.realStories.stories[number] }) {
  const imgNum = STORY_HEADSHOTS[story.initials]

  return (
    <div
      className="h-full bg-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between"
      style={{ boxShadow: '0 8px 40px rgba(10,10,10,0.07), 0 2px 8px rgba(10,10,10,0.04)' }}
    >
      {/* Quote mark */}
      <svg
        className="mb-5 shrink-0"
        width="36" height="28"
        viewBox="0 0 36 28"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 28V17.6C0 12.533 1.2 8.4 3.6 5.2 6 1.867 9.467 0 14 0v4.8c-2.533.4-4.4 1.6-5.6 3.6C7.2 10.4 6.6 12.8 6.8 16H14V28H0Zm22 0V17.6c0-5.067 1.2-9.2 3.6-12.4C28 1.867 31.467 0 36 0v4.8c-2.533.4-4.4 1.6-5.6 3.6-1.2 2-1.8 4.4-1.6 7.6H36V28H22Z"
          fill="rgba(232,149,86,0.18)"
        />
      </svg>

      {/* Quote */}
      <p className="font-sans text-ink/75 text-base sm:text-lg leading-relaxed flex-1 mb-8">
        &ldquo;{story.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full shrink-0 overflow-hidden relative flex items-center justify-center text-white text-sm font-bold"
          style={{ background: story.gradient }}
        >
          {imgNum ? (
            <Image
              src={`https://i.pravatar.cc/80?img=${imgNum}`}
              alt=""
              aria-hidden="true"
              fill
              sizes="40px"
              className="object-cover"
            />
          ) : story.initials}
        </div>
        <div>
          <p className="font-sans font-bold text-ink text-sm leading-none">{story.name}</p>
          <p className="font-sans text-ink/50 text-xs mt-0.5">{story.title}</p>
        </div>

        {/* 5-star rating */}
        <div className="ml-auto flex gap-0.5" aria-label="5 stars">
          {Array.from({ length: 5 }, (_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#E89556" aria-hidden="true">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Nav button ───────────────────────────────────────────────────────────────

function NavButton({ onClick, dir, ...props }: { onClick: () => void; dir: 'prev' | 'next'; 'aria-label': string }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08, boxShadow: '0 6px 20px rgba(10,10,10,0.12)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className={cn(
        'w-10 h-10 rounded-full bg-white border border-ink/10 flex items-center justify-center text-ink/60 hover:text-ink hover:border-amber-500/40 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500',
      )}
      aria-label={props['aria-label']}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {dir === 'prev'
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 6 15 12 9 18" />
        }
      </svg>
    </motion.button>
  )
}
