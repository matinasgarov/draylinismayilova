export default function Footer() {
  return (
    <footer id="contact">
      <div className="footer-name">
        <em>Aylin</em>
        <br />
        Ismayilova
      </div>
      <div className="footer-cols">
        <div className="f-col">
          <h4>Specialty</h4>
          <p>General Surgery</p>
          <p>Minimally Invasive Procedures</p>
          <p>Emergency Surgery</p>
        </div>
        <div className="f-col">
          <h4>Contact</h4>
          <a href="mailto:dr.aylin@email.com">dr.aylin@email.com</a>
          <a href="#">LinkedIn</a>
          <a href="#">ResearchGate</a>
          <a href="#">Google Scholar</a>
        </div>
        <div className="f-col">
          <h4>Location</h4>
          <p>Baku, Azerbaijan</p>
          <p>
            Available for academic
            <br />
            collaborations worldwide
          </p>
        </div>
      </div>
      <div className="footer-copy">
        <span>© 2026 Dr. Aylin Ismayilova. All rights reserved.</span>
        <span>General Surgeon · Researcher · Writer</span>
      </div>
    </footer>
  )
}
