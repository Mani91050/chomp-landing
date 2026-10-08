import { Archivo_Black, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const display = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://chomp-demo.vercel.app'),
  title: {
    default: 'CHOMP — Chocolate That Bites Back',
    template: '%s · CHOMP',
  },
  description:
    'Four stupidly good chocolate bars. Real cocoa, real fruit, real crunch. No palm oil, no boring. Free shipping over $25.',
  keywords: ['chocolate', 'ecommerce', 'concept', 'landing page', 'next.js'],
  openGraph: {
    title: 'CHOMP — Chocolate That Bites Back',
    description: 'Four stupidly good chocolate bars. No palm oil, no boring.',
    url: '/',
    siteName: 'CHOMP',
    images: [{ url: '/images/hero.jpg', width: 1024, height: 1024, alt: 'CHOMP chocolate bar' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CHOMP — Chocolate That Bites Back',
    description: 'Four stupidly good chocolate bars. No palm oil, no boring.',
    images: ['/images/hero.jpg'],
  },
  icons: { icon: '/favicon.svg' },
};

export const viewport = {
  themeColor: '#0c0a1a',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        {/* If JS never runs, scroll-reveal content must still be visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
