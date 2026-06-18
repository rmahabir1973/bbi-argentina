import Link from "next/link"

interface AssetCardProps {
  title: string
  slug: string
  assetClass: string
  assetType: string
  province: string
  region: string
  totalHectares: number
  operationalStatus: string
  strategicTags: string[]
  primaryMetric?: string
  primaryMetricLabel?: string
}
function StatusBadge({ status }: { status: string }) {
  const lower = status.toLowerCase()
  if (lower === 'fully-operational' || lower === 'operational') {
    return <span className="status-pill-operational">{status}</span>
  }
  if (lower === 'partial' || lower === 'partially developed') {
    return <span className="status-pill-partial">{status}</span>
  }
  if (lower === 'raw' || lower === 'development land') {
    return <span className="status-pill-raw">{status}</span>
  }
  return <span className="status-pill bg-brand-fog border border-brand-slate text-brand-slate">{status}</span>
}

export function AssetCard({
  title, slug, assetClass, assetType, province, region, totalHectares,
  operationalStatus, strategicTags, primaryMetric, primaryMetricLabel,
}: AssetCardProps) {
  const href = `/investment-opportunities/${assetClass}/${slug}`
  const firstTag = strategicTags[0]
  return (
    <article
      className="card-asset p-6 flex flex-col gap-4"
      aria-label={`Asset: ${title}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-lg text-brand-ink leading-tight">
            {title}
          </h2>
          <p className="text-body-sm text-brand-slate mt-1">
            {assetType} · <strong>{province}</strong>, <strong>{region}</strong>
          </p>
        </div>
        <StatusBadge status={operationalStatus} />
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-1">
        {firstTag && (
          <span className="tag-strategic">{firstTag}</span>
        )}
        <span className="text-label text-brand-slate">
          <strong>{totalHectares}</strong> ha total
        </span>
      </div>

      {primaryMetric && primaryMetricLabel && (
        <div className="border-t border-brand-fog pt-3">
          <p className="text-label text-brand-sage uppercase tracking-wider mb-0.5">{primaryMetricLabel}</p>
          <p className="text-body-md font-medium text-brand-earth"><strong>{primaryMetric}</strong></p>
        </div>
      )}
      <div className="mt-auto pt-3 border-t border-brand-fog">
        <Link
          href={href}
          className="btn-primary w-full justify-center"
          aria-label={`View details for ${title}`}
        >
          View Asset Details
        </Link>
      </div>
    </article>
  )
}
