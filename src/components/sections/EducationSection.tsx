'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionEnterTransition } from '@/components/game/BattleTransition';
import { HPBar } from '@/components/game/HPBar';
import { MenuCursor } from '@/components/game/MenuCursor';
import { education } from '@/data/education';

export function EducationSection() {
  const [selectedDegree, setSelectedDegree] = useState(0);
  const degree = education.degrees[selectedDegree];

  return (
    <section
      id="education"
      className="game-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      <SectionEnterTransition />

      {/* Section label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <div className="location-badge">TRAINER ACADEMY</div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col gap-3">

        {/* Header */}
        <div className="game-box px-4 py-2 text-center">
          <div className="relative z-10 font-pixel text-px-16" style={{ color: 'var(--game-text)' }}>
            EDUCATION
          </div>
        </div>

        <div className="flex gap-4 items-start">

          {/* ── Left: Institution card ────────────────────── */}
          <div className="game-box w-52 flex-shrink-0">
            {/* School header */}
            <div
              className="relative z-10 px-3 py-2"
              style={{ borderBottom: '3px solid var(--game-box-border)' }}
            >
              <div className="flex items-center gap-2">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/199.png"
                  alt="Slowking"
                  width={40}
                  height={40}
                  className="sprite-bob"
                  style={{
                    imageRendering: 'pixelated',
                    filter: `drop-shadow(0 0 6px ${education.badgeColor}88)`,
                  }}
                />
                <div>
                  <div className="font-pixel text-px-8" style={{ color: 'var(--game-text)' }}>
                    STONY BROOK
                  </div>
                  <div className="font-pixel text-px-6 mt-0.5" style={{ color: 'var(--game-text-light)' }}>
                    UNIVERSITY
                  </div>
                </div>
              </div>
            </div>

            {/* Degree selector */}
            {education.degrees.map((d, i) => (
              <div
                key={d.id}
                className="relative z-10 cursor-pointer"
                style={{
                  padding: '8px 10px',
                  borderBottom: i < education.degrees.length - 1
                    ? '2px solid var(--game-box-shadow)'
                    : 'none',
                  background: selectedDegree === i ? 'rgba(204,0,51,0.1)' : 'transparent',
                }}
                onMouseEnter={() => setSelectedDegree(i)}
                onClick={() => setSelectedDegree(i)}
              >
                <div className="flex items-center gap-2">
                  <MenuCursor active={selectedDegree === i} />
                  <div>
                    <div className="font-pixel text-px-8" style={{ color: 'var(--game-text)' }}>
                      {d.degree === "Master's of Science" ? 'M.S.' : 'B.S.'} CS
                    </div>
                    <div
                      className="font-pixel text-px-6 mt-0.5"
                      style={{
                        color: d.status === 'Completed'
                          ? 'var(--game-hp-green)'
                          : 'var(--game-electric)',
                      }}
                    >
                      {d.status === 'Completed' ? '✓ EARNED' : '⋯ IN PROGRESS'}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Location */}
            <div
              className="relative z-10 px-3 py-2"
              style={{ borderTop: '2px solid var(--game-box-border)' }}
            >
              <div className="font-pixel text-px-6" style={{ color: 'var(--game-text-light)' }}>
                {education.location.toUpperCase()}
              </div>
            </div>
          </div>

          {/* ── Right: Degree detail ──────────────────────── */}
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDegree}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="game-box"
              >
                {/* Degree header */}
                <div
                  className="relative z-10 px-4 py-2"
                  style={{ borderBottom: '3px solid var(--game-box-border)' }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-pixel text-px-10" style={{ color: 'var(--game-text)' }}>
                        {degree.degree.toUpperCase()}
                      </div>
                      <div className="font-pixel text-px-8 mt-0.5" style={{ color: education.badgeColor }}>
                        {degree.field.toUpperCase()}
                      </div>
                    </div>
                    <div
                      className="font-pixel text-px-6 px-2 py-1"
                      style={{
                        background: degree.status === 'Completed'
                          ? 'var(--game-hp-green)'
                          : 'var(--game-electric)',
                        color: '#fff',
                        border: '2px solid rgba(0,0,0,0.3)',
                        flexShrink: 0,
                      }}
                    >
                      {degree.status === 'Completed' ? 'EARNED' : 'IN PROGRESS'}
                    </div>
                  </div>
                  <div className="font-pixel text-px-6 mt-1" style={{ color: 'var(--game-text-light)' }}>
                    {degree.startDate.toUpperCase()} – {degree.endDate.toUpperCase()}
                    {degree.status === 'In Progress' ? ' (EXPECTED)' : ''}
                  </div>
                </div>

                {/* GPA or level bar */}
                <div
                  className="relative z-10 px-4 py-2"
                  style={{ borderBottom: '2px solid var(--game-box-border)' }}
                >
                  {degree.gpa !== null ? (
                    <HPBar
                      label="GPA"
                      value={Math.round((degree.gpa / 4.0) * 100)}
                      max={100}
                      showValue={false}
                      animate
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-pixel text-px-8" style={{ color: 'var(--game-text)' }}>GPA</span>
                      <span className="font-pixel text-px-6" style={{ color: 'var(--game-text-light)' }}>
                        TBD
                      </span>
                    </div>
                  )}
                  {degree.gpa !== null && (
                    <div className="font-pixel text-px-10 mt-1" style={{ color: education.badgeColor }}>
                      {degree.gpa.toFixed(2)} / 4.00
                    </div>
                  )}
                </div>

                {/* Coursework — "MOVES LEARNED" */}
                {selectedDegree === 1 && (
                  <div className="relative z-10 px-4 py-2">
                    <div className="font-pixel text-px-6 mb-2" style={{ color: 'var(--game-text-light)' }}>
                      MOVES LEARNED (COURSEWORK)
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {education.coursework.map((course) => (
                        <span
                          key={course}
                          className="font-pixel text-px-6 px-2 py-1"
                          style={{
                            background: 'var(--game-box-dark)',
                            border: '2px solid var(--game-box-border)',
                            boxShadow: '2px 2px 0 var(--game-box-border)',
                            color: 'var(--game-text)',
                          }}
                        >
                          {course.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {selectedDegree === 0 && (
                  <div className="relative z-10 px-4 py-2">
                    <div className="font-pixel text-px-6" style={{ color: 'var(--game-text-light)' }}>
                      CURRENTLY PURSUING — COURSEWORK IN PROGRESS
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Affiliations */}
            <div className="game-box">
              <div
                className="relative z-10 px-4 py-2"
                style={{ borderBottom: '3px solid var(--game-box-border)' }}
              >
                <div className="font-pixel text-px-8" style={{ color: 'var(--game-text)' }}>
                  AFFILIATIONS
                </div>
              </div>
              <div className="relative z-10 divide-y-2" style={{ borderColor: 'var(--game-box-shadow)' }}>
                {education.affiliations.map((a) => (
                  <div
                    key={a.org}
                    className="px-4 py-2"
                    style={{ borderBottom: '2px solid var(--game-box-shadow)' }}
                  >
                    <div className="flex items-start gap-2">
                      <span
                        className="font-pixel text-px-8"
                        style={{ color: a.color, flexShrink: 0 }}
                      >
                        ►
                      </span>
                      <div>
                        <div className="font-pixel text-px-8" style={{ color: 'var(--game-text)' }}>
                          {a.org.toUpperCase()} — {a.role.toUpperCase()}
                        </div>
                        <div className="font-pixel text-px-6 mt-0.5" style={{ color: a.color }}>
                          {a.period.toUpperCase()}
                        </div>
                        <div className="font-vt text-vt-18 mt-0.5" style={{ color: 'var(--game-text-mid)' }}>
                          {a.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
