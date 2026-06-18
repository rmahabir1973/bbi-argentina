/**
 * BBI Argentina - Resend email utilities
 * Platform layers: Origination, Advisory, Execution
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? ''
const FROM_ADDRESS = process.env.BBI_FROM_EMAIL ?? process.env.RESEND_DEFAULT_FROM ?? 'noreply@bbiargentina.com'
const TEAM_EMAIL = process.env.BBI_NOTIFY_EMAIL ?? 'inquiries@bbiargentina.com'

interface EmailPayload {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}

async function sendEmail(payload: EmailPayload): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn('[Resend] RESEND_API_KEY not set - email not sent')
    return
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      reply_to: payload.replyTo,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Resend API error: ${response.status} - ${error}`)
  }
}

const INQUIRY_TYPE_LABELS: Record<string, string> = {
  'property-inquiry': 'Property or Opportunity Inquiry',
  'advisory-support': 'Advisory Support',
  'advisory': 'Advisory Support',
  'execution-planning': 'Execution Planning',
  'execution': 'Execution Planning',
  'residency-citizenship': 'Residency or Citizenship-Aligned Acquisition',
  'general-inquiry': 'General Inquiry',
  'general': 'General Inquiry',
  'qualification-request': 'Qualification Request',
  'off-market-criteria': 'Off-Market Criteria Submission',
  'newsletter': 'Newsletter Subscription',
  'project-scope': 'Project Scope Request',
}
function labelFor(t: string): string { return INQUIRY_TYPE_LABELS[t] ?? t }

function wrapHtml(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background:#F5F1EA;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F1EA;padding:32px 16px;">
    <tr><td>
      <table width="600" align="center" style="max-width:600px;background:#FDFAF6;border:1px solid #DDD8CE;border-radius:4px;">
        <tr><td style="background:#2D2A26;padding:20px 32px;">
          <span style="font-size:16px;color:#E8E4DC;font-family:Georgia,serif;">BBI Argentina</span>
        </td></tr>
        <tr><td style="padding:32px;">${body}</td></tr>
        <tr><td style="padding:16px 32px 24px;border-top:1px solid #E8E4DC;">
          <p style="margin:0;font-size:12px;color:#9A9080;line-height:1.6;">BBI Argentina is a full-cycle investment platform covering Origination, Advisory, and Execution across Argentina's productive asset landscape.</p>
          <p style="margin:8px 0 0;font-size:12px;color:#9A9080;"><a href="https://www.bbiargentina.com" style="color:#6B7A5E;">www.bbiargentina.com</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

/**
 * Send a confirmation email to the person who submitted an inquiry.
 */
export async function sendInquiryConfirmation(
  to: string,
  name: string,
  inquiryType: string,
): Promise<void> {
  try {
    const firstName = name.trim().split(' ')[0] ?? name
    const typeLabel = labelFor(inquiryType)

    const body = `
      <p style="margin:0 0 16px;font-size:15px;color:#1A1A1A;line-height:1.75;">${firstName},</p>
      <p style="margin:0 0 16px;font-size:15px;color:#1A1A1A;line-height:1.75;">
        BBI Argentina has received your inquiry regarding <strong>${typeLabel}</strong>.
        A member of our team will review your submission and be in touch within 24 hours.
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#1A1A1A;line-height:1.75;">
        We treat all preliminary discussions with discretion and confidentiality.
        If your inquiry is time-sensitive, you are welcome to reply to this message directly.
      </p>
      <p style="margin:0;font-size:15px;color:#1A1A1A;line-height:1.75;">BBI Argentina</p>
    `

    await sendEmail({
      to,
      subject: 'BBI Argentina \u2014 Your inquiry has been received',
      html: wrapHtml(body),
    })
  } catch (err) {
    console.error('[Resend] sendInquiryConfirmation failed:', err)
  }
}

/**
 * Send an internal notification to the BBI team for a new inquiry.
 */
