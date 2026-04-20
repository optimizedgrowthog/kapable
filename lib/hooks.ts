'use client'

import { useEffect, useState } from 'react'

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

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [query])
  return matches
}
