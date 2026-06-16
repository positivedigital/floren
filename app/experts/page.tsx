import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import ImagePlaceholder from '@/components/image-placeholder'
import Link from 'next/link'
import { experts } from '@/lib/data'
import { ArrowRight, Mail } from 'lucide-react'

export default function ExpertsPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Experts' },
        ]} />

        <section className="py-8 lg:py-16 max-w-[760px]">
          <span className="text-xs font-semibold uppercase tracking-[0.7px] text-floren-text-muted">Ons team</span>
          <h1 className="text-[2rem] lg:text-5xl font-extrabold leading-[1.05] tracking-tight mt-3 mb-5">
            Experts die de zorg kennen
          </h1>
          <p className="text-base lg:text-lg text-floren-text-body">
            Onze consultants combineren inhoudelijke expertise met praktijkervaring in de zorg. Ze begeleiden je van strategie tot implementatie.
          </p>
        </section>

        <section className="pb-12 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {experts.map((expert) => (
              <Link
                key={expert.slug}
                href={`/experts/${expert.slug}`}
                className="flex gap-5 p-5 bg-white rounded-2xl border border-floren-card-alt hover:shadow-md transition-shadow group"
              >
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-floren-card-alt overflow-hidden shrink-0">
                  <ImagePlaceholder className="w-full h-full rounded-none" label={expert.name} src={expert.image} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold group-hover:text-floren-secondary transition-colors">{expert.name}</h3>
                  <p className="text-sm text-floren-text-muted mb-2">{expert.role}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {expert.specialisatie.map((s) => (
                      <span key={s} className="text-[10px] font-medium py-1 px-2.5 bg-floren-lavender text-floren-text-body rounded-full">{s}</span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-floren-text-body flex items-center gap-1 group-hover:text-floren-text">
                    Bekijk profiel <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <CTABlock
          title="Wil je advies van een expert?"
          description="Onze consultants denken graag mee over de beste leeraanpak voor jouw organisatie."
          primaryLabel="Neem contact op"
          primaryHref="/demo"
          secondaryLabel="Bekijk leeroplossingen"
          secondaryHref="/leeroplossingen"
        />
      </main>
      <Footer />
    </>
  )
}
