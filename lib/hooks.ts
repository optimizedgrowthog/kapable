'use client'

import { useEffect, useRef, useState } from 'react'
import { useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import type React from 'react'

export function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds)
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])
  return {
    h: String(Math.floor(seconds / 3600)).padStart(2, '0'),
    m: String(Math.floor((seconds % 3600) / 60)).padStart(2, '0'),
    s: String(seconds % 60).padStart(2, '0'),
    isUrgent: seconds < 3600,
    total: seconds,
  }
}

/** Magnetic hover effect for buttons/CTAs. Guards against reduced-motion automatically. */
export function useMagnetic(strength = 0.26) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLButtonElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x    = useSpring(rawX, { stiffness: 260, damping: 20 })
  const y    = useSpring(rawY, { stiffness: 260, damping: 20 })

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    if (prefersReduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    rawX.set((e.clientX - (r.left + r.width  / 2)) * strength)
    rawY.set((e.clientY - (r.top  + r.height / 2)) * strength)
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
  }

  return {
    ref,
    style: prefersReduced ? {} : { x, y },
    onMouseMove,
    onMouseLeave,
  }
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia(query).matches
  })
  useEffect(() => {
    const mq = window.matchMedia(query)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])
  return matches
}
