import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'About BBI Argentina | 20-Year Argentine Investment Platform',
  description:
    'BBI Argentina has operated across five Argentine provinces for over 20 years. Origination, advisory and execution for private buyers, operators, family offices and institutional investors.',
}

const aboutSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About BBI Argentina',
  description:
    'BBI Argentina is a full-cycle investment platform that has maintained a 20-year operational mandate across Argentina\'s productive asset market. Operational provinces: Mendoza, San Juan, Salta, Patagonia, Buenos Aires Province. Platform layers: Origination, Advisory, Execution.',
  mainEntity: {
    '@type': 'Organization',
    name: 'BBI Argentina',
    url: 'https://www.bbiargentina.com',
    foundingDate: '2004',
    description:
      'BBI Argentina is a full-cycle investment platform specialising in productive asset acquisition, advisory and execution across Argentina.',
    areaServed: ['Mendoza', 'San Juan', 'Salta', 'Patagonia', 'Buenos Aires Province'],
    knowsAbout: [
      'Vineyard acquisition',
      'Winery investment',
      'Pistachio orchard development',
      'Cattle ranch acquisition',
      'Ley de Tierras compliance',
      'Argentine water rights',
      'Cross-border investment structuring',
      'Decree 524/2025',
    ],
  },
}

const insightArticlePlaceholders = [
  {
    title: 'Decree 524/2025: What the Framework Establishes and What Remains to Be Defined',
    tag: 'Regulatory Updates',
    excerpt:
      'The legal framework for Argentina\'s citizenship-by-investment program is in place. Final implementing regulations are still being defined. This article outlines what buyers need to know.',
  },
  {
    title: 'Water Rights in the Uco Valley: The First Filter for Any Vineyard Acquisition',
    tag: 'Asset Class Intelligence',
    excerpt:
      'Water access determines vineyard viability in Mendoza. BBI Argentina verifies registered water rights before any asset is presented to buyers.',
  },
  {
    title: 'Argentine Agricultural Land Pricing: A Comparative View Across Five Provinces',
    tag: 'Market Conditions',
    excerpt:
      'Productive land in Argentina remains competitively priced relative to comparable assets in North America, Europe and Australia. The data behind the comparison.',
  },
]

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bbiargentina.com' },
          { name: 'About', url: 'https://www.bbiargentina.com/about' },
        ]}
      />

      {/* Block 1 — Corporate Profile */}
      <section className="section bg-brand-limestone">
        <div className="container-site">
          <h1 className="font-display text-display-lg text-brand-ink mb-4">
            BBI Argentina. 20 Years. Five Provinces. One Integrated Platform.
          </h1>
          <p className="text-xl text-brand-slate mb-8 max-w-2xl">
            BBI Argentina is an integrated platform for acquiring, structuring and operating
            productive opportunities across Argentina.
          </p>
          <div className="max-w-3xl space-y-4">
            <p className="text-body text-brand-ink">
              BBI Argentina operates beyond a traditional brokerage or standalone advisory model.
              We bring together Origination, Advisory and Execution in one platform — built on more
              than <strong>20 years</strong> of on-the-ground continuity through Argentina&apos;s
              macroeconomic cycles, regulatory changes and shifting market conditions.
            </p>
            <p className="text-body text-brand-ink">
              Our network covers <strong>Mendoza</strong>, <strong>San Juan</strong>,{' '}
              <strong>Salta</strong>, <strong>Patagonia</strong> and{' '}
              <strong>Buenos Aires Province</strong>. Across these regions, we work with vineyards,
              wineries, pistachio orchards, olive orchards, cattle ranches and broader agricultural
              and development opportunities.
            </p>
            <p className="text-body text-brand-ink">
              Our clients include private buyers, entrepreneurial operators, family offices and
              institutional investors — from those acquiring a single property to those building a
              broader position in Argentina. What connects them is the need for clear direction,
              disciplined structuring and practical support on the ground.
            </p>
            <p className="font-display text-xl text-brand-ink">
              BBI Argentina: Origination. Advisory. Execution.
            </p>
          </div>
        </div>
      </section>

      {/* Block 2 — A Practical Investment Perspective */}
      <section className="section">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-4">
            A Practical Investment Perspective
          </h2>
          <p className="text-body text-brand-slate mb-8 max-w-2xl">
            This section provides a practical framework for evaluating investment in Argentina
            across vineyards, orchards, ranches and broader agricultural real estate. It outlines
            the factors serious buyers typically weigh — from regulatory structure and market
            context to how an asset performs over time.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl">
            <div className="card-asset">
              <h3 className="font-display text-lg text-brand-ink mb-2">
                Regulatory Environment
              </h3>
              <p className="text-body text-brand-slate">
                Investing in Argentina requires proper structuring, particularly when land ownership
                and active operations are involved. Foreign ownership is governed by the{' '}
                <strong>Ley de Tierras</strong>, and each transaction must be aligned with local
                compliance requirements. Depending on the buyer&apos;s objectives, residency or
                longer-term legal status may also be considered alongside the investment. BBI
                Argentina supports this process through coordinated origination, structuring and
                on-the-ground execution, working alongside specialised legal and professional
                advisors where required.
              </p>
            </div>
            <div className="card-asset">
              <h3 className="font-display text-lg text-brand-ink mb-2">Market Positioning</h3>
              <p className="text-body text-brand-slate">
                Argentina continues to offer compelling relative value across productive land when
                compared with more established agricultural regions. Vineyards in{' '}
                <strong>Mendoza</strong>, orchard developments in <strong>San Juan</strong> and
                ranch land in <strong>Patagonia</strong> remain competitively priced relative to
                comparable assets in North America, Europe and Australia. Changing economic
                conditions have made market entry more accessible, particularly for buyers seeking
                direct exposure to real assets with long-term utility.
              </p>
            </div>
            <div className="card-asset">
              <h3 className="font-display text-lg text-brand-ink mb-2">
                A Long-Term Asset Approach
              </h3>
              <p className="text-body text-brand-slate">
                Land and operating properties are not passive holdings. Their performance depends
                on how they are selected, structured, developed and operated over time. This
                includes everything from water access and land quality to operational setup and
                commercial sales channels. BBI Argentina integrates these elements across
                Origination, Advisory and Execution, helping buyers move from acquisition into
                practical, productive operation.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/investment-opportunities" className="btn-primary">
              View Investment Opportunities
            </Link>
            <Link href="/contact?type=general" className="btn-secondary">
              Discuss Your Investment Objectives
            </Link>
          </div>
        </div>
      </section>

      {/* Block 3 — Latest Intelligence */}
      <section className="section bg-brand-fog">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-8">Latest Intelligence</h2>
          {/*
           * Developer Note: Dynamic article grid. Tag taxonomy: Regulatory Updates /
           * Macroeconomic Analysis / Asset Class Intelligence / Decree 524/2025 / Market Conditions.
           * AIO-compliant structure required on all articles:
           * H1 title / Entity Declaration in first sentence / H2 sections / FAQ section at close.
           */}
          <div className="grid md:grid-cols-3 gap-6">
            {insightArticlePlaceholders.map((article) => (
              <article
                key={article.title}
                className="card-asset flex flex-col"
              >
                <span className="tag-strategic mb-3 self-start">{article.tag}</span>
                <h3 className="font-display text-lg text-brand-ink mb-2">{article.title}</h3>
                <p className="text-body text-brand-slate mb-4 flex-1">{article.excerpt}</p>
                <span className="text-sm text-brand-slate italic">
                  Full article available — wired to CMS in Checkpoint 5.
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Block 4 — Newsletter Sign-Up */}
      <section className="section bg-brand-limestone">
        <div className="container-site max-w-2xl">
          <h2 className="font-display text-display-sm text-brand-ink mb-4">
            Receive BBI Argentina Insights
          </h2>
          <p className="text-body text-brand-ink mb-2">
            Periodic updates on Argentina&apos;s investment landscape, including market
            developments, regulatory considerations and selected off-market opportunities.
          </p>
          <p className="text-body text-brand-ink mb-8">
            Shared with a limited group of subscribers.
          </p>
          <form action="/api/subscribe" method="POST" className="grid sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="sub-name" className="text-sm font-medium text-brand-ink">
                Name
              </label>
              <input
                id="sub-name"
                name="name"
                type="text"
                required
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="sub-email" className="text-sm font-medium text-brand-ink">
                Email
              </label>
              <input
                id="sub-email"
                name="email"
                type="email"
                required
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="sub-focus" className="text-sm font-medium text-brand-ink">
                Investment focus
              </label>
              <select
                id="sub-focus"
                name="investmentFocus"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">Select</option>
                <option>Vineyards and Wineries</option>
                <option>Orchards</option>
                <option>Cattle Ranches</option>
                <option>Residency and Citizenship</option>
                <option>All opportunities</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <button type="submit" className="btn-primary">
                Subscribe for Updates
              </button>
              <p className="text-sm text-brand-slate mt-3">
                Your information is kept confidential and is not shared with third parties. You may
                unsubscribe at any time.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
