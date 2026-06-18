import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bbiargentina.com'),
  title: {
    default: 'BBI Argentina | Productive Asset Investment Platform',
    template: '%s | BBI Argentina',
  },
  description:
    'BBI Argentina originates, advises and executes on productive asset acquisitions across Argentina. Vineyards, orchards and cattle ranches for qualified international buyers.',
  openGraph: {
    siteName: 'BBI Argentina',
    type: 'website',
    locale: 'en_US',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-brand-limestone text-brand-ink font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
