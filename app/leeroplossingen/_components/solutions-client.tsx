'use client'

import { useState, useMemo } from 'react'
import { branches as allBranches, solutions, solutionTypes, doelgroepen, type Doelgroep } from '@/lib/data'
import SolutionCard from '@/components/solution-card'
import { X, ChevronDown } from 'lucide-react'

type SortOption = 'relevantie' | 'titel-az' | 'titel-za' | 'type'
const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'relevantie', label: 'Relevantie' },
  { value: 'titel-az', label: 'Titel A → Z' },
  { value: 'titel-za', label: 'Titel Z → A' },
  { value: 'type', label: 'Type' },
]

const typeFilters = [
  { key: 'e-learning', label: 'E-learning' },
  { key: 'platform', label: 'Platform' },
  { key: 'tool', label: 'Tool' },
  { key: 'consultancy', label: 'Consultancy' },
]

export default function SolutionsClient() {
  const [selectedDoelgroep, setSelectedDoelgroep] = useState<string>('alle')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedBranches, setSelectedBranches] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('relevantie')
  const [sortOpen, setSortOpen] = useState(false)

  const toggleFilter = (value: string, list: string[], setter: (v: string[]) => void) => {
    if (list.includes(value)) {
      setter(list.filter((v) => v !== value))
    } else {
      setter([...list, value])
    }
  }

  const clearFilters = () => {
    setSelectedDoelgroep('alle')
    setSelectedTypes([])
    setSelectedBranches([])
  }

  const hasActiveFilters = selectedDoelgroep !== 'alle' || selectedTypes.length > 0 || selectedBranches.length > 0

  const sorted = useMemo(() => {
    const list = [...solutions]
    switch (sortBy) {
      case 'titel-az': list.sort((a, b) => a.title.localeCompare(b.title, 'nl')); break
      case 'titel-za': list.sort((a, b) => b.title.localeCompare(a.title, 'nl')); break
      case 'type': list.sort((a, b) => a.type.localeCompare(b.type)); break
      default: break // relevantie = oorspronkelijke volgorde
    }
    return list
  }, [sortBy])

  const filtered = sorted.filter((sol) => {
    // Doelgroep filter
    if (selectedDoelgroep !== 'alle') {
      if (!sol.doelgroepen?.includes(selectedDoelgroep as Doelgroep)) return false
    }
    // Type filter
    if (selectedTypes.length > 0 && !selectedTypes.includes(sol.type)) return false
    // Branch filter
    if (selectedBranches.length > 0 && !selectedBranches.some((b) => sol.branches.includes(b))) return false
    return true
  })

  return (
    <>
      {/* DOELGROEP PILLS */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {doelgroepen.map((d) => (
          <button
            key={d.key}
            onClick={() => setSelectedDoelgroep(d.key)}
            className={`py-2 px-5 rounded-full text-sm font-semibold transition-colors ${
              selectedDoelgroep === d.key
                ? 'bg-floren-accent text-floren-text'
                : 'bg-white border border-floren-border text-floren-text-body hover:bg-floren-surface'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pb-10 lg:pb-16">
        {/* SIDEBAR FILTERS */}
        <aside className="w-full lg:w-[240px] shrink-0">
          <div className="p-5 bg-floren-surface rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold">Filters</p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-floren-text-muted hover:text-floren-text flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Wis
                </button>
              )}
            </div>

            <p className="text-xs font-bold uppercase tracking-wide text-floren-text-muted mb-2">Type</p>
            {typeFilters.map((t) => (
              <label key={t.key} className="flex items-center gap-2 text-sm text-floren-text-body mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(t.key)}
                  onChange={() => toggleFilter(t.key, selectedTypes, setSelectedTypes)}
                  className="w-4 h-4 rounded border-floren-border accent-floren-primary"
                />
                {t.label}
              </label>
            ))}

            <p className="text-xs font-bold uppercase tracking-wide text-floren-text-muted mb-2 mt-5">Branche</p>
            {allBranches.map((b) => (
              <label key={b.slug} className="flex items-center gap-2 text-sm text-floren-text-body mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBranches.includes(b.title)}
                  onChange={() => toggleFilter(b.title, selectedBranches, setSelectedBranches)}
                  className="w-4 h-4 rounded border-floren-border accent-floren-primary"
                />
                {b.title}
              </label>
            ))}
          </div>
        </aside>

        {/* RESULTS */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-4 lg:mb-5">
            <p className="text-sm text-floren-text-muted">{filtered.length} leeroplossing{filtered.length !== 1 ? 'en' : ''}</p>
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 py-2 px-4 border border-floren-border rounded-lg text-sm text-floren-text-body hover:bg-floren-surface transition-colors"
              >
                Sorteer: {sortOptions.find(o => o.value === sortBy)?.label}
                <ChevronDown className={`w-4 h-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-floren-border rounded-xl shadow-lg z-20 min-w-[180px] py-1">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false) }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        sortBy === opt.value
                          ? 'bg-floren-surface font-semibold text-floren-text'
                          : 'text-floren-text-body hover:bg-floren-surface/60'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filtered.map((sol) => (
                <SolutionCard
                  key={sol.slug}
                  type={sol.type === 'e-learning' ? 'E-learning' : sol.type === 'platform' ? 'Platform' : sol.type === 'tool' ? 'Tool' : 'Consultancy'}
                  title={sol.title}
                  description={sol.description}
                  branches={sol.branches}
                  tag={sol.tag}
                  image={sol.image}
                  href={`/leeroplossingen/${sol.slug}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-floren-surface rounded-2xl">
              <p className="text-floren-text-muted text-sm mb-3">Geen leeroplossingen gevonden met deze filters.</p>
              <button
                onClick={clearFilters}
                className="text-sm text-floren-primary font-semibold hover:underline"
              >
                Wis alle filters
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  )
}
