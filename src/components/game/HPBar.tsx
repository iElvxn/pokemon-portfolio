'use client';

import { motion } from 'framer-motion';

interface HPBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
  animate?: boolean;
}

export function HPBar({
  value,
  max = 100,
  label,
  showValue = true,
  className,
  animate = true,
}: HPBarProps) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  const colorClass = pct > 50 ? 'green' : pct > 20 ? 'yellow' : 'red';

  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      {label && (
        <span
          className="font-pixel text-px-8 shrink-0 min-w-[96px]"
          style={{ color: 'var(--game-text)' }}
        >
          {label}
        </span>
      )}
      <div className="hp-bar-track flex-1 relative">
        {animate ? (
          <motion.div
            className={`hp-bar-fill ${colorClass}`}
            initial={{ width: '0%' }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
          />
        ) : (
          <div className={`hp-bar-fill ${colorClass}`} style={{ width: `${pct}%` }} />
        )}
      </div>
      {showValue && (
        <span className="font-pixel text-px-8 shrink-0 w-6 text-right" style={{ color: 'var(--game-text)' }}>
          {value}
        </span>
      )}
    </div>
  );
}
