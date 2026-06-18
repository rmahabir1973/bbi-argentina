import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Lowercase, hyphens, no trailing slash. Max depth 3.',
      },
    },
    {
      name: 'pageType',
      type: 'select',
      required: true,
      options: [
        { label: 'Home', value: 'home' },
        { label: 'Citizenship and Residency', value: 'citizenship-residency' },
        { label: 'Vineyards and Wineries', value: 'vineyards-wineries' },
        { label: 'Investment Opportunities', value: 'investment-opportunities' },
        { label: 'Advisory', value: 'advisory' },
        { label: 'Execution', value: 'execution' },
        { label: 'About and Insights', value: 'about-insights' },
        { label: 'Contact', value: 'contact' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        description: '50–60 characters. Must include "BBI Argentina".',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description: '150–160 characters. No exclamation points.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    update: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    delete: ({ req }) => req.user?.role === 'admin',
  },
}
