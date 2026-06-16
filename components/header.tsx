'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, ChevronRight, ChevronDown, FileText, CalendarCheck, BookOpen } from 'lucide-react'

/* ——— Mega-menu content per audience ——— */
const megaMenus: Record<string, {
  tag: string
  links: { label: string; href: string; highlight?: boolean }[]
  featured: { image: string; title: string; description: string; href: string }
  cta: { icon: string; title: string; description: string; buttons: { label: string; href: string; primary?: boolean }[] }
  extra?: { icon: string; label: string; title: string; href: string }
}> = {
  Organisatie: {
    tag: 'ORGANISATIES',
    links: [
      { label: 'Over ons & methode', href: '/over-ons' },
      { label: 'Branches', href: '/branches' },
      { label: 'Leeroplossingen', href: '/leeroplossingen' },
      { label: 'Masterclasses', href: '/masterclasses' },
      { label: 'Cases', href: '/cases' },
      { label: 'Artikelen', href: '/artikelen' },
    ],
    featured: {
      image: '/images/photos/care-conversation.jpg',
      title: 'Klinische Autoriteit & Empathie',
      description: 'Ontdek hoe wij zorgorganisaties transformeren door technologie en menselijkheid te combineren.',
      href: '/over-ons',
    },
    cta: {
      icon: 'book',
      title: 'Alles voor uw organisatie?',
      description: 'Sluit u aan bij het snelst groeiende netwerk voor klinische educatie en innovatie.',
      buttons: [
        { label: 'Prijzen & Abonnementen', href: '/abonnement', primary: true },
        { label: 'Demo inplannen', href: '/demo' },
      ],
    },
    extra: {
      icon: 'file',
      label: 'LAATSTE ONDERZOEK',
      title: 'Digitale leeroplossingen in de GGZ 2024',
      href: '/artikelen/microlearning-borging-ggz',
    },
  },
  Professional: {
    tag: 'PROFESSIONALS',
    links: [
      { label: 'Over Floren voor jou', href: '/professional' },
      { label: 'Branches', href: '/professional/branches' },
      { label: 'Leeroplossingen', href: '/professional/leeroplossingen' },
      { label: 'Masterclasses', href: '/masterclasses' },
      { label: 'Cases', href: '/cases' },
      { label: 'Artikelen', href: '/artikelen' },
    ],
    featured: {
      image: '/images/photos/care-explaining.jpg',
      title: 'Groei als zorgprofessional',
      description: 'Blijf up-to-date met evidence-based leeroplossingen en verdien je accreditatiepunten.',
      href: '/professional',
    },
    cta: {
      icon: 'calendar',
      title: 'Start vandaag met leren',
      description: 'Kies het abonnement dat bij jou past en begin direct.',
      buttons: [
        { label: 'Direct inloggen', href: '/abonnement', primary: true },
        { label: 'Pakket kiezen', href: '/abonnement' },
      ],
    },
  },
  Onderwijs: {
    tag: 'ONDERWIJS',
    links: [
      { label: 'Over het Onderwijs', href: '/onderwijs' },
      { label: 'Voor Docenten', href: '/onderwijs/docenten', highlight: true },
      { label: 'Voor Studenten', href: '/onderwijs/studenten', highlight: true },
      { label: 'Branches', href: '/branches' },
      { label: 'Leeroplossingen', href: '/leeroplossingen' },
      { label: 'Downloads & Resources', href: '/downloads' },
      { label: 'Artikelen', href: '/artikelen' },
    ],
    featured: {
      image: '/images/photos/care-kitchen.jpg',
      title: 'Modern zorgonderwijs',
      description: 'Digitale leermiddelen voor MBO en HBO zorgopleidingen.',
      href: '/onderwijs',
    },
    cta: {
      icon: 'book',
      title: 'Voor docenten & opleidingen',
      description: 'Ontdek hoe Floren past binnen uw curriculum.',
      buttons: [
        { label: 'Contact met specialist', href: '/demo', primary: true },
        { label: 'Onderwijspakket aanvragen', href: '/demo' },
      ],
    },
  },
}

const topNavItems = [
  { label: 'Organisatie', href: '/organisatie', hasMega: true },
  { label: 'Professional', href: '/professional', hasMega: true },
  { label: 'Onderwijs', href: '/onderwijs', hasMega: true },
  { label: 'Contact', href: '/contact', hasMega: false },
]

