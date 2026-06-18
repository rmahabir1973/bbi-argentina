import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { sendInquiryConfirmation, sendInquiryNotification } from '@/lib/email/resend'
import { syncInquiryToHubSpot } from '@/lib/crm/hubspot'
import { syncInquiryToPipedrive } from '@/lib/crm/pipedrive'

/**
 * In-memory rate limit store.
 * Max 5 submissions per IP per 10 minutes.
 */
const rateLimitMap = new Map<string, number[]>()
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT_WINDOW_MS
  const timestamps = (rateLimitMap.get(ip) ?? []).filter((t) => t > windowStart)
  if (timestamps.length >= RATE_LIMIT_MAX) return false
  timestamps.push(now)
  rateLimitMap.set(ip, timestamps)
  if (Math.random() < 0.05) {
    for (const [key, ts] of rateLimitMap.entries()) {
      if (ts.every((t) => t <= windowStart)) rateLimitMap.delete(key)
    }
  }
  return true
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

/**
 * POST /api/inquiries
 *
 * Accepts FormData or JSON.
 * Validates required fields, saves to Payload CMS, sends emails, optionally syncs CRM.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(req)
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, message: 'Too many submissions. Please wait before trying again.' },
      { status: 429 },
    )
  }

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

    const { fullName, email, inquiryType } = fields

    if (!fullName?.trim()) {
      return NextResponse.json({ success: false, message: 'Full name is required.' }, { status: 400 })
    }
    if (!email?.trim()) {
      return NextResponse.json({ success: false, message: 'Email address is required.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: 'A valid email address is required.' }, { status: 400 })
    }
    if (!inquiryType?.trim()) {
      return NextResponse.json({ success: false, message: 'Inquiry type is required.' }, { status: 400 })
    }

    const payload = await getPayload({ config: configPromise })

    await payload.create({
      collection: 'inquiries',
      data: {
        inquiryType: inquiryType as
          | 'property-inquiry'
          | 'advisory-support'
          | 'execution-planning'
          | 'residency-citizenship'
          | 'general-inquiry'
          | 'qualification-request'
          | 'off-market-criteria'
          | 'newsletter'
          | 'project-scope',
        fullName: fullName.trim(),
        entityName: fields.entityName?.trim() || undefined,
        email: email.trim().toLowerCase(),
        phone: fields.phone?.trim() || undefined,
        country: fields.country?.trim() || undefined,
        description: fields.description?.trim() || undefined,
        preferredResponseMethod: (fields.preferredResponseMethod as 'email' | 'phone' | 'whatsapp') || undefined,
        status: 'new',
        crmSyncState: 'pending',
      },
    })

    void sendInquiryConfirmation(email.trim().toLowerCase(), fullName.trim(), inquiryType)
    void sendInquiryNotification(fields)

    const crmProvider = process.env.CRM_PROVIDER
    if (crmProvider === 'hubspot') {
      void syncInquiryToHubSpot(fields).catch((err) => {
        console.error('[API/inquiries] HubSpot sync error:', err)
      })
    } else if (crmProvider === 'pipedrive') {
      void syncInquiryToPipedrive(fields).catch((err) => {
        console.error('[API/inquiries] Pipedrive sync error:', err)
      })
    }

    return NextResponse.json({ success: true, message: 'Inquiry received.' })
  } catch (err) {
    console.error('[API/inquiries] POST error:', err)
    return NextResponse.json(
      { success: false, message: 'Unable to process inquiry.' },
      { status: 500 },
    )
  }
}
