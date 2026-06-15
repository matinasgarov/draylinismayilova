'use client'

import { useState } from 'react'
import type { Dictionary } from '@/app/[lang]/dictionaries'

export default function Contact({ dict }: { dict: Dictionary }) {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    setError(false)
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setSent(true)
    } catch {
      setError(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="sec" id="contact">
      <div className="sec-head">
        <span className="sec-num">{dict.contact.sectionNum}</span>
        <h2 className="sec-title">{dict.contact.sectionTitle}</h2>
      </div>
      <div className="contact-layout">
        <div className="contact-info reveal">
          <p className="contact-sub">{dict.contact.subtitle}</p>
          <div className="contact-details">
            <a href="mailto:dr.aylin@email.com" className="contact-link">
              dr.aylin@email.com
            </a>
            <span className="contact-loc">Baku, Azerbaijan</span>
          </div>
          <div className="contact-socials">
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">ResearchGate</a>
            <a href="#" className="social-link">Google Scholar</a>
          </div>
        </div>

        <div className="contact-form-wrap reveal reveal-delay-1">
          {sent ? (
            <div className="contact-thanks">
              <p>{dict.contact.thanks}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder={dict.contact.namePlaceholder}
                  required
                  className="form-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={dict.contact.emailPlaceholder}
                  required
                  className="form-input"
                />
              </div>
              <textarea
                name="message"
                placeholder={dict.contact.messagePlaceholder}
                required
                rows={5}
                className="form-input form-textarea"
              />
              <button type="submit" className="btn-outline form-submit" disabled={sending}>
                {sending ? '…' : dict.contact.send}
              </button>
              {error && <p className="form-error">{dict.contact.error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
