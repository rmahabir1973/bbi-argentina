/**
 * BBI Argentina - Pipedrive CRM sync
 *
 * Optional. Payload CMS is the source of truth.
 * Non-blocking: errors are caught and logged.
 *
 * Required env vars: PIPEDRIVE_API_TOKEN, PIPEDRIVE_COMPANY_DOMAIN
 */

export async function syncInquiryToPipedrive(
  inquiry: Record<string, string>,
): Promise<void> {
  const token = process.env.PIPEDRIVE_API_TOKEN
  const domain = process.env.PIPEDRIVE_COMPANY_DOMAIN
  if (!token || !domain) return

  const baseUrl = `https://${domain}.pipedrive.com/v1`
  const name = inquiry.fullName ?? 'Unknown'

  try {
    const personPayload: Record<string, unknown> = {
      name,
      email: inquiry.email ? [{ value: inquiry.email, primary: true }] : [],
      phone: inquiry.phone ? [{ value: inquiry.phone, primary: true }] : [],
    }
    if (inquiry.entityName) personPayload.org_name = inquiry.entityName

    const personRes = await fetch(`${baseUrl}/persons?api_token=${token}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(personPayload),
    })

    let personId: number | undefined
    if (personRes.ok) {
      const data = await personRes.json() as { data?: { id: number } }
      personId = data.data?.id
    } else {
      const err = await personRes.text()
      console.warn('[Pipedrive] Person create failed:', personRes.status, err)
    }

    const dealPayload: Record<string, unknown> = {
      title: `${name} - ${inquiry.inquiryType ?? 'inquiry'}`,
      status: 'open',
    }
    if (personId) dealPayload.person_id = personId

    const dealRes = await fetch(`${baseUrl}/deals?api_token=${token}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dealPayload),
    })

    if (!dealRes.ok) {
      console.warn('[Pipedrive] Deal create failed:', dealRes.status, await dealRes.text())
    } else {
      console.log('[Pipedrive] Inquiry synced:', inquiry.email)
    }
  } catch (err) {
    console.error('[Pipedrive] syncInquiryToPipedrive error:', err)
  }
}

/** Legacy shim for Payload CMS afterChange hook. */
export async function syncToPipedrive(doc: {
  id: string; fullName: string; email: string; phone?: string; country?: string;
  entityName?: string; inquiryType: string; description?: string; status: string;
  [key: string]: unknown
}): Promise<void> {
  const inquiry: Record<string, string> = { fullName: doc.fullName, email: doc.email, inquiryType: doc.inquiryType, status: doc.status }
  if (doc.phone) inquiry.phone = String(doc.phone)
  if (doc.country) inquiry.country = String(doc.country)
  if (doc.entityName) inquiry.entityName = String(doc.entityName)
  if (doc.description) inquiry.description = String(doc.description)
  await syncInquiryToPipedrive(inquiry)
}
