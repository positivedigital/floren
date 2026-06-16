import Header from '@/components/header'
import Footer from '@/components/footer'
import Breadcrumb from '@/components/breadcrumb'
import ImagePlaceholder from '@/components/image-placeholder'
import { Building2, Mail, Phone, ArrowRight } from 'lucide-react'

export default function DemoPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Demo aanvragen' },
        ]} />

        <section className="py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.7px] text-floren-text-muted">Contact</span>
            <h1 className="text-[2rem] lg:text-5xl font-extrabold leading-[1.05] tracking-tight mt-3 mb-5">
              Vraag een demo aan
            </h1>
            <p className="text-base lg:text-lg text-floren-text-body mb-8">
              Benieuwd hoe Floren jouw organisatie kan helpen? Vul het formulier in en we nemen binnen 24 uur contact op.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-floren-accent flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Persoonlijke demo</p>
                  <p className="text-sm text-floren-text-body">We laten je het platform zien, afgestemd op jouw branche.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-floren-lavender flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Offerte op maat</p>
                  <p className="text-sm text-floren-text-body">Ontvang een voorstel dat past bij de omvang van je organisatie.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-floren-card-alt p-6 lg:p-8">
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Naam</label>
                <input type="text" placeholder="Je volledige naam" className="w-full px-4 py-3 rounded-xl border border-floren-border text-sm bg-floren-bg focus:outline-none focus:ring-2 focus:ring-floren-accent" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">E-mailadres</label>
                <input type="email" placeholder="naam@organisatie.nl" className="w-full px-4 py-3 rounded-xl border border-floren-border text-sm bg-floren-bg focus:outline-none focus:ring-2 focus:ring-floren-accent" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Organisatie</label>
                <input type="text" placeholder="Naam van je organisatie" className="w-full px-4 py-3 rounded-xl border border-floren-border text-sm bg-floren-bg focus:outline-none focus:ring-2 focus:ring-floren-accent" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Branche</label>
                <select className="w-full px-4 py-3 rounded-xl border border-floren-border text-sm bg-floren-bg focus:outline-none focus:ring-2 focus:ring-floren-accent text-floren-text-body">
                  <option>Selecteer een branche</option>
                  <option>GGZ</option>
                  <option>Gehandicaptenzorg</option>
                  <option>Thuiszorg</option>
                  <option>Verpleging & Verzorging</option>
                  <option>Ziekenhuis</option>
                  <option>Zorgonderwijs</option>
                  <option>Anders</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Bericht (optioneel)</label>
                <textarea rows={3} placeholder="Waar ben je naar op zoek?" className="w-full px-4 py-3 rounded-xl border border-floren-border text-sm bg-floren-bg focus:outline-none focus:ring-2 focus:ring-floren-accent resize-none" />
              </div>
              <button type="button" className="w-full bg-floren-primary text-white rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-secondary transition-colors">
                Verstuur aanvraag
              </button>
              <p className="text-xs text-floren-text-muted text-center">We nemen binnen 24 uur contact op.</p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
