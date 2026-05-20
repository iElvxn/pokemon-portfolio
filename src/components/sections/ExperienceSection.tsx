'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionEnterTransition } from '@/components/game/BattleTransition';
import { MenuCursor } from '@/components/game/MenuCursor';
import { experiences } from '@/data/experience';
import { getTypeColor, PokemonType } from '@/lib/type-colors';

/* Badge icons using Pokemon gym badge style shapes */
const BADGE_ICONS = ['⬡', '◈', '✦', '❋', '⟡', '◆'];

export function ExperienceSection() {
  const [selected, setSelected] = useState(0);
  const exp = experiences[selected];

  return (
    <section
      id="experience"
      className="game-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--game-bg)' }}
    >
      <SectionEnterTransition />

      {/* Section label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="location-badge">BADGE CASE</div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col gap-3">

        {/* Header */}
        <div className="game-box px-4 py-2 text-center">
          <div className="relative z-10 font-pixel text-px-16" style={{ color: 'var(--game-text)' }}>
            TRAINER INFO
          </div>
        </div>

        {/* Badge Case — top row */}
        <div className="game-box relative z-0">
          <div className="relative z-10 px-4 py-2">
            <div className="font-pixel text-px-8 mb-3" style={{ color: 'var(--game-text-light)' }}>
              BADGES EARNED
            </div>
            <div className="flex gap-4 flex-wrap">
              {experiences.map((e, i) => (
                <button
                  key={e.id}
                  onClick={() => setSelected(i)}
                  className="flex flex-col items-center gap-1 focus:outline-none"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, y: -2 }}
                    animate={{ scale: selected === i ? 1.2 : 1 }}
                    className="w-12 h-12 flex items-center justify-center font-pixel text-px-24"
                    style={{
                      background: selected === i ? e.badgeColor : 'rgba(255,255,255,0.05)',
                      border: `3px solid ${e.badgeColor}`,
                      boxShadow: selected === i
                        ? `0 0 14px ${e.badgeColor}88, 3px 3px 0 rgba(0,0,0,0.4)`
                        : '3px 3px 0 rgba(0,0,0,0.4)',
                      color: selected === i ? '#fff' : e.badgeColor,
                      transition: 'background 0.2s, box-shadow 0.2s',
                    }}
                  >
                    {BADGE_ICONS[i] ?? '◆'}
                  </motion.div>
                  <span className="font-pixel text-px-6" style={{ color: e.badgeColor }}>
                    {e.company.split(' ')[0].toUpperCase().slice(0, 6)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="game-box relative z-0"
          >
            <div className="relative z-10">
              {/* Job header */}
              <div
                className="flex items-start gap-3 px-4 py-3"
                style={{ borderBottom: '3px solid var(--game-box-border)' }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center font-pixel text-px-20 flex-shrink-0"
                  style={{
                    background: exp.badgeColor,
                    border: `3px solid rgba(0,0,0,0.3)`,
                    color: '#fff',
                  }}
                >
                  {BADGE_ICONS[selected] ?? '◆'}
                </div>
                <div className="flex-1">
                  <div className="font-pixel text-px-10" style={{ color: 'var(--game-text)' }}>
                    {exp.role.toUpperCase()}
                  </div>
                  <div className="font-pixel text-px-8 mt-0.5" style={{ color: exp.badgeColor }}>
                    {exp.company.toUpperCase()}
                  </div>
                  <div className="flex gap-4 mt-1">
                    <span className="font-pixel text-px-6" style={{ color: 'var(--game-text-light)' }}>
                      {exp.startDate.toUpperCase()} – {exp.endDate.toUpperCase()}
                    </span>
                    <span className="font-pixel text-px-6" style={{ color: 'var(--game-text-light)' }}>
                      {exp.location.toUpperCase()}
                    </span>
                  </div>
                </div>
                {/* Tech types */}
                <div className="flex gap-1 flex-wrap justify-end">
                  {exp.techStack.slice(0, 3).map((type, ti) => {
                    const col = getTypeColor(type as PokemonType);
                    return (
                      <span
                        key={ti}
                        className="font-pixel text-px-6 px-1.5 py-0.5"
                        style={{ background: col, color: '#fff', border: '1px solid rgba(0,0,0,0.3)' }}
                      >
                        {type.toUpperCase().slice(0, 4)}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Achievements */}
              <div
                className="px-4 py-3"
                style={{ borderBottom: '2px solid var(--game-box-border)' }}
              >
                <div className="font-pixel text-px-6 mb-2" style={{ color: 'var(--game-text-light)' }}>
                  BATTLE LOG
                </div>
                <div className="space-y-1.5">
                  {exp.achievements.map((a, ai) => (
                    <div key={ai} className="flex items-start gap-2">
                      <span className="font-pixel text-px-8 flex-shrink-0 mt-0.5" style={{ color: exp.badgeColor }}>
                        ►
                      </span>
                      <span className="font-vt text-vt-20" style={{ color: 'var(--game-text)' }}>
                        {a}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Level gained */}
              <div className="flex items-center gap-3 px-4 py-2">
                <span
                  className="font-pixel text-px-10"
                  style={{ color: 'var(--game-electric)' }}
                >
                  LEVEL UP!
                </span>
                <span className="font-vt text-vt-20" style={{ color: 'var(--game-text)' }}>
                  {exp.levelGained}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation hint */}
        <div className="text-center">
          <span className="font-pixel text-px-6" style={{ color: 'var(--game-text-light)' }}>
            SELECT BADGE TO VIEW EXPERIENCE
          </span>
        </div>
      </div>
    </section>
  );
}
