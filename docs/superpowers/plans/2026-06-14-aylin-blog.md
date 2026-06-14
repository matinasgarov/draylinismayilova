# Aylin Blog — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Dr. Aylin Ismayilova's personal portfolio & blog as a pixel-faithful Next.js static site deployable to Netlify.

**Architecture:** Next.js 14 App Router with `output: 'export'` for Netlify static hosting. One scrollable homepage composes seven section components. Blog posts are Markdown files parsed at build time; experience and publication data are JSON files. A single `globals.css` carries all design tokens and styles ported from the HTML prototype.

**Tech Stack:** Next.js 14 (App Router, TypeScript), gray-matter, remark, remark-html, Netlify static hosting.

---

## File Map

| File | Responsibility |
|---|---|
| `next.config.js` | Static export + unoptimized images |
| `netlify.toml` | Build command + publish dir |
| `app/globals.css` | All CSS: tokens, reset, every component style |
| `app/layout.tsx` | HTML shell, Google Fonts, site metadata |
| `app/page.tsx` | Fetches posts, composes all section components |
| `app/blog/[slug]/page.tsx` | Individual blog post page |
| `components/Nav.tsx` | Sticky nav with scroll detection (`'use client'`) |
| `components/ScrollRevealInit.tsx` | IntersectionObserver setup (`'use client'`) |
| `components/Hero.tsx` | Two-column hero section |
| `components/About.tsx` | Pull quote + bio + tags |
| `components/Experience.tsx` | Timeline from `experience.json` |
| `components/Research.tsx` | Publication list from `publications.json` |
| `components/Journal.tsx` | Blog card grid from post metadata |
| `components/Footer.tsx` | Dark footer with three columns |
| `lib/posts.ts` | `getPosts()` and `getPost(slug)` — reads Markdown files |
| `content/experience.json` | Timeline data |
| `content/publications.json` | Publication list data |
| `content/posts/*.md` | Blog post Markdown files (3 samples) |
| `public/uploads/photo-1781454037417.jpeg` | Hero portrait photo |

---

## Task 1: Project scaffolding

**Files:**
- Create: `next.config.js`
- Create: `netlify.toml`
- Create: `public/uploads/` directory

- [ ] **Step 1: Initialise Next.js project in the current directory**

Run inside `c:\Users\Matin Asgarov\Desktop\Projects\aylinblog`:

```powershell
npx create-next-app@latest . --typescript --no-tailwind --app --no-src-dir --import-alias "@/*" --yes
```

Expected: project files created (`app/`, `public/`, `package.json`, etc.)

- [ ] **Step 2: Install content-parsing dependencies**

```powershell
npm install gray-matter remark remark-html
npm install --save-dev @types/node
```

Expected: packages added to `node_modules`, `package.json` updated.

- [ ] **Step 3: Replace `next.config.js` with static-export config**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
}

module.exports = nextConfig
```

- [ ] **Step 4: Create `netlify.toml`**

```toml
[build]
  command = "npm run build"
  publish = "out"
```

- [ ] **Step 5: Copy hero photo to `public/uploads/`**

Create the folder `public/uploads/` and copy `photo-1781454037417.jpeg` into it.

The source file should already be in the project root alongside the HTML prototype. If it is:

```powershell
New-Item -ItemType Directory -Force public\uploads
Copy-Item "photo-1781454037417.jpeg" "public\uploads\photo-1781454037417.jpeg"
```

- [ ] **Step 6: Verify project builds**

```powershell
npm run build
```

Expected: `out/` directory created, no errors. (Page will be the default Next.js starter — that's fine.)

- [ ] **Step 7: Commit**

```powershell
git init
git add .
git commit -m "feat: scaffold Next.js project with static export config"
```

---

## Task 2: CSS foundation

**Files:**
- Modify: `app/globals.css` (replace entirely)

- [ ] **Step 1: Replace `app/globals.css` with all design tokens and component styles**

```css
/* ── TOKENS ──────────────────────────────────────────── */
:root {
  --cream:       oklch(97.5% 0.009 68);
  --sand:        oklch(92%   0.018 68);
  --dark:        oklch(14%   0.010 48);
  --mid:         oklch(40%   0.018 52);
  --muted:       oklch(63%   0.014 58);
  --rule:        oklch(86%   0.012 62);
  --terra:       oklch(55%   0.110 33);
  --terra-light: oklch(90%   0.040 33);

  --serif: 'Cormorant Garamond', Georgia, serif;
  --sans:  'DM Sans', system-ui, sans-serif;

  --px: clamp(1.5rem, 7vw, 9rem);
  --gap: clamp(5rem, 10vh, 9rem);
}

