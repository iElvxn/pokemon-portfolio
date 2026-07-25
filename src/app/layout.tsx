import type { Metadata } from 'next';
import { Press_Start_2P, VT323 } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Providers } from './providers';
import { siteUrl } from '@/data/personal';
import './globals.css';

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start',
  display: 'block',
});

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'block',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Elvin Ly — Software Engineer',
  description:
    'Software engineer intern at Capital One and MS CS student at Stony Brook. Full-stack, cloud, and applied AI — presented as a playable Pokémon-style portfolio.',
  keywords: ['Elvin Ly', 'Software Engineer', 'Full Stack', 'React', 'Next.js', 'TypeScript', 'AWS', 'Pokemon'],
  authors: [{ name: 'Elvin Ly' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Elvin Ly — Software Engineer',
    description:
      'Capital One SWE intern · MS CS @ Stony Brook · full-stack, cloud & applied AI. Explore the Pokémon-style portfolio.',
    url: '/',
    siteName: 'Elvin Ly',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${pressStart2P.variable} ${vt323.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
