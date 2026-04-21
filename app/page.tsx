import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Above-fold sections — statically imported for immediate render
import Hero             from '@/components/landing/Hero'
import LogoWall         from '@/components/landing/LogoWall'
import TestimonialStrip from '@/components/landing/TestimonialStrip'
import WhoIsItFor       from '@/components/landing/WhoIsItFor'

// Below-fold sections — dynamically imported to code-split client JS
const ChooseProgram     = dynamic(() => import('@/components/landing/ChooseProgram'),     { loading: () => <SectionSkeleton h={720} /> })
const DesignedByAlumni  = dynamic(() => import('@/components/landing/DesignedByAlumni'),  { loading: () => <SectionSkeleton h={420} /> })
const WhatWillYouLearn  = dynamic(() => import('@/components/landing/WhatWillYouLearn'),  { loading: () => <SectionSkeleton h={640} /> })
const JourneyAndImpact  = dynamic(() => import('@/components/landing/JourneyAndImpact'),  { loading: () => <SectionSkeleton h={400} /> })
const WhyChooseUs       = dynamic(() => import('@/components/landing/WhyChooseUs'),       { loading: () => <SectionSkeleton h={600} /> })
const ApplicationProcess = dynamic(() => import('@/components/landing/ApplicationProcess'), { loading: () => <SectionSkeleton h={720} /> })
const ProgramOutcomes   = dynamic(() => import('@/components/landing/ProgramOutcomes'),   { loading: () => <SectionSkeleton h={520} /> })
const Certificate       = dynamic(() => import('@/components/landing/Certificate'),       { loading: () => <SectionSkeleton h={600} /> })
const EveryLeaderCTA    = dynamic(() => import('@/components/landing/EveryLeaderCTA'),    { loading: () => <SectionSkeleton h={320} /> })
const RealStories       = dynamic(() => import('@/components/landing/RealStories'),       { loading: () => <SectionSkeleton h={500} /> })
const GoogleReviews     = dynamic(() => import('@/components/landing/GoogleReviews'),     { loading: () => <SectionSkeleton h={480} /> })
const FAQ               = dynamic(() => import('@/components/landing/FAQ'),               { loading: () => <SectionSkeleton h={500} /> })

import Footer   from '@/components/landing/Footer'
import StickyBar from '@/components/StickyBar'
import { HairlineReveal } from '@/components/ui/HairlineReveal'

function SectionSkeleton({ h }: { h: number }) {
  return <div style={{ height: h }} className="w-full" aria-hidden="true" />
}

export default function Home() {
  return (
    <>
      <main className="pb-20">
        {/* Above the fold */}
        <Hero />
        <LogoWall />
        <TestimonialStrip />
        <WhoIsItFor />

        {/* Below the fold — streamed via Suspense */}
        <Suspense>
          <HairlineReveal />{/* cream → ink */}
          <ChooseProgram />
          <DesignedByAlumni />
          <HairlineReveal />{/* cream → ink */}
          <WhatWillYouLearn />
          <JourneyAndImpact />
          <WhyChooseUs />
          <ApplicationProcess />
          <ProgramOutcomes />
          <Certificate />
          <EveryLeaderCTA />
          <RealStories />
          <HairlineReveal />{/* cream → ink */}
          <GoogleReviews />
          <FAQ />
        </Suspense>
      </main>
      <Footer />
      <StickyBar />
    </>
  )
}
