import type { Metadata } from 'next'
import { Inter, Cairo } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const cairo = Cairo({ 
  subsets: ['arabic'],
  variable: '--font-cairo',
})

export const metadata: Metadata = {
  title: 'Bitwreckers Admin Panel',
  description: 'Admin panel for managing Bitwreckers requests',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cairo.variable}`} suppressHydrationWarning>
      <body className="font-english antialiased" suppressHydrationWarning>
        <div suppressHydrationWarning>
          {children}
        </div>
      </body>
    </html>
  )
}
