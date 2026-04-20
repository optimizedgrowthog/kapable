import Hero              from '@/components/landing/Hero'
import LogoWall          from '@/components/landing/LogoWall'
import TestimonialStrip  from '@/components/landing/TestimonialStrip'
import WhoIsItFor        from '@/components/landing/WhoIsItFor'
import ChooseProgram     from '@/components/landing/ChooseProgram'
import DesignedByAlumni  from '@/components/landing/DesignedByAlumni'
import WhatWillYouLearn  from '@/components/landing/WhatWillYouLearn'
import JourneyAndImpact  from '@/components/landing/JourneyAndImpact'
import WhyChooseUs       from '@/components/landing/WhyChooseUs'
import ApplicationProcess from '@/components/landing/ApplicationProcess'
import ProgramOutcomes   from '@/components/landing/ProgramOutcomes'
import Certificate       from '@/components/landing/Certificate'
import EveryLeaderCTA    from '@/components/landing/EveryLeaderCTA'
import RealStories       from '@/components/landing/RealStories'
import GoogleReviews     from '@/components/landing/GoogleReviews'
import FAQ               from '@/components/landing/FAQ'
import Footer            from '@/components/landing/Footer'
import StickyBar         from '@/components/StickyBar'

export default function Home() {
  return (
    <>
      <main className="pb-20">
        <Hero />
        <LogoWall />
        <TestimonialStrip />
        <WhoIsItFor />
        <ChooseProgram />
        <DesignedByAlumni />
        <WhatWillYouLearn />
        <JourneyAndImpact />
        <WhyChooseUs />
        <ApplicationProcess />
        <ProgramOutcomes />
        <Certificate />
        <EveryLeaderCTA />
        <RealStories />
        <GoogleReviews />
        <FAQ />
      </main>
      <Footer />
      <StickyBar />
    </>
  )
}
