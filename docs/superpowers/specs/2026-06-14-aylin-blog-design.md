# Design Spec: Dr. Aylin Ismayilova — Personal Website

**Date:** 2026-06-14  
**Stack:** Next.js (App Router) · Static Export · Netlify  
**Source:** High-fidelity HTML prototype + design handoff README

---

## Overview

A single-page scrollable portfolio and blog for Dr. Aylin Ismayilova, a General Surgeon based in Baku, Azerbaijan. Five content sections (Hero, About, Experience & Education, Research & Publications, Journal) plus a dark footer. Blog posts have dedicated detail pages. Content is managed by editing Markdown and JSON files.

---

## Project Structure

```
aylinblog/
├── app/
│   ├── page.tsx                  ← single-page site (all 5 sections)
│   ├── blog/[slug]/page.tsx      ← individual blog post pages
│   ├── layout.tsx                ← font imports, metadata, html/body
│   └── globals.css               ← design tokens, reset, base styles
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Research.tsx
│   ├── Journal.tsx
│   └── Footer.tsx
├── content/
│   ├── posts/                    ← one .md file per blog post
│   │   └── the-surgeons-hands.md
│   ├── publications.json
│   └── experience.json
├── lib/
│   └── posts.ts                  ← helpers: getPosts(), getPost(slug)
├── public/
│   └── uploads/
│       └── photo-1781454037417.jpeg
└── next.config.js                ← output: 'export'
```

---

## Design Tokens

All tokens defined as CSS custom properties in `globals.css`.

### Colors
| Token | Value | Usage |
|---|---|---|
| `--cream` | `oklch(97.5% 0.009 68)` | Page background |
| `--sand` | `oklch(92% 0.018 68)` | Alternate section background |
| `--dark` | `oklch(14% 0.010 48)` | Primary text, footer bg |
| `--mid` | `oklch(40% 0.018 52)` | Body text, secondary text |
| `--muted` | `oklch(63% 0.014 58)` | Labels, eyebrows, metadata |
| `--rule` | `oklch(86% 0.012 62)` | Dividers, borders |
| `--terra` | `oklch(55% 0.110 33)` | Accent — terracotta |
| `--terra-light` | `oklch(90% 0.040 33)` | Accent tag borders |

### Typography
| Token | Value |
|---|---|
| `--serif` | `'Cormorant Garamond', Georgia, serif` |
| `--sans` | `'DM Sans', system-ui, sans-serif` |

Google Fonts import (in `layout.tsx`):
```
https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap
```

### Spacing
| Token | Value |
|---|---|
| `--px` | `clamp(1.5rem, 7vw, 9rem)` |
| `--gap` | `clamp(5rem, 10vh, 9rem)` |

No border-radius anywhere. No box shadows — depth from color contrast and thin borders only.

---

## Pages & Routing

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Full scrollable single page |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Individual blog post |

`next.config.js` sets `output: 'export'` for Netlify static deployment. `generateStaticParams` in the blog detail page pre-renders all post slugs at build time.

---

## Content Model

### Blog Posts — `content/posts/*.md`

Frontmatter:
```yaml
---
title: "The Surgeon's Hands"
date: "2025-05-01"
category: "Reflections"
excerpt: "On the weight of what our hands carry..."
slug: "the-surgeons-hands"
---
```
Body: full Markdown, rendered on the detail page via `remark`/`remark-html`.

**To add a post:** create a new `.md` file. The Journal section and `/blog/[slug]` pages pick it up automatically at build time.

### Publications — `content/publications.json`

```json
[
  { "year": "2024", "title": "Minimally Invasive Techniques...", "journal": "Surgical Endoscopy" }
]
```

### Experience — `content/experience.json`

```json
[
  { "years": "2024 –\nPresent", "role": "Surgical Resident, General Surgery", "place": "Department of Surgery · University Hospital", "description": "..." }
]
```

Everything else (About bio, specialty tags, contact links, footer copy) lives directly in its component file.

---

## Sections

### Nav
Fixed, full-width, `z-index: 200`. Default: transparent. Scrolled (>40px): cream at 93% opacity + `backdrop-filter: blur(14px)` + bottom border. Logo is italic serif. Nav links uppercase sans with terracotta underline slide-in on hover. Mobile (<960px): nav links hidden.

### Hero
CSS Grid `1fr 1fr`, `min-height: 100svh`. Left: eyebrow label, large name (italic first name + roman last name), italic tagline, CTA button + animated scroll hint bar. Right: portrait photo (`object-fit: cover`, `object-position: 50% 10%`) with left-edge cream gradient overlay. Mobile: photo stacks above text with bottom-fade gradient.

### About (Section 01)
Sand background. Left column: large italic pull quote with last three words in terracotta. Right column: 3 bio paragraphs + specialty tags. Both columns scroll-reveal with stagger.

### Experience & Education (Section 02)
Cream background. Timeline rows: `grid-template-columns: 9rem 1fr`. Year · Role · Institution · Description. First and last rows have top/bottom borders.

### Research & Publications (Section 03)
Sand background. Publication rows: `grid-template-columns: 4.5rem 1fr 2rem`. Year · Title + Journal · Arrow. Hover: sand background tint + arrow shifts right and turns terracotta.

### Journal (Section 04)
Cream background. 3-column card grid. Each card: meta (date + dot + category), title, excerpt, "Read essay →" link. Cards hover: terracotta border + lift (-3px). Link arrow gap expands on hover. Mobile: single column.

### Footer
Dark background. Large name in serif (italic first, roman last). Three-column grid: Specialty / Contact / Location. Copyright bar with space-between layout. Mobile: 2-col then 1-col.

---

## Interactions

| Interaction | Implementation |
|---|---|
| Sticky nav | `scroll` event listener, toggle `.scrolled` class at `scrollY > 40` |
| Scroll reveal | `IntersectionObserver` on `.reveal` elements, adds `.in` class (threshold 0.08, rootMargin -40px bottom) |
| Reveal stagger | Utility classes `.reveal-delay-1/2/3` (0.1s / 0.2s / 0.3s delays) |
| Hero scroll bar | CSS `@keyframes slide` on `::after` pseudo-element, 2.2s infinite |
| Smooth scroll | `html { scroll-behavior: smooth }` + anchor `href="#id"` |
| Nav underline | `scaleX(0→1)` on `::after`, `transform-origin: left`, 0.25s |
| Blog card hover | `border-color: --terra` + `translateY(-3px)` + link gap expand |
| Publication hover | Background tint + arrow `translateX(5px)` + color `--terra` |

Scroll reveal and sticky nav use `useEffect` + `useRef` hooks in their respective client components. Components that need scroll behavior are marked `'use client'`.

---

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `< 960px` | Hero stacks (photo top). About → single column. Blog → single column. Footer → 2-col. Nav links hidden. |
| `< 600px` | Timeline → single column. Publication rows compressed. Footer → 1-col. Copyright stacks + centers. |

---

## Netlify Deployment

- `next.config.js`: `output: 'export'`, `images: { unoptimized: true }`
- `netlify.toml`: build command `next build`, publish directory `out`
- No server-side features used — fully static

---

## Assets

| File | Usage |
|---|---|
| `public/uploads/photo-1781454037417.jpeg` | Hero right panel portrait |

---

## Content To Replace Before Shipping

- About bio paragraphs
- Experience/education entries (years, institutions, descriptions)
- Publication titles and journals
- Blog post titles, excerpts, and bodies
- Contact email
- LinkedIn, ResearchGate, Google Scholar URLs
