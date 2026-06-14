'use client'

import { useEffect, useRef } from 'react'
import type { Dictionary } from '@/app/[lang]/dictionaries'

interface NavProps {
  dict: Dictionary
  lang: string
}

export default function Nav({ dict, lang }: NavProps) {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const handler = () => nav.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const otherLangs = ['en', 'az', 'de'].filter((l) => l !== lang)

  return (
    <nav id="nav" ref={navRef}>
      <a href={`/${lang}/#home`} className="nav-logo">
        {dict.nav.logo}
      </a>
      <ul className="nav-links">
        <li><a href={`/${lang}/#about`}>{dict.nav.about}</a></li>
        <li><a href={`/${lang}/#experience`}>{dict.nav.experience}</a></li>
        <li><a href={`/${lang}/#research`}>{dict.nav.research}</a></li>
        <li><a href={`/${lang}/#blog`}>{dict.nav.journal}</a></li>
        <li><a href={`/${lang}/#contact`}>{dict.nav.contact}</a></li>
      </ul>
      <div className="lang-switcher">
        <span className="lang-current">{lang.toUpperCase()}</span>
        <div className="lang-dropdown">
          {otherLangs.map((l) => (
            <a key={l} href={`/${l}/`} className="lang-option">
              {l.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
