import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import ImagePlaceholder from '@/components/image-placeholder'
import Link from 'next/link'
import { artikelen, experts } from '@/lib/data'
import { Clock, Calendar, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return artikelen.map((a) => ({ slug: a.slug }))
}

export default function ArtikelDetailPage({ params }: { params: { slug: string } }) {
  const artikel = artikelen.find((a) => a.slug === params.slug)
  if (!artikel) return notFound()

  const author = experts.find((e) => e.slug === artikel.author)
  const relatedArticles = artikelen.filter((a) => a.slug !== artikel.slug).slice(0, 2)

  // Simple markdown-like rendering
  const renderContent = (content: string) => {
    return content.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return <h2 key={i} className="text-2xl font-semibold text-floren-text mt-8 mb-4">{block.replace('## ', '')}</h2>
      }
      if (block.startsWith('- **')) {
        const items = block.split('\n').filter(Boolean)
        return (
          <ul key={i} className="list-disc pl-6 space-y-2 text-floren-text-body">
            {items.map((item, j) => {
              const cleaned = item.replace(/^- /, '')
              return <li key={j} dangerouslySetInnerHTML={{ __html: cleaned.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\u2014/g, ' &mdash; ') }} />
            })}
          </ul>
        )
      }
      if (block.match(/^\d+\./)) {
        const items = block.split('\n').filter(Boolean)
        return (
          <ol key={i} className="list-decimal pl-6 space-y-2 text-floren-text-body">
            {items.map((item, j) => {
              const cleaned = item.replace(/^\d+\.\s*/, '')
              return <li key={j} dangerouslySetInnerHTML={{ __html: cleaned.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\u2014/g, ' &mdash; ') }} />
            })}
          </ol>
        )
      }
      return <p key={i} className="text-floren-text-body leading-relaxed">{block}</p>
    })
  }

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Artikelen', href: '/artikelen' },
          { label: artikel.title },
        ]} />

        {/* Article header */}
        <section className="py-8 lg:py-12 max-w-[760px]">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wide py-1 px-3 bg-floren-lavender rounded-full">{artikel.category}</span>
            {artikel.branches.map(b => (
              <span key={b} className="text-xs font-medium py-1 px-2.5 bg-floren-surface text-floren-text-muted rounded-full">{b}</span>
            ))}
          </div>
          <h1 className="text-[2rem] lg:text-4xl font-extrabold leading-tight mb-5">{artikel.title}</h1>
          <p className="text-lg text-floren-text-body mb-6">{artikel.excerpt}</p>

          {/* Author card */}
          {author && (
            <Link href={`/experts/${author.slug}`} className="flex items-center gap-3 p-4 bg-floren-surface rounded-xl hover:bg-floren-card transition-colors">
              <div className="w-12 h-12 rounded-full bg-floren-lavender flex items-center justify-center text-lg font-bold">
                {author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{author.name}</p>
                <p className="text-xs text-floren-text-muted">{author.role}</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-floren-text-muted">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(artikel.date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {artikel.readTime}</span>
              </div>
            </Link>
          )}
        </section>

        <ImagePlaceholder className="h-[280px] lg:h-[400px] rounded-2xl mb-10 lg:mb-16" label="Illustratie bij artikel" src="/images/photos/care-selfie.jpg" />

        {/* Article body */}
        <article className="max-w-[760px] mx-auto pb-12 lg:pb-16 space-y-4">
          {renderContent(artikel.content)}
        </article>

        {/* Authority layer */}
        <div className="max-w-[760px] mx-auto mb-8 p-4 bg-floren-surface rounded-xl text-xs text-floren-text-muted">
          <strong className="text-floren-text-body">Bronvermelding:</strong> Dit artikel is gebaseerd op actuele richtlijnen en evidence-based onderzoek. Gevalideerd door het redactieteam van Floren.
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <section className="py-8 lg:py-12 border-t border-floren-card-alt">
            <h2 className="text-2xl font-semibold mb-6">Gerelateerde artikelen</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {relatedArticles.map((a) => {
                const relAuthor = experts.find(e => e.slug === a.author)
                return (
                  <Link key={a.slug} href={`/artikelen/${a.slug}`} className="bg-white rounded-2xl border border-floren-card-alt overflow-hidden group hover:shadow-md transition-shadow">
                    <ImagePlaceholder className="h-36 border-b" src="/images/photos/article-kennisbank.jpg" />
                    <div className="p-5">
                      <span className="text-xs font-semibold uppercase tracking-wide text-floren-text-muted">{a.category}</span>
                      <h3 className="text-lg font-semibold mt-1 mb-2 group-hover:text-floren-secondary transition-colors">{a.title}</h3>
                      <p className="text-sm text-floren-text-body mb-3">{a.excerpt}</p>
                      {relAuthor && (
                        <div className="flex items-center gap-2 text-xs text-floren-text-muted">
                          <div className="w-6 h-6 rounded-full bg-floren-lavender flex items-center justify-center text-[10px] font-bold">{relAuthor.name.charAt(0)}</div>
                          <span>{relAuthor.name}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        <CTABlock
          title="Meer weten?"
          description="Bekijk al onze artikelen of neem contact op met een expert."
          primaryLabel="Alle artikelen"
          primaryHref="/artikelen"
          secondaryLabel="Neem contact op"
          secondaryHref="/demo"
        />
      </main>
      <Footer />
    </>
  )
}
