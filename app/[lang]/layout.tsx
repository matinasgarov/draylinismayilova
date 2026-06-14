import type { Metadata } from 'next'
import '../globals.css'
import { locales, hasLocale, type Locale } from './dictionaries'

export const metadata: Metadata = {
  title: 'Dr. Aylin Ismayilova — General Surgeon',
  description:
    'Personal website and blog of Dr. Aylin Ismayilova, General Surgeon based in Baku, Azerbaijan.',
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  const locale: Locale = hasLocale(lang) ? lang : 'en'

  return (
    <html lang={locale}>
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
