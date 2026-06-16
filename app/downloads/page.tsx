import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import { FileText, Download, BookOpen } from 'lucide-react'

const resources = [
  { title: 'Whitepaper: Digitale leeroplossingen in de GGZ 2024', type: 'Whitepaper', size: 'PDF · 2.4 MB', icon: FileText },
  { title: 'Implementatiegids: Van e-learning naar blended learning', type: 'Gids', size: 'PDF · 1.8 MB', icon: BookOpen },
  { title: 'Brochure: Floren voor zorgorganisaties', type: 'Brochure', size: 'PDF · 3.1 MB', icon: FileText },
  { title: 'Factsheet: Microlearning in de zorg', type: 'Factsheet', size: 'PDF · 0.9 MB', icon: FileText },
  { title: 'Curriculum overzicht MBO Verpleegkunde', type: 'Overzicht', size: 'PDF · 1.2 MB', icon: BookOpen },
  { title: 'ROI Calculator: Leren in de zorg', type: 'Tool', size: 'Excel · 0.5 MB', icon: Download },
]

export default function DownloadsPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[{ label: 'Downloads & Resources' }]} />
        <section className="py-8 lg:py-16 max-w-[680px]">
          <p className="text-sm font-semibold tracking-[0.7px] uppercase text-floren-text-muted mb-3">Kennisbank</p>
          <h1 className="text-[2rem] lg:text-5xl font-extrabold leading-[1.05] tracking-tight mb-4">Downloads & Resources</h1>
          <p className="text-base lg:text-lg text-floren-text-body">Whitepapers, brochures, implementatiegidsen en tools — alles wat je nodig hebt om leren in de zorg naar een hoger niveau te tillen.</p>
        </section>

        <section className="pb-10 lg:pb-16 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {resources.map((r) => (
            <article key={r.title} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-floren-card-alt hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-12 h-12 rounded-xl bg-floren-surface flex items-center justify-center shrink-0">
                <r.icon className="w-5 h-5 text-floren-text-muted" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold uppercase tracking-wide text-floren-text-muted">{r.type}</span>
                  <span className="text-xs text-floren-text-muted">{r.size}</span>
                </div>
                <h3 className="text-sm font-semibold group-hover:text-floren-secondary transition-colors truncate">{r.title}</h3>
              </div>
              <Download className="w-5 h-5 text-floren-text-muted shrink-0 group-hover:text-floren-secondary transition-colors" />
            </article>
          ))}
        </section>

        <CTABlock
          title="Op zoek naar specifieke content?"
          description="Neem contact op voor materiaal op maat voor jouw organisatie of opleiding."
          primaryLabel="Neem contact op"
          primaryHref="/demo"
          secondaryLabel="Bekijk artikelen"
          secondaryHref="/artikelen"
        />
      </main>
      <Footer />
    </>
  )
}
