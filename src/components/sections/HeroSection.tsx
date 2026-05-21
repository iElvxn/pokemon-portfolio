'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionEnterTransition } from '@/components/game/BattleTransition';
import { personal } from '@/data/personal';

type Phase = 'title' | 'menu';

/* ── Pokemon logo text-shadow outline helper ───────────────── */
function outline(size: number, color = '#1a0c36', drop = true): string {
  const s = size;
  const layers = [
    `${-s}px ${-s}px 0 ${color}`,
    `${s}px ${-s}px 0 ${color}`,
    `${-s}px ${s}px 0 ${color}`,
    `${s}px ${s}px 0 ${color}`,
    `0 ${-s}px 0 ${color}`,
    `0 ${s}px 0 ${color}`,
    `${-s}px 0 0 ${color}`,
    `${s}px 0 0 ${color}`,
    /* fill diagonals for smooth thick pixel outline */
    `${-(s - 1)}px ${-s}px 0 ${color}`,
    `${s - 1}px ${-s}px 0 ${color}`,
    `${-s}px ${-(s - 1)}px 0 ${color}`,
    `${s}px ${-(s - 1)}px 0 ${color}`,
    `${-(s - 1)}px ${s}px 0 ${color}`,
    `${s - 1}px ${s}px 0 ${color}`,
    `${-s}px ${s - 1}px 0 ${color}`,
    `${s}px ${s - 1}px 0 ${color}`,
  ];
  if (drop) layers.push(`${s + 3}px ${s + 5}px 0 rgba(0,0,0,0.4)`);
  return layers.join(', ');
}

