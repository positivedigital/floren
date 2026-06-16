import Link from 'next/link'

interface CTABlockProps {
  title: string
  description: string
  primaryLabel: string
  primaryHref?: string
  secondaryLabel: string
  secondaryHref?: string
}

export default function CTABlock({
  title,
  description,
  primaryLabel,
  primaryHref = '#',
  secondaryLabel,
  secondaryHref = '#',
}: CTABlockProps) {
  return (
    <section className="mb-10 lg:mb-16 p-7 lg:p-12 bg-floren-primary rounded-[28px] lg:rounded-[32px] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 lg:gap-8">
      <div>
        <h2 className="text-2xl lg:text-3xl font-bold text-floren-light mb-2">{title}</h2>
        <p className="text-floren-light/70 text-sm lg:text-base max-w-[520px]">{description}</p>
      </div>
      <div className="flex flex-col lg:flex-row gap-3 shrink-0">
        <Link href={primaryHref} className="w-full lg:w-auto text-center bg-floren-accent text-floren-text rounded-xl px-7 py-3.5 lg:py-3.5 text-sm font-bold hover:brightness-95 transition">
          {primaryLabel}
        </Link>
        <Link href={secondaryHref} className="w-full lg:w-auto text-center border-2 border-floren-light/40 text-floren-light rounded-xl px-7 py-3.5 lg:py-3.5 text-sm font-bold hover:bg-white/10 transition">
          {secondaryLabel}
        </Link>
      </div>
    </section>
  )
}
