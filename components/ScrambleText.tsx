'use client'
import { useEffect, useRef } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export default function ScrambleText({
  text,
  delay = 200,
  duration = 1000,
  className,
  chars = CHARS,
}: {
  text: string
  delay?: number
  duration?: number
  className?: string
  chars?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf: number
    let startTime: number | null = null

    const tick = (now: number) => {
      if (startTime === null) startTime = now
      const t = Math.min((now - startTime) / duration, 1)

      let out = ''
      for (let i = 0; i < text.length; i++) {
        out += i / text.length < t
          ? text[i]
          : chars[Math.floor(Math.random() * chars.length)]
      }
      el.textContent = out

      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        el.textContent = text
      }
    }

    const id = setTimeout(() => { raf = requestAnimationFrame(tick) }, delay)
    return () => { clearTimeout(id); cancelAnimationFrame(raf) }
  }, [text, delay, duration, chars])

  // Hidden span reserves the exact final-text width so layout never shifts.
  // Scramble span sits absolutely on top.
  return (
    <span className={className} style={{ position: 'relative' }}>
      <span style={{ visibility: 'hidden' }}>{text}</span>
      <span
        ref={ref}
        aria-hidden="true"
        style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap' }}
      >
        {text}
      </span>
    </span>
  )
}
