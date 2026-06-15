import type { Dictionary } from '@/app/[lang]/dictionaries'
import ScrambleText from './ScrambleText'

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="hero" id="home">
      {/* Floating medical cross — top-right of left panel */}
      <svg className="hero-deco hero-deco-cross" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="15" y="2" width="10" height="36" rx="2" fill="currentColor"/>
        <rect x="2" y="15" width="36" height="10" rx="2" fill="currentColor"/>
      </svg>

      {/* Stethoscope outline — bottom-left corner */}
      <svg className="hero-deco hero-deco-steth" viewBox="0 0 64 80" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 4 C12 4 8 4 8 12 L8 36 C8 52 20 60 32 60 C44 60 56 52 56 36 L56 20" />
        <circle cx="56" cy="14" r="6" />
        <circle cx="56" cy="14" r="2.5" fill="currentColor" stroke="none"/>
        <line x1="20" y1="4" x2="12" y2="4" />
        <line x1="20" y1="4" x2="20" y2="14" />
        <line x1="12" y1="4" x2="12" y2="14" />
      </svg>

      {/* Subtle pill / capsule shape */}
      <svg className="hero-deco hero-deco-pill" viewBox="0 0 60 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <rect x="1.5" y="1.5" width="57" height="21" rx="10.5" />
        <line x1="30" y1="1.5" x2="30" y2="22.5" />
      </svg>

      {/* DNA helix dots */}
      <svg className="hero-deco hero-deco-dna" viewBox="0 0 24 120" fill="none" aria-hidden="true">
        {[0,1,2,3,4,5,6,7,8].map((i) => {
          const y = 6 + i * 13
          const wave = Math.sin(i * 0.9) * 8
          return (
            <g key={i}>
              <circle cx={12 + wave} cy={y} r="2.5" fill="currentColor" opacity={0.6 - i * 0.04}/>
              <circle cx={12 - wave} cy={y} r="2.5" fill="currentColor" opacity={0.6 - i * 0.04}/>
              <line x1={12 + wave} y1={y} x2={12 - wave} y2={y} stroke="currentColor" strokeWidth="1" opacity="0.25"/>
            </g>
          )
        })}
      </svg>

      <div className="hero-left">
        <h1 className="hero-name">
          <em>Dr.Aylin</em>
          <ScrambleText text="Ismayilova" delay={300} duration={2400} className="last" />
        </h1>
        <p className="hero-tagline">
          {dict.hero.tagline1}
          <br />
          {dict.hero.tagline2}
          <br />
          {dict.hero.tagline3}
        </p>
        <div className="hero-cta-row">
          <a href="#about" className="btn-outline">
            {dict.hero.cta} →
          </a>
          <div className="scroll-hint">
            <div className="bar" />
            <span>{dict.hero.scroll}</span>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <img
          src="/uploads/photo-1781454037417.jpeg"
          alt="Dr. Aylin Ismayilova, medical doctor"
          fetchPriority="high"
          decoding="async"
          width="1066"
          height="1600"
        />
      </div>
    </section>
  )
}
