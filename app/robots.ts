import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// Required for `output: 'export'` — emit a static robots.txt at build time.
export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  // Clean, standard allow-all. We intentionally omit the non-standard
  // `Host:` directive — Google ignores it and it only adds noise.
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
