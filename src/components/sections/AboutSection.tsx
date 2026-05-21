'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionEnterTransition } from '@/components/game/BattleTransition';
import { DialogueBox } from '@/components/game/DialogueBox';
import { HPBar } from '@/components/game/HPBar';
import { personal } from '@/data/personal';
import { getTypeColor, PokemonType } from '@/lib/type-colors';

const TYPE_COLORS: Record<string, string> = {
  ghost:    '#705898',
  electric: '#f8d030',
  psychic:  '#f85888',
  water:    '#6890f0',
};

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [dialogueDone, setDialogueDone] = useState(false);

  return (
    <section
      id="about"
      ref={ref}
      className="game-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      <SectionEnterTransition />

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 40%, rgba(15,8,32,0) 0%, rgba(10,5,20,0.85) 100%)',
        }}
      />

      {/* Section label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="location-badge">PROFESSOR&apos;S LAB</div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col gap-4">

        {/* Top row: trainer card + pokedex panel */}
        <div className="flex gap-4 items-start justify-center flex-wrap">

          {/* ── Trainer Card ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="game-box w-56 flex-shrink-0"
          >
            {/* Card header */}
            <div
              className="flex items-center justify-between px-3 py-2 relative z-10"
              style={{ borderBottom: '3px solid var(--game-box-border)' }}
            >
              <div>
                <div className="font-pixel text-px-6" style={{ color: 'var(--game-text-light)' }}>
                  {personal.pokedexNumber}
                </div>
                <div className="font-pixel text-px-10" style={{ color: 'var(--game-text)' }}>
                  {personal.name.toUpperCase().split(' ')[0]}
                </div>
              </div>
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
                alt="Gengar"
                width={48}
                height={48}
                className="sprite-float"
                style={{
                  imageRendering: 'pixelated',
                  filter: 'drop-shadow(0 0 6px rgba(112,88,152,0.8))',
                }}
              />
            </div>

            {/* Type badges */}
            <div
              className="flex gap-1 px-3 py-2 relative z-10"
              style={{ borderBottom: '2px solid var(--game-box-border)' }}
            >
              {personal.types.map((t) => {
                const col = TYPE_COLORS[t] ?? '#888';
                return (
                  <span
                    key={t}
                    className="font-pixel text-px-6 px-2 py-1"
                    style={{ background: col, color: '#fff', border: '2px solid rgba(0,0,0,0.3)' }}
                  >
                    {t.toUpperCase()}
                  </span>
                );
              })}
            </div>

            {/* Species */}
            <div
              className="flex justify-between px-3 py-1.5 relative z-10"
              style={{ borderBottom: '2px solid var(--game-box-border)' }}
            >
              <span className="font-pixel text-px-6" style={{ color: 'var(--game-text-light)' }}>SPECIES</span>
              <span className="font-pixel text-px-6" style={{ color: 'var(--game-text)' }}>ENGINEER</span>
            </div>

            {/* Stats */}
            <div className="px-3 py-2 space-y-2 relative z-10">
              <div className="font-pixel text-px-6 mb-1" style={{ color: 'var(--game-text-light)' }}>TRAINER INFO</div>
              {[
                { label: 'EXP YR', value: personal.yearsExp, max: 10 },
                { label: 'PROJ',   value: personal.projectsShipped, max: 20 },
                { label: 'COMMIT', value: 100, max: 100 },
              ].map(({ label, value, max }) => (
                <HPBar
                  key={label}
                  label={label}
                  value={value}
                  max={max}
                  showValue={false}
                  animate={inView}
                  className="gap-1.5"
                />
              ))}
            </div>

            {/* Abilities */}
            <div
              className="px-3 py-2 relative z-10"
              style={{ borderTop: '2px solid var(--game-box-border)' }}
            >
              <div className="font-pixel text-px-6 mb-1" style={{ color: 'var(--game-text-light)' }}>ABILITY</div>
              {personal.abilities.slice(0, 1).map((a) => (
                <div key={a.name}>
                  <div className="font-pixel text-px-8" style={{ color: 'var(--game-accent)' }}>{a.name}</div>
                  <div className="font-vt text-vt-16 mt-0.5" style={{ color: 'var(--game-text-mid)' }}>
                    {a.description}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Pokedex flavor text panel ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex-1 min-w-[260px] space-y-3"
          >
            {/* Oak header */}
            <div className="game-box px-3 py-2">
              <div className="relative z-10">
                <div className="font-pixel text-px-8" style={{ color: 'var(--game-text)' }}>
                  PROF. OAK
                </div>
                <div className="font-pixel text-px-6" style={{ color: 'var(--game-text-light)' }}>
                  PALLET TOWN TRAINER
                </div>
              </div>
            </div>

            {/* Dialogue box */}
            <DialogueBox
              text={personal.flavorText}
              speaker="PROF. OAK"
              speed={22}
              onComplete={() => setDialogueDone(true)}
            />

            {/* Bio text (shown after dialogue done) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: dialogueDone ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="game-box-dark px-4 py-3"
            >
              <div className="relative z-10 space-y-2">
                <div className="font-vt text-vt-20" style={{ color: 'var(--game-text-white)' }}>
                  Hey! I&apos;m{' '}
                  <span style={{ color: 'var(--game-electric)' }}>{personal.name}</span>,
                  a software engineer from {personal.region}.
                </div>
                <div className="font-vt text-vt-20" style={{ color: 'var(--game-text-dim)' }}>
                  Currently at Stony Brook University. I build full-stack apps
                  with clean architecture and polished UIs.
                </div>
                <div className="flex gap-2 pt-1">
                  {[
                    { label: 'GITHUB', href: personal.github },
                    { label: 'EMAIL',  href: `mailto:${personal.email}` },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="game-box-sm game-box font-pixel text-px-6 px-3 py-1.5 relative z-10"
                      style={{ color: 'var(--game-text)' }}
                    >
                      {label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="game-box flex justify-around px-4 py-3"
        >
          {[
            { label: 'YRS EXP',  value: `${personal.yearsExp}+` },
            { label: 'PROJECTS', value: `${personal.projectsShipped}+` },
            { label: 'COMMITS',  value: `${(personal.commits / 1000).toFixed(1)}K` },
            { label: 'REGION',   value: personal.region.toUpperCase().replace(' ', ' ') },
          ].map(({ label, value }) => (
            <div key={label} className="text-center relative z-10">
              <div className="font-pixel text-px-6" style={{ color: 'var(--game-text-light)' }}>{label}</div>
              <div className="font-pixel text-px-12 mt-1" style={{ color: 'var(--game-text)' }}>{value}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
