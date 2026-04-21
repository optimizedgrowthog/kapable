'use client'

import { useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Children, type ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  direction?: 'left' | 'right'
  speed?: number                           // loop duration in seconds; default 32
  pauseOnHover?: boolean                   // default true
  fadeColor?: string                       // default '#FAF6F0'
  fadeWidth?: string                       // Tailwind width class; default 'w-12 md:w-24'
  className?: string
  reducedMotionFallback?: 'wrap' | 'hide'  // default 'wrap'
}

export function Marquee({
  children,
  direction = 'left',
  speed = 32,
  pauseOnHover = true,
  fadeColor = '#FAF6F0',
  fadeWidth = 'w-12 md:w-24',
  className,
  reducedMotionFallback = 'wrap',
}: MarqueeProps) {
  const prefersReduced = useReducedMotion()
  const items = Children.toArray(children)

  if (prefersReduced) {
    if (reducedMotionFallback === 'hide') return null
    return (
      <div className={cn('flex flex-wrap gap-4 justify-center', className)}>
        {items}
      </div>
    )
  }

  const doubled = [...items, ...items]

  return (
    <div className={cn('marquee-viewport relative', !pauseOnHover && 'marquee-no-pause', className)}>
      <div
        className={cn('pointer-events-none absolute left-0 inset-y-0 z-10', fadeWidth)}
        style={{ background: `linear-gradient(90deg, ${fadeColor} 0%, transparent 100%)` }}
      />
      <div
        className={cn('pointer-events-none absolute right-0 inset-y-0 z-10', fadeWidth)}
        style={{ background: `linear-gradient(270deg, ${fadeColor} 0%, transparent 100%)` }}
      />
      <div className="overflow-hidden py-1.5">
        <div
          className={cn('marquee-track', direction === 'right' && 'marquee-track-reverse')}
          style={{ ['--marquee-duration' as string]: `${speed}s` }}
        >
          {doubled.map((child, i) => (
            <div key={i} className="shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
