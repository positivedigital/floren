'use client'

import { useState } from 'react'
import Link from 'next/link'
import ImagePlaceholder from '@/components/image-placeholder'
import { branches } from '@/lib/data'
import { ArrowRight } from 'lucide-react'

const categoryMap: Record<string, string> = {
  cure: 'Cure',
  care: 'Care',
  onderwijs: 'Onderwijs',
}

const filters = ['Alle', 'Cure', 'Care', 'Onderwijs']

export default function BranchesGrid() {
  const [active, setActive] = useState('Alle')

  const filtered = active === 'Alle'
    ? branches
    : branches.filter(b => categoryMap[b.category] === active)

  return (
    <section className="pb-10 lg:pb-14">
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`py-2 px-5 rounded-full text-sm font-semibold transition-colors ${
              active === f
                ? 'bg-floren-primary text-white'
                : 'border border-floren-border text-floren-text-body hover:bg-floren-surface'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Branch cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {filtered.map((branch) => (
          <Link
            key={branch.slug}
            href={`/branches/${branch.slug}`}
            className="bg-white rounded-2xl border border-floren-card-alt overflow-hidden group hover:shadow-md transition-shadow"
          >
            <div className="h-44 lg:h-48 overflow-hidden">
              <ImagePlaceholder className="h-full w-full rounded-none" label={branch.title} src={branch.image} />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2 group-hover:text-floren-secondary transition-colors">{branch.title}</h3>
              <p className="text-sm text-floren-text-body mb-4 line-clamp-3">{branch.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-floren-text-muted">{branch.solutionCount} leeroplossingen</span>
                <ArrowRight className="w-4 h-4 text-floren-text-muted group-hover:text-floren-text transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
