/**
 * BBI Argentina - HubSpot CRM sync
 *
 * Optional. Payload CMS is the source of truth.
 * Non-blocking: errors are caught and logged.
 *
 * Required env vars: HUBSPOT_API_KEY or HUBSPOT_ACCESS_TOKEN
 */

export async function syncInquiryToHubSpot(
  inquiry: Record<string, string>,
): Promise<void> {
  const token = process.env.HUBSPOT_API_KEY ?? process.env.HUBSPOT_ACCESS_TOKEN
  if (!token) return

  const name = inquiry.fullName ?? ''
  const nameParts = name.trim().split(' ')
  const firstName = nameParts[0] ?? ''
  const lastName = nameParts.slice(1).join(' ') || ''

  try {
    const contactPayload = {
      properties: {
        firstname: firstName,
        lastname: lastName,
        email: inquiry.email ?? '',
        phone: inquiry.phone ?? '',
        country: inquiry.country ?? '',
        company: inquiry.entityName ?? '',
        bbi_inquiry_type: inquiry.inquiryType ?? '',
        message: inquiry.description ?? '',
      },
    }

    const contactRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(contactPayload),
    })

    let contactId: string | undefined
    if (contactRes.ok) {
      const data = await contactRes.json() as { id?: string }
      contactId = data.id
    } else {
      const err = await contactRes.text()
      console.warn('[HubSpot] Contact create failed:', contactRes.status, err)
    }

    const dealPayload = {
      properties: {
        dealname: `${name} - ${inquiry.inquiryType ?? 'inquiry'}`,
        pipeline: 'default',
        dealstage: 'appointmentscheduled',
      },
      associations: contactId ? [{ to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }] }] : [],
    }

    const dealRes = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(dealPayload),
    })

    if (!dealRes.ok) {
      const err = await dealRes.text()
      console.warn('[HubSpot] Deal create failed:', dealRes.status, err)
    } else {
      console.log('[HubSpot] Inquiry synced:', inquiry.email)
    }
  } catch (err) {
    console.error('[HubSpot] syncInquiryToHubSpot error:', err)
  }
}

/** Legacy shim for Payload CMS afterChange hook. */
export async function syncToHubSpot(doc: {
  id: string; fullName: string; email: string; phone?: string; country?: string;
  entityName?: string; inquiryType: string; description?: string; status: string;
  [key: string]: unknown
}): Promise<void> {
  const inquiry: Record<string, string> = { fullName: doc.fullName, email: doc.email, inquiryType: doc.inquiryType, status: doc.status }
  if (doc.phone) inquiry.phone = String(doc.phone)
  if (doc.country) inquiry.country = String(doc.country)
  if (doc.entityName) inquiry.entityName = String(doc.entityName)
  if (doc.description) inquiry.description = String(doc.description)
  await syncInquiryToHubSpot(inquiry)
}
