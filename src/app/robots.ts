import type { MetadataRoute } from 'next'

/**
 * Next.js 15 robots.txt generator.
 * All public crawlers are allowed. Admin, API and Payload routes are blocked.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/(payload)'],
      },
    ],
    sitemap: 'https://www.bbiargentina.com/sitemap.xml',
  }
}
