import { Public_Sans } from 'next/font/google'
import './globals.css'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

const publicSans = Public_Sans({ subsets: ['latin'], variable: '--font-public-sans' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
  title: 'Floren — Hét leerplatform voor de zorg',
  description: 'Floren helpt zorgorganisaties, professionals en het onderwijs om slimmer en effectiever te leren.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'Floren — Hét leerplatform voor de zorg',
    description: 'Floren helpt zorgorganisaties, professionals en het onderwijs om slimmer en effectiever te leren.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className={`${publicSans.variable} font-sans`}>
        {children}
        <ChunkLoadErrorHandler />
      </body>
    </html>
  )
}
