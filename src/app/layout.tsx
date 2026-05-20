import type { Metadata } from 'next';
import { Press_Start_2P, VT323 } from 'next/font/google';
import { Providers } from './providers';
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
  title: 'ELVIN LY — POKEMON PORTFOLIO',
  description: 'Software Engineer. Ghost Type Trainer. Full-Stack Developer.',
  keywords: ['Software Engineer', 'Full Stack', 'React', 'Next.js', 'TypeScript', 'Pokemon'],
  authors: [{ name: 'Elvin Ly' }],
  openGraph: {
    title: 'ELVIN LY — POKEMON PORTFOLIO',
    description: 'Software Engineer. Ghost Type Trainer.',
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
      </body>
    </html>
  );
}
