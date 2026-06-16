'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check, ChevronLeft, ArrowRight, Mail, User, MapPin, Phone, Briefcase, Building2, CreditCard } from 'lucide-react'

/* ─────────────────────────────────────────────
   SHOPIFY INTEGRATION NOTE
   ─────────────────────────────────────────────
   This checkout is a front-end prototype.
   To integrate Shopify later:
   1. Replace handleSubmit() with a redirect to Shopify checkout URL
   2. Map selectedPlan to a Shopify variant ID
   3. Pass customer data via Shopify Storefront API or prefill URL params
   4. Remove steps 2-4 (Shopify handles payment + confirmation)
   ───────────────────────────────────────────── */

const plans = [
  {
    id: 'professional',
    name: 'Professional',
    price: '€159',
    period: '/mnd',
    description: 'Zelfstandig professionals',
    features: [
      'Alle basiscursussen',
      'Accreditatiepunten',
      'Voortgangsrapportage',
      'E-mail ondersteuning',
      'Maandelijks opzegbaar',
    ],
  },
  {
    id: 'professional-plus',
    name: 'Professional Plus',
    price: '€199',
    period: '/mnd',
    description: 'Alles van Professional, plus:',
    features: [
      'Alles uit Professional',
      'Alle verdiepingsmodules',
      'Masterclasses & webinars',
      'Toegang tot NTI & trainingen',
      'Prioriteit support',
    ],
    featured: true,
  },
  {
    id: 'large',
    name: 'Large',
    price: 'Maatwerk',
    period: '',
    description: 'Klantgerichte, maatwerk afspraken',
    features: [
      'Alles van Professional Plus',
      '1.000+ licenties mogelijk',
      'Custom leerpaden',
      'Teambegeleiding & advies',
      'Implementatie-support',
    ],
  },
]

interface FormData {
  voornaam: string
  tussenvoegsel: string
  achternaam: string
  straat: string
  huisnummer: string
  postcode: string
  plaats: string
  land: string
  telefoon: string
  email: string
  functie: string
  organisatie: string
  factuurAdresGelijk: boolean
}

const initialForm: FormData = {
  voornaam: '',
  tussenvoegsel: '',
  achternaam: '',
  straat: '',
  huisnummer: '',
  postcode: '',
  plaats: '',
  land: 'Nederland',
  telefoon: '',
  email: '',
  functie: '',
  organisatie: '',
  factuurAdresGelijk: true,
}

const steps = [
  { number: 1, label: 'Abonnement' },
  { number: 2, label: 'Gegevens' },
  { number: 3, label: 'Bevestig' },
]

