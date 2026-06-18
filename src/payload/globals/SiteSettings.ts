import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Admin',
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'BBI Argentina',
    },
    {
      name: 'siteTagline',
      type: 'text',
      defaultValue: 'Productive Asset Investment Platform',
    },
    {
      name: 'siteUrl',
      type: 'text',
      defaultValue: 'https://www.bbiargentina.com',
    },
    {
      name: 'defaultMetaTitle',
      type: 'text',
      defaultValue: 'BBI Argentina | Productive Asset Investment Platform',
      admin: {
        description: '50–60 characters.',
      },
    },
    {
      name: 'defaultMetaDescription',
      type: 'textarea',
      defaultValue: 'BBI Argentina originates, advises and executes on productive asset acquisitions across Argentina. Vineyards, orchards and cattle ranches for qualified international buyers.',
      admin: {
        description: '150–160 characters. No exclamation points.',
      },
    },
    {
      name: 'organizationSchema',
      type: 'group',
      label: 'Organization Schema (Global JSON-LD)',
      admin: {
        description: 'Used for the Organization schema on every page. Keep exactly aligned with AIO requirements.',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          defaultValue: 'BBI Argentina',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'BBI Argentina is a full-cycle investment platform specialising in productive asset acquisition, advisory and execution across Argentina.',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: 'https://www.bbiargentina.com',
        },
        {
          name: 'areaServed',
          type: 'array',
          fields: [
            { name: 'area', type: 'text' },
          ],
          defaultValue: [
            { area: 'Mendoza' },
            { area: 'San Juan' },
            { area: 'Salta' },
            { area: 'Patagonia' },
            { area: 'Buenos Aires Province' },
          ],
        },
      ],
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'contactPhone',
      type: 'text',
    },
    {
      name: 'linkedInUrl',
      type: 'text',
      admin: {
        description: 'LinkedIn company page URL — institutional audience only',
      },
    },
    {
      name: 'responseTimeCommitment',
      type: 'text',
      defaultValue: '24 hours',
      admin: {
        description: 'Used in form response notes and schema',
      },
    },
    {
      name: 'regulatoryDisclaimer',
      type: 'textarea',
      defaultValue: 'All regulatory references including Decree 524/2025 and Ley de Tierras are subject to current Argentine law. Verified with qualified Argentine legal counsel.',
    },
    {
      name: 'teamEmail',
      type: 'email',
      admin: {
        description: 'Team notification email for inquiry routing',
      },
    },
  ],
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin',
  },
}
