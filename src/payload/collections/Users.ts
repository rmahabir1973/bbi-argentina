import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    group: 'Admin',
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'viewer',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Verified Buyer', value: 'verified-buyer' },
        { label: 'Viewer', value: 'viewer' },
      ],
    },
    {
      name: 'organisation',
      type: 'text',
      admin: {
        description: 'Company, fund or family office name if applicable',
      },
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'verifiedAt',
      type: 'date',
      admin: {
        description: 'Date buyer verification was completed',
        readOnly: true,
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes only — not visible to the user',
      },
    },
  ],
  access: {
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true
      if (req.user) return { id: { equals: req.user.id } }
      return false
    },
    create: () => true,
    update: ({ req }) => {
      if (req.user?.role === 'admin') return true
      if (req.user) return { id: { equals: req.user.id } }
      return false
    },
    delete: ({ req }) => req.user?.role === 'admin',
  },
}
