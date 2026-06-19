import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { resendAdapter } from '@payloadcms/email-resend'
// Collections
import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Assets } from './payload/collections/Assets'
import { AssetClasses } from './payload/collections/AssetClasses'
import { Provinces } from './payload/collections/Provinces'
import { Articles } from './payload/collections/Articles'
import { FAQs } from './payload/collections/FAQs'
import { ServicePages } from './payload/collections/ServicePages'
import { Inquiries } from './payload/collections/Inquiries'
import { Pages } from './payload/collections/Pages'

// Globals
import { SiteSettings } from './payload/globals/SiteSettings'
import { Navigation } from './payload/globals/Navigation'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// ── Runtime env reader ───────────────────────────────────────────────────────
// IMPORTANT: read via computed access (process.env[key]) — never a bare static
// `process.env.PAYLOAD_SECRET`. A static reference can be inlined/baked at BUILD
// time by the bundler; if the var is absent in the build container it bakes in
// as empty, and Payload then inits with an empty secret at runtime even though
// the variable is set in the running process. Computed access can't be inlined,
// so it always resolves against the live runtime environment.
const env = (key: string): string | undefined => process.env[key]

// ── Validate required env vars at startup (fail fast, not silently) ──────────
const requiredEnvVars = ['PAYLOAD_SECRET', 'DATABASE_URI'] as const
for (const key of requiredEnvVars) {
  if (!env(key)) {
    throw new Error(
      `[payload.config] Missing required environment variable: ${key}. ` +
        `Set it in your Railway environment panel (or .env.local for local dev).`,
    )
  }
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — BBI Argentina CMS',
    },
  },

  collections: [
    Users,
    Media,
    Assets,
    AssetClasses,
    Provinces,
    Articles,
    FAQs,
    ServicePages,
    Inquiries,
    Pages,
  ],

  globals: [
    SiteSettings,
    Navigation,
  ],

  editor: lexicalEditor(),

  // PAYLOAD_SECRET is validated above — guaranteed to be a non-empty string here.
  // Read via env() (computed access) so the value resolves at runtime, not baked
  // at build time. This is the fix for "missing secret key" on Railway/standalone.
  secret: env('PAYLOAD_SECRET')!,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: env('DATABASE_URI') ?? '',
    },
    // push: true auto-creates tables on first run (safe for initial deploy)
    push: true,
  }),

  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_DEFAULT_FROM ?? 'noreply@bbiargentina.com',
    defaultFromName: 'BBI Argentina',
    apiKey: process.env.RESEND_API_KEY ?? '',
  }),

  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
          generateFileURL: ({ filename: fname }) => {
            // Support both R2_PUBLIC_URL (Railway) and NEXT_PUBLIC_S3_HOSTNAME
            const hostname =
              process.env.R2_PUBLIC_URL ??
              process.env.NEXT_PUBLIC_S3_HOSTNAME ??
              ''
            return hostname ? `${hostname}/media/${fname}` : `/media/${fname}`
          },
        },
      },
      // Support both R2_BUCKET_NAME (Railway) and S3_BUCKET
      bucket: process.env.R2_BUCKET_NAME ?? process.env.S3_BUCKET ?? '',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId:
            process.env.R2_ACCESS_KEY_ID ?? process.env.S3_ACCESS_KEY_ID ?? '',
          secretAccessKey:
            process.env.R2_SECRET_ACCESS_KEY ?? process.env.S3_SECRET_ACCESS_KEY ?? '',
        },
        region: process.env.S3_REGION ?? 'auto',
        // Support both R2_ENDPOINT (Railway) and S3_ENDPOINT
        endpoint: process.env.R2_ENDPOINT ?? process.env.S3_ENDPOINT ?? '',
      },
    }),
  ],

  upload: {
    limits: {
      fileSize: 10_000_000, // 10MB max upload
    },
  },

  cors: [
    // Support both NEXT_PUBLIC_SERVER_URL (Railway) and NEXT_PUBLIC_SITE_URL
    process.env.NEXT_PUBLIC_SERVER_URL ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      'http://localhost:3000',
  ],

  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      'http://localhost:3000',
  ],

  serverURL:
    process.env.NEXT_PUBLIC_SERVER_URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    'http://localhost:3000',
})
