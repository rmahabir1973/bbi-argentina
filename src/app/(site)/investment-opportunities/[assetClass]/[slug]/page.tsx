import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { BreadcrumbSchema } from '@/components/schema/BreadcrumbSchema'
import { RealEstateListingSchema } from '@/components/schema/RealEstateListingSchema'
import { DataGridExpand } from '@/components/assets/DataGridExpand'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface AssetData {
  id: string
  title: string
  slug: string
  assetClass: string
  assetType: string
  province: string
  region: string
  totalHectares: number
  operationalStatus: string
  status: string
  shortDescription: string
  strategicTags: string[]
  productiveArea?: string
  annualOutput?: string
  assetAge?: string
  density?: string
  waterRights?: string
  waterRightsStatus?: string
  regionalAdvantage?: string
  infrastructure?: string[]
  dueDiligenceSummary?: string
  advisoryModule?: string
  executionModule?: string
  productionVolume?: string
}

async function getAsset(assetClass: string, slug: string): Promise<AssetData | null> {
  try {
    const payload = await getPayload({ config: payloadConfig })
    const result = await payload.find({
      collection: 'assets',
      where: {
        and: [
          { slug: { equals: slug } },
          { published: { equals: true } },
        ],
      },
      limit: 1,
    })
    if (!result.docs.length) return null
    const doc = result.docs[0] as any
    const provinceVal = typeof doc.province === 'object' ? doc.province?.name || '' : doc.province || ''
    const waterStatus = doc.expandedView?.waterRightsStatus || ''
    const infra: string[] = (doc.expandedView?.infrastructure || []).map((i: any) => i.item || '').filter(Boolean)
    return {
      id: String(doc.id),
      title: doc.title || '',
      slug: doc.slug || '',
      assetClass,
      assetType: (typeof doc.assetClass === 'object' ? doc.assetClass?.name || doc.assetClass?.slug || '' : String(doc.assetClass || '')) || '',
      province: provinceVal,
      region: doc.region || '',
      totalHectares: doc.totalHectares || 0,
      operationalStatus: doc.operationalStatus || '',
      status: doc.operationalStatus === 'sold-off-market' ? 'sold' : 'active',
      shortDescription: doc.entityDeclaration || doc.title || '',
      strategicTags: doc.strategicRationaleTags || [],
      productiveArea: doc.summaryView?.productiveArea ? String(doc.summaryView.productiveArea) + ' ha' : undefined,
      annualOutput: doc.summaryView?.annualOutput,
      assetAge: doc.expandedView?.assetAge,
      density: doc.expandedView?.density,
      waterRights: doc.expandedView?.waterRightsDetail,
      waterRightsStatus: waterStatus || undefined,
      regionalAdvantage: doc.expandedView?.regionalAdvantage,
      infrastructure: infra.length ? infra : undefined,
      advisoryModule: doc.advisoryModule?.title || 'Advisory',
      executionModule: doc.executionModule?.title || 'Execution',
      productionVolume: doc.summaryView?.annualOutput,
    }
  } catch {
    return null
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ assetClass: string; slug: string }> }
): Promise<Metadata> {
  const { assetClass, slug } = await params
  const asset = await getAsset(assetClass, slug)
  if (!asset) return {}
  return {
    title: `${asset.assetType} ${asset.region} ${asset.totalHectares}ha | BBI Argentina`,
    description: `${asset.assetType} in ${asset.region}, ${asset.province}. ${asset.totalHectares}ha. ${asset.operationalStatus}. Available to verified buyers through BBI Argentina.`,
    other: {
      'bbi:asset-type': asset.assetType,
      'bbi:operational-status': asset.operationalStatus,
    },
  }
}

