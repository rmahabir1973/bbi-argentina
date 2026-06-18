import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const ServicePages: CollectionConfig = {
  slug: 'service-pages',
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
    },
    {
      name: 'serviceType',
      type: 'select',
      required: true,
      options: [
        { label: 'Advisory', value: 'advisory' },
        { label: 'Execution', value: 'execution' },
        { label: 'Origination', value: 'origination' },
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
      name: 'heroH1',
      type: 'text',
    },
    {
      name: 'heroH2',
      type: 'text',
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
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