export default function Header() {
  const [openMega, setOpenMega] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobilePanel, setMobilePanel] = useState<string | null>(null)
  const megaRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    setOpenMega(null)
    setMobileMenuOpen(false)
    setMobilePanel(null)
  }, [pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${window.scrollY}px`
    } else {
      const scrollY = document.body.style.top
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
    }
  }, [mobileMenuOpen])

  // Close mega on click outside
  useEffect(() => {
    if (!openMega) return
    const handleClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setOpenMega(null)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [openMega])

  const toggleMega = (label: string) => setOpenMega(openMega === label ? null : label)
  const activeMega = openMega ? megaMenus[openMega] : null
  const activePanel = mobilePanel ? megaMenus[mobilePanel] : null

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#fcf8f7]/95 backdrop-blur border-b border-floren-card-alt" ref={megaRef}>
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 h-[60px] lg:h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" onClick={() => { setOpenMega(null); setMobileMenuOpen(false) }}>
            <img src="/images/floren-logo.svg" alt="Floren Logo" className="h-8 lg:h-10 w-auto" />
          </Link>

          {/* Desktop top nav */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-floren-text-body">
            {topNavItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => item.hasMega ? toggleMega(item.label) : (window.location.href = item.href)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors hover:text-floren-text hover:bg-floren-surface ${
                  openMega === item.label ? 'text-floren-text bg-floren-surface' : ''
                } ${
                  !openMega && (pathname === item.href || pathname.startsWith(item.href + '/')) ? 'text-floren-text' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 border border-floren-border rounded-full text-sm text-floren-text-muted cursor-pointer hover:bg-floren-surface transition-colors">
              <Search className="w-4 h-4" />
              <span>Zoeken...</span>
            </div>
            <Link href="/demo" className="bg-floren-primary text-floren-light rounded-lg px-5 py-2.5 text-sm font-bold hover:bg-floren-secondary transition-colors" onClick={() => setOpenMega(null)}>
              Demo inplannen
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button type="button" className="w-11 h-11 rounded-full border border-floren-border flex items-center justify-center text-floren-text-body">
              <Search className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setMobilePanel(null) }}
              className="w-11 h-11 rounded-full bg-floren-primary text-white flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ——— DESKTOP MEGA-MENU ——— */}
        {activeMega && openMega && (
          <div className="hidden lg:block absolute left-0 right-0 top-[72px] bg-white border-b border-floren-card-alt shadow-xl z-50">
            <div className="max-w-[1200px] mx-auto px-10 py-8">
              <p className="text-xs font-semibold tracking-[1px] uppercase text-floren-text-muted mb-6">{activeMega.tag}</p>
              <div className="grid grid-cols-12 gap-6">
                {/* LEFT: Navigation links */}
                <div className="col-span-3 flex flex-col gap-1">
                  {activeMega.links.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className={`flex items-center justify-between py-3 px-3 rounded-lg text-base font-semibold transition-colors hover:bg-floren-surface group ${
                        link.highlight ? 'bg-floren-lavender/50' : ''
                      } ${
                        pathname === link.href || pathname.startsWith(link.href + '/') ? 'text-floren-text bg-floren-surface' : 'text-floren-text-body'
                      }`}
                    >
                      {link.label}
                      <ChevronRight className="w-4 h-4 text-floren-text-muted group-hover:text-floren-text transition-colors" />
                    </Link>
                  ))}
                </div>

                {/* CENTER: Featured image card */}
                <div className="col-span-5">
                  <Link href={activeMega.featured.href} className="block relative h-full min-h-[280px] rounded-2xl overflow-hidden group">
                    <img src={activeMega.featured.image} alt={activeMega.featured.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-1">{activeMega.featured.title}</h3>
                      <p className="text-sm text-white/80 leading-relaxed">{activeMega.featured.description}</p>
                    </div>
                  </Link>
                </div>

                {/* RIGHT: CTA + extra */}
                <div className="col-span-4 flex flex-col gap-4">
                  <div className="bg-floren-surface rounded-2xl p-6 flex flex-col gap-4 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-floren-card-alt flex items-center justify-center">
                      {activeMega.cta.icon === 'calendar' ? <CalendarCheck className="w-5 h-5 text-floren-text-body" /> : <BookOpen className="w-5 h-5 text-floren-text-body" />}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{activeMega.cta.title}</h4>
                      <p className="text-sm text-floren-text-body leading-relaxed">{activeMega.cta.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 mt-auto">
                      {activeMega.cta.buttons.map((btn) => (
                        <Link key={btn.href + btn.label} href={btn.href} className={`w-full text-center py-3 px-4 rounded-xl text-sm font-bold transition-colors ${btn.primary ? 'bg-floren-primary text-white hover:bg-floren-secondary' : 'border border-floren-border text-floren-text-body hover:bg-floren-card-alt'}`}>
                          {btn.label} {btn.primary ? '→' : ''}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {activeMega.extra && (
                    <Link href={activeMega.extra.href} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-floren-surface transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-floren-card-alt flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-floren-text-muted" />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.8px] text-floren-text-muted">{activeMega.extra.label}</p>
                        <p className="text-sm font-semibold text-floren-text group-hover:text-floren-secondary transition-colors">{activeMega.extra.title}</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </header>

      {/* ——— MOBILE MENU: Main panel (outside header to avoid backdrop-blur containing block) ——— */}
      {mobileMenuOpen && !mobilePanel && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-[#fcf8f7] z-[60] flex flex-col px-5 pt-6 pb-24">
          <nav className="flex flex-col gap-1 flex-1">
            {topNavItems.map((item) => (
              item.hasMega ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setMobilePanel(item.label)}
                  className="flex items-center justify-between py-4 text-lg font-semibold text-floren-text-body hover:text-floren-text"
                >
                  {item.label}
                  <ChevronDown className="w-5 h-5 -rotate-90" />
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between py-4 text-lg font-semibold text-floren-text-body hover:text-floren-text"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                  <ChevronRight className="w-5 h-5 text-floren-text-muted" />
                </Link>
              )
            ))}
          </nav>
          <div className="flex items-center gap-2 px-4 py-3 border border-floren-border rounded-xl text-sm text-floren-text-muted mb-4">
            <Search className="w-4 h-4" />
            <span>Zoeken...</span>
          </div>
          <Link
            href="/demo"
            className="block w-full text-center bg-floren-primary text-floren-light rounded-xl px-5 py-3.5 text-sm font-bold"
            onClick={() => setMobileMenuOpen(false)}
          >
            Inloggen
          </Link>
        </div>
      )}

      {/* ——— MOBILE MENU: Audience sub-panel ——— */}
      {mobileMenuOpen && activePanel && mobilePanel && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-[#fcf8f7] z-[60] flex flex-col px-5 pt-4 pb-24">
          {/* Back + close header */}
          <button
            type="button"
            onClick={() => setMobilePanel(null)}
            className="flex items-center gap-2 text-sm font-semibold text-floren-text-muted mb-4 -ml-1"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Terug
          </button>

          <p className="text-xs font-semibold tracking-[1px] uppercase text-floren-text-muted mb-4">{activePanel.tag}</p>

          <nav className="flex flex-col gap-0 flex-1">
            {activePanel.links.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={`flex items-center justify-between py-4 text-lg font-semibold transition-colors ${
                  link.highlight ? 'text-floren-text bg-floren-lavender/40 -mx-5 px-5 rounded-none' : 'text-floren-text-body hover:text-floren-text'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
                <ChevronRight className="w-5 h-5 text-floren-text-muted" />
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 mt-6">
            {activePanel.cta.buttons.map((btn) => (
              <Link
                key={btn.href + btn.label}
                href={btn.href}
                className={`block w-full text-center py-3.5 px-4 rounded-xl text-sm font-bold transition-colors ${
                  btn.primary
                    ? 'bg-floren-primary text-white'
                    : 'bg-floren-neutral/80 text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {btn.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ——— MOBILE BOTTOM TAB BAR ——— */}
      <MobileBottomBar />
    </>
  )
}

/* ——— Mobile Bottom Tab Bar Component ——— */
function MobileBottomBar() {
  const pathname = usePathname()

  const tabs = [
    { label: 'Home', href: '/', icon: HomeIcon, match: (p: string) => p === '/' },
    { label: 'Branches', href: '/branches', icon: BranchIcon, match: (p: string) => p.startsWith('/branches') },
    { label: 'Leeroplossingen', href: '/leeroplossingen', icon: SolutionIcon, match: (p: string) => p.startsWith('/leeroplossingen') },
    { label: 'Contact', href: '/contact', icon: ContactIcon, match: (p: string) => p.startsWith('/contact') || p === '/demo' },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-floren-card-alt safe-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const isActive = tab.match(pathname)
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
                isActive ? 'text-floren-text bg-floren-surface' : 'text-floren-text-muted'
              }`}
            >
              <tab.icon className="w-6 h-6" active={isActive} />
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

/* ——— Tab Bar Icons (matching wireframe style) ——— */
function HomeIcon({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function BranchIcon({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="5" r="2" /><line x1="7" y1="7" x2="9.5" y2="9.5" />
      <circle cx="19" cy="5" r="2" /><line x1="17" y1="7" x2="14.5" y2="9.5" />
      <circle cx="5" cy="19" r="2" /><line x1="7" y1="17" x2="9.5" y2="14.5" />
      <circle cx="19" cy="19" r="2" /><line x1="17" y1="17" x2="14.5" y2="14.5" />
    </svg>
  )
}

function SolutionIcon({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <path d="M13 8h4" /><path d="M13 12h4" /><path d="M13 16h4" />
    </svg>
  )
}

function ContactIcon({ className, active }: { className?: string; active?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}
