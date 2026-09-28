import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { ColorModeScript } from '@chakra-ui/react';
import { Providers } from './providers';
import './globals.css';

// Self-hosted by next/font: no request to Google at runtime, preloaded,
// and metric-matched fallbacks to avoid layout shift while loading.
const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const headingFont = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-heading', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'SpendWise · Personal finance, budgets and expense tracking',
    template: '%s · SpendWise',
  },
  description:
    'SpendWise helps you track spending, plan budgets, manage wallets and grow your savings — all in one calm, easy-to-read finance dashboard.',
  applicationName: 'SpendWise',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6F7F9' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1120' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${bodyFont.variable} ${headingFont.variable}`} suppressHydrationWarning>
      <body>
        <ColorModeScript initialColorMode="light" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
