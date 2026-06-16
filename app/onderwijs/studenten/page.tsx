import Header from '@/components/header'
import Footer from '@/components/footer'
import ImagePlaceholder from '@/components/image-placeholder'
import AudiencePills from '@/components/audience-pills'
import Link from 'next/link'
import { experts } from '@/lib/data'
import { ArrowRight, GraduationCap, BookOpen, Monitor, Play, FileText, Layers, TrendingDown, BookMarked, Search, Quote } from 'lucide-react'

/* ============================================================
   STUDENT HOME — "Home Student" wireframe
   Sections: Hero → Quick actions → Recent voor jou →
   Zorgeloos leren card → Testimonial → Pain points →
   Werkdruk + video → Onze Experts (with photos) → CTA
   ============================================================ */

const quickActions = [
  { icon: GraduationCap, label: 'Studie starten', href: '/leeroplossingen' },
  { icon: FileText, label: 'Toets oefenen', href: '/leeroplossingen' },
  { icon: BookOpen, label: 'Praktijk cases', href: '/cases' },
  { icon: Monitor, label: 'Video-uitleg', href: '/masterclasses' },
]

const recentCards = [
  { image: '/images/photos/mbo-studenten-praktijk.jpg', title: 'Klinisch redeneren', desc: 'Stap-voor-stap casuïstiek', href: '/leeroplossingen' },
  { image: '/images/photos/mbo-studenten-les.jpg', title: 'Verpleegtechniek basis', desc: 'Van theorie naar praktijk', href: '/leeroplossingen' },
  { image: '/images/photos/mbo-studenten-oefenen.jpg', title: 'Stage voorbereiding', desc: 'Beroepssituaties oefenen', href: '/leeroplossingen' },
]

const painPoints = [
  { icon: TrendingDown, title: 'Kennisverloop', desc: 'Moeilijk om theorie vast te houden als de stages wisselend zijn en de werkdruk hoog is.' },
  { icon: Layers, title: 'Inconsistentie', desc: 'Materiaal verschilt per docent en locatie — wat is de juiste werkwijze?' },
  { icon: BookMarked, title: 'Werkdruk', desc: 'Combinatie van stage, studie en bijbaan maakt het lastig om bij te blijven.' },
]

export default function StudentenPage() {
  const consultants = experts.slice(0, 3)

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">

        {/* ══════ HERO ══════ */}
        <section className="py-8 lg:py-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="mb-5">
              <AudiencePills active="student" />
            </div>
            <h1 className="text-[2rem] lg:text-[2.75rem] font-extrabold leading-[1.08] tracking-tight mb-4">
              Kennis die zorgt voor groei.
            </h1>
            <p className="text-sm lg:text-base text-floren-text-body mb-6 max-w-[420px] leading-relaxed">
              Alles voor je studie en je praktijk. Altijd actueel, altijd beschikbaar.
            </p>
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-floren-text-muted" />
              <input
                type="text"
                placeholder="Zoek op studie, vaardigheid of protocol..."
                className="w-full pl-11 pr-4 py-3.5 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/20 bg-white"
                readOnly
              />
            </div>
          </div>
          <div className="relative h-[260px] lg:h-[380px] rounded-2xl overflow-hidden">
            <ImagePlaceholder className="h-full w-full rounded-none" label="MBO zorgstudenten" src="/images/photos/hero-student.jpg" />
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

        {/* ══════ ZORGELOOS LEREN CARD ══════ */}
        <section className="pb-10 lg:pb-14">
          <div className="bg-floren-card-alt rounded-[28px] lg:rounded-[32px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-[1.5rem] lg:text-[2rem] font-extrabold leading-[1.1] mb-4">
                Zorgeloos leren voor de zorg.
              </h2>
              <p className="text-sm text-floren-text-body mb-6 max-w-[380px]">
                Focus op je studie, wij zorgen voor de rest. Altijd de laatste richtlijnen, mooie video’s en oefenstof die past bij je stage of toets.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/leeroplossingen" className="bg-floren-primary text-white rounded-xl px-6 py-3 text-sm font-bold hover:bg-floren-secondary transition-colors">
                  Start direct
                </Link>
                <Link href="/over-ons" className="border-2 border-floren-primary text-floren-primary rounded-xl px-6 py-3 text-sm font-bold hover:bg-floren-surface transition-colors">
                  Bekijk video
                </Link>
              </div>
            </div>
            <div className="relative h-[240px] lg:h-auto min-h-[280px]">
              <ImagePlaceholder className="h-full w-full rounded-none" label="Student in de zorg" src="/images/photos/mbo-studenten-praktijk.jpg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-floren-primary ml-0.5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ TESTIMONIAL ══════ */}
        <section className="pb-10 lg:pb-14">
          <div className="bg-floren-primary text-white rounded-2xl p-6 lg:p-10">
            <Quote className="w-8 h-8 text-floren-accent mb-4" />
            <blockquote className="text-base lg:text-lg font-medium italic leading-relaxed mb-6 max-w-xl">
              &ldquo;Dankzij de snelle toegang tot actuele protocollen voelde ik me veel zekerder op mijn stageplek.&rdquo;
            </blockquote>
            <p className="text-xs text-white/50 uppercase tracking-wide">MBO student Verpleegkunde</p>
            <p className="text-sm font-semibold">ROC Midden-Nederland</p>
          </div>
        </section>

        {/* ══════ PAIN POINTS ══════ */}
        <section className="pb-10 lg:pb-14">
          <h2 className="text-xl lg:text-2xl font-semibold mb-2">Herken je dit?</h2>
          <p className="text-sm text-floren-text-body mb-6">De uitdagingen van studenten in de zorg.</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {painPoints.map((p) => (
              <article key={p.title} className="p-6 bg-floren-card rounded-2xl">
                <p.icon className="w-6 h-6 text-floren-text-muted mb-4" />
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-floren-text-body">{p.desc}</p>
              </article>
            ))}
          </div>

          {/* Werkdruk detail card with video */}
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-floren-card rounded-2xl p-6 lg:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-floren-text-muted mb-2">Werkdruk</p>
              <p className="text-sm text-floren-text-body">
                &ldquo;Dankzij de snelle toegang tot gevalideerde richtlijnen voor de werkvloer op de werkvloer.&rdquo;
              </p>
              <p className="text-xs text-floren-text-muted mt-4">Bestuurder, zorginstelling NL</p>
            </div>
            <div className="relative h-48 lg:h-auto rounded-2xl overflow-hidden bg-floren-surface">
              <ImagePlaceholder className="h-full w-full rounded-none" label="Student video" src="/images/photos/mbo-studenten-les.jpg" />
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

        {/* ══════ BOTTOM CTA ══════ */}
        <section className="mb-10 lg:mb-16 bg-floren-card rounded-[28px] lg:rounded-[32px] p-8 lg:p-12 text-center">
          <h2 className="text-xl lg:text-2xl font-semibold mb-3">Klaar om te groeien?</h2>
          <p className="text-sm text-floren-text-body mb-6 max-w-md mx-auto">
            Ontdek hoe Floren jouw zorgopleidingen verrijkt met de beste leermiddelen.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/leeroplossingen" className="bg-floren-primary text-white rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-secondary transition-colors">
              Bekijk leeroplossingen
            </Link>
            <Link href="/demo" className="border-2 border-floren-primary text-floren-primary rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-surface transition-colors">
              Bekijk mogelijkheden
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
