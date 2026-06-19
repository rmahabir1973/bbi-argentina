import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

/**
 * Assets Collection
 *
 * The primary data model for all productive asset listings.
 * Access control: gated fields (financials, IM, full due diligence)
 * are readable only by users with role 'verified-buyer'.
 * Public reads return only public fields.
 */
export const Assets: CollectionConfig = {
  slug: 'assets',
  admin: {
    useAsTitle: 'title',
    group: 'Asset Data',
    description: 'All productive asset listings. Gated fields require verified-buyer role.',
    defaultColumns: ['title', 'assetClass', 'province', 'operationalStatus', 'published'],
  },

  // ─── Access Control ──────────────────────────────────────────────────────────
  access: {
    // Public reads return only published, non-gated fields
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    delete: ({ req }) => req.user?.role === 'admin',
  },

  fields: [
    // ── Core Identity ─────────────────────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'H1 format: [Asset Type] – [Region] – [Hectares] – [Status]. e.g. Malbec Vineyard – Uco Valley – 48ha – Fully Operational',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug. Format: [asset-type]-[region]-[key-identifier]. Lowercase, hyphens. Used in /investment-opportunities/[asset-class]/[slug]',
      },
    },
    {
      name: 'assetClass',
      type: 'relationship',
      relationTo: 'asset-classes',
      required: true,
    },
    {
      name: 'province',
      type: 'relationship',
      relationTo: 'provinces',
      required: true,
    },
    {
      name: 'region',
      type: 'text',
      required: true,
      admin: {
        description: 'Sub-regional designation. e.g. Uco Valley, Luján de Cuyo, Valle de Tulum',
      },
    },
    {
      name: 'totalHectares',
      type: 'number',
      required: true,
      admin: {
        description: 'Total property area in hectares. Bold in copy.',
      },
    },
    {
      name: 'operationalStatus',
      type: 'select',
      required: true,
      options: [
        { label: 'Raw', value: 'raw' },
        { label: 'Partial', value: 'partial' },
        { label: 'Fully Operational', value: 'fully-operational' },
        { label: 'Sold / Off-Market', value: 'sold-off-market' },
      ],
      admin: {
        description: 'Sold/Off-Market: asset removed from listings and 301-redirected to category page. Never 404.',
      },
    },
    {
      name: 'strategicRationaleTags',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Yield-Focused', value: 'yield-focused' },
        { label: 'Long-Term Value', value: 'long-term-value' },
        { label: 'Vertical Integration', value: 'vertical-integration' },
        { label: 'Land Appreciation', value: 'land-appreciation' },
        { label: 'Production Continuity', value: 'production-continuity' },
      ],
    },

    // ── Entity Declaration (AIO-Required) ─────────────────────────────────────
    {
      name: 'entityDeclaration',
      type: 'text',
      required: true,
      admin: {
        description: 'AIO entity declaration H2. Format: "BBI Argentina presents [asset description] — an off-market [asset type] in [province/region]."',
      },
    },

    // ── Summary View (default data grid) ─────────────────────────────────────
    {
      name: 'summaryView',
      type: 'group',
      label: 'Summary View (Default Grid)',
      fields: [
        {
          name: 'productiveArea',
          type: 'number',
          admin: {
            description: 'Planted/productive area in hectares',
          },
        },
        {
          name: 'productiveAreaUnit',
          type: 'select',
          defaultValue: 'hectares',
          options: [
            { label: 'Hectares', value: 'hectares' },
            { label: 'Acres', value: 'acres' },
          ],
        },
        {
          name: 'annualOutput',
          type: 'text',
          admin: {
            description: 'e.g. 180,000 kg / 15,000 cases / 2,400 head carrying capacity',
          },
        },
        {
          name: 'annualOutputUnit',
          type: 'text',
          admin: {
            description: 'e.g. kg/year, cases/year, head capacity',
          },
        },
      ],
    },

    // ── Expanded View (progressive disclosure) ────────────────────────────────
    {
      name: 'expandedView',
      type: 'group',
      label: 'Expanded View (Progressive Disclosure)',
      fields: [
        {
          name: 'assetAge',
          type: 'text',
          admin: {
            description: 'e.g. Vine age 12–18 years / Orchard established 2009',
          },
        },
        {
          name: 'density',
          type: 'text',
          admin: {
            description: 'e.g. 5,500 vines/ha / 833 trees/ha',
          },
        },
        {
          name: 'waterRightsStatus',
          type: 'select',
          options: [
            { label: 'Registered — Confirmed', value: 'registered-confirmed' },
            { label: 'Registered — Pending Verification', value: 'registered-pending' },
            { label: 'Unregistered', value: 'unregistered' },
            { label: 'Not Applicable', value: 'not-applicable' },
          ],
        },
        {
          name: 'waterRightsDetail',
          type: 'text',
          admin: {
            description: 'e.g. 2 registered drip irrigation wells, provincial allocation confirmed',
          },
        },
        {
          name: 'regionalAdvantage',
          type: 'textarea',
          admin: {
            description: 'One sentence, commercially grounded. e.g. Northern slope exposure. Sun hours per day consistently above regional averages.',
          },
        },
        {
          name: 'infrastructure',
          type: 'array',
          label: 'Infrastructure Inventory',
          fields: [
            {
              name: 'item',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },

    // ── Class-Specific Block Variants ─────────────────────────────────────────
    {
      name: 'vineyardWineryData',
      type: 'group',
      label: 'Vineyard and Winery Data',
      admin: {
        condition: (data) => {
          // Show only when assetClass is vineyard-winery
          return true
        },
      },
      fields: [
        {
          name: 'plantedArea',
          type: 'number',
          admin: { description: 'Planted area in hectares' },
        },
        {
          name: 'varietalMix',
          type: 'array',
          fields: [
            { name: 'varietal', type: 'text', required: true },
            { name: 'hectares', type: 'number' },
            { name: 'percentage', type: 'number' },
          ],
        },
        {
          name: 'vineAge',
          type: 'text',
          admin: { description: 'e.g. 12–18 years. Bold in copy.' },
        },
        {
          name: 'annualYieldKg',
          type: 'number',
          admin: { description: 'Annual production in kg. Bold in copy.' },
        },
        {
          name: 'annualCases',
          type: 'number',
          admin: { description: 'Annual case production if winery included' },
        },
        {
          name: 'wineryIncluded',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'wineryDetail',
          type: 'text',
          admin: { description: 'Crush pad, bottling line, storage capacity etc.' },
        },
        {
          name: 'brandIncluded',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'exportRelationships',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'existingTeam',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'commercialContext',
          type: 'textarea',
          admin: { description: 'One sentence, commercially grounded spatial/commercial context.' },
        },
      ],
    },
    {
      name: 'orchardData',
      type: 'group',
      label: 'Orchard Data',
      fields: [
        {
          name: 'cropType',
          type: 'text',
          admin: { description: 'e.g. Pistachio, Olive, Stone Fruit, Citrus' },
        },
        {
          name: 'plantedArea',
          type: 'number',
        },
        {
          name: 'treeAge',
          type: 'text',
          admin: { description: 'e.g. Established 2012 / 14 years. Bold in copy.' },
        },
        {
          name: 'plantingDensity',
          type: 'text',
        },
        {
          name: 'annualProductionTonnes',
          type: 'number',
          admin: { description: 'Annual production in tonnes. Bold in copy.' },
        },
        {
          name: 'exportLicensing',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'soilClassification',
          type: 'text',
        },
        {
          name: 'coldStorage',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'additionalPlantableHa',
          type: 'number',
          admin: { description: 'Development potential — additional plantable hectares' },
        },
      ],
    },
    {
      name: 'cattleRanchData',
      type: 'group',
      label: 'Cattle and Ranch Data',
      fields: [
        {
          name: 'species',
          type: 'text',
          admin: { description: 'e.g. Angus, Hereford, Mixed' },
        },
        {
          name: 'carryingCapacityHead',
          type: 'number',
          admin: { description: 'Maximum carrying capacity in head. Bold in copy.' },
        },
        {
          name: 'currentHeadCount',
          type: 'number',
        },
        {
          name: 'improvedPastureHa',
          type: 'number',
        },
        {
          name: 'naturalPastureHa',
          type: 'number',
        },
        {
          name: 'soilClassification',
          type: 'text',
        },
        {
          name: 'waterSources',
          type: 'array',
          fields: [
            { name: 'source', type: 'text', required: true },
            { name: 'seasonalReliability', type: 'select',
              // Shorten the generated Postgres enum name (the full path
              // enum_assets_cattle_ranch_data_water_sources_seasonal_reliability
              // is 64 chars and exceeds Postgres's 63-char identifier limit).
              // dbName changes only the DB column/enum, not the API field key.
              dbName: 'reliability',
              options: [
              { label: 'Year-round', value: 'year-round' },
              { label: 'Seasonal', value: 'seasonal' },
            ]},
          ],
        },
        {
          name: 'staffedAndOperational',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'landAppreciationContext',
          type: 'textarea',
          admin: { description: 'Comparative data where available. Data-only, no promotional framing.' },
        },
      ],
    },

    // ── Due Diligence Snapshot ────────────────────────────────────────────────
    {
      name: 'dueDiligenceSnapshot',
      type: 'richText',
      editor: lexicalEditor(),
      admin: {
        description: 'Public-facing summary that leads into the qualification gate. Use approved gate language from the Brand Voice Guide.',
      },
    },

    // ── Advisory and Execution Module Relationships ───────────────────────────
    {
      name: 'advisoryModule',
      type: 'relationship',
      relationTo: 'service-pages',
      filterOptions: {
        serviceType: { equals: 'advisory' },
      },
      admin: {
        description: 'Linked Advisory service page. Required for RealEstateListing hasPart schema relationship.',
      },
    },
    {
      name: 'executionModule',
      type: 'relationship',
      relationTo: 'service-pages',
      filterOptions: {
        serviceType: { equals: 'execution' },
      },
      admin: {
        description: 'Linked Execution service page. Required for RealEstateListing hasPart schema relationship.',
      },
    },

    // ── GATED FIELDS — verified-buyer access only ─────────────────────────────
    {
      name: 'gated',
      type: 'group',
      label: 'Gated Materials (Verified Buyers Only)',
      access: {
        read: ({ req }) => req.user?.role === 'verified-buyer' || req.user?.role === 'admin',
        update: ({ req }) => req.user?.role === 'admin',
      },
      admin: {
        description: 'These fields are only accessible to users with verified-buyer role.',
      },
      fields: [
        {
          name: 'financials',
          type: 'richText',
          editor: lexicalEditor(),
          admin: {
            description: 'Financial statements, P&L, yield history. Gated — verified buyers only.',
          },
        },
        {
          name: 'informationMemorandum',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Full Information Memorandum PDF. Gated — verified buyers only.',
          },
        },
        {
          name: 'fullDueDiligence',
          type: 'array',
          admin: {
            description: 'Full due diligence document set. Gated — verified buyers only.',
          },
          fields: [
            {
              name: 'document',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'documentType',
              type: 'select',
              options: [
                { label: 'Title Documentation', value: 'title' },
                { label: 'Water Rights Registry', value: 'water-rights' },
                { label: 'Financial Statements', value: 'financials' },
                { label: 'Agronomic Report', value: 'agronomic' },
                { label: 'Environmental Assessment', value: 'environmental' },
                { label: 'Regulatory Compliance', value: 'regulatory' },
                { label: 'SENASA Registration', value: 'senasa' },
                { label: 'Other', value: 'other' },
              ],
            },
            {
              name: 'label',
              type: 'text',
            },
          ],
        },
      ],
    },

    // ── Hero Image ────────────────────────────────────────────────────────────
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Primary asset image. WebP format. Max 200KB after optimisation. Alt text required.',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      admin: {
        description: 'Additional asset images. Commercially grounded captions only.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    // ── SEO / AIO Metadata ────────────────────────────────────────────────────
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        description: 'Format: [Asset Type] [Region] [Hectares]ha | BBI Argentina (max 60 chars)',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description: '150–160 chars. Format: [Asset type] in [region]. [Key metric]. [Status]. [Water rights]. Available to verified buyers through BBI Argentina.',
      },
    },

    // ── Publication Control ───────────────────────────────────────────────────
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Must be true for asset to appear in public listings. Sold/Off-Market assets are automatically removed.',
        position: 'sidebar',
      },
    },
    {
      name: 'featuredOnHome',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this asset in the homepage "Current Off-Market Opportunities" grid',
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],

  hooks: {
    beforeChange: [
      // Auto-set publishedAt when published first goes true
      ({ data, originalDoc }) => {
        if (data.published && !originalDoc?.publishedAt) {
          return { ...data, publishedAt: new Date().toISOString() }
        }
        return data
      },
    ],
  },
}
