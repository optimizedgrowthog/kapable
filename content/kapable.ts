// ─────────────────────────────────────────────────────────────────────────────
// content/kapable.ts
// Single source of truth for all copy, data, and config.
// Fork this file to adapt the page for a different coaching vertical.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Shared primitives ───────────────────────────────────────────────────────

export type IconKey =
  | 'founder'
  | 'cxo'
  | 'vp'
  | 'mic'
  | 'star'
  | 'person'
  | 'slides'
  | 'story'
  | 'network'
  | 'brain'
  | 'heart'
  | 'shield'
  | 'handshake'
  | 'lens'
  | 'peace'
  | 'live'
  | 'curriculum'
  | 'cohort'
  | 'feedback'
  | 'integrated'
  | 'flex'

// ─── Meta ─────────────────────────────────────────────────────────────────────

export interface MetaConfig {
  title: string
  description: string
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export interface HeadlinePart {
  text: string
  italic?: boolean
  light?: boolean
  break?: boolean
}

export interface SocialProof {
  learnersCount: string
  cohortsCount: string
  npsScore: string
  rating: string
  ratingLabel: string
}

export interface OfferConfig {
  originalPrice: string
  currentPrice: string
  discountLabel: string
  countdownSeconds: number
}

export interface HeroConfig {
  eyebrow: string
  headlineParts: HeadlinePart[]
  subline: string
  socialProof: SocialProof
  videoId: string
  videoThumbnail?: string
  videoCaptionBadges: string[]
  offer: OfferConfig
  ctaText: string
}

// ─── Logo Wall ────────────────────────────────────────────────────────────────

export interface LogoItem {
  name: string
  displayName?: string
  colorClass: string
  style?: 'serif' | 'sans'
  multiline?: boolean
  subtext?: string
}

export interface LogoWallConfig {
  heading: string
  logos: LogoItem[]
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string
  name: string
  role: string
  story: string
  gradient: string
  videoId?: string
}

export interface TestimonialsConfig {
  eyebrow: string
  heading: string
  subheading: string
  items: Testimonial[]
}

// ─── Who Is It For ────────────────────────────────────────────────────────────

export interface Persona {
  title: string
  description: string
  icon: IconKey
}

export interface WhoIsItForConfig {
  heading: string
  subheading: string
  personas: Persona[]
}

// ─── Choose Program ───────────────────────────────────────────────────────────

export type ModuleLayout = 'tall' | 'normal' | 'wide'

export interface ProgramModule {
  title: string
  description: string
  layout: ModuleLayout
  accentGradient?: string
}

export interface ChooseProgramConfig {
  heading: string
  subheading: string
  modules: ProgramModule[]
}

// ─── Designed By Alumni ───────────────────────────────────────────────────────

export type LogoStyle = 'serif' | 'sans' | 'google' | 'italic'

export interface AlumniInstitution {
  name: string
  subtext?: string
  colorClass: string
  style: LogoStyle
}

export interface DesignedByAlumniConfig {
  heading: string
  institutions: AlumniInstitution[]
}

// ─── What Will You Learn ──────────────────────────────────────────────────────

export interface LearnItem {
  title: string
  bullets: string[]
  icon: IconKey
}

export interface WhatWillYouLearnConfig {
  heading: string
  subheading: string
  items: LearnItem[]
}

// ─── Journey & Impact ─────────────────────────────────────────────────────────

export interface StatItem {
  value: string
  label: string
}

export interface JourneyAndImpactConfig {
  heading: string
  stats: StatItem[]
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────

export interface WhyItem {
  title: string
  bullets: string[]
  icon: IconKey
}

export interface WhyChooseUsConfig {
  heading: string
  subheading: string
  items: WhyItem[]
}

// ─── Application Process ──────────────────────────────────────────────────────

export interface ProcessStep {
  number: string
  title: string
  description: string
}

export interface ApplicationProcessConfig {
  heading: string
  subheading: string
  steps: ProcessStep[]
}

// ─── Program Outcomes ─────────────────────────────────────────────────────────

export interface ProgramOutcomesConfig {
  heading: string
  subheading: string
  outcomes: string[]
}

// ─── Certificate ──────────────────────────────────────────────────────────────

export interface CertificateConfig {
  heading: string
  bullets: string[]
  sampleName: string
  programName: string
  completionText: string
}

// ─── Every Leader CTA ─────────────────────────────────────────────────────────

export interface EveryLeaderCTAConfig {
  headingBefore: string
  emphasisWord: string
  headingAfter: string
  ctaText: string
}

// ─── Real Stories Carousel ────────────────────────────────────────────────────

export interface Story {
  name: string
  title: string
  quote: string
  initials: string
  gradient: string
}

export interface RealStoriesConfig {
  eyebrow: string
  heading: string
  subheading: string
  stories: Story[]
}

// ─── Google Reviews ───────────────────────────────────────────────────────────

export interface Review {
  name: string
  initials: string
  gradient: string
  text: string
}

export interface GoogleReviewsConfig {
  reviews: Review[]
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQConfig {
  heading: string
  items: FAQItem[]
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export interface FooterConfig {
  brand: string
  links: { label: string; href: string }[]
}

// ─── Sticky Bar ───────────────────────────────────────────────────────────────

export interface StickyBarConfig {
  cohortLabel: string
  features: string[]
  ctaText: string
  originalPrice: string
  currentPrice: string
  countdownSeconds: number
}

// ─── Root config ──────────────────────────────────────────────────────────────

export interface KapableConfig {
  meta: MetaConfig
  hero: HeroConfig
  logoWall: LogoWallConfig
  testimonials: TestimonialsConfig
  whoIsItFor: WhoIsItForConfig
  chooseProgram: ChooseProgramConfig
  designedByAlumni: DesignedByAlumniConfig
  whatWillYouLearn: WhatWillYouLearnConfig
  journeyAndImpact: JourneyAndImpactConfig
  whyChooseUs: WhyChooseUsConfig
  applicationProcess: ApplicationProcessConfig
  programOutcomes: ProgramOutcomesConfig
  certificate: CertificateConfig
  everyLeaderCTA: EveryLeaderCTAConfig
  realStories: RealStoriesConfig
  googleReviews: GoogleReviewsConfig
  faq: FAQConfig
  footer: FooterConfig
  stickyBar: StickyBarConfig
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

export const kapable: KapableConfig = {
  meta: {
    title: 'Think, Speak and Lead with Confidence | Kapable',
    description:
      "Kapable's Leadership Acceleration Program — 1-on-1 coaching designed to help founders, CXOs, and senior leaders communicate with conviction and lead at the level they are capable of.",
  },

  hero: {
    eyebrow: 'For Leaders Who Want To',
    headlineParts: [
      { text: 'Think, Speak ' },
      { text: 'and', italic: true, light: true },
      { text: ' Lead ' },
      { text: 'with', italic: true, light: true },
      { text: '', break: true },
      { text: 'Confidence' },
    ],
    subline: 'Lead at the Level You Are Capable Of',
    socialProof: {
      learnersCount: '4,000+',
      cohortsCount: '33',
      npsScore: '80+',
      rating: '4.9/5',
      ratingLabel: 'Average Rating',
    },
    videoId: 'dQw4w9WgXcQ',
    videoCaptionBadges: ['amazon', 'Kapable'],
    offer: {
      originalPrice: '₹5,299',
      currentPrice: '₹499',
      discountLabel: '50% OFF',
      countdownSeconds: 5 * 3600 + 42 * 60 + 57,
    },
    ctaText: 'Book a 1-on-1 Leadership Coaching Session →',
  },

  logoWall: {
    heading: 'Trusted By Leaders From Top Global Companies',
    logos: [
      { name: 'TATA',           colorClass: 'text-ink',      style: 'sans' },
      { name: 'HDFC BANK',      colorClass: 'text-red-600',  style: 'sans' },
      { name: 'Booking',        colorClass: 'text-blue-800', style: 'sans' },
      { name: 'airbnb',         colorClass: 'text-red-500',  style: 'sans' },
      { name: 'Adobe',          colorClass: 'text-red-600',  style: 'sans' },
      { name: 'Intuit',         colorClass: 'text-ink',      style: 'sans' },
      { name: 'VISA',           colorClass: 'text-blue-600', style: 'sans' },
      { name: 'BARCLAYS',       colorClass: 'text-blue-900', style: 'sans' },
      { name: 'AMERICAN\nEXPRESS', colorClass: 'text-blue-800', multiline: true },
      { name: 'amazon',         colorClass: 'text-amber-500',style: 'sans' },
      { name: 'HSBC',           colorClass: 'text-red-600',  style: 'sans' },
      { name: 'Morgan\nStanley',colorClass: 'text-ink',      multiline: true },
    ],
  },

  testimonials: {
    eyebrow: 'Real Stories,',
    heading: 'Real Transformations',
    subheading:
      'Hear firsthand success stories and experiences from our learners, showcasing the transformative impact of our program.',
    items: [
      {
        id: 'marwa',
        name: 'Marwa Mahgoub',
        role: 'Marketing Director',
        story:
          'Went from freezing in boardrooms to leading regional strategy meetings with conviction — now heading a 14-person team.',
        gradient: 'linear-gradient(180deg, #8F6B4E 0%, #5A4330 100%)',
      },
      {
        id: 'roland',
        name: 'Roland Raposo',
        role: 'Senior Manager, Operations',
        story:
          'The program helped me find my leadership voice. I now run cross-functional meetings with clarity and command a room I once dreaded walking into.',
        gradient: 'linear-gradient(180deg, #3A3A3A 0%, #1A1A1A 100%)',
      },
      {
        id: 'srikari',
        name: 'Srikari SP',
        role: 'Product Manager',
        story:
          "Three months in, I shipped two cross-team initiatives entirely on the strength of stakeholder buy-in I'd never been able to create before.",
        gradient: 'linear-gradient(180deg, #7A5C3E 0%, #4A3220 100%)',
      },
      {
        id: 'nikhita',
        name: 'Nikhita Banta',
        role: 'VP, Engineering',
        story:
          'I used to over-prepare for every senior conversation. Kapable gave me frameworks to think fast and speak with authority — even when I don\'t have all the answers.',
        gradient: 'linear-gradient(180deg, #2E2E2E 0%, #181818 100%)',
      },
      {
        id: 'jijesh',
        name: 'Jijesh Nanu',
        role: 'Director, Sales',
        story:
          'My team noticed the shift before I did. Within a month of starting, my one-on-ones became conversations, not updates — and my pipeline followed.',
        gradient: 'linear-gradient(180deg, #9A7050 0%, #6A4A2A 100%)',
      },
      {
        id: 'nehya',
        name: 'Nehya Mohindra',
        role: 'Founder & CEO',
        story:
          'Fundraising became dramatically easier once I could tell our story with genuine conviction. Closed our seed round two weeks after finishing the program.',
        gradient: 'linear-gradient(180deg, #3D3D3D 0%, #1D1D1D 100%)',
      },
      {
        id: 'pramod',
        name: 'Pramod Prabhakaran',
        role: 'Chief Technology Officer',
        story:
          'I was technically strong but struggled to translate vision to non-technical stakeholders. Kapable fixed that — I now present to the board with confidence.',
        gradient: 'linear-gradient(180deg, #8A6845 0%, #5A3A1A 100%)',
      },
      {
        id: 'ritika',
        name: 'Ritika Khare',
        role: 'L&D Manager',
        story:
          'Having gone through Kapable myself, I now recommend it to every high-potential leader in my organisation. The impact is measurable and immediate.',
        gradient: 'linear-gradient(180deg, #323232 0%, #1A1A1A 100%)',
      },
      {
        id: 'prateek',
        name: 'Prateek Chawla',
        role: 'General Manager',
        story:
          'The negotiation module alone was worth it. I walked into a vendor renegotiation that had been stalled for months and wrapped it in one session.',
        gradient: 'linear-gradient(180deg, #7E5C3A 0%, #4E3010 100%)',
      },
      {
        id: 'gladys',
        name: 'Gladys Mathau',
        role: 'Head of Marketing',
        story:
          'Public speaking was my biggest block — I\'d avoid it whenever I could. Eight weeks later I gave a TEDx-style talk to 400 people and loved every second.',
        gradient: 'linear-gradient(180deg, #383838 0%, #1C1C1C 100%)',
      },
      {
        id: 'nirupam',
        name: 'Nirupam S',
        role: 'Associate Director',
        story:
          'What makes Kapable different is the 1-on-1 depth. My trainer knew exactly which habits were holding me back — and gave me specific tools to break them.',
        gradient: 'linear-gradient(180deg, #96724E 0%, #5E421E 100%)',
      },
    ],
  },

  whoIsItFor: {
    heading: 'Who Is This Program For?',
    subheading:
      'Most leadership programs teach theory. This one identifies the exact habits costing you influence — then fixes them.',
    personas: [
      {
        title: 'Founders And Entrepreneurs',
        description:
          "You've built something real — now you need to sell the vision, recruit believers, and lead people who didn't sign up for chaos.",
        icon: 'founder',
      },
      {
        title: 'CXOs And Directors',
        description:
          'Your decisions move millions, but your executive presence determines whether the room moves with you or waits you out.',
        icon: 'cxo',
      },
      {
        title: 'Vice Presidents And Senior Managers',
        description:
          "The jump from manager to VP is 90% communication. You're already in the room — now learn to own it.",
        icon: 'vp',
      },
    ],
  },

  chooseProgram: {
    heading: 'Choose And Customise Your Program',
    subheading:
      'Tailor your learning experience to achieve your personal and professional excellence.',
    modules: [
      {
        title: 'Fast, Fluent & Structured Thinking',
        description:
          'Enhance your ability to think quickly and clearly to enable you to solve problems efficiently.',
        layout: 'tall',
        accentGradient: 'linear-gradient(180deg, #B8894F 0%, #7A5730 100%)',
      },
      {
        title: 'Leadership & Team Management',
        description:
          'Develop key leadership and team management skills to motivate and lead your team to success.',
        layout: 'normal',
      },
      {
        title: 'Influence & Charisma',
        description:
          'Build a charismatic presence and learn to influence others, fostering strong relationships.',
        layout: 'normal',
      },
      {
        title: 'Power Presentation & Storytelling',
        description:
          'Master the art of crafting engaging stories and delivering impactful presentations.',
        layout: 'normal',
      },
      {
        title: 'Negotiation & Persuasion',
        description:
          'Learn to negotiate skilfully and persuade effectively to achieve mutually beneficial outcomes.',
        layout: 'normal',
      },
      {
        title: 'Communication & Public Speaking',
        description:
          'Boost your confidence in speaking by preparing engaging and inspiring any audience with ease.',
        layout: 'wide',
        accentGradient: 'linear-gradient(135deg, #F5C89B 0%, #B8894F 100%)',
      },
    ],
  },

  designedByAlumni: {
    heading: 'Program Designed By Alumni Of',
    institutions: [
      { name: 'HARVARD',      subtext: 'UNIVERSITY',            colorClass: 'text-red-800',  style: 'serif' },
      { name: 'Wharton',      subtext: 'UNIVERSITY of PENNSYLVANIA', colorClass: 'text-blue-900', style: 'serif' },
      { name: 'IIT',          subtext: 'delhi',                 colorClass: 'text-ink',      style: 'sans' },
      { name: 'IIM',          subtext: 'Ahmedabad',             colorClass: 'text-blue-900', style: 'sans' },
      { name: 'ISB',          colorClass: 'text-blue-700',      style: 'italic' },
      { name: 'ESADE',        colorClass: 'text-red-700',       style: 'sans' },
      { name: 'OXFORD',       subtext: 'UNIVERSITY PRESS',      colorClass: 'text-blue-900', style: 'serif' },
      { name: 'Google',       colorClass: 'text-ink',           style: 'google' },
      { name: 'TIMES',        subtext: 'INTERNET',              colorClass: 'text-ink',      style: 'sans' },
      { name: 'Deloitte.',    colorClass: 'text-green-700',     style: 'sans' },
      { name: 'amazon',       colorClass: 'text-amber-500',     style: 'sans' },
      { name: 'TEACHFORINDIA',colorClass: 'text-red-600',       style: 'sans' },
    ],
  },

  whatWillYouLearn: {
    heading: 'What Will You Learn?',
    subheading:
      '12 modules, each targeting a specific leadership gap — no theory that does not translate to Monday morning.',
    items: [
      {
        title: 'Master Public Speaking',
        bullets: [
          'Deliver confident talks in any setting',
          'Control tone, pace, and body language',
        ],
        icon: 'mic',
      },
      {
        title: 'Influence and Persuasion',
        bullets: [
          'Build strong professional influence',
          'Get buy-in without authority',
        ],
        icon: 'star',
      },
      {
        title: 'Build a Strong Personal Brand',
        bullets: [
          'Position yourself as an industry voice',
          'Craft a signature narrative',
        ],
        icon: 'person',
      },
      {
        title: 'Deliver Impactful Presentations',
        bullets: [
          'Structure slides for maximum clarity',
          'Open and close with impact',
        ],
        icon: 'slides',
      },
      {
        title: 'Master Storytelling',
        bullets: [
          'Turn data into memorable stories',
          'Use emotion to drive decisions',
        ],
        icon: 'story',
      },
      {
        title: 'Network Effectively',
        bullets: [
          'Develop strategies for effective networking at events',
          'Learn to build and maintain professional relationships',
        ],
        icon: 'network',
      },
      {
        title: 'Sharpen Strategic Thinking',
        bullets: [
          'See the bigger picture fast',
          'Make high-leverage decisions',
        ],
        icon: 'brain',
      },
      {
        title: 'Develop Emotional Intelligence',
        bullets: [
          'Read the room in any conversation',
          'Manage reactions under pressure',
        ],
        icon: 'heart',
      },
      {
        title: 'Adapt Leadership Styles',
        bullets: [
          'Shift between coach, director, and ally',
          'Match style to situation',
        ],
        icon: 'shield',
      },
      {
        title: 'Negotiate Successfully',
        bullets: [
          'Anchor with confidence',
          'Close wins without burning relationships',
        ],
        icon: 'handshake',
      },
      {
        title: 'Enhance Critical Thinking',
        bullets: [
          'Stress-test assumptions',
          'Separate signal from noise',
        ],
        icon: 'lens',
      },
      {
        title: 'Resolve Conflicts Constructively',
        bullets: [
          'De-escalate tough conversations',
          'Turn disagreement into alignment',
        ],
        icon: 'peace',
      },
    ],
  },

  journeyAndImpact: {
    heading: 'Our Journey And Impact',
    stats: [
      { value: '30,000+', label: 'Learning Hours' },
      { value: '4,000+',  label: 'Learners' },
      { value: '70.25',   label: 'Net Promoter Score' },
      { value: '35+',     label: 'Industries' },
    ],
  },

  whyChooseUs: {
    heading: 'Why Should You Choose Our Program?',
    subheading:
      "Everything here is built around one constraint: you're already busy. This program works around your schedule, not the other way around.",
    items: [
      {
        title: 'Live 1-on-1 Training',
        bullets: [
          'Customised skill development sessions',
          'Align personal and career goals',
          'Expert-guided problem solving',
        ],
        icon: 'live',
      },
      {
        title: 'Personalised Curriculum',
        bullets: [
          'Industry-specific modules',
          'Hands-on skill application',
          'Immediate impactful results',
        ],
        icon: 'curriculum',
      },
      {
        title: 'Cohort Connect',
        bullets: [
          'Insights from diverse industries',
          'Network with driven leaders',
          'Real-world interactive sessions',
        ],
        icon: 'cohort',
      },
      {
        title: 'Granular Feedback',
        bullets: [
          'Detailed, focused feedback',
          'Access tailored resources',
          'Customised growth roadmap',
        ],
        icon: 'feedback',
      },
      {
        title: 'Integrated Approach',
        bullets: [
          '1-on-1 sessions, cohort exercises, and async modules',
          'Skills reinforced across multiple contexts',
          'Reference materials matched to your role',
        ],
        icon: 'integrated',
      },
      {
        title: 'Flexibility',
        bullets: [
          'Fully online — no commute, no classroom',
          'Sessions fit around your calendar, not the other way around',
        ],
        icon: 'flex',
      },
    ],
  },

  applicationProcess: {
    heading: 'Application Process',
    subheading: 'Take the first step towards your leadership transformation.',
    steps: [
      {
        number: '01',
        title: 'Schedule Your 1-on-1 Leadership Session',
        description:
          'Choose a convenient slot to book your personalised session with one of our leadership coaches.',
      },
      {
        number: '02',
        title: 'Pre-Session Conversation',
        description:
          "Before your session, our program advisors will connect with you to understand your role, challenges, and goals. You'll also get clarity on what to expect and an overview of the program, ensuring it's tailored to your context.",
      },
      {
        number: '03',
        title: 'Attend Your 1-on-1 Leadership Session',
        description:
          "In this session, your trainer identifies your skill patterns and gaps. You'll walk away with self-awareness, clarity on your leadership challenges, and insights on what it takes to perform at your best.",
      },
      {
        number: '04',
        title: 'Begin Your Leadership Journey',
        description:
          'After your session, if you liked the experience and found value in the approach, you can continue into the Leadership Program. Your personalised roadmap will then be built around your goals, context, and growth plan.',
      },
    ],
  },

  programOutcomes: {
    heading: 'Program Outcomes',
    subheading:
      'By the end of 12 weeks, these are the four things your peers will notice first.',
    outcomes: [
      'Communicate with Conviction',
      'Navigate Challenges Smoothly',
      'Think Innovatively',
      'Lead with Authority',
    ],
  },

  certificate: {
    heading: 'Earn your leadership certification',
    bullets: [
      'Proof of 12 weeks of live coaching and assessed exercises',
      'Shareable on LinkedIn with a direct endorsement from Kapable coaches',
      'Recognised by ILCA as a certified leadership practitioner',
    ],
    sampleName: 'Zechariah Jacob',
    programName: 'Leadership Acceleration Program',
    completionText:
      'has successfully completed the Leadership Acceleration Program and demonstrated mastery across communication, influence, and strategic leadership.',
  },

  everyLeaderCTA: {
    headingBefore: 'Every Leader is Different. One size',
    emphasisWord: 'DOES NOT',
    headingAfter: 'fit all',
    ctaText: 'Book Your First Session for Rs. 499',
  },

  realStories: {
    eyebrow: 'Real Stories,',
    heading: 'Real Transformations',
    subheading:
      'Hear first-hand success stories and experiences from our learners, showcasing the transformative impact of our program.',
    stories: [
      {
        name: 'Shreyas Tanse',
        title: 'Sr. Analyst',
        quote:
          'Kapable has empowered me to handle challenging situations with ease. I overcame fears of authority, enhanced my negotiation skills, and gained confidence.',
        initials: 'ST',
        gradient: 'linear-gradient(135deg, #8F6B4E, #5A4330)',
      },
      {
        name: 'Pooja Verma',
        title: 'Product Lead',
        quote:
          "I never thought I'd be comfortable presenting to C-suite leadership. Three months in, it became my favourite part of the job.",
        initials: 'PV',
        gradient: 'linear-gradient(135deg, #6BA3F5, #3578E0)',
      },
      {
        name: 'Arjun Mehta',
        title: 'Co-founder',
        quote:
          "Kapable helped me articulate my vision in a way my team could rally around. We closed our Series A six weeks after completing the program.",
        initials: 'AM',
        gradient: 'linear-gradient(135deg, #9B6BF5, #6A35E0)',
      },
      {
        name: 'Sunita Rao',
        title: 'VP, Customer Success',
        quote:
          'The storytelling module fundamentally changed how I run QBRs. My NPS with stakeholders jumped 18 points in one quarter.',
        initials: 'SR',
        gradient: 'linear-gradient(135deg, #F56BA3, #E03578)',
      },
    ],
  },

  googleReviews: {
    reviews: [
      {
        name: 'Poorna',
        initials: 'P',
        gradient: 'linear-gradient(135deg, #6BF5A3, #35E078)',
        text:
          "I recently completed Kapable's Leadership Acceleration Program, and it exceeded my expectations. As a seasoned professional aiming to enhance my communication and leadership skills, I found the program well-structured, with practical strategies I could apply immediately. The trainers were knowledgeable, attentive, and flexible, addressing each participant's unique needs. This personalised approach made a real impact on my learning journey, boosting my confidence and equipping me to lead effectively.",
      },
      {
        name: 'Smriti',
        initials: 'S',
        gradient: 'linear-gradient(135deg, #F56BA3, #E03578)',
        text:
          "I recently completed Kapable's Leadership Acceleration Program, and it was truly life-changing. The program's structure, content, and facilitators were all top-notch. I gained invaluable insights, developed and honed new skills, and connected with an amazing community of leaders. Thank you so much team Kapable. A big shout out to Sejal, Chahat, Krit and Sanjana for the enlightening sessions. Thanks Shreya and Kabir for the wonderful support throughout. Thank you to the entire team for an unforgettable experience.",
      },
      {
        name: 'Naveen Kumar R',
        initials: 'N',
        gradient: 'linear-gradient(135deg, #6BA3F5, #3578E0)',
        text:
          "As a seasoned copywriter, I was comfortable with words — until I had to speak them in front of a crowd. Years of anxiety held me back until I took a leap of faith with Kapable. Over three months, I unlearned old habits and gained new tools through a blend of personalised sessions and engaging group exercises. Each trainer brought unique insights with patience, understanding, and a smile. Now, I feel that this is just the start of a lasting transformation, with Kapable's support continuing beyond the course.",
      },
    ],
  },

  faq: {
    heading: 'Frequently Asked Questions',
    items: [
      {
        question: 'What is the program about?',
        answer:
          "The Kapable Leadership Acceleration Program is a 3-month 1-on-1 and cohort-based program focused on communication, influence, and leadership presence — designed for working professionals.",
      },
      {
        question: 'Who is this program for?',
        answer:
          'Founders, CXOs, directors, VPs, and senior managers who want to think, speak, and lead with greater confidence and clarity.',
      },
      {
        question: 'What is the duration and schedule of this program?',
        answer:
          'The program runs over 12 weeks with weekly 1-on-1 sessions and cohort group exercises. Sessions are fully online and scheduled around your availability.',
      },
      {
        question: 'Who will be the trainers?',
        answer:
          'Trainers are alumni of Harvard, Wharton, IIM, ISB, and leaders from Google, Amazon, Deloitte, and Times Internet with deep coaching experience.',
      },
      {
        question: 'Will I receive a certificate upon completion?',
        answer:
          'Yes — upon successful completion you receive a Kapable Certificate of Completion that validates your growth and can be showcased on LinkedIn and your professional profile.',
      },
      {
        question: 'How does this program ensure relevance to my industry?',
        answer:
          'Every curriculum is personalised to your industry, role, and specific leadership challenges — built around a pre-session conversation that identifies your context and goals.',
      },
    ],
  },

  footer: {
    brand: '⬡ Kapable',
    links: [
      { label: 'Terms & Conditions', href: '#' },
      { label: 'Privacy Policy',     href: '#' },
    ],
  },

  stickyBar: {
    cohortLabel: 'Cohort starting on 9th May, 2026',
    features: ['1-on-1 sessions', 'Live online', '60 seats only'],
    ctaText: 'Book Your 1-on-1 Leadership Session',
    originalPrice: '₹5,299',
    currentPrice: '₹499',
    countdownSeconds: 5 * 3600 + 42 * 60 + 57,
  },
}
