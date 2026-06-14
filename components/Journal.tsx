import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

interface JournalProps {
  posts: PostMeta[]
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function Journal({ posts }: JournalProps) {
  return (
    <section className="sec" id="blog">
      <div className="sec-head">
        <span className="sec-num">04</span>
        <h2 className="sec-title">Journal</h2>
      </div>
      <div className="blog-grid">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`blog-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}
          >
            <div className="b-meta">
              <span>{formatDate(post.date)}</span>
              <span className="dot" />
              <span>{post.category}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <span className="b-link">Read essay →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
