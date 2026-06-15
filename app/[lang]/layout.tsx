import type { Metadata } from 'next'
import '../globals.css'
import { locales, hasLocale, type Locale } from './dictionaries'
import { SITE_URL, GOOGLE_SITE_VERIFICATION } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Dr. Aylin Ismayilova — Medical Doctor',
    template: '%s · Dr. Aylin Ismayilova',
  },
  description:
    'Personal website and blog of Dr. Aylin Ismayilova, a medical doctor who graduated from the University of Health Sciences (Sağlık Bilimleri Üniversitesi), Türkiye.',
  applicationName: 'Dr. Aylin Ismayilova',
  authors: [{ name: 'Dr. Aylin Ismayilova' }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    siteName: 'Dr. Aylin Ismayilova',
    title: 'Dr. Aylin Ismayilova — Medical Doctor',
    description:
      'Physician, researcher and writer — clinical curiosity grounded in research.',
    images: [{ url: '/uploads/photo-1781454037417.jpeg', width: 1200, height: 1200, alt: 'Dr. Aylin Ismayilova' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Aylin Ismayilova — Medical Doctor',
    description:
      'Physician, researcher and writer — clinical curiosity grounded in research.',
    images: ['/uploads/photo-1781454037417.jpeg'],
  },
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
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
