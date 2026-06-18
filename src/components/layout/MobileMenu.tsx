'use client'

import { useState } from 'react'
import Link from 'next/link'

interface SubMenuItem {
  label: string
  href: string
}

interface NavItem {
  label: string
  href: string
  subMenu?: SubMenuItem[]
}

interface MobileMenuProps {
  navItems: NavItem[]
}

export function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const close = () => {
    setIsOpen(false)
    setExpandedItem(null)
  }

  return (
    <>
      {/* Hamburger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="lg:hidden flex items-center justify-center w-11 h-11 rounded text-brand-ink hover:text-brand-olive focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-olive transition-colors"
      >
        <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
        {/* Hamburger / close icon */}
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      {/* Mobile menu panel */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-0 top-16 z-40 bg-white overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <nav aria-label="Mobile navigation" className="container-site py-6">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  {item.subMenu ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedItem(expandedItem === item.href ? null : item.href)
                        }
                        aria-expanded={expandedItem === item.href}
                        className="w-full flex items-center justify-between px-0 py-3 text-body-md font-medium text-brand-earth border-b border-brand-slate/50"
                      >
                        <span>{item.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-150 ${expandedItem === item.href ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                      {expandedItem === item.href && (
                        <ul className="pl-4 py-2 space-y-1">
                          <li>
                            <Link
                              href={item.href}
                              onClick={close}
                              className="block py-2.5 text-body-sm text-brand-olive font-medium no-underline"
                            >
                              All {item.label}
                            </Link>
                          </li>
                          {item.subMenu.map((sub) => (
                            <li key={sub.href}>
                              <Link
                                href={sub.href}
                                onClick={close}
                                className="block py-2.5 text-body-sm text-brand-ink hover:text-brand-olive no-underline transition-colors"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={close}
                      className="block py-3 text-body-md font-medium text-brand-earth border-b border-brand-slate/50 no-underline hover:text-brand-olive transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA — above fold on mobile */}
            <div className="mt-6 pt-6 border-t border-brand-slate">
              <Link href="/contact" onClick={close} className="btn-primary w-full text-center">
                Tell Us What You&apos;re Looking For
              </Link>
              <Link
                href="/investment-opportunities"
                onClick={close}
                className="btn-secondary w-full text-center mt-3"
              >
                View Investment Opportunities
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
