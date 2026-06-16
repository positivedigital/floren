import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import ImagePlaceholder from '@/components/image-placeholder'
import Link from 'next/link'
import { ArrowRight, Calendar, Users, Award } from 'lucide-react'

const masterclasses = [
  { title: 'Medicatieveiligheid in de VVT', date: '24 januari 2026', spots: '12 plekken beschikbaar', level: 'Verdiepend', slug: 'medicatieveiligheid-vvt', image: '/images/photos/care-medication-review.jpg' },
  { title: 'Motivational Interviewing in de GGZ', date: '7 februari 2026', spots: '8 plekken beschikbaar', level: 'Basis', slug: 'motivational-interviewing', image: '/images/photos/care-conversation.jpg' },
  { title: 'Palliatieve zorg: van theorie naar praktijk', date: '14 maart 2026', spots: '15 plekken beschikbaar', level: 'Verdiepend', slug: 'palliatieve-zorg', image: '/images/photos/care-together.jpg' },
  { title: 'Digitale gezondheidsvaardigheden', date: '28 maart 2026', spots: '20 plekken beschikbaar', level: 'Basis', slug: 'digitale-gezondheidsvaardigheden', image: '/images/photos/care-explaining.jpg' },
]

export default function MasterclassesPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[{ label: 'Masterclasses' }]} />
        <section className="py-8 lg:py-16 max-w-[680px]">
          <p className="text-sm font-semibold tracking-[0.7px] uppercase text-floren-text-muted mb-3">Live & on-demand</p>
          <h1 className="text-[2rem] lg:text-5xl font-extrabold leading-[1.05] tracking-tight mb-4">Masterclasses</h1>
          <p className="text-base lg:text-lg text-floren-text-body">Verdiep je kennis met praktijkgerichte masterclasses van onze experts. Live of op je eigen tempo.</p>
        </section>

        <section className="pb-10 lg:pb-16 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {masterclasses.map((mc) => (
            <article key={mc.slug} className="bg-white rounded-2xl border border-floren-card-alt overflow-hidden hover:shadow-md transition-shadow">
              <ImagePlaceholder className="h-48 border-b" src={mc.image} alt={mc.title} />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-3 py-1 bg-floren-lavender rounded-full">{mc.level}</span>
                  <span className="text-xs text-floren-text-muted flex items-center gap-1"><Calendar className="w-3 h-3" />{mc.date}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{mc.title}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-floren-text-muted flex items-center gap-1"><Users className="w-3 h-3" />{mc.spots}</span>
                  <span className="text-sm font-bold flex items-center gap-1 text-floren-text-body">Meer info <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </div>
            </article>
          ))}
        </section>

        <CTABlock
          title="Wil je een masterclass op maat voor jouw team?"
          description="Neem contact op voor een in-company masterclass."
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
