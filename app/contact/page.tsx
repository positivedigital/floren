import Header from '@/components/header'
import Footer from '@/components/footer'
import Breadcrumb from '@/components/breadcrumb'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[{ label: 'Contact' }]} />
        <section className="py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div>
            <p className="text-sm font-semibold tracking-[0.7px] uppercase text-floren-text-muted mb-3">Neem contact op</p>
            <h1 className="text-[2rem] lg:text-5xl font-extrabold leading-[1.05] tracking-tight mb-5">We helpen je graag</h1>
            <p className="text-base lg:text-lg text-floren-text-body mb-8">Heb je een vraag over onze leeroplossingen, een demo-aanvraag of wil je sparren over de mogelijkheden? We staan voor je klaar.</p>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-floren-surface flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-floren-text-body" /></div>
                <div>
                  <p className="font-semibold text-sm">E-mail</p>
                  <p className="text-sm text-floren-text-body">info@floren.nl</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-floren-surface flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-floren-text-body" /></div>
                <div>
                  <p className="font-semibold text-sm">Telefoon</p>
                  <p className="text-sm text-floren-text-body">+31 (0)85 130 1090</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-floren-surface flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-floren-text-body" /></div>
                <div>
                  <p className="font-semibold text-sm">Adres</p>
                  <p className="text-sm text-floren-text-body">Floren Noordhoff Zorg<br />Groningen, Nederland</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-floren-surface flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-floren-text-body" /></div>
                <div>
                  <p className="font-semibold text-sm">Bereikbaarheid</p>
                  <p className="text-sm text-floren-text-body">Ma t/m vr: 09:00 – 17:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-floren-card-alt p-6 lg:p-8">
            <h2 className="text-xl font-semibold mb-5">Stuur een bericht</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Naam</label>
                <input type="text" className="w-full border border-floren-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-floren-accent" placeholder="Uw volledige naam" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">E-mailadres</label>
                <input type="email" className="w-full border border-floren-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-floren-accent" placeholder="naam@organisatie.nl" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Onderwerp</label>
                <select className="w-full border border-floren-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-floren-accent bg-white">
                  <option value="">Selecteer een onderwerp</option>
                  <option>Demo aanvraag</option>
                  <option>Vraag over leeroplossingen</option>
                  <option>Samenwerking</option>
                  <option>Technische support</option>
                  <option>Anders</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bericht</label>
                <textarea rows={4} className="w-full border border-floren-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-floren-accent resize-none" placeholder="Waar kunnen we u mee helpen?" />
              </div>
              <button type="button" className="w-full bg-floren-primary text-white rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-secondary transition-colors">
                Verstuur bericht
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
