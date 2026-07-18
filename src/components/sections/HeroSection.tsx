'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionEnterTransition } from '@/components/game/BattleTransition';
import { personal } from '@/data/personal';

type Phase = 'title' | 'menu' | 'transition';

function outline(size: number, color = '#1a0c36', drop = true): string {
  const s = size;
  const layers = [
    `${-s}px ${-s}px 0 ${color}`, `${s}px ${-s}px 0 ${color}`,
    `${-s}px ${s}px 0 ${color}`,  `${s}px ${s}px 0 ${color}`,
    `0 ${-s}px 0 ${color}`,       `0 ${s}px 0 ${color}`,
    `${-s}px 0 0 ${color}`,       `${s}px 0 0 ${color}`,
    `${-(s-1)}px ${-s}px 0 ${color}`, `${s-1}px ${-s}px 0 ${color}`,
    `${-s}px ${-(s-1)}px 0 ${color}`, `${s}px ${-(s-1)}px 0 ${color}`,
    `${-(s-1)}px ${s}px 0 ${color}`,  `${s-1}px ${s}px 0 ${color}`,
    `${-s}px ${s-1}px 0 ${color}`,    `${s}px ${s-1}px 0 ${color}`,
  ];
  if (drop) layers.push(`${s + 3}px ${s + 5}px 0 rgba(0,0,0,0.4)`);
  return layers.join(', ');
}

const NAV_ITEMS = [
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS',   href: '#projects'   },
  { label: 'EDUCATION',  href: '#education'  },
  { label: 'SKILLS',     href: '#skills'     },
  { label: 'CONTACT',    href: '#contact'    },
];

/* Condensed intro facts — replaces the old standalone About section */
const HERO_FACTS = [
  'SWE INTERN @ CAPITAL ONE',
  'MS CS @ STONY BROOK (EXP. 2027)',
  'BS CS, 3.72 GPA',
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 5)  return 'GOOD NIGHT, TRAINER';
  if (h < 12) return 'GOOD MORNING, TRAINER';
  if (h < 17) return 'GOOD AFTERNOON, TRAINER';
  if (h < 21) return 'GOOD EVENING, TRAINER';
  return 'GOOD NIGHT, TRAINER';
}

