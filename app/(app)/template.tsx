'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

// The first render (server HTML + hydration) is shown immediately; only
// client-side navigations fade in. Animating the first paint would ship the
// page at opacity 0 and delay First Contentful Paint until JavaScript runs.
let hasNavigated = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const animate = hasNavigated;
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