/* ── RESET ───────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--cream);
  color: var(--dark);
  font-family: var(--sans);
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
img { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }

/* ── NAV ─────────────────────────────────────────────── */
#nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 200;
  padding: 1.4rem var(--px);
  display: flex; align-items: center; justify-content: space-between;
  transition: background 0.35s, border-color 0.35s;
  border-bottom: 1px solid transparent;
}
#nav.scrolled {
  background: oklch(97.5% 0.009 68 / 0.93);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom-color: var(--rule);
}
.nav-logo {
  font-family: var(--serif);
  font-size: 1.05rem;
  font-style: italic;
  letter-spacing: 0.02em;
  color: var(--dark);
}
.nav-links {
  display: flex; gap: 2.4rem; list-style: none;
}
.nav-links a {
  font-size: 0.73rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: var(--mid);
  position: relative;
  transition: color 0.2s;
}
.nav-links a::after {
  content: ''; position: absolute; bottom: -3px; left: 0; right: 0;
  height: 1px; background: var(--terra);
  transform: scaleX(0); transform-origin: left;
  transition: transform 0.25s;
}
.nav-links a:hover { color: var(--dark); }
.nav-links a:hover::after { transform: scaleX(1); }

/* ── HERO ────────────────────────────────────────────── */
.hero {
  min-height: 100svh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.hero-left {
  padding: calc(var(--gap) + 5rem) var(--px) var(--gap);
  display: flex; flex-direction: column; justify-content: flex-end;
}
.hero-eyebrow {
  display: flex; align-items: center; gap: 1rem;
  font-size: 0.72rem; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--muted);
  margin-bottom: 1.6rem;
}
.hero-eyebrow::before {
  content: ''; display: block;
  width: 2.4rem; height: 1px; background: var(--terra);
  flex-shrink: 0;
}
.hero-name {
  font-family: var(--serif);
  font-size: clamp(4rem, 7.5vw, 8rem);
  font-weight: 300;
  line-height: 0.92;
  letter-spacing: -0.015em;
  margin-bottom: 2.2rem;
}
.hero-name em { font-style: italic; }
.hero-name .last { display: block; margin-left: 0.08em; }
.hero-tagline {
  font-family: var(--serif);
  font-size: clamp(1rem, 1.6vw, 1.3rem);
  font-style: italic;
  font-weight: 300;
  color: var(--mid);
  line-height: 1.65;
  max-width: 34ch;
  margin-bottom: 3rem;
}
.hero-cta-row {
  display: flex; align-items: center; gap: 2rem;
}
.btn-outline {
  display: inline-flex; align-items: center; gap: 0.6rem;
  font-size: 0.73rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--dark); border: 1px solid var(--rule);
  padding: 0.85rem 1.6rem;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}
.btn-outline:hover {
  background: var(--dark); color: var(--cream); border-color: var(--dark);
}
.scroll-hint {
  display: flex; align-items: center; gap: 0.9rem;
  font-size: 0.7rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--muted);
}
.scroll-hint .bar {
  width: 2.8rem; height: 1px; background: var(--rule);
  position: relative; overflow: hidden;
}
.scroll-hint .bar::after {
  content: ''; position: absolute;
  inset: 0; background: var(--terra);
  transform: translateX(-100%);
  animation: slide 2.2s ease-in-out infinite;
}
@keyframes slide {
  0%   { transform: translateX(-100%); }
  50%  { transform: translateX(0); }
  100% { transform: translateX(100%); }
}
.hero-right {
  position: relative; overflow: hidden;
}
.hero-right img {
  width: 100%; height: 100%;
  object-fit: cover; object-position: 50% 10%;
}
.hero-right::after {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(to right, var(--cream) 0%, transparent 18%);
  pointer-events: none;
}

/* ── SECTION SHELL ───────────────────────────────────── */
.sec { padding: var(--gap) var(--px); }
.sec-alt { background: var(--sand); }
.sec-head {
  display: flex; align-items: baseline; gap: 1.4rem;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid var(--rule);
  margin-bottom: clamp(3rem, 6vh, 5rem);
}
.sec-num {
  font-size: 0.68rem; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--terra);
}
.sec-title {
  font-family: var(--serif);
  font-size: clamp(2rem, 4vw, 3.6rem);
  font-weight: 300; line-height: 1;
}

