'use client';

import { Flex, Text, chakra } from '@chakra-ui/react';
import { Ellipsis } from 'lucide-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { isActivePath, mobileTabs } from './navigation';

const tabStyle = {
  flex: 1,
  direction: 'column',
  align: 'center',
  justify: 'center',
  gap: 1,
  h: 'full',
  fontSize: '0.6875rem',
  _focusVisible: { boxShadow: 'inset 0 0 0 2px var(--chakra-colors-accent-default)', outline: 'none' },
} as const;

/** Bottom navigation on phones and small tablets — the main destinations within thumb reach. */
export function MobileTabBar({ onOpenMore }: { onOpenMore: () => void }) {
  const pathname = usePathname();
  return (
    <Flex
      as="nav"
      aria-label="Quick navigation"
      display={{ base: 'flex', lg: 'none' }}
      position="fixed"
      bottom={0}
      insetX={0}
      zIndex="sticky"
      h="64px"
      pb="env(safe-area-inset-bottom)"
      boxSizing="content-box"
      bg="bg.surface"
      borderTopWidth="1px"
      borderColor="border.subtle"
    >
      {mobileTabs.map((tab) => {
        const active = isActivePath(pathname, tab.href);
        const Icon = tab.icon;
        return (
          <Flex
            key={tab.href}
            as={NextLink}
            href={tab.href}
            aria-current={active ? 'page' : undefined}
            color={active ? 'accent.fg' : 'text.muted'}
            fontWeight={active ? 600 : 500}
            {...tabStyle}
          >
            <Icon size={20} strokeWidth={active ? 2.25 : 2} aria-hidden />
            <Text as="span">{tab.label}</Text>
          </Flex>
        );
      })}
      <Flex as={chakra.button} type="button" onClick={onOpenMore} color="text.muted" fontWeight={500} {...tabStyle}>
        <Ellipsis size={20} aria-hidden />
        <Text as="span">More</Text>
      </Flex>
    </Flex>
  );
}
