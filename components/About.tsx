export default function About() {
  return (
    <section className="sec sec-alt" id="about">
      <div className="sec-head">
        <span className="sec-num">01</span>
        <h2 className="sec-title">About</h2>
      </div>
      <div className="about-grid">
        <div className="reveal">
          <p className="about-pull">
            &ldquo;Surgery is not just technique — it is trust,{' '}
            <span className="terra">translated into touch.</span>&rdquo;
          </p>
        </div>
        <div className="about-bio reveal reveal-delay-1">
          <p>
            Dr. Aylin Ismayilova is a general surgeon committed to advancing the practice of
            surgery through both technical excellence and compassionate care. With a background in
            evidence-based medicine and a passion for patient outcomes, she bridges cutting-edge
            surgical techniques with human-centered medicine.
          </p>
          <p>
            Her academic work spans minimally invasive procedures, post-operative recovery
            optimization, and surgical education. She believes that the best surgeons are perpetual
            students — of medicine, of their patients, and of themselves.
          </p>
          <p>
            Beyond the operating room, Dr. Ismayilova writes on the intersection of medicine and
            modern life, making complex clinical realities accessible to wider audiences.
          </p>
          <div className="about-tags">
            {['General Surgery', 'Laparoscopy', 'Emergency Surgery', 'Surgical Research', 'Medical Writing'].map(
              (tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
