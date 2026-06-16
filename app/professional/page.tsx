import Header from '@/components/header'
import Footer from '@/components/footer'
import ImagePlaceholder from '@/components/image-placeholder'
import AudiencePills from '@/components/audience-pills'
import Link from 'next/link'
import { experts } from '@/lib/data'
import { Brain, Accessibility, Home, Stethoscope, Sparkles, Award, BookOpen, Clock, ArrowRight, Search, FileText, MessageCircle, Video, BookMarked, Layers, TrendingDown, Quote, Play } from 'lucide-react'

/* ============================================================
   B2P HOME — "Home B2P" wireframe
   Sections: Hero + search → Quick actions → Recent voor jou →
   Alle protocollen → Features → Herken je dit op je werk? →
   Werkdruk + video → Onze Experts (with photos) → Quote → CTA
   ============================================================ */

const quickActions = [
  { icon: Award, label: 'Punten halen?', href: '/leeroplossingen' },
  { icon: MessageCircle, label: 'Twijfel bij cliënt?', href: '/leeroplossingen' },
  { icon: FileText, label: 'Nieuwe richtlijn?', href: '/artikelen' },
  { icon: Video, label: 'Video-uitleg', href: '/masterclasses' },
]

const branchIcons = [
  { icon: Brain, label: 'GGZ', href: '/professional/branches' },
  { icon: Accessibility, label: 'Gehandicaptenzorg', href: '/professional/branches' },
  { icon: Home, label: 'Thuiszorg', href: '/professional/branches' },
  { icon: Stethoscope, label: 'Huisartsenzorg', href: '/professional/branches' },
  { icon: Sparkles, label: 'Acute Zorg', href: '/professional/branches' },
]

const features = [
  { icon: Award, title: 'Geaccrediteerd', description: 'Erkend door o.a. BIG, FGzPt en V&VN. Je punten worden automatisch bijgeschreven.' },
  { icon: BookOpen, title: 'Direct toepasbaar', description: 'Geen droge theorie, maar casussen en protocollen die je direct inzet in je volgende dienst.' },
  { icon: Clock, title: '24/7 online', description: 'Studeer waar en wanneer het jou uitkomt, op je eigen tempo via ons moderne leerplatform.' },
]

const recentCards = [
  { image: '/images/photos/psy-gesprek-1.jpg', title: 'Nascholing psychiatrie', desc: 'Geaccrediteerde nascholing voor de GGZ', href: '/leeroplossingen/psy-expert' },
  { image: '/images/photos/prof-inhaler-uitleg.jpg', title: 'Medicatieveiligheid VVT', desc: 'Protocol en casusbesprekingen', href: '/leeroplossingen/zorgpad-professional' },
  { image: '/images/photos/prof-sonde-voeding.jpg', title: 'Verpleegtechnische handelingen', desc: 'Nurse Academy online modules', href: '/leeroplossingen/zorgpad-plug-and-play' },
]

const painPoints = [
  { icon: TrendingDown, title: 'Kennisverloop', desc: 'Waardevolle specialistische kennis gaat verloren wanneer ervaren collega’s vertrekken.' },
  { icon: Layers, title: 'Inconsistentie', desc: 'Inconsistentie in werkwijzen leidt tot hogere foutkosten en variatie op de werkvloer.' },
  { icon: BookMarked, title: 'Werkdruk', desc: 'Minder tijd voor scholing, meer druk op de werkvloer — maar bijblijven is cruciaal.' },
]

