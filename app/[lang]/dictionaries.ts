import 'server-only'

export type Locale = 'en' | 'az' | 'de'
export const locales: Locale[] = ['en', 'az', 'de']
export const defaultLocale: Locale = 'en'

export function hasLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale)
}

export async function getDictionary(locale: Locale) {
  const dicts = {
    en: () => import('../../dictionaries/en.json').then((m) => m.default),
    az: () => import('../../dictionaries/az.json').then((m) => m.default),
    de: () => import('../../dictionaries/de.json').then((m) => m.default),
  }
  return dicts[locale]()
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
