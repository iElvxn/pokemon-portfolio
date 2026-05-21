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

function PhoneScreen({ project, typeColor }: { project: typeof projects[0]; typeColor: string }) {
  return (
    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Phone body — width is driven by the screen's aspect-ratio-derived width */}
      <div style={{
        background: 'linear-gradient(145deg, #1a1a2e, #0d0d1a)',
        border: '3px solid #0a0a14',
        borderRadius: 20,
        padding: '10px 6px 8px',
        boxShadow: '3px 3px 0 #0a0a14, inset 1px 1px 0 rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
      }}>
        {/* Dynamic island */}
        <div style={{ width: 32, height: 6, background: '#0a0a14', borderRadius: 10, flexShrink: 0 }} />
        {/* Screen — iPhone 17 Pro ratio 9:19.5, height fills available space */}
        <div style={{
          position: 'relative',
          height: 'clamp(160px, 28vh, 320px)',
          aspectRatio: '9 / 16',
          background: '#050510',
          border: '2px solid #0a0a14',
          borderRadius: 6,
          overflow: 'hidden',
          boxShadow: `inset 0 0 0 1px #1a1a3a, inset 0 0 16px ${typeColor}22`,
          flexShrink: 0,
        }}>
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `radial-gradient(ellipse at center, ${typeColor}18 0%, #050510 70%)` }}>
              <img src={project.pokemonSprite} alt={project.pokemonName} width={32} height={32} className="sprite-bob" style={{ imageRendering: 'pixelated', filter: `drop-shadow(0 0 8px ${typeColor})`, opacity: 0.85 }} />
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)' }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%)' }} />
        </div>
        {/* Home indicator */}
        <div style={{ width: 28, height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 2, flexShrink: 0 }} />
      </div>
    </div>
  );
}

