import Link from 'next/link'
import { MobileMenu } from './MobileMenu'

const navItems = [
  {
    label: 'Citizenship and Residency',
    href: '/citizenship-residency-by-investment',
  },
  {
    label: 'Vineyards and Wineries',
    href: '/vineyards-wineries',
    subMenu: [
      { label: 'Operational Assets', href: '/vineyards-wineries?status=operational' },
      { label: 'Development Land', href: '/vineyards-wineries?status=development' },
    ],
  },
  {
    label: 'Investment Opportunities',
    href: '/investment-opportunities',
    subMenu: [
      { label: 'Agriculture and Agribusiness', href: '/investment-opportunities/vineyards-wineries' },
      { label: 'Orchards', href: '/investment-opportunities/orchards' },
      { label: 'Cattle', href: '/investment-opportunities/cattle-ranches' },
      { label: 'Real Estate', href: '/investment-opportunities/real-estate' },
    ],
  },
  {
    label: 'Advisory',
    href: '/advisory',
  },
  {
    label: 'Execution',
    href: '/execution',
  },
  {
    label: 'About',
    href: '/about',
  },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-slate">
      {/* Skip to main content — WCAG 2.1 AA */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="container-site">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center no-underline"
            aria-label="BBI Argentina — Return to home page"
          >
            <span className="font-display text-xl font-medium text-brand-earth tracking-tight">
              BBI Argentina
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-8"
          >
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="text-body-sm font-medium text-brand-ink hover:text-brand-olive no-underline transition-colors duration-150 py-2"
                >
                  {item.label}
                </Link>

                {/* Dropdown */}
                {item.subMenu && (
                  <div
                    className="absolute top-full left-0 min-w-48 bg-white border border-brand-slate shadow-card-hover rounded-card
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                                transition-all duration-150 mt-1 z-50"
                    role="menu"
                    aria-label={`${item.label} sub-navigation`}
                  >
                    <ul className="py-2">
                      {item.subMenu.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            role="menuitem"
                            className="block px-4 py-2.5 text-body-sm text-brand-ink hover:text-brand-olive hover:bg-brand-fog no-underline transition-colors duration-150"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Global CTA — persistent */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/contact" className="btn-primary text-sm">
              Tell Us What You&apos;re Looking For
            </Link>
          </div>

          {/* Mobile menu button */}
          <MobileMenu navItems={navItems} />
        </div>
      </div>
    </header>
  )
}
