import Header from '@/components/header'
import Footer from '@/components/footer'
import ImagePlaceholder from '@/components/image-placeholder'
import Link from 'next/link'
import { ArrowRight, GraduationCap, Users } from 'lucide-react'
import CTABlock from '@/components/cta-block'

/* ============================================================
   ONDERWIJS LANDING — General education overview
   Routes to /onderwijs/studenten and /onderwijs/docenten
   ============================================================ */

export default function OnderwijsPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">

        {/* HERO */}
        <section className="py-10 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 py-1 px-3 bg-floren-lavender rounded-full text-xs font-medium mb-4">
              Zorgonderwijs
            </div>
            <h1 className="text-[2rem] lg:text-[2.75rem] font-extrabold leading-[1.08] tracking-tight mb-5">
              Zorgeloos leren voor de zorg.
            </h1>
            <p className="text-sm lg:text-base text-floren-text-body mb-8 max-w-[460px] leading-relaxed">
              Floren ondersteunt MBO- en HBO-opleidingen met actuele, praktijkgerichte leermiddelen. Van digitale toetsing tot stage-voorbereiding — alles op één plek.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/onderwijs/studenten" className="text-center bg-floren-primary text-white rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-secondary transition-colors">
                Voor studenten
              </Link>
              <Link href="/onderwijs/docenten" className="text-center border-2 border-floren-primary text-floren-primary rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-surface transition-colors">
                Voor docenten
              </Link>
            </div>
          </div>
          <div className="relative h-[260px] lg:h-[380px] rounded-2xl overflow-hidden">
            <ImagePlaceholder className="h-full w-full rounded-none" label="Zorgonderwijs" src="/images/photos/hero-student.jpg" />
          </div>
        </section>

        {/* AUDIENCE CARDS */}
        <section className="pb-12 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student card */}
            <Link href="/onderwijs/studenten" className="group bg-white rounded-2xl border border-floren-card-alt overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48 lg:h-56">
                <ImagePlaceholder className="h-full w-full rounded-none" label="Studenten" src="/images/photos/mbo-studenten-praktijk.jpg" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-floren-accent/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-floren-primary" />
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-floren-secondary transition-colors">Voor Studenten</h3>
                </div>
                <p className="text-sm text-floren-text-body mb-4">
                  Bereid je optimaal voor op de praktijk met interactieve modules, video’s en digitale toetsen.
                </p>
                <span className="text-sm font-semibold text-floren-primary flex items-center gap-1">
                  Bekijk studentenpagina <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Docent card */}
            <Link href="/onderwijs/docenten" className="group bg-white rounded-2xl border border-floren-card-alt overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48 lg:h-56">
                <ImagePlaceholder className="h-full w-full rounded-none" label="Docenten" src="/images/photos/care-explaining.jpg" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-floren-lavender/60 flex items-center justify-center">
                    <Users className="w-5 h-5 text-floren-primary" />
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-floren-secondary transition-colors">Voor Docenten</h3>
                </div>
                <p className="text-sm text-floren-text-body mb-4">
                  Tools voor toetsing, LMS-integratie en actuele casusbeschrijvingen voor in je curriculum.
                </p>
                <span className="text-sm font-semibold text-floren-primary flex items-center gap-1">
                  Bekijk docentenpagina <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>

        <CTABlock
          title="Meer weten over Floren voor onderwijs?"
          description="Neem contact op voor een vrijblijvend gesprek over de mogelijkheden."
          primaryLabel="Vraag demo aan"
          primaryHref="/demo"
          secondaryLabel="Bekijk leeroplossingen"
          secondaryHref="/leeroplossingen"
        />

      </main>
      <Footer />
    </>
  )
}
