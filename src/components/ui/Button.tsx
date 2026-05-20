'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, href, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-display font-semibold tracking-wide rounded-lg transition-all duration-200 cursor-pointer select-none';

    const variants = {
      primary:
        'bg-[var(--color-ghost)] text-white hover:bg-[var(--color-ghost-light)] shadow-lg hover:shadow-[0_0_20px_var(--color-ghost-glow)]',
      ghost:
        'bg-transparent text-[var(--color-ghost-light)] border border-[var(--color-ghost)] hover:bg-[var(--color-ghost-glow)] hover:border-[var(--color-ghost-light)]',
      outline:
        'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-bright)] hover:border-[var(--color-ghost)] hover:text-[var(--color-ghost-light)]',
    };

    const sizes = {
      sm: 'px-4 py-1.5 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3.5 text-lg',
    };

    const classes = cn(base, variants[variant], sizes[size], className);

    if (href) {
      return (
        <motion.a
          href={href}
          className={classes}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
