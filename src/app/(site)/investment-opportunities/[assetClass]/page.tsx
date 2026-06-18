import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema'
import { AssetCard } from '@/components/assets/AssetCard'

const VALID_CLASSES = ['vineyards-wineries', 'orchards', 'cattle-ranches'] as const
type AssetClassSlug = typeof VALID_CLASSES[number]

const CLASS_META: Record<AssetClassSlug, { h1: string; description: string; assetType: string }> = {
  'vineyards-wineries': {
    h1: 'Vineyards and Wineries',
    description: 'BBI Argentina presents off-market vineyard and winery opportunities across Mendoza and Patagonia. Verified productive assets for qualified international buyers.',
    assetType: 'Vineyard / Winery',
  },
  'orchards': {
    h1: 'Orchards and Permanent Crops',
    description: 'BBI Argentina presents off-market orchard and permanent crop opportunities across San Juan and Mendoza. Pistachio, olive and stone fruit operations for qualified buyers.',
    assetType: 'Orchard',
  },
  'cattle-ranches': {
    h1: 'Cattle Ranches',
    description: 'BBI Argentina presents off-market cattle ranch opportunities across Patagonia, Salta and Buenos Aires Province. Operational estancias and development land for qualified buyers.',
    assetType: 'Cattle Ranch',
  },
}
export async function generateMetadata(
  { params }: { params: Promise<{ assetClass: string }> }
): Promise<Metadata> {
  const { assetClass } = await params
  if (!VALID_CLASSES.includes(assetClass as AssetClassSlug)) return {}
  const meta = CLASS_META[assetClass as AssetClassSlug]
  return {
    title: `${meta.h1} | BBI Argentina`,
    description: meta.description,
    other: { 'bbi:asset-class': assetClass },
  }
}

export const dynamic = 'force-dynamic'

export default async function AssetClassPage(
  { params }: { params: Promise<{ assetClass: string }> }
) {
  const { assetClass } = await params
  if (!VALID_CLASSES.includes(assetClass as AssetClassSlug)) notFound()
  const meta = CLASS_META[assetClass as AssetClassSlug]

  let assets: any[] = []
  try {
    const payload = await getPayload({ config: payloadConfig })
    const result = await payload.find({
      collection: 'assets',
      where: { published: { equals: true } },
      limit: 50,
    })
    assets = result.docs
  } catch (e) {
    assets = []
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Investment Opportunities', url: '/investment-opportunities' },
          { name: meta.h1, url: `/investment-opportunities/${assetClass}` },
        ]}
      />
      <section className="section bg-brand-limestone">
        <div className="container-site">
          <h1 className="font-display text-display-lg text-brand-ink mb-4">
            {meta.h1}
          </h1>
          <p className="text-xl text-brand-slate mb-6 max-w-3xl">
            BBI Argentina presents off-market {meta.assetType.toLowerCase()} opportunities
            across Argentina for qualified international buyers.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container-site">
          {assets.length === 0 ? (
            <div className="card-asset p-8 text-center">
              <p className="text-body text-brand-slate mb-4">
                BBI Argentina is actively expanding its {meta.assetType.toLowerCase()} portfolio.
                Submit your investment criteria to be notified when a matching asset becomes available.
              </p>
              <Link href="/contact?type=criteria-submission" className="btn-primary">
                Submit Investment Criteria
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assets.map((asset: any) => (
                <AssetCard
                  key={asset.id}
                  title={asset.title}
                  slug={asset.slug}
                  assetClass={assetClass}
                  assetType={(typeof asset.assetClass === 'object' ? asset.assetClass?.name || '' : '') || meta.assetType}
                  province={typeof asset.province === 'object' ? asset.province?.name || '' : asset.province || ''}
                  region={asset.region || ''}
                  totalHectares={asset.totalHectares || 0}
                  operationalStatus={asset.operationalStatus || ''}
                  strategicTags={asset.strategicRationaleTags || []}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
