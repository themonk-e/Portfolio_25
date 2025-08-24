import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import HydrationProvider from '@/components/ui/HydrationProvider'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Portfolio - Personal Website',
  description: 'Personal portfolio showcasing projects, skills, and blog posts',
  keywords: ['portfolio', 'developer', 'projects', 'skills', 'blog'],
  authors: [{ name: 'Portfolio Owner' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link 
          rel="preload" 
          href="/fonts/Glitch inside.otf" 
          as="font" 
          type="font/otf" 
          crossOrigin="anonymous"
        />
      </head>
      <body className={poppins.className}>
        <HydrationProvider>
          {children}
        </HydrationProvider>
      </body>
    </html>
  )
}