export async function sendInquiryNotification(
  inquiry: Record<string, string>,
): Promise<void> {
  try {
    const name = inquiry.fullName ?? 'Unknown'
    const inquiryType = inquiry.inquiryType ?? 'general-inquiry'
    const typeLabel = labelFor(inquiryType)

    const skipKeys = new Set(['fullName', 'email', 'inquiryType'])
    const fieldLabels: Record<string, string> = {
      entityName: 'Organisation', phone: 'Phone', country: 'Country',
      description: 'Description', preferredResponseMethod: 'Preferred response',
      assetType: 'Asset type', budget: 'Budget', projectType: 'Project type',
      pathway: 'Pathway', supportLevel: 'Support level', timeline: 'Timeline',
      currentStatus: 'Current status', location: 'Location',
      surfaceArea: 'Surface area', investmentScope: 'Investment scope',
      preferredAssetType: 'Preferred asset type', assetSlug: 'Asset reference',
    }

    const extraRows = Object.entries(inquiry)
      .filter(([key, val]) => !skipKeys.has(key) && val && val.trim())
      .map(([key, val]) => {
        const label = fieldLabels[key] ?? key
        return `<tr>
            <td style="padding:6px 0;color:#6B7A5E;font-size:13px;width:160px;vertical-align:top;">${label}</td>
            <td style="padding:6px 0;color:#1A1A1A;font-size:13px;">${val}</td>
          </tr>`
      })
      .join('')

    const body = `
      <h2 style="margin:0 0 20px;font-size:18px;color:#2D2A26;font-weight:normal;border-bottom:1px solid #E8E4DC;padding-bottom:12px;">
        New inquiry &#x2014; ${typeLabel}
      </h2>
      <table style="width:100%;border-collapse:collapse;" cellpadding="0" cellspacing="0">
        <tr><td style="padding:6px 0;color:#6B7A5E;font-size:13px;width:160px;">Name</td><td style="padding:6px 0;color:#1A1A1A;font-size:13px;">${name}</td></tr>
        <tr><td style="padding:6px 0;color:#6B7A5E;font-size:13px;">Email</td><td style="padding:6px 0;color:#1A1A1A;font-size:13px;"><a href="mailto:${inquiry.email}" style="color:#4A5240;">${inquiry.email}</a></td></tr>
        <tr><td style="padding:6px 0;color:#6B7A5E;font-size:13px;">Inquiry type</td><td style="padding:6px 0;color:#1A1A1A;font-size:13px;">${typeLabel}</td></tr>
        ${extraRows}
      </table>
    `

    const notifyTo = process.env.BBI_NOTIFY_EMAIL ?? TEAM_EMAIL

    await sendEmail({
      to: notifyTo,
      subject: `New BBI Argentina inquiry \u2014 ${typeLabel} \u2014 ${name}`,
      replyTo: inquiry.email,
      html: wrapHtml(body),
    })
  } catch (err) {
    console.error('[Resend] sendInquiryNotification failed:', err)
  }
}

/**
 * Send a welcome email to a new newsletter subscriber.
 */
export async function sendSubscribeWelcome(to: string, name: string): Promise<void> {
  try {
    const firstName = name.trim().split(' ')[0] ?? name

    const body = `
      <p style="margin:0 0 16px;font-size:15px;color:#1A1A1A;line-height:1.75;">${firstName},</p>
      <p style="margin:0 0 16px;font-size:15px;color:#1A1A1A;line-height:1.75;">
        Your subscription to BBI Argentina Insights is confirmed.
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#1A1A1A;line-height:1.75;">
        Through this channel we share substantive perspectives on productive asset acquisition,
        the Argentine investment landscape, and developments across our Origination, Advisory,
        and Execution layers. Content is infrequent and purposeful.
      </p>
      <p style="margin:0 0 16px;font-size:15px;color:#1A1A1A;line-height:1.75;">
        If you have a specific inquiry or would like to discuss an opportunity directly,
        you are welcome to reply to this message or reach us at
        <a href="mailto:${TEAM_EMAIL}" style="color:#4A5240;">${TEAM_EMAIL}</a>.
      </p>
      <p style="margin:0;font-size:15px;color:#1A1A1A;line-height:1.75;">BBI Argentina</p>
    `

    await sendEmail({
      to,
      subject: 'BBI Argentina Insights \u2014 subscription confirmed',
      html: wrapHtml(body),
    })
  } catch (err) {
    console.error('[Resend] sendSubscribeWelcome failed:', err)
  }
}
