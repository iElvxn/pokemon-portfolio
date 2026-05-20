'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { use3DTilt } from '@/hooks/use3DTilt';
import { TypeBadge } from './TypeBadge';
import { Project } from '@/types/project';
import { getTypeColor } from '@/lib/type-colors';
import { GitBranch, ExternalLink, X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PokemonCardProps {
  project: Project;
  index?: number;
}

const rarityStars = { common: 0, uncommon: 1, rare: 2, 'holo-rare': 3 };

export function PokemonCard({ project, index = 0 }: PokemonCardProps) {
  const [open, setOpen] = useState(false);
  const { ref, handleMouseMove, handleMouseLeave } = use3DTilt(8);
  const typeColor = getTypeColor(project.type);

  return (
    <>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => setOpen(true)}
          className={cn(
            'relative rounded-xl overflow-hidden border border-[var(--color-border)] cursor-pointer group',
            'bg-[var(--color-surface)]',
            project.rarity === 'holo-rare' && 'border-[var(--color-ghost)]'
          )}
          style={{
            transition: 'transform 0.12s ease, box-shadow 0.2s ease',
            boxShadow: project.rarity === 'holo-rare'
              ? '0 0 30px var(--color-ghost-glow)'
              : '0 4px 20px rgba(0,0,0,0.4)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Holographic shimmer for rare cards */}
          {(project.rarity === 'rare' || project.rarity === 'holo-rare') && (
            <div className="holo-shimmer absolute inset-0 z-10 pointer-events-none rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}

          {/* Card header */}
          <div
            className="px-4 pt-3 pb-2 flex items-center justify-between"
            style={{
              background: `linear-gradient(135deg, ${typeColor}22, ${typeColor}11)`,
              borderBottom: `2px solid ${typeColor}44`,
            }}
          >
            <div className="flex items-center gap-2">
              <TypeBadge type={project.type} size="sm" />
              {project.secondaryType && (
                <TypeBadge type={project.secondaryType} size="sm" />
              )}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-mono text-[10px] text-[var(--color-text-muted)]">HP</span>
              <span
                className="font-display font-bold text-sm"
                style={{ color: typeColor }}
              >
                {project.hp}
              </span>
            </div>
          </div>

          {/* Pokemon sprite + project image area */}
          <div
            className="relative flex items-center justify-center"
            style={{ height: '140px', background: `linear-gradient(180deg, ${typeColor}08, var(--color-surface-2))` }}
          >
            <img
              src={project.pokemonSprite}
              alt={project.pokemonName}
              width={96}
              height={96}
              className="object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              style={{ imageRendering: 'pixelated' }}
            />
            {/* Rarity stars */}
            {rarityStars[project.rarity] > 0 && (
              <div className="absolute bottom-2 right-3 flex gap-0.5">
                {Array.from({ length: rarityStars[project.rarity] }).map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    className="fill-current"
                    style={{ color: project.rarity === 'holo-rare' ? 'var(--color-electric)' : typeColor }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Card body */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] leading-tight">
                {project.name}
              </h3>
              <p className="font-mono text-[11px] text-[var(--color-text-muted)] mt-0.5 italic">
                {project.subtitle}
              </p>
            </div>

            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded font-mono text-[10px] text-[var(--color-text-secondary)]"
                  style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Card footer */}
          <div
            className="px-4 py-2.5 flex items-center justify-between"
            style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}
          >
            <div className="flex gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded text-[var(--color-text-secondary)] hover:text-[var(--color-ghost-light)] transition-colors"
                >
                  <GitBranch size={14} />
                </a>
              )}
              {project.liveUrl && project.liveUrl !== '#' && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live Demo"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded text-[var(--color-text-secondary)] hover:text-[var(--color-electric)] transition-colors"
                >
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
            <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
              {project.pokemonName}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-2xl mx-auto rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]"
              initial={{ opacity: 0, scale: 0.9, y: '-40%' }}
              animate={{ opacity: 1, scale: 1, y: '-50%' }}
              exit={{ opacity: 0, scale: 0.9, y: '-40%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ boxShadow: `0 0 60px ${typeColor}33` }}
            >
              {/* Modal header */}
              <div
                className="flex items-center justify-between px-6 py-4"
                style={{ background: `linear-gradient(135deg, ${typeColor}30, ${typeColor}10)`, borderBottom: `2px solid ${typeColor}44` }}
              >
                <div className="flex items-center gap-3">
                  <img src={project.pokemonSprite} alt="" width={48} height={48} style={{ imageRendering: 'pixelated' }} />
                  <div>
                    <h2 className="font-display font-bold text-xl text-[var(--color-text-primary)]">
                      {project.name}
                    </h2>
                    <p className="font-mono text-xs text-[var(--color-text-secondary)] italic">{project.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)] transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal body */}
              <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  <TypeBadge type={project.type} size="md" />
                  {project.secondaryType && <TypeBadge type={project.secondaryType} size="md" />}
                </div>

                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {project.longDescription}
                </p>

                <div>
                  <h4 className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg font-mono text-sm text-[var(--color-text-secondary)]"
                        style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-display text-sm font-semibold transition-all duration-200 text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-ghost)] hover:text-[var(--color-ghost-light)]"
                    >
                      <GitBranch size={16} /> View Code
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-display text-sm font-semibold transition-all duration-200 text-white"
                      style={{ background: typeColor }}
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
