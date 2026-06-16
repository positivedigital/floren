import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import ImagePlaceholder from '@/components/image-placeholder'
import { BookOpen, Users, BarChart3 } from 'lucide-react'

const features = [
  { icon: BookOpen, title: 'Kant-en-klare lesmaterialen', description: 'Direct inzetbare modules die aansluiten bij het curriculum van MBO en HBO zorgopleidingen.' },
  { icon: Users, title: 'Voortgang van studenten volgen', description: 'Dashboard met realtime inzicht in leerresultaten, voortgang en knelpunten per student.' },
  { icon: BarChart3, title: 'Toetsing & beoordeling', description: 'Digitale toetsen met directe feedback en rapportages voor formatieve en summatieve toetsing.' },
]

export default function DocentenPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[{ label: 'Onderwijs', href: '/onderwijs' }, { label: 'Voor Docenten' }]} />
        <section className="py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 py-1 px-3 bg-floren-lavender rounded-full text-xs font-medium mb-4">Voor docenten</div>
            <h1 className="text-[2rem] lg:text-5xl font-extrabold leading-[1.05] tracking-tight mb-4">Onderwijs dat werkt in de praktijk</h1>
            <p className="text-base lg:text-lg text-floren-text-body">Geef je studenten de beste voorbereiding op de zorgpraktijk met evidence-based leermaterialen en digitale toetsing.</p>
          </div>
          <ImagePlaceholder className="h-[220px] lg:h-[380px] rounded-2xl" src="/images/photos/care-kitchen.jpg" alt="Docent in het zorgonderwijs" />
        </section>

        <section className="pb-10 lg:pb-16 grid grid-cols-1 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <article key={f.title} className="p-6 bg-floren-card rounded-2xl">
              <div className="w-12 h-12 rounded-xl bg-floren-primary text-white flex items-center justify-center mb-4"><f.icon className="w-5 h-5" /></div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-floren-text-body">{f.description}</p>
            </article>
          ))}
        </section>

        <CTABlock
          title="Interesse in Floren voor uw opleiding?"
          description="Vraag een vrijblijvend onderwijspakket aan of plan een gesprek met onze specialist."
          primaryLabel="Contact met specialist"
          primaryHref="/demo"
          secondaryLabel="Bekijk oplossingen"
          secondaryHref="/leeroplossingen"
        />
      </main>
      <Footer />
    </>
  )
}
