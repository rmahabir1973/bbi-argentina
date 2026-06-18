import type { Metadata } from 'next'
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema'
import { FAQSchema } from '@/components/schema/FAQSchema'

export const metadata: Metadata = {
  title: 'Argentina Residency & Citizenship Through Investment | BBI',
  description:
    'BBI Argentina coordinates productive asset acquisitions aligned with Argentina\'s investment-based residency and citizenship framework. Structured process. Legal counsel coordinated.',
}

const faqs = [
  {
    question: 'What is Decree 524/2025?',
    answer:
      'Decree 524/2025 establishes the legal framework for Argentina\'s current citizenship-by-investment program. It creates a pathway through which foreign investors may apply for citizenship through qualifying economic contributions, while leaving key elements — including investment thresholds, eligible categories and application procedures — to be defined through subsequent regulations.',
  },
  {
    question: 'Is the citizenship-by-investment program currently active?',
    answer:
      'The legal framework is in place, but the program is still in its activation phase. Final regulations, including qualifying investment criteria and application procedures, are expected to be confirmed as the program is formally launched.',
  },
  {
    question: 'What types of investments may be considered?',
    answer:
      'Depending on how the framework is activated, qualifying investments may include productive sector investments, structured development projects or other recognised forms of economic contribution. Final regulations will define the specific categories and thresholds.',
  },
  {
    question: 'Does real estate qualify for citizenship by investment?',
    answer:
      'Eligibility of real estate investments will depend on how final regulations are defined. In general, passive ownership alone may not be sufficient, while projects involving development, operations or economic activity may be treated differently depending on the framework.',
  },
  {
    question: 'Does BBI Argentina manage the citizenship application process?',
    answer:
      'BBI Argentina focuses on asset origination, due diligence, structuring and execution. The formal residency or citizenship process is managed by specialised Argentine legal counsel, with coordination between the legal and investment components where required.',
  },
  {
    question: 'Is there a minimum investment amount?',
    answer:
      'Investment thresholds are expected to be defined as part of the final program regulations. Advisory direction on investment scale and structuring is provided as part of the qualification process.',
  },
  {
    question: 'What is the first step to explore this pathway?',
    answer:
      'The process begins with qualification. This allows BBI to understand your objectives, profile and whether a coordinated investment and legal strategy may be relevant.',
  },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Argentina Residency and Citizenship Through Investment',
  provider: {
    '@type': 'Organization',
    name: 'BBI Argentina',
    url: 'https://www.bbiargentina.com',
  },
  description:
    'BBI Argentina provides coordinated investment and legal pathway support for buyers pursuing residency or citizenship through productive asset ownership in Argentina under Decree 524/2025.',
  serviceType: 'Investment Advisory',
  areaServed: 'Argentina',
}

