'use client';

import { cn } from '@/lib/utils';

interface GameBoxProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | 'accent';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function GameBox({
  children,
  className,
  variant = 'light',
  padding = 'md',
}: GameBoxProps) {
  const variantClass = {
    light:  'game-box',
    dark:   'game-box-dark',
    accent: 'game-box-accent',
  }[variant];

  const paddingClass = {
    none: '',
    sm:   'p-2',
    md:   'p-4',
    lg:   'p-6',
  }[padding];

  return (
    <div className={cn(variantClass, paddingClass, className)}>
      {children}
    </div>
  );
}
