import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import ImagePlaceholder from '@/components/image-placeholder'
import Link from 'next/link'
import { cases as casesData, experts } from '@/lib/data'
import { ArrowRight } from 'lucide-react'

export default function CasesPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Cases' },
        ]} />

        <section className="py-8 lg:py-16 max-w-[760px]">
          <span className="text-xs font-semibold uppercase tracking-[0.7px] text-floren-text-muted">Klantresultaten</span>
          <h1 className="text-[2rem] lg:text-5xl font-extrabold leading-[1.05] tracking-tight mt-3 mb-5">
            Wat onze klanten bereiken
          </h1>
          <p className="text-base lg:text-lg text-floren-text-body">
            Concrete resultaten van zorginstellingen die met Floren werken. Bekijk de cases en ontdek wat mogelijk is.
          </p>
        </section>

        <section className="pb-12 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {casesData.map((c) => {
              const consultant = experts.find(e => e.slug === c.consultant)
              return (
                <article key={c.slug} className="bg-white rounded-2xl border border-floren-card-alt overflow-hidden hover:shadow-md transition-shadow">
                  <ImagePlaceholder className="h-40 border-b" src="/images/photos/case-success.jpg" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-floren-text-muted">{c.branche}</span>
                      <span className="text-xs font-bold py-0.5 px-2 bg-floren-accent rounded-full">{c.result}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                    <p className="text-sm text-floren-text-body mb-4">{c.excerpt}</p>
                    {consultant && (
                      <Link href={`/experts/${consultant.slug}`} className="flex items-center gap-2 text-xs text-floren-text-muted hover:text-floren-text">
                        <div className="w-6 h-6 rounded-full bg-floren-lavender flex items-center justify-center text-[10px] font-bold">{consultant.name.charAt(0)}</div>
                        <span className="font-semibold">{consultant.name}</span>
                        <span>·</span>
                        <span>{consultant.role}</span>
                      </Link>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <CTABlock
          title="Benieuwd wat Floren voor jou kan betekenen?"
          description="Plan een demo en ontdek hoe we samen impact maken."
          primaryLabel="Plan een demo"
          primaryHref="/demo"
          secondaryLabel="Bekijk oplossingen"
          secondaryHref="/leeroplossingen"
        />
      </main>
      <Footer />
    </>
  )
}
