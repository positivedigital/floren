import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import Link from 'next/link'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Basis',
    size: 'S',
    price: 'Vanaf \u20ac12',
    period: 'per medewerker / maand',
    description: 'Toegang tot het kernplatform voor kleine teams.',
    features: [
      'Toegang tot ZorgPad Professional',
      'Basisrapportages',
      'E-mail support',
      'Max. 50 gebruikers',
    ],
    highlighted: false,
  },
  {
    name: 'Professioneel',
    size: 'M',
    price: 'Vanaf \u20ac19',
    period: 'per medewerker / maand',
    description: 'Het meest gekozen pakket voor zorginstellingen.',
    features: [
      'Alles uit Basis',
      'Studytube LXP inclusief',
      'Microlearning modules',
      'Uitgebreide dashboards',
      'Implementatiebegeleiding',
      'Onbeperkt gebruikers',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    size: 'L',
    price: 'Op maat',
    period: 'neem contact op',
    description: 'Volledig maatwerkpakket voor grote organisaties.',
    features: [
      'Alles uit Professioneel',
      'Dedicated consultant',
      'Custom integraties (SSO, HR)',
      'Assessor & Protocollen',
      'SLA & prioriteitssupport',
      'Organisatieadvies',
    ],
    highlighted: false,
  },
]

export default function AbonnementPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Abonnement' },
        ]} />

        <section className="py-8 lg:py-16 text-center max-w-[760px] mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.7px] text-floren-text-muted">Abonnementen</span>
          <h1 className="text-[2rem] lg:text-5xl font-extrabold leading-[1.05] tracking-tight mt-3 mb-5">
            Kies het pakket dat bij je past
          </h1>
          <p className="text-base lg:text-lg text-floren-text-body">
            Van individuele professional tot grote zorgorganisatie — er is altijd een passend abonnement.
          </p>
        </section>

        <section className="pb-12 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`p-6 lg:p-8 rounded-2xl border-2 flex flex-col ${
                  plan.highlighted
                    ? 'border-floren-accent bg-white shadow-lg relative'
                    : 'border-floren-card-alt bg-white'
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold py-1 px-4 bg-floren-accent rounded-full">
                    Meest gekozen
                  </span>
                )}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-8 rounded-lg bg-floren-card flex items-center justify-center text-sm font-bold">{plan.size}</span>
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                  </div>
                  <p className="text-sm text-floren-text-body">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <p className="text-3xl font-extrabold">{plan.price}</p>
                  <p className="text-sm text-floren-text-muted">{plan.period}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-floren-text-body">
                      <Check className="w-4 h-4 text-floren-accent shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className={`w-full text-center rounded-xl px-7 py-3.5 text-sm font-bold transition-colors ${
                    plan.highlighted
                      ? 'bg-floren-primary text-white hover:bg-floren-secondary'
                      : 'border-2 border-floren-primary text-floren-primary hover:bg-floren-surface'
                  }`}
                >
                  {plan.price === 'Op maat' ? 'Neem contact op' : 'Start nu'}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <CTABlock
          title="Hulp bij het kiezen?"
          description="Onze adviseurs helpen je graag bij het vinden van het juiste abonnement."
          primaryLabel="Neem contact op"
          primaryHref="/demo"
          secondaryLabel="Bekijk leeroplossingen"
          secondaryHref="/leeroplossingen"
        />
      </main>
      <Footer />
    </>
  )
}
