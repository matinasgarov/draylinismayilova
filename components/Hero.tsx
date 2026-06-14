import type { Dictionary } from '@/app/[lang]/dictionaries'

export default function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <div className="hero-eyebrow">{dict.hero.eyebrow}</div>
        <h1 className="hero-name">
          <em>Aylin</em>
          <span className="last">Ismayilova</span>
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
          alt="Dr. Aylin Ismayilova, General Surgeon"
        />
      </div>
    </section>
  )
}
