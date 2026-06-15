import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import { getOperation, getOperations } from '@/lib/operations'
import { getDictionary, hasLocale, locales } from '../../dictionaries'
import { buildAlternates, OG_LOCALE } from '@/lib/site'

export async function generateStaticParams() {
  const ops = getOperations()
  const params = []
  for (const lang of locales) {
    for (const op of ops) {
      params.push({ lang, slug: op.slug })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = hasLocale(lang) ? lang : 'en'
  const op = await getOperation(slug, locale)
  const path = `/operations/${slug}`

  return {
    title: op.title,
    description: op.excerpt,
    alternates: buildAlternates(path, locale),
    openGraph: {
      type: 'article',
      locale: OG_LOCALE[locale],
      url: `/${locale}${path}`,
      title: op.title,
      description: op.excerpt,
      publishedTime: op.date,
    },
  }
}

function formatDate(dateStr: string, lang: string): string {
  const locale = lang === 'az' ? 'az-AZ' : lang === 'de' ? 'de-DE' : 'en-US'
  return new Date(dateStr).toLocaleDateString(locale, {
    month: 'long', day: 'numeric', year: 'numeric',
  })
}

export default async function OperationPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const op = await getOperation(slug, lang)
  const d = dict.operations as {
    techniqueLabel: string
    durationLabel: string
    outcomeLabel: string
    back: string
  }

  return (
    <>
      <Nav dict={dict} lang={lang} />
      <main className="blog-detail">
        <a href={`/${lang}/#operations`} className="blog-detail-back">
          {d.back}
        </a>
        <div className="blog-detail-meta">
          <span>{formatDate(op.date, lang)}</span>
          <span className="dot" />
          <span>{op.type}</span>
        </div>
        <h1>{op.title}</h1>
        <div className="op-detail-stats">
          <div className="op-detail-stat">
            <span className="op-stat-label">{d.techniqueLabel}</span>
            <span className="op-stat-value">{op.technique}</span>
          </div>
          <div className="op-detail-stat">
            <span className="op-stat-label">{d.durationLabel}</span>
            <span className="op-stat-value">{op.duration}</span>
          </div>
          <div className="op-detail-stat">
            <span className="op-stat-label">{d.outcomeLabel}</span>
            <span className="op-stat-value">{op.outcome}</span>
          </div>
        </div>
        <div
          className="blog-detail-body"
          dangerouslySetInnerHTML={{ __html: op.contentHtml }}
        />
      </main>
    </>
  )
}
