'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import Link from 'next/link';

const ACTIONS = [
  { label: '⚔ Fight', sub: 'WRITE CODE', href: '#', color: 'var(--color-fire)' },
  { label: '📄 Resume', sub: 'SEE CREDS', href: '/resume.pdf', color: 'var(--color-water)' },
  { label: '🏃 Run', sub: 'GO BACK', href: '/', color: 'var(--color-ghost)' },
  { label: '✉ Contact', sub: 'SEND MSG', href: '/#contact', color: 'var(--color-psychic)' },
];

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: 'var(--color-void)' }}
    >
      {/* Battle scene */}
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden border border-[var(--color-border)]"
        style={{ background: 'var(--color-surface)' }}
      >
        {/* Battle area */}
        <div
          className="relative flex items-end justify-between px-8 pt-8 pb-6"
          style={{
            background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
            minHeight: '200px',
          }}
        >
          {/* Enemy — RECRUITER */}
          <div className="text-center">
            <motion.div
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-5xl mb-1">🧑‍💼</div>
              <div
                className="px-3 py-1 rounded font-mono text-[10px] uppercase tracking-wider"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'var(--color-text-secondary)' }}
              >
                RECRUITER Lv.??
              </div>
              {/* HP bar */}
              <div className="mt-2 w-24 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
                <div className="h-full rounded-full" style={{ width: '75%', background: 'var(--color-success)' }} />
              </div>
            </motion.div>
          </div>

          {/* Player — Gengar */}
          <div className="text-center">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/94.png"
                alt="Gengar"
                width={80}
                height={80}
                style={{ imageRendering: 'pixelated' }}
                className="drop-shadow-[0_0_10px_rgba(112,88,152,0.6)]"
              />
              <div className="mt-1 font-mono text-[10px] text-[var(--color-ghost-light)] uppercase tracking-wider">
                GENGAR Lv.100
              </div>
              <div className="mt-1.5 w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
                <div className="h-full rounded-full" style={{ width: '90%', background: 'var(--color-ghost)' }} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dialog box */}
        <div
          className="p-5 border-t border-[var(--color-border)]"
          style={{ background: 'var(--color-surface-2)' }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-mono text-sm text-[var(--color-text-primary)] mb-1">
              Wild <span style={{ color: 'var(--color-electric)' }}>RECRUITER</span> appeared!
            </p>
            <p className="font-mono text-xs text-[var(--color-text-secondary)]">
              (Page not found — error 404)
            </p>
          </motion.div>
        </div>

        {/* Action grid */}
        <div className="p-4 border-t border-[var(--color-border)]">
          <p className="font-mono text-xs text-[var(--color-text-muted)] mb-3 text-center uppercase tracking-wider">
            What will ELVIN do?
          </p>
          <div className="grid grid-cols-2 gap-2">
            {ACTIONS.map(({ label, sub, href, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <Link
                  href={href}
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-[var(--color-border)] transition-all duration-200 hover:scale-105"
                  style={{
                    background: `${color}10`,
                    borderColor: `${color}40`,
                  }}
                >
                  <span className="font-display font-bold text-sm" style={{ color }}>
                    {label}
                  </span>
                  <span className="font-mono text-[9px] text-[var(--color-text-muted)] mt-0.5">
                    {sub}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.p
        className="font-mono text-xs text-[var(--color-text-muted)] mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Error 404 · Page not found
      </motion.p>
    </div>
  );
}
