'use client';

import { useMemo } from 'react';

function useStars(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: parseFloat((Math.random() * 100).toFixed(2)),
        y: parseFloat((Math.random() * 100).toFixed(2)),
        w: Math.random() < 0.2 ? 2 : 1,
        dur: parseFloat((1.4 + Math.random() * 2.8).toFixed(2)),
        del: parseFloat((Math.random() * 5).toFixed(2)),
      })),
    [count],
  );
}

/* Fixed full-screen star field — renders behind all sections.
   Sections that want stars to show through must have transparent backgrounds. */
export function StarField() {
  const stars = useStars(110);

  return (
    <div
      className="star-field"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    >
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.w,
              height: s.w,
              '--sdur': `${s.dur}s`,
              '--sdel': `${s.del}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
