import Header from '@/components/header'
import Footer from '@/components/footer'
import Breadcrumb from '@/components/breadcrumb'
import { solutions } from '@/lib/data'
import { notFound } from 'next/navigation'
import CheckoutClient from './checkout-client'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }))
}

const orgPlans = [
  {
    name: 'Basis',
    size: 'S',
    price: '€ 4,50',
    period: 'per gebruiker / maand',
    description: 'Ideaal om te starten met digitaal leren in een klein team.',
    features: [
      'Tot 50 gebruikers',
      'Basis leerpaden',
      'Voortgangsrapportage',
      'E-mail ondersteuning',
      'Maandelijks opzegbaar',
    ],
  },
  {
    name: 'Professioneel',
    size: 'M',
    price: '€ 7,50',
    period: 'per gebruiker / maand',
    description: 'Complete oplossing voor middelgrote organisaties met uitgebreide behoefte.',
    features: [
      'Onbeperkt gebruikers',
      'Alle leerpaden & modules',
      'Uitgebreide rapportages',
      'Dedicated accountmanager',
      'LMS/LXP integratie',
      'Onboarding programma',
      'Prioriteit support',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    size: 'L',
    price: 'Op maat',
    period: 'neem contact op',
    description: 'Maatwerk voor grote organisaties met specifieke wensen en compliance-eisen.',
    features: [
      'Alles van Professioneel',
      'Custom leerpaden',
      'API-toegang',
      'SSO & SCIM',
      'SLA & compliance',
      'Implementatie-begeleiding',
      'Training-on-the-job',
    ],
  },
]

// Subscription configs per solution slug
const subscriptionConfigs: Record<string, { id: string; label: string; sublabel: string; price: string; period: string; highlight?: boolean; badge?: string }[]> = {
  'psy-expert': [
    { id: 'intro', label: 'Introductie-abonnement', sublabel: 'Inclusief jaargang 2026 – tijdelijk 20% korting', price: '€ 534,00', period: 'per jaar', badge: '20% korting', highlight: true },
    { id: 'standaard', label: 'Standaard abonnement', sublabel: 'Ingaande laatste verschenen editie', price: '€ 668,00', period: 'per jaar' },
    { id: 'student', label: 'Student / AIOS', sublabel: '50% korting gedurende je studie', price: '€ 334,00', period: 'per jaar', badge: 'Student' },
  ],
  'zorgpad-professional': [
    { id: 'intro', label: 'Introductie-abonnement', sublabel: 'Eerste jaar 20% korting – alle leerpaden', price: '€ 439,00', period: 'per jaar', badge: '20% korting', highlight: true },
    { id: 'standaard', label: 'Standaard abonnement', sublabel: 'Volledige toegang tot 600+ leerpaden', price: '€ 549,00', period: 'per jaar' },
    { id: 'student', label: 'Student / AIOS', sublabel: '50% korting gedurende je studie', price: '€ 274,50', period: 'per jaar', badge: 'Student' },
  ],
  'microlearning': [
    { id: 'intro', label: 'Introductie-abonnement', sublabel: 'Tijdelijk 20% korting op je eerste jaar', price: '€ 159,00', period: 'per jaar', badge: '20% korting', highlight: true },
    { id: 'standaard', label: 'Standaard abonnement', sublabel: 'Onbeperkt toegang tot alle microlearnings', price: '€ 199,00', period: 'per jaar' },
  ],
  'protocollen': [
    { id: 'intro', label: 'Introductie-abonnement', sublabel: 'Inclusief alle protocollen – 20% korting', price: '€ 239,00', period: 'per jaar', badge: '20% korting', highlight: true },
    { id: 'standaard', label: 'Standaard abonnement', sublabel: 'Altijd actuele protocollen en richtlijnen', price: '€ 299,00', period: 'per jaar' },
  ],
  'askme': [
    { id: 'maand', label: 'Maandabonnement', sublabel: 'Flexibel opzegbaar per maand', price: '€ 29,00', period: 'per maand' },
    { id: 'jaar', label: 'Jaarabonnement', sublabel: '2 maanden gratis – automatische verlenging', price: '€ 290,00', period: 'per jaar', badge: 'Bespaar 17%', highlight: true },
  ],
}

// Default subscription options for products without specific config
const defaultSubscriptions = [
  { id: 'intro', label: 'Introductie-abonnement', sublabel: 'Eerste jaar 20% korting', price: '€ 359,00', period: 'per jaar', badge: '20% korting', highlight: true },
  { id: 'standaard', label: 'Standaard abonnement', sublabel: 'Volledige toegang – jaarlijks verlengd', price: '€ 449,00', period: 'per jaar' },
  { id: 'student', label: 'Student / AIOS', sublabel: '50% korting gedurende je studie', price: '€ 224,50', period: 'per jaar', badge: 'Student' },
]

export default function CheckoutPage({ params }: { params: { slug: string } }) {
  const solution = solutions.find((s) => s.slug === params.slug)
  if (!solution) return notFound()

  const checkoutType = solution.checkoutType || 'plan'
  const subscriptions = subscriptionConfigs[solution.slug] || defaultSubscriptions

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Leeroplossingen', href: '/leeroplossingen' },
          { label: solution.title, href: `/leeroplossingen/${solution.slug}` },
          { label: 'Bestellen' },
        ]} />

        {/* HERO */}
        <section className="py-8 lg:py-10 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.8px] py-1.5 px-4 bg-floren-lavender rounded-full mb-4">
            {checkoutType === 'subscription' ? 'Abonneren' : 'Bestellen'}
          </span>
          <h1 className="text-[2rem] lg:text-[2.5rem] font-extrabold leading-tight mb-3">
            {solution.title} {checkoutType === 'subscription' ? 'abonneren' : 'bestellen'}
          </h1>
          <p className="text-base lg:text-lg text-floren-text-body max-w-2xl mx-auto">
            {checkoutType === 'subscription'
              ? `Kies je abonnementstype en start direct met ${solution.title}.`
              : 'Kies het pakket dat past bij jouw organisatie en start vandaag nog met leren.'}
          </p>
        </section>

        <CheckoutClient
          solutionTitle={solution.title}
          checkoutType={checkoutType}
          plans={orgPlans}
          subscriptions={subscriptions}
        />
      </main>
      <Footer />
    </>
  )
}