export default function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState('professional-plus')
  const [formData, setFormData] = useState<FormData>(initialForm)
  const [agreedTerms, setAgreedTerms] = useState(false)

  const plan = plans.find(p => p.id === selectedPlan) || plans[1]

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value
    setFormData(prev => ({ ...prev, [target.name]: value }))
  }, [])

  const fullName = [formData.voornaam, formData.tussenvoegsel, formData.achternaam].filter(Boolean).join(' ')
  const canProceedStep2 = formData.voornaam && formData.achternaam && formData.email && formData.straat && formData.postcode && formData.plaats

  // Calculate annual price for display
  const yearlyPrice = plan.price !== 'Maatwerk'
    ? `€${parseInt(plan.price.replace(/[^\d]/g, '')) * 12},00`
    : 'Op maat'

  /* ── STEP 1: Plan Selection ──────────────── */
  if (currentStep === 1) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-[960px] mx-auto px-5 lg:px-10 py-8 lg:py-12">
          {/* Step Header */}
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.8px] text-floren-text-muted mb-3">Aanvraag starten</p>
            <StepIndicator current={1} />
            <h1 className="text-[1.75rem] lg:text-[2.25rem] font-extrabold leading-tight mt-8 mb-2">
              Flexibele abonnementen
            </h1>
            <p className="text-sm lg:text-base text-floren-text-body max-w-lg mx-auto">
              Ontvang een abonnement dat past bij uw praktijk en organisatie.
            </p>
          </div>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5 mb-10">
            {plans.map((p) => {
              const isSelected = selectedPlan === p.id
              const isFeatured = p.featured
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlan(p.id)}
                  className={`relative text-left p-6 rounded-2xl border-2 transition-all flex flex-col ${
                    isSelected
                      ? isFeatured
                        ? 'border-floren-primary bg-floren-primary text-white ring-2 ring-floren-primary/20'
                        : 'border-floren-primary bg-white ring-2 ring-floren-primary/20'
                      : 'border-floren-card-alt bg-white hover:border-floren-neutral'
                  }`}
                >
                  {isFeatured && (
                    <span className="absolute -top-3 left-6 bg-floren-accent text-floren-primary text-[10px] font-bold py-1 px-3 rounded-full">
                      Meest gekozen
                    </span>
                  )}

                  <h3 className="text-lg font-bold mb-1">{p.name}</h3>
                  <div className="mb-3">
                    <span className="text-2xl lg:text-3xl font-extrabold">{p.price}</span>
                    {p.period && (
                      <span className={`text-sm ml-0.5 ${isSelected && isFeatured ? 'text-white/70' : 'text-floren-text-muted'}`}>{p.period}</span>
                    )}
                  </div>
                  <p className={`text-xs mb-4 ${isSelected && isFeatured ? 'text-white/70' : 'text-floren-text-muted'}`}>{p.description}</p>

                  <ul className="space-y-2 mb-5 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${
                          isSelected && isFeatured ? 'text-floren-accent' : 'text-floren-accent'
                        }`} strokeWidth={3} />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`w-full text-center py-3 rounded-xl text-sm font-bold transition-colors ${
                    isSelected
                      ? isFeatured
                        ? 'bg-white text-floren-primary'
                        : 'bg-floren-primary text-white'
                      : 'bg-floren-surface text-floren-text-body hover:bg-floren-card-alt'
                  }`}>
                    {p.price === 'Maatwerk' ? 'Vraag offerte aan' : `Kies ${p.name}`}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-floren-card-alt pt-6">
            <label className="flex items-center gap-2 text-sm text-floren-text-body cursor-pointer">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={() => setAgreedTerms(!agreedTerms)}
                className="w-4 h-4 rounded border-floren-border text-floren-primary focus:ring-floren-primary/30"
              />
              <span>Ik accepteer de <span className="underline">voorwaarden</span> &amp; <span className="underline">huisregels</span></span>
            </label>

            <div className="flex items-center gap-3">
              <Link href="/leeroplossingen" className="text-sm text-floren-text-muted hover:text-floren-text-body transition-colors">
                Annuleren
              </Link>
              <button
                type="button"
                disabled={!agreedTerms}
                onClick={() => setCurrentStep(2)}
                className="bg-floren-primary text-white rounded-xl px-8 py-3.5 text-sm font-bold hover:bg-floren-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Volgende stap
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  /* ── STEP 2: Personal Details ─────────────── */
  if (currentStep === 2) {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-[960px] mx-auto px-5 lg:px-10 py-8 lg:py-12">
          {/* Step Header */}
          <div className="text-center mb-10">
            <StepIndicator current={2} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left: Form */}
            <div className="lg:col-span-3 space-y-8">
              {/* Persoonlijk */}
              <fieldset>
                <legend className="flex items-center gap-2 text-base font-bold mb-4">
                  <User className="w-4 h-4 text-floren-text-muted" />
                  Persoonlijk
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-5">
                    <label htmlFor="voornaam" className="block text-xs font-semibold text-floren-text-muted mb-1.5">Voornaam *</label>
                    <input id="voornaam" name="voornaam" type="text" required value={formData.voornaam} onChange={handleChange}
                      className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                      placeholder="Voornaam" />
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="tussenvoegsel" className="block text-xs font-semibold text-floren-text-muted mb-1.5">Tussenvoegsel</label>
                    <input id="tussenvoegsel" name="tussenvoegsel" type="text" value={formData.tussenvoegsel} onChange={handleChange}
                      className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                      placeholder="bv. de" />
                  </div>
                  <div className="sm:col-span-4">
                    <label htmlFor="achternaam" className="block text-xs font-semibold text-floren-text-muted mb-1.5">Achternaam *</label>
                    <input id="achternaam" name="achternaam" type="text" required value={formData.achternaam} onChange={handleChange}
                      className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                      placeholder="Achternaam" />
                  </div>
                </div>
              </fieldset>

              {/* Adres */}
              <fieldset>
                <legend className="flex items-center gap-2 text-base font-bold mb-4">
                  <MapPin className="w-4 h-4 text-floren-text-muted" />
                  Adres
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-8">
                    <label htmlFor="straat" className="block text-xs font-semibold text-floren-text-muted mb-1.5">Straat *</label>
                    <input id="straat" name="straat" type="text" required value={formData.straat} onChange={handleChange}
                      className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                      placeholder="Straatnaam" />
                  </div>
                  <div className="sm:col-span-4">
                    <label htmlFor="huisnummer" className="block text-xs font-semibold text-floren-text-muted mb-1.5">Huisnr.</label>
                    <input id="huisnummer" name="huisnummer" type="text" value={formData.huisnummer} onChange={handleChange}
                      className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                      placeholder="Nr." />
                  </div>
                  <div className="sm:col-span-4">
                    <label htmlFor="postcode" className="block text-xs font-semibold text-floren-text-muted mb-1.5">Postcode *</label>
                    <input id="postcode" name="postcode" type="text" required value={formData.postcode} onChange={handleChange}
                      className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                      placeholder="1234 AB" />
                  </div>
                  <div className="sm:col-span-4">
                    <label htmlFor="plaats" className="block text-xs font-semibold text-floren-text-muted mb-1.5">Plaats *</label>
                    <input id="plaats" name="plaats" type="text" required value={formData.plaats} onChange={handleChange}
                      className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                      placeholder="Plaats" />
                  </div>
                  <div className="sm:col-span-4">
                    <label htmlFor="land" className="block text-xs font-semibold text-floren-text-muted mb-1.5">Land</label>
                    <select id="land" name="land" value={formData.land} onChange={handleChange}
                      className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30 bg-white">
                      <option>Nederland</option>
                      <option>België</option>
                    </select>
                  </div>
                </div>
              </fieldset>

              {/* Contact & werk */}
              <fieldset>
                <legend className="flex items-center gap-2 text-base font-bold mb-4">
                  <Briefcase className="w-4 h-4 text-floren-text-muted" />
                  Contact & werk
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="telefoon" className="block text-xs font-semibold text-floren-text-muted mb-1.5">Telefoon</label>
                    <input id="telefoon" name="telefoon" type="tel" value={formData.telefoon} onChange={handleChange}
                      className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                      placeholder="06-12345678" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-floren-text-muted mb-1.5">E-mailadres *</label>
                    <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                      className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                      placeholder="naam@praktijk.nl" />
                  </div>
                  <div>
                    <label htmlFor="functie" className="block text-xs font-semibold text-floren-text-muted mb-1.5">Functie / specialisme</label>
                    <input id="functie" name="functie" type="text" value={formData.functie} onChange={handleChange}
                      className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                      placeholder="bv. GZ-psycholoog" />
                  </div>
                  <div>
                    <label htmlFor="organisatie" className="block text-xs font-semibold text-floren-text-muted mb-1.5">Organisatie</label>
                    <input id="organisatie" name="organisatie" type="text" value={formData.organisatie} onChange={handleChange}
                      className="w-full px-4 py-3 border border-floren-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-floren-primary/30"
                      placeholder="Naam praktijk of instelling" />
                  </div>
                </div>

                <label className="flex items-center gap-2 mt-4 text-sm text-floren-text-body cursor-pointer">
                  <input type="checkbox" name="factuurAdresGelijk" checked={formData.factuurAdresGelijk}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-floren-border text-floren-primary focus:ring-floren-primary/30" />
                  Factuuradres is hetzelfde als praktijkadres
                </label>
              </fieldset>
            </div>

            {/* Right: Image + plan summary */}
            <div className="lg:col-span-2 hidden lg:block">
              <div className="sticky top-28 space-y-5">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-floren-surface">
                  <Image
                    src="/images/photos/care-conversation.jpg"
                    alt="Zorgprofessional in gesprek"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-floren-surface rounded-xl p-5">
                  <p className="text-xs font-semibold text-floren-text-muted mb-1">Gekozen abonnement</p>
                  <p className="font-bold">{plan.name}</p>
                  <p className="text-2xl font-extrabold mt-1">{plan.price}<span className="text-sm font-normal text-floren-text-muted">{plan.period}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between border-t border-floren-card-alt pt-6 mt-8">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-2 text-sm text-floren-text-muted hover:text-floren-text-body transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Terug
            </button>
            <button
              type="button"
              disabled={!canProceedStep2}
              onClick={() => setCurrentStep(3)}
              className="bg-floren-primary text-white rounded-xl px-8 py-3.5 text-sm font-bold hover:bg-floren-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Volgende stap
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    )
  }

  /* ── STEP 3: Review & Confirm ────────────── */
  if (currentStep === 3) {
    return (
      <main className="min-h-screen bg-white">
        {/* Minimal header */}
        <div className="border-b border-floren-card-alt">
          <div className="max-w-[960px] mx-auto px-5 lg:px-10 py-4 flex items-center justify-between">
            <Image src="/images/floren-logo.svg" alt="Floren" width={100} height={32} className="h-7 w-auto" />
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="text-sm text-floren-text-muted hover:text-floren-text-body transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="max-w-[960px] mx-auto px-5 lg:px-10 py-8 lg:py-12">
          <div className="text-center mb-8">
            <StepIndicator current={3} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left: Summary */}
            <div className="lg:col-span-3 space-y-6">
              <h1 className="text-[1.75rem] lg:text-[2rem] font-extrabold">Controleer uw aanvraag</h1>

              {/* Plan summary */}
              <div className="bg-floren-surface rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-floren-text-muted mb-1 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5" />
                      Gekozen abonnement
                    </p>
                    <p className="font-bold text-lg">{plan.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold">{yearlyPrice}</p>
                    {plan.price !== 'Maatwerk' && (
                      <p className="text-xs text-floren-text-muted">({plan.price}{plan.period} × 12 maanden)</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit button (mobile) */}
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="w-full lg:w-auto bg-floren-primary text-white rounded-xl px-8 py-4 text-sm font-bold hover:bg-floren-secondary transition-colors flex items-center justify-center gap-2"
              >
                Aanvraag versturen
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Personal details */}
              <div className="border border-floren-card-alt rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-floren-text-muted flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    Persoonlijke gegevens
                  </p>
                  <button type="button" onClick={() => setCurrentStep(2)} className="text-xs text-floren-primary font-semibold hover:underline">Wijzigen</button>
                </div>
                <p className="font-semibold">{fullName || '—'}</p>
                {formData.email && <p className="text-sm text-floren-text-body">{formData.email}</p>}
                {formData.telefoon && <p className="text-sm text-floren-text-body">{formData.telefoon}</p>}
                {formData.functie && <p className="text-sm text-floren-text-muted mt-1">{formData.functie}</p>}
                {formData.organisatie && <p className="text-sm text-floren-text-muted">{formData.organisatie}</p>}
              </div>

              {/* Address */}
              <div className="border border-floren-card-alt rounded-2xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-floren-text-muted flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Adres
                  </p>
                  <button type="button" onClick={() => setCurrentStep(2)} className="text-xs text-floren-primary font-semibold hover:underline">Wijzigen</button>
                </div>
                <p className="font-semibold">{formData.straat} {formData.huisnummer}</p>
                <p className="text-sm text-floren-text-body">{formData.postcode} {formData.plaats}</p>
                <p className="text-sm text-floren-text-muted">{formData.land}</p>
              </div>
            </div>

            {/* Right: Image + text */}
            <div className="lg:col-span-2 hidden lg:block">
              <div className="sticky top-28 space-y-5">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold">Kennis die levens verandert.</h3>
                  <p className="text-sm text-floren-text-body leading-relaxed">
                    Sluit u aan bij duizenden zorgprofessionals die hun kennis up-to-date houden via Floren. Na uw aanvraag ontvangt u binnen 24 uur een bevestiging.
                  </p>
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-floren-surface">
                  <Image
                    src="/images/photos/care-laughing.jpg"
                    alt="Zorgteam lachend"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-floren-card-alt pt-6 mt-8">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-2 text-sm text-floren-text-muted hover:text-floren-text-body transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Terug
            </button>
            <p className="text-xs text-floren-text-muted hidden lg:block">
              Geen betalingsverplichting. Een consultant neemt contact op na uw aanvraag.
            </p>
          </div>
        </div>
      </main>
    )
  }

  /* ── STEP 4: Confirmation ────────────────── */
  return (
    <main className="min-h-screen bg-white">
      {/* Minimal header */}
      <div className="border-b border-floren-card-alt">
        <div className="max-w-[960px] mx-auto px-5 lg:px-10 py-4">
          <Image src="/images/floren-logo.svg" alt="Floren" width={100} height={32} className="h-7 w-auto" />
        </div>
      </div>

      <div className="max-w-[640px] mx-auto px-5 lg:px-10 py-12 lg:py-20 text-center">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-floren-primary flex items-center justify-center mx-auto mb-8">
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </div>

        <h1 className="text-[1.75rem] lg:text-[2.25rem] font-extrabold leading-tight mb-4">
          Aanvraag ontvangen{fullName ? `, ${formData.voornaam}` : ''}!
        </h1>
        <p className="text-sm lg:text-base text-floren-text-body max-w-md mx-auto mb-8 leading-relaxed">
          Bedankt voor uw aanvraag voor <strong>{plan.name}</strong>. Een van onze professionals neemt zo snel mogelijk contact met u op via <strong>{formData.email || 'e-mail'}</strong> om de volgende stappen te bespreken.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link
            href="/leeroplossingen"
            className="bg-floren-primary text-white rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-secondary transition-colors"
          >
            Bekijk leeroplossingen
          </Link>
          <Link
            href="/"
            className="border-2 border-floren-primary text-floren-primary rounded-xl px-7 py-3.5 text-sm font-bold hover:bg-floren-surface transition-colors"
          >
            Naar homepage
          </Link>
        </div>

        {/* Next steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
          <div className="bg-floren-surface rounded-xl p-5 text-left">
            <div className="w-9 h-9 rounded-full bg-floren-primary/10 flex items-center justify-center mb-3">
              <Mail className="w-4 h-4 text-floren-primary" />
            </div>
            <p className="text-sm font-bold mb-1">E-mail bevestiging</p>
            <p className="text-xs text-floren-text-muted leading-relaxed">
              U ontvangt een bevestiging op {formData.email || 'uw e-mailadres'}.
            </p>
          </div>
          <div className="bg-floren-surface rounded-xl p-5 text-left">
            <div className="w-9 h-9 rounded-full bg-floren-primary/10 flex items-center justify-center mb-3">
              <User className="w-4 h-4 text-floren-primary" />
            </div>
            <p className="text-sm font-bold mb-1">Persoonlijk contact</p>
            <p className="text-xs text-floren-text-muted leading-relaxed">
              Een consultant neemt binnen 24 uur contact op.
            </p>
          </div>
        </div>

        {/* Thumbnail gallery */}
        <div className="flex justify-center gap-3 mt-12">
          {['/images/photos/care-conversation.jpg', '/images/photos/care-laughing.jpg', '/images/photos/care-equipment.jpg', '/images/photos/care-medication-review.jpg'].map((src, i) => (
            <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden bg-floren-surface">
              <Image src={src} alt="Floren sfeerbeeld" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

/* ── Step Progress Indicator ──────────────── */
function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, i) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              step.number < current
                ? 'bg-floren-primary text-white'
                : step.number === current
                  ? 'bg-floren-primary text-white'
                  : 'bg-floren-surface text-floren-text-muted'
            }`}>
              {step.number < current ? <Check className="w-4 h-4" strokeWidth={3} /> : step.number}
            </div>
            <span className={`text-[10px] mt-1 font-semibold ${
              step.number <= current ? 'text-floren-primary' : 'text-floren-text-muted'
            }`}>{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-16 lg:w-24 h-[2px] mx-2 mb-4 ${
              step.number < current ? 'bg-floren-primary' : 'bg-floren-card-alt'
            }`} />
          )}
        </div>
      ))}
    </div>
  )
}
