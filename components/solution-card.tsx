import Link from 'next/link'
import ImagePlaceholder from './image-placeholder'

interface SolutionCardProps {
  type: string
  title: string
  description: string
  href?: string
  branches?: string[]
  tag?: string
  image?: string
}

export default function SolutionCard({ type, title, description, href = '#', branches, tag, image }: SolutionCardProps) {
  return (
    <Link href={href} className="bg-white rounded-2xl border border-floren-card-alt overflow-hidden group hover:shadow-md transition-shadow flex flex-col">
      <ImagePlaceholder className="h-36 lg:h-40 border-b" src={image || '/images/photos/care-equipment.jpg'} />
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-floren-text-muted">{type}</span>
        <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-floren-secondary transition-colors">{title}</h3>
        <p className="text-sm text-floren-text-body mb-3 flex-1">{description}</p>
        {branches && branches.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {branches.slice(0, 3).map((branch) => (
              <span
                key={branch}
                className="inline-block text-[10px] font-medium py-1 px-2.5 bg-floren-lavender text-floren-text-body rounded-full"
              >
                {branch}
              </span>
            ))}
            {branches.length > 3 && (
              <span className="inline-block text-[10px] font-medium py-1 px-2.5 bg-floren-surface text-floren-text-muted rounded-full">
                +{branches.length - 3}
              </span>
            )}
          </div>
        )}
        {tag && !branches && (
          <span className="inline-block text-[10px] font-medium py-1 px-2.5 bg-floren-lavender text-floren-text-body rounded-full w-fit">
            {tag}
          </span>
        )}
      </div>
    </Link>
  )
}