function GBAScreen({ project, typeColor }: { project: typeof projects[0]; typeColor: string }) {
  return (
    <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{
        background: 'linear-gradient(145deg, #252538, #14142a)',
        border: '3px solid #0a0a14',
        borderRadius: 6,
        padding: '8px 8px 6px',
        boxShadow: '3px 3px 0 #0a0a14, inset 1px 1px 0 rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Screen — 16:9 landscape */}
        <div style={{
          position: 'relative',
          width: 'min(clamp(200px, 28vw, 420px), calc(24vh * 16 / 9))',
          aspectRatio: '16 / 9',
          background: '#050510',
          border: '3px solid #0a0a14',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: `inset 0 0 0 1px #1a1a3a, inset 0 0 20px ${typeColor}22`,
        }}>
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `radial-gradient(ellipse at center, ${typeColor}18 0%, #050510 70%)` }}>
              <img
                src={project.pokemonSprite}
                alt={project.pokemonName}
                width={48}
                height={48}
                className="sprite-bob"
                style={{ imageRendering: 'pixelated', filter: `drop-shadow(0 0 10px ${typeColor}) brightness(1.2)`, opacity: 0.85 }}
              />
            </div>
          )}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.10) 2px, rgba(0,0,0,0.10) 4px)' }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 45%)' }} />
        </div>

        {/* Power LED + speaker */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 5, paddingInline: 2, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: typeColor, boxShadow: `0 0 5px ${typeColor}` }} />
            <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 5, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>PWR</span>
          </div>
          <div style={{ display: 'flex', gap: 2 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ width: 2, height: 2, borderRadius: '50%', background: '#0a0a14' }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectScreen({ project, typeColor }: { project: typeof projects[0]; typeColor: string }) {
  return project.imagePortrait
    ? <PhoneScreen project={project} typeColor={typeColor} />
    : <GBAScreen project={project} typeColor={typeColor} />;
}

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

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="location-badge">POKEMON PARTY</div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex-1 flex flex-col gap-2 py-14">

        <div className="game-box px-4 py-2 text-center">
          <div className="relative z-10 font-pixel text-px-16" style={{ color: 'var(--game-text)' }}>
            PROJECTS
          </div>
        </div>

        <div className="flex gap-4 flex-1 min-h-0">

          {/* ── Party list ─────────────────────────────────── */}
          <div className="game-box w-64 flex-shrink-0 flex flex-col overflow-hidden">
            {projects.map((p, i) => {
              const col = getTypeColor(p.type as PokemonType);
              const isActive = i === selected;
              const hpPct = Math.round((p.hp / 500) * 100);
              return (
                <div
                  key={p.id}
                  className="relative z-10 cursor-pointer"
                  style={{
                    borderBottom: i < projects.length - 1 ? '2px solid var(--game-box-shadow)' : 'none',
                    background: isActive ? 'rgba(112,88,152,0.12)' : 'transparent',
                    padding: '10px 10px',
                  }}
                  onMouseEnter={() => setSelected(i)}
                  onClick={() => setSelected(i)}
                >
                  <div className="flex items-center gap-2">
                    <MenuCursor active={isActive} />
                    <img src={p.pokemonSprite} alt={p.pokemonName} width={56} height={56} style={{ imageRendering: 'pixelated', flexShrink: 0 }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-pixel text-px-8 truncate" style={{ color: 'var(--game-text)' }}>{p.name.toUpperCase()}</span>
                        <span className="font-pixel text-px-6 px-1 flex-shrink-0" style={{ background: col, color: '#fff', border: '1px solid rgba(0,0,0,0.3)' }}>
                          {p.type.slice(0, 3).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1.5">
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

          {/* ── Detail panel ───────────────────────────────── */}
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
                <div className="flex items-center gap-3 px-4 py-3 relative z-10" style={{ borderBottom: '3px solid var(--game-box-border)' }}>
                  <img src={project.pokemonSprite} alt={project.pokemonName} width={72} height={72} className="sprite-bob" style={{ imageRendering: 'pixelated', filter: `drop-shadow(0 0 6px ${typeColor}99)` }} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-pixel text-px-12" style={{ color: 'var(--game-text)' }}>{project.pokemonName?.toUpperCase()}</span>
                      <span className="font-pixel text-px-8 px-1.5 py-0.5" style={{ background: typeColor, color: '#fff', border: '2px solid rgba(0,0,0,0.3)' }}>{project.type.toUpperCase()}</span>
                      {project.secondaryType && (
                        <span className="font-pixel text-px-8 px-1.5 py-0.5" style={{ background: getTypeColor(project.secondaryType as PokemonType), color: '#fff', border: '2px solid rgba(0,0,0,0.3)' }}>
                          {project.secondaryType.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="font-pixel text-px-8 mt-0.5" style={{ color: 'var(--game-text-light)' }}>{RARITY_LABEL[project.rarity ?? 'common']}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="font-pixel text-px-8" style={{ color: 'var(--game-text-light)' }}>HP</span>
                      <HPBar value={project.hp} max={500} showValue className="flex-1" />
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div
                  className="px-4 py-3 relative z-10 flex-1 flex min-h-0"
                  style={{
                    borderBottom: '2px solid var(--game-box-border)',
                    flexDirection: project.imagePortrait ? 'row' : 'column',
                  }}
                >
                  {/* Name + bullets */}
                  <div className={project.imagePortrait ? 'flex-1 min-w-0' : 'w-full'}>
                    <div className="font-pixel text-px-14 mb-3" style={{ color: typeColor }}>
                      {project.name.toUpperCase()}
                    </div>
                    <div className="space-y-2">
                      {project.achievements.map((a, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="font-pixel text-px-8 flex-shrink-0 mt-0.5" style={{ color: typeColor }}>►</span>
                          <span className="font-vt text-vt-20" style={{ color: 'var(--game-text)' }}>{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Screenshot — right for portrait, centered bottom for landscape */}
                  <div
                    className="flex-shrink-0"
                    style={project.imagePortrait
                      ? { marginLeft: 12, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'center' }
                      : { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }
                    }
                  >
                    <ProjectScreen project={project} typeColor={typeColor} />
                  </div>
                </div>

                {/* Tech stack */}
                <div className="px-4 py-2.5 relative z-10" style={{ borderBottom: '2px solid var(--game-box-border)' }}>
                  <div className="font-pixel text-px-8 mb-2" style={{ color: 'var(--game-text-light)' }}>MOVES (TECH STACK)</div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <div key={tech} className="game-box font-pixel text-px-8 px-2 py-1 relative z-10" style={{ color: 'var(--game-text)', boxShadow: '2px 2px 0 var(--game-box-border)' }}>
                        {tech.toUpperCase()}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex gap-2 px-4 py-2.5 relative z-10">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="game-box font-pixel text-px-8 px-3 py-1.5 relative z-10" style={{ color: 'var(--game-text)' }}>
                    GITHUB ↗
                  </a>
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="game-box font-pixel text-px-6 px-3 py-1.5 relative z-10" style={{ color: 'var(--game-text)' }}>
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
