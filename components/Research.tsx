import publicationsData from '@/content/publications.json'
import type { Dictionary } from '@/app/[lang]/dictionaries'

interface Publication {
  year: string
  title: string
  journal: string
}

export default function Research({ dict }: { dict: Dictionary }) {
  const publications = publicationsData as Publication[]

  return (
    <section className="sec sec-alt" id="research">
      <div className="sec-head">
        <span className="sec-num">{dict.research.sectionNum}</span>
        <h2 className="sec-title">{dict.research.sectionTitle}</h2>
      </div>
      {publications.map((pub, i) => (
        <div key={i} className="pub-item reveal">
          <div className="p-year">{pub.year}</div>
          <div className="p-body">
            <h3>{pub.title}</h3>
            <div className="p-journal">{pub.journal}</div>
          </div>
          <div className="pub-arr">→</div>
        </div>
      ))}
    </section>
  )
}
