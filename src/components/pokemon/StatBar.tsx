'use client';

import { motion } from 'framer-motion';
import { statBarFill } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
  animate?: boolean;
  className?: string;
}

export function StatBar({
  label,
  value,
  max = 100,
  color = 'var(--color-ghost)',
  animate = true,
  className,
}: StatBarProps) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="font-mono text-xs text-[var(--color-text-secondary)] w-36 flex-shrink-0 truncate">
        {label}
      </span>
      <div
        className="relative flex-1 h-2.5 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--color-border)' }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`${label}: ${value}`}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: color }}
          variants={animate ? statBarFill(pct) : undefined}
          initial={animate ? 'hidden' : undefined}
          animate={animate ? 'visible' : undefined}
        />
      </div>
      <span
        className="font-mono text-xs font-bold w-7 text-right flex-shrink-0"
        style={{ color }}
      >
        {value}
      </span>
    </div>
  );
}
