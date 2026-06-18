import type { Metadata } from 'next'
import Link from 'next/link'
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema'
import { HowToSchema } from '@/components/schema/HowToSchema'
import { FAQSchema } from '@/components/schema/FAQSchema'
import { ProjectScopeTool } from '@/components/execution/ProjectScopeTool'

export const metadata: Metadata = {
  title: 'Agricultural Execution Services Argentina | BBI Argentina',
  description:
    "BBI Argentina's Execution module manages technical, infrastructure and operational work from acquisition through to productive operation across Argentina.",
}

const howToSteps = [
  {
    position: 1,
    name: 'Initial Assessment',
    text: 'Review of the project, including land condition, water availability and overall development suitability.',
  },
  {
    position: 2,
    name: 'Project Planning',
    text: 'Definition of scope, layout and infrastructure requirements based on the intended use of the property.',
  },
  {
    position: 3,
    name: 'Site Preparation',
    text: 'Preparation of the land, including clearing, levelling and groundwork required before development begins.',
  },
  {
    position: 4,
    name: 'Build and Activation',
    text: 'Installation of infrastructure, irrigation systems and operational components needed to bring the project into use.',
  },
  {
    position: 5,
    name: 'Operational Launch',
    text: 'Transition into active operation, including setup of operations, core processes and ongoing production.',
  },
]

const faqs = [
  {
    question: 'What does BBI Argentina\'s Execution module cover?',
    answer:
      "BBI Argentina's Execution module manages the full operational activation of productive asset acquisitions — from infrastructure and land development through to irrigation systems, construction, farm setup and technical and regulatory compliance.",
  },
  {
    question: 'How long does a typical execution project take?',
    answer:
      'Project timelines depend on asset type, current condition and target scale. A raw land development project typically runs 12–24 months from site preparation to operational launch. Operational asset transitions are typically shorter.',
  },
  {
    question: 'Does BBI Argentina manage irrigation installation?',
    answer:
      'BBI Argentina\'s Execution module manages registered well drilling, drip and flood irrigation design and installation, water allocation compliance and irrigation maintenance frameworks across all productive asset classes.',
  },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'BBI Argentina Execution Services',
  provider: {
    '@type': 'Organization',
    name: 'BBI Argentina',
    url: 'https://www.bbiargentina.com',
  },
  description:
    "BBI Argentina's Execution module manages the full operational activation of productive asset acquisitions across Argentina. Service scope: Infrastructure and Land Development, Water and Irrigation Systems, Construction, Farm Setup and Operations, Technical and Regulatory Compliance.",
  serviceType: 'Agricultural Development',
  areaServed: ['Mendoza', 'San Juan', 'Salta', 'Patagonia', 'Buenos Aires Province'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Execution Modules',
    itemListElement: [
      'Infrastructure and Land Development',
      'Water and Irrigation Systems',
      'Construction',
      'Farm Setup and Operations',
      'Technical and Regulatory Compliance',
    ],
  },
}

