import type { Dictionary } from '@/app/[lang]/dictionaries'

export default function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer>
      <div className="footer-name">
        <em>Aylin</em>
        <br />
        Ismayilova
      </div>
      <div className="footer-cols">
        <div className="f-col">
          <h4>{dict.footer.specialtyTitle}</h4>
          <p>{dict.footer.specialty1}</p>
          <p>{dict.footer.specialty2}</p>
          <p>{dict.footer.specialty3}</p>
        </div>
        <div className="f-col">
          <h4>{dict.footer.contactTitle}</h4>
          <a href="mailto:dr.aylin@email.com">dr.aylin@email.com</a>
          <a href="#">LinkedIn</a>
          <a href="#">ResearchGate</a>
          <a href="#">Google Scholar</a>
        </div>
        <div className="f-col">
          <h4>{dict.footer.locationTitle}</h4>
          <p>{dict.footer.location1}</p>
          <p>{dict.footer.location2}</p>
        </div>
      </div>
      <div className="footer-copy">
        <span>{dict.footer.copyright}</span>
        <span>{dict.footer.tagline}</span>
      </div>
    </footer>
  )
}