/* ── ABOUT ───────────────────────────────────────────── */
.about-grid {
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 5rem; align-items: start;
}
.about-pull {
  font-family: var(--serif);
  font-size: clamp(1.7rem, 2.8vw, 2.6rem);
  font-style: italic; font-weight: 300;
  line-height: 1.35; color: var(--dark);
}
.about-pull .terra { color: var(--terra); }
.about-bio p {
  font-size: 1.02rem; line-height: 1.8; color: var(--mid);
}
.about-bio p + p { margin-top: 1.4rem; }
.about-tags {
  display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 2.2rem;
}
.tag {
  font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--terra); border: 1px solid var(--terra-light);
  padding: 0.4rem 0.9rem;
}

/* ── TIMELINE ────────────────────────────────────────── */
.timeline-item {
  display: grid;
  grid-template-columns: 9rem 1fr;
  gap: 2.5rem;
  padding: 2.4rem 0;
  border-bottom: 1px solid var(--rule);
  align-items: start;
}
.timeline-item:first-of-type { border-top: 1px solid var(--rule); }
.t-year {
  font-size: 0.76rem; letter-spacing: 0.07em;
  color: var(--muted); padding-top: 0.25rem; line-height: 1.5;
}
.t-body h3 {
  font-family: var(--serif);
  font-size: 1.45rem; font-weight: 400;
  margin-bottom: 0.35rem;
}
.t-place {
  font-size: 0.73rem; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--terra);
  margin-bottom: 0.8rem;
}
.t-body p {
  font-size: 0.9rem; line-height: 1.75; color: var(--mid); max-width: 58ch;
}

/* ── RESEARCH ────────────────────────────────────────── */
.pub-item {
  display: grid;
  grid-template-columns: 4.5rem 1fr 2rem;
  gap: 2rem;
  padding: 2rem 0;
  border-bottom: 1px solid var(--rule);
  align-items: center;
  cursor: pointer;
  transition: background 0.15s;
}
.pub-item:first-of-type { border-top: 1px solid var(--rule); }
.pub-item:hover { background: oklch(88% 0.018 68 / 0.5); }
.pub-item:hover .pub-arr { transform: translateX(5px); color: var(--terra); }
.p-year {
  font-size: 0.73rem; letter-spacing: 0.06em; color: var(--muted);
}
.p-body h3 {
  font-family: var(--serif);
  font-size: 1.25rem; font-weight: 400; line-height: 1.3;
  margin-bottom: 0.35rem;
}
.p-journal {
  font-size: 0.72rem; letter-spacing: 0.07em;
  text-transform: uppercase; color: var(--terra);
}
.pub-arr {
  font-size: 1.1rem; color: var(--muted);
  transition: transform 0.2s, color 0.2s;
}

/* ── BLOG ────────────────────────────────────────────── */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.blog-card {
  background: var(--cream);
  border: 1px solid var(--rule);
  padding: 2.4rem 2rem;
  cursor: pointer;
  transition: border-color 0.22s, transform 0.22s;
  display: flex; flex-direction: column;
}
.blog-card:hover {
  border-color: var(--terra);
  transform: translateY(-3px);
}
.b-meta {
  display: flex; align-items: center; gap: 0.75rem;
  font-size: 0.69rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--muted);
  margin-bottom: 1.4rem;
}
.b-meta .dot {
  width: 3px; height: 3px; border-radius: 50%; background: var(--rule);
}
.blog-card h3 {
  font-family: var(--serif);
  font-size: 1.55rem; font-weight: 400; line-height: 1.2;
  margin-bottom: 0.9rem;
}
.blog-card p {
  font-size: 0.88rem; line-height: 1.75; color: var(--mid);
  flex: 1;
}
.b-link {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.7rem; letter-spacing: 0.11em;
  text-transform: uppercase; color: var(--terra);
  margin-top: 1.8rem;
  transition: gap 0.2s;
}
.blog-card:hover .b-link { gap: 0.9rem; }

