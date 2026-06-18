import type { CollectionConfig } from 'payload'

/**
 * Inquiries Collection
 *
 * All inbound inquiries from all forms submit here via Server Actions.
 * Conditional fields based on inquiry type.
 * CRM sync hook behind env flag — Payload is source of truth.
 */
export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'fullName',
    group: 'CRM',
    defaultColumns: ['fullName', 'inquiryType', 'email', 'crmSyncState', 'createdAt'],
    description: 'All inbound inquiries from website forms. Payload is source of truth.',
  },

  // No public reads — internal only
  access: {
    read: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'editor',
    create: () => true, // Server Actions write to this collection
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },

  fields: [
    // ── Inquiry Type ──────────────────────────────────────────────────────────
    {
      name: 'inquiryType',
      type: 'select',
      required: true,
      options: [
        { label: 'Property or Opportunity Inquiry', value: 'property-inquiry' },
        { label: 'Advisory Support', value: 'advisory-support' },
        { label: 'Execution Planning', value: 'execution-planning' },
        { label: 'Residency or Citizenship-Aligned Acquisition', value: 'residency-citizenship' },
        { label: 'General Inquiry', value: 'general-inquiry' },
        { label: 'Qualification Request', value: 'qualification-request' },
        { label: 'Off-Market Criteria Submission', value: 'off-market-criteria' },
        { label: 'Newsletter Subscription', value: 'newsletter' },
        { label: 'Project Scope Request', value: 'project-scope' },
      ],
    },

    // ── Universal Fields ──────────────────────────────────────────────────────
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'entityName',
      type: 'text',
      admin: {
        description: 'Company, fund or family office name if applicable',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Phone or WhatsApp number',
      },
    },
    {
      name: 'country',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of inquiry',
      },
    },
    {
      name: 'preferredResponseMethod',
      type: 'select',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Phone', value: 'phone' },
        { label: 'WhatsApp', value: 'whatsapp' },
      ],
    },

    // ── Conditional: Property Inquiry ─────────────────────────────────────────
    {
      name: 'propertyInquiry',
      type: 'group',
      label: 'Property Inquiry Details',
      admin: {
        condition: (data) => data.inquiryType === 'property-inquiry',
      },
      fields: [
        {
          name: 'assetReference',
          type: 'relationship',
          relationTo: 'assets',
          admin: { description: 'Specific asset if inquiry is about a listed opportunity' },
        },
        {
          name: 'propertyType',
          type: 'select',
          hasMany: true,
          options: [
            { label: 'Vineyards and Wineries', value: 'vineyards-wineries' },
            { label: 'Orchards and Permanent Crops', value: 'orchards' },
            { label: 'Cattle Ranches', value: 'cattle-ranches' },
            { label: 'Real Estate and Development', value: 'real-estate' },
          ],
        },
        {
          name: 'provincePreference',
          type: 'select',
          hasMany: true,
          options: [
            { label: 'Mendoza', value: 'mendoza' },
            { label: 'San Juan', value: 'san-juan' },
            { label: 'Salta', value: 'salta' },
            { label: 'Patagonia', value: 'patagonia' },
            { label: 'Buenos Aires Province', value: 'buenos-aires-province' },
            { label: 'Open to All', value: 'all' },
          ],
        },
        {
          name: 'sizeRangeHa',
          type: 'text',
          admin: { description: 'e.g. 20–50 hectares, or 100+ hectares' },
        },
        {
          name: 'operationalPreference',
          type: 'select',
          options: [
            { label: 'Fully Operational Only', value: 'operational' },
            { label: 'Development Land', value: 'development' },
            { label: 'Either', value: 'either' },
          ],
        },
        {
          name: 'budgetRange',
          type: 'select',
          options: [
            { label: 'USD 500K – 1M', value: '500k-1m' },
            { label: 'USD 1M – 2M', value: '1m-2m' },
            { label: 'USD 2M – 5M', value: '2m-5m' },
            { label: 'USD 5M – 10M', value: '5m-10m' },
            { label: 'USD 10M+', value: '10m-plus' },
          ],
        },
        {
          name: 'timeline',
          type: 'select',
          options: [
            { label: 'Actively looking now', value: 'active' },
            { label: '3–6 months', value: '3-6-months' },
            { label: '6–12 months', value: '6-12-months' },
            { label: 'Researching for 12+ months', value: '12-months-plus' },
          ],
        },
        {
          name: 'additionalCriteria',
          type: 'textarea',
        },
      ],
    },

    // ── Conditional: Qualification Request ────────────────────────────────────
    {
      name: 'qualificationRequest',
      type: 'group',
      label: 'Qualification Request Details',
      admin: {
        condition: (data) => data.inquiryType === 'qualification-request',
      },
      fields: [
        {
          name: 'targetAsset',
          type: 'relationship',
          relationTo: 'assets',
        },
        {
          name: 'investmentScope',
          type: 'select',
          options: [
            { label: 'USD 500K – 1M', value: '500k-1m' },
            { label: 'USD 1M – 2M', value: '1m-2m' },
            { label: 'USD 2M – 5M', value: '2m-5m' },
            { label: 'USD 5M+', value: '5m-plus' },
          ],
        },
        {
          name: 'preferredAssetType',
          type: 'text',
        },
        {
          name: 'preferredTimeline',
          type: 'text',
        },
      ],
    },

    // ── Conditional: Project Scope ────────────────────────────────────────────
    {
      name: 'projectScope',
      type: 'group',
      label: 'Project Scope Details',
      admin: {
        condition: (data) => data.inquiryType === 'project-scope',
      },
      fields: [
        {
          name: 'propertyType',
          type: 'select',
          options: [
            { label: 'Vineyard', value: 'vineyard' },
            { label: 'Winery', value: 'winery' },
            { label: 'Pistachio Orchard', value: 'pistachio-orchard' },
            { label: 'Olive Orchard', value: 'olive-orchard' },
            { label: 'Cattle Ranch', value: 'cattle-ranch' },
            { label: 'Mixed Agriculture', value: 'mixed-agriculture' },
            { label: 'Real Estate', value: 'real-estate' },
          ],
        },
        {
          name: 'location',
          type: 'text',
          admin: { description: 'Province, region or specific property' },
        },
        {
          name: 'surfaceAreaHa',
          type: 'number',
        },
        {
          name: 'investmentRange',
          type: 'text',
        },
        {
          name: 'supportLevel',
          type: 'select',
          options: [
            { label: 'Advisory only', value: 'advisory-only' },
            { label: 'Full execution', value: 'full-execution' },
            { label: 'Not yet determined', value: 'undetermined' },
          ],
        },
        {
          name: 'timeline',
          type: 'select',
          options: [
            { label: '0–12 months', value: '0-12' },
            { label: '12–24 months', value: '12-24' },
            { label: '24+ months', value: '24-plus' },
          ],
        },
        {
          name: 'currentStatus',
          type: 'select',
          options: [
            { label: 'Raw land', value: 'raw' },
            { label: 'Partially developed', value: 'partial' },
            { label: 'Operational', value: 'operational' },
          ],
        },
      ],
    },

    // ── Conditional: Residency / Citizenship ──────────────────────────────────
    {
      name: 'residencyCitizenship',
      type: 'group',
      label: 'Residency or Citizenship Inquiry Details',
      admin: {
        condition: (data) => data.inquiryType === 'residency-citizenship',
      },
      fields: [
        {
          name: 'investmentScope',
          type: 'text',
        },
        {
          name: 'preferredAssetType',
          type: 'text',
        },
        {
          name: 'preferredTimeline',
          type: 'text',
        },
      ],
    },

    // ── CRM and Status Fields ─────────────────────────────────────────────────
    {
      name: 'verifiedBuyer',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Mark true once buyer has completed identity verification, NDA and BRA',
        position: 'sidebar',
      },
    },
    {
      name: 'crmSyncState',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Synced', value: 'synced' },
        { label: 'Failed', value: 'failed' },
        { label: 'Skipped (CRM disabled)', value: 'skipped' },
      ],
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'CRM sync status. Payload is always source of truth.',
      },
    },
    {
      name: 'crmId',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'ID in external CRM if synced',
      },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        description: 'BBI team member assigned to this inquiry',
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        description: 'Internal notes — not visible to the inquirer',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Review', value: 'in-review' },
        { label: 'Qualification Sent', value: 'qualification-sent' },
        { label: 'Verified Buyer', value: 'verified-buyer' },
        { label: 'Active Acquisition', value: 'active-acquisition' },
        { label: 'Closed — Acquired', value: 'closed-acquired' },
        { label: 'Closed — No Fit', value: 'closed-no-fit' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],

  hooks: {
    afterChange: [
      // CRM sync hook — triggered on creation, behind env flag
      async ({ doc, operation }) => {
        if (operation !== 'create') return doc

        const crmProvider = process.env.CRM_PROVIDER
        if (!crmProvider) {
          // CRM disabled — skip silently
          return doc
        }

        try {
          if (crmProvider === 'hubspot') {
            const { syncToHubSpot } = await import('@/lib/crm/hubspot')
            await syncToHubSpot(doc)
          } else if (crmProvider === 'pipedrive') {
            const { syncToPipedrive } = await import('@/lib/crm/pipedrive')
            await syncToPipedrive(doc)
          }
        } catch (error) {
          console.error('[CRM Sync Error]', error)
          // Non-blocking — Payload is source of truth
        }

        return doc
      },
    ],
  },
}
