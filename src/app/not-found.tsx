'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const ACTIONS = [
  { label: 'VIEW RESUME', sub: 'SEE CREDS',  href: '/resume.pdf',  color: '#6890f0' },
  { label: 'CONTACT',     sub: 'SEND MSG',   href: '/#contact',    color: '#f85888' },
  { label: 'GO BACK',     sub: 'RUN AWAY',   href: '/',            color: '#705898' },
  { label: 'PROJECTS',    sub: 'WRITE CODE', href: '/#projects',   color: '#f08030' },
];

export default function NotFound() {
  const [cursor, setCursor] = useState(0);

  return (
    <div
      className="game-screen flex items-center justify-center sky-bg pixel-grid"
      style={{ minHeight: '100vh' }}
    >
      {/* CRT scanlines */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)', zIndex: 3 }} />

      {/* Location badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="location-badge">UNKNOWN AREA</div>
      </div>

      <div className="w-full max-w-2xl mx-auto px-4 relative z-10">

        {/* Battle scene */}
        <div
          className="game-box-dark"
          style={{
            background: 'linear-gradient(180deg, #88c8f8 0%, #58a8e8 38%, #c8e8a0 38%, #78b840 55%, #48880022 100%)',
            minHeight: 220,
            position: 'relative',
            overflow: 'hidden',
            borderBottom: '4px solid #383838',
          }}
        >
          {/* Ground line */}
          <div style={{ position: 'absolute', top: '55%', left: 0, right: 0, height: 4, background: '#383838' }} />

          {/* Enemy: RECRUITER */}
          <motion.div
            style={{ position: 'absolute', top: '6%', right: '8%' }}
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-center">
              <div style={{ fontSize: 72 }}>🧑‍💼</div>
              <div className="font-pixel text-px-8 mt-1" style={{ color: '#383838' }}>RECRUITER Lv.??</div>
              <div style={{ marginTop: 5, width: 80, height: 6, background: '#383838', overflow: 'hidden' }}>
                <div style={{ width: '75%', height: '100%', background: '#58c038' }} />
              </div>
            </div>
          </motion.div>

          {/* Player: Gengar */}
          <motion.div
            style={{ position: 'absolute', bottom: '18%', left: '8%' }}
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-center">
              <img
                src="/sprites/back/94.png"
                alt="Gengar"
                className="sprite-bob"
                style={{ imageRendering: 'pixelated', width: 80, filter: 'drop-shadow(0 0 8px rgba(112,88,152,0.8))' }}
              />
              <div className="font-pixel text-px-8" style={{ color: '#383838' }}>GENGAR Lv.100</div>
              <div style={{ marginTop: 4, width: 80, height: 6, background: '#383838', overflow: 'hidden' }}>
                <div style={{ width: '90%', height: '100%', background: '#58c038' }} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Battle UI box */}
        <motion.div
          className="game-box"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginTop: 0 }}
        >
          <div style={{ display: 'flex', gap: 0 }}>
            {/* Dialogue side */}
            <div style={{ flex: 1, padding: '16px 20px', borderRight: '3px solid var(--game-box-border)' }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <div className="font-vt text-vt-28" style={{ color: 'var(--game-text)' }}>
                  Wild <span style={{ color: '#705898' }}>RECRUITER</span>{' '}appeared!
                </div>
                <div className="font-pixel text-px-8 mt-2" style={{ color: 'var(--game-text-light)' }}>
                  ERROR 404 · PAGE NOT FOUND
                </div>
                <div className="font-pixel text-px-8 mt-3" style={{ color: 'var(--game-text-mid)' }}>
                  What will ELVIN do?
                </div>
              </motion.div>
            </div>

            {/* Action grid */}
            <motion.div
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minWidth: 220 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              {ACTIONS.map((action, i) => (
                <Link
                  key={action.label}
                  href={action.href}
                  onMouseEnter={() => setCursor(i)}
                  className="relative z-10"
                  style={{
                    padding: '12px 16px',
                    borderBottom: i < 2 ? '2px solid var(--game-box-border)' : 'none',
                    borderRight: i % 2 === 0 ? '2px solid var(--game-box-border)' : 'none',
                    background: cursor === i ? 'rgba(112,88,152,0.1)' : 'transparent',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'background 0.1s',
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="font-pixel text-px-8" style={{ opacity: cursor === i ? 1 : 0, color: 'var(--game-text)' }}>►</span>
                    <div>
                      <div className="font-pixel text-px-8" style={{ color: action.color }}>{action.label}</div>
                      <div className="font-pixel text-px-8 mt-0.5" style={{ color: 'var(--game-text-light)' }}>{action.sub}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
