import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Content',
  },
  upload: {
    // Storage is handled by @payloadcms/storage-s3 plugin
    // Never store uploads on local disk
    staticDir: undefined,
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        crop: 'centre',
      },
      {
        name: 'card',
        width: 800,
        height: 600,
        crop: 'centre',
      },
      {
        name: 'hero',
        width: 1440,
        height: 810,
        crop: 'centre',
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    formatOptions: {
      format: 'webp',
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Descriptive alt text required for WCAG 2.1 AA compliance. Describe the image content specifically.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description: 'Optional image caption — commercially grounded only. No lifestyle language.',
      },
    },
    {
      name: 'assetClass',
      type: 'select',
      options: [
        { label: 'Vineyard / Winery', value: 'vineyard-winery' },
        { label: 'Orchard', value: 'orchard' },
        { label: 'Cattle / Ranch', value: 'cattle-ranch' },
        { label: 'Agricultural Real Estate', value: 'real-estate' },
        { label: 'Platform / Team', value: 'platform' },
        { label: 'Map / Diagram', value: 'map-diagram' },
      ],
    },
    {
      name: 'province',
      type: 'select',
      options: [
        { label: 'Mendoza', value: 'mendoza' },
        { label: 'San Juan', value: 'san-juan' },
        { label: 'Salta', value: 'salta' },
        { label: 'Patagonia', value: 'patagonia' },
        { label: 'Buenos Aires Province', value: 'buenos-aires-province' },
      ],
    },
  ],
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    delete: ({ req }) => req.user?.role === 'admin',
  },
}
