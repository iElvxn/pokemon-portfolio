'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionEnterTransition } from '@/components/game/BattleTransition';
import { HPBar } from '@/components/game/HPBar';
import { MenuCursor } from '@/components/game/MenuCursor';
import { projects } from '@/data/projects';
import { getTypeColor, PokemonType } from '@/lib/type-colors';

const RARITY_LABEL: Record<string, string> = {
  'holo-rare': '★★★ HOLO',
  'rare':      '★★ RARE',
  'uncommon':  '★ UNCOMMON',
  'common':    'COMMON',
};

export function ProjectsSection() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];
  const typeColor = getTypeColor(project.type as PokemonType);

  return (
    <section
      id="projects"
      className="game-screen flex flex-col items-center relative overflow-hidden"
    >
      <SectionEnterTransition />

      {/* Section label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="location-badge">TRAINER HALL</div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex-1 flex flex-col gap-2 py-14">

        {/* Header */}
        <div className="game-box px-4 py-2 text-center">
          <div className="relative z-10 font-pixel text-px-16" style={{ color: 'var(--game-text)' }}>
            POKEMON PARTY
          </div>
        </div>

        <div className="flex gap-4 flex-1 min-h-0">

          {/* ── Party list (left panel) ────────────────────── */}
          <div className="game-box w-56 flex-shrink-0 flex flex-col overflow-hidden">
            {projects.map((p, i) => {
              const col = getTypeColor(p.type as PokemonType);
              const isActive = i === selected;
              const hpPct = Math.round((p.hp / 500) * 100);
              return (
                <div
                  key={p.id}
                  className="relative z-10 cursor-pointer"
                  style={{
                    borderBottom: i < projects.length - 1
                      ? '2px solid var(--game-box-shadow)'
                      : 'none',
                    background: isActive ? 'rgba(112,88,152,0.12)' : 'transparent',
                    padding: '8px 10px',
                  }}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => setSelected(i)}
                >
                  <div className="flex items-center gap-2">
                    <MenuCursor active={isActive} />
                    <img
                      src={p.pokemonSprite}
                      alt={p.pokemonName}
                      width={40}
                      height={40}
                      style={{ imageRendering: 'pixelated', flexShrink: 0 }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className="font-pixel text-px-8 truncate"
                          style={{ color: 'var(--game-text)' }}
                        >
                          {p.name.toUpperCase().slice(0, 12)}
                        </span>
                        <span
                          className="font-pixel text-px-6 px-1"
                          style={{ background: col, color: '#fff', border: '1px solid rgba(0,0,0,0.3)', flexShrink: 0 }}
                        >
                          {p.type.slice(0, 3).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="font-pixel text-px-6" style={{ color: 'var(--game-text-light)' }}>HP</span>
                        <HPBar value={hpPct} max={100} showValue={false} animate className="flex-1" />
                        <span className="font-pixel text-px-6" style={{ color: 'var(--game-text-mid)' }}>{p.hp}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Selected project detail (right panel) ─────── */}
          <div className="flex-1 min-w-0 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.22 }}
                className="game-box flex flex-col flex-1"
              >
                {/* Pokemon header */}
                <div
                  className="flex items-center gap-3 px-4 py-3 relative z-10"
                  style={{ borderBottom: '3px solid var(--game-box-border)' }}
                >
                  <img
                    src={project.pokemonSprite}
                    alt={project.pokemonName}
                    width={72}
                    height={72}
                    className="sprite-bob"
                    style={{
                      imageRendering: 'pixelated',
                      filter: `drop-shadow(0 0 6px ${typeColor}99)`,
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-px-12" style={{ color: 'var(--game-text)' }}>
                        {project.pokemonName?.toUpperCase()}
                      </span>
                      <span
                        className="font-pixel text-px-6 px-1.5 py-0.5"
                        style={{ background: typeColor, color: '#fff', border: '2px solid rgba(0,0,0,0.3)' }}
                      >
                        {project.type.toUpperCase()}
                      </span>
                      {project.secondaryType && (
                        <span
                          className="font-pixel text-px-6 px-1.5 py-0.5"
                          style={{ background: getTypeColor(project.secondaryType as PokemonType), color: '#fff', border: '2px solid rgba(0,0,0,0.3)' }}
                        >
                          {project.secondaryType.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="font-pixel text-px-6 mt-0.5" style={{ color: 'var(--game-text-light)' }}>
                      {RARITY_LABEL[project.rarity ?? 'common']}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="font-pixel text-px-6" style={{ color: 'var(--game-text-light)' }}>HP</span>
                      <HPBar value={project.hp} max={500} showValue className="flex-1" />
                    </div>
                  </div>
                </div>

                {/* Project name & description */}
                <div
                  className="px-4 py-3 relative z-10 flex-1"
                  style={{ borderBottom: '2px solid var(--game-box-border)' }}
                >
                  <div className="font-pixel text-px-12 mb-2" style={{ color: typeColor }}>
                    {project.name.toUpperCase()}
                  </div>
                  <div className="font-vt text-vt-22" style={{ color: 'var(--game-text)' }}>
                    {project.description}
                  </div>
                </div>

                {/* Moves = tech stack */}
                <div
                  className="px-4 py-3 relative z-10"
                  style={{ borderBottom: '2px solid var(--game-box-border)' }}
                >
                  <div className="font-pixel text-px-6 mb-2" style={{ color: 'var(--game-text-light)' }}>
                    MOVES (TECH STACK)
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <div
                        key={tech}
                        className="game-box-sm game-box font-pixel text-px-6 px-2 py-1 text-center relative z-10"
                        style={{ color: 'var(--game-text)', boxShadow: '2px 2px 0 var(--game-box-border)' }}
                      >
                        {tech.toUpperCase().slice(0, 12)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-2 px-4 py-2 relative z-10">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="game-box game-box-sm font-pixel text-px-6 px-3 py-1.5 relative z-10"
                    style={{ color: 'var(--game-text)' }}
                  >
                    GITHUB ↗
                  </a>
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="game-box game-box-sm font-pixel text-px-6 px-3 py-1.5 relative z-10"
                      style={{ color: 'var(--game-text)' }}
                    >
                      LIVE DEMO ↗
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
