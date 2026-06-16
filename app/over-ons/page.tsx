import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import ImagePlaceholder from '@/components/image-placeholder'
import Link from 'next/link'

export default function OverOnsPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Over ons & methode' },
        ]} />

        {/* HERO */}
        <section className="py-8 lg:py-12 max-w-[760px]">
          <span className="text-xs font-semibold uppercase tracking-[0.7px] text-floren-text-muted">Over Floren</span>
          <h1 className="text-[2rem] lg:text-5xl font-extrabold leading-[1.05] tracking-tight mt-3 mb-4 lg:mb-5">
            De Floren-methodiek: leren dat blijft hangen
          </h1>
          <p className="text-base lg:text-lg text-floren-text-body">
            Wij geloven dat leren in de zorg pas waarde heeft als het toepasbaar is in de praktijk. Onze methodiek combineert microlearning, casuïstiek en borging tot een aanpak die werkt.
          </p>
        </section>

        <ImagePlaceholder label="Sfeerafbeelding" className="h-[200px] lg:h-[360px] rounded-2xl mb-10 lg:mb-16" src="/images/photos/care-laughing.jpg" />

        {/* RICHTEXT + TOC */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 pb-10 lg:pb-16">
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <p className="text-sm font-bold mb-3">Op deze pagina</p>
            <ul className="space-y-2 text-sm text-floren-text-body">
              <li><Link href="#missie" className="hover:text-floren-text transition-colors">Onze missie</Link></li>
              <li><Link href="#methodiek" className="hover:text-floren-text transition-colors">De methodiek</Link></li>
              <li><Link href="#duurzaamheid" className="hover:text-floren-text transition-colors">Duurzaamheid</Link></li>
              <li><Link href="#team" className="hover:text-floren-text transition-colors">Het team</Link></li>
            </ul>
          </aside>
          <div className="lg:col-span-2 space-y-6 text-floren-text-body leading-relaxed order-1 lg:order-2">
            <h2 id="missie" className="text-2xl font-semibold text-floren-text">Onze missie</h2>
            <p>De zorg verandert in rap tempo: personeelstekorten, een groeiende zorgvraag en nieuwe technologieën maken het noodzakelijk om slimmer en effectiever te leren. Floren bestaat om die transitie mogelijk te maken.</p>
            <h2 id="methodiek" className="text-2xl font-semibold text-floren-text">De methodiek</h2>
            <p>We werken volgens drie principes: relevantie, herhaling en borging. Door kennis te koppelen aan dagelijkse casuïstiek blijft het beter hangen en wordt het direct toepasbaar.</p>
          </div>
        </section>

        {/* STEPS */}
        <section className="pb-10 lg:pb-16">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-5 lg:mb-6">In drie stappen</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
              { num: '1', title: 'Analyse', desc: 'We brengen de leerbehoefte van je organisatie in kaart.' },
              { num: '2', title: 'Inrichten', desc: 'Leeroplossingen op maat, klaar voor gebruik.' },
              { num: '3', title: 'Borgen', desc: 'Rapportages en herinneringen houden kennis actueel.' },
            ]?.map((step: any) => (
              <article key={step?.num} className="p-6 lg:p-7 bg-floren-card rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-floren-primary text-white flex items-center justify-center font-bold mb-4">
                  {step?.num}
                </div>
                <h3 className="text-lg lg:text-xl font-semibold mb-2">{step?.title}</h3>
                <p className="text-sm">{step?.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA */}
        <CTABlock
          title="Wil je meer weten over onze aanpak?"
          description="Onze adviseurs vertellen je graag hoe de methodiek bij jouw organisatie past."
          primaryLabel="Vraag demo aan"
          primaryHref="/demo"
          secondaryLabel="Neem contact op"
          secondaryHref="/over-ons"
        />
      </main>
      <Footer />
    </>
  )
}
