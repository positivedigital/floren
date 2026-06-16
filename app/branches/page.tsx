import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import BranchesClient from './_components/branches-client'

export default function BranchesPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Branches' },
        ]} />

        <section className="py-8 lg:py-12 max-w-[720px]">
          <h1 className="text-[2rem] lg:text-5xl font-extrabold leading-[1.05] tracking-tight mb-3 lg:mb-4">
            Leeroplossingen per branche
          </h1>
          <p className="text-base lg:text-lg text-floren-text-body">
            Elke zorgbranche heeft eigen vraagstukken. Kies je branche en ontdek de leeroplossingen die daarbij passen.
          </p>
        </section>

        <BranchesClient />

        <CTABlock
          title="Staat jouw branche er niet bij?"
          description="We denken graag mee over een passende leeroplossing."
          primaryLabel="Vraag een gesprek aan"
          primaryHref="/demo"
          secondaryLabel="Bekijk leeroplossingen"
          secondaryHref="/leeroplossingen"
        />
      </main>
      <Footer />
    </>
  )
}
