'use client';

import { PokemonType, getTypeColor, getTypeTextColor } from '@/lib/type-colors';
import { cn } from '@/lib/utils';

interface TypeBadgeProps {
  type: PokemonType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TypeBadge({ type, size = 'md', className }: TypeBadgeProps) {
  const bg = getTypeColor(type);
  const color = getTypeTextColor(type);

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-display font-bold uppercase tracking-wider rounded-full transition-transform duration-150 hover:scale-105',
        sizes[size],
        className
      )}
      style={{ backgroundColor: bg, color }}
      aria-label={`Type: ${type}`}
    >
      {type}
    </span>
  );
}
