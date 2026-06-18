import type { CollectionConfig } from 'payload'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  admin: {
    useAsTitle: 'question',
    group: 'Content',
    description: 'FAQ items. The first sentence of every answer must be the direct answer. Supporting data follows.',
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'richText',
      required: true,
      admin: {
        description: 'First sentence must be the direct answer to the question. AIO/FAQPage schema compliance.',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'General Platform', value: 'general' },
        { label: 'Citizenship and Residency', value: 'citizenship-residency' },
        { label: 'Vineyards and Wineries', value: 'vineyards-wineries' },
        { label: 'Orchards', value: 'orchards' },
        { label: 'Cattle and Ranches', value: 'cattle-ranches' },
        { label: 'Advisory', value: 'advisory' },
        { label: 'Execution', value: 'execution' },
        { label: 'Qualification Process', value: 'qualification' },
        { label: 'Regulatory', value: 'regulatory' },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
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