/* ── BLOG DETAIL PAGE ────────────────────────────────── */
.blog-detail {
  max-width: 68ch;
  margin: 0 auto;
  padding: calc(var(--gap) + 5rem) var(--px) var(--gap);
}
.blog-detail-back {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.73rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--mid); margin-bottom: 3rem;
  transition: color 0.2s;
}
.blog-detail-back:hover { color: var(--dark); }
.blog-detail-meta {
  display: flex; align-items: center; gap: 0.75rem;
  font-size: 0.69rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--muted);
  margin-bottom: 1.4rem;
}
.blog-detail-meta .dot {
  width: 3px; height: 3px; border-radius: 50%; background: var(--rule);
}
.blog-detail h1 {
  font-family: var(--serif);
  font-size: clamp(2rem, 4vw, 3.6rem);
  font-weight: 300; line-height: 1.1;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--rule);
}
.blog-detail-body {
  font-size: 1.05rem; line-height: 1.85; color: var(--mid);
}
.blog-detail-body p { margin-bottom: 1.4rem; }
.blog-detail-body h2 {
  font-family: var(--serif); font-size: 1.8rem; font-weight: 300;
  margin: 2.5rem 0 1rem;
}
.blog-detail-body h3 {
  font-family: var(--serif); font-size: 1.4rem; font-weight: 400;
  margin: 2rem 0 0.8rem;
}

/* ── FOOTER ──────────────────────────────────────────── */
footer {
  background: var(--dark);
  padding: 5rem var(--px) 3rem;
}
.footer-name {
  font-family: var(--serif);
  font-size: clamp(3rem, 6.5vw, 7rem);
  font-weight: 300; line-height: 0.92;
  color: oklch(95% 0.008 62);
  margin-bottom: 3.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid oklch(28% 0.01 50);
}
.footer-name em { font-style: italic; }
.footer-cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}
.f-col h4 {
  font-size: 0.67rem; letter-spacing: 0.15em;
  text-transform: uppercase; color: oklch(50% 0.01 52);
  margin-bottom: 1.1rem;
}
.f-col p, .f-col a {
  font-size: 0.9rem; line-height: 1.85;
  color: oklch(72% 0.012 58); display: block;
}
.f-col a { transition: color 0.2s; }
.f-col a:hover { color: oklch(92% 0.01 62); }
.footer-copy {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid oklch(23% 0.01 50);
  font-size: 0.7rem; letter-spacing: 0.07em;
  color: oklch(42% 0.01 52);
  display: flex; justify-content: space-between; align-items: center;
}

