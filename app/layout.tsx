import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://salami-nu.vercel.app'),
  title: 'সালামির পাঠান',
  description: 'সালামির পেজে স্বাগতম। সালামি দিন সহজে ও সুন্দরভাবে।',
  generator: 'v0.app',
  icons: {
    icon: '/Untitled.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    url: 'https://salami-nu.vercel.app',
    title: 'সালামির পাঠান',
    description: 'সালামির পেজে স্বাগতম। সালামি দিন সহজে ও সুন্দরভাবে।',
    siteName: 'সালামির পাঠান',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'সালামির পাঠান',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'সালামির পাঠান',
    description: 'সালামির পেজে স্বাগতম। সালামি দিন সহজে ও সুন্দরভাবে।',
    images: ['/og-image.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
