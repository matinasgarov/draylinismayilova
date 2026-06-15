// ── Site-wide config used for SEO (sitemap, robots, canonical, hreflang) ──
//
// EDIT THESE TWO VALUES before deploying:
//
// 1. SITE_URL — your production domain, no trailing slash.
//    Example: 'https://draylinismayilova.com'
//
// 2. GOOGLE_SITE_VERIFICATION — the token from Google Search Console.
//    In GSC choose "HTML tag" verification; it gives you a tag like
//    <meta name="google-site-verification" content="AbC123..." />
//    Paste ONLY the content value (AbC123...) below. Leave '' until you have it.

export const SITE_URL = 'https://draylinismayilova.com'

export const GOOGLE_SITE_VERIFICATION = ''

// The default/primary language for canonical URLs and x-default hreflang.
export const DEFAULT_LOCALE = 'en'
export const LOCALES = ['en', 'az', 'de'] as const

// Map our locale codes to BCP-47 tags used by hreflang / og:locale.
export const OG_LOCALE: Record<string, string> = {
  en: 'en_US',
  az: 'az_AZ',
  de: 'de_DE',
}

// Build canonical + hreflang alternates for a page.
// `path` is the part after the locale, starting with '/', '' for the homepage.
export function buildAlternates(path: string, locale: string) {
  const languages: Record<string, string> = {}
  for (const l of LOCALES) {
    languages[l] = `${SITE_URL}/${l}${path}`
  }
  languages['x-default'] = `${SITE_URL}/${DEFAULT_LOCALE}${path}`
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages,
  }
}
