import Header from '@/components/header'
import Footer from '@/components/footer'
import CTABlock from '@/components/cta-block'
import Breadcrumb from '@/components/breadcrumb'
import ImagePlaceholder from '@/components/image-placeholder'
import Link from 'next/link'
import { artikelen, experts } from '@/lib/data'

export default function ArtikelenPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Artikelen' },
        ]} />

        <section className="py-8 lg:py-16 max-w-[760px]">
          <span className="text-xs font-semibold uppercase tracking-[0.7px] text-floren-text-muted">Kennisbank</span>
          <h1 className="text-[2rem] lg:text-5xl font-extrabold leading-[1.05] tracking-tight mt-3 mb-5">
            Artikelen & inzichten
          </h1>
          <p className="text-base lg:text-lg text-floren-text-body">
            Verdieping, trends en best practices voor leren in de zorg. Geschreven door onze experts.
          </p>
        </section>

        <section className="pb-12 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {artikelen.map((a) => {
              const author = experts.find(e => e.slug === a.author)
              return (
                <Link key={a.slug} href={`/artikelen/${a.slug}`} className="bg-white rounded-2xl border border-floren-card-alt overflow-hidden group hover:shadow-md transition-shadow">
                  <ImagePlaceholder className="h-40 border-b" src="/images/photos/article-kennisbank.jpg" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-floren-text-muted">{a.category}</span>
                      <span className="text-xs text-floren-text-muted">·</span>
                      <span className="text-xs text-floren-text-muted">{a.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-floren-secondary transition-colors">{a.title}</h3>
                    <p className="text-sm text-floren-text-body mb-4">{a.excerpt}</p>
                    {author && (
                      <div className="flex items-center gap-2 text-xs text-floren-text-muted">
                        <div className="w-6 h-6 rounded-full bg-floren-lavender flex items-center justify-center text-[10px] font-bold">{author.name.charAt(0)}</div>
                        <span className="font-semibold">{author.name}</span>
                        <span>·</span>
                        <span>{author.role}</span>
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <CTABlock
          title="Hulp nodig bij de juiste keuze?"
          description="Gebruik onze keuzehulp of vraag advies aan een expert."
          primaryLabel="Neem contact op"
          primaryHref="/demo"
          secondaryLabel="Bekijk experts"
          secondaryHref="/experts"
        />
      </main>
      <Footer />
    </>
  )
}
