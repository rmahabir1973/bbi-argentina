import type { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

const BASE_URL = 'https://www.bbiargentina.com'

const ASSET_CLASSES = ['vineyards-wineries', 'orchards', 'cattle-ranches'] as const

/**
 * Next.js 15 sitemap generator.
 * Static pages are declared inline. Dynamic asset pages are fetched from
 * Payload CMS. If the database is unavailable the dynamic section degrades
 * gracefully to an empty array - the static pages are always emitted.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: BASE_URL + '/investment-opportunities', lastModified: new Date(), changeFrequency: 'daily', priority: 0.95 },
    { url: BASE_URL + '/citizenship-residency-by-investment', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: BASE_URL + '/vineyards-wineries', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: BASE_URL + '/advisory', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: BASE_URL + '/execution', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: BASE_URL + '/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: BASE_URL + '/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
  // Dynamic asset pages - fetch from Payload CMS with graceful degradation
  let dynamicPages: MetadataRoute.Sitemap = []

  try {
    const { getPayload } = await import('payload')
    const config = (await import('@/payload.config')).default
    const payload = await getPayload({ config })

    const assetsResult = await payload.find({
      collection: 'assets',
      where: {
        published: { equals: true },
        operationalStatus: { not_equals: 'sold-off-market' },
      },
      depth: 1,
      limit: 1000,
      select: { slug: true, publishedAt: true, assetClass: true },
    })
    dynamicPages = assetsResult.docs.flatMap((asset) => {
      const assetClassSlug =
        typeof asset.assetClass === 'object' && asset.assetClass !== null
          ? (asset.assetClass as { slug?: string }).slug
          : undefined

      const isValidClass = assetClassSlug && ASSET_CLASSES.includes(assetClassSlug as (typeof ASSET_CLASSES)[number])
      if (!isValidClass) {
        return []
      }

      return [
        {
          url: BASE_URL + '/investment-opportunities/' + assetClassSlug + '/' + asset.slug,
          lastModified: asset.publishedAt ? new Date(asset.publishedAt as string) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.85,
        },
      ]
    })
  } catch {
    // Database unavailable at build time - static pages are sufficient for indexing.
  }

  return [...staticPages, ...dynamicPages]
}
