import Header from '@/components/header'
import Footer from '@/components/footer'
import Breadcrumb from '@/components/breadcrumb'
import LeeroplossingenFullClient from './leeroplossingen-client'

export default function ProfessionalLeeroplossingenPage() {
  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-5 lg:px-10">
        <Breadcrumb items={[
          { label: 'Professional', href: '/professional' },
          { label: 'Leeroplossingen' },
        ]} />

        <LeeroplossingenFullClient />
      </main>
      <Footer />
    </>
  )
}
