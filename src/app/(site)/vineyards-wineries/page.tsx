import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Vineyards & Wineries for Sale in Argentina | BBI Argentina',
  description:
    'Off-market vineyards and wineries in Mendoza\'s Uco Valley and Luján de Cuyo. Operating assets and development land with verified water rights. Available to qualified buyers.',
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'BBI Argentina Vineyard and Winery Opportunities',
  description:
    'BBI Argentina presents off-market vineyard and winery acquisitions in Mendoza, including Uco Valley and Luján de Cuyo. Assets range from fully operational wine businesses to development land with registered water rights.',
  provider: {
    '@type': 'Organization',
    name: 'BBI Argentina',
    url: 'https://www.bbiargentina.com',
  },
}

export default function VineyardsWineriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bbiargentina.com' },
          {
            name: 'Vineyards & Wineries',
            url: 'https://www.bbiargentina.com/vineyards-wineries',
          },
        ]}
      />

      {/* Block 1 — Hero */}
      <section className="section bg-brand-limestone">
        <div className="container-site">
          <h1 className="font-display text-display-lg text-brand-ink mb-4">
            Vineyards and Wineries in Argentina. Off-Market. Verified. Available to Qualified
            Buyers.
          </h1>
          <p className="text-xl text-brand-slate mb-6 max-w-3xl">
            BBI Argentina originates and structures vineyard and winery opportunities across{' '}
            <strong>Mendoza&apos;s Uco Valley</strong> and{' '}
            <strong>Luján de Cuyo</strong> — from operating assets to development land with
            registered water rights.
          </p>
          <p className="text-body text-brand-ink max-w-3xl">
            Buyers approach this market with different objectives. Some are looking for operating
            vineyard or winery assets with established production. Others are focused on land with
            long-term vineyard development potential. BBI Argentina aligns each search with
            opportunities that match the buyer&apos;s strategy, budget and intended level of
            operational involvement.
          </p>
        </div>
      </section>

      {/* Block 2 — Two Investment Approaches */}
      <section className="section">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-8">
            Two Investment Approaches
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-asset">
              <div className="mb-3">
                <span className="tag-strategic">Production Continuity</span>
              </div>
              <h3 className="font-display text-xl text-brand-ink mb-3">
                Operational Vineyard and Winery Assets
              </h3>
              <p className="text-body text-brand-slate mb-4">
                For buyers seeking established vineyard or winery assets with existing production,
                infrastructure and operating history. These opportunities are suited to those
                looking for immediate entry into the sector through a functioning asset with defined
                operational capacity.
              </p>
              <Link
                href="/investment-opportunities?type=vineyards-wineries&status=operational"
                className="btn-secondary"
              >
                Review Operational Opportunities
              </Link>
            </div>
            <div className="card-asset">
              <div className="mb-3">
                <span className="tag-strategic">Land Appreciation</span>
              </div>
              <h3 className="font-display text-xl text-brand-ink mb-3">
                Vineyard Development and Land Acquisition
              </h3>
              <p className="text-body text-brand-slate mb-4">
                For buyers focused on land acquisition and long-term vineyard development. These
                opportunities include raw or partially developed land with verified water rights,
                suited to phased investment and structured vineyard build-out.
              </p>
              <Link
                href="/investment-opportunities?type=vineyards-wineries&status=development"
                className="btn-secondary"
              >
                Review Development Opportunities
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Block 3 — BBI Asset Verification Framework */}
      <section className="section bg-brand-fog">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-8">
            BBI Asset Verification Framework
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-asset">
              <h3 className="font-display text-lg text-brand-ink mb-2">
                Water Rights Verification
              </h3>
              <p className="text-body text-brand-slate">
                Every vineyard and winery opportunity is reviewed for water rights before
                presentation. Registered wells, irrigation systems and provincial allocation status
                are confirmed at the outset. In a market where water access is increasingly
                constrained, this is the first non-negotiable filter.
              </p>
            </div>
            <div className="card-asset">
              <h3 className="font-display text-lg text-brand-ink mb-2">
                Operational and Financial Review
              </h3>
              <p className="text-body text-brand-slate">
                Operating assets are assessed for production capacity, infrastructure and available
                financial history. Only opportunities that satisfy BBI Argentina&apos;s
                pre-screening standards are brought forward.
              </p>
            </div>
            <div className="card-asset">
              <h3 className="font-display text-lg text-brand-ink mb-2">
                Title and Regulatory Compliance
              </h3>
              <p className="text-body text-brand-slate">
                Title verification and regulatory review, including{' '}
                <strong>Ley de Tierras</strong> compliance (Argentina&apos;s Foreign Land Ownership
                Law, which governs the acquisition of land by non-resident foreign nationals), are
                conducted as part of BBI Argentina&apos;s pre-screening process. Foreign ownership
                considerations are assessed before any asset is presented to international buyers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 4 — Current Opportunities Grid */}
      <section className="section">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-4">
            Current Vineyard and Winery Opportunities
          </h2>
          <p className="text-body text-brand-slate mb-8">
            {/* Developer Note: Dynamic asset grid with filters for Operational Status / Region /
             * Varietal / Size. Each card uses standard headline format. CMS connection required. */}
            BBI Argentina maintains a pre-screened portfolio of off-market vineyard and winery
            opportunities across <strong>Mendoza</strong>. Verified buyers receive access to full
            financial documentation and due diligence materials.
          </p>

          {/* Filter bar placeholder — connected to CMS in Checkpoint 5 */}
          <div className="flex flex-wrap gap-3 mb-8 p-4 bg-brand-fog rounded-lg">
            <select
              aria-label="Filter by operational status"
              className="border border-brand-earth rounded px-3 py-2 text-sm text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
            >
              <option value="">All statuses</option>
              <option>Fully Operational</option>
              <option>Partially Developed</option>
              <option>Development Land</option>
            </select>
            <select
              aria-label="Filter by region"
              className="border border-brand-earth rounded px-3 py-2 text-sm text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
            >
              <option value="">All regions</option>
              <option>Uco Valley</option>
              <option>Luján de Cuyo</option>
              <option>Maipú</option>
              <option>Patagonia</option>
            </select>
            <select
              aria-label="Filter by varietal"
              className="border border-brand-earth rounded px-3 py-2 text-sm text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
            >
              <option value="">All varietals</option>
              <option>Malbec</option>
              <option>Cabernet Franc</option>
              <option>Cabernet Sauvignon</option>
              <option>Mixed</option>
            </select>
          </div>

          {/* Asset grid — populated dynamically in Checkpoint 5 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-asset opacity-60">
              <p className="text-sm text-brand-slate italic">
                Asset listings load from CMS — implemented in Checkpoint 5.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link href="/investment-opportunities" className="btn-secondary">
              View Full Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Block 5 — Advisory and Execution */}
      <section className="section bg-brand-limestone">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-8">
            Advisory and Execution
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-display text-lg text-brand-ink mb-2">
                Vineyard and Winery Advisory
              </h3>
              <p className="text-body text-brand-slate mb-3">
                BBI provides pre-acquisition due diligence and post-acquisition advisory for
                vineyard and winery acquisitions. This includes varietal assessment, water rights
                verification, financial review, production strategy, winemaker evaluation and
                commercial positioning.
              </p>
              <Link
                href="/advisory"
                className="text-brand-olive font-medium hover:underline"
                aria-label="View BBI Argentina's Wine Business Advisory module"
              >
                BBI Argentina&apos;s Wine Business Advisory module &rarr;
              </Link>
            </div>
            <div>
              <h3 className="font-display text-lg text-brand-ink mb-2">
                Water and Irrigation Execution
              </h3>
              <p className="text-body text-brand-slate mb-3">
                For development projects, BBI manages irrigation design, well registration, water
                allocation compliance and infrastructure deployment, ensuring assets are positioned
                for long-term productive use.
              </p>
              <Link
                href="/execution"
                className="text-brand-olive font-medium hover:underline"
                aria-label="View BBI Argentina's Water and Irrigation Execution module"
              >
                BBI Argentina&apos;s Water and Irrigation Execution module &rarr;
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact?type=property-inquiry" className="btn-primary">
              Request Asset Information
            </Link>
            <Link href="/contact?type=criteria" className="btn-secondary">
              Share Your Criteria
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
