import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Fraunces } from 'next/font/google'
import './globals.css'
import ScrollProgress from '@/components/ScrollProgress'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Think, Speak and Lead with Confidence | Kapable',
  description:
    'Kapable\'s Leadership Acceleration Program — 1-on-1 coaching designed to help founders, CXOs, and senior leaders communicate with conviction and lead at the level they are capable of.',
  openGraph: {
    title: 'Think, Speak and Lead with Confidence | Kapable',
    description:
      'Kapable\'s Leadership Acceleration Program — 1-on-1 coaching for founders, CXOs, and senior leaders.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${fraunces.variable}`}
    >
      <body className="bg-ink text-white antialiased overflow-x-hidden">
        <ScrollProgress />
        {children}
      </body>
    </html>
  )
}
