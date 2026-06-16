import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import SolutionsClient from './_components/solutions-client'

export default function LeeroplossingenPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Leeroplossingen' },
        ]} />

        <section className="py-8 lg:py-12 max-w-[720px]">
          <h1 className="text-[2rem] lg:text-5xl font-extrabold leading-[1.05] tracking-tight mb-3 lg:mb-4">
            Alle leeroplossingen
          </h1>
          <p className="text-base lg:text-lg text-floren-text-body">
            Van e-learning tot platforms en consultancy. Filter op doelgroep, type of branche en vind wat past.
          </p>
        </section>

        <SolutionsClient />

        <CTABlock
          title="Hulp nodig bij de juiste keuze?"
          description="Onze adviseurs uit de zorg helpen je graag bij het vinden van de juiste leeroplossing."
          primaryLabel="Vraag een gesprek aan"
          primaryHref="/demo"
          secondaryLabel="Bekijk branches"
          secondaryHref="/branches"
        />
      </main>
      <Footer />
    </>
  )
}
