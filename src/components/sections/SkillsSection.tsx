'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionEnterTransition } from '@/components/game/BattleTransition';
import { MenuCursor } from '@/components/game/MenuCursor';
import { skillCategories } from '@/data/skills';
import { getTypeColor, PokemonType } from '@/lib/type-colors';

const TYPE_SPRITE: Record<string, string> = {
  dragon:   '149',  // Dragonite
  electric: '145',  // Zapdos
  water:    '134',  // Vaporeon
  fire:     '136',  // Flareon
  steel:    '208',  // Steelix
  psychic:  '196',  // Espeon
};

const TYPE_LORE: Record<string, string> = {
  dragon:   'Languages — the rare foundation',
  electric: 'Frontend — fast & flashy',
  water:    'Backend — deep & reliable',
  fire:     'Databases — hot data',
  steel:    'DevOps / Cloud — battle-hardened',
  psychic:  'AI / ML — powerful mind',
};

export function SkillsSection() {
  const [active, setActive] = useState(0);
  const category   = skillCategories[active];
  const typeColor  = getTypeColor(category.type as PokemonType);
  const spriteId   = TYPE_SPRITE[category.type] ?? '132';

  return (
    <section
      id="skills"
      className="game-screen flex flex-col items-center relative overflow-hidden"
    >
      <SectionEnterTransition />

      {/* Ambient type glow — shifts with active category */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 80% 40%, ${typeColor}12 0%, transparent 65%)`,
          transition: 'background 0.5s ease',
        }}
      />

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="location-badge">POKEMON CENTER</div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex-1 flex flex-col gap-2 py-14">

        <div className="game-box px-4 py-2 text-center stagger-item">
          <div className="relative z-10 font-pixel text-px-16" style={{ color: 'var(--game-text)' }}>
            SKILLS
          </div>
        </div>

        <div className="flex gap-4 flex-1 min-h-0 mobile-stack">

          {/* ── Left: Type menu ────────────────────────────── */}
          <div className="game-box w-60 flex-shrink-0 flex flex-col overflow-hidden stagger-item mobile-full">
            {skillCategories.map((cat, i) => {
              const col      = getTypeColor(cat.type as PokemonType);
              const isActive = i === active;
              const lore     = TYPE_LORE[cat.type];
              return (
                <div
                  key={cat.type}
                  className="game-menu-item relative z-10 cursor-pointer"
                  style={{
                    background: isActive ? 'rgba(112,88,152,0.15)' : 'transparent',
                    borderBottom: i < skillCategories.length - 1 ? '2px solid var(--game-box-shadow)' : 'none',
                  }}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <MenuCursor active={isActive} />
                  <div className="flex items-center gap-2">
                    <div className="type-tooltip-wrapper">
                      <span
                        className="font-pixel text-px-8 px-1 py-0.5 badge-shimmer"
                        style={{ background: col, color: '#fff', border: '1px solid rgba(0,0,0,0.3)', minWidth: 36, textAlign: 'center', display: 'inline-block' }}
                      >
                        {cat.type.toUpperCase().slice(0, 4)}
                      </span>
                      {lore && <div className="type-tooltip" style={{ fontSize: 6 }}>{lore}</div>}
                    </div>
                    <div className="font-pixel text-px-12" style={{ color: 'var(--game-text)' }}>
                      {cat.label.toUpperCase()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Right: Skill stats panel ──────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col stagger-item">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.22 }}
                className="game-box flex flex-col flex-1"
              >
                {/* Panel header */}
                <div
                  className="flex items-center gap-3 px-4 py-3 relative z-10"
                  style={{ borderBottom: '3px solid var(--game-box-border)' }}
                >
                  <img
                    src={`/sprites/${spriteId}.png`}
                    alt={category.type}
                    width={64}
                    height={64}
                    className="sprite-bob"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <div>
                    <div className="font-pixel text-px-12" style={{ color: 'var(--game-text)' }}>
                      {category.label.toUpperCase()}
                    </div>
                    <div className="font-pixel text-px-8 mt-0.5" style={{ color: 'var(--game-text-light)' }}>
                      {category.description.toUpperCase()}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="type-tooltip-wrapper">
                      <span
                        className="font-pixel text-px-8 px-2 py-1 badge-shimmer"
                        style={{ background: typeColor, color: '#fff', border: '2px solid rgba(0,0,0,0.3)' }}
                      >
                        {category.type.toUpperCase()}
                      </span>
                      <div className="type-tooltip">{TYPE_LORE[category.type] ?? category.type}</div>
                    </div>
                  </div>
                </div>

                {/* Skill move slots — battle-tested skills first, marked ★ */}
                <div className="px-4 py-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 relative z-10 flex-1 content-start">
                  {[...category.skills]
                    .sort((a, b) => Number(b.core ?? false) - Number(a.core ?? false))
                    .map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: i * 0.05,
                          type: 'spring',
                          stiffness: 320,
                          damping: 22,
                        }}
                        className="flex items-center gap-2 px-3 py-2"
                        style={{
                          background: 'var(--game-box-2)',
                          border: '2px solid var(--game-box-border)',
                          borderLeft: skill.core
                            ? `5px solid ${typeColor}`
                            : '2px solid var(--game-box-border)',
                          boxShadow: '2px 2px 0 rgba(0,0,0,0.15)',
                        }}
                      >
                        {skill.core && (
                          <span className="font-pixel text-px-8" style={{ color: typeColor }}>★</span>
                        )}
                        <span className="font-pixel text-px-10" style={{ color: 'var(--game-text)' }}>
                          {skill.name.toUpperCase()}
                        </span>
                      </motion.div>
                    ))}
                </div>

                {/* Legend */}
                <div
                  className="flex items-center gap-2 px-4 py-2 relative z-10"
                  style={{ borderTop: '2px solid var(--game-box-border)' }}
                >
                  <span className="font-pixel text-px-8" style={{ color: typeColor }}>★</span>
                  <span className="font-pixel text-px-8" style={{ color: 'var(--game-text-light)' }}>
                    BATTLE-TESTED — USED IN INTERNSHIPS & SHIPPED PROJECTS
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="text-center pb-1">
          <span className="font-pixel text-px-8" style={{ color: 'var(--game-text-light)' }}>
            HOVER TYPE TO SWITCH ► SELECT WITH CLICK
          </span>
        </div>
      </div>
    </section>
  );
}
