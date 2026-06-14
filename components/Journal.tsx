import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'
import type { Dictionary } from '@/app/[lang]/dictionaries'

interface JournalProps {
  posts: PostMeta[]
  dict: Dictionary
}

function formatDate(dateStr: string, lang: string): string {
  const locale = lang === 'az' ? 'az-AZ' : lang === 'de' ? 'de-DE' : 'en-US'
  return new Date(dateStr).toLocaleDateString(locale, { month: 'long', year: 'numeric' })
}

export default function Journal({ posts, dict }: JournalProps) {
  const lang = dict.lang as string
  return (
    <section className="sec" id="blog">
      <div className="sec-head">
        <span className="sec-num">{dict.journal.sectionNum}</span>
        <h2 className="sec-title">{dict.journal.sectionTitle}</h2>
      </div>
      <div className="blog-grid">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/${lang}/blog/${post.slug}`}
            className={`blog-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}
          >
            <div className="b-meta">
              <span>{formatDate(post.date, lang)}</span>
              <span className="dot" />
              <span>{post.category}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <span className="b-link">{dict.journal.readEssay}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
