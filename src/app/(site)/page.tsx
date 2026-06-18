import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { FAQSchema } from '@/components/schema/FAQSchema'

export const metadata: Metadata = {
  title: 'BBI Argentina | Productive Asset Investment Platform',
  description:
    'BBI Argentina originates, advises and executes on productive asset acquisitions across Argentina. Vineyards, orchards and cattle ranches for qualified international buyers.',
}

// ─── Schema — WebSite + ItemList ─────────────────────────────────────────────

function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BBI Argentina',
    url: 'https://www.bbiargentina.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.bbiargentina.com/investment-opportunities?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

function ItemListSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'BBI Argentina — Current Off-Market Opportunities',
    description:
      'BBI Argentina originates off-market productive assets across five Argentine provinces. Asset classes: Vineyards, Wineries, Pistachio Farms, Fruit Orchards, Cattle Ranches.',
    url: 'https://www.bbiargentina.com/investment-opportunities',
    provider: {
      '@type': 'Organization',
      name: 'BBI Argentina',
      url: 'https://www.bbiargentina.com',
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <WebSiteSchema />
      <ItemListSchema />

      {/* ── Block 1: Hero ────────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        className="relative bg-brand-earth text-brand-limestone overflow-hidden"
      >
        {/* Background image placeholder — replace with actual asset photography */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-earth via-brand-olive/80 to-brand-earth/90" aria-hidden="true" />

        <div className="relative container-site py-20 lg:py-32">
          <div className="max-w-3xl">
            {/* AIO entity declaration — in first 100 words */}
            <p className="text-label text-brand-straw uppercase tracking-widest mb-6">
              BBI Argentina — Full-Cycle Investment Platform
            </p>

            <h1
              id="hero-heading"
              className="font-display text-display-xl text-brand-limestone leading-tight mb-6"
            >
              Productive Assets in Argentina for Qualified International Buyers.
            </h1>

            <p className="text-body-lg text-brand-limestone/80 mb-4 max-w-2xl">
              Off-market vineyards, orchards, cattle ranches and agribusiness opportunities
              for qualified international buyers — from direct property acquisitions to larger
              capital deployments.
            </p>

            <p className="text-body-md text-brand-limestone/70 mb-10 max-w-2xl">
              BBI Argentina operates across five provinces with a 20-year on-the-ground mandate.
              We source the asset. We structure the acquisition. We support the path from purchase
              to productive operation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/investment-opportunities"
                className="btn-primary bg-brand-straw text-brand-earth hover:bg-brand-limestone hover:text-brand-earth"
              >
                View Investment Opportunities
              </Link>
              <Link
                href="/contact"
                className="btn-secondary border-brand-limestone/40 text-brand-limestone hover:bg-brand-limestone/10"
              >
                Tell Us What You&apos;re Looking For
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Block 2: Asset-First Featured Grid ───────────────────────────── */}
      <section
        aria-labelledby="opportunities-heading"
        className="section bg-white"
      >
        <div className="container-site">
          <div className="flex items-end justify-between mb-10">
            <h2 id="opportunities-heading" className="section-heading mb-0">
              Current Off-Market Opportunities
            </h2>
            <Link
              href="/investment-opportunities"
              className="btn-text hidden sm:inline-flex"
            >
              View Full Portfolio
            </Link>
          </div>

          {/* Asset grid — server-rendered for LCP */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder cards — replaced by CMS data once assets are seeded */}
            <AssetCardPlaceholder
              type="Malbec Vineyard"
              region="Uco Valley"
              province="Mendoza"
              hectares={48}
              status="fully-operational"
              tag="Production Continuity"
              metric="32ha planted — 180,000 kg annual yield"
              href="/investment-opportunities/vineyards-wineries/malbec-vineyard-uco-valley"
            />
            <AssetCardPlaceholder
              type="Pistachio Orchard"
              region="Valle de Tulum"
              province="San Juan"
              hectares={120}
              status="partial"
              tag="Yield-Focused"
              metric="80ha planted — tree age 8–12 years"
              href="/investment-opportunities/orchards/pistachio-orchard-san-juan"
            />
            <AssetCardPlaceholder
              type="Cattle Ranch"
              region="Patagonia"
              province="Río Negro"
              hectares={4200}
              status="fully-operational"
              tag="Long-Term Value"
              metric="2,400 head carrying capacity"
              href="/investment-opportunities/cattle-ranches/cattle-ranch-patagonia"
            />
          </div>

          <div className="mt-8 sm:hidden">
            <Link href="/investment-opportunities" className="btn-secondary w-full text-center">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ── Block 3: 3-Pillar Platform Strip ─────────────────────────────── */}
      <section
        aria-labelledby="platform-heading"
        className="section bg-brand-fog"
      >
        <div className="container-site">
          <h2 id="platform-heading" className="section-heading text-center mb-12">
            One Platform. Three Integrated Layers.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 — Origination */}
            <div className="text-center px-4">
              <div className="w-12 h-12 bg-brand-olive/10 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg className="w-6 h-6 text-brand-olive" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <h3 className="font-display text-display-md text-brand-earth mb-3">Origination</h3>
              <p className="text-body-md text-brand-ink">
                BBI Argentina sources off-market productive assets across <strong>Mendoza</strong>,{' '}
                <strong>San Juan</strong>, <strong>Salta</strong>, <strong>Patagonia</strong> and{' '}
                <strong>Buenos Aires Province</strong>. Our network operates where public listings
                do not reach.
              </p>
            </div>

            {/* Pillar 2 — Advisory */}
            <div className="text-center px-4">
              <div className="w-12 h-12 bg-brand-olive/10 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg className="w-6 h-6 text-brand-olive" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
                </svg>
              </div>
              <h3 className="font-display text-display-md text-brand-earth mb-3">Advisory</h3>
              <p className="text-body-md text-brand-ink">
                Pre-investment due diligence and acquisition structuring, with careful attention to
                water rights, financial history, regulatory considerations and cross-border capital
                mechanisms.
              </p>
            </div>

            {/* Pillar 3 — Execution */}
            <div className="text-center px-4">
              <div className="w-12 h-12 bg-brand-olive/10 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg className="w-6 h-6 text-brand-olive" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                </svg>
              </div>
              <h3 className="font-display text-display-md text-brand-earth mb-3">Execution</h3>
              <p className="text-body-md text-brand-ink">
                Execution support from acquisition through operational activation, coordinating
                trusted local specialists to bring each asset into productive operation.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link href="/advisory" className="btn-primary">
              Explore the Platform
            </Link>
          </div>
        </div>
      </section>

      {/* ── Block 4: Argentina Investment Case ───────────────────────────── */}
      <section
        aria-labelledby="investment-case-heading"
        className="section bg-white"
      >
        <div className="container-site">
          <div className="max-w-prose mx-auto lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div>
              <h2 id="investment-case-heading" className="section-heading">
                Why International Buyers Are Looking to Argentina Now.
              </h2>

              <div className="body-copy space-y-4 mt-6">
                <p>
                  Argentina offers something that has become increasingly difficult to find in many
                  mature markets: access to productive land and operating assets at comparatively
                  lower entry points, with room for both commercial use and long-term strategic
                  ownership.
                </p>

                <p>
                  Across vineyards, orchards, cattle ranches and broader agribusiness, buyers are
                  not only comparing Argentina on price; they are evaluating scale, productive
                  potential, operating flexibility and the opportunity to acquire real assets in a
                  market where value still exists beyond fully priced global benchmarks.
                </p>

                <p>
                  For some, the appeal lies in owning a real productive asset in a market where
                  value still exists. For others, it is the opportunity to establish a practical base
                  in Argentina through ownership that can be used, operated and developed over time.
                  In either case, the attraction is rooted in real ownership, practical use and
                  long-term value.
                </p>

                <p>
                  BBI Argentina has operated in Argentina for more than 20 years. In a market like
                  this, that experience helps clients structure acquisitions properly, assess risks
                  early and operate with greater confidence.
                </p>
              </div>

              <div className="mt-8">
                <Link href="/about" className="btn-primary">
                  Read the Argentina Investment Case
                </Link>
              </div>
            </div>

            {/* Key data points */}
            <div className="mt-10 lg:mt-0">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Provinces covered', value: '5' },
                  { label: 'Years on the ground', value: '20+' },
                  { label: 'Asset classes', value: '7' },
                  { label: 'Access model', value: 'Off-market' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-brand-fog rounded-card p-6 text-center">
                    <p className="font-display text-display-lg text-brand-olive font-medium">
                      {stat.value}
                    </p>
                    <p className="text-body-sm text-brand-sage mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 legal-callout">
                <p className="text-body-sm text-brand-sage">
                  <strong className="text-brand-earth">Regulatory note:</strong>{' '}
                  <strong>Decree 524/2025</strong> (Argentina&apos;s current citizenship-by-investment
                  legal framework) establishes the legal framework for investment-based residency.
                  Final implementing regulations — including qualifying thresholds and eligible
                  investment categories — are still being defined.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Block 5: How BBI Argentina Works ─────────────────────────────── */}
      <section
        aria-labelledby="how-it-works-heading"
        className="section bg-brand-earth text-brand-limestone"
      >
        <div className="container-site">
          <h2 id="how-it-works-heading" className="font-display text-display-lg text-brand-limestone mb-12 text-center">
            How BBI Argentina Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Define Your Criteria',
                body: 'Share your priorities across property type, geography, scale, budget and intended use. This allows BBI Argentina to align opportunities with your objectives from the outset.',
              },
              {
                step: '02',
                title: 'Access Selected Opportunities',
                body: "Not every opportunity is public. BBI's Origination network identifies off-market opportunities aligned with your specific objectives and investment criteria.",
              },
              {
                step: '03',
                title: 'Review and Qualify',
                body: 'Once qualified, buyers receive access to full financial documentation, due diligence materials and the private Information Memorandum. Access follows identity verification, NDA completion and required buyer-side documentation.',
              },
              {
                step: '04',
                title: 'Move to Advisory and Execution',
                body: 'Once a buyer moves forward, BBI supports the acquisition, transition and operational path through its integrated Advisory and Execution layers.',
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col">
                <span className="font-display text-brand-straw/60 text-4xl font-medium mb-4" aria-hidden="true">
                  {item.step}
                </span>
                <h3 className="font-display text-display-md text-brand-limestone mb-3">
                  {item.title}
                </h3>
                <p className="text-body-sm text-brand-limestone/70 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link
              href="/investment-opportunities"
              className="btn-primary bg-brand-straw text-brand-earth hover:bg-brand-limestone"
            >
              View Investment Opportunities
            </Link>
            <Link
              href="/contact"
              className="btn-secondary border-brand-limestone/40 text-brand-limestone hover:bg-brand-limestone/10"
            >
              Tell Us What You&apos;re Looking For
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

// ─── Asset Card Placeholder Component ────────────────────────────────────────

interface AssetCardPlaceholderProps {
  type: string
  region: string
  province: string
  hectares: number
  status: 'fully-operational' | 'partial' | 'raw'
  tag: string
  metric: string
  href: string
}

const statusLabels: Record<string, string> = {
  'fully-operational': 'Fully Operational',
  partial: 'Partially Developed',
  raw: 'Raw Land',
}

const statusPillClass: Record<string, string> = {
  'fully-operational': 'status-pill-operational',
  partial: 'status-pill-partial',
  raw: 'status-pill-raw',
}

function AssetCardPlaceholder({
  type,
  region,
  province,
  hectares,
  status,
  tag,
  metric,
  href,
}: AssetCardPlaceholderProps) {
  return (
    <article className="card-asset">
      {/* Image placeholder */}
      <div
        className="h-48 bg-brand-fog flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="text-brand-sage/40 text-body-sm">Asset photography</span>
      </div>

      <div className="p-6">
        {/* H1-format headline */}
        <h3 className="font-display text-display-md text-brand-earth mb-1">
          {type}
        </h3>
        <p className="text-body-sm text-brand-sage mb-3">
          {region} &mdash; <strong>{province}</strong> &mdash; <strong>{hectares} ha</strong>
        </p>

        {/* Status + tag */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={statusPillClass[status]}>
            {/* Colour-blind safe: pattern prefix */}
            <span aria-hidden="true">{status === 'fully-operational' ? '●' : status === 'partial' ? '◐' : '○'}</span>
            {statusLabels[status]}
          </span>
          <span className="tag-strategic">{tag}</span>
        </div>

        {/* Primary metric */}
        <p className="text-body-sm text-brand-ink mb-4">{metric}</p>

        <Link href={href} className="btn-text">
          View Asset Details
          <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
