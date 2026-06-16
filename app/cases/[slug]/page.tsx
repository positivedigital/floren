import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import ImagePlaceholder from '@/components/image-placeholder'
import Link from 'next/link'
import { cases as casesData, experts } from '@/lib/data'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return casesData.map((c) => ({ slug: c.slug }))
}

export default function CaseDetailPage({ params }: { params: { slug: string } }) {
  const caseItem = casesData.find((c) => c.slug === params.slug)
  if (!caseItem) return notFound()

  const consultant = experts.find((e) => e.slug === caseItem.consultant)

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Cases', href: '/cases' },
          { label: caseItem.client },
        ]} />

        <section className="py-8 lg:py-16 max-w-[760px]">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wide py-1 px-3 bg-floren-lavender rounded-full">{caseItem.branche}</span>
            <span className="text-xs font-bold py-1 px-3 bg-floren-accent rounded-full">{caseItem.result}</span>
          </div>
          <h1 className="text-[2rem] lg:text-4xl font-extrabold leading-tight mb-5">{caseItem.title}</h1>
          <p className="text-lg text-floren-text-body">{caseItem.excerpt}</p>
        </section>

        <ImagePlaceholder className="h-[280px] lg:h-[400px] rounded-2xl mb-10 lg:mb-16" label={`Case: ${caseItem.client}`} src="/images/photos/care-packet-review.jpg" />

        <article className="max-w-[760px] mx-auto pb-12 lg:pb-16 space-y-6">
          <h2 className="text-2xl font-semibold">De uitdaging</h2>
          <p className="text-floren-text-body leading-relaxed">
            {caseItem.client} stond voor de uitdaging om hun medewerkers effectief bij te scholen en de kwaliteit van zorg meetbaar te verbeteren. Traditionele klassikale trainingen waren kostbaar en moeilijk in te plannen.
          </p>
          <h2 className="text-2xl font-semibold">De aanpak</h2>
          <p className="text-floren-text-body leading-relaxed">
            In samenwerking met Floren is een maatwerktraject opgezet waarbij digitale leeroplossingen werden gecombineerd met persoonlijke begeleiding. De implementatie werd geleid door onze consultants.
          </p>
          <h2 className="text-2xl font-semibold">Het resultaat</h2>
          <p className="text-floren-text-body leading-relaxed">
            Na drie maanden bereikte {caseItem.client} een resultaat van {caseItem.result}. Medewerkers ervaren het leerplatform als waardevol en praktijkgericht.
          </p>
        </article>

        {/* Consultant link */}
        {consultant && (
          <section className="max-w-[760px] mx-auto pb-12 border-t border-floren-card-alt pt-8">
            <h3 className="text-lg font-semibold mb-4">Betrokken consultant</h3>
            <Link href={`/experts/${consultant.slug}`} className="flex items-center gap-4 p-4 bg-floren-surface rounded-xl hover:bg-floren-card transition-colors">
              <div className="w-14 h-14 rounded-full bg-floren-lavender flex items-center justify-center text-xl font-bold">
                {consultant.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <p className="font-semibold">{consultant.name}</p>
                <p className="text-sm text-floren-text-muted">{consultant.role}</p>
              </div>
            </Link>
          </section>
        )}

        <CTABlock
          title="Ook zo\'n resultaat behalen?"
          description="Plan een demo en ontdek wat Floren voor jouw organisatie kan betekenen."
          primaryLabel="Plan een demo"
          primaryHref="/demo"
          secondaryLabel="Alle cases"
          secondaryHref="/cases"
        />
      </main>
      <Footer />
    </>
  )
}
