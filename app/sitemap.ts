import type { MetadataRoute } from 'next'
import { SITE_URL, LOCALES, DEFAULT_LOCALE } from '@/lib/site'
import { getPosts } from '@/lib/posts'
import { getOperations } from '@/lib/operations'

// Required for `output: 'export'` — emit a static sitemap.xml at build time.
export const dynamic = 'force-static'

// Build the per-locale alternate map for a given path (path starts with '/').
// e.g. languages: { en: '.../en/blog/x', az: '.../az/blog/x', de: '...' }
function languagesFor(path: string): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of LOCALES) {
    languages[locale] = `${SITE_URL}/${locale}${path}`
  }
  return languages
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  // Paths that exist under every locale: '' is the homepage (/[lang]).
  const staticPaths = ['']

  for (const path of staticPaths) {
    entries.push({
      url: `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: path === '' ? 1 : 0.8,
      alternates: { languages: languagesFor(path) },
    })
  }

  // Blog posts — slugs are language-agnostic, content is localized.
  for (const post of getPosts(DEFAULT_LOCALE)) {
    const path = `/blog/${post.slug}`
    entries.push({
      url: `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
      alternates: { languages: languagesFor(path) },
    })
  }

  // Operations — same structure as posts.
  for (const op of getOperations(DEFAULT_LOCALE)) {
    const path = `/operations/${op.slug}`
    entries.push({
      url: `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
      lastModified: op.date ? new Date(op.date) : new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
      alternates: { languages: languagesFor(path) },
    })
  }

  return entries
}
