'use client'

import Link from 'next/link'

const audiences = [
  { key: 'alles', label: 'Alles', href: '/' },
  { key: 'professional', label: 'Professional', href: '/professional' },
  { key: 'organisatie', label: 'Organisatie', href: '/organisatie' },
  { key: 'student', label: 'Student', href: '/onderwijs/studenten' },
]

interface AudiencePillsProps {
  active: 'alles' | 'professional' | 'organisatie' | 'student'
}

export default function AudiencePills({ active }: AudiencePillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {audiences.map((a) =>
        a.key === active ? (
          <span
            key={a.key}
            className="py-2 px-5 rounded-full text-sm font-semibold bg-floren-accent text-floren-text"
          >
            {a.label}
          </span>
        ) : (
          <Link
            key={a.key}
            href={a.href}
            className="py-2 px-5 rounded-full text-sm font-semibold border border-floren-border text-floren-text-body hover:bg-floren-surface transition-colors"
          >
            {a.label}
          </Link>
        )
      )}
    </div>
  )
}
