import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import ImagePlaceholder from '@/components/image-placeholder'
import Link from 'next/link'
import { experts, artikelen, cases as casesData } from '@/lib/data'
import { Mail, Linkedin, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return experts.map((e) => ({ slug: e.slug }))
}

export default function ExpertDetailPage({ params }: { params: { slug: string } }) {
  const expert = experts.find((e) => e.slug === params.slug)
  if (!expert) return notFound()

  const expertArticles = artikelen.filter((a) => a.author === expert.slug)
  const expertCases = casesData.filter((c) => c.consultant === expert.slug)

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Experts', href: '/experts' },
          { label: expert.name },
        ]} />

        {/* Profile hero */}
        <section className="py-8 lg:py-16 flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="w-32 h-32 lg:w-48 lg:h-48 rounded-2xl bg-floren-card-alt overflow-hidden shrink-0">
            <ImagePlaceholder className="w-full h-full rounded-none" label={expert.name} src={expert.image} />
          </div>
          <div className="flex-1">
            <h1 className="text-[2rem] lg:text-4xl font-extrabold leading-tight mb-2">{expert.name}</h1>
            <p className="text-lg text-floren-text-muted mb-4">{expert.role}</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {expert.specialisatie.map((s) => (
                <span key={s} className="text-xs font-medium py-1 px-3 bg-floren-lavender text-floren-text-body rounded-full">{s}</span>
              ))}
            </div>
            <p className="text-base text-floren-text-body mb-6 max-w-[600px]">{expert.bio}</p>
            <div className="flex items-center gap-4">
              <a href={`mailto:${expert.email}`} className="flex items-center gap-2 text-sm font-semibold text-floren-text-body hover:text-floren-text">
                <Mail className="w-4 h-4" /> {expert.email}
              </a>
              <a href={expert.linkedIn} className="flex items-center gap-2 text-sm font-semibold text-floren-text-body hover:text-floren-text">
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Articles by this expert */}
        {expertArticles.length > 0 && (
          <section className="py-8 lg:py-12 border-t border-floren-card-alt">
            <h2 className="text-2xl font-semibold mb-6">Artikelen van {expert.name.split(' ')[0]}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {expertArticles.map((a) => (
                <Link key={a.slug} href={`/artikelen/${a.slug}`} className="bg-white rounded-2xl border border-floren-card-alt overflow-hidden group hover:shadow-md transition-shadow">
                  <ImagePlaceholder className="h-36 border-b" src="/images/photos/article-kennisbank.jpg" />
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-floren-text-muted">{a.category}</span>
                    <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-floren-secondary transition-colors">{a.title}</h3>
                    <p className="text-sm text-floren-text-body">{a.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Cases by this expert */}
        {expertCases.length > 0 && (
          <section className="py-8 lg:py-12 border-t border-floren-card-alt">
            <h2 className="text-2xl font-semibold mb-6">Cases</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {expertCases.map((c) => (
                <Link key={c.slug} href={`/cases/${c.slug}`} className="p-6 bg-floren-card rounded-2xl hover:shadow-md transition-shadow group">
                  <span className="text-xs font-semibold uppercase tracking-wide text-floren-text-muted">{c.branche}</span>
                  <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-floren-secondary transition-colors">{c.title}</h3>
                  <p className="text-sm text-floren-text-body mb-3">{c.excerpt}</p>
                  <span className="inline-block text-xs font-bold py-1 px-3 bg-floren-accent rounded-full">{c.result}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <CTABlock
          title="Advies van onze experts?"
          description="Neem contact op voor een vrijblijvend gesprek."
          primaryLabel="Neem contact op"
          primaryHref="/demo"
          secondaryLabel="Alle experts"
          secondaryHref="/experts"
        />
      </main>
      <Footer />
    </>
  )
}
