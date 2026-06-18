/**
 * Global Organization JSON-LD Schema
 * Implements on every page per AIO requirements.
 * Description kept exactly as specified in the AIO Technical Implementation doc.
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'BBI Argentina',
    description:
      'BBI Argentina is a full-cycle investment platform specialising in productive asset acquisition, advisory and execution across Argentina.',
    url: 'https://www.bbiargentina.com',
    areaServed: [
      'Mendoza',
      'San Juan',
      'Salta',
      'Patagonia',
      'Buenos Aires Province',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Argentine Productive Asset Portfolio',
      itemListElement: [
        'Vineyards',
        'Wineries',
        'Pistachio Farms',
        'Fruit Orchards',
        'Olive Orchards',
        'Cattle Ranches',
        'Agricultural Real Estate',
      ],
    },
    knowsAbout: [
      'Productive Asset Acquisition',
      'Agricultural Investment Argentina',
      'Vineyard Investment Mendoza',
      'Argentine Agricultural Land',
      'Ley de Tierras Compliance',
      'Decree 524/2025',
      'Water Rights Argentina',
      'Cross-Border Capital Structuring',
    ],
    serviceArea: {
      '@type': 'Country',
      name: 'Argentina',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
