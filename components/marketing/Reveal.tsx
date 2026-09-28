'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Fades content up as it scrolls into view, once. Used only below the fold;
 * a <noscript> rule in the marketing layout keeps content visible without JS.
 */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      data-reveal=""
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
