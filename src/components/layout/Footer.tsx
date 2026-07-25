'use client';

import { personal } from '@/data/personal';

export function Footer() {
  return (
    <footer
      className="game-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: 'var(--game-bg)',
        height: 'auto',
        minHeight: 'auto',
        paddingTop: 32,
        paddingBottom: 32,
        scrollSnapAlign: 'none',
      }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'var(--game-box-border)' }}
      />

      <div className="game-box mx-auto px-8 py-4 text-center">
        <div className="relative z-10">
          <div className="font-pixel text-px-10 mb-1" style={{ color: 'var(--game-text)' }}>
            POKEMON PORTFOLIO
          </div>
          <div className="font-pixel text-px-8 mb-3" style={{ color: 'var(--game-text-light)' }}>
            BY {personal.name.toUpperCase()}
          </div>

          {/* Gengar sprite */}
          <div className="flex justify-center mb-3">
            <img
              src="/sprites/94.png"
              alt="Gengar"
              width={48}
              height={48}
              className="sprite-bob"
              style={{
                imageRendering: 'pixelated',
                filter: 'drop-shadow(0 0 6px rgba(112,88,152,0.7))',
              }}
            />
          </div>

          <div className="flex justify-center gap-3 mb-3">
            {[
              { label: 'GITHUB',   href: personal.github },
              { label: 'LINKEDIN', href: personal.linkedin },
              { label: 'EMAIL',    href: `mailto:${personal.email}` },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="game-box game-box-sm font-pixel text-px-8 px-3 py-1.5 relative z-10"
                style={{ color: 'var(--game-text)', textDecoration: 'none' }}
              >
                {label} ↗
              </a>
            ))}
          </div>

          <div className="font-pixel text-px-8" style={{ color: 'var(--game-text-light)' }}>
            © 2025 {personal.name.toUpperCase()} · GOTTA SHIP &apos;EM ALL
          </div>
          <div className="font-pixel text-px-8 mt-1" style={{ color: 'var(--game-text-dim)' }}>
            BUILT WITH NEXT.JS 15 + FRAMER MOTION
          </div>
        </div>
      </div>
    </footer>
  );
}