/* ── REVEAL ANIMATION ────────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}
.reveal.in { opacity: 1; transform: none; }
.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }

/* ── RESPONSIVE ──────────────────────────────────────── */
@media (max-width: 960px) {
  .hero { grid-template-columns: 1fr; }
  .hero-left { padding-top: calc(5rem + 5rem); justify-content: flex-start; }
  .hero-right { height: 70vw; order: -1; }
  .hero-right::after {
    background: linear-gradient(to bottom, transparent 60%, var(--cream) 100%);
  }
  .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .blog-grid { grid-template-columns: 1fr; }
  .footer-cols { grid-template-columns: 1fr 1fr; }
  .nav-links { display: none; }
}
@media (max-width: 600px) {
  .timeline-item { grid-template-columns: 1fr; gap: 0.5rem; }
  .pub-item { grid-template-columns: 3.5rem 1fr 1.5rem; gap: 1rem; }
  .footer-cols { grid-template-columns: 1fr; }
  .footer-copy { flex-direction: column; gap: 0.5rem; text-align: center; }
}
```

- [ ] **Step 2: Verify build still passes**

```powershell
npm run build
```

Expected: no CSS errors, `out/` rebuilt.

- [ ] **Step 3: Commit**

```powershell
git add app/globals.css
git commit -m "feat: add design tokens and all component CSS"
```

---

## Task 3: Content data files

**Files:**
- Create: `content/experience.json`
- Create: `content/publications.json`
- Create: `content/posts/the-surgeons-hands.md`
- Create: `content/posts/what-1000-procedures-teach-you.md`
- Create: `content/posts/precision-and-empathy.md`

- [ ] **Step 1: Create `content/experience.json`**

```json
[
  {
    "years": "2024 –\nPresent",
    "role": "Surgical Resident, General Surgery",
    "place": "Department of Surgery · University Hospital",
    "description": "Full-spectrum clinical training encompassing laparoscopic and open procedures, emergency surgery, and complex abdominal cases. Active participation in multidisciplinary tumor boards and surgical rounds."
  },
  {
    "years": "2018 –\n2024",
    "role": "Doctor of Medicine (MD)",
    "place": "Azerbaijani Medical University, Baku",
    "description": "Comprehensive medical education with honors distinction. Final-year thesis on minimally invasive surgical outcomes in emergency abdominal presentations."
  },
  {
    "years": "2023",
    "role": "Clinical Externship — Laparoscopic Surgery",
    "place": "Advanced Surgical Training Centre",
    "description": "Intensive hands-on training in advanced laparoscopic techniques. Completed over 200 supervised procedures across cholecystectomy, appendectomy, and hernia repair."
  },
  {
    "years": "2022",
    "role": "Research Fellow",
    "place": "Surgical Research Institute",
    "description": "Conducted prospective clinical research on post-operative complications and recovery trajectories. Contributed to two peer-reviewed publications and three conference abstracts."
  }
]
```

- [ ] **Step 2: Create `content/publications.json`**

```json
[
  {
    "year": "2024",
    "title": "Minimally Invasive Techniques in Emergency Laparotomy: Outcomes and Considerations",
    "journal": "Surgical Endoscopy · Peer-Reviewed"
  },
  {
    "year": "2024",
    "title": "Post-operative Pain Management Protocols in Elective Abdominal Surgery",
    "journal": "BMC Surgery · Peer-Reviewed"
  },
  {
    "year": "2023",
    "title": "Outcomes of Laparoscopic Cholecystectomy in Acute vs. Interval Cholecystitis",
    "journal": "Journal of Surgical Research · Peer-Reviewed"
  },
  {
    "year": "2023",
    "title": "Surgical Education in the Era of Simulation: A Comparative Analysis",
    "journal": "Journal of Surgical Education · Peer-Reviewed"
  }
]
```

- [ ] **Step 3: Create `content/posts/the-surgeons-hands.md`**

```markdown
---
title: "The Surgeon's Hands"
date: "2025-05-01"
category: "Reflections"
excerpt: "On the weight of what our hands carry — and what they must release — in the operating room and beyond."
slug: "the-surgeons-hands"
---

There is a particular silence in the operating room just before the first incision. It is not the absence of sound — the monitors still beep, the team still breathes — but the absence of uncertainty. Everything that could be prepared has been prepared. What remains is the work.

I have thought often about what it means to hold someone's life in your hands. Not metaphorically. Literally: a retractor here, a suture there, the deliberate pressure that closes what was open and opens what was closed.

## The Weight We Carry In

We arrive at the table carrying everything we know. Years of training compress into the moment the skin parts. The anatomy we memorised in cold lecture halls becomes warm and immediate. The dissection planes we practiced on models become real tissue with real variation.

What surprised me most, early in my training, was not the difficulty of the technique. It was the emotional gravity of the work. The patient on the table is someone's mother, someone's child. That fact does not leave you — nor should it.

## What We Must Learn to Release

The paradox of surgery is this: to be fully present for the patient, you must learn to release the weight of that presence in the moment you need steady hands. Anxiety is the enemy of precision. You learn to hold concern and composure at once — to care deeply and cut cleanly.

This is not detachment. It is something more difficult: full attention without the paralysis of feeling.

The hands learn before the mind does. They learn through repetition, through correction, through the slow accumulation of cases that each taught something the textbook could not. And eventually, they know what to do even when the situation is new.

That is the gift of training. Not certainty — surgery never offers certainty — but a kind of earned readiness.
```

- [ ] **Step 4: Create `content/posts/what-1000-procedures-teach-you.md`**

```markdown
---
title: "What 1,000 Procedures Teach You"
date: "2025-03-01"
category: "Practice"
excerpt: "Patterns in surgical outcomes, human behavior, and the unexpected lessons that only repetition can surface."
slug: "what-1000-procedures-teach-you"
---

The first hundred cases teach you technique. The next two hundred teach you judgment. After that, you begin to learn something harder to name.

Call it pattern recognition — but that phrase undersells it. It is more like developing a second sense for when a situation is about to change, for the small signals that precede the large events. A shift in the patient's vitals. A texture in the tissue that doesn't match the imaging. The angle of bleeding that suggests a different vessel than expected.

## Repetition as Education

There is no shortcut through volume. You cannot read your way to the judgment that 1,000 cases builds. The cases teach through variety: the patient who presented atypically, the anatomy that defied the textbook, the complication that arrived without warning and demanded immediate response.

