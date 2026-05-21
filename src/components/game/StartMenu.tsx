'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameBox } from './GameBox';
import { MenuCursor } from './MenuCursor';

const MENU_ITEMS = [
  { label: 'TRAINER',  sub: 'EXPERIENCE',  href: '#experience' },
  { label: 'BAG',      sub: 'PROJECTS',    href: '#projects'   },
  { label: 'DIPLOMA',  sub: 'EDUCATION',   href: '#education'  },
  { label: 'POKÉMON',  sub: 'SKILLS',      href: '#skills'     },
  { label: 'SAVE',     sub: 'CONTACT',     href: '#contact'    },
  { label: 'QUIT',     sub: 'CLOSE MENU',  href: ''            },
];

interface StartMenuProps {
  open: boolean;
  onClose: () => void;
}

export function StartMenu({ open, onClose }: StartMenuProps) {
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp')   { e.preventDefault(); setCursor(c => Math.max(0, c - 1)); }
      if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(MENU_ITEMS.length - 1, c + 1)); }
      if (e.key === 'Enter' || e.key === ' ') {
        const item = MENU_ITEMS[cursor];
        if (item.href) {
          document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
        }
        onClose();
      }
      if (e.key === 'Escape' || e.key === 'x' || e.key === 'X') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, cursor, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Transparent backdrop */}
          <motion.div
            className="fixed inset-0 z-[499]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu box — bottom right, like the actual game */}
          <motion.div
            className="fixed bottom-16 right-4 z-[500] w-52"
            initial={{ scaleY: 0, opacity: 0, originY: 1 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            style={{ transformOrigin: 'bottom right' }}
            transition={{ duration: 0.15, ease: 'linear' }}
          >
            <GameBox padding="none">
              {MENU_ITEMS.map((item, i) => (
                <div
                  key={item.label}
                  className={`game-menu-item ${i < MENU_ITEMS.length - 1 ? 'border-b-2 border-[var(--game-box-shadow)]/25' : ''}`}
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => {
                    if (item.href) {
                      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                    }
                    onClose();
                  }}
                >
                  <MenuCursor active={cursor === i} />
                  <div>
                    <div className="font-pixel text-px-8 text-[var(--game-text)]">{item.label}</div>
                    <div className="font-pixel text-px-8 text-[var(--game-text-light)] mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </GameBox>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
