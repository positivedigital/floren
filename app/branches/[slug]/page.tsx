import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import ImagePlaceholder from '@/components/image-placeholder'
import SolutionCard from '@/components/solution-card'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { branches, solutions } from '@/lib/data'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }))
}

const branchMeta: Record<string, { stats: { value: string; label: string }[]; ctaTitle: string; ctaDesc: string }> = {
  'geestelijke-gezondheidszorg': {
    stats: [
      { value: '14', label: 'Leeroplossingen' },
      { value: '200+', label: 'Leerpaden' },
      { value: '5', label: 'Klantcases' },
    ],
    ctaTitle: 'Klaar voor de GGZ van morgen?',
    ctaDesc: 'Bekijk de leeroplossingen of plan een demo op maat.',
  },
  'gehandicaptenzorg': {
    stats: [
      { value: '9', label: 'Leeroplossingen' },
      { value: '150+', label: 'Leerpaden' },
      { value: '4', label: 'Klantcases' },
    ],
    ctaTitle: 'Beter leren in de gehandicaptenzorg?',
    ctaDesc: 'Ontdek hoe Floren jouw organisatie versterkt.',
  },
  'thuiszorg': {
    stats: [
      { value: '18', label: 'Leeroplossingen' },
      { value: '300+', label: 'Leerpaden' },
      { value: '8', label: 'Klantcases' },
    ],
    ctaTitle: 'Thuiszorg versterken met kennis?',
    ctaDesc: 'Bekijk de abonnementen of plan een gesprek.',
  },
  'verpleging-verzorging': {
    stats: [
      { value: '22', label: 'Leeroplossingen' },
      { value: '500+', label: 'Leerpaden' },
      { value: '12', label: 'Klantcases' },
    ],
    ctaTitle: 'Klaar voor de V&V van morgen?',
    ctaDesc: 'Bekijk de abonnementen of plan een demo op maat.',
  },
  'ziekenhuis': {
    stats: [
      { value: '16', label: 'Leeroplossingen' },
      { value: '250+', label: 'Leerpaden' },
      { value: '6', label: 'Klantcases' },
    ],
    ctaTitle: 'Leren in het ziekenhuis verbeteren?',
    ctaDesc: 'Plan een demo of bekijk onze abonnementen.',
  },
  'zorgonderwijs': {
    stats: [
      { value: '11', label: 'Leeroplossingen' },
      { value: '100+', label: 'Leerpaden' },
      { value: '3', label: 'Klantcases' },
    ],
    ctaTitle: 'Zorgonderwijs naar een hoger niveau?',
    ctaDesc: 'Ontdek hoe Floren het onderwijs ondersteunt.',
  },
}

export default function BranchDetailPage({ params }: { params: { slug: string } }) {
  const branch = branches.find((b) => b.slug === params.slug)
  if (!branch) return <div>Branche niet gevonden</div>

  const meta = branchMeta[params.slug] || branchMeta['geestelijke-gezondheidszorg']
  const branchSolutions = solutions.filter((s) => s.branches.includes(branch.title))

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Branches', href: '/branches' },
          { label: branch.title },
        ]} />

        {/* HERO */}
        <section className="py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.7px] text-floren-text-muted">Branche</span>
            <h1 className="text-[2rem] lg:text-5xl font-extrabold leading-[1.05] tracking-tight mt-3 mb-4 lg:mb-5">
              Leeroplossingen voor de {branch.title.toLowerCase()}
            </h1>
            <p className="text-base lg:text-lg text-floren-text-body mb-6 lg:mb-8">{branch.description}</p>
            <div className="flex flex-col lg:flex-row gap-3">
              <Link href="/leeroplossingen" className="w-full lg:w-auto text-center bg-floren-primary text-white rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-secondary transition-colors">
                Bekijk leeroplossingen
              </Link>
              <Link href="/demo" className="w-full lg:w-auto text-center border-2 border-[#5e5e5c] text-floren-text-body rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-surface transition-colors">
                Plan een demo
              </Link>
            </div>
          </div>
          <ImagePlaceholder label="Branche afbeelding" className="h-[200px] lg:h-[360px] rounded-2xl" src={branch.image} />
        </section>

        {/* STATS */}
        <section className="pb-10 lg:pb-16 grid grid-cols-3 gap-3 lg:gap-6">
          {meta.stats.map((stat) => (
            <div key={stat.label} className="p-5 lg:p-7 bg-floren-card rounded-2xl text-center">
              <div className="text-3xl lg:text-4xl font-extrabold">{stat.value}</div>
              <p className="text-xs lg:text-sm text-floren-text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* SOLUTIONS */}
        <section className="pb-10 lg:pb-16">
          <div className="flex items-end justify-between mb-4 lg:mb-5">
            <h2 className="text-2xl lg:text-3xl font-semibold">Leeroplossingen voor {branch.title.toLowerCase()}</h2>
            <Link href="/leeroplossingen" className="text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
              Alle leeroplossingen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {branchSolutions.slice(0, 6).map((sol) => (
              <SolutionCard
                key={sol.slug}
                type={sol.type === 'e-learning' ? 'E-learning' : sol.type === 'platform' ? 'Platform' : sol.type === 'tool' ? 'Tool' : 'Consultancy'}
                title={sol.title}
                description={sol.description}
                tag={sol.tag}
                image={sol.image}
                href={`/leeroplossingen/${sol.slug}`}
              />
            ))}
          </div>
        </section>

        {/* RELATED BRANCHES */}
        <section className="pb-10 lg:pb-16">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-4 lg:mb-5">Andere branches</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
            {branches.filter((b) => b.slug !== params.slug).slice(0, 3).map((b) => (
              <Link key={b.slug} href={`/branches/${b.slug}`} className="p-5 bg-white rounded-2xl border border-floren-card-alt hover:shadow-md transition-shadow">
                <h4 className="font-semibold">{b.title}</h4>
                <p className="text-xs text-floren-text-muted mt-1">{b.solutionCount} leeroplossingen</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <CTABlock
          title={meta.ctaTitle}
          description={meta.ctaDesc}
          primaryLabel="Bekijk abonnementen"
          primaryHref="/leeroplossingen"
          secondaryLabel="Vraag een gesprek aan"
          secondaryHref="/demo"
        />
      </main>
      <Footer />
    </>
  )
}
