import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-floren-primary text-floren-light pb-20 lg:pb-0">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 py-10 lg:py-16">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4">
          <img src="/images/floren-logo.svg" alt="Floren Logo" className="h-8 lg:h-10 w-auto brightness-0 invert" />
        </div>
        <p className="text-sm text-floren-light/60 max-w-[280px] mb-7 lg:mb-0">Hét leerplatform voor de zorg. Groeien, bloeien en floreren.</p>

        {/* Desktop grid */}
        <div className="hidden lg:grid grid-cols-5 gap-8 -mt-14">
          <div className="col-span-2" />
          <div>
            <p className="text-sm font-bold mb-3">Doelgroepen</p>
            <ul className="space-y-2 text-sm text-floren-light/60">
              <li><Link href="/organisatie">Organisatie</Link></li>
              <li><Link href="/professional">Professional</Link></li>
              <li><Link href="/onderwijs">Onderwijs</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold mb-3">Ontdek</p>
            <ul className="space-y-2 text-sm text-floren-light/60">
              <li><Link href="/leeroplossingen">Leeroplossingen</Link></li>
              <li><Link href="/cases">Cases</Link></li>
              <li><Link href="/artikelen">Artikelen</Link></li>
              <li><Link href="/branches">Branches</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold mb-3">Contact</p>
            <ul className="space-y-2 text-sm text-floren-light/60">
              <li><Link href="/over-ons">Over ons</Link></li>
              <li><Link href="/demo">Demo aanvragen</Link></li>
              <li><Link href="/experts">Experts</Link></li>
            </ul>
          </div>
        </div>

        {/* Mobile grid */}
        <div className="grid grid-cols-2 gap-7 lg:hidden">
          <div>
            <p className="text-sm font-bold mb-3">Doelgroepen</p>
            <ul className="space-y-2 text-sm text-floren-light/60">
              <li><Link href="/organisatie">Organisatie</Link></li>
              <li><Link href="/professional">Professional</Link></li>
              <li><Link href="/onderwijs">Onderwijs</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-bold mb-3">Ontdek</p>
            <ul className="space-y-2 text-sm text-floren-light/60">
              <li><Link href="/leeroplossingen">Leeroplossingen</Link></li>
              <li><Link href="/cases">Cases</Link></li>
              <li><Link href="/artikelen">Artikelen</Link></li>
              <li><Link href="/experts">Experts</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-floren-light/10">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-10 py-5 flex flex-col lg:flex-row justify-between gap-3 text-xs text-floren-light/50">
          <span>© 2026 Floren</span>
          <div className="flex gap-4 lg:gap-5">
            <Link href="#">Privacy</Link>
            <Link href="#">Gebruiksvoorwaarden</Link>
            <Link href="#">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
