import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description:
    'The page you requested could not be found. BBI Argentina productive asset investment platform and advisory services are available through the links below.',
  robots: { index: false, follow: true },
}

/**
 * Global 404 - not-found.tsx
 * Entity-first copy. No exclamation points.
 */
export default function NotFound() {
  return (
    <div className="container-site py-20 lg:py-32 max-w-2xl">
      <p className="text-label text-brand-sage uppercase tracking-widest mb-4">
        404 &mdash; Page Not Found
      </p>
      <h1 className="font-display text-display-xl text-brand-earth mb-6">
        Page not found
      </h1>
      <p className="text-body-lg text-brand-ink mb-4">
        BBI Argentina&apos;s investment portfolio and platform information are available through the links below.
      </p>
      <p className="text-body-md text-brand-sage mb-10">
        BBI Argentina is a full-cycle investment platform originating, advising and executing productive
        asset acquisitions across Argentina. If you arrived here via a saved link or external reference,
        the page may have moved or been removed.
      </p>
      <nav aria-label="Recovery navigation">
        <ul className="flex flex-col sm:flex-row flex-wrap gap-4">
          <li><Link href="/investment-opportunities" className="btn-primary">Investment Opportunities</Link></li>
          <li><Link href="/advisory" className="btn-secondary">Advisory</Link></li>
          <li><Link href="/execution" className="btn-secondary">Execution</Link></li>
          <li><Link href="/contact" className="btn-secondary">Contact</Link></li>
        </ul>
      </nav>
    </div>
  )
}