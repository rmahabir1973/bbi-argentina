'use client'

import { useState } from 'react'

interface ScopeSelection {
  propertyType: string
  currentStatus: string
  targetScale: string
  timeline: string
}

interface ScopeResult {
  complexity: string
  areas: string[]
  comparableProject: string
}

function getScopeResult(sel: ScopeSelection): ScopeResult | null {
  if (!sel.propertyType || !sel.currentStatus) return null

  const isRaw = sel.currentStatus === 'raw'
  const isPartial = sel.currentStatus === 'partial'
  const isOperational = sel.currentStatus === 'operational'
  const isLarge = sel.targetScale === 'large'
  const isMid = sel.targetScale === 'mid'

  // Vineyard / orchard on raw land — high complexity
  if (
    (sel.propertyType === 'Vineyard' || sel.propertyType === 'Pistachio Orchard' || sel.propertyType === 'Fruit Orchard') &&
    isRaw
  ) {
    return {
      complexity: 'High — full site development required',
      areas: [
        'Infrastructure and Land Development (earthworks, drainage, access roads)',
        'Water and Irrigation Systems (well registration, drip irrigation design and installation)',
        'Farm Setup and Operations (planting programme, SENASA registration, first-cycle oversight)',
        'Technical and Regulatory (water rights registration, provincial licensing)',
      ],
      comparableProject:
        'New vineyard development in the Uco Valley — typically 18–24 months from site preparation to first harvest operations.',
    }
  }

  // Vineyard / winery — partially developed
  if (
    (sel.propertyType === 'Vineyard' || sel.propertyType === 'Winery') &&
    isPartial
  ) {
    return {
      complexity: 'Moderate — completion and activation work required',
      areas: [
        'Water and Irrigation Systems (completion or upgrade of existing infrastructure)',
        'Construction (processing or storage infrastructure where incomplete)',
        'Farm Setup and Operations (operational activation, staff coordination)',
        'Technical and Regulatory (compliance verification and registration)',
      ],
      comparableProject:
        'Partially developed vineyard in Luján de Cuyo — activation and infrastructure completion typically 9–15 months.',
    }
  }

  // Vineyard / winery — operational
  if (
    (sel.propertyType === 'Vineyard' || sel.propertyType === 'Winery') &&
    isOperational
  ) {
    return {
      complexity: 'Low to moderate — transition and oversight support',
      areas: [
        'Farm Setup and Operations (team transition, supplier coordination)',
        'Technical and Regulatory (ongoing compliance and export documentation)',
      ],
      comparableProject:
        'Operational Malbec estate transition — handover and operational continuity typically managed within 3–6 months.',
    }
  }

  // Cattle ranch — raw or partial
  if (sel.propertyType === 'Cattle Ranch' && (isRaw || isPartial)) {
    return {
      complexity: isRaw ? 'High — land preparation and operational setup required' : 'Moderate — infrastructure completion required',
      areas: [
        'Infrastructure and Land Development (fencing, access, pasture preparation)',
        'Water and Irrigation Systems (water source registration and distribution)',
        'Farm Setup and Operations (livestock procurement, staff recruitment, SENASA registration)',
        'Technical and Regulatory (provincial livestock registration and compliance)',
      ],
      comparableProject:
        isLarge
          ? 'Large-scale Patagonia ranch development — typically 18–30 months to full operational capacity.'
          : 'Mid-scale ranch setup in Buenos Aires Province — typically 12–18 months.',
    }
  }

  // Cattle ranch — operational
  if (sel.propertyType === 'Cattle Ranch' && isOperational) {
    return {
      complexity: 'Low — transition and operational continuity support',
      areas: [
        'Farm Setup and Operations (staff transition, livestock operations handover)',
        'Technical and Regulatory (compliance review and ongoing registration)',
      ],
      comparableProject:
        'Operational ranch transition in Salta — operations handover typically 2–4 months.',
    }
  }

  // Mixed agriculture or real estate
  if (sel.propertyType === 'Mixed Agriculture' || sel.propertyType === 'Real Estate') {
    return {
      complexity: isRaw ? 'High — scope varies by intended use' : 'Moderate — depends on development stage',
      areas: [
        'Infrastructure and Land Development',
        'Water and Irrigation Systems (where applicable)',
        'Construction (as required by the intended development)',
        'Technical and Regulatory (zoning, environmental assessment, licensing)',
      ],
      comparableProject:
        'Scope and timeline for mixed or real estate projects are defined during the initial assessment phase. BBI Argentina provides a project-specific scope following the qualification process.',
    }
  }

  // Fallback
  return {
    complexity: 'To be assessed — project details reviewed after submission',
    areas: [
      'Infrastructure and Land Development',
      'Water and Irrigation Systems',
      'Farm Setup and Operations',
      'Technical and Regulatory',
    ],
    comparableProject:
      'BBI Argentina will provide a comparable project reference as part of the scoping response.',
  }
}

