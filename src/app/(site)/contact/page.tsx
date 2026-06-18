import type { Metadata } from 'next'
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact BBI Argentina | Investor Inquiries',
  description:
    'Contact BBI Argentina to initiate an investment inquiry, request advisory services or submit specific investment criteria for off-market asset matching.',
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact BBI Argentina',
  description:
    'Contact BBI Argentina to initiate an investment inquiry, request advisory services or submit specific investment criteria for off-market asset matching.',
  mainEntity: {
    '@type': 'LocalBusiness',
    name: 'BBI Argentina',
    url: 'https://www.bbiargentina.com',
    description:
      'BBI Argentina is a full-cycle investment platform specialising in productive asset acquisition, advisory and execution across Argentina.',
    areaServed: ['Mendoza', 'San Juan', 'Salta', 'Patagonia', 'Buenos Aires Province'],
  },
}

const operationalProvinces = [
  { name: 'Mendoza', note: 'Vineyards, Wineries, Orchards' },
  { name: 'San Juan', note: 'Pistachio and Fruit Orchards' },
  { name: 'Salta', note: 'Agriculture, Cattle' },
  { name: 'Patagonia', note: 'Cattle Ranches, Land' },
  { name: 'Buenos Aires Province', note: 'Agricultural Real Estate' },
]

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://www.bbiargentina.com' },
          { name: 'Contact', url: 'https://www.bbiargentina.com/contact' },
        ]}
      />

      {/* Block 1 — Hero */}
      <section className="section bg-brand-limestone">
        <div className="container-site">
          <h1 className="font-display text-display-lg text-brand-ink mb-4">
            Contact BBI Argentina
          </h1>
          <p className="text-xl text-brand-slate mb-4 max-w-xl">
            Get in touch with the right team.
          </p>
          <p className="text-body text-brand-ink max-w-2xl">
            BBI Argentina responds to inquiries relating to investment opportunities, advisory
            support, execution planning and residency-aligned acquisitions. Select the type of
            inquiry below so your message can be directed to the appropriate team.
          </p>
        </div>
      </section>

      {/* Block 2 — Inquiry Routing Form */}
      <section className="section">
        <div className="container-site max-w-2xl">
          <h2 className="font-display text-display-sm text-brand-ink mb-6">
            Select Your Inquiry Type
          </h2>
          {/*
           * ContactForm is a 'use client' component — renders conditional fields
           * based on inquiry type selection. Lightweight JS, no framework.
           * Form action posts to /api/inquiries Server Action in Checkpoint 6.
           */}
          <ContactForm />
          <p className="text-sm text-brand-slate mt-6">
            BBI Argentina treats all preliminary discussions with discretion and confidentiality.
            We aim to respond to qualified inquiries within{' '}
            <strong>24 hours</strong>.
          </p>
        </div>
      </section>

      {/* Block 3 — Operational Presence */}
      <section className="section bg-brand-fog">
        <div className="container-site">
          <h2 className="font-display text-display-sm text-brand-ink mb-6">
            BBI Argentina&apos;s Operational Presence
          </h2>
          <p className="text-body text-brand-ink mb-8 max-w-2xl">
            BBI Argentina&apos;s origination and advisory network covers five provinces:{' '}
            <strong>Mendoza</strong>, <strong>San Juan</strong>, <strong>Salta</strong>,{' '}
            <strong>Patagonia</strong> and <strong>Buenos Aires Province</strong>. Our on-the-ground
            presence is the operational foundation of our full-cycle model.
          </p>
          {/*
           * Developer Note: Stylised map of Argentina highlighting the five operational provinces.
           * Visual orientation only. Static visual — no click interactions required.
           * Placeholder map replaced by SVG/image in Checkpoint 8.
           */}
          <div
            className="bg-brand-limestone border border-brand-earth rounded-lg p-8 max-w-lg"
            aria-label="Map of BBI Argentina's operational provinces"
            role="img"
          >
            <p className="text-sm text-brand-slate mb-4 italic">
              Argentina province map — static visual implemented in Checkpoint 8.
            </p>
            <ul className="space-y-3">
              {operationalProvinces.map((p) => (
                <li key={p.name} className="flex items-center gap-3">
                  <span
                    className="w-3 h-3 rounded-full bg-brand-olive flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-medium text-brand-ink text-sm">{p.name}</span>
                  <span className="text-brand-slate text-sm">— {p.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
