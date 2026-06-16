'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, X, Brain, Stethoscope, Cross, HeartPulse, GraduationCap } from 'lucide-react'

/* ============================================================
   BRANCH DATA — each branch has its own hero + solutions
   ============================================================ */
interface Solution {
  slug: string
  title: string
  audienceTag: string          // e.g. "VOOR: PSYCHIATER"
  audienceTagColor: 'dark' | 'green' | 'purple'  // visual style
  secondaryTag: string         // e.g. "Geaccrediteerd +4pt"
  secondaryTagColor: 'olive' | 'mint' | 'blue'
  features: string[]
  roles: string[]              // which role filter pills match
  accredited: boolean
}

interface BranchContext {
  id: string
  label: string
  heroLabel: string
  heroTitle: string
  heroDescription: string
  heroImage: string
  roles: { icon: React.ElementType; label: string; filter: string }[]
  filterOptions: string[]
  solutions: Solution[]
}

const branches: BranchContext[] = [
  {
    id: 'ggz',
    label: 'GGZ',
    heroLabel: 'GGZ Professionals',
    heroTitle: 'Kies je specialisme \u2013 nu 20% korting',
    heroDescription: 'Verdiep je klinische expertise met onze geaccrediteerde nascholingsprogramma\u2019s. Ontworpen voor de moderne GGZ-professional: wetenschappelijk onderbouwd en direct toepasbaar in de praktijk.',
    heroImage: '/images/photos/psy-gesprek-1.jpg',
    roles: [
      { icon: Brain, label: 'Psycholoog', filter: 'Psychologen' },
      { icon: Stethoscope, label: 'Psychiater', filter: 'Psychiaters' },
      { icon: Cross, label: 'POH-GGZ', filter: 'POH-GGZ' },
      { icon: HeartPulse, label: 'Verpleegkundig', filter: 'Verpleegkundig / VS' },
      { icon: GraduationCap, label: 'Student', filter: 'Studenten' },
    ],
    filterOptions: ['Psychologen', 'Psychiaters', 'POH-GGZ', 'Verpleegkundig / VS', 'Online 24/7'],
    solutions: [
      {
        slug: 'psy-expert',
        title: 'PsyXpert',
        audienceTag: 'VOOR: PSYCHIATER',
        audienceTagColor: 'dark',
        secondaryTag: 'Geaccrediteerd +4pt',
        secondaryTagColor: 'olive',
        features: ['Focus op biologische psychiatrie', 'Incl. kwartaalmagazine en e-learning'],
        roles: ['Psychologen', 'Psychiaters'],
        accredited: true,
      },
      {
        slug: 'microlearning',
        title: 'Psyfar',
        audienceTag: 'VOOR: PSYCHIATER',
        audienceTagColor: 'dark',
        secondaryTag: 'Online 24/7',
        secondaryTagColor: 'mint',
        features: ['Onafhankelijke psychofarmacologie', 'Onbeperkt toegang tot kennisbank'],
        roles: ['Psychiaters', 'Online 24/7'],
        accredited: false,
      },
      {
        slug: 'protocollen',
        title: 'Psyfar VS',
        audienceTag: 'VOOR: VS',
        audienceTagColor: 'purple',
        secondaryTag: 'Geaccrediteerd',
        secondaryTagColor: 'olive',
        features: ['Specifiek voor Verpleegkundig Specialisten', 'Focus op medicatiemanagement'],
        roles: ['Verpleegkundig / VS'],
        accredited: true,
      },
      {
        slug: 'assessor',
        title: 'AccreDidact POH-GGZ',
        audienceTag: 'VOOR: POH-GGZ',
        audienceTagColor: 'dark',
        secondaryTag: '+2pt per module',
        secondaryTagColor: 'olive',
        features: ['Zelfstudie met online toetsing', 'Breed scala aan GGZ-onderwerpen'],
        roles: ['POH-GGZ'],
        accredited: true,
      },
      {
        slug: 'zorgpad-plug-and-play',
        title: 'Nurse Academy GGZ',
        audienceTag: 'VERPLEEGKUNDIGE',
        audienceTagColor: 'green',
        secondaryTag: 'V&VN erkend',
        secondaryTagColor: 'mint',
        features: ['Praktijkgerichte casu\u00EFstiek', 'Incl. onbeperkt online e-learnings'],
        roles: ['Verpleegkundig / VS'],
        accredited: true,
      },
      {
        slug: 'zorgpad-professional',
        title: 'KLIK',
        audienceTag: 'VOOR: PSYCHOLOOG',
        audienceTagColor: 'purple',
        secondaryTag: 'NIP/NVO',
        secondaryTagColor: 'blue',
        features: ['Klinische Psychologie voor de praktijk', "Maandelijkse verdieping in thema's"],
        roles: ['Psychologen'],
        accredited: true,
      },
    ],
  },
  {
    id: 'vvt',
    label: 'VVT',
    heroLabel: 'VVT Professionals',
    heroTitle: 'Nascholing voor verpleging, verzorging en thuiszorg',
    heroDescription: 'Praktijkgericht leren voor VVT-medewerkers. Van medicatieveiligheid tot palliatieve zorg, altijd geaccrediteerd en direct toepasbaar.',
    heroImage: '/images/photos/hero-professional.jpg',
    roles: [
      { icon: HeartPulse, label: 'Verpleegkundige', filter: 'Verpleegkundigen' },
      { icon: Cross, label: 'Verzorgende IG', filter: 'Verzorgenden' },
      { icon: Stethoscope, label: 'Wijkverpleegkundige', filter: 'Wijkverpleegkundigen' },
      { icon: Brain, label: 'Teamleider', filter: 'Teamleiders' },
      { icon: GraduationCap, label: 'Student', filter: 'Studenten' },
    ],
    filterOptions: ['Verpleegkundigen', 'Verzorgenden', 'Wijkverpleegkundigen', 'Teamleiders'],
    solutions: [
      {
        slug: 'zorgpad-professional',
        title: 'Nurse Academy',
        audienceTag: 'VERPLEEGKUNDIGE',
        audienceTagColor: 'green',
        secondaryTag: 'V&VN erkend',
        secondaryTagColor: 'mint',
        features: ['Brede nascholing verpleegkunde', 'V&VN geaccrediteerd'],
        roles: ['Verpleegkundigen', 'Wijkverpleegkundigen'],
        accredited: true,
      },
      {
        slug: 'zorgpad-plug-and-play',
        title: 'Zorgpad Plug & Play',
        audienceTag: 'VOOR: TEAMS',
        audienceTagColor: 'dark',
        secondaryTag: 'Direct inzetbaar',
        secondaryTagColor: 'mint',
        features: ['Kant-en-klare leerpaden', 'Inclusief toetsing en certificering'],
        roles: ['Verpleegkundigen', 'Verzorgenden'],
        accredited: true,
      },
      {
        slug: 'microlearning',
        title: 'Microlearning VVT',
        audienceTag: 'VOOR: IEDEREEN',
        audienceTagColor: 'dark',
        secondaryTag: 'Online 24/7',
        secondaryTagColor: 'olive',
        features: ['Korte modules van 10-15 min', 'Ideaal voor drukke roosters'],
        roles: ['Verpleegkundigen', 'Verzorgenden', 'Wijkverpleegkundigen'],
        accredited: false,
      },
    ],
  },
  {
    id: 'gehandicaptenzorg',
    label: 'Gehandicaptenzorg',
    heroLabel: 'Gehandicaptenzorg Professionals',
    heroTitle: 'Scholing op maat voor begeleiders en zorgprofessionals',
    heroDescription: 'Versterk je kennis in de gehandicaptenzorg. Van persoonsgericht werken tot complexe zorgvragen, altijd evidence-based.',
    heroImage: '/images/photos/branch-gehandicaptenzorg.jpg',
    roles: [
      { icon: HeartPulse, label: 'Begeleider', filter: 'Begeleiders' },
      { icon: Brain, label: 'Gedragskundige', filter: 'Gedragskundigen' },
      { icon: Stethoscope, label: 'Verpleegkundige', filter: 'Verpleegkundigen' },
      { icon: GraduationCap, label: 'Student', filter: 'Studenten' },
    ],
    filterOptions: ['Begeleiders', 'Gedragskundigen', 'Verpleegkundigen'],
    solutions: [
      {
        slug: 'zorgpad-professional',
        title: 'Zorgpad Professional GHZ',
        audienceTag: 'VOOR: BEGELEIDER',
        audienceTagColor: 'dark',
        secondaryTag: 'Geaccrediteerd',
        secondaryTagColor: 'olive',
        features: ['Persoonsgericht werken', 'Methodisch handelen'],
        roles: ['Begeleiders'],
        accredited: true,
      },
      {
        slug: 'microlearning',
        title: 'Microlearning GHZ',
        audienceTag: 'VOOR: TEAMS',
        audienceTagColor: 'dark',
        secondaryTag: 'Online 24/7',
        secondaryTagColor: 'mint',
        features: ['Korte praktijkgerichte modules', 'Ideaal naast het werk'],
        roles: ['Begeleiders', 'Gedragskundigen'],
        accredited: false,
      },
    ],
  },
]

