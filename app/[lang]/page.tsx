import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import ScrollRevealInit from '@/components/ScrollRevealInit'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Research from '@/components/Research'
import Journal from '@/components/Journal'
import Footer from '@/components/Footer'
import { getPosts } from '@/lib/posts'
import { getDictionary, hasLocale } from './dictionaries'

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const posts = getPosts()

  return (
    <>
      <Nav dict={dict} lang={lang} />
      <ScrollRevealInit />
      <Hero dict={dict} />
      <About dict={dict} />
      <Experience dict={dict} />
      <Research dict={dict} />
      <Journal posts={posts} dict={dict} />
      <Footer dict={dict} />
    </>
  )
}
