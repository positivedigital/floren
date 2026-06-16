'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ChevronRight, ArrowLeft, Check, Lock, ShieldCheck } from 'lucide-react'
import type { CheckoutType } from '@/lib/data'

/* ============================================================
   TYPES
   ============================================================ */
interface Plan {
  name: string
  size: string
  price: string
  period: string
  description: string
  features: string[]
  popular?: boolean
}

interface SubscriptionOption {
  id: string
  label: string
  sublabel: string
  price: string
  period: string
  highlight?: boolean
  badge?: string
}

interface CheckoutClientProps {
  solutionTitle: string
  checkoutType: CheckoutType
  plans: Plan[]
  subscriptions: SubscriptionOption[]
}

/* ============================================================
   STEP INDICATOR
   ============================================================ */
function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const allSteps = [
    { num: 1, label: 'Pakket kiezen' },
    { num: 2, label: 'Gegevens' },
    { num: 3, label: 'Betalen' },
    { num: 4, label: 'Bevestiging' },
  ].slice(0, totalSteps)

  return (
    <div className="flex items-center justify-center gap-0 mb-10 lg:mb-12">
      {allSteps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step.num < currentStep
                  ? 'bg-floren-accent text-floren-text'
                  : step.num === currentStep
                    ? 'bg-floren-primary text-white'
                    : 'bg-floren-surface text-floren-text-muted'
              }`}
            >
              {step.num < currentStep ? <Check className="w-4 h-4" /> : step.num}
            </div>
            <span
              className={`text-sm font-medium hidden sm:block ${
                step.num === currentStep ? 'text-floren-text' : 'text-floren-text-muted'
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < allSteps.length - 1 && (
            <ChevronRight className="w-4 h-4 text-floren-text-muted mx-3 lg:mx-5" />
          )}
        </div>
      ))}
    </div>
  )
}

/* ============================================================
   PAYMENT METHOD LOGOS (SVG inline for reliability)
   ============================================================ */
function IdealLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#CC0066" />
      <text x="24" y="20" textAnchor="middle" fill="white" fontSize="11" fontWeight="700" fontFamily="sans-serif">iDEAL</text>
    </svg>
  )
}

function VisaLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#1A1F71" />
      <text x="24" y="20" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="sans-serif">VISA</text>
    </svg>
  )
}

function MastercardLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#F5F5F5" stroke="#E0E0E0" />
      <circle cx="19" cy="16" r="8" fill="#EB001B" />
      <circle cx="29" cy="16" r="8" fill="#F79E1B" />
      <path d="M24 10.5a8 8 0 010 11" fill="#FF5F00" />
    </svg>
  )
}

function BancontactLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="32" rx="4" fill="#005498" />
      <text x="24" y="19" textAnchor="middle" fill="white" fontSize="7" fontWeight="600" fontFamily="sans-serif">Bancontact</text>
    </svg>
  )
}

