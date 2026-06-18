import Link from 'next/link'

const platformLinks = [
  { label: 'Origination', href: '/investment-opportunities' },
  { label: 'Advisory', href: '/advisory' },
  { label: 'Execution', href: '/execution' },
]

const assetLinks = [
  { label: 'Vineyards and Wineries', href: '/vineyards-wineries' },
  { label: 'Orchards', href: '/investment-opportunities/orchards' },
  { label: 'Cattle Ranches', href: '/investment-opportunities/cattle-ranches' },
  { label: 'Real Estate', href: '/investment-opportunities/real-estate' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Legal Disclaimer', href: '/legal-disclaimer' },
]

export function SiteFooter() {
  return (
    <footer className="bg-brand-earth text-brand-limestone/80 mt-20">
      <div className="container-site py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-display text-xl font-medium text-brand-limestone no-underline hover:text-brand-straw transition-colors"
              aria-label="BBI Argentina — Return to home page"
            >
              BBI Argentina
            </Link>
            <p className="mt-3 text-body-sm text-brand-limestone/60 leading-relaxed">
              Full-cycle investment platform for productive assets across Argentina.
              Origination. Advisory. Execution.
            </p>
            {/* LinkedIn — institutional audience only */}
            <a
              href="https://www.linkedin.com/company/bbi-argentina"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-body-sm text-brand-limestone/60 hover:text-brand-straw no-underline transition-colors"
              aria-label="BBI Argentina on LinkedIn (opens in new tab)"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Platform links */}
          <div>
            <h3 className="text-label font-medium text-brand-limestone/40 uppercase tracking-widest mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-brand-limestone/70 hover:text-brand-straw no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Asset class links */}
          <div>
            <h3 className="text-label font-medium text-brand-limestone/40 uppercase tracking-widest mb-4">
              Asset Classes
            </h3>
            <ul className="space-y-2.5">
              {assetLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-brand-limestone/70 hover:text-brand-straw no-underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="text-label font-medium text-brand-limestone/40 uppercase tracking-widest mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/contact"
                  className="text-body-sm text-brand-limestone/70 hover:text-brand-straw no-underline transition-colors"
                >
                  Submit an Inquiry
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-body-sm text-brand-limestone/70 hover:text-brand-straw no-underline transition-colors"
                >
                  About BBI Argentina
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="text-body-sm text-brand-limestone/70 hover:text-brand-straw no-underline transition-colors"
                >
                  Insights and Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href="/citizenship-residency-by-investment"
                  className="text-body-sm text-brand-limestone/70 hover:text-brand-straw no-underline transition-colors"
                >
                  Citizenship and Residency
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory note — required in footer */}
        <div className="mt-10 pt-8 border-t border-brand-limestone/10">
          <p className="text-body-sm text-brand-limestone/40 max-w-prose leading-relaxed">
            All regulatory references including{' '}
            <strong className="text-brand-limestone/50 font-medium">Decree 524/2025</strong>{' '}
            (Argentina&apos;s current citizenship-by-investment legal framework, with final implementing
            regulations still being defined) and{' '}
            <strong className="text-brand-limestone/50 font-medium">Ley de Tierras</strong>{' '}
            (Argentina&apos;s Foreign Land Ownership Law) are subject to current Argentine law.
            Verified with qualified Argentine legal counsel. BBI Argentina does not provide legal
            or immigration advice.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-body-sm text-brand-limestone/40">
            &copy; {new Date().getFullYear()} BBI Argentina. All rights reserved.
          </p>
          <nav aria-label="Legal links" className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body-sm text-brand-limestone/40 hover:text-brand-limestone/60 no-underline transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
