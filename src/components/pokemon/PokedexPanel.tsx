'use client';

import { cn } from '@/lib/utils';

interface PokedexPanelProps {
  children: React.ReactNode;
  className?: string;
  accent?: string;
}

export function PokedexPanel({ children, className, accent = 'var(--color-ghost)' }: PokedexPanelProps) {
  return (
    <div
      className={cn(
        'relative rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden',
        className
      )}
      style={{ borderTopColor: accent, borderTopWidth: '3px' }}
    >
      {/* Corner notches */}
      <div
        className="absolute top-0 left-0 w-3 h-3"
        style={{ background: 'var(--color-void)', clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
      />
      <div
        className="absolute top-0 right-0 w-3 h-3"
        style={{ background: 'var(--color-void)', clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
      />

      {children}
    </div>
  );
}
