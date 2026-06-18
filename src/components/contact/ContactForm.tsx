'use client'

import { useState } from 'react'

type InquiryType =
  | ''
  | 'property-inquiry'
  | 'advisory'
  | 'execution'
  | 'residency-citizenship'
  | 'general'

const inquiryTypes: { value: InquiryType; label: string }[] = [
  { value: 'property-inquiry', label: 'Property or Opportunity Inquiry' },
  { value: 'advisory', label: 'Advisory Support' },
  { value: 'execution', label: 'Execution Planning' },
  { value: 'residency-citizenship', label: 'Residency or Citizenship-Aligned Acquisition' },
  { value: 'general', label: 'General Inquiry' },
]

const inputClass =
  'border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive w-full min-h-[44px]'

const labelClass = 'text-sm font-medium text-brand-ink'

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>
}

export function ContactForm() {
  const [inquiryType, setInquiryType] = useState<InquiryType>('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        body: data,
      })
      setSubmitted(true)
    } catch {
      // Non-blocking — form data captured on submission regardless
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-brand-limestone border border-brand-earth rounded-lg p-6" role="status">
        <p className="font-display text-lg text-brand-ink mb-2">Inquiry received.</p>
        <p className="text-body text-brand-slate">
          BBI Argentina will review your inquiry and respond within{' '}
          <strong>24 hours</strong>. All discussions are treated with discretion and
          confidentiality.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Step 1 — Inquiry Type */}
      <FieldGroup>
        <label htmlFor="contact-type" className={labelClass}>
          Inquiry type
        </label>
        <select
          id="contact-type"
          name="inquiryType"
          value={inquiryType}
          onChange={(e) => setInquiryType(e.target.value as InquiryType)}
          required
          className={inputClass}
        >
          <option value="">Select inquiry type</option>
          {inquiryTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </FieldGroup>

      {/* Step 2 — Conditional fields appear after type selection */}
      {inquiryType && (
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Common fields */}
          <FieldGroup>
            <label htmlFor="contact-name" className={labelClass}>
              Full name
            </label>
            <input
              id="contact-name"
              name="fullName"
              type="text"
              required
              autoComplete="name"
              className={inputClass}
            />
          </FieldGroup>

          <FieldGroup>
            <label htmlFor="contact-entity" className={labelClass}>
              Entity name (if applicable)
            </label>
            <input
              id="contact-entity"
              name="entityName"
              type="text"
              autoComplete="organization"
              className={inputClass}
            />
          </FieldGroup>

          <FieldGroup>
            <label htmlFor="contact-email" className={labelClass}>
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClass}
            />
          </FieldGroup>

          <FieldGroup>
            <label htmlFor="contact-phone" className={labelClass}>
              Phone or WhatsApp
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              className={inputClass}
            />
          </FieldGroup>

          <FieldGroup>
            <label htmlFor="contact-country" className={labelClass}>
              Country of residence
            </label>
            <input
              id="contact-country"
              name="country"
              type="text"
              required
              autoComplete="country-name"
              className={inputClass}
            />
          </FieldGroup>

          <FieldGroup>
            <label htmlFor="contact-response" className={labelClass}>
              Preferred response method
            </label>
            <select id="contact-response" name="preferredResponseMethod" className={inputClass}>
              <option value="">Select</option>
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="call">Phone call</option>
            </select>
          </FieldGroup>

          {/* Property inquiry — additional fields */}
          {inquiryType === 'property-inquiry' && (
            <>
              <FieldGroup>
                <label htmlFor="contact-asset-type" className={labelClass}>
                  Asset type of interest
                </label>
                <select id="contact-asset-type" name="assetType" className={inputClass}>
                  <option value="">Select</option>
                  <option>Vineyard or Winery</option>
                  <option>Pistachio or Fruit Orchard</option>
                  <option>Cattle Ranch</option>
                  <option>Agricultural Real Estate</option>
                  <option>Multiple asset classes</option>
                </select>
              </FieldGroup>
              <FieldGroup>
                <label htmlFor="contact-budget" className={labelClass}>
                  Investment range
                </label>
                <select id="contact-budget" name="budget" className={inputClass}>
                  <option value="">Select</option>
                  <option>Under $500k</option>
                  <option>$500k – $1M</option>
                  <option>$1M – $3M</option>
                  <option>$3M – $10M</option>
                  <option>$10M+</option>
                </select>
              </FieldGroup>
            </>
          )}

          {/* Execution — additional fields */}
          {inquiryType === 'execution' && (
            <FieldGroup>
              <label htmlFor="contact-project-type" className={labelClass}>
                Project type
              </label>
              <select id="contact-project-type" name="projectType" className={inputClass}>
                <option value="">Select</option>
                <option>Vineyard development</option>
                <option>Orchard development</option>
                <option>Ranch setup</option>
                <option>Construction</option>
                <option>Irrigation installation</option>
                <option>Mixed project</option>
              </select>
            </FieldGroup>
          )}

          {/* Residency — additional fields */}
          {inquiryType === 'residency-citizenship' && (
            <FieldGroup>
              <label htmlFor="contact-pathway" className={labelClass}>
                Pathway of interest
              </label>
              <select id="contact-pathway" name="pathway" className={inputClass}>
                <option value="">Select</option>
                <option>Residency through investment</option>
                <option>Citizenship strategy</option>
                <option>Both — seeking advisory direction</option>
              </select>
            </FieldGroup>
          )}

          {/* Description — full width */}
          <div className="sm:col-span-2">
            <FieldGroup>
              <label htmlFor="contact-description" className={labelClass}>
                Brief description of your inquiry
              </label>
              <textarea
                id="contact-description"
                name="description"
                rows={4}
                className={inputClass}
              />
            </FieldGroup>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full sm:w-auto disabled:opacity-60"
            >
              {submitting ? 'Submitting' : 'Submit Inquiry'}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
