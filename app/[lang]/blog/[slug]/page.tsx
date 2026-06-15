import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import { getPost, getPosts } from '@/lib/posts'
import { getDictionary, hasLocale, locales } from '../../dictionaries'
import { buildAlternates, OG_LOCALE } from '@/lib/site'

export async function generateStaticParams() {
  const posts = getPosts()
  const params = []
  for (const lang of locales) {
    for (const post of posts) {
      params.push({ lang, slug: post.slug })
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
  const post = await getPost(slug, locale)
  const path = `/blog/${slug}`

  return {
    title: post.title,
    description: post.excerpt,
    alternates: buildAlternates(path, locale),
    openGraph: {
      type: 'article',
      locale: OG_LOCALE[locale],
      url: `/${locale}${path}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  }
}

function formatDate(dateStr: string, lang: string): string {
  const locale = lang === 'az' ? 'az-AZ' : lang === 'de' ? 'de-DE' : 'en-US'
  return new Date(dateStr).toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const post = await getPost(slug, lang)

  return (
    <>
      <Nav dict={dict} lang={lang} />
      <main className="blog-detail">
        <a href={`/${lang}/#blog`} className="blog-detail-back">
          {dict.blog.back}
        </a>
        <div className="blog-detail-meta">
          <span>{formatDate(post.date, lang)}</span>
          <span className="dot" />
          <span>{post.category}</span>
        </div>
        <h1>{post.title}</h1>
        <div
          className="blog-detail-body"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </main>
    </>
  )
}
