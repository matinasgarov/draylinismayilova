import sharp from 'sharp'
import { mkdirSync, copyFileSync, existsSync, rmSync, readFileSync, writeFileSync } from 'node:fs'

// Keep pristine originals OUTSIDE /public so they don't ship in the static export.
const BACKUP = 'image-originals'
mkdirSync(BACKUP, { recursive: true })

function backup(src) {
  const name = src.replace(/[\\/]/g, '__')
  const dest = `${BACKUP}/${name}`
  if (!existsSync(dest)) copyFileSync(src, dest)
}

// [source, output, transform]
const jobs = [
  // Hero portrait — shown up to ~half viewport / full width on mobile. Keep name.
  ['public/uploads/photo-1781454037417.jpeg', 'public/uploads/photo-1781454037417.jpeg',
    (img) => img.resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true })],
  // About photos — displayed a few hundred px. Keep names.
  ['public/images/about-1.jpg', 'public/images/about-1.jpg',
    (img) => img.resize({ width: 1400, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true })],
  ['public/images/about-2.jpg', 'public/images/about-2.jpg',
    (img) => img.resize({ width: 1400, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true })],
  // Hero background photo stored as a 1.8MB PNG → WebP (ref updated in CSS).
  ['public/images/bg.png', 'public/images/bg.webp',
    (img) => img.resize({ width: 1536, withoutEnlargement: true }).webp({ quality: 72 })],
  // Logos — recompress / right-size, keep PNG + names.
  ['public/images/logo.png', 'public/images/logo.png',
    (img) => img.resize({ width: 660, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true })],
  ['public/images/logo-mobile-view.png', 'public/images/logo-mobile-view.png',
    (img) => img.resize({ width: 560, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true })],
  ['public/images/uni.png', 'public/images/uni.png',
    (img) => img.resize({ width: 300, withoutEnlargement: true }).png({ compressionLevel: 9, palette: true })],
]

for (const [src, out, fn] of jobs) {
  if (!existsSync(src)) { console.log('skip (missing):', src); continue }
  backup(src)
  // Read into memory first so sharp holds no handle on `src` — lets us
  // overwrite the same path in place (required on Windows).
  const input = readFileSync(src)
  const buf = await fn(sharp(input)).toBuffer()
  writeFileSync(out, buf)
  console.log('done:', out, (buf.length / 1024).toFixed(0) + 'KB')
}

// Drop unused junk asset (1.4MB, referenced nowhere).
if (existsSync('public/images/dfsdfsd.png')) {
  backup('public/images/dfsdfsd.png')
  rmSync('public/images/dfsdfsd.png')
  console.log('removed unused: public/images/dfsdfsd.png')
}

// If bg.png was converted to bg.webp, retire the PNG (back it up, then remove).
if (existsSync('public/images/bg.webp') && existsSync('public/images/bg.png')) {
  rmSync('public/images/bg.png')
  console.log('removed: public/images/bg.png (replaced by bg.webp)')
}
