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

  secret: process.env.PAYLOAD_SECRET ?? 'fallback-secret-for-dev',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? '',
    },
    push: false, // Use migrations in production
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
            const hostname = process.env.NEXT_PUBLIC_S3_HOSTNAME ?? ''
            return `${hostname}/media/${fname}`
          },
        },
      },
      bucket: process.env.S3_BUCKET ?? '',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
        },
        region: process.env.S3_REGION ?? 'auto',
        endpoint: process.env.S3_ENDPOINT ?? '',
      },
    }),
  ],

  upload: {
    limits: {
      fileSize: 10_000_000, // 10MB max upload
    },
  },

  cors: [
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ],

  csrf: [
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ],

  serverURL: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
})