export default function ExecutionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <HowToSchema
        name="How BBI Argentina Projects Move into Operation"
        description="A clear, step-by-step process that takes a project from initial assessment through to active operation."
        steps={howToSteps}
      />
      <FAQSchema items={faqs} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bbiargentina.com' },
          { name: 'Execution', url: 'https://www.bbiargentina.com/execution' },
        ]}
      />

      {/* Block 1 — Hero */}
      <section className="section bg-brand-limestone">
        <div className="container-site">
          <h1 className="font-display text-display-lg text-brand-ink mb-4">
            Execution for Argentine Land and Operating Projects. From Raw Land to Operational
            Output.
          </h1>
          <p className="text-xl text-brand-slate mb-6 max-w-2xl">From Acquisition to Operation.</p>
          <p className="text-body text-brand-ink max-w-3xl">
            BBI Argentina&apos;s Execution module manages the technical, infrastructure and
            operational work required to move projects from feasibility and engineering through to
            operational launch. Following purchase, BBI works with established local providers to
            coordinate infrastructure, technical setup and operational launch. Each project is
            adapted to the asset, its current stage and the buyer&apos;s objectives, supporting the
            transition into productive operation.
          </p>
        </div>
      </section>

      {/* Block 2 — How Projects Move into Operation (5-Step Timeline with HowTo schema) */}
      <section className="section">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-4">
            How Projects Move into Operation
          </h2>
          <p className="text-body text-brand-slate mb-8 max-w-2xl">
            A clear, step-by-step process that takes a project from initial assessment through to
            active operation.
          </p>

          {/* Desktop: horizontal timeline. Mobile: vertical stacked. */}
          <ol className="relative">
            {/* Connector line — desktop only */}
            <div
              className="hidden lg:block absolute top-5 left-5 right-5 h-0.5 bg-brand-earth"
              aria-hidden="true"
            />
            <div className="grid lg:grid-cols-5 gap-6">
              {howToSteps.map((step) => (
                <li key={step.position} className="flex lg:flex-col gap-4 lg:gap-3 relative">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-olive text-white flex items-center justify-center font-semibold text-sm z-10">
                    {step.position}
                  </div>
                  <div>
                    <h3 className="font-display text-base text-brand-ink mb-1">{step.name}</h3>
                    <p className="text-sm text-brand-slate">{step.text}</p>
                  </div>
                </li>
              ))}
            </div>
          </ol>
        </div>
      </section>

      {/* Block 3 — Understanding Project Scope (Interactive Tool) */}
      <section className="section bg-brand-fog">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-4">
            Understanding Project Scope
          </h2>
          <p className="text-body text-brand-ink max-w-2xl mb-8">
            Every project comes with different requirements. The type of property, its current
            condition and your objectives all shape what is needed to bring it into operation. By
            sharing a few key details, BBI can provide an initial view of the likely level of work
            involved, the areas where execution support may be needed and the type of project this
            most closely resembles.
          </p>
          {/*
           * Developer Note: Lightweight JavaScript only. No heavy framework dependency.
           * Output is content-based, not algorithmic scoring.
           * INP target: under 200ms — lightweight event listeners, no synchronous JS blocking.
           */}
          <ProjectScopeTool />
        </div>
      </section>

      {/* Block 4 — Execution Modules Grid */}
      <section className="section">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-8">Execution Modules</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Infrastructure and Land Development',
                body: 'Earthworks, drainage, access roads, perimeter infrastructure and site preparation for agricultural and real estate development projects.',
              },
              {
                title: 'Water and Irrigation Systems',
                body: 'Registered well drilling, drip and flood irrigation design and installation, water allocation compliance and irrigation maintenance frameworks.',
              },
              {
                title: 'Construction',
                body: 'On-site building construction: farm facilities, processing infrastructure, storage, residential and hospitality structures.',
              },
              {
                title: 'Farm Setup and Operations',
                body: 'Planting, equipment procurement, staff recruitment, SENASA registration, first-cycle production oversight and operational handover.',
              },
              {
                title: 'Technical and Regulatory',
                body: 'Provincial agricultural licensing, export compliance, environmental impact assessments, water rights registration and ongoing regulatory maintenance.',
              },
            ].map((mod) => (
              <div key={mod.title} className="card-asset">
                <h3 className="font-display text-lg text-brand-ink mb-2">{mod.title}</h3>
                <p className="text-body text-brand-slate">{mod.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Block 5 — Define Your Project Scope (Form) */}
      <section className="section bg-brand-limestone">
        <div className="container-site max-w-3xl">
          <h2 className="font-display text-display-sm text-brand-ink mb-4">
            Define Your Project Scope
          </h2>
          <p className="text-body text-brand-ink mb-8">
            BBI Argentina works with each buyer to define the scope, timeline and level of support
            required before providing project scope review and initial cost estimates. Every project is
            different — whether the aim is to develop raw land, transition a producing property or
            improve an existing operation.
          </p>

          <h3 className="font-display text-lg text-brand-ink mb-4">Information Requested</h3>
          <form action="/api/inquiries" method="POST" className="grid sm:grid-cols-2 gap-4 mb-8">
            <input type="hidden" name="inquiryType" value="execution-project-scope" />
            <div className="flex flex-col gap-1">
              <label htmlFor="ex-name" className="text-sm font-medium text-brand-ink">
                Full name
              </label>
              <input
                id="ex-name"
                name="fullName"
                type="text"
                required
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="ex-email" className="text-sm font-medium text-brand-ink">
                Email
              </label>
              <input
                id="ex-email"
                name="email"
                type="email"
                required
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="ex-type" className="text-sm font-medium text-brand-ink">
                Project type
              </label>
              <select
                id="ex-type"
                name="projectType"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">Select</option>
                <option>Vineyard</option>
                <option>Winery</option>
                <option>Pistachio Orchard</option>
                <option>Fruit Orchard</option>
                <option>Cattle Ranch</option>
                <option>Mixed Agriculture</option>
                <option>Real Estate</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="ex-location" className="text-sm font-medium text-brand-ink">
                Location (province or region)
              </label>
              <input
                id="ex-location"
                name="location"
                type="text"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="ex-area" className="text-sm font-medium text-brand-ink">
                Surface area (approx. hectares)
              </label>
              <input
                id="ex-area"
                name="surfaceArea"
                type="text"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="ex-budget" className="text-sm font-medium text-brand-ink">
                Investment range
              </label>
              <select
                id="ex-budget"
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
              <label htmlFor="ex-support" className="text-sm font-medium text-brand-ink">
                Level of support
              </label>
              <select
                id="ex-support"
                name="supportLevel"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">Select</option>
                <option>Advisory only</option>
                <option>Full execution</option>
                <option>Unsure — need advisory direction</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="ex-timeline" className="text-sm font-medium text-brand-ink">
                Timeline
              </label>
              <select
                id="ex-timeline"
                name="timeline"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">Select</option>
                <option>0–12 months</option>
                <option>12–24 months</option>
                <option>24+ months</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="ex-status" className="text-sm font-medium text-brand-ink">
                Current status of property
              </label>
              <select
                id="ex-status"
                name="currentStatus"
                className="border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive"
              >
                <option value="">Select</option>
                <option>Raw land</option>
                <option>Partially developed</option>
                <option>Operational</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <button type="submit" className="btn-primary">
                Request Project Scope and Pricing
              </button>
            </div>
          </form>

          <h3 className="font-display text-lg text-brand-ink mb-3">What Happens Next</h3>
          <ul className="list-disc list-inside space-y-2 text-body text-brand-slate pl-4">
            <li>
              The request is reviewed by BBI&apos;s team and aligned with relevant advisors and
              execution partners
            </li>
            <li>BBI responds with a defined project scope and a recommended execution approach</li>
            <li>An initial pricing framework is provided for the buyer&apos;s review</li>
          </ul>
        </div>
      </section>

      {/* Block 6 — FAQ */}
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
    </>
  )
}
