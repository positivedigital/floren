import Header from '@/components/header'
import Footer from '@/components/footer'
import CheckoutFlow from './checkout-flow'

export const metadata = {
  title: 'Bestellen – Floren',
  description: 'Start je aanvraag voor een Floren abonnement.',
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <CheckoutFlow />
      <Footer />
    </>
  )
}
