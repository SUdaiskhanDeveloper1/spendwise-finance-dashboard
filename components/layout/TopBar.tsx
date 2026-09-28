'use client';

import { Box, Button, Flex, IconButton } from '@chakra-ui/react';
import { Menu, Plus } from 'lucide-react';
import { ColorModeToggle } from './ColorModeToggle';
import { HeaderSearch } from './HeaderSearch';
import { LogoMark } from './Logo';
import { NotificationsMenu } from './NotificationsMenu';
import { UserMenu } from './UserMenu';
import type { AppNotification } from '@/types/user';

interface TopBarProps {
  onOpenNav: () => void;
  onQuickAdd: () => void;
  notifications: AppNotification[];
  user: { name: string; email: string; avatar: string };
}

export function TopBar({ onOpenNav, onQuickAdd, notifications, user }: TopBarProps) {
  return (
    <Flex
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      h={16}
      align="center"
      gap={{ base: 2, md: 4 }}
      px={{ base: 3, md: 6, xl: 8 }}
      bg="color-mix(in srgb, var(--chakra-colors-bg-canvas) 86%, transparent)"
      backdropFilter="saturate(180%) blur(10px)"
      borderBottomWidth="1px"
      borderColor="border.subtle"
    >
      <IconButton
        display={{ base: 'inline-flex', lg: 'none' }}
        variant="ghost"
        aria-label="Open menu"
        icon={<Menu size={20} />}
        onClick={onOpenNav}
      />
      <Box display={{ base: 'block', md: 'none' }}>
        <LogoMark size={28} />
      </Box>
      <Box flex={1} maxW="420px" display={{ base: 'none', md: 'block' }}>
        <HeaderSearch />
      </Box>
      <Flex ml="auto" align="center" gap={{ base: 1, md: 2 }}>
        <Button display={{ base: 'none', sm: 'inline-flex' }} leftIcon={<Plus size={16} />} onClick={onQuickAdd} size="sm" h={9}>
          Add transaction
        </Button>
        <IconButton display={{ base: 'inline-flex', sm: 'none' }} aria-label="Add transaction" icon={<Plus size={18} />} onClick={onQuickAdd} size="sm" h={9} w={9} />
        <NotificationsMenu items={notifications} />
        <ColorModeToggle />
        <UserMenu {...user} />
      </Flex>
    </Flex>
  );
}
