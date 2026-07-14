'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StartMenu } from '@/components/game/StartMenu';
import { MusicToggle } from '@/components/game/SoundManager';
import { personal } from '@/data/personal';

const AREA_MAP: Record<string, string> = {
  hero:       'PALLET TOWN',
  skills:     'POKEMON CENTER',
  projects:   'TRAINER HALL',
  experience: 'BADGE CASE',
  education:  'TRAINER ACADEMY',
  contact:    'POKÉGEAR',
};

export function Navigation() {
  const [area, setArea]       = useState('PALLET TOWN');
  const [menuOpen, setMenuOpen] = useState(false);
  const [steps, setSteps]     = useState(0);

  /* Track the most-visible section rather than a fixed intersection
     threshold — on mobile, stacked sections can grow taller than the
     viewport, so a single "55% visible" ratio may never be reached */
  useEffect(() => {
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        let bestId = '';
        let bestRatio = 0;
        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
        });
        if (bestId && AREA_MAP[bestId]) setArea(AREA_MAP[bestId]);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );
    document.querySelectorAll('section[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Step counter — just for flavor */
  useEffect(() => {
    const handler = () => setSteps((s) => s + 1);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  /* Keyboard shortcut — Enter opens menu (disabled on hero/splash) */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !menuOpen && area !== 'PALLET TOWN') setMenuOpen(true);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [menuOpen, area]);

  return (
    <>
      <StartMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ── Top HUD bar ──────────────────────────────────────── */}
      <div className="game-hud">
        {/* Area name */}
        <AnimatePresence mode="wait">
          <motion.div
            key={area}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.15 }}
          >
            <div className="location-badge">{area}</div>
          </motion.div>
        </AnimatePresence>

        {/* Trainer badge + music toggle */}
        <div className="flex items-center gap-1 sm:gap-2">
          <MusicToggle />
          <div className="game-box game-box-sm py-1 px-2 sm:px-3 flex items-center gap-2 sm:gap-3">
            <span className="font-pixel text-px-8 text-[var(--game-text)]">
              {personal.name.split(' ')[0].toUpperCase()} ♂
            </span>
            <span className="font-pixel text-px-8 text-[var(--game-text-light)] hidden sm:inline">
              LV.{personal.level}
            </span>
          </div>
        </div>
      </div>

      {/* ── START button — hidden on hero/splash ─────────────── */}
      {area !== 'PALLET TOWN' && (
        <div className="fixed bottom-4 right-4 z-[500]">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="game-box font-pixel text-px-8 text-[var(--game-text)] px-5 py-2.5 hover:bg-[var(--game-box-dark)] active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:none]"
            style={{ transition: 'none' }}
            aria-label="Open menu"
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      )}
    </>
  );
}
