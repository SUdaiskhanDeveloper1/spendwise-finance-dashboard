import { Box, Flex, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden focusable="false">
      <rect width="32" height="32" rx="9" fill="var(--chakra-colors-brand-600)" />
      <path d="M8 20.5l5.2-5.2 3.6 3.6L24 11.7" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.6 11.2H24.4V17" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ href = '/', inverse = false }: { href?: string; inverse?: boolean }) {
  return (
    <Flex
      as={NextLink}
      href={href}
      align="center"
      gap={2.5}
      aria-label="SpendWise home"
      borderRadius="md"
      _focusVisible={{ boxShadow: 'outline', outline: 'none' }}
    >
      <LogoMark />
      <Text as="span" fontFamily="heading" fontWeight={700} fontSize="lg" letterSpacing="-0.03em" color={inverse ? 'white' : 'text.primary'}>
        Spend
        <Box as="span" color={inverse ? 'brand.300' : 'accent.default'}>
          Wise
        </Box>
      </Text>
    </Flex>
  );
}