Each case deposits something. Most deposits are small. Over time, they accumulate into something that functions like intuition but is actually experience in compressed form.

## What Changes in You

Around the five-hundredth case, I noticed something shift. The anxiety that had accompanied difficult moments — not gone, but transmuted. It became alertness. Where anxiety paralyses, alertness mobilises. The feeling was the same energy, pointed differently.

I also noticed a change in how I listened to patients. Early in training, I was listening for information I needed to make decisions. Later, I began hearing what was underneath the information: the fear, the hope, the specific way each person held their uncertainty. That listening changed how I explained things, how I prepared patients, how I understood the meaning of good outcomes for each individual.

## The Lesson That Surprised Me Most

Volume teaches humility, not confidence. The surgeon who has done a thousand cases knows precisely how much can go wrong, how many variables lie outside any individual's control, how thin the margin sometimes is between a good outcome and a difficult one.

That knowledge does not make you timid. It makes you careful — which is different.
```

- [ ] **Step 5: Create `content/posts/precision-and-empathy.md`**

```markdown
---
title: "Precision and Empathy Are Not Opposites"
date: "2025-01-01"
category: "Medicine & Life"
excerpt: "Against the myth that clinical detachment makes for better surgeons — and the evidence that says otherwise."
slug: "precision-and-empathy"
---

Medical culture has long held a particular myth: that emotional distance improves clinical performance. The ideal surgeon, in this telling, is precise because she is detached — unmoved by the human stakes of the work, and therefore clearer-headed in her execution.

The evidence does not support this. And the experience of practice contradicts it daily.

## The Myth of Detachment

The detachment model emerged from a reasonable concern: that emotional involvement would impair judgment, that caring too much would make surgeons hesitant, that the stakes of surgery demanded a kind of cold clarity. These concerns are not entirely wrong. There is such a thing as over-involvement that obscures rather than illuminates.

But the solution to over-involvement is not emotional removal. It is emotional regulation — the capacity to feel fully without being overwhelmed by feeling. These are not the same thing, and conflating them has cost medicine dearly.

## What Empathy Actually Does

Research on surgical outcomes consistently finds that the surgeons with the best results are not the most detached — they are the most communicative, the most attuned to patient anxiety, the most willing to slow down and explain. Patient cooperation in pre- and post-operative care is better when patients feel seen. Complications are identified earlier when patients feel able to report concerns without embarrassment.

Empathy is not sentiment. It is information. A surgeon who understands her patient's fear, their threshold for pain, their family situation, their compliance challenges — that surgeon has more data. Better data produces better decisions.

## Precision As an Act of Care

The steadiness of a surgeon's hands is not the absence of feeling. It is feeling organised into intention. I operate more carefully when I am more connected to the significance of the work — not less.

The incision is precise because the patient matters. The anastomosis is careful because someone is waiting outside, hoping. Empathy does not slow the work down. It gives the work its meaning, and meaning is what makes the work worth doing precisely.
```

- [ ] **Step 6: Commit**

```powershell
git add content/
git commit -m "feat: add content data files and sample blog posts"
```

---

## Task 4: `lib/posts.ts`

**Files:**
- Create: `lib/posts.ts`

- [ ] **Step 1: Create `lib/posts.ts`**

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDir = path.join(process.cwd(), 'content/posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
}

export interface Post extends PostMeta {
  contentHtml: string
}

export function getPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDir)
  return files
    .filter((f) => f.endsWith('.md'))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(postsDir, filename), 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        category: data.category as string,
        excerpt: data.excerpt as string,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPost(slug: string): Promise<Post> {
  const raw = fs.readFileSync(path.join(postsDir, `${slug}.md`), 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    category: data.category as string,
    excerpt: data.excerpt as string,
    contentHtml: processed.toString(),
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```powershell
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```powershell
git add lib/posts.ts
git commit -m "feat: add posts helpers (getPosts, getPost)"
```

---

## Task 5: `app/layout.tsx`

**Files:**
- Modify: `app/layout.tsx` (replace entirely)

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dr. Aylin Ismayilova — General Surgeon',
  description:
    'Personal website and blog of Dr. Aylin Ismayilova, General Surgeon based in Baku, Azerbaijan.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Build and check**

```powershell
npm run build
```

Expected: builds successfully.

