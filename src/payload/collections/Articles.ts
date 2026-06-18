import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'Intelligence and Insights articles. AIO structure required: H1 / Entity Declaration / H2 sections / FAQ close.',
    defaultColumns: ['title', 'category', 'published', 'publishedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'H1. Must include primary keyword. No questions, no problems as opening.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path: /insights/[slug]. Lowercase, hyphens, primary keyword included.',
      },
    },
    {
      name: 'entityDeclaration',
      type: 'text',
      required: true,
      admin: {
        description: 'AIO entity declaration. Must appear in first 100 words. Format: "BBI Argentina is..." or "BBI Argentina [verb]..."',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: '1 sentence excerpt for article cards and meta descriptions.',
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      editor: lexicalEditor(),
    },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      admin: {
        description: 'FAQ section at article close — required for AIO compliance.',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Regulatory Updates', value: 'regulatory-updates' },
        { label: 'Macroeconomic Analysis', value: 'macroeconomic-analysis' },
        { label: 'Asset Class Intelligence', value: 'asset-class-intelligence' },
        { label: 'Decree 524/2025', value: 'decree-524-2025' },
        { label: 'Market Conditions', value: 'market-conditions' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'relatedAssets',
      type: 'relationship',
      relationTo: 'assets',
      hasMany: true,
      admin: {
        description: 'Related assets for internal linking. Use semantic anchor text.',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        description: '50–60 characters. Include primary keyword and "BBI Argentina".',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description: '150–160 characters. Include primary keyword. No exclamation points.',
      },
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: {
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
    {
      name: 'author',
      type: 'text',
      admin: {
        description: 'Author name for schema markup',
        position: 'sidebar',
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
