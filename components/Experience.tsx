import experienceData from '@/content/experience.json'
import type { Dictionary } from '@/app/[lang]/dictionaries'

interface ExperienceEntry {
  years: string
  role: string
  place: string
  description: string
}

export default function Experience({ dict }: { dict: Dictionary }) {
  const entries = experienceData as ExperienceEntry[]

  return (
    <section className="sec" id="experience">
      <div className="sec-head">
        <span className="sec-num">{dict.experience.sectionNum}</span>
        <h2 className="sec-title">{dict.experience.sectionTitle}</h2>
      </div>
      {entries.map((entry, i) => (
        <div key={i} className="timeline-item reveal">
          <div className="t-year" style={{ whiteSpace: 'pre-line' }}>
            {entry.years}
          </div>
          <div className="t-body">
            <h3>{entry.role}</h3>
            <div className="t-place">{entry.place}</div>
            <p>{entry.description}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
