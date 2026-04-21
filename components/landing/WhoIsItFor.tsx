'use client'

import { motion, useReducedMotion } from 'motion/react'
import { kapable } from '@/content/kapable'
import { staggerContainer, easeOutQuart, viewportOnce } from '@/lib/motion'
import type { IconKey } from '@/content/kapable'

// ─── Variants ─────────────────────────────────────────────────────────────────

const container = staggerContainer(0.13, 0.05)

const cardVariant = {
  hidden:  { opacity: 0, y: 36, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.62, ease: easeOutQuart } },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhoIsItFor() {
  const prefersReduced = useReducedMotion()
  const { whoIsItFor } = kapable

  return (
    <section className="bg-cream pb-20 px-5 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.65, ease: easeOutQuart }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
            {whoIsItFor.heading}
          </h2>
          <p className="text-ink/60 max-w-2xl mx-auto font-sans">
            {whoIsItFor.subheading}
          </p>
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid md:grid-cols-3 gap-6 text-left"
        >
          {whoIsItFor.personas.map((persona) => (
            <PersonaCard
              key={persona.title}
              title={persona.title}
              description={persona.description}
              icon={persona.icon}
              prefersReduced={!!prefersReduced}
            />
          ))}
        </motion.div>

      </div>
    </section>
  )
}

// ─── Persona card ──────────────────────────────────────────────────────────────

interface PersonaCardProps {
  title: string
  description: string
  icon: IconKey
  prefersReduced: boolean
}

function PersonaCard({ title, description, icon, prefersReduced }: PersonaCardProps) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={
        prefersReduced
          ? {}
          : { y: -7, boxShadow: '0 20px 48px rgba(0,0,0,0.10)' }
      }
      transition={{ type: 'spring', stiffness: 360, damping: 24 }}
      className="group bg-white rounded-2xl p-7 shadow-sm relative overflow-hidden"
    >
      {/* Amber top-edge glow — fades in on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, transparent, #E89556, transparent)' }}
      />

      {/* Icon */}
      <div className="w-12 h-12 rounded-full bg-amber-500/15 flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-amber-500/25">
        <PersonaIcon icon={icon} />
      </div>

      <h3 className="font-bold text-ink text-lg mb-2 font-sans leading-snug">{title}</h3>
      <p className="text-ink/58 text-sm leading-relaxed font-sans">{description}</p>
    </motion.div>
  )
}

// ─── Icons — distinct SVG per persona ─────────────────────────────────────────

function PersonaIcon({ icon }: { icon: IconKey }) {
  const props = { width: 22, height: 22, viewBox: '0 0 24 24', fill: '#DB7F3A', 'aria-hidden': true as const }

  switch (icon) {
    // Founder & Entrepreneurs — lightbulb (idea + vision)
    case 'founder':
      return (
        <svg {...props}>
          <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
        </svg>
      )

    // CXOs & Directors — shield/badge (authority + trust)
    case 'cxo':
      return (
        <svg {...props}>
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 14l-3-3 1.41-1.41L11 12.17l4.59-4.58L17 9l-6 6z" />
        </svg>
      )

    // VPs & Senior Managers — group/people (team leadership)
    case 'vp':
      return (
        <svg {...props}>
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      )

    // Generic person fallback
    default:
      return (
        <svg {...props}>
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      )
  }
}
