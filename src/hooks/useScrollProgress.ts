'use client';

import { useScroll, useTransform, MotionValue } from 'framer-motion';

export function useScrollProgress(): { scrollYProgress: MotionValue<number>; scaleX: MotionValue<number> } {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return { scrollYProgress, scaleX };
}