- [ ] **Step 3: Commit**

```powershell
git add app/layout.tsx
git commit -m "feat: configure layout with Google Fonts and metadata"
```

---

## Task 6: Nav component

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Create `components/Nav.tsx`**

```tsx
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
```

- [ ] **Step 2: Commit**

```powershell
git add components/Nav.tsx
git commit -m "feat: add sticky Nav component with scroll detection"
```

---

## Task 7: ScrollRevealInit component

**Files:**
- Create: `components/ScrollRevealInit.tsx`

- [ ] **Step 1: Create `components/ScrollRevealInit.tsx`**

```tsx
'use client'

import { useEffect } from 'react'

export default function ScrollRevealInit() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in')
        }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
```

- [ ] **Step 2: Commit**

```powershell
git add components/ScrollRevealInit.tsx
git commit -m "feat: add ScrollRevealInit client component"
```

---

## Task 8: Hero component

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
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
```

- [ ] **Step 2: Commit**

```powershell
git add components/Hero.tsx
git commit -m "feat: add Hero section component"
```

---

## Task 9: About component

**Files:**
- Create: `components/About.tsx`

- [ ] **Step 1: Create `components/About.tsx`**

```tsx
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
```

- [ ] **Step 2: Commit**

```powershell
git add components/About.tsx
git commit -m "feat: add About section component"
```

---

## Task 10: Experience component

**Files:**
- Create: `components/Experience.tsx`

- [ ] **Step 1: Create `components/Experience.tsx`**

```tsx
import experienceData from '@/content/experience.json'

interface ExperienceEntry {
  years: string
  role: string
  place: string
  description: string
}

