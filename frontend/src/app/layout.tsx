import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bitwreckers - Break the Code, Build the Future',
  description: 'A student-led programming company driven by young talents in Jordan and the MENA region',
  keywords: 'programming, development, students, Jordan, MENA, Bitwreckers',
  authors: [{ name: 'Bitwreckers Team' }],
  creator: 'Bitwreckers',
  publisher: 'Bitwreckers',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bitwreckers.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bitwreckers - Break the Code, Build the Future',
    description: 'A student-led programming company driven by young talents in Jordan and the MENA region',
    url: 'https://bitwreckers.com',
    siteName: 'Bitwreckers',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bitwreckers - Student-led Programming Company',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitwreckers - Break the Code, Build the Future',
    description: 'A student-led programming company driven by young talents in Jordan and the MENA region',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <div id="root" className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
