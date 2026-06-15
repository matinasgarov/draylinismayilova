import type { Dictionary } from '@/app/[lang]/dictionaries'
import ScrambleText from './ScrambleText'

export default function Stats({ dict }: { dict: Dictionary }) {
  const stats = [
    { value: '100+', label: dict.stats.operationsLabel },
    { value: '500+', label: dict.stats.patientsLabel },
    { value: '90+', label: dict.stats.gradeLabel },
  ]

  return (
    <div className="stats-strip">
      {stats.map((s, i) => (
        <div key={i} className="stat-item reveal">
          <span className="stat-value">
            <ScrambleText
              text={s.value}
              chars="0123456789"
              delay={200 + i * 150}
              duration={900}
            />
          </span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
