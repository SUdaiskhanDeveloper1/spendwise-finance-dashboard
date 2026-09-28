'use client';

import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, useDisclosure } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { AddTransactionModal } from '@/components/transactions/AddTransactionModal';
import type { AppNotification } from '@/types/user';
import { MobileTabBar } from './MobileTabBar';
import { SidebarNav, type NavBadges } from './SidebarNav';
import { TopBar } from './TopBar';

interface AppShellProps {
  children: ReactNode;
  badges: NavBadges;
  notifications: AppNotification[];
  user: { name: string; email: string; avatar: string };
}

/**
 * Persistent frame for every app screen. It lives in the route-group layout,
 * so the sidebar and header stay mounted while pages change.
 */
export function AppShell({ children, badges, notifications, user }: AppShellProps) {
  const nav = useDisclosure();
  const quickAdd = useDisclosure();

  return (
    <Flex minH="100dvh">
      <Box
        as="a"
        href="#main"
        position="absolute"
        left={4}
        top={-20}
        zIndex="skipLink"
        bg="bg.surface"
        px={4}
        py={2}
        borderRadius="md"
        boxShadow="lg"
        _focus={{ top: 4 }}
      >
        Skip to content
      </Box>

      <Box
        as="aside"
        display={{ base: 'none', lg: 'block' }}
        w="264px"
        flexShrink={0}
        position="sticky"
        top={0}
        h="100dvh"
        bg="bg.surface"
        borderRightWidth="1px"
        borderColor="border.subtle"
      >
        <SidebarNav badges={badges} />
      </Box>

      <Box flex={1} minW={0}>
        <TopBar onOpenNav={nav.onOpen} onQuickAdd={quickAdd.onOpen} notifications={notifications} user={user} />
        <Box
          as="main"
          id="main"
          tabIndex={-1}
          maxW="1440px"
          mx="auto"
          px={{ base: 4, md: 6, xl: 8 }}
          pt={{ base: 5, md: 8 }}
          pb={{ base: 28, lg: 12 }}
          _focus={{ outline: 'none' }}
        >
          {children}
        </Box>
      </Box>

      <Drawer isOpen={nav.isOpen} onClose={nav.onClose} placement="left" size="xs">
        <DrawerOverlay />
        <DrawerContent maxW="288px">
          <DrawerCloseButton top={4} />
          <DrawerBody p={0}>
            <SidebarNav badges={badges} onNavigate={nav.onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <MobileTabBar onOpenMore={nav.onOpen} />
      <AddTransactionModal isOpen={quickAdd.isOpen} onClose={quickAdd.onClose} />
    </Flex>
  );
}