/* ============================================================
   TAG COLOR HELPERS
   ============================================================ */
function audienceTagClasses(color: Solution['audienceTagColor']) {
  switch (color) {
    case 'dark':   return 'bg-floren-primary text-white'
    case 'green':  return 'bg-[#4a7c59] text-white'
    case 'purple': return 'bg-[#6b5b8a] text-white'
  }
}

function secondaryTagClasses(color: Solution['secondaryTagColor']) {
  switch (color) {
    case 'olive': return 'bg-[#d4dbbf] text-floren-text'
    case 'mint':  return 'bg-floren-accent/60 text-floren-text'
    case 'blue':  return 'bg-floren-lavender text-floren-text'
  }
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function LeeroplossingenFullClient() {
  const [activeBranch, setActiveBranch] = useState('ggz')
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [accreditedOnly, setAccreditedOnly] = useState(false)
  const [compareList, setCompareList] = useState<string[]>([])
  const [activeRole, setActiveRole] = useState<string | null>(null)

  const branch = branches.find(b => b.id === activeBranch) || branches[0]

  const switchBranch = useCallback((id: string) => {
    setActiveBranch(id)
    setActiveFilters([])
    setAccreditedOnly(false)
    setActiveRole(null)
    setCompareList([])
  }, [])

  const toggleFilter = (f: string) => {
    setActiveFilters(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    )
  }

  const handleRoleClick = (filter: string) => {
    if (activeRole === filter) {
      setActiveRole(null)
      setActiveFilters([])
    } else {
      setActiveRole(filter)
      setActiveFilters([filter])
    }
    // scroll to aanbod
    setTimeout(() => {
      const el = document.getElementById('aanbod')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const clearFilters = () => {
    setActiveFilters([])
    setAccreditedOnly(false)
    setActiveRole(null)
  }

  const toggleCompare = (slug: string) => {
    setCompareList(prev =>
      prev.includes(slug) ? prev.filter(x => x !== slug) : prev.length < 3 ? [...prev, slug] : prev
    )
  }

  const filtered = branch.solutions.filter(s => {
    if (activeFilters.length > 0 && !activeFilters.some(f => s.roles.includes(f))) return false
    if (accreditedOnly && !s.accredited) return false
    return true
  })

  return (
    <>
      {/* BRANCH SELECTOR */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {branches.map((b) => (
          <button
            key={b.id}
            onClick={() => switchBranch(b.id)}
            className={`py-2 px-5 rounded-full text-sm font-semibold transition-colors ${
              activeBranch === b.id
                ? 'bg-floren-primary text-white'
                : 'bg-white border border-floren-border text-floren-text-body hover:bg-floren-surface'
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* HERO — changes per branch */}
      <section className="mb-8 lg:mb-12">
        <div className="bg-floren-card-alt rounded-[28px] lg:rounded-[32px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 py-1 px-3 bg-white/80 rounded-full text-xs font-medium mb-4 w-fit">
              {branch.heroLabel}
            </div>
            <h1 className="text-[1.6rem] lg:text-[2.2rem] font-extrabold leading-[1.1] tracking-tight mb-4">
              {branch.heroTitle}
            </h1>
            <p className="text-sm lg:text-base text-floren-text-body mb-6 max-w-[420px]">
              {branch.heroDescription}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#aanbod" className="inline-flex items-center gap-2 bg-floren-primary text-white rounded-xl px-6 py-3 text-sm font-bold hover:bg-floren-secondary transition-colors">
                Bekijk aanbod
              </a>
              <a href="#hoe-het-werkt" className="inline-flex items-center gap-2 border-2 border-floren-primary text-floren-primary rounded-xl px-6 py-3 text-sm font-bold hover:bg-floren-surface transition-colors">
                Hoe het werkt
              </a>
            </div>
          </div>
          <div className="relative h-[240px] lg:h-auto min-h-[300px]">
            <Image
              src={branch.heroImage}
              alt={branch.heroLabel}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="pb-8 lg:pb-12">
        <h2 className="text-xl lg:text-2xl font-semibold mb-6">Begin bij jouw rol</h2>
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {branch.roles.map((r) => (
            <button
              key={r.label}
              onClick={() => handleRoleClick(r.filter)}
              className={`flex flex-col items-center gap-2 p-4 lg:p-5 border rounded-2xl transition-all text-center ${
                activeRole === r.filter
                  ? 'bg-floren-primary/5 border-floren-primary shadow-md'
                  : 'bg-white border-floren-border hover:shadow-md'
              }`}
            >
              <r.icon className={`w-7 h-7 lg:w-8 lg:h-8 ${
                activeRole === r.filter ? 'text-floren-primary' : 'text-floren-text'
              }`} />
              <span className={`text-xs lg:text-sm font-medium ${
                activeRole === r.filter ? 'text-floren-primary' : 'text-floren-text'
              }`}>{r.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* SOLUTION GRID with filters + compare */}
      <section className="pb-10 lg:pb-16" id="aanbod">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex flex-wrap gap-2 flex-1">
            {branch.filterOptions.map((f) => (
              <button
                key={f}
                onClick={() => toggleFilter(f)}
                className={`py-2 px-4 rounded-full text-xs font-semibold transition-colors ${
                  activeFilters.includes(f)
                    ? 'bg-floren-primary text-white'
                    : 'border border-floren-border text-floren-text-body hover:bg-floren-surface'
                }`}
              >
                {f}
              </button>
            ))}
            {activeFilters.length > 0 && (
              <button onClick={clearFilters} className="py-2 px-3 text-xs font-medium text-floren-text-muted hover:text-floren-text flex items-center gap-1">
                <X className="w-3.5 h-3.5" /> Wis filters
              </button>
            )}
          </div>
          {/* Accredited toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-floren-text-body">Geaccrediteerd:</span>
            <button
              onClick={() => setAccreditedOnly(!accreditedOnly)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                accreditedOnly ? 'bg-floren-primary' : 'bg-floren-border'
              }`}
              aria-label="Toggle geaccrediteerd filter"
            >
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                accreditedOnly ? 'translate-x-[22px]' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>

        {/* Solution cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {filtered.map((s) => (
            <article key={s.slug + s.title} className="bg-white rounded-2xl border border-floren-card-alt p-5 flex flex-col">
              {/* Tags row + compare */}
              <div className="flex items-start justify-between mb-3 gap-2">
                <div className="flex flex-wrap gap-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-md ${audienceTagClasses(s.audienceTagColor)}`}>
                    {s.audienceTag}
                  </span>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${secondaryTagClasses(s.secondaryTagColor)}`}>
                    {s.secondaryTag}
                  </span>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer shrink-0">
                  <span className="text-[10px] text-floren-text-muted">Vergelijk</span>
                  <input
                    type="checkbox"
                    checked={compareList.includes(s.slug + s.title)}
                    onChange={() => toggleCompare(s.slug + s.title)}
                    className="w-4 h-4 rounded border-floren-border accent-floren-primary cursor-pointer"
                  />
                </label>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-3">{s.title}</h3>

              {/* Features */}
              <ul className="space-y-2 mb-5 flex-1">
                {s.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-floren-text-body">
                    <CheckCircle className="w-4 h-4 text-floren-accent shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={`/leeroplossingen/${s.slug}`}
                className="w-full text-center py-2.5 border border-floren-border rounded-xl text-sm font-semibold text-floren-text hover:bg-floren-surface transition-colors"
              >
                Lees meer
              </Link>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-floren-text-muted text-sm">Geen leeroplossingen gevonden met deze filters.</p>
            <button onClick={clearFilters} className="mt-3 text-sm text-floren-primary font-semibold hover:underline">
              Wis filters
            </button>
          </div>
        )}
      </section>

      {/* Compare bar */}
      {compareList.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-floren-primary text-white rounded-full px-6 py-3 flex items-center gap-4 shadow-lg">
          <span className="bg-floren-accent text-floren-text w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
            {compareList.length}
          </span>
          <span className="text-sm">geselecteerd om te vergelijken</span>
          <button className="bg-white/20 text-white rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-white/30 transition-colors">
            Vergelijk
          </button>
          <button onClick={() => setCompareList([])} className="hover:bg-white/20 rounded-full p-1 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </>
  )
}
