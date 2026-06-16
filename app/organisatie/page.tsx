import Header from '@/components/header'
import Footer from '@/components/footer'
import ImagePlaceholder from '@/components/image-placeholder'
import AudiencePills from '@/components/audience-pills'
import Link from 'next/link'
import { branches, cases } from '@/lib/data'
import { ArrowRight, BarChart3, Puzzle, Headset } from 'lucide-react'

/* ============================================================
   B2B AUDIENCE HOME — matches audience-home wireframe
   Sections: Light hero → Value props → Branch cards →
   Case teaser → Dark CTA block
   ============================================================ */

const valueProps = [
  {
    icon: BarChart3,
    title: 'Meetbaar resultaat',
    description: 'Dashboards en rapportages voor borging en compliance.',
  },
  {
    icon: Puzzle,
    title: 'Op maat per branche',
    description: 'Leeroplossingen afgestemd op jouw zorgbranche.',
  },
  {
    icon: Headset,
    title: 'Begeleide implementatie',
    description: 'Van kick-off tot adoptie, wij staan naast je.',
  },
]

/* Pick 4 branches for the grid */
const featuredBranches = [
  { slug: 'verpleging-verzorging', title: 'Ouderenzorg', icon: '🏠', count: 12 },
  { slug: 'geestelijke-gezondheidszorg', title: 'Ziekenhuiszorg', icon: '🏥', count: 18 },
  { slug: 'gehandicaptenzorg', title: 'Gehandicaptenzorg', icon: '🤝', count: 9 },
  { slug: 'geestelijke-gezondheidszorg', title: 'GGZ', icon: '🧠', count: 7 },
]

export default function OrganisatiePage() {
  const featuredCase = cases[0]

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">

        {/* ══════ HERO (light, cream bg) ══════ */}
        <section className="py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="mb-5">
              <AudiencePills active="organisatie" />
            </div>
            <h1 className="text-3xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight mb-5">
              Borging en impact voor de moderne zorgorganisatie
            </h1>
            <p className="text-base lg:text-lg text-[#454742] mb-8 max-w-[460px]">
              Geef je medewerkers de kennis die ze nodig hebben — met meetbaar resultaat en aantoonbare borging.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/demo"
                className="text-center bg-floren-primary text-white rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-primary/90 transition-colors"
              >
                Plan een demo
              </Link>
              <Link
                href="/leeroplossingen"
                className="text-center border-2 border-[#5e5e5c] text-[#454742] rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-[#f0ece4] transition-colors"
              >
                Bekijk leeroplossingen
              </Link>
            </div>
          </div>
          <div className="relative h-[260px] lg:h-[400px] rounded-2xl overflow-hidden">
            <ImagePlaceholder
              className="h-full w-full rounded-none"
              label="Zorgprofessionals in overleg"
              src="/images/photos/hero-organisatie.jpg"
            />
          </div>
        </section>

        {/* ══════ VALUE PROPOSITIONS ══════ */}
        <section className="pb-12 lg:pb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueProps.map((vp) => (
            <article
              key={vp.title}
              className="p-7 bg-[#f0ece4] rounded-2xl"
            >
              <div className="w-12 h-12 rounded-xl bg-floren-primary text-white flex items-center justify-center mb-4">
                <vp.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{vp.title}</h3>
              <p className="text-sm text-[#454742]">{vp.description}</p>
            </article>
          ))}
        </section>

        {/* ══════ BRANCH CARDS ══════ */}
        <section className="pb-12 lg:pb-16">
          <div className="flex items-end justify-between mb-5">
            <h2 className="text-2xl lg:text-3xl font-semibold">Leeroplossingen voor jouw branche</h2>
            <Link href="/branches" className="text-sm font-bold hidden sm:inline-flex items-center gap-1 hover:underline">
              Alle branches <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {featuredBranches.map((b) => (
              <Link
                key={b.title}
                href={`/branches/${b.slug}`}
                className="p-5 bg-white rounded-2xl border border-[#e6e2da] hover:shadow-md transition-shadow"
              >
                <span className="text-2xl mb-3 block">{b.icon}</span>
                <h4 className="font-semibold">{b.title}</h4>
                <p className="text-xs text-[#767872] mt-1">{b.count} leeroplossingen</p>
              </Link>
            ))}
          </div>
          <Link href="/branches" className="text-sm font-bold sm:hidden flex items-center gap-1 mt-4 hover:underline">
            Alle branches <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* ══════ CASE TEASER ══════ */}
        <section className="pb-12 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 lg:p-10 bg-[#f7f3f2] rounded-[32px]">
            <div className="relative h-[200px] lg:h-[260px] rounded-2xl overflow-hidden">
              <ImagePlaceholder
                className="h-full w-full rounded-none"
                label="Case illustratie"
                src="/images/photos/case-success.jpg"
              />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#767872]">Klantcase</span>
              <h3 className="text-xl lg:text-2xl font-semibold my-3">
                &ldquo;Met Floren halen onze medewerkers structureel hun accreditatiepunten.&rdquo;
              </h3>
              <p className="text-sm text-[#454742] mb-4">
                Zorggroep De Linde over de samenwerking met Floren.
              </p>
              <Link
                href={`/cases/${featuredCase.slug}`}
                className="text-sm font-bold inline-flex items-center gap-1 hover:underline"
              >
                Lees de case <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════ DARK CTA BLOCK ══════ */}
        <section className="mb-12 lg:mb-16 p-8 lg:p-12 bg-floren-primary rounded-[32px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#f4f0ef] mb-2">
              Benieuwd wat Floren voor jouw organisatie kan doen?
            </h2>
            <p className="text-[#f4f0ef]/70 max-w-[520px]">
              Plan een vrijblijvende demo of vraag direct een offerte aan.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/demo"
              className="text-center bg-floren-accent text-floren-primary rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-accent/80 transition-colors"
            >
              Vraag demo aan
            </Link>
            <Link
              href="/demo"
              className="text-center border-2 border-[#f4f0ef]/40 text-[#f4f0ef] rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-white/10 transition-colors"
            >
              Offerte aanvragen
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
