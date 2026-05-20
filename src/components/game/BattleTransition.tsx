'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface BattleTransitionProps {
  trigger: boolean;
  onComplete?: () => void;
}

export function BattleTransition({ trigger, onComplete }: BattleTransitionProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    setActive(true);
    const t = setTimeout(() => {
      setActive(false);
      onComplete?.();
    }, 650);
    return () => clearTimeout(t);
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="battle-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 1, 1, 0] }}
          transition={{ duration: 0.65, times: [0, 0.7, 0.85, 1] }}
          style={{
            backgroundImage: `
              linear-gradient(45deg, #000 25%, transparent 25%),
              linear-gradient(-45deg, #000 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #000 75%),
              linear-gradient(-45deg, transparent 75%, #000 75%)
            `,
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0, 0 16px, 16px -16px, -16px 0px',
          }}
        />
      )}
    </AnimatePresence>
  );
}

/* Self-triggering section enter transition */
export function SectionEnterTransition() {
  return (
    <motion.div
      className="absolute inset-0 z-[60] pointer-events-none"
      style={{ background: '#000' }}
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 0 }}
      viewport={{ once: true, margin: '0px' }}
      transition={{ duration: 0.35, delay: 0.05 }}
    />
  );
}
