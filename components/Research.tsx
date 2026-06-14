import publicationsData from '@/content/publications.json'

interface Publication {
  year: string
  title: string
  journal: string
}

export default function Research() {
  const publications = publicationsData as Publication[]

  return (
    <section className="sec sec-alt" id="research">
      <div className="sec-head">
        <span className="sec-num">03</span>
        <h2 className="sec-title">Research &amp; Publications</h2>
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
