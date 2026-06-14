import type { Dictionary } from '@/app/[lang]/dictionaries'

export default function About({ dict }: { dict: Dictionary }) {
  return (
    <section className="sec sec-alt" id="about">
      <div className="sec-head">
        <span className="sec-num">{dict.about.sectionNum}</span>
        <h2 className="sec-title">{dict.about.sectionTitle}</h2>
      </div>
      <div className="about-grid">
        <div className="reveal">
          <p className="about-pull">
            &ldquo;{dict.about.pullQuote}{' '}
            <span className="terra">{dict.about.pullQuoteAccent}&rdquo;</span>
          </p>
        </div>
        <div className="about-bio reveal reveal-delay-1">
          <p>{dict.about.bio1}</p>
          <p>{dict.about.bio2}</p>
          <p>{dict.about.bio3}</p>
          <div className="about-tags">
            {(dict.about.tags as string[]).map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
