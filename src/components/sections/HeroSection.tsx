'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionEnterTransition } from '@/components/game/BattleTransition';
import { personal } from '@/data/personal';

/* ── Random starfield, generated once ─────────────────────── */
function useStars(count: number) {
  return useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: (Math.random() * 100).toFixed(2),
      y: (Math.random() * 100).toFixed(2),
      w: Math.random() < 0.25 ? 2 : 1,
      dur: (1.2 + Math.random() * 2.4).toFixed(2),
      del: (Math.random() * 4).toFixed(2),
    })),
  [count]);
}

/* ── Shooting star ─────────────────────────────────────────── */
function ShootingStar({ x, y }: { x: number; y: number }) {
  return (
    <motion.div
      className="absolute h-px"
      style={{
        left: `${x}%`,
        top:  `${y}%`,
        width: 60,
        background: 'linear-gradient(90deg, rgba(248,230,255,0.9), transparent)',
        transformOrigin: 'left center',
      }}
      initial={{ x: 0, opacity: 0, rotate: -35 }}
      animate={{ x: 120, opacity: [0, 1, 0] }}
      transition={{ duration: 0.8, delay: Math.random() * 4 }}
    />
  );
}

type Phase = 'title' | 'menu';

export function HeroSection() {
  const [phase, setPhase]           = useState<Phase>('title');
  const [menuCursor, setMenuCursor] = useState(0);
  const [blink, setBlink]           = useState(true);
  const stars = useStars(90);

  /* Blink timer */
  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(t);
  }, []);

  /* Keyboard navigation */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase === 'title') {
        if (e.key === 'Enter' || e.key === ' ') setPhase('menu');
      } else {
        if (e.key === 'ArrowDown') setMenuCursor((c) => Math.min(2, c + 1));
        if (e.key === 'ArrowUp')   setMenuCursor((c) => Math.max(0, c - 1));
        if (e.key === 'Enter' || e.key === ' ') {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase]);

  const menuItems = [
    { label: 'CONTINUE',  action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'NEW GAME',  action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'OPTIONS',   action: () => {} },
  ];

  return (
    <section
      id="hero"
      className="game-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse 120% 90% at 50% 30%, #1a0f3a 0%, #0a0518 60%, #050210 100%)',
      }}
    >
      <SectionEnterTransition />

      {/* ── Stars ─────────────────────────────────────────── */}
      <div className="star-field">
        {stars.map((s) => (
          <div
            key={s.id}
            className="star"
            style={{
              left: `${s.x}%`,
              top:  `${s.y}%`,
              width:  s.w,
              height: s.w,
              '--sdur': `${s.dur}s`,
              '--sdel': `${s.del}s`,
            } as React.CSSProperties}
          />
        ))}
        <ShootingStar x={20} y={15} />
        <ShootingStar x={60} y={8} />
      </div>

      {/* ── Ground strip ────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(88,48,56,0.3) 60%, rgba(68,28,36,0.6) 100%)',
        }}
      />

      {/* ── Scanlines (heavier on title) ────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
          zIndex: 2,
        }}
      />

      {/* ── Content ─────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'title' ? (
          <motion.div
            key="title"
            className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {/* Version tag */}
            <motion.div
              className="font-pixel text-px-8 tracking-[0.3em]"
              style={{ color: 'var(--game-electric)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              ★ VERSION PORTFOLIO ★
            </motion.div>

            {/* Title */}
            <div>
              <motion.div
                className="font-pixel leading-none"
                style={{
                  fontSize: 'clamp(20px, 5vw, 36px)',
                  color: 'var(--game-electric)',
                  animation: 'title-glow 2.5s ease-in-out infinite',
                }}
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                POKÉMON
              </motion.div>
              <motion.div
                className="font-pixel mt-2"
                style={{
                  fontSize: 'clamp(12px, 3vw, 22px)',
                  color: '#e8e8ff',
                  textShadow: '2px 2px 0 rgba(0,0,0,0.9), -1px -1px 0 rgba(0,0,0,0.5)',
                  letterSpacing: '0.12em',
                }}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.35 }}
              >
                PORTFOLIO
              </motion.div>
            </div>

            {/* Gengar sprite */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
                alt="Gengar"
                className="sprite-float"
                style={{
                  imageRendering: 'pixelated',
                  width:  'clamp(72px, 14vw, 120px)',
                  height: 'auto',
                  filter:
                    'drop-shadow(0 0 12px rgba(112,88,152,0.9)) drop-shadow(0 0 30px rgba(112,88,152,0.4)) brightness(1.1)',
                }}
              />
            </motion.div>

            {/* Trainer name */}
            <motion.div
              className="font-pixel text-px-8 tracking-[0.2em]"
              style={{ color: 'rgba(200,180,255,0.7)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              by {personal.name.toUpperCase()}
            </motion.div>

            {/* Press enter */}
            <motion.div
              className="font-pixel text-px-8 tracking-[0.04em]"
              style={{ color: '#f0f0f8', opacity: blink ? 1 : 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: blink ? 1 : 0 }}
              transition={{ delay: 1.3 }}
            >
              PRESS ENTER TO CONTINUE
            </motion.div>

            {/* Click hint on mobile */}
            <motion.button
              className="font-pixel text-px-6 tracking-[0.04em]"
              style={{ color: 'rgba(200,180,255,0.5)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={() => setPhase('menu')}
            >
              [ tap to continue ]
            </motion.button>

            {/* Copyright */}
            <motion.div
              className="font-pixel text-px-6 absolute bottom-24"
              style={{ color: 'rgba(180,160,220,0.4)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              © 2025 {personal.name.toUpperCase()}
            </motion.div>
          </motion.div>
        ) : (
          /* ── Game Start Menu ─────────────────────────────── */
          <motion.div
            key="menu"
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Mini header */}
            <div className="flex items-center gap-4">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
                alt="Gengar"
                className="sprite-bob"
                style={{
                  imageRendering: 'pixelated',
                  width: 56,
                  height: 56,
                  filter: 'drop-shadow(0 0 8px rgba(112,88,152,0.8))',
                }}
              />
              <div
                className="font-pixel text-px-16"
                style={{
                  color: 'var(--game-electric)',
                  textShadow: '2px 2px 0 rgba(0,0,0,0.9)',
                }}
              >
                POKÉMON
              </div>
            </div>

            {/* Menu box */}
            <div className="game-box w-52">
              {menuItems.map((item, i) => (
                <div
                  key={item.label}
                  className={`game-menu-item ${i < menuItems.length - 1 ? 'border-b-2 border-[var(--game-box-shadow)]/20' : ''}`}
                  onMouseEnter={() => setMenuCursor(i)}
                  onClick={item.action}
                >
                  <span
                    className="font-pixel text-px-10 w-4"
                    style={{ opacity: menuCursor === i ? 1 : 0, color: 'var(--game-text)' }}
                  >
                    ►
                  </span>
                  <span className="font-pixel text-px-8 text-[var(--game-text)]">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
