'use client'

import { useEffect, useRef } from 'react'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const handler = () => nav.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav id="nav" ref={navRef}>
      <a href="#home" className="nav-logo">
        Dr. Aylin Ismayilova
      </a>
      <ul className="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#research">Research</a></li>
        <li><a href="#blog">Journal</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}