export default async function AssetPage(
  { params }: { params: Promise<{ assetClass: string; slug: string }> }
) {
  const { assetClass, slug } = await params
  const asset = await getAsset(assetClass, slug)
  if (!asset) return notFound()

  if (asset.status === 'sold' || asset.status === 'off-market') {
    redirect(`/investment-opportunities/${assetClass}`)
  }

  const assetUrl = `/investment-opportunities/${assetClass}/${slug}`
  const advisoryUrl = '/advisory'
  const executionUrl = '/execution'

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Investment Opportunities', url: '/investment-opportunities' },
          { name: asset.assetType, url: `/investment-opportunities/${assetClass}` },
          { name: asset.title, url: assetUrl },
        ]}
      />
      <RealEstateListingSchema
        name={asset.title}
        description={asset.shortDescription}
        province={asset.province}
        region={asset.region}
        totalHectares={asset.totalHectares}
        assetUrl={assetUrl}
        additionalProperties={[]}
        operationalStatus={asset.operationalStatus}
        waterRightsStatus={asset.waterRightsStatus}
        productionVolume={asset.productionVolume}
        advisoryService={{
          name: 'BBI Argentina Advisory',
          url: advisoryUrl,
          serviceType: 'Advisory',
          description: 'BBI Argentina Advisory provides full investment advisory services for productive asset acquisition in Argentina.',
        }}
        executionService={{
          name: 'BBI Argentina Execution',
          url: executionUrl,
          serviceType: 'Execution',
          description: 'BBI Argentina Execution provides end-to-end transaction and operational execution for productive asset acquisitions in Argentina.',
        }}
      />
      {/* Block 1 - H1 */}
      <section className="section bg-brand-limestone">
        <div className="container-site">
          <h1 className="font-display text-display-lg text-brand-earth mb-3">
            {asset.title}
          </h1>

          {/* Block 2 - Entity Declaration */}
          <h2 className="font-display text-display-sm text-brand-ink mb-6 max-w-4xl">
            {asset.shortDescription}
          </h2>

          {/* Block 3 - Strategic Rationale Tags */}
          {asset.strategicTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6" aria-label="Strategic rationale tags">
              {asset.strategicTags.map((tag) => (
                <span key={tag} className="tag-strategic">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </section>
      {/* Block 4 - Core Data Grid with Progressive Disclosure */}
      <section className="section-sm">
        <div className="container-site">
          <DataGridExpand
            summary={{
              productiveArea: asset.productiveArea,
              annualOutput: asset.annualOutput,
              operationalStatus: asset.operationalStatus,
            }}
            expanded={{
              assetAge: asset.assetAge,
              density: asset.density,
              waterRights: asset.waterRights,
              waterRightsStatus: asset.waterRightsStatus,
              regionalAdvantage: asset.regionalAdvantage,
              infrastructure: asset.infrastructure,
            }}
          />
        </div>
      </section>
      {/* Block 5 - Due Diligence Snapshot */}
      <section className="section-sm">
        <div className="container-site">
          <div className="dd-snapshot">
            <h3 className="font-display text-display-sm text-brand-ink mb-3">Due Diligence Snapshot</h3>
            {asset.dueDiligenceSummary && (
              <p className="text-body text-brand-ink mb-4">{asset.dueDiligenceSummary}</p>
            )}
            <p className="text-body text-brand-ink mb-3">
              Full financial documentation, due diligence materials and the private Information
              Memorandum are available to verified buyers.
            </p>
            <p className="text-body-sm text-brand-sage">
              <strong>Qualification:</strong> identity verification, NDA and
              Buyer's Representation Agreement.
            </p>
          </div>
        </div>
      </section>
      {/* Block 6 - Dual CTA */}
      <section className="section-sm">
        <div className="container-site">
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/contact?type=property-inquiry&asset=${slug}`}
              className="btn-primary"
            >
              Initiate Qualification Process
            </Link>
            <Link
              href="/contact?type=advisory"
              className="btn-secondary"
            >
              Inquire with an Advisor
            </Link>
          </div>
        </div>
      </section>
      {/* Block 7 - Platform Integration Footer */}
      <section className="section-sm bg-brand-ink">
        <div className="container-site">
          <div className="py-8">
            <p className="text-body text-brand-fog mb-3">
              This asset is supported by BBI Argentina's{` `}
              <strong className="text-brand-straw">{asset.advisoryModule || 'Advisory'}</strong>
              {` `}and{` `}
              <strong className="text-brand-straw">{asset.executionModule || 'Execution'}</strong>
              {` `}platform layers.
            </p>
            <p className="text-body-sm text-brand-fog/80 mb-5">
              Advisory scope and Execution pricing available upon buyer qualification.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/advisory" className="text-brand-straw underline text-body-sm">Advisory Services</Link>
              <Link href="/execution" className="text-brand-straw underline text-body-sm">Execution Services</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
