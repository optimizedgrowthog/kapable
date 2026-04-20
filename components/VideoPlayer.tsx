'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'

interface VideoPlayerProps {
  videoId: string
  title?: string
}

export default function VideoPlayer({ videoId, title = 'Kapable Leadership Program' }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const prefersReduced = useReducedMotion()

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900 aspect-video shadow-2xl border border-white/5">
      <AnimatePresence mode="wait">
        {!playing ? (
          <motion.div
            key="poster"
            initial={{ opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Background photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://picsum.photos/seed/kapable-lp/800/450"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'blur(3px) brightness(0.45) saturate(0.6)', transform: 'scale(1.06)' }}
            />

            {/* Warm amber colour-grade overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(160deg, rgba(232,149,86,0.22) 0%, rgba(10,10,10,0.55) 100%)',
              }}
            />

            {/* Bottom vignette — keeps badges legible */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 45%)',
              }}
            />

            {/* Screen glow behind play button */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 55% 45% at 50% 48%, rgba(232,149,86,0.18) 0%, transparent 70%)',
              }}
            />

            {/* Play button + label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <motion.button
                onClick={() => setPlaying(true)}
                className="w-20 h-20 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-2xl ring-4 ring-white/20 focus-visible:ring-amber-500"
                whileHover={prefersReduced ? {} : { scale: 1.1 }}
                whileTap={prefersReduced ? {} : { scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                aria-label="Play video"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#0A0A0A" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.button>
              <div className="flex items-center gap-2">
                <p className="text-white/85 text-sm font-sans font-medium">Meet your instructors</p>
                <span className="text-white/40 text-xs font-mono">· 3:42</span>
              </div>
            </div>

            {/* Kapable badge — top right */}
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-md text-sm font-semibold text-white border border-white/10">
              Kapable
            </div>

            {/* Amazon badge — bottom centre */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-sm px-3 py-1.5 rounded-md text-xs text-white flex items-center gap-2 border border-white/10">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#FF9900" aria-hidden="true">
                <path d="M12 2L2 7v10l10 5 10-5V7z" />
              </svg>
              <span style={{ color: '#FF9900' }} className="font-bold">amazon</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="iframe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0"
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              className="w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title={title}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
