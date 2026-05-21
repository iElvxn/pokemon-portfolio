'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionEnterTransition } from '@/components/game/BattleTransition';
import { HPBar } from '@/components/game/HPBar';
import { MenuCursor } from '@/components/game/MenuCursor';
import { skillCategories } from '@/data/skills';
import { getTypeColor, PokemonType } from '@/lib/type-colors';

const TYPE_SPRITE: Record<string, string> = {
  electric: '145',  // Zapdos
  water:    '134',  // Vaporeon
  fire:     '136',  // Flareon
  steel:    '208',  // Steelix
  ghost:    '94',   // Gengar
  psychic:  '196',  // Espeon
};

export function SkillsSection() {
  const [active, setActive] = useState(0);
  const category = skillCategories[active];
  const typeColor = getTypeColor(category.type as PokemonType);
  const spriteId = TYPE_SPRITE[category.type] ?? '132';

  return (
    <section
      id="skills"
      className="game-screen flex flex-col items-center relative overflow-hidden"
    >
      <SectionEnterTransition />

      {/* Section label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="location-badge">POKEMON CENTER</div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex-1 flex flex-col gap-2 py-14">

        {/* Header */}
        <div className="game-box px-4 py-2 text-center">
          <div className="relative z-10 font-pixel text-px-16" style={{ color: 'var(--game-text)' }}>
            SKILLS
          </div>
        </div>

        <div className="flex gap-4 flex-1 min-h-0">

          {/* ── Left: Type menu (FireRed style) ────────────── */}
          <div className="game-box w-48 flex-shrink-0 flex flex-col overflow-hidden">
            {skillCategories.map((cat, i) => {
              const col = getTypeColor(cat.type as PokemonType);
              const isActive = i === active;
              return (
                <div
                  key={cat.type}
                  className="game-menu-item relative z-10 cursor-pointer"
                  style={{
                    background: isActive ? 'rgba(112,88,152,0.15)' : 'transparent',
                    borderBottom: i < skillCategories.length - 1
                      ? '2px solid var(--game-box-shadow)'
                      : 'none',
                  }}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <MenuCursor active={isActive} />
                  <div className="flex items-center gap-2">
                    <span
                      className="font-pixel text-px-8 px-1 py-0.5"
                      style={{
                        background: col,
                        color: '#fff',
                        border: '1px solid rgba(0,0,0,0.3)',
                        minWidth: 36,
                        textAlign: 'center',
                      }}
                    >
                      {cat.type.toUpperCase().slice(0, 4)}
                    </span>
                    <div>
                      <div className="font-pixel text-px-8" style={{ color: 'var(--game-text)' }}>
                        {cat.label.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Right: Skill stats panel ──────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col">
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
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${spriteId}.png`}
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
                    <span
                      className="font-pixel text-px-8 px-2 py-1"
                      style={{
                        background: typeColor,
                        color: '#fff',
                        border: '2px solid rgba(0,0,0,0.3)',
                      }}
                    >
                      {category.type.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Skill HP bars */}
                <div className="px-4 py-4 space-y-4 relative z-10 flex-1">
                  {category.skills.map((skill, i) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <HPBar
                        label={skill.name.toUpperCase().slice(0, 14)}
                        value={skill.value}
                        max={100}
                        showValue
                        animate
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Average */}
                <div
                  className="flex items-center justify-between px-4 py-2 relative z-10"
                  style={{ borderTop: '2px solid var(--game-box-border)' }}
                >
                  <span className="font-pixel text-px-8" style={{ color: 'var(--game-text-light)' }}>
                    TYPE AVG
                  </span>
                  <span className="font-pixel text-px-10" style={{ color: typeColor }}>
                    {Math.round(
                      category.skills.reduce((s, sk) => s + sk.value, 0) / category.skills.length
                    )}
                    /100
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom hint */}
        <div className="text-center pb-1">
          <span className="font-pixel text-px-8" style={{ color: 'var(--game-text-light)' }}>
            HOVER TYPE TO SWITCH ► SELECT WITH CLICK
          </span>
        </div>
      </div>
    </section>
  );
}
