export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-left">
        <div className="hero-eyebrow">General Surgeon</div>
        <h1 className="hero-name">
          <em>Aylin</em>
          <span className="last">Ismayilova</span>
        </h1>
        <p className="hero-tagline">
          Precision in the operating room.
          <br />
          Clarity in every consultation.
          <br />
          Dedication to every patient.
        </p>
        <div className="hero-cta-row">
          <a href="#about" className="btn-outline">
            Read more →
          </a>
          <div className="scroll-hint">
            <div className="bar" />
            <span>Scroll</span>
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
