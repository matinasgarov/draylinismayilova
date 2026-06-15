import publicationsData from '@/content/publications.json'
import type { Dictionary, Locale } from '@/app/[lang]/dictionaries'

interface Publication {
  year: string
  title: Record<string, string>
  authors?: Record<string, string>
  journal: Record<string, string>
  doi?: string
  summary?: Record<string, string>
  url?: string
}

export default function Research({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const publications = publicationsData as Publication[]

  return (
    <section className="sec sec-alt" id="research">
      <div className="sec-head">
        <span className="sec-num">{dict.research.sectionNum}</span>
        <h2 className="sec-title">{dict.research.sectionTitle}</h2>
      </div>
      {publications.map((pub, i) => {
        const title = pub.title[lang] ?? pub.title.en
        const journal = pub.journal[lang] ?? pub.journal.en
        const authors = pub.authors?.[lang] ?? pub.authors?.en
        const summary = pub.summary?.[lang] ?? pub.summary?.en
        const Wrapper = pub.url ? 'a' : 'div'
        const wrapperProps = pub.url
          ? {
              href: pub.url,
              target: '_blank',
              rel: 'noopener noreferrer',
              style: { textDecoration: 'none', color: 'inherit' },
            }
          : {}

        return (
          <Wrapper key={i} className="pub-item reveal" {...wrapperProps}>
            <div className="p-year">{pub.year}</div>
            <div className="p-body">
              <h3>{title}</h3>
              {authors && <div className="p-authors">{authors}</div>}
              <div className="p-journal">
                {journal}
                {pub.doi && <span className="p-doi"> · doi:{pub.doi}</span>}
              </div>
              {summary && <p className="p-summary">{summary}</p>}
              {pub.url && <span className="p-link">{dict.research.readPaper}</span>}
            </div>
            <div className="pub-arr">→</div>
          </Wrapper>
        )
      })}
    </section>
  )
}
