import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import HomeClient from './_components/home-client'

const stats = [
  { value: '6.000+', label: 'Redactionele antwoorden' },
  { value: '250+', label: 'Zorgorganisaties' },
  { value: '95%', label: 'Tevreden gebruikers' },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <HomeClient />

        {/* STATS */}
        <section className="py-8 lg:py-12 px-6 lg:px-10 bg-floren-secondary rounded-[28px] lg:rounded-[32px] flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8 text-center text-floren-light mb-10 lg:mb-16">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-extrabold">{stat.value}</div>
              <p className="text-sm text-floren-light/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <CTABlock
          title="Klaar om de zorgkwaliteit te verhogen?"
          description="Plan een demo of bekijk de abonnementen die bij jouw situatie passen."
          primaryLabel="Vraag demo aan"
          primaryHref="/demo"
          secondaryLabel="Bekijk abonnementen"
          secondaryHref="/leeroplossingen"
        />
      </main>
      <Footer />
    </>
  )
}
