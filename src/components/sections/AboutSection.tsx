'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { SectionEnterTransition } from '@/components/game/BattleTransition';
import { DialogueBox } from '@/components/game/DialogueBox';
import { HPBar } from '@/components/game/HPBar';
import { personal } from '@/data/personal';

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
      className="game-screen flex flex-col items-center relative overflow-hidden"
    >
      <SectionEnterTransition />

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="location-badge">PROFESSOR&apos;S LAB</div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex-1 flex flex-col gap-2 py-14">

        {/* Main row: trainer card + right panel */}
        <div className="flex gap-4 flex-1 min-h-0">

          {/* ── Trainer Card ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="game-box w-64 flex-shrink-0 flex flex-col overflow-hidden"
          >
            {/* Card header */}
            <div
              className="flex items-center justify-between px-4 py-3 relative z-10"
              style={{ borderBottom: '3px solid var(--game-box-border)' }}
            >
              <div>
                <div className="font-pixel text-px-6" style={{ color: 'var(--game-text-light)' }}>
                  {personal.pokedexNumber}
                </div>
                <div className="font-pixel text-px-12" style={{ color: 'var(--game-text)' }}>
                  {personal.name.toUpperCase().split(' ')[0]}
                </div>
              </div>
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
                alt="Gengar"
                width={64}
                height={64}
                className="sprite-float"
                style={{
                  imageRendering: 'pixelated',
                  filter: 'drop-shadow(0 0 8px rgba(112,88,152,0.9))',
                }}
              />
            </div>

            {/* Type badges */}
            <div
              className="flex gap-1 px-4 py-2 relative z-10"
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
              className="flex justify-between px-4 py-2 relative z-10"
              style={{ borderBottom: '2px solid var(--game-box-border)' }}
            >
              <span className="font-pixel text-px-8" style={{ color: 'var(--game-text-light)' }}>SPECIES</span>
              <span className="font-pixel text-px-8" style={{ color: 'var(--game-text)' }}>ENGINEER</span>
            </div>

            {/* Stats */}
            <div className="px-4 py-3 space-y-3 relative z-10">
              <div className="font-pixel text-px-8 mb-2" style={{ color: 'var(--game-text-light)' }}>TRAINER INFO</div>
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
                  className="gap-2"
                />
              ))}
            </div>

            {/* Abilities */}
            <div
              className="px-4 py-3 relative z-10 flex-1"
              style={{ borderTop: '2px solid var(--game-box-border)' }}
            >
              <div className="font-pixel text-px-8 mb-2" style={{ color: 'var(--game-text-light)' }}>ABILITIES</div>
              <div className="space-y-3">
                {personal.abilities.map((a) => (
                  <div key={a.name}>
                    <div className="font-pixel text-px-8" style={{ color: 'var(--game-accent)' }}>{a.name}</div>
                    <div className="font-vt text-vt-20 mt-0.5" style={{ color: 'var(--game-text-mid)' }}>
                      {a.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right panel ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex-1 min-w-0 flex flex-col gap-2"
          >
            {/* Oak header */}
            <div className="game-box px-4 py-2">
              <div className="relative z-10 flex items-center gap-3">
                <div>
                  <div className="font-pixel text-px-10" style={{ color: 'var(--game-text)' }}>PROF. OAK</div>
                  <div className="font-pixel text-px-6 mt-0.5" style={{ color: 'var(--game-text-light)' }}>PALLET TOWN RESEARCHER</div>
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

            {/* Bio (shown after dialogue) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: dialogueDone ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="game-box-dark px-4 py-4 flex-1"
            >
              <div className="relative z-10 space-y-3 h-full flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="font-vt text-vt-22" style={{ color: 'var(--game-text-white)' }}>
                    Hey! I&apos;m{' '}
                    <span style={{ color: 'var(--game-electric)' }}>{personal.name}</span>,
                    a software engineer from {personal.region}.
                  </div>
                  <div className="font-vt text-vt-22" style={{ color: 'var(--game-text-dim)' }}>
                    Currently pursuing my MS in Computer Science at Stony Brook University (BS GPA: 3.73).
                    I build full-stack apps, cloud-native microservices, and ML pipelines.
                  </div>
                  <div className="font-vt text-vt-22" style={{ color: 'var(--game-text-dim)' }}>
                    Incoming SWE Intern at Capital One · Google BASTA SWEP Fellow · Open to full-time roles.
                  </div>
                </div>
                <div className="flex gap-2 pt-1 flex-wrap">
                  {[
                    { label: 'GITHUB',   href: personal.github },
                    { label: 'LINKEDIN', href: personal.linkedin },
                    { label: 'EMAIL',    href: `mailto:${personal.email}` },
                    { label: 'RESUME',   href: personal.resume },
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
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="game-box flex justify-around px-4 py-3"
        >
          {[
            { label: 'YRS EXP',  value: `${personal.yearsExp}+` },
            { label: 'PROJECTS', value: `${personal.projectsShipped}+` },
            { label: 'COMMITS',  value: `${(personal.commits / 1000).toFixed(1)}K` },
            { label: 'REGION',   value: personal.region.toUpperCase() },
          ].map(({ label, value }) => (
            <div key={label} className="text-center relative z-10">
              <div className="font-pixel text-px-6" style={{ color: 'var(--game-text-light)' }}>{label}</div>
              <div className="font-pixel text-px-16 mt-1" style={{ color: 'var(--game-text)' }}>{value}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
