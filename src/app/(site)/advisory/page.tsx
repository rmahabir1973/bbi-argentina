import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema'
import { FAQSchema } from '@/components/schema/FAQSchema'

export const metadata: Metadata = {
  title: 'Investment Advisory Services Argentina | BBI Argentina',
  description:
    'BBI Argentina provides pre-investment due diligence and post-acquisition advisory for vineyard, orchard and cattle ranch investments across Argentina. Advisory support from evaluation through operation.',
}

const faqs = [
  {
    question: 'What does BBI Argentina\'s Advisory module cover?',
    answer:
      'BBI Argentina\'s Advisory module covers the full range of pre-investment due diligence and post-acquisition operational support — from water rights and title verification through to production planning, commercial positioning and ongoing oversight.',
  },
  {
    question: 'When does advisory support begin?',
    answer:
      'Advisory support begins at the evaluation stage, before any capital is committed. BBI Argentina reviews asset fundamentals — water rights, title, financial history, infrastructure condition — and provides findings as part of the pre-acquisition process.',
  },
  {
    question: 'Does BBI Argentina advise on vineyard acquisitions specifically?',
    answer:
      'BBI Argentina\'s Wine Business Advisory covers varietal strategy, winemaker evaluation, production planning, export requirements, cost structure and commercial positioning for vineyard and winery acquisitions in Mendoza.',
  },
  {
    question: 'What advisory is available for cattle ranches?',
    answer:
      'BBI Argentina\'s Cattle Ranching advisory includes assessment of land suitability, carrying capacity, pasture condition and operational structure, alongside livestock oversight strategy and water infrastructure review.',
  },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'BBI Argentina Investment Advisory',
  provider: {
    '@type': 'Organization',
    name: 'BBI Argentina',
    url: 'https://www.bbiargentina.com',
  },
  description:
    "BBI Argentina's Advisory module provides pre-investment due diligence and post-acquisition operational advisory for productive asset acquisitions across Argentina. Service categories: Wine Business, Cattle Ranching, Pistachio and Fruit Orchards, Real Estate and Development.",
  serviceType: 'Investment Advisory',
  areaServed: ['Mendoza', 'San Juan', 'Salta', 'Patagonia', 'Buenos Aires Province'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Advisory Service Categories',
    itemListElement: [
      'Wine Business Advisory',
      'Cattle Ranching Advisory',
      'Pistachio and Fruit Orchard Advisory',
      'Real Estate and Development Advisory',
    ],
  },
}

