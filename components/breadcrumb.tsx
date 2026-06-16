import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="pt-6 lg:pt-8 text-sm text-floren-text-muted flex items-center flex-wrap gap-1">
      {items?.map((item: BreadcrumbItem, i: number) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3 mx-1" />}
          {item?.href ? (
            <Link href={item.href} className="hover:text-floren-text-body transition-colors">{item?.label}</Link>
          ) : (
            <span className="text-floren-text-body">{item?.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
