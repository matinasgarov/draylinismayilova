'use client'

import { useEffect, useRef, useState } from 'react'
import type { Dictionary } from '@/app/[lang]/dictionaries'

interface NavProps {
  dict: Dictionary
  lang: string
}

export default function Nav({ dict, lang }: NavProps) {
  const navRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const handler = () => nav.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const otherLangs = ['en', 'az', 'de'].filter((l) => l !== lang)
  const operations = (dict.nav as { operations: string }).operations

  const close = () => setOpen(false)

  const links = [
    { href: `/${lang}/#about`, label: dict.nav.about },
    { href: `/${lang}/#experience`, label: dict.nav.experience },
    { href: `/${lang}/#research`, label: dict.nav.research },
    { href: `/${lang}/#blog`, label: dict.nav.journal },
    { href: `/${lang}/#operations`, label: operations },
    { href: `/${lang}/#contact`, label: dict.nav.contact },
  ]

  return (
    <nav id="nav" ref={navRef}>
      <ul className="nav-links nav-links-left">
        <li><a href={`/${lang}/#about`}>{dict.nav.about}</a></li>
        <li><a href={`/${lang}/#experience`}>{dict.nav.experience}</a></li>
        <li><a href={`/${lang}/#research`}>{dict.nav.research}</a></li>
      </ul>
      <a href={`/${lang}/#home`} className="nav-logo">
        <img src="/images/logo.png" alt={dict.nav.logo} className="nav-logo-mark" />
      </a>
      <ul className="nav-links nav-links-right">
        <li><a href={`/${lang}/#blog`}>{dict.nav.journal}</a></li>
        <li><a href={`/${lang}/#operations`}>{operations}</a></li>
        <li><a href={`/${lang}/#contact`}>{dict.nav.contact}</a></li>
        <li className="nav-lang-item">
          <div className="lang-switcher">
            <span className="lang-current">{lang.toUpperCase()}</span>
            <div className="lang-dropdown">
              <div className="lang-dropdown-inner">
                {otherLangs.map((l) => (
                  <a key={l} href={`/${l}/`} className="lang-option">
                    {l.toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* Hamburger — visible on mobile only */}
      <button
        type="button"
        className={`nav-hamburger${open ? ' is-open' : ''}`}
        aria-label="Menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>

      {/* Mobile drawer */}
      <div
        className={`nav-mobile${open ? ' is-open' : ''}`}
        onClick={close}
      >
        <ul className="nav-mobile-links" onClick={(e) => e.stopPropagation()}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={close}>{link.label}</a>
            </li>
          ))}
          <li className="nav-mobile-langs">
            <a href={`/${lang}/`} className="is-current" onClick={close}>
              {lang.toUpperCase()}
            </a>
            {otherLangs.map((l) => (
              <a key={l} href={`/${l}/`} onClick={close}>
                {l.toUpperCase()}
              </a>
            ))}
          </li>
        </ul>
      </div>
    </nav>
  )
}
