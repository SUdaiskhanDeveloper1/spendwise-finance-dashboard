'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { MotionConfig } from 'framer-motion';
import { theme } from '@/theme';

const toastOptions = { defaultOptions: { position: 'top-right', duration: 4000, isClosable: true } } as const;

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme} toastOptions={toastOptions}>
      {/* Honour the operating system's "reduce motion" setting everywhere. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ChakraProvider>
  );
}
