import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import ScrollRevealInit from '@/components/ScrollRevealInit'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Research from '@/components/Research'
import Journal from '@/components/Journal'
import Operations from '@/components/Operations'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'
import { getPosts } from '@/lib/posts'
import { getOperations } from '@/lib/operations'
import { getDictionary, hasLocale } from './dictionaries'
import { buildAlternates, OG_LOCALE } from '@/lib/site'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale = hasLocale(lang) ? lang : 'en'
  const dict = await getDictionary(locale)
  const description = dict.about.bio1

  return {
    description,
    alternates: buildAlternates('', locale),
    openGraph: {
      locale: OG_LOCALE[locale],
      url: `/${locale}`,
      description,
    },
  }
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const posts = getPosts(lang)
  const ops = getOperations(lang)

  return (
    <>
      <Nav dict={dict} lang={lang} />
      <ScrollRevealInit />
      <Hero dict={dict} />
      <Stats dict={dict} />
      <About dict={dict} />
      <Experience dict={dict} />
      <Research dict={dict} lang={lang} />
      <Journal posts={posts} dict={dict} />
      <Operations ops={ops} dict={dict} />
      <Contact dict={dict} />
      <Footer dict={dict} />
    </>
  )
}
