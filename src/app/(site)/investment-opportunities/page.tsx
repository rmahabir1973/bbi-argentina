import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Investment Opportunities in Argentina | BBI Argentina',
  description:
    "Browse BBI Argentina's verified portfolio of off-market vineyards, orchards, cattle ranches and agribusiness across Argentina. Filter by province, type and operational status.",
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: "BBI Argentina Investment Opportunities Portfolio",
  description:
    "BBI Argentina's Investment Opportunities portfolio comprises off-market productive assets across five Argentine provinces: Mendoza, San Juan, Salta, Patagonia and Buenos Aires Province. Asset classes: vineyards, wineries, pistachio orchards, olive orchards, cattle ranches and agricultural real estate.",
  provider: {
    '@type': 'Organization',
    name: 'BBI Argentina',
    url: 'https://www.bbiargentina.com',
  },
}

const searchActionSchema = {
  '@context': 'https://schema.org',
  '@type': 'SearchAction',
  target: {
    '@type': 'EntryPoint',
    urlTemplate:
      'https://www.bbiargentina.com/investment-opportunities?type={asset_type}&province={province}&status={status}',
  },
  'query-input': 'required name=asset_type',
}

export default function InvestmentOpportunitiesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(searchActionSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bbiargentina.com' },
          {
            name: 'Investment Opportunities',
            url: 'https://www.bbiargentina.com/investment-opportunities',
          },
        ]}
      />

      {/* Block 1 — Hero */}
      <section className="section bg-brand-limestone">
        <div className="container-site">
          <h1 className="font-display text-display-lg text-brand-ink mb-4">
            Investment Opportunities Across Argentina. Productive Assets. Off-Market. Verified.
          </h1>
          <p className="text-xl text-brand-slate mb-6 max-w-3xl">
            Browse off-market productive assets across Argentina — searchable by province, property
            type, operational status and investment objective.
          </p>
          <p className="text-body text-brand-ink max-w-3xl">
            BBI Argentina originates and structures opportunities across agriculture, agribusiness,
            real estate and operating assets, with a focus on productive use, commercial viability
            and asset quality. Opportunities are aligned with each buyer&apos;s objectives, budget
            and level of operational involvement.
          </p>
        </div>
      </section>

      {/* Block 2 — Filter Bar with Display Mode Toggle */}
      <section className="section-sm bg-brand-fog border-b border-brand-earth">
        <div className="container-site">
          <div className="flex flex-wrap items-center gap-4">
            {/* Display Mode Toggle */}
            <div
              className="flex rounded-lg border border-brand-earth overflow-hidden"
              role="group"
              aria-label="Display mode"
            >
              <button
                className="px-4 py-2 text-sm font-medium bg-brand-olive text-white focus-visible:outline-2 focus-visible:outline-brand-olive"
                aria-pressed="true"
              >
                Executive View
              </button>
              <button
                className="px-4 py-2 text-sm font-medium bg-white text-brand-ink hover:bg-brand-limestone focus-visible:outline-2 focus-visible:outline-brand-olive"
                aria-pressed="false"
              >
                Detailed View
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                aria-label="Filter by property type"
                className="border border-brand-earth rounded px-3 py-2 text-sm text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">All property types</option>
                <option value="vineyards-wineries">Vineyards and Wineries</option>
                <option value="orchards">Orchards and Permanent Crops</option>
                <option value="cattle-ranches">Cattle Ranches</option>
                <option value="real-estate">Real Estate and Development</option>
              </select>
              <select
                aria-label="Filter by province"
                className="border border-brand-earth rounded px-3 py-2 text-sm text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">All provinces</option>
                <option value="mendoza">Mendoza</option>
                <option value="san-juan">San Juan</option>
                <option value="salta">Salta</option>
                <option value="patagonia">Patagonia</option>
                <option value="buenos-aires-province">Buenos Aires Province</option>
              </select>
              <select
                aria-label="Filter by operational status"
                className="border border-brand-earth rounded px-3 py-2 text-sm text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">All statuses</option>
                <option value="operational">Operational</option>
                <option value="partial">Partially Developed</option>
                <option value="raw">Development Land</option>
              </select>
              <select
                aria-label="Filter by opportunity size"
                className="border border-brand-earth rounded px-3 py-2 text-sm text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">All sizes</option>
                <option value="entry">Entry</option>
                <option value="mid">Mid-scale</option>
                <option value="large">Large-scale</option>
              </select>
              <select
                aria-label="Filter by strategic focus"
                className="border border-brand-earth rounded px-3 py-2 text-sm text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">All strategic focuses</option>
                <option value="yield">Yield</option>
                <option value="land-development">Land Development</option>
                <option value="vertical-integration">Vertical Integration</option>
                <option value="long-term-value">Long-Term Value</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Block 3 — Asset Grid */}
      {/*
       * Developer Note: Dynamic CMS connection required. Paginate at 12 assets per page.
       * Each card: H1-format headline / Strategic Rationale tag / Operational Status badge /
       * Key metric / CTA: "View Asset Details"
       * CMS operational-status field must be kept current — stale inventory is an AIO liability.
       */}
      <section className="section">
        <div className="container-site">
          {/* Asset category quick-links */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              {
                label: 'Vineyards and Wineries',
                href: '/investment-opportunities/vineyards-wineries',
                tag: 'Mendoza · Patagonia',
              },
              {
                label: 'Pistachio and Fruit Orchards',
                href: '/investment-opportunities/orchards',
                tag: 'San Juan · Mendoza',
              },
              {
                label: 'Cattle Ranches',
                href: '/investment-opportunities/cattle-ranches',
                tag: 'Patagonia · Salta · Buenos Aires Province',
              },
              {
                label: 'Agricultural Real Estate',
                href: '/investment-opportunities/real-estate',
                tag: 'Five Provinces',
              },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="card-asset group hover:border-brand-olive transition-colors"
                aria-label={`Browse ${cat.label} opportunities`}
              >
                <p className="font-display text-base text-brand-ink group-hover:text-brand-olive mb-1">
                  {cat.label}
                </p>
                <p className="text-xs text-brand-slate">{cat.tag}</p>
              </Link>
            ))}
          </div>

          {/* Placeholder — live grid wired in Checkpoint 5 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-asset opacity-60">
              <p className="text-sm text-brand-slate italic">
                Asset listings load from CMS — implemented in Checkpoint 5.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 4 — Off-Market Criteria Submission */}
      <section className="section bg-brand-fog">
        <div className="container-site max-w-3xl">
          <h2 className="font-display text-display-sm text-brand-ink mb-4">
            Not Finding the Right Opportunity?
          </h2>
          <p className="text-body text-brand-ink mb-2">
            BBI Argentina&apos;s Origination network operates beyond public listings. If you are
            looking for a specific property type, province, scale, operational profile or investment
            objective that is not currently visible in the portfolio, share your criteria.
          </p>
          <p className="text-body text-brand-ink mb-8">
            BBI Argentina will review your requirements and, where appropriate, identify relevant
            off-market opportunities.
          </p>
          <form action="/api/inquiries" method="POST" className="grid sm:grid-cols-2 gap-4">
            <input type="hidden" name="inquiryType" value="criteria-submission" />
            <div className="flex flex-col gap-1">
              <label htmlFor="opp-name" className="text-sm font-medium text-brand-ink">
                Full name
              </label>
              <input
                id="opp-name"
                name="fullName"
                type="text"
                required
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="opp-entity" className="text-sm font-medium text-brand-ink">
                Entity (if applicable)
              </label>
              <input
                id="opp-entity"
                name="entityName"
                type="text"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="opp-email" className="text-sm font-medium text-brand-ink">
                Email
              </label>
              <input
                id="opp-email"
                name="email"
                type="email"
                required
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="opp-type" className="text-sm font-medium text-brand-ink">
                Property type
              </label>
              <select
                id="opp-type"
                name="propertyType"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">Select</option>
                <option>Vineyard or Winery</option>
                <option>Pistachio or Fruit Orchard</option>
                <option>Cattle Ranch</option>
                <option>Agricultural Real Estate</option>
                <option>Mixed</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="opp-province" className="text-sm font-medium text-brand-ink">
                Province preference
              </label>
              <select
                id="opp-province"
                name="province"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">Any province</option>
                <option>Mendoza</option>
                <option>San Juan</option>
                <option>Salta</option>
                <option>Patagonia</option>
                <option>Buenos Aires Province</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="opp-size" className="text-sm font-medium text-brand-ink">
                Size range (hectares)
              </label>
              <input
                id="opp-size"
                name="sizeRange"
                type="text"
                placeholder="e.g. 20–100 ha"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="opp-status" className="text-sm font-medium text-brand-ink">
                Operational preference
              </label>
              <select
                id="opp-status"
                name="operationalPreference"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">Any status</option>
                <option>Fully Operational</option>
                <option>Partially Developed</option>
                <option>Development Land</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="opp-budget" className="text-sm font-medium text-brand-ink">
                Budget range
              </label>
              <select
                id="opp-budget"
                name="budget"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">Select</option>
                <option>Under $500k</option>
                <option>$500k – $1M</option>
                <option>$1M – $3M</option>
                <option>$3M – $10M</option>
                <option>$10M+</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="opp-timeline" className="text-sm font-medium text-brand-ink">
                Timeline
              </label>
              <select
                id="opp-timeline"
                name="timeline"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">Select</option>
                <option>0–6 months</option>
                <option>6–12 months</option>
                <option>12–24 months</option>
                <option>Flexible</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="opp-additional" className="text-sm font-medium text-brand-ink">
                Additional criteria
              </label>
              <textarea
                id="opp-additional"
                name="additionalCriteria"
                rows={3}
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="btn-primary">
                Share Your Criteria
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