export function HeroSection() {
  const [phase, setPhase]           = useState<Phase>('title');
  const [menuCursor, setMenuCursor] = useState(0);
  const [blink, setBlink]           = useState(true);
  const [visible, setVisible]       = useState(false);

  /* Wait for SectionEnterTransition to clear (~400ms) */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 420);
    return () => clearTimeout(t);
  }, []);

  /* Blink timer */
  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 600);
    return () => clearInterval(t);
  }, []);

  /* Keyboard nav */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase === 'title') {
        if (e.key === 'Enter' || e.key === ' ') setPhase('menu');
      } else {
        if (e.key === 'ArrowDown') setMenuCursor(c => Math.min(2, c + 1));
        if (e.key === 'ArrowUp')   setMenuCursor(c => Math.max(0, c - 1));
        if (e.key === 'Enter' || e.key === ' ')
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase]);

  const menuItems = [
    { label: 'CONTINUE', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'NEW GAME', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'OPTIONS',  action: () => {} },
  ];

  return (
    <section
      id="hero"
      className="game-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(/wallpaper.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <SectionEnterTransition />

      {/* Subtle dark overlay — keeps text readable, preserves wallpaper vibrancy */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(8,4,18,0.28)' }}
      />

      {/* Bottom ground gradient — ties into the rest of the site */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(15,8,32,0.7) 100%)' }}
      />

      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
          zIndex: 3,
        }}
      />

      {/* ── Gengar — floats on the left like Beautifly in the reference ── */}
      <motion.div
        className="absolute z-10"
        style={{ left: '8%', top: '50%', transform: 'translateY(-50%)' }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -30 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
          alt="Gengar"
          className="sprite-float"
          style={{
            imageRendering: 'pixelated',
            width: 'clamp(80px, 11vw, 144px)',
            height: 'auto',
            filter: [
              'drop-shadow(0 0 14px rgba(112,88,152,1))',
              'drop-shadow(0 0 36px rgba(112,88,152,0.65))',
              'drop-shadow(0 0 64px rgba(112,88,152,0.3))',
              'brightness(1.15)',
            ].join(' '),
          }}
        />
      </motion.div>

      {/* ── Main content ─────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'title' ? (
          <motion.div
            key="title"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 sm:gap-5 text-center px-4"
            style={{ paddingBottom: '12%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* "Hi, my name is" intro */}
            <motion.div
              className="font-pixel select-none"
              style={{
                fontSize: 'clamp(8px, 1.6vw, 14px)',
                color: '#ffffff',
                letterSpacing: '0.22em',
                textShadow: outline(2, '#1a0c36', false),
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{ delay: 0.0, duration: 0.4 }}
            >
              HI, MY NAME IS
            </motion.div>

            {/* ── NAME — big yellow logo treatment ─────────── */}
            <motion.div
              initial={{ opacity: 0, y: -28, scale: 0.88 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -28, scale: visible ? 1 : 0.88 }}
              transition={{ delay: 0.08, duration: 0.55, type: 'spring', stiffness: 180, damping: 18 }}
            >
              <div
                className="font-pixel leading-none select-none"
                style={{
                  fontSize: 'clamp(28px, 7vw, 64px)',
                  color: '#F8D030',
                  textShadow: outline(5, '#1a0c36'),
                  letterSpacing: '0.06em',
                }}
              >
                {personal.name.toUpperCase()}
              </div>
            </motion.div>

            {/* Role subtitle */}
            <motion.div
              className="font-pixel select-none"
              style={{
                fontSize: 'clamp(10px, 2.2vw, 20px)',
                color: '#ffffff',
                letterSpacing: '0.2em',
                textShadow: outline(3, '#1a0c36'),
              }}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
              transition={{ delay: 0.22, duration: 0.4 }}
            >
              SOFTWARE ENGINEER
            </motion.div>

            {/* PRESS ENTER — blinking */}
            <motion.div
              className="font-pixel text-px-8 select-none"
              style={{
                color: '#ffffff',
                opacity: visible && blink ? 1 : 0,
                textShadow: outline(2, '#1a0c36', false),
                letterSpacing: '0.04em',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: visible && blink ? 1 : 0 }}
              transition={{ delay: 0.7 }}
            >
              PRESS ENTER TO CONTINUE
            </motion.div>

            {/* Mobile tap hint */}
            <motion.button
              className="font-pixel text-px-6"
              style={{
                color: 'rgba(255,255,255,0.65)',
                textShadow: '1px 1px 0 rgba(0,0,0,0.9)',
                marginTop: 4,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{ delay: 1.4 }}
              onClick={() => setPhase('menu')}
            >
              [ tap to continue ]
            </motion.button>

            {/* Copyright */}
            <motion.div
              className="font-pixel text-px-6 absolute bottom-6"
              style={{
                color: 'rgba(255,255,255,0.45)',
                textShadow: '1px 1px 0 rgba(0,0,0,0.9)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={{ delay: 1.0 }}
            >
              © 2025 {personal.name.toUpperCase()}
            </motion.div>
          </motion.div>

        ) : (
          /* ── Game Start Menu ─────────────────────────────── */
          <motion.div
            key="menu"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {/* Name header in menu phase */}
            <motion.div
              className="font-pixel leading-none select-none"
              style={{
                fontSize: 'clamp(18px, 4vw, 36px)',
                color: '#F8D030',
                textShadow: outline(4, '#1a0c36'),
                letterSpacing: '0.06em',
              }}
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
            >
              {personal.name.toUpperCase()}
            </motion.div>

            {/* Menu box — snaps open like the game */}
            <motion.div
              className="game-box w-52"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              style={{ transformOrigin: 'top center' }}
              transition={{ duration: 0.14, ease: 'linear' }}
            >
              {menuItems.map((item, i) => (
                <div
                  key={item.label}
                  className={`game-menu-item${i < menuItems.length - 1 ? ' border-b-2 border-[var(--game-box-shadow)]/25' : ''}`}
                  onMouseEnter={() => setMenuCursor(i)}
                  onClick={item.action}
                >
                  <span
                    className="font-pixel text-px-10 w-4 flex-shrink-0"
                    style={{ opacity: menuCursor === i ? 1 : 0, color: 'var(--game-text)' }}
                  >
                    ►
                  </span>
                  <span className="font-pixel text-px-8 text-[var(--game-text)]">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
