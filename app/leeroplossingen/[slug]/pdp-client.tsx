'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  q: string
  a: string
}

export default function SolutionPdpClient({ faq }: { faq: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section className="py-10 lg:py-16">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-10">Veelgestelde vragen</h2>
      <div className="max-w-3xl mx-auto space-y-3">
        {faq.map((item, idx) => (
          <div key={idx} className="border border-floren-card-alt rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-floren-surface/50 transition-colors"
            >
              <span className="text-sm lg:text-base font-semibold pr-4">{item.q}</span>
              <ChevronDown className={`w-5 h-5 text-floren-text-muted shrink-0 transition-transform duration-200 ${openIdx === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIdx === idx && (
              <div className="px-5 pb-5">
                <p className="text-sm text-floren-text-body leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