export default function CitizenshipResidencyPage() {
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
          {
            name: 'Citizenship & Residency',
            url: 'https://www.bbiargentina.com/citizenship-residency-by-investment',
          },
        ]}
      />

      {/* Block 1 — Hero */}
      <section className="section bg-brand-limestone">
        <div className="container-site">
          {/* Important Notice */}
          <div className="legal-callout mb-8">
            <p className="text-sm text-brand-ink">
              <strong>Note:</strong> BBI Argentina does not provide legal or immigration advice.
              This section addresses investment-based pathways exclusively.
            </p>
          </div>

          <h1 className="font-display text-display-lg text-brand-ink mb-4">
            Residency and Citizenship Through Investment in Argentina
          </h1>
          <p className="text-xl text-brand-slate mb-4 max-w-2xl">
            A coordinated approach to productive asset ownership, long-term presence and legal
            pathway support.
          </p>
          <div className="max-w-3xl space-y-4">
            <p className="text-body text-brand-ink">
              This section is designed for qualified international buyers considering productive
              asset ownership in Argentina and who may also wish to establish residency or pursue a
              longer-term citizenship strategy in the country.
            </p>
            <p className="text-body text-brand-ink">
              BBI Argentina provides a coordinated process spanning asset origination, due
              diligence, acquisition structuring and execution, with legal pathway support delivered
              in coordination with specialised Argentine counsel.
            </p>
          </div>
          <div className="mt-8">
            <a href="#qualify" className="btn-primary">
              Initiate Qualification
            </a>
          </div>
        </div>
      </section>

      {/* Block 2 — Investment and Legal Pathway Alignment */}
      <section className="section">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-6">
            Investment and Legal Pathway Alignment
          </h2>
          <div className="max-w-3xl space-y-4">
            <p className="text-body text-brand-ink">
              Argentina&apos;s current investment-based legal framework has created new interest in
              the relationship between productive asset ownership and longer-term residency or
              citizenship strategy.
            </p>
            <p className="text-body text-brand-ink">
              While final regulations — including qualifying investment categories, thresholds and
              application procedures — are still being defined, international buyers are increasingly
              evaluating Argentine investments not only for their commercial value, but also for how
              they may support lawful long-term presence in the country.
            </p>
            <p className="text-body text-brand-ink">
              Depending on how the framework is implemented, qualifying investments may include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-body text-brand-ink pl-4">
              <li>
                Productive sector investments such as agribusiness, tourism, energy or operating
                businesses
              </li>
              <li>
                Structured investments into approved development projects or regulated vehicles
              </li>
              <li>
                Other forms of economic contribution recognised under the final program framework
              </li>
            </ul>
            <p className="text-body text-brand-ink">
              BBI Argentina operates across the real economy, focusing on assets with underlying
              operational and commercial substance. This allows investments to be structured in a way
              that can be evaluated within the applicable framework as it develops, while maintaining
              a focus on asset quality, execution and long-term performance. BBI&apos;s approach
              prioritises opportunities that stand on their own commercial merits, regardless of the
              specific legal pathway available.
            </p>
          </div>
        </div>
      </section>

      {/* Block 3 — Two Routes */}
      <section className="section bg-brand-fog">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-8">
            Two Routes. One Coordinated Platform.
          </h2>
          <p className="text-body text-brand-ink max-w-3xl mb-8">
            Argentina&apos;s legal framework allows international buyers to think beyond asset
            ownership alone. Depending on the buyer profile, investment structure and level of
            economic activity in the country, a productive asset acquisition may support residency
            planning and, over time, a broader citizenship strategy.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-asset">
              <h3 className="font-display text-xl text-brand-ink mb-3">
                Residency Through Investment and Economic Activity
              </h3>
              <p className="text-body text-brand-slate">
                Investment into productive assets or operating structures that support lawful
                residence planning in Argentina. This route may suit buyers establishing an economic
                presence through agriculture, hospitality, real estate or other active sectors.
              </p>
            </div>
            <div className="card-asset">
              <h3 className="font-display text-xl text-brand-ink mb-3">
                Citizenship Strategy Through Residence and Legal Structuring
              </h3>
              <p className="text-body text-brand-slate">
                For selected investors, citizenship strategy may be pursued through lawful
                residence, economic activity and tailored legal structuring. This process is managed
                in coordination with specialised Argentine counsel and may, in certain cases,
                involve court-led legal pathways under existing law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Block 4 — Investment Profiles */}
      <section className="section">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-8">Investment Profiles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card-asset">
              <h3 className="font-display text-lg text-brand-ink mb-2">
                Productive Agricultural Assets
              </h3>
              <p className="text-body text-brand-slate">
                Vineyards, wineries, orchards, olive groves and cattle ranches with real productive
                activity and long-term operating substance.
              </p>
            </div>
            <div className="card-asset">
              <h3 className="font-display text-lg text-brand-ink mb-2">
                Hospitality and Tourism Projects
              </h3>
              <p className="text-body text-brand-slate">
                Hotels, lodges and tourism-driven developments capable of supporting economic
                activity and ongoing operations.
              </p>
            </div>
            <div className="card-asset">
              <h3 className="font-display text-lg text-brand-ink mb-2">
                Operating Businesses and Strategic Projects
              </h3>
              <p className="text-body text-brand-slate">
                In certain cases, broader operating structures — including technology, energy or
                mixed-use developments — may form part of an overall investment and structuring
                strategy. Investments with real economic substance typically provide the strongest
                long-term foundation.
              </p>
            </div>
          </div>
          <p className="text-body text-brand-ink mt-6 max-w-3xl">
            BBI focuses on opportunities that stand on their own commercial merits first, while
            allowing residency and citizenship strategy to be evaluated as part of a broader
            coordinated process.
          </p>
        </div>
      </section>

      {/* Block 5 — Process Timeline */}
      <section className="section bg-brand-limestone">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-8">
            From Investment to Legal Status
          </h2>
          <ol className="space-y-6 max-w-3xl">
            {[
              {
                step: '1',
                title: 'Investor Qualification',
                desc: 'Assessment of buyer profile, investment scope, objectives and legal considerations.',
              },
              {
                step: '2',
                title: 'Asset Matching and Strategic Review',
                desc: 'Alignment of suitable opportunities based on sector, region, budget and level of operational involvement.',
              },
              {
                step: '3',
                title: 'Structuring and Legal Coordination',
                desc: 'Commercial structuring of the acquisition alongside coordination with legal counsel on the relevant residency or citizenship pathway.',
              },
              {
                step: '4',
                title: 'Acquisition and Operational Setup',
                desc: "Execution of the investment and transition into operation through BBI's local network.",
              },
              {
                step: '5',
                title: 'Residency or Citizenship Progression',
                desc: 'Legal status strategy progresses in coordination with the investment structure, operational footprint and applicable legal pathway.',
              },
            ].map((item) => (
              <li key={item.step} className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-olive text-white flex items-center justify-center font-semibold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-display text-lg text-brand-ink mb-1">{item.title}</h3>
                  <p className="text-body text-brand-slate">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Block 6 — Legal Coordination Callout */}
      <section className="section">
        <div className="container-site">
          <div className="legal-callout max-w-3xl">
            <p className="text-body text-brand-ink">
              BBI Argentina provides a coordinated productive asset investment platform that
              includes origination, due diligence, structuring and execution. Legal pathway support
              is delivered through specialised Argentine counsel. Outcomes depend on the
              buyer&apos;s profile, investment structure and applicable law.
            </p>
          </div>
        </div>
      </section>

      {/* Block 7 — Qualification Form */}
      <section id="qualify" className="section bg-brand-fog">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-4">
            Initiate the Qualification Process
          </h2>
          <p className="text-body text-brand-ink max-w-2xl mb-6">
            BBI Argentina works through a structured qualification process, focusing on projects
            that are aligned in terms of scope, seriousness and execution requirements. Submitting
            your details allows us to assess whether there is a fit and, where appropriate, begin
            aligning investment opportunities and structuring approach.
          </p>
          <ul className="list-disc list-inside space-y-1 text-body text-brand-slate mb-8 pl-4">
            <li>Initial review of your objectives, profile and investment scope</li>
            <li>Alignment with relevant asset types and project categories</li>
            <li>
              Determination of whether advisory, execution or coordinated legal strategy is
              appropriate
            </li>
          </ul>
          <form
            action="/api/inquiries"
            method="POST"
            className="grid sm:grid-cols-2 gap-4 max-w-2xl"
          >
            <input type="hidden" name="inquiryType" value="residency-citizenship" />
            <div className="flex flex-col gap-1">
              <label htmlFor="cbi-name" className="text-sm font-medium text-brand-ink">
                Full name
              </label>
              <input
                id="cbi-name"
                name="fullName"
                type="text"
                required
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="cbi-entity" className="text-sm font-medium text-brand-ink">
                Entity name
              </label>
              <input
                id="cbi-entity"
                name="entityName"
                type="text"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="cbi-country" className="text-sm font-medium text-brand-ink">
                Country of residence
              </label>
              <input
                id="cbi-country"
                name="country"
                type="text"
                required
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="cbi-email" className="text-sm font-medium text-brand-ink">
                Email
              </label>
              <input
                id="cbi-email"
                name="email"
                type="email"
                required
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="cbi-scope" className="text-sm font-medium text-brand-ink">
                Investment scope
              </label>
              <input
                id="cbi-scope"
                name="investmentScope"
                type="text"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="cbi-asset" className="text-sm font-medium text-brand-ink">
                Preferred asset type
              </label>
              <select
                id="cbi-asset"
                name="preferredAssetType"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">Select</option>
                <option>Vineyard or Winery</option>
                <option>Orchard</option>
                <option>Cattle Ranch</option>
                <option>Hospitality or Tourism</option>
                <option>Operating Business</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="cbi-timeline" className="text-sm font-medium text-brand-ink">
                Preferred timeline
              </label>
              <select
                id="cbi-timeline"
                name="timeline"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">Select</option>
                <option>0–6 months</option>
                <option>6–12 months</option>
                <option>12–24 months</option>
                <option>24+ months</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Submit and Initiate Qualification
              </button>
              <p className="text-sm text-brand-slate mt-3">
                BBI Argentina treats all preliminary discussions with discretion and
                confidentiality.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Block 8 — FAQ */}
      <section className="section">
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

      {/* Block 9 — Legal Disclaimer */}
      <section className="section bg-brand-limestone">
        <div className="container-site">
          <div className="legal-callout max-w-3xl border-2 border-brand-earth">
            <p className="text-sm text-brand-ink">
              <strong>Legal Disclaimer:</strong> BBI Argentina is a productive asset investment
              platform providing origination, advisory and execution services. BBI Argentina does
              not provide legal or immigration advice. Residency and citizenship pathways are managed
              by independent, specialised Argentine legal counsel. All outcomes are subject to the
              buyer&apos;s individual profile, investment structure and applicable Argentine law,
              including final regulations under{' '}
              <strong>Decree 524/2025</strong> (Argentina&apos;s current citizenship-by-investment
              legal framework, with final implementing regulations still being defined).
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
