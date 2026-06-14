import Nav from '@/components/Nav'
import ScrollRevealInit from '@/components/ScrollRevealInit'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Research from '@/components/Research'
import Journal from '@/components/Journal'
import Footer from '@/components/Footer'
import { getPosts } from '@/lib/posts'

export default function Home() {
  const posts = getPosts()

  return (
    <>
      <Nav />
      <ScrollRevealInit />
      <Hero />
      <About />
      <Experience />
      <Research />
      <Journal posts={posts} />
      <Footer />
    </>
  )
}