export function ProjectScopeTool() {
  const [selection, setSelection] = useState<ScopeSelection>({
    propertyType: '',
    currentStatus: '',
    targetScale: '',
    timeline: '',
  })

  const result = getScopeResult(selection)
  const inputsComplete = selection.propertyType && selection.currentStatus

  const fieldClass =
    'border border-brand-earth rounded px-3 py-2 text-brand-ink focus-visible:outline-2 focus-visible:outline-brand-olive w-full'

  return (
    <div className="max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {/* Property Type */}
        <div className="flex flex-col gap-1">
          <label htmlFor="scope-type" className="text-sm font-medium text-brand-ink">
            Property type
          </label>
          <select
            id="scope-type"
            value={selection.propertyType}
            onChange={(e) => setSelection((s) => ({ ...s, propertyType: e.target.value }))}
            className={fieldClass}
          >
            <option value="">Select property type</option>
            <option>Vineyard</option>
            <option>Winery</option>
            <option>Pistachio Orchard</option>
            <option>Fruit Orchard</option>
            <option>Cattle Ranch</option>
            <option>Mixed Agriculture</option>
            <option>Real Estate</option>
          </select>
        </div>

        {/* Current Status */}
        <div className="flex flex-col gap-1">
          <label htmlFor="scope-status" className="text-sm font-medium text-brand-ink">
            Current status
          </label>
          <select
            id="scope-status"
            value={selection.currentStatus}
            onChange={(e) => setSelection((s) => ({ ...s, currentStatus: e.target.value }))}
            className={fieldClass}
          >
            <option value="">Select current status</option>
            <option value="raw">Raw land</option>
            <option value="partial">Partially developed</option>
            <option value="operational">Operational</option>
          </select>
        </div>

        {/* Target Scale */}
        <div className="flex flex-col gap-1">
          <label htmlFor="scope-scale" className="text-sm font-medium text-brand-ink">
            Target scale
          </label>
          <select
            id="scope-scale"
            value={selection.targetScale}
            onChange={(e) => setSelection((s) => ({ ...s, targetScale: e.target.value }))}
            className={fieldClass}
          >
            <option value="">Select scale</option>
            <option value="small">Small (under 20 ha)</option>
            <option value="mid">Mid-scale (20–100 ha)</option>
            <option value="large">Large-scale (100+ ha)</option>
          </select>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-1">
          <label htmlFor="scope-timeline" className="text-sm font-medium text-brand-ink">
            Target timeline
          </label>
          <select
            id="scope-timeline"
            value={selection.timeline}
            onChange={(e) => setSelection((s) => ({ ...s, timeline: e.target.value }))}
            className={fieldClass}
          >
            <option value="">Select timeline</option>
            <option value="0-12">0–12 months</option>
            <option value="12-24">12–24 months</option>
            <option value="24+">24+ months</option>
          </select>
        </div>
      </div>

      {/* Output Panel */}
      {inputsComplete && result && (
        <div
          className="bg-brand-limestone border border-brand-earth rounded-lg p-6"
          aria-live="polite"
          aria-label="Project scope assessment"
        >
          <h3 className="font-display text-lg text-brand-ink mb-4">Initial Scope Assessment</h3>

          <div className="mb-4">
            <p className="text-sm font-medium text-brand-ink mb-1">Indicative complexity</p>
            <p className="text-body text-brand-slate">{result.complexity}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm font-medium text-brand-ink mb-2">Areas of execution support</p>
            <ul className="space-y-1">
              {result.areas.map((area) => (
                <li key={area} className="flex gap-2 text-sm text-brand-slate">
                  <span className="text-brand-olive mt-0.5 flex-shrink-0" aria-hidden="true">
                    —
                  </span>
                  {area}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-brand-ink mb-1">Comparable project</p>
            <p className="text-sm text-brand-slate">{result.comparableProject}</p>
          </div>

          <a href="#define-scope" className="btn-primary text-sm">
            Request Project Scope and Pricing
          </a>
        </div>
      )}

      {!inputsComplete && (
        <p className="text-sm text-brand-slate">
          Select a property type and current status to view an initial scope assessment.
        </p>
      )}
    </div>
  )
}
