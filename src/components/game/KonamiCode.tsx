'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SEQUENCE = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
];

const ACTIONS = [
  { label: 'FIGHT',    sub: 'WRITE CODE', color: '#f08030', href: '#projects' },
  { label: 'RESUME',   sub: 'SEE CREDS',  color: '#6890f0', href: '/resume.pdf' },
  { label: 'RUN',      sub: 'GO BACK',    color: '#705898', href: '#hero' },
  { label: 'CONTACT',  sub: 'SEND MSG',   color: '#f85888', href: '#contact' },
];

export function KonamiCode() {
  const [keys,      setKeys]      = useState<string[]>([]);
  const [active,    setActive]    = useState(false);
  const [curAction, setCurAction] = useState(0);
  const [phase,     setPhase]     = useState<'slide-in' | 'battle' | 'exit'>('slide-in');

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (active) {
        if (e.key === 'Escape') setActive(false);
        if (e.key === 'ArrowDown')  setCurAction(a => Math.min(ACTIONS.length - 1, a + 1));
        if (e.key === 'ArrowUp')    setCurAction(a => Math.max(0, a - 1));
        if (e.key === 'Enter') {
          const href = ACTIONS[curAction].href;
          setActive(false);
          if (href.startsWith('/')) {
            window.open(href, '_blank');
          } else {
            const el = document.querySelector(href);
            if (el) {
              document.documentElement.style.overflow = '';
              el.scrollIntoView({ behavior: 'instant' });
            }
          }
        }
        return;
      }

      setKeys(prev => {
        const next = [...prev, e.key].slice(-SEQUENCE.length);
        if (next.join(',') === SEQUENCE.join(',')) {
          setActive(true);
          setPhase('slide-in');
          setTimeout(() => setPhase('battle'), 800);
          return [];
        }
        return next;
      });
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [active, curAction]);

  function handleActionClick(href: string) {
    setActive(false);
    if (href.startsWith('/')) {
      window.open(href, '_blank');
    } else {
      const el = document.querySelector(href);
      if (el) {
        document.documentElement.style.overflow = '';
        el.scrollIntoView({ behavior: 'instant' });
      }
    }
  }

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="konami-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={() => setActive(false)}
        >
          {/* GBA battle background */}
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              background: 'linear-gradient(180deg, #88c8f8 0%, #58a8e8 40%, #c8e8a0 40%, #98c860 60%, #48882000 100%)',
              imageRendering: 'pixelated',
            }}
          />
          {/* Pixel ground line */}
          <div style={{ position: 'absolute', top: '42%', left: 0, right: 0, height: 4, background: '#383838' }} />

          {/* Enemy: RECRUITER */}
          <motion.div
            style={{ position: 'absolute', top: '8%', right: '10%' }}
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: phase === 'battle' ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22,1,0.36,1] }}
          >
            <div className="text-center">
              <div style={{ fontSize: 'clamp(56px, 10vw, 96px)', lineHeight: 1 }}>🧑‍💼</div>
              <div className="font-pixel text-px-8 mt-1" style={{ color: '#383838' }}>RECRUITER</div>
              <div className="font-pixel text-px-8" style={{ color: '#383838' }}>Lv.??</div>
              <div style={{ marginTop: 6, width: 80, height: 6, background: '#383838', position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '75%', height: '100%', background: '#58c038' }} />
              </div>
            </div>
          </motion.div>

          {/* Player: Gengar */}
          <motion.div
            style={{ position: 'absolute', bottom: '22%', left: '10%' }}
            initial={{ x: -120, opacity: 0 }}
            animate={{ x: 0, opacity: phase === 'battle' ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.22,1,0.36,1] }}
          >
            <div className="text-center">
              <img
                src="/sprites/back/94.png"
                alt="Gengar"
                className="sprite-bob"
                style={{
                  imageRendering: 'pixelated',
                  width: 'clamp(64px, 10vw, 96px)',
                  filter: 'drop-shadow(0 0 8px rgba(112,88,152,0.8))',
                }}
              />
              <div className="font-pixel text-px-8" style={{ color: '#383838' }}>GENGAR Lv.100</div>
              <div style={{ marginTop: 4, width: 80, height: 6, background: '#383838', overflow: 'hidden' }}>
                <div style={{ width: '90%', height: '100%', background: '#58c038' }} />
              </div>
            </div>
          </motion.div>

          {/* Battle UI box */}
          <motion.div
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
            initial={{ y: 160 }}
            animate={{ y: phase === 'battle' ? 0 : 160 }}
            transition={{ duration: 0.4, delay: 0.5, ease: [0.22,1,0.36,1] }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ background: '#f0f0e8', border: '4px solid #383838', margin: '0 4px 4px', position: 'relative' }}>
              {/* Inner bevel */}
              <div style={{ position: 'absolute', inset: 2, borderTop: '2px solid #fff', borderLeft: '2px solid #fff', borderBottom: '2px solid #787878', borderRight: '2px solid #787878', pointerEvents: 'none' }} />

              <div style={{ display: 'flex', gap: 0 }}>
                {/* Dialogue side */}
                <div style={{ flex: 1, padding: '12px 16px', borderRight: '4px solid #383838' }}>
                  <div className="font-vt text-vt-24" style={{ color: '#383838' }}>
                    Wild <span style={{ color: '#705898', fontFamily: 'inherit' }}>RECRUITER</span> appeared!
                  </div>
                  <div className="font-pixel text-px-8 mt-1" style={{ color: '#787878' }}>
                    What will ELVIN do?
                  </div>
                </div>

                {/* Action grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, minWidth: 200 }}>
                  {ACTIONS.map((action, i) => (
                    <button
                      key={action.label}
                      onClick={() => handleActionClick(action.href)}
                      onMouseEnter={() => setCurAction(i)}
                      style={{
                        padding: '10px 14px',
                        borderBottom: i < 2 ? '2px solid #383838' : 'none',
                        borderRight: i % 2 === 0 ? '2px solid #383838' : 'none',
                        background: curAction === i ? 'rgba(112,88,152,0.1)' : 'transparent',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <span className="font-pixel text-px-8" style={{ opacity: curAction === i ? 1 : 0, color: '#383838' }}>►</span>
                        <div>
                          <div className="font-pixel text-px-8" style={{ color: action.color }}>{action.label}</div>
                          <div className="font-pixel text-px-8" style={{ color: '#787878' }}>{action.sub}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* "Wild RECRUITER appeared!" slide-in bands */}
          <AnimatePresence>
            {phase === 'slide-in' && (
              <>
                <motion.div
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: '#000', zIndex: 10 }}
                  initial={{ y: 0 }}
                  animate={{ y: '-100%' }}
                  exit={{}}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
                <motion.div
                  style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', background: '#000', zIndex: 10 }}
                  initial={{ y: 0 }}
                  animate={{ y: '100%' }}
                  exit={{}}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </>
            )}
          </AnimatePresence>

          {/* ESC hint */}
          <div
            className="font-pixel text-px-8"
            style={{ position: 'absolute', top: 12, right: 12, color: 'rgba(0,0,0,0.4)', zIndex: 20 }}
          >
            ESC TO FLEE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
