import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Required for Railway/Docker: bundles only necessary files
  output: 'standalone',
  // sharp is a native binary — tell Next.js to resolve it at runtime rather
  // than attempting to bundle it. Works alongside the manual cpSync in the
  // build script that copies sharp into .next/standalone/node_modules/.
  serverExternalPackages: ['sharp'],
  experimental: {
    reactCompiler: false,
  },
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: (() => {
      // Support both R2_ENDPOINT (Railway) and S3_ENDPOINT
      const endpoint = process.env.R2_ENDPOINT ?? process.env.S3_ENDPOINT ?? ''
      if (!endpoint) return []
      const hostname = endpoint.replace(/^https?:\/\//, '').split('/')[0]
      if (!hostname) return []
      return [{ protocol: 'https' as const, hostname }]
    })(),
  },
  // Redirect sold/off-market assets to their category page
  async redirects() {
    return []
  },
}

export default withPayload(nextConfig)
