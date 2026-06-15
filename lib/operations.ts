import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const opsDir = path.join(process.cwd(), 'content/operations')

export interface OperationMeta {
  slug: string
  title: string
  date: string
  type: string
  technique: string
  duration: string
  outcome: string
  excerpt: string
}

export interface Operation extends OperationMeta {
  contentHtml: string
}

function fileFor(slug: string, lang: string): string {
  const localized = path.join(opsDir, `${slug}.${lang}.md`)
  if (fs.existsSync(localized)) return localized
  return path.join(opsDir, `${slug}.en.md`)
}

function slugs(): string[] {
  return fs
    .readdirSync(opsDir)
    .filter((f) => f.endsWith('.en.md'))
    .map((f) => f.replace(/\.en\.md$/, ''))
}

export function getOperations(lang = 'en'): OperationMeta[] {
  return slugs()
    .map((slug) => {
      const raw = fs.readFileSync(fileFor(slug, lang), 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        type: data.type as string,
        technique: data.technique as string,
        duration: data.duration as string,
        outcome: data.outcome as string,
        excerpt: data.excerpt as string,
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getOperation(slug: string, lang = 'en'): Promise<Operation> {
  const raw = fs.readFileSync(fileFor(slug, lang), 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    type: data.type as string,
    technique: data.technique as string,
    duration: data.duration as string,
    outcome: data.outcome as string,
    excerpt: data.excerpt as string,
    contentHtml: processed.toString(),
  }
}