export default function AdvisoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bbiargentina.com' },
          { name: 'Advisory', url: 'https://www.bbiargentina.com/advisory' },
        ]}
      />

      {/* Block 1 — Hero */}
      <section className="section bg-brand-limestone">
        <div className="container-site">
          <h1 className="font-display text-display-lg text-brand-ink mb-4">
            Investment Advisory in Argentina
          </h1>
          <p className="text-xl text-brand-slate mb-6 max-w-2xl">Guidance from evaluation through operation.</p>
          <p className="text-body text-brand-ink max-w-3xl">
            BBI Argentina provides advisory support across each stage of an acquisition — from
            early evaluation through to operational setup and ongoing oversight. This includes
            assessing opportunities, structuring purchases and supporting the transition from
            ownership to productive operation.
          </p>
        </div>
      </section>

      {/* Block 2 — Before Acquisition */}
      <section className="section">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-8">Before Acquisition</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Due Diligence',
                body: 'Review of the key elements that define an asset, including water rights, title, regulatory status, financial history and infrastructure condition. Findings are organised and shared as part of the evaluation process.',
              },
              {
                title: 'Financial Assessment',
                body: 'Analysis based on operational history, regional benchmarks and current market conditions, providing a clearer view of performance, cost structure and commercial potential.',
              },
              {
                title: 'Site Evaluation',
                body: 'On-the-ground assessment of land, water availability, infrastructure and overall development suitability.',
              },
              {
                title: 'Acquisition Structuring',
                body: 'Structuring the purchase in line with Argentine regulations, including foreign ownership considerations and transaction requirements.',
              },
            ].map((item) => (
              <div key={item.title} className="card-asset">
                <h3 className="font-display text-lg text-brand-ink mb-2">{item.title}</h3>
                <p className="text-body text-brand-slate">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-body text-brand-ink mt-6 max-w-3xl">
            Twenty years in this market means BBI has seen the problems that derail acquisitions —
            and structured solutions before buyers encounter them.
          </p>
        </div>
      </section>

      {/* Block 3 — After Acquisition */}
      <section className="section bg-brand-fog">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-8">After Acquisition</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Operational Setup',
                body: 'Support in transitioning the asset into operation, including coordination of local teams, suppliers and required registrations.',
              },
              {
                title: 'Production Approach',
                body: "Development of a production plan aligned with the buyer's objectives — whether focused on yield, brand development or phased growth.",
              },
              {
                title: 'Ongoing Oversight',
                body: 'Support with performance tracking, reporting and regulatory compliance as required.',
              },
              {
                title: 'Commercial Planning',
                body: 'Advisory on market access and commercial sales channels, including export routes, distribution strategy and buyer relationships depending on the asset.',
              },
            ].map((item) => (
              <div key={item.title} className="card-asset">
                <h3 className="font-display text-lg text-brand-ink mb-2">{item.title}</h3>
                <p className="text-body text-brand-slate">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="text-body text-brand-ink mt-6 max-w-3xl">
            In practice, this means the buyer arrives at ownership with the hard work already done.
          </p>
        </div>
      </section>

      {/* Block 4 — Advisory by Asset Type */}
      <section className="section">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-8">
            Advisory by Asset Type
          </h2>
          <div className="space-y-6 max-w-3xl">
            {[
              {
                title: 'Wine Business',
                href: '/investment-opportunities/vineyards-wineries',
                linkLabel: 'View vineyard and winery opportunities',
                body: 'Advisory across vineyard and winery acquisitions, including varietal strategy, winemaker evaluation, production planning, export requirements, cost structure and commercial positioning.',
              },
              {
                title: 'Cattle Ranching',
                href: '/investment-opportunities/cattle-ranches',
                linkLabel: 'View cattle ranch opportunities',
                body: 'Assessment of land suitability, carrying capacity, pasture condition and operational structure, alongside livestock oversight strategy and water infrastructure review.',
              },
              {
                title: 'Pistachio and Fruit Orchards',
                href: '/investment-opportunities/orchards',
                linkLabel: 'View orchard opportunities',
                body: 'Evaluation of orchard and pistachio opportunities, including land suitability, irrigation requirements, yield timelines and regional conditions, with advisory on production planning and market access.',
              },
              {
                title: 'Real Estate and Development',
                href: '/investment-opportunities/real-estate',
                linkLabel: 'View real estate and development opportunities',
                body: 'Advisory on land and development opportunities, including feasibility, zoning, cost structure and overall project viability.',
              },
            ].map((item) => (
              <div key={item.title} className="card-asset">
                <h3 className="font-display text-xl text-brand-ink mb-2">{item.title}</h3>
                <p className="text-body text-brand-slate mb-3">{item.body}</p>
                <Link
                  href={item.href}
                  className="text-brand-olive font-medium hover:underline text-sm"
                  aria-label={item.linkLabel}
                >
                  {item.linkLabel} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 5 — FAQ */}
      <section className="section bg-brand-limestone">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-8">
            Frequently Asked Questions
          </h2>
          <dl className="space-y-6 max-w-3xl">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="font-display text-lg text-brand-ink mb-2">{faq.question}</dt>
                <dd className="text-body text-brand-slate">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Block 6 — Conversion */}
      <section className="section">
        <div className="container-site">
          <div className="flex flex-wrap gap-4">
            <Link href="/contact?type=advisory" className="btn-primary">
              Request Advisory Scope
            </Link>
            <Link href="/execution" className="btn-secondary">
              View Execution Capabilities
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
