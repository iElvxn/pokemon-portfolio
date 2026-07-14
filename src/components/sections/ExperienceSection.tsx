'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionEnterTransition } from '@/components/game/BattleTransition';
import { MenuCursor } from '@/components/game/MenuCursor';
import { experiences } from '@/data/experience';
import { getTypeColor, PokemonType } from '@/lib/type-colors';

const BADGE_SPRITES = [
  '/badges/volcano.webp',
  '/badges/thunder.webp',
  '/badges/boulder.webp',
  '/badges/earth.webp',
  '/badges/thunder.webp',
  '/badges/boulder.webp',
];

const TYPE_LORE: Record<string, string> = {
  fire:     'Backend / Infra',
  steel:    'DevOps / Cloud',
  electric: 'Frontend',
  water:    'Backend',
  rock:     'Core CS',
  normal:   'General',
  ghost:    'Systems',
  psychic:  'AI / ML',
};

export function ExperienceSection() {
  const [selected, setSelected] = useState(0);
  const exp = experiences[selected];

  return (
    <section
      id="experience"
      className="game-screen flex flex-col items-center relative overflow-hidden"
    >
      <SectionEnterTransition />

      {/* Ambient glow using badge color */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse 55% 45% at 50% 30%, ${exp.badgeColor}14 0%, transparent 65%)`,
          transition: 'background 0.4s ease',
        }}
      />

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="location-badge">GYM BADGES</div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex-1 flex flex-col gap-2 py-14">

        {/* Header */}
        <div className="game-box px-4 py-2 text-center stagger-item">
          <div className="relative z-10 font-pixel text-px-16" style={{ color: 'var(--game-text)' }}>
            EXPERIENCE
          </div>
        </div>

        {/* Badge Case */}
        <div className="game-box relative z-0 stagger-item">
          <div className="relative z-10 px-4 py-3">
            <div className="font-pixel text-px-8 mb-3" style={{ color: 'var(--game-text-light)' }}>
              BADGES EARNED
            </div>
            <div className="flex gap-6 flex-wrap">
              {experiences.map((e, i) => (
                <button
                  key={e.id}
                  onClick={() => setSelected(i)}
                  className="flex flex-col items-center gap-1 focus:outline-none badge-press"
                >
                  <motion.div
                    whileHover={{ scale: 1.15, y: -2 }}
                    animate={{ scale: selected === i ? 1.2 : 1 }}
                    className="w-20 h-20 flex items-center justify-center"
                    style={{
                      background: selected === i ? `${e.badgeColor}22` : 'rgba(255,255,255,0.05)',
                      border: `3px solid ${e.badgeColor}`,
                      boxShadow: selected === i
                        ? `0 0 14px ${e.badgeColor}88, 3px 3px 0 rgba(0,0,0,0.4)`
                        : '3px 3px 0 rgba(0,0,0,0.4)',
                      transition: 'background 0.2s, box-shadow 0.2s',
                    }}
                  >
                    <img
                      src={BADGE_SPRITES[i]}
                      alt={`${e.company} badge`}
                      width={52}
                      height={52}
                      style={{
                        imageRendering: 'pixelated',
                        filter: selected === i ? `drop-shadow(0 0 4px ${e.badgeColor})` : 'none',
                      }}
                    />
                  </motion.div>
                  <span className="font-pixel text-px-10" style={{ color: e.badgeColor }}>
                    {e.company.toUpperCase()}
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
            className="game-box relative z-0 flex-1 stagger-item"
          >
            <div className="relative z-10">
              {/* Job header */}
              <div
                className="flex items-start gap-3 px-4 py-4 flex-wrap"
                style={{ borderBottom: '3px solid var(--game-box-border)' }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${exp.badgeColor}22`,
                    border: `3px solid ${exp.badgeColor}`,
                    boxShadow: `0 0 10px ${exp.badgeColor}66`,
                  }}
                >
                  <img
                    src={BADGE_SPRITES[selected]}
                    alt={`${exp.company} badge`}
                    width={32}
                    height={32}
                    style={{ imageRendering: 'pixelated', filter: `drop-shadow(0 0 4px ${exp.badgeColor})` }}
                  />
                </div>
                <div className="flex-1 min-w-[140px]">
                  <div className="font-pixel text-px-12" style={{ color: 'var(--game-text)' }}>
                    {exp.role.toUpperCase()}
                  </div>
                  <div className="font-pixel text-px-10 mt-0.5" style={{ color: exp.badgeColor }}>
                    {exp.company.toUpperCase()}
                  </div>
                  <div className="flex gap-4 mt-1 flex-wrap">
                    <span className="font-pixel text-px-8" style={{ color: 'var(--game-text-light)' }}>
                      {exp.startDate.toUpperCase()} – {exp.endDate.toUpperCase()}
                    </span>
                    <span className="font-pixel text-px-8" style={{ color: 'var(--game-text-light)' }}>
                      {exp.location.toUpperCase()}
                    </span>
                  </div>
                </div>
                {/* Tech type badges with tooltips */}
                <div className="flex gap-1 flex-wrap justify-end">
                  {exp.techStack.slice(0, 3).map((type, ti) => {
                    const col  = getTypeColor(type as PokemonType);
                    const lore = TYPE_LORE[type];
                    return (
                      <div key={ti} className="type-tooltip-wrapper">
                        <span
                          className="font-pixel text-px-8 px-1.5 py-0.5 badge-shimmer"
                          style={{ background: col, color: '#fff', border: '1px solid rgba(0,0,0,0.3)' }}
                        >
                          {type.toUpperCase().slice(0, 4)}
                        </span>
                        {lore && <div className="type-tooltip">{lore}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Achievements */}
              <div
                className="px-4 py-4"
                style={{ borderBottom: '2px solid var(--game-box-border)' }}
              >
                <div className="font-pixel text-px-8 mb-3" style={{ color: 'var(--game-text-light)' }}>
                  BATTLE LOG
                </div>
                <div className="space-y-2.5">
                  {exp.achievements.map((a, ai) => (
                    <div key={ai} className="flex items-start gap-2">
                      <span className="font-pixel text-px-8 flex-shrink-0 mt-0.5" style={{ color: exp.badgeColor }}>
                        ►
                      </span>
                      <span className="font-vt text-vt-22" style={{ color: 'var(--game-text)' }}>
                        {a}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Level gained */}
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="font-pixel text-px-10" style={{ color: 'var(--game-electric)' }}>
                  LEVEL UP!
                </span>
                <span className="font-vt text-vt-22" style={{ color: 'var(--game-text)' }}>
                  {exp.levelGained}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="text-center">
          <span className="font-pixel text-px-8" style={{ color: 'var(--game-text-light)' }}>
            SELECT BADGE TO VIEW EXPERIENCE
          </span>
        </div>
      </div>
    </section>
  );
}
