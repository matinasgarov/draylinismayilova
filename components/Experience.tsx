import experienceData from '@/content/experience.json'
import type { Dictionary, Locale } from '@/app/[lang]/dictionaries'

interface ExperienceEntry {
  years: Record<string, string>
  role: Record<string, string>
  place: Record<string, string>
  description: Record<string, string>
  logo?: string
}

export default function Experience({ dict }: { dict: Dictionary }) {
  const lang = dict.lang as Locale
  const entries = experienceData as ExperienceEntry[]
  const pick = (field: Record<string, string>) => field[lang] ?? field.en

  return (
    <section className="sec" id="experience">
      <div className="sec-head">
        <span className="sec-num">{dict.experience.sectionNum}</span>
        <h2 className="sec-title">{dict.experience.sectionTitle}</h2>
      </div>
      {entries.map((entry, i) => (
        <div key={i} className="timeline-item reveal">
          <div className="t-year" style={{ whiteSpace: 'pre-line' }}>
            {pick(entry.years)}
          </div>
          <div className="t-body">
            <div className="t-head">
              <div>
                <h3>{pick(entry.role)}</h3>
                <div className="t-place">{pick(entry.place)}</div>
              </div>
              {entry.logo && <img src={entry.logo} alt="" className="t-logo" />}
            </div>
            <p>{pick(entry.description)}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