const paymentMethods = [
  { id: 'ideal', name: 'iDEAL', logo: IdealLogo, description: 'Betaal direct via je bank' },
  { id: 'creditcard', name: 'Creditcard', logo: VisaLogo, description: 'Visa, Mastercard, Amex' },
  { id: 'mastercard', name: 'Mastercard', logo: MastercardLogo, description: '' },
  { id: 'bancontact', name: 'Bancontact', logo: BancontactLogo, description: 'Populair in België' },
] as const

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function CheckoutClient({ solutionTitle, checkoutType, plans, subscriptions }: CheckoutClientProps) {
  const [step, setStep] = useState(1)

  // Plan selection (for 'plan' type)
  const [selectedPlan, setSelectedPlan] = useState<string>(plans[1]?.name || plans[0]?.name)
  // Subscription selection (for 'subscription' type)
  const [selectedSub, setSelectedSub] = useState<string>(subscriptions[0]?.id || '')

  const [paymentMethod, setPaymentMethod] = useState('ideal')
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    organisatie: '',
    telefoon: '',
    aantalGebruikers: '',
    opmerkingen: '',
    // Extra fields for subscription
    aanhef: '',
    beroep: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const chosenPlan = plans.find(p => p.name === selectedPlan) || plans[0]
  const chosenSub = subscriptions.find(s => s.id === selectedSub) || subscriptions[0]
  const isSubscription = checkoutType === 'subscription'

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Send order notification email
    try {
      await fetch('/api/bestelling', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          solutionTitle,
          isSubscription,
          planName: displayName,
          price: displayPrice,
          period: displayPeriod,
          paymentMethod: paymentMethods.find(m => m.id === paymentMethod)?.name || paymentMethod,
          naam: formData.naam,
          email: formData.email,
          organisatie: formData.organisatie,
          telefoon: formData.telefoon,
          aantalGebruikers: formData.aantalGebruikers,
          beroep: formData.beroep,
          opmerkingen: formData.opmerkingen,
        }),
      })
    } catch (err) {
      // Don't block checkout if notification fails
      console.error('Notification error:', err)
    }

    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false)
      setSubmitted(true)
    }, 2000)
  }

  const goToStep = (s: number) => {
    setStep(s)
    setTimeout(() => {
      const el = document.getElementById('checkout-steps')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  const isFormValid = isSubscription
    ? formData.naam.trim() !== '' && formData.email.trim() !== ''
    : formData.naam.trim() !== '' && formData.email.trim() !== '' && formData.organisatie.trim() !== ''

  // Get display price
  const displayPrice = isSubscription ? chosenSub?.price : chosenPlan?.price
  const displayPeriod = isSubscription ? chosenSub?.period : chosenPlan?.period
  const displayName = isSubscription ? chosenSub?.label : `${chosenPlan?.name} (${chosenPlan?.size})`

  /* ----------------------------------------
     SUCCESS STATE (Step 4)
     ---------------------------------------- */
  if (submitted) {
    return (
      <section className="py-8 lg:py-12" id="checkout-steps">
        <StepIndicator currentStep={4} totalSteps={4} />
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-floren-accent/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-floren-primary" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Betaling geslaagd!</h2>
          <p className="text-floren-text-body mb-3">
            Je {isSubscription ? 'abonnement op' : 'bestelling van'} <strong>{solutionTitle}</strong> is bevestigd.
          </p>
          <div className="bg-floren-surface rounded-2xl p-5 text-left mb-6 inline-block w-full max-w-sm">
            <div className="flex items-center justify-between py-2 border-b border-floren-border">
              <span className="text-sm text-floren-text-muted">Product</span>
              <span className="text-sm font-semibold">{solutionTitle}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-floren-border">
              <span className="text-sm text-floren-text-muted">{isSubscription ? 'Abonnement' : 'Pakket'}</span>
              <span className="text-sm font-semibold">{displayName}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-floren-border">
              <span className="text-sm text-floren-text-muted">Betaald</span>
              <span className="text-sm font-semibold">{displayPrice}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-floren-text-muted">Betaalmethode</span>
              <span className="text-sm font-semibold">{paymentMethods.find(m => m.id === paymentMethod)?.name}</span>
            </div>
          </div>
          <p className="text-sm text-floren-text-muted mb-8">
            Je ontvangt een bevestiging op <strong>{formData.email}</strong>. Een consultant neemt binnen 1 werkdag contact op.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/leeroplossingen" className="bg-floren-primary text-white rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-secondary transition-colors">
              Terug naar leeroplossingen
            </Link>
            <Link href="/" className="border-2 border-floren-primary text-floren-primary rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-surface transition-colors">
              Naar homepage
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 lg:py-12" id="checkout-steps">
      <StepIndicator currentStep={step} totalSteps={4} />

      {/* ======== STEP 1: SELECT PLAN / SUBSCRIPTION ======== */}
      {step === 1 && (
        <div className="max-w-[960px] mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-2">
              {isSubscription ? 'Kies je abonnement' : 'Kies je pakket'}
            </h2>
            <p className="text-sm text-floren-text-muted">
              {isSubscription
                ? 'Selecteer het abonnementstype dat bij jou past.'
                : 'Selecteer het pakket dat het beste bij jouw organisatie past.'}
            </p>
          </div>

          {/* SUBSCRIPTION FLOW */}
          {isSubscription && (
            <div className="max-w-2xl mx-auto space-y-3 mb-8">
              {subscriptions.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setSelectedSub(sub.id)}
                  className={`relative w-full text-left p-5 lg:p-6 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                    selectedSub === sub.id
                      ? 'border-floren-primary ring-2 ring-floren-primary/20 bg-white shadow-md'
                      : 'border-floren-card-alt bg-white hover:border-floren-neutral hover:shadow-sm'
                  }`}
                >
                  {/* Radio indicator */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    selectedSub === sub.id ? 'border-floren-primary bg-floren-primary' : 'border-floren-border'
                  }`}>
                    {selectedSub === sub.id && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-sm lg:text-base">{sub.label}</span>
                      {sub.badge && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-floren-accent text-floren-text rounded-full">
                          {sub.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-floren-text-muted">{sub.sublabel}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-lg lg:text-xl font-extrabold">{sub.price}</div>
                    <div className="text-xs text-floren-text-muted">{sub.period}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* PLAN FLOW */}
          {!isSubscription && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 mb-8">
              {plans.map((plan) => (
                <button
                  key={plan.name}
                  type="button"
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`relative p-6 lg:p-8 rounded-2xl border-2 flex flex-col text-left transition-all ${
                    selectedPlan === plan.name
                      ? plan.popular
                        ? 'bg-floren-primary text-white border-floren-primary ring-2 ring-floren-accent shadow-lg'
                        : 'bg-white border-floren-primary ring-2 ring-floren-primary/20 shadow-lg'
                      : plan.popular
                        ? 'bg-floren-primary text-white border-floren-primary hover:shadow-md'
                        : 'bg-white border-floren-card-alt hover:border-floren-neutral hover:shadow-md'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-floren-accent text-floren-primary text-xs font-bold py-1 px-4 rounded-full">
                      Meest gekozen
                    </span>
                  )}
                  <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedPlan === plan.name
                      ? plan.popular ? 'bg-floren-accent border-floren-accent' : 'bg-floren-primary border-floren-primary'
                      : plan.popular ? 'border-white/40' : 'border-floren-border'
                  }`}>
                    {selectedPlan === plan.name && <Check className={`w-3.5 h-3.5 ${plan.popular ? 'text-floren-primary' : 'text-white'}`} />}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold py-1 px-2.5 rounded-full ${
                      plan.popular ? 'bg-white/20 text-white' : 'bg-floren-surface text-floren-text-muted'
                    }`}>{plan.size}</span>
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                  </div>
                  <div className="mb-2">
                    <span className="text-3xl font-extrabold">{plan.price}</span>
                    <span className={`text-sm ml-1 ${plan.popular ? 'text-white/70' : 'text-floren-text-muted'}`}>{plan.period}</span>
                  </div>
                  <p className={`text-sm mb-5 ${plan.popular ? 'text-white/80' : 'text-floren-text-body'}`}>{plan.description}</p>
                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <svg className="w-4 h-4 mt-0.5 shrink-0 text-floren-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="bg-floren-primary text-white rounded-xl px-10 py-4 text-sm font-bold hover:bg-floren-secondary transition-colors flex items-center gap-2"
            >
              Verder
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ======== STEP 2: FORM ======== */}
      {step === 2 && (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-2">Vul je gegevens in</h2>
            <p className="text-sm text-floren-text-muted">Wij nemen contact op om je bestelling te finaliseren.</p>
          </div>

          {/* Chosen plan/sub summary */}
          <div className="flex items-center gap-3 p-4 bg-floren-surface rounded-xl mb-6">
            {!isSubscription && (
              <span className="text-xs font-bold py-1 px-2.5 rounded-full bg-floren-primary text-white">{chosenPlan.size}</span>
            )}
            <div className="flex-1">
              <span className="text-sm font-bold">{displayName}</span>
              <span className="text-sm text-floren-text-muted ml-2">{displayPrice} {displayPeriod}</span>
            </div>
            <button type="button" onClick={() => goToStep(1)} className="text-xs font-semibold text-floren-primary hover:underline">Wijzig</button>
          </div>

          <div className="space-y-5">
            {/* Subscription-specific fields */}
            {isSubscription && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="aanhef" className="block text-sm font-semibold mb-2">Aanhef</label>
                  <select
                    id="aanhef"
                    name="aanhef"
                    value={formData.aanhef}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30 bg-white"
                  >
                    <option value="">Maak een keuze</option>
                    <option value="dhr">Dhr.</option>
                    <option value="mevr">Mevr.</option>
                    <option value="anders">Anders</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="beroep" className="block text-sm font-semibold mb-2">Beroep</label>
                  <select
                    id="beroep"
                    name="beroep"
                    value={formData.beroep}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30 bg-white"
                  >
                    <option value="">Maak een keuze</option>
                    <option value="psychiater">Psychiater</option>
                    <option value="psycholoog">Psycholoog</option>
                    <option value="verpleegkundige">Verpleegkundige</option>
                    <option value="verzorgende">Verzorgende IG</option>
                    <option value="poh-ggz">POH-GGZ</option>
                    <option value="arts">Arts</option>
                    <option value="begeleider">Begeleider</option>
                    <option value="student">Student / AIOS</option>
                    <option value="anders">Anders</option>
                  </select>
                </div>
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="naam" className="block text-sm font-semibold mb-2">Volledige naam *</label>
              <input id="naam" name="naam" type="text" required value={formData.naam} onChange={handleChange}
                className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                placeholder="Voor- en achternaam" />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2">{isSubscription ? 'E-mailadres' : 'Zakelijk e-mailadres'} *</label>
              <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                placeholder={isSubscription ? 'naam@email.nl' : 'naam@organisatie.nl'} />
            </div>

            {/* Organization (only for plan type) */}
            {!isSubscription && (
              <div>
                <label htmlFor="organisatie" className="block text-sm font-semibold mb-2">Organisatie *</label>
                <input id="organisatie" name="organisatie" type="text" required value={formData.organisatie} onChange={handleChange}
                  className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                  placeholder="Naam van je zorginstelling" />
              </div>
            )}

            {/* Two columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="telefoon" className="block text-sm font-semibold mb-2">Telefoonnummer</label>
                <input id="telefoon" name="telefoon" type="tel" value={formData.telefoon} onChange={handleChange}
                  className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                  placeholder="06-12345678" />
              </div>
              {!isSubscription && (
                <div>
                  <label htmlFor="aantalGebruikers" className="block text-sm font-semibold mb-2">Geschat aantal gebruikers</label>
                  <select id="aantalGebruikers" name="aantalGebruikers" value={formData.aantalGebruikers} onChange={handleChange}
                    className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30 bg-white">
                    <option value="">Selecteer...</option>
                    <option value="1-25">1 – 25</option>
                    <option value="25-100">25 – 100</option>
                    <option value="100-500">100 – 500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
              )}
              {isSubscription && (
                <div>
                  <label htmlFor="organisatie" className="block text-sm font-semibold mb-2">Organisatie (optioneel)</label>
                  <input id="organisatie" name="organisatie" type="text" value={formData.organisatie} onChange={handleChange}
                    className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                    placeholder="Zorginstelling" />
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="opmerkingen" className="block text-sm font-semibold mb-2">Opmerkingen</label>
              <textarea id="opmerkingen" name="opmerkingen" rows={3} value={formData.opmerkingen} onChange={handleChange}
                className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30 resize-none"
                placeholder="Bijzonderheden of wensen..." />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button type="button" onClick={() => goToStep(1)} className="flex items-center gap-2 text-sm font-semibold text-floren-text-body hover:text-floren-text transition-colors">
                <ArrowLeft className="w-4 h-4" /> Terug
              </button>
              <button type="button" onClick={() => { if (isFormValid) goToStep(3) }} disabled={!isFormValid}
                className={`rounded-xl px-10 py-4 text-sm font-bold flex items-center gap-2 transition-colors ${
                  isFormValid ? 'bg-floren-primary text-white hover:bg-floren-secondary' : 'bg-floren-surface text-floren-text-muted cursor-not-allowed'
                }`}>
                Verder naar betalen
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======== STEP 3: PAYMENT ======== */}
      {step === 3 && (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl lg:text-2xl font-bold mb-2">Betalen</h2>
            <p className="text-sm text-floren-text-muted">Controleer je bestelling en kies een betaalmethode.</p>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            {/* Order summary */}
            <div className="bg-floren-surface rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-wide text-floren-text-muted mb-4">Overzicht</h3>
              <div className="flex items-center justify-between py-3 border-b border-floren-border">
                <span className="text-sm text-floren-text-body">Product</span>
                <span className="text-sm font-semibold">{solutionTitle}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-floren-border">
                <span className="text-sm text-floren-text-body">{isSubscription ? 'Abonnement' : 'Pakket'}</span>
                <span className="text-sm font-semibold">{displayName}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-floren-border">
                <span className="text-sm text-floren-text-body">Naam</span>
                <span className="text-sm font-semibold">{formData.naam}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-floren-border">
                <span className="text-sm text-floren-text-body">E-mail</span>
                <span className="text-sm font-semibold">{formData.email}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-sm text-floren-text-body font-semibold">Totaal</span>
                <span className="text-lg font-extrabold">{displayPrice} <span className="text-xs font-normal text-floren-text-muted">{displayPeriod}</span></span>
              </div>
              <div className="flex gap-2 mt-2">
                <button type="button" onClick={() => goToStep(1)} className="text-xs font-semibold text-floren-primary hover:underline">Pakket wijzigen</button>
                <span className="text-xs text-floren-text-muted">·</span>
                <button type="button" onClick={() => goToStep(2)} className="text-xs font-semibold text-floren-primary hover:underline">Gegevens wijzigen</button>
              </div>
            </div>

            {/* Payment method selection */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-floren-text-muted mb-4">Kies je betaalmethode</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === method.id
                        ? 'border-floren-primary bg-floren-primary/5 shadow-md'
                        : 'border-floren-card-alt bg-white hover:border-floren-neutral hover:shadow-sm'
                    }`}
                  >
                    <method.logo className="w-12 h-8" />
                    <span className={`text-xs font-medium ${
                      paymentMethod === method.id ? 'text-floren-primary' : 'text-floren-text-body'
                    }`}>{method.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* iDEAL bank selector (only when iDEAL selected) */}
            {paymentMethod === 'ideal' && (
              <div>
                <label htmlFor="bank" className="block text-sm font-semibold mb-2">Kies je bank</label>
                <select id="bank" name="bank"
                  className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30 bg-white">
                  <option value="">Selecteer je bank...</option>
                  <option value="abn">ABN AMRO</option>
                  <option value="asn">ASN Bank</option>
                  <option value="bunq">bunq</option>
                  <option value="ing">ING</option>
                  <option value="knab">Knab</option>
                  <option value="rabo">Rabobank</option>
                  <option value="regiobank">RegioBank</option>
                  <option value="sns">SNS</option>
                  <option value="triodos">Triodos Bank</option>
                </select>
              </div>
            )}

            {/* Credit card fields (when creditcard/mastercard selected) */}
            {(paymentMethod === 'creditcard' || paymentMethod === 'mastercard') && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-semibold mb-2">Kaartnummer</label>
                  <input id="cardNumber" type="text" placeholder="0000 0000 0000 0000" maxLength={19}
                    className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30 font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiry" className="block text-sm font-semibold mb-2">Vervaldatum</label>
                    <input id="expiry" type="text" placeholder="MM/JJ" maxLength={5}
                      className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30 font-mono" />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-sm font-semibold mb-2">CVC</label>
                    <input id="cvc" type="text" placeholder="123" maxLength={4}
                      className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30 font-mono" />
                  </div>
                </div>
              </div>
            )}

            {/* Security badges */}
            <div className="flex items-center justify-center gap-6 py-3">
              <div className="flex items-center gap-1.5 text-xs text-floren-text-muted">
                <Lock className="w-3.5 h-3.5" />
                SSL-versleuteld
              </div>
              <div className="flex items-center gap-1.5 text-xs text-floren-text-muted">
                <ShieldCheck className="w-3.5 h-3.5" />
                Veilig betalen
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-2">
              <button type="button" onClick={() => goToStep(2)} className="flex items-center gap-2 text-sm font-semibold text-floren-text-body hover:text-floren-text transition-colors">
                <ArrowLeft className="w-4 h-4" /> Terug
              </button>
              <button type="submit" disabled={isProcessing}
                className={`rounded-xl px-10 py-4 text-sm font-bold flex items-center gap-2 transition-colors ${
                  isProcessing
                    ? 'bg-floren-surface text-floren-text-muted cursor-wait'
                    : 'bg-floren-primary text-white hover:bg-floren-secondary'
                }`}>
                {isProcessing ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Betaling verwerken...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    Nu betalen — {displayPrice}
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-floren-text-muted text-center">
              {isSubscription
                ? 'Je abonnement wordt jaarlijks verlengd en is tot wederzeggen. Opzeggen kan met een opzegtermijn van 3 maanden. Prijzen zijn inclusief 9% btw.'
                : 'Na betaling neemt een consultant contact op om de implementatie in te plannen. Alle prijzen zijn exclusief btw.'}
            </p>
          </form>
        </div>
      )}
    </section>
  )
}
