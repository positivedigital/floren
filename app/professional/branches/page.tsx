import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import Link from 'next/link'

export default function ProfessionalBranchesPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Professional', href: '/professional' },
          { label: 'Branches' },
        ]} />

        {/* HERO */}
        <section className="py-6 lg:py-10">
          <h1 className="text-[2rem] lg:text-5xl font-extrabold leading-[1.05] tracking-tight mb-4">
            Leeroplossingen per branche
          </h1>
          <p className="text-base lg:text-lg text-floren-text-body max-w-[600px]">
            Elke zorgbranche heeft eigen vraagstukken. Kies je branche en ontdek de leeroplossingen die daarbij passen.
          </p>
        </section>

        {/* FILTER + GRID — client component */}
        <BranchesGrid />

        <div className="mt-6">
          <CTABlock
            title="Hulp nodig bij het kiezen?"
            description="Onze adviseurs helpen je graag met het vinden van de juiste leeroplossing."
            primaryLabel="Neem contact op"
            primaryHref="/contact"
            secondaryLabel="Bekijk alle leeroplossingen"
            secondaryHref="/professional/leeroplossingen"
          />
        </div>
      </main>
      <Footer />
    </>
  )
}

// Client component for interactive filtering
import BranchesGrid from './branches-client'