export function HeroSection() {
  const [phase, setPhase]           = useState<Phase>('title');
  const [menuCursor, setMenuCursor] = useState(0);
  const [blink, setBlink]           = useState(true);
  const [visible, setVisible]       = useState(false);
  const [gengarBubble, setGengarBubble] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const greeting = getGreeting();

  /* ── Mouse parallax — depth layers shift at different speeds.
     Disabled entirely for prefers-reduced-motion. ─────────────── */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springMx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const springMy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  /* Farthest layer moves least, nearest (Gengar) moves most */
  const bgX     = useTransform(springMx, (v) => v * -25);
  const bgY     = useTransform(springMy, (v) => v * -16);
  const groundX = useTransform(springMx, (v) => v * -40);
  const gengarX = useTransform(springMx, (v) => v * -70);
  const gengarY = useTransform(springMy, (v) => v * -40);

  function handleHeroMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleHeroMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  /* Always start at top, lock scroll on the splash screen */
  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = ''; };
  }, []);

  /* Wait for SectionEnterTransition (~400ms) */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 420);
    return () => clearTimeout(t);
  }, []);

  /* Blink timer */
  useEffect(() => {
    const t = setInterval(() => setBlink(b => !b), 600);
    return () => clearInterval(t);
  }, []);

  function navigateTo(href: string) {
    setPhase('transition');
    /* Unlock scroll and navigate at the peak of the flash */
    setTimeout(() => {
      document.documentElement.style.overflow = '';
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'instant' });
    }, 300);
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (phase === 'title') {
        /* Let keyboard users Tab to and activate the trainer-card links
           normally instead of hijacking every keypress into the menu */
        if ((e.target as HTMLElement | null)?.closest('a, button')) return;
        e.preventDefault();
        setPhase('menu');
      } else if (phase === 'menu') {
        if (e.key === 'ArrowDown') { e.preventDefault(); setMenuCursor(c => Math.min(NAV_ITEMS.length - 1, c + 1)); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); setMenuCursor(c => Math.max(0, c - 1)); }
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigateTo(NAV_ITEMS[menuCursor].href); }
        if (e.key === 'Escape') setPhase('title');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [phase, menuCursor]);

  return (
    <section
      id="hero"
      className="game-screen relative overflow-hidden"
      style={{ cursor: phase === 'title' ? 'pointer' : 'default' }}
      onClick={() => { if (phase === 'title') setPhase('menu'); }}
      onMouseMove={handleHeroMouseMove}
      onMouseLeave={handleHeroMouseLeave}
    >
      <SectionEnterTransition />

      {/* Wallpaper — farthest parallax layer, scaled up so panning
          never reveals empty edges */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/wallpaper.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          scale: 1.08,
          x: bgX,
          y: bgY,
        }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(8,4,18,0.28)' }}
      />
      {/* Ground gradient — mid-depth parallax layer */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(15,8,32,0.7) 100%)',
          x: groundX,
        }}
      />
      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
          zIndex: 3,
        }}
      />

      {/* Gengar — clickable easter egg; nearest/fastest parallax layer */}
      <motion.div className="absolute z-10 inset-0 pointer-events-none" style={{ x: gengarX, y: gengarY }}>
        <motion.div
          className="absolute pointer-events-auto"
          style={{ left: '8%', top: '50%', transform: 'translateY(-50%)', position: 'absolute' }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              setGengarBubble(true);
              setTimeout(() => setGengarBubble(false), 1800);
            }}
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
            <AnimatePresence>
              {gengarBubble && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{
                    position: 'absolute',
                    top: '-42px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--game-box)',
                    border: '3px solid var(--game-box-border)',
                    boxShadow: '3px 3px 0 var(--game-box-border)',
                    padding: '4px 10px',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                  }}
                >
                  <span className="font-pixel text-px-8" style={{ color: 'var(--game-text)' }}>...</span>
                  {/* speech tail */}
                  <div style={{
                    position: 'absolute',
                    bottom: -8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0, height: 0,
                    borderLeft: '6px solid transparent',
                    borderRight: '6px solid transparent',
                    borderTop: '8px solid var(--game-box-border)',
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: -5,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0, height: 0,
                    borderLeft: '5px solid transparent',
                    borderRight: '5px solid transparent',
                    borderTop: '6px solid var(--game-box)',
                  }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Main content — title text always rendered ────── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
        {/* Title block — shrinks up slightly in menu phase */}
        <motion.div
          className="flex flex-col items-center gap-3 sm:gap-4"
          animate={{ y: phase === 'menu' ? -32 : 0, scale: phase === 'menu' ? 0.88 : 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ paddingBottom: phase === 'title' ? '8%' : '0' }}
        >
          {/* Time-based greeting */}
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
            transition={{ duration: 0.4 }}
          >
            {greeting}
          </motion.div>

          {/* NAME */}
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
        </motion.div>

        {/* CTA or nav menu — swaps below the title */}
        <AnimatePresence mode="wait">
          {phase === 'title' && (
            <motion.div
              key="cta"
              className="flex flex-col items-center gap-3 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.35 }}
            >
              {/* Condensed intro card — tagline + key facts + resume,
                  visible immediately (no need to press start first) */}
              <div
                className="game-box px-4 py-3 flex flex-col gap-2.5 w-72 text-left"
                style={{ maxWidth: '85vw' }}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-vt text-vt-20 leading-snug" style={{ color: 'var(--game-text-mid)' }}>
                  {personal.bio}
                </p>
                <div className="flex flex-col gap-1">
                  {HERO_FACTS.map((fact) => (
                    <div key={fact} className="flex items-start gap-1.5">
                      <span className="font-pixel text-px-8 flex-shrink-0" style={{ color: 'var(--game-accent)' }}>►</span>
                      <span className="font-pixel text-px-8" style={{ color: 'var(--game-text)' }}>{fact}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={personal.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="game-box game-box-sm font-pixel text-px-8 px-3 py-1.5 text-center mt-0.5"
                  style={{ color: 'var(--game-text)', textDecoration: 'none' }}
                >
                  RESUME ►
                </a>
              </div>

              <div
                className="font-pixel text-px-8 select-none"
                style={{
                  color: '#ffffff',
                  opacity: visible && blink ? 1 : 0,
                  textShadow: outline(2, '#1a0c36', false),
                  letterSpacing: '0.04em',
                  transition: 'opacity 0.1s',
                }}
              >
                PRESS ANY KEY TO CONTINUE
              </div>
            </motion.div>
          )}

          {phase === 'menu' && (
            <motion.div
              key="nav"
              className="w-60 mt-3"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              style={{ transformOrigin: 'top center' }}
              transition={{ duration: 0.14, ease: 'linear' }}
            >
              <div className="game-box">
                {NAV_ITEMS.map((item, i) => (
                  <div
                    key={item.label}
                    className={`game-menu-item cursor-pointer${i < NAV_ITEMS.length - 1 ? ' border-b-2 border-[var(--game-box-shadow)]/25' : ''}`}
                    onMouseEnter={() => setMenuCursor(i)}
                    onClick={() => navigateTo(item.href)}
                  >
                    <span
                      className="font-pixel text-px-10 w-4 flex-shrink-0"
                      style={{ opacity: menuCursor === i ? 1 : 0, color: 'var(--game-text)' }}
                    >
                      ►
                    </span>
                    <div className="font-pixel text-px-10 text-[var(--game-text)]">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Battle-flash transition overlay ──────────────── */}
      <AnimatePresence>
        {phase === 'transition' && (
          <motion.div
            className="absolute inset-0 z-50"
            style={{ background: '#ffffff' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.6, times: [0, 0.25, 0.6, 1], ease: 'linear' }}
          />
        )}
      </AnimatePresence>

      {/* Copyright */}
      <motion.div
        className="font-pixel text-px-8 absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
        style={{ color: 'rgba(255,255,255,0.45)', textShadow: '1px 1px 0 rgba(0,0,0,0.9)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ delay: 1.0 }}
      >
        © 2025 {personal.name.toUpperCase()}
      </motion.div>
    </section>
  );
}
