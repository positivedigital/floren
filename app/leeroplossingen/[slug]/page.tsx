import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import ImagePlaceholder from '@/components/image-placeholder'
import Link from 'next/link'
import { solutions, experts } from '@/lib/data'
import { ArrowRight, Check, BookOpen, BarChart3, Library, UserPlus, FileBarChart, Link2, ChevronDown, FileText, Folder, FlaskConical } from 'lucide-react'
import { notFound } from 'next/navigation'
import SolutionPdpClient from './pdp-client'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }))
}

const featureIcons: Record<string, any> = {
  leerpaden: BookOpen,
  inzicht: BarChart3,
  bibliotheek: Library,
  onboarding: UserPlus,
  rapportages: FileBarChart,
  koppeling: Link2,
}

export default function SolutionDetailPage({ params }: { params: { slug: string } }) {
  const solution = solutions.find((s) => s.slug === params.slug)
  if (!solution) return notFound()

  const pdp = (solution as any).pdp as any | undefined
  const related = solutions.filter((s) => s.slug !== solution.slug && s.type === solution.type).slice(0, 2)
  const relevantExperts = experts.filter((e) =>
    e.specialisatie.some((s) => solution.branches.some((b) => b.includes(s) || s.includes(b)))
  ).slice(0, 2)

  // Rich PDP layout (for Psy Expert and future products)
  if (pdp) {
    return (
      <>
        <Header />
        <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Leeroplossingen', href: '/leeroplossingen' },
            { label: solution.title },
          ]} />

          {/* HERO */}
          <section className="py-8 lg:py-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.8px] py-1.5 px-4 bg-floren-lavender rounded-full mb-5">Leeroplossing</span>
              <h1 className="text-[2rem] lg:text-[2.75rem] font-extrabold leading-[1.08] tracking-tight mb-4">
                Floren Leeroplossing voor de zorg
              </h1>
              <p className="text-base lg:text-lg text-floren-text-body mb-4">{solution.description}</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link href="/demo" className="text-center bg-floren-primary text-white rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-secondary transition-colors">
                  Vraag een gesprek aan
                </Link>
                <Link href={`/bestellen/${solution.slug}`} className="text-center border-2 border-floren-primary text-floren-primary rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-surface transition-colors">
                  Leeroplossing bestellen
                </Link>
              </div>
            </div>
            <ImagePlaceholder className="h-[220px] lg:h-[380px] rounded-2xl" label={solution.title} src={solution.image} />
          </section>

          {/* RESULTS */}
          <section className="py-10 lg:py-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-10">Wat deze leeroplossing oplevert</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              {pdp.results.map((r: any) => (
                <div key={r.title} className="p-6 lg:p-8 bg-floren-primary text-white rounded-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-[1.2px] text-white/60 block mb-3">{r.label}</span>
                  <h3 className="text-xl font-bold mb-2">{r.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{r.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* STATS (mobile-style bar) */}
          {pdp.stats && (
            <section className="py-6 lg:py-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {pdp.stats.map((s: any) => (
                  <div key={s.label} className="text-center p-5 bg-floren-surface rounded-2xl">
                    <div className="text-2xl lg:text-3xl font-extrabold text-floren-primary">{s.value}</div>
                    <div className="text-xs text-floren-text-muted mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* AUDIENCE */}
          <section className="py-10 lg:py-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-10">Voor wie is deze oplossing geschikt?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
              {pdp.audiences.map((a: any) => (
                <div key={a.title} className="rounded-2xl overflow-hidden bg-white border border-floren-card-alt">
                  <ImagePlaceholder className="h-48 border-b" src={a.image} />
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2">{a.title}</h3>
                    <p className="text-sm text-floren-text-body leading-relaxed">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FEATURES GRID */}
          <section className="py-10 lg:py-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-10">Alles wat deze leeroplossing bied</h2>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {pdp.features.map((f: any) => {
                const Icon = featureIcons[f.icon] || BookOpen
                return (
                  <div key={f.title} className="p-5 lg:p-6 bg-floren-surface rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-floren-card flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-floren-primary" />
                    </div>
                    <h3 className="text-sm lg:text-base font-bold mb-1">{f.title}</h3>
                    <p className="text-xs lg:text-sm text-floren-text-muted leading-relaxed">{f.description}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* BIG IMAGE */}
          <section className="py-6">
            <ImagePlaceholder className="h-[240px] lg:h-[400px] rounded-2xl w-full" src="/images/photos/care-laughing.jpg" />
          </section>

          {/* WHY FLOREN */}
          <section className="py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <ImagePlaceholder className="h-[260px] lg:h-[360px] rounded-2xl" src="/images/photos/care-together.jpg" />
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6">Waarom deze leeroplossing via Floren?</h2>
              <ul className="space-y-4">
                {pdp.whyFloren.map((reason: string) => {
                  const parts = reason.split(':')
                  return (
                    <li key={reason} className="flex gap-3">
                      <Check className="w-5 h-5 text-floren-accent mt-0.5 shrink-0" />
                      <span className="text-sm text-floren-text-body leading-relaxed">
                        <strong className="text-floren-text">{parts[0]}:</strong>{parts.slice(1).join(':')}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>

          {/* TESTIMONIAL */}
          <section className="py-10 lg:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-5xl text-floren-accent mb-6">&ldquo;&rdquo;</div>
              <blockquote className="text-lg lg:text-xl font-medium text-floren-text leading-relaxed mb-6">
                &ldquo;{pdp.testimonial.quote}&rdquo;
              </blockquote>
              <div className="text-sm text-floren-text-muted">
                <span className="font-semibold text-floren-text">{pdp.testimonial.author}</span>,{' '}
                {pdp.testimonial.org}
              </div>
            </div>
          </section>

          {/* RESOURCES */}
          <section className="py-10 lg:py-16">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-10">Meer weten?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              {pdp.resources.map((r: any) => {
                const ResIcon = r.type === 'Brochure' ? FileText : r.type === 'Praktijkcase' ? Folder : FlaskConical
                return (
                  <Link key={r.type} href={r.href} className="p-6 bg-white border border-floren-card-alt rounded-2xl hover:shadow-md transition-shadow group">
                    <div className="w-10 h-10 rounded-xl bg-floren-surface flex items-center justify-center mb-4">
                      <ResIcon className="w-5 h-5 text-floren-primary" />
                    </div>
                    <h3 className="text-base font-bold mb-2 group-hover:text-floren-secondary transition-colors">{r.type}</h3>
                    <p className="text-sm text-floren-text-muted leading-relaxed">{r.title}</p>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* FAQ ACCORDION */}
          <SolutionPdpClient faq={pdp.faq} />

          {/* BOTTOM CTA */}
          <section className="py-10 lg:py-16">
            <div className="bg-floren-primary rounded-3xl p-8 lg:p-14 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Benieuwd of deze leeroplossing past bij jouw organisatie?
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                <Link href="/demo" className="bg-floren-accent text-floren-primary rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-accent/80 transition-colors">
                  Trial aanvragen
                </Link>
                <Link href="/contact" className="border-2 border-white/30 text-white rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-white/10 transition-colors">
                  Neem contact op
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  // Default simple PDP for other solutions
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Leeroplossingen', href: '/leeroplossingen' },
          { label: solution.title },
        ]} />

        {/* Hero */}
        <section className="py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-wide py-1 px-3 bg-floren-lavender rounded-full mb-4">{solution.type}</span>
            <h1 className="text-[2rem] lg:text-4xl font-extrabold leading-tight mb-3">{solution.title}</h1>
            <p className="text-lg text-floren-text-muted mb-4">{solution.subtitle}</p>
            <p className="text-base text-floren-text-body mb-6">{solution.description}</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {solution.branches.map((b) => (
                <span key={b} className="text-xs font-medium py-1 px-2.5 bg-floren-surface text-floren-text-muted rounded-full">{b}</span>
              ))}
            </div>
            <div className="flex flex-col lg:flex-row gap-3">
              <Link href="/abonnement" className="w-full lg:w-auto text-center bg-floren-primary text-white rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-secondary transition-colors">
                Bekijk abonnementen
              </Link>
              <Link href="/demo" className="w-full lg:w-auto text-center border-2 border-floren-primary text-floren-primary rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-surface transition-colors">
                Vraag demo aan
              </Link>
            </div>
          </div>
          <ImagePlaceholder className="h-[240px] lg:h-[380px] rounded-2xl" label={solution.title} src={solution.image} />
        </section>

        {/* Features */}
        <section className="py-8 lg:py-12 border-t border-floren-card-alt">
          <h2 className="text-2xl font-semibold mb-6">Kenmerken</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[
              'Praktijkgericht en evidence-based',
              'Direct toepasbaar op de werkvloer',
              'Rapportages en voortgangsinzicht',
              'Geschikt voor alle zorgniveaus',
              'Mobiel en desktop beschikbaar',
              'Continu bijgewerkt volgens richtlijnen',
            ].map((f) => (
              <div key={f} className="flex items-center gap-3 p-4 bg-floren-surface rounded-xl">
                <Check className="w-5 h-5 text-floren-accent shrink-0" />
                <span className="text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Relevant experts */}
        {relevantExperts.length > 0 && (
          <section className="py-8 lg:py-12 border-t border-floren-card-alt">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-2xl font-semibold">Onze experts voor {solution.title}</h2>
              <Link href="/experts" className="hidden lg:flex items-center gap-1 text-sm font-semibold text-floren-text-body hover:text-floren-text">
                Alle experts <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {relevantExperts.map((expert) => (
                <Link
                  key={expert.slug}
                  href={`/experts/${expert.slug}`}
                  className="flex gap-4 p-5 bg-white rounded-2xl border border-floren-card-alt hover:shadow-md transition-shadow group"
                >
                  <div className="w-14 h-14 rounded-xl bg-floren-card-alt flex items-center justify-center text-lg font-bold text-floren-text-muted shrink-0">
                    {expert.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-floren-secondary transition-colors">{expert.name}</h3>
                    <p className="text-sm text-floren-text-muted">{expert.role}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related solutions */}
        {related.length > 0 && (
          <section className="py-8 lg:py-12 border-t border-floren-card-alt">
            <h2 className="text-2xl font-semibold mb-6">Gerelateerde oplossingen</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {related.map((s) => (
                <Link key={s.slug} href={`/leeroplossingen/${s.slug}`} className="flex gap-4 p-5 bg-white rounded-2xl border border-floren-card-alt hover:shadow-md transition-shadow group">
                  <ImagePlaceholder className="w-24 h-24 rounded-xl shrink-0" src={s.image} />
                  <div>
                    <span className="text-xs font-semibold uppercase text-floren-text-muted">{s.type}</span>
                    <h3 className="font-semibold mt-1 group-hover:text-floren-secondary transition-colors">{s.title}</h3>
                    <p className="text-sm text-floren-text-body mt-1">{s.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <CTABlock
          title="Interesse in deze oplossing?"
          description="Plan een demo of neem contact op voor meer informatie."
          primaryLabel="Vraag demo aan"
          primaryHref="/demo"
          secondaryLabel="Bekijk abonnementen"
          secondaryHref="/abonnement"
        />
      </main>
      <Footer />
    </>
  )
}
