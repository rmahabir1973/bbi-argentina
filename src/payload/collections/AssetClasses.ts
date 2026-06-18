import type { CollectionConfig } from 'payload'

export const AssetClasses: CollectionConfig = {
  slug: 'asset-classes',
  admin: {
    useAsTitle: 'name',
    group: 'Asset Data',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL slug — lowercase, hyphens. e.g. vineyards-wineries',
      },
    },
    {
      name: 'categoryPageUrl',
      type: 'text',
      admin: {
        description: 'Full path for 301 redirects when assets are sold/off-market. e.g. /investment-opportunities/vineyards-wineries',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Icon name or SVG identifier',
      },
    },
  ],
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    delete: ({ req }) => req.user?.role === 'admin',
  },
}
