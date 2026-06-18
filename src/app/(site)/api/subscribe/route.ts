import { NextRequest, NextResponse } from 'next/server'
import { sendSubscribeWelcome } from '@/lib/email/resend'

const TEAM_EMAIL = process.env.BBI_NOTIFY_EMAIL ?? 'inquiries@bbiargentina.com'
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? ''
const FROM_ADDRESS = process.env.BBI_FROM_EMAIL ?? 'noreply@bbiargentina.com'

/**
 * POST /api/subscribe
 *
 * Newsletter subscription handler.
 * Validates email, sends welcome email to subscriber,
 * sends notification to BBI team.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    let fields: Record<string, string> = {}

    const contentType = req.headers.get('content-type') ?? ''
    if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData()
      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') fields[key] = value
      }
    } else {
      const json = await req.json() as Record<string, unknown>
      for (const [key, value] of Object.entries(json)) {
        if (typeof value === 'string') fields[key] = value
      }
    }

    const { name, email, investmentFocus } = fields

    if (!email?.trim()) {
      return NextResponse.json({ success: false, message: 'Email address is required.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ success: false, message: 'A valid email address is required.' }, { status: 400 })
    }

    const cleanEmail = email.trim().toLowerCase()
    const cleanName = name?.trim() || 'Subscriber'

    void sendSubscribeWelcome(cleanEmail, cleanName)
    void sendTeamSubscribeNotification(cleanEmail, cleanName, investmentFocus ?? '')

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[API/subscribe] POST error:', err)
    return NextResponse.json(
      { success: false, message: 'Unable to process subscription.' },
      { status: 500 },
    )
  }
}

async function sendTeamSubscribeNotification(
  email: string,
  name: string,
  investmentFocus: string,
): Promise<void> {
  if (!RESEND_API_KEY) return

  try {
    const focusRow = investmentFocus
      ? `<tr><td style="padding:6px 0;color:#6B7A5E;font-size:13px;width:160px;">Investment focus</td><td style="padding:6px 0;color:#1A1A1A;font-size:13px;">${investmentFocus}</td></tr>`
      : ''

    const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" /></head>
<body style="font-family:Georgia,serif;background:#F5F1EA;padding:32px 16px;">
  <table width="600" align="center" style="max-width:600px;background:#FDFAF6;border:1px solid #DDD8CE;">
    <tr><td style="background:#2D2A26;padding:16px 24px;"><span style="color:#E8E4DC;font-size:15px;">BBI Argentina</span></td></tr>
    <tr><td style="padding:24px;">
      <h2 style="margin:0 0 16px;font-size:17px;color:#2D2A26;font-weight:normal;">New subscription</h2>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#6B7A5E;font-size:13px;width:160px;">Name</td><td style="padding:6px 0;color:#1A1A1A;font-size:13px;">${name}</td></tr>
        <tr><td style="padding:6px 0;color:#6B7A5E;font-size:13px;">Email</td><td style="padding:6px 0;color:#1A1A1A;font-size:13px;">${email}</td></tr>
        ${focusRow}
      </table>
    </td></tr>
  </table>
</body></html>`

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: TEAM_EMAIL,
        subject: `New BBI Argentina subscription - ${email}`,
        html,
        reply_to: email,
      }),
    })
  } catch (err) {
    console.error('[API/subscribe] Team notification error:', err)
  }
}
