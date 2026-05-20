'use client';

import { use3DTilt } from '@/hooks/use3DTilt';
import { TypeBadge } from './TypeBadge';
import { personal } from '@/data/personal';
import { GitBranch, Link2, Mail } from 'lucide-react';
import { PokemonType } from '@/lib/type-colors';

export function TrainerCard() {
  const { ref, handleMouseMove, handleMouseLeave } = use3DTilt(12);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-sm mx-auto"
      style={{ transition: 'transform 0.1s ease', transformStyle: 'preserve-3d' }}
    >
      {/* Card body */}
      <div
        className="relative rounded-2xl overflow-hidden border-2 border-[var(--color-ghost)] bg-[var(--color-surface)]"
        style={{
          boxShadow: '0 0 0 1px var(--color-surface-2), 0 20px 60px rgba(112,88,152,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ background: 'linear-gradient(135deg, var(--color-ghost), #4a3870)' }}
        >
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-white/90 uppercase">
            Trainer Card
          </span>
          <span className="font-mono text-xs text-white/60">{personal.pokedexNumber}</span>
        </div>

        {/* Holographic shimmer layer */}
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(248,208,48,0.08) 0%, rgba(112,88,152,0.06) 40%, transparent 70%)`,
          }}
        />

        {/* Photo area */}
        <div
          className="relative mx-4 mt-4 rounded-lg overflow-hidden flex items-center justify-center"
          style={{ height: '200px', background: 'var(--color-surface-2)' }}
        >
          {/* Gengar silhouette watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png"
              alt=""
              className="w-32 h-32 object-contain pixelated"
              style={{ imageRendering: 'pixelated', filter: 'blur(2px)' }}
            />
          </div>
          <div className="relative z-10 text-center">
            <div
              className="w-24 h-24 rounded-full mx-auto mb-2 flex items-center justify-center font-display font-bold text-3xl text-white"
              style={{
                background: 'linear-gradient(135deg, var(--color-ghost), var(--color-psychic))',
                boxShadow: '0 0 20px var(--color-ghost-glow)',
              }}
            >
              EL
            </div>
            <p className="font-mono text-xs text-[var(--color-text-muted)]">TRAINER PHOTO</p>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-display font-bold text-xl text-[var(--color-text-primary)]">
              {personal.name}
            </h3>
            <p className="font-mono text-xs text-[var(--color-text-secondary)] mt-0.5">
              LVL {personal.level} &nbsp;·&nbsp; {personal.region}
            </p>
          </div>

          {/* Types */}
          <div className="flex gap-2">
            {personal.types.map((t) => (
              <TypeBadge key={t} type={t as PokemonType} size="sm" />
            ))}
          </div>

          {/* Stats mini row */}
          <div
            className="grid grid-cols-3 gap-2 py-3 px-3 rounded-lg text-center"
            style={{ background: 'var(--color-surface-2)' }}
          >
            {[
              { label: 'EXP', value: `${personal.yearsExp}y` },
              { label: 'PROJ', value: personal.projectsShipped },
              { label: 'COMMITS', value: `${(personal.commits / 1000).toFixed(1)}k` },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="font-display font-bold text-sm text-[var(--color-text-primary)]">
                  {value}
                </div>
                <div className="font-mono text-[9px] text-[var(--color-text-muted)] mt-0.5 uppercase tracking-wider">
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4 pt-1">
            {[
              { icon: GitBranch, href: personal.github, label: 'GitHub' },
              { icon: Link2, href: personal.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg transition-all duration-200 text-[var(--color-text-secondary)] hover:text-[var(--color-ghost-light)] hover:bg-[var(--color-ghost-glow)]"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="px-4 py-2 text-center"
          style={{ background: 'var(--color-surface-2)', borderTop: '1px solid var(--color-border)' }}
        >
          <span className="font-mono text-[10px] text-[var(--color-text-muted)] tracking-widest uppercase">
            ★ Ghost Type Trainer ★
          </span>
        </div>
      </div>
    </div>
  );
}
