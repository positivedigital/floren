'use client'

import { Search, Building2, UserRound, GraduationCap, Star, CircleHelp, ClipboardCheck, Play, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SolutionCard from '@/components/solution-card'
import ImagePlaceholder from '@/components/image-placeholder'
import AudiencePills from '@/components/audience-pills'

const heroContent = {
  tagline: 'Hét leerplatform voor de zorg',
  title: 'De beste zorgkennis. Altijd dichtbij.',
  description: 'Floren helpt zorgorganisaties, professionals en het onderwijs om slimmer en effectiever te leren. Kies hieronder wat bij jou past.',
  image: '/images/photos/care-conversation.jpg',
}

const audienceCards = [
  { icon: Building2, title: 'Organisatie', description: 'Voor L&D en HR. Leeroplossingen, abonnementen en implementatie voor je hele organisatie.', href: '/organisatie' },
  { icon: UserRound, title: 'Professional', description: 'Voor zorgprofessionals. Accreditatiepunten, masterclasses en kennis op maat.', href: '/professional' },
  { icon: GraduationCap, title: 'Onderwijs', description: 'Voor docenten en studenten. Lesmateriaal, leeroplossingen en resources.', href: '/onderwijs' },
]

const bentoContent = [
  { icon: Star, title: 'Punten halen?' },
  { icon: CircleHelp, title: 'Twijfel bij cliënt?' },
  { icon: ClipboardCheck, title: 'Nieuwe richtlijn?' },
  { icon: Play, title: 'Video-uitleg' },
]

const solutionsContent = [
  { slug: 'zorgpad-professional', type: 'E-learning', title: 'ZorgPad Professional', description: 'Meer dan 600 leerpaden voor zorgprofessionals. Praktijkgericht en evidence-based.', branches: ['GGZ', 'V&V', 'Thuiszorg', 'Ziekenhuis'], image: '/images/photos/solution-elearning.jpg' },
  { slug: 'studytube', type: 'Platform', title: 'Studytube', description: 'Hét LXP/LMS voor de zorg. Autonomie, compliance en kwalificatiebeheer.', branches: ['GGZ', 'V&V', 'Thuiszorg'], image: '/images/photos/solution-platform.jpg' },
  { slug: 'leerstrategie', type: 'Consultancy', title: 'Leerstrategie', description: 'Van visie naar leercultuur. Samen met onze consultants.', branches: ['Alle branches'], image: '/images/photos/solution-consultancy.jpg' },
]

export default function HomeClient() {
  const hero = heroContent
  const cards = audienceCards
  const bento = bentoContent
  const solutions = solutionsContent

  return (
    <div>
      {/* Hero */}
      <section className="py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 py-1 px-3 bg-floren-lavender rounded-full text-xs font-medium mb-4 lg:mb-5">
            {hero.tagline}
          </div>
          <h1 className="text-[2rem] lg:text-5xl font-extrabold leading-[1.05] tracking-tight mb-4 lg:mb-5">
            {hero.title}
          </h1>
          <p className="text-base lg:text-lg text-floren-text-body mb-6 lg:mb-8 max-w-[460px]">
            {hero.description}
          </p>
          {/* Audience pills */}
          <div className="mb-5 lg:mb-8">
            <AudiencePills active="alles" />
          </div>
          {/* Search */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 lg:gap-3 p-2 bg-white border border-floren-border rounded-xl shadow-sm max-w-[460px]"
          >
            <Search className="w-4 h-4 text-floren-text-muted ml-2" />
            <input
              className="flex-1 py-2 outline-none text-sm bg-transparent"
              placeholder="Wat speelt er bij jou vandaag?"
            />
            <button
              type="submit"
              className="bg-floren-primary text-white rounded-lg px-4 lg:px-5 py-2 text-sm font-bold hover:bg-floren-secondary transition-colors"
            >
              Zoek
            </button>
          </form>
        </div>
        <ImagePlaceholder label="Hero afbeelding" className="h-[220px] lg:h-[420px] rounded-2xl" src={hero.image} />
      </section>

      {/* AUDIENCE ROUTING */}
      <section className="pb-10 lg:pb-16">
        <p className="text-sm font-semibold tracking-[0.7px] uppercase text-floren-text-body mb-4 lg:mb-5">
          Kies jouw ingang
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="p-6 lg:p-7 bg-floren-card rounded-2xl flex flex-col gap-3 lg:gap-4 hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 rounded-xl bg-floren-primary text-white flex items-center justify-center">
                <card.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold">{card.title}</h3>
              <p className="text-floren-text-body text-sm flex-1">{card.description}</p>
              <span className="text-sm font-bold text-floren-text flex items-center gap-1 group-hover:gap-2 transition-all">
                Naar {card.title} <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* SNEL VOOR JOU */}
      <section className="pb-10 lg:pb-16">
        <p className="text-sm font-semibold tracking-[0.7px] uppercase text-floren-text-body mb-4 lg:mb-5">Snel voor jou</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {bento.map((item) => (
            <article
              key={item.title}
              className="p-4 lg:p-5 h-[120px] lg:h-[150px] bg-floren-card rounded-xl flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow"
            >
              <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-floren-neutral" />
              <h4 className="text-base lg:text-xl font-semibold">{item.title}</h4>
            </article>
          ))}
        </div>
      </section>

      {/* FEATURED SOLUTIONS */}
      <section className="pb-10 lg:pb-16">
        <div className="flex items-end justify-between mb-4 lg:mb-5">
          <h2 className="text-2xl lg:text-3xl font-semibold">Uitgelichte leeroplossingen</h2>
          <Link href="/leeroplossingen" className="text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
            Bekijk alles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {solutions.map((sol) => (
            <SolutionCard key={sol.title} type={sol.type} title={sol.title} description={sol.description} branches={sol.branches} image={sol.image} href={`/leeroplossingen/${sol.slug}`} />
          ))}
        </div>
      </section>
    </div>
  )
}