export default function Experience() {
  const entries = experienceData as ExperienceEntry[]

  return (
    <section className="sec" id="experience">
      <div className="sec-head">
        <span className="sec-num">02</span>
        <h2 className="sec-title">Experience &amp; Education</h2>
      </div>
      {entries.map((entry, i) => (
        <div key={i} className="timeline-item reveal">
          <div className="t-year" style={{ whiteSpace: 'pre-line' }}>
            {entry.years}
          </div>
          <div className="t-body">
            <h3>{entry.role}</h3>
            <div className="t-place">{entry.place}</div>
            <p>{entry.description}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
```

- [ ] **Step 2: Add JSON import support to `tsconfig.json`**

Open `tsconfig.json` and confirm `"resolveJsonModule": true` is present under `compilerOptions`. If not, add it:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

- [ ] **Step 3: Commit**

```powershell
git add components/Experience.tsx tsconfig.json
git commit -m "feat: add Experience section component"
```

---

## Task 11: Research component

**Files:**
- Create: `components/Research.tsx`

- [ ] **Step 1: Create `components/Research.tsx`**

```tsx
import publicationsData from '@/content/publications.json'

interface Publication {
  year: string
  title: string
  journal: string
}

export default function Research() {
  const publications = publicationsData as Publication[]

  return (
    <section className="sec sec-alt" id="research">
      <div className="sec-head">
        <span className="sec-num">03</span>
        <h2 className="sec-title">Research &amp; Publications</h2>
      </div>
      {publications.map((pub, i) => (
        <div key={i} className="pub-item reveal">
          <div className="p-year">{pub.year}</div>
          <div className="p-body">
            <h3>{pub.title}</h3>
            <div className="p-journal">{pub.journal}</div>
          </div>
          <div className="pub-arr">→</div>
        </div>
      ))}
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add components/Research.tsx
git commit -m "feat: add Research & Publications section component"
```

---

## Task 12: Journal component

**Files:**
- Create: `components/Journal.tsx`

- [ ] **Step 1: Create `components/Journal.tsx`**

```tsx
import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

interface JournalProps {
  posts: PostMeta[]
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function Journal({ posts }: JournalProps) {
  return (
    <section className="sec" id="blog">
      <div className="sec-head">
        <span className="sec-num">04</span>
        <h2 className="sec-title">Journal</h2>
      </div>
      <div className="blog-grid">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`blog-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`}
          >
            <div className="b-meta">
              <span>{formatDate(post.date)}</span>
              <span className="dot" />
              <span>{post.category}</span>
            </div>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            <span className="b-link">Read essay →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```powershell
git add components/Journal.tsx
git commit -m "feat: add Journal section component"
```

---

## Task 13: Footer component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Create `components/Footer.tsx`**

```tsx
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
```

- [ ] **Step 2: Commit**

```powershell
git add components/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 14: Main page (`app/page.tsx`)

**Files:**
- Modify: `app/page.tsx` (replace entirely)

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
import Nav from '@/components/Nav'
import ScrollRevealInit from '@/components/ScrollRevealInit'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Research from '@/components/Research'
import Journal from '@/components/Journal'
import Footer from '@/components/Footer'
import { getPosts } from '@/lib/posts'

export default function Home() {
  const posts = getPosts()

  return (
    <>
      <Nav />
      <ScrollRevealInit />
      <Hero />
      <About />
      <Experience />
      <Research />
      <Journal posts={posts} />
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Build and verify**

```powershell
npm run build
```

Expected: builds with no errors, all sections rendered in `out/index.html`.

- [ ] **Step 3: Quick smoke test in dev**

```powershell
npm run dev
```

Open `http://localhost:3000` and verify:
- Hero shows name + photo side by side
- Scrolling past 40px triggers frosted nav
- All five sections visible
- Footer visible

Stop dev server (`Ctrl+C`).

- [ ] **Step 4: Commit**

```powershell
git add app/page.tsx
git commit -m "feat: compose homepage from all section components"
```

---

## Task 15: Blog detail page

**Files:**
- Create: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create `app/blog/[slug]/page.tsx`**

```tsx
import Nav from '@/components/Nav'
import { getPost, getPosts } from '@/lib/posts'

export async function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }))
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)

  return (
    <>
      <Nav />
      <main className="blog-detail">
        <a href="/#blog" className="blog-detail-back">
          ← Back to Journal
        </a>
        <div className="blog-detail-meta">
          <span>{formatDate(post.date)}</span>
          <span className="dot" />
          <span>{post.category}</span>
        </div>
        <h1>{post.title}</h1>
        <div
          className="blog-detail-body"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </main>
    </>
  )
}
```

- [ ] **Step 2: Build and verify all blog routes generate**

```powershell
npm run build
```

Expected: output includes:
- `out/blog/the-surgeons-hands/index.html`
- `out/blog/what-1000-procedures-teach-you/index.html`
- `out/blog/precision-and-empathy/index.html`

- [ ] **Step 3: Spot-check a blog post in dev**

```powershell
npm run dev
```

Open `http://localhost:3000/blog/the-surgeons-hands` and verify:
- Nav appears
- Title renders
- Post body renders with paragraphs and headings

Stop dev server (`Ctrl+C`).

- [ ] **Step 4: Commit**

```powershell
git add "app/blog/[slug]/page.tsx"
git commit -m "feat: add blog post detail page with static params"
```

---

## Task 16: Final production build check

- [ ] **Step 1: Run a clean production build**

```powershell
npm run build
```

Expected: exits 0, `out/` directory contains all HTML files.

- [ ] **Step 2: Serve the static output locally and verify**

```powershell
npx serve out
```

Open `http://localhost:3000` (or whichever port `serve` assigns).

Check each section:
- [ ] Nav: transparent on load, frosted after scrolling 40px
- [ ] Hero: two-column layout, photo visible, animated scroll bar running
- [ ] About: pull quote + bio + terracotta tags
- [ ] Experience: four timeline rows with borders
- [ ] Research: four pub rows, hover shifts arrow to terracotta
- [ ] Journal: three cards, hover lifts card + border turns terracotta
- [ ] Footer: dark bg, three columns, copyright bar
- [ ] Blog card links navigate to `/blog/<slug>`
- [ ] Blog detail page: back link, meta, title, body text
- [ ] Scroll reveal animations trigger as you scroll down
- [ ] Mobile (resize to 375px): hero stacks, single-column blog, footer collapses

Stop serve (`Ctrl+C`).

- [ ] **Step 3: Final commit**

```powershell
git add .
git commit -m "feat: complete Dr. Aylin Ismayilova personal website"
```

---

## Post-Launch: Content Replacement Checklist

Before publishing with real content, update:

- [ ] `components/About.tsx` — replace bio paragraphs with real text
- [ ] `components/Footer.tsx` — replace email, LinkedIn/ResearchGate/Scholar URLs
- [ ] `content/experience.json` — replace with real dates, institutions, descriptions
- [ ] `content/publications.json` — replace with real publications
- [ ] `content/posts/` — replace sample posts with real essays, delete or keep samples
