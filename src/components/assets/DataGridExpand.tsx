'use client'
import { useState } from 'react'

export interface SummaryFields {
  productiveArea?: string
  annualOutput?: string
  operationalStatus: string
}

export interface ExpandedFields {
  assetAge?: string
  density?: string
  waterRights?: string
  waterRightsStatus?: string
  regionalAdvantage?: string
  infrastructure?: string[]
}

interface DataGridExpandProps {
  summary: SummaryFields
  expanded: ExpandedFields
}

function WaterRightsIndicator({ status }: { status: string }) {
  if (status==="registered-confirmed") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-verified border border-brand-verified/40 flex-shrink-0" aria-hidden="true" />
        <span className="text-brand-verified font-medium">Registered — Confirmed</span>
      </span>
    )
  }
  if (status==="registered-pending") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-partial border border-brand-partial/40 flex-shrink-0" aria-hidden="true" />
        <span className="text-brand-partial font-medium">Registered — Pending Verification</span>
      </span>
    )
  }
  if (status==="unregistered") {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-raw border border-brand-raw/40 flex-shrink-0" aria-hidden="true" />
        <span className="text-brand-raw font-medium">Unregistered</span>
      </span>
    )
  }
  return <span className="text-brand-sage">Not Applicable</span>
}

function OperationalStatusBadge({ status }: { status: string }) {
  const lower = status.toLowerCase()
  if (lower==="fully-operational" || lower==="operational") {
    return <span className="status-pill-operational">{status}</span>
  }
  if (lower==="partial" || lower==="partially developed") {
    return <span className="status-pill-partial">{status}</span>
  }
  if (lower==="raw" || lower==="development land") {
    return <span className="status-pill-raw">{status}</span>
  }
  return <span className="status-pill bg-brand-fog border border-brand-slate text-brand-slate">{status}</span>
}

export function DataGridExpand({ summary, expanded }: DataGridExpandProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const expandedId = "asset-data-expanded"

  const hasExpandedContent =
    expanded.assetAge ||
    expanded.density ||
    expanded.waterRights ||
    expanded.waterRightsStatus ||
    expanded.regionalAdvantage ||
    (expanded.infrastructure && expanded.infrastructure.length > 0)

  return (
    <div className="space-y-4">
      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 rounded-card border border-brand-slate bg-white"
        aria-label="Asset summary data"
      >
        {summary.productiveArea && (
          <div className="data-cell">
            <span className="data-cell-label">Productive Area</span>
            <span className="data-cell-value"><strong>{summary.productiveArea}</strong></span>
          </div>
        )}
        {summary.annualOutput && (
          <div className="data-cell">
            <span className="data-cell-label">Annual Output</span>
            <span className="data-cell-value"><strong>{summary.annualOutput}</strong></span>
          </div>
        )}
        <div className="data-cell">
          <span className="data-cell-label">Operational Status</span>
          <div className="mt-0.5">
            <OperationalStatusBadge status={summary.operationalStatus} />
          </div>
        </div>
      </div>

      {hasExpandedContent ? (
        <>
          <button
            type="button"
            aria-expanded={isExpanded}
            aria-controls={expandedId}
            onClick={() => setIsExpanded((prev) => !prev)}
            className="inline-flex items-center gap-2 text-body-sm font-medium text-brand-olive hover:text-brand-earth transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-olive min-h-tap"
          >
            <svg
              aria-hidden="true"
              className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {isExpanded ? "Show less" : "Show full specifications"}
          </button>

          {isExpanded && (
            <div
              id={expandedId}
              role="region"
              aria-label="Full asset specifications"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 rounded-card border border-brand-slate bg-brand-fog"
            >
              {expanded.assetAge && (
                <div className="data-cell">
                  <span className="data-cell-label">Asset Age</span>
                  <span className="data-cell-value"><strong>{expanded.assetAge}</strong></span>
                </div>
              )}
              {expanded.density && (
                <div className="data-cell">
                  <span className="data-cell-label">Density</span>
                  <span className="data-cell-value"><strong>{expanded.density}</strong></span>
                </div>
              )}
              {(expanded.waterRights || expanded.waterRightsStatus) && (
                <div className="data-cell">
                  <span className="data-cell-label">Water Rights</span>
                  {expanded.waterRightsStatus && (
                    <div className="mt-0.5">
                      <WaterRightsIndicator status={expanded.waterRightsStatus} />
                    </div>
                  )}
                  {expanded.waterRights && (
                    <span className="text-body-sm text-brand-ink mt-0.5">{expanded.waterRights}</span>
                  )}
                </div>
              )}
              {expanded.regionalAdvantage && (
                <div className="data-cell sm:col-span-2">
                  <span className="data-cell-label">Regional Advantage</span>
                  <span className="text-body-sm text-brand-ink mt-0.5">{expanded.regionalAdvantage}</span>
                </div>
              )}
              {expanded.infrastructure && expanded.infrastructure.length > 0 && (
                <div className="data-cell sm:col-span-2">
                  <span className="data-cell-label">Infrastructure</span>
                  <ul className="mt-1 space-y-1" role="list">
                    {expanded.infrastructure.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-body-sm text-brand-ink">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-olive flex-shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}
