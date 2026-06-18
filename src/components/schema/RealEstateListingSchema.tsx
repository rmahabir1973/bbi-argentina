interface AdditionalProperty {
  name: string
  value: string | number
}

interface ServiceEntity {
  name: string
  url: string
  serviceType: string
  description: string
}

interface RealEstateListingSchemaProps {
  name: string
  description: string
  province: string
  region: string
  totalHectares: number
  assetUrl: string
  additionalProperties: AdditionalProperty[]
  advisoryService: ServiceEntity
  executionService: ServiceEntity
  operationalStatus: string
  waterRightsStatus?: string
  productionVolume?: string
}

/**
 * RealEstateListing JSON-LD schema for individual asset pages.
 *
 * The hasPart relationship linking assets to Advisory and Execution service entities
 * is the single most important schema implementation on the site.
 * It signals to AI agents that BBI does not list assets — it provides
 * full advisory and execution capability alongside each asset.
 */
export function RealEstateListingSchema({
  name,
  description,
  province,
  region,
  totalHectares,
  assetUrl,
  additionalProperties,
  advisoryService,
  executionService,
  operationalStatus,
  waterRightsStatus,
  productionVolume,
}: RealEstateListingSchemaProps) {
  const siteUrl = 'https://www.bbiargentina.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name,
    description,
    url: `${siteUrl}${assetUrl}`,
    address: {
      '@type': 'PostalAddress',
      addressRegion: region,
      addressLocality: province,
      addressCountry: 'AR',
    },
    // Production, water rights, operational metrics
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Total Hectares',
        value: totalHectares,
        unitCode: 'HAR',
      },
      {
        '@type': 'PropertyValue',
        name: 'Operational Status',
        value: operationalStatus,
      },
      ...(waterRightsStatus
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Water Rights Status',
              value: waterRightsStatus,
            },
          ]
        : []),
      ...(productionVolume
        ? [
            {
              '@type': 'PropertyValue',
              name: 'Annual Production',
              value: productionVolume,
            },
          ]
        : []),
      ...additionalProperties.map((prop) => ({
        '@type': 'PropertyValue',
        name: prop.name,
        value: prop.value,
      })),
    ],
    // Provider — links to global Organization entity
    provider: {
      '@type': 'Organization',
      name: 'BBI Argentina',
      url: siteUrl,
      description:
        'BBI Argentina is a full-cycle investment platform specialising in productive asset acquisition, advisory and execution across Argentina.',
    },
    // hasPart — THE CRITICAL RELATIONSHIP
    // Links this asset to BBI's Advisory and Execution service entities.
    // This is what allows AI agents to understand BBI is a full-service platform,
    // not a listing service.
    hasPart: [
      {
        '@type': 'Service',
        name: advisoryService.name,
        url: `${siteUrl}${advisoryService.url}`,
        serviceType: advisoryService.serviceType,
        description: advisoryService.description,
        provider: {
          '@type': 'Organization',
          name: 'BBI Argentina',
          url: siteUrl,
        },
      },
      {
        '@type': 'Service',
        name: executionService.name,
        url: `${siteUrl}${executionService.url}`,
        serviceType: executionService.serviceType,
        description: executionService.description,
        provider: {
          '@type': 'Organization',
          name: 'BBI Argentina',
          url: siteUrl,
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