export default function ProfessionalPage() {
  const consultants = experts.slice(0, 3)

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">

        {/* ══════ HERO ══════ */}
        <section className="py-8 lg:py-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="mb-5">
              <AudiencePills active="professional" />
            </div>
            <h1 className="text-[2rem] lg:text-[2.75rem] font-extrabold leading-[1.08] tracking-tight mb-4">
              De beste zorgkennis. Altijd dichtbij.
            </h1>
            <p className="text-sm lg:text-base text-floren-text-body mb-6 max-w-[420px] leading-relaxed">
              Verdiep je expertise met wetenschappelijk onderbouwde nascholing. Geaccrediteerd, direct toepasbaar en beschikbaar wanneer jij wilt.
            </p>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-floren-text-muted" />
              <input
                type="text"
                placeholder="Zoek op onderwerp of leeroplossing..."
                className="w-full pl-11 pr-4 py-3.5 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/20 bg-white"
                readOnly
              />
            </div>
          </div>
          <div className="relative h-[260px] lg:h-[380px] rounded-2xl overflow-hidden">
            <ImagePlaceholder className="h-full w-full rounded-none" label="Zorgprofessional" src="/images/photos/hero-professional.jpg" />
          </div>
        </section>

        {/* ══════ QUICK ACTIONS ══════ */}
        <section className="pb-8 lg:pb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((a) => (
              <Link key={a.label} href={a.href} className="flex flex-col items-center gap-2 p-4 lg:p-5 bg-white border border-floren-border rounded-2xl hover:shadow-md transition-shadow text-center">
                <a.icon className="w-6 h-6 text-floren-text" />
                <span className="text-xs lg:text-sm font-medium text-floren-text">{a.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ══════ RECENT VOOR JOU ══════ */}
        <section className="pb-10 lg:pb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl lg:text-2xl font-semibold">Recent voor jou</h2>
            <Link href="/leeroplossingen" className="text-sm font-semibold text-floren-text-body hover:text-floren-text flex items-center gap-1">
              Bekijk alles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentCards.map((c) => (
              <Link key={c.title} href={c.href} className="group bg-white rounded-2xl border border-floren-card-alt overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-40 overflow-hidden">
                  <ImagePlaceholder className="h-full w-full rounded-none" label={c.title} src={c.image} />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1 group-hover:text-floren-secondary transition-colors">{c.title}</h3>
                  <p className="text-xs text-floren-text-muted">{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ══════ ALLE PROTOCOLLEN — Branch icons ══════ */}
        <section className="pb-10 lg:pb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl lg:text-2xl font-semibold">Alle protocollen</h2>
            <Link href="/professional/branches" className="text-sm font-semibold text-floren-text-body hover:text-floren-text flex items-center gap-1">
              Bekijk alles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-3">
            {branchIcons.map((b) => (
              <Link key={b.label} href={b.href} className="flex flex-col items-center gap-2 p-4 lg:p-5 bg-white border border-floren-border rounded-2xl hover:shadow-md transition-shadow text-center">
                <b.icon className="w-7 h-7 text-floren-text" />
                <span className="text-xs lg:text-sm font-medium text-floren-text">{b.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ══════ FEATURES ══════ */}
        <section className="pb-10 lg:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <article key={f.title} className="p-6 bg-floren-card rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-floren-accent mb-4" />
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-floren-text-body">{f.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ══════ HERKEN JE DIT OP JE WERK? ══════ */}
        <section className="pb-10 lg:pb-14">
          <h2 className="text-xl lg:text-2xl font-semibold mb-2">Herken je dit op je werk?</h2>
          <p className="text-sm text-floren-text-body mb-6">De uitdagingen van moderne zorgprofessionals.</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {painPoints.map((p) => (
              <article key={p.title} className="p-6 bg-floren-card rounded-2xl">
                <p.icon className="w-6 h-6 text-floren-text-muted mb-4" />
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-floren-text-body">{p.desc}</p>
              </article>
            ))}
          </div>

          {/* Werkdruk detail card with video thumbnail */}
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-floren-card rounded-2xl p-6 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-floren-text-muted mb-2">Werkdruk</p>
              <p className="text-sm text-floren-text-body">
                Dankzij de snelle toegang tot gevalideerde richtlijnen kun je sneller handelen op de werkvloer.
              </p>
              <p className="text-xs text-floren-text-muted mt-4">Bestuurder, zorginstelling NL</p>
            </div>
            <div className="relative h-48 lg:h-auto rounded-2xl overflow-hidden bg-floren-surface">
              <ImagePlaceholder className="h-full w-full rounded-none" label="Video testimonial" src="/images/photos/care-laughing.jpg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-floren-primary ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ ONZE EXPERTS (with real photos) ══════ */}
        <section className="pb-10 lg:pb-14">
          <h2 className="text-xl lg:text-2xl font-semibold mb-6">Onze Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {consultants.map((e) => (
              <Link key={e.slug} href={`/experts/${e.slug}`} className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-floren-card-alt hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-floren-lavender shrink-0">
                  <ImagePlaceholder className="w-full h-full rounded-none" label={e.name} src={e.image} />
                </div>
                <div>
                  <p className="font-semibold group-hover:text-floren-secondary transition-colors text-sm">{e.name}</p>
                  <p className="text-xs text-floren-text-muted">{e.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ══════ TESTIMONIAL QUOTE ══════ */}
        <section className="pb-10 lg:pb-14">
          <div className="bg-floren-primary text-white rounded-2xl p-6 lg:p-10">
            <Quote className="w-8 h-8 text-floren-accent mb-4" />
            <blockquote className="text-base lg:text-lg font-medium italic leading-relaxed mb-6 max-w-xl">
              &ldquo;Dankzij de snelle toegang tot gevalideerde protocollen kan ik sneller handelen op de werkvloer.&rdquo;
            </blockquote>
            <p className="text-xs text-white/50 uppercase tracking-wide">Verpleegkundige</p>
            <p className="text-sm font-semibold">Thuiszorgorganisatie NL</p>
          </div>
        </section>

        {/* ══════ BOTTOM CTA ══════ */}
        <section className="mb-10 lg:mb-16 bg-floren-card rounded-[28px] lg:rounded-[32px] p-8 lg:p-12 text-center">
          <h2 className="text-xl lg:text-2xl font-semibold mb-3">Klaar om je te verdiepen?</h2>
          <p className="text-sm text-floren-text-body mb-6 max-w-md mx-auto">
            Ontdek alle specialismen en vind de nascholing die perfect aansluit bij jouw carrière.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/professional/leeroplossingen" className="inline-flex items-center gap-2 bg-floren-primary text-white rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-secondary transition-colors">
              Bekijk alle leeroplossingen <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/bestellen" className="border-2 border-floren-primary text-floren-primary rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-surface transition-colors">
              Bekijk abonnementen
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
