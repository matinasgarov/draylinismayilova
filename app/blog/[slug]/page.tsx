import Nav from '@/components/Nav'
import { getPost, getPosts } from '@/lib/posts'

export async function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return (
    <>
      <Nav />
      <main className="blog-detail">
        <a href="/#blog" className="blog-detail-back">
          ← Back to Journal
        </a>
        <div className="blog-detail-meta">
          <span>{formatDate(post.date)}</span>
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
