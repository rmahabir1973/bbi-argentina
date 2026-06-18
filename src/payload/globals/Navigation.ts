import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: {
    group: 'Admin',
  },
  fields: [
    {
      name: 'primaryNav',
      type: 'array',
      label: 'Primary Navigation',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'primaryCta',
          type: 'text',
          admin: {
            description: 'Primary CTA text for this nav item (optional)',
          },
        },
        {
          name: 'primaryCtaUrl',
          type: 'text',
        },
        {
          name: 'subMenu',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
      defaultValue: [
        { label: 'Home', url: '/', primaryCta: 'View Investment Opportunities', primaryCtaUrl: '/investment-opportunities' },
        { label: 'Citizenship and Residency', url: '/citizenship-residency-by-investment', primaryCta: 'Initiate Qualification', primaryCtaUrl: '/contact' },
        {
          label: 'Vineyards and Wineries',
          url: '/vineyards-wineries',
          primaryCta: 'Request Asset Information',
          primaryCtaUrl: '/contact',
          subMenu: [
            { label: 'Operational Assets', url: '/vineyards-wineries?status=operational' },
            { label: 'Development Land', url: '/vineyards-wineries?status=development' },
          ],
        },
        {
          label: 'Investment Opportunities',
          url: '/investment-opportunities',
          primaryCta: 'Share Your Criteria',
          primaryCtaUrl: '/contact',
          subMenu: [
            { label: 'Agriculture and Agribusiness', url: '/investment-opportunities/vineyards-wineries' },
            { label: 'Orchards', url: '/investment-opportunities/orchards' },
            { label: 'Cattle', url: '/investment-opportunities/cattle-ranches' },
            { label: 'Real Estate', url: '/investment-opportunities/real-estate' },
          ],
        },
        {
          label: 'Advisory',
          url: '/advisory',
          primaryCta: 'Request Advisory Scope',
          primaryCtaUrl: '/contact',
          subMenu: [
            { label: 'Wine Business', url: '/advisory#wine-business' },
            { label: 'Cattle Ranching', url: '/advisory#cattle-ranching' },
            { label: 'Orchards', url: '/advisory#orchards' },
            { label: 'Real Estate', url: '/advisory#real-estate' },
          ],
        },
        {
          label: 'Execution',
          url: '/execution',
          primaryCta: 'Request Project Scope',
          primaryCtaUrl: '/contact',
          subMenu: [
            { label: 'Infrastructure', url: '/execution#infrastructure' },
            { label: 'Water and Irrigation', url: '/execution#water-irrigation' },
            { label: 'Construction', url: '/execution#construction' },
            { label: 'Farm Setup', url: '/execution#farm-setup' },
            { label: 'Technical and Regulatory', url: '/execution#technical-regulatory' },
          ],
        },
        {
          label: 'About and Insights',
          url: '/about',
          primaryCta: 'Subscribe for Updates',
          primaryCtaUrl: '/about#newsletter',
          subMenu: [
            { label: 'About BBI Argentina', url: '/about' },
            { label: 'Argentina Intelligence', url: '/about#intelligence' },
            { label: 'Insights Blog', url: '/insights' },
          ],
        },
        {
          label: 'Contact',
          url: '/contact',
          primaryCta: 'Submit Inquiry',
          primaryCtaUrl: '/contact',
        },
      ],
    },
    {
      name: 'globalCta',
      type: 'group',
      label: 'Global Header CTA',
      fields: [
        {
          name: 'label',
          type: 'text',
          defaultValue: 'Tell Us What You\'re Looking For',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/contact',
        },
      ],
    },
    {
      name: 'footerPlatformLinks',
      type: 'array',
      label: 'Footer — Platform Layer Links',
      defaultValue: [
        { label: 'Origination', url: '/investment-opportunities' },
        { label: 'Advisory', url: '/advisory' },
        { label: 'Execution', url: '/execution' },
      ],
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'footerAssetLinks',
      type: 'array',
      label: 'Footer — Asset Class Links',
      defaultValue: [
        { label: 'Vineyards and Wineries', url: '/vineyards-wineries' },
        { label: 'Orchards', url: '/investment-opportunities/orchards' },
        { label: 'Cattle Ranches', url: '/investment-opportunities/cattle-ranches' },
        { label: 'Real Estate', url: '/investment-opportunities/real-estate' },
      ],
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
  access: {
    read: () => true,
    update: ({ req }) => req.user?.role === 'admin',
  },
}
