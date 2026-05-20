'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface EncounterFlashProps {
  trigger?: boolean;
  onComplete?: () => void;
}

export function EncounterFlash({ trigger = false, onComplete }: EncounterFlashProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (trigger) {
      setActive(true);
      const t = setTimeout(() => {
        setActive(false);
        onComplete?.();
      }, 600);
      return () => clearTimeout(t);
    }
  }, [trigger, onComplete]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 bg-white z-[9998] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0, 1, 0, 1, 0],
            transition: { duration: 0.55, times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1] },
          }}
          exit={{ opacity: 0 }}
        />
      )}
    </AnimatePresence>
  );
}
