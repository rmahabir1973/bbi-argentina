import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: process.env.S3_ENDPOINT
      ? [
          {
            protocol: 'https' as const,
            hostname: process.env.S3_ENDPOINT.replace(/^https?:\/\//, ''),
          },
        ]
      : [],
  },
  // Redirect sold/off-market assets to their category page
  async redirects() {
    return []
  },
}

export default withPayload(nextConfig)