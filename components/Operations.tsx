import type { OperationMeta } from '@/lib/operations'
import type { Dictionary } from '@/app/[lang]/dictionaries'

interface OperationsProps {
  ops: OperationMeta[]
  dict: Dictionary
}

function formatDate(dateStr: string, lang: string): string {
  const locale = lang === 'az' ? 'az-AZ' : lang === 'de' ? 'de-DE' : 'en-US'
  return new Date(dateStr).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Operations({ ops, dict }: OperationsProps) {
  const lang = dict.lang as string
  const d = dict.operations as {
    sectionNum: string
    sectionTitle: string
    typeLabel: string
    techniqueLabel: string
    durationLabel: string
    outcomeLabel: string
    readMore: string
  }

  return (
    <section className="sec sec-alt" id="operations">
      <div className="sec-head">
        <span className="sec-num">{d.sectionNum}</span>
        <h2 className="sec-title">{d.sectionTitle}</h2>
      </div>
      <div className="ops-list">
        {ops.map((op, i) => (
          <a
            key={op.slug}
            href={`/${lang}/operations/${op.slug}`}
            className={`op-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}
          >
            <div className="op-header">
              <div className="op-meta">
                <span className="op-type">{op.type}</span>
                <span className="op-date">{formatDate(op.date, lang)}</span>
              </div>
              <h3 className="op-title">{op.title}</h3>
              <p className="op-excerpt">{op.excerpt}</p>
            </div>
            <div className="op-stats">
              <div className="op-stat">
                <span className="op-stat-label">{d.techniqueLabel}</span>
                <span className="op-stat-value">{op.technique}</span>
              </div>
              <div className="op-stat">
                <span className="op-stat-label">{d.durationLabel}</span>
                <span className="op-stat-value">{op.duration}</span>
              </div>
              <div className="op-stat">
                <span className="op-stat-label">{d.outcomeLabel}</span>
                <span className="op-stat-value">{op.outcome}</span>
              </div>
            </div>
            <span className="b-link">{d.readMore}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
