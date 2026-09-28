'use client';

import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Menu } from 'lucide-react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { ColorModeToggle } from '@/components/layout/ColorModeToggle';
import { Logo } from '@/components/layout/Logo';
import { marketingNavigation } from '@/components/layout/navigation';

export function PublicHeader() {
  const pathname = usePathname();
  const menu = useDisclosure();
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex="sticky"
      bg="color-mix(in srgb, var(--chakra-colors-bg-canvas) 85%, transparent)"
      backdropFilter="saturate(180%) blur(10px)"
      borderBottomWidth="1px"
      borderColor="border.subtle"
    >
      <Container maxW="7xl" h={16} display="flex" alignItems="center" gap={8}>
        <Logo />
        <Flex as="nav" aria-label="Main" display={{ base: 'none', md: 'flex' }} gap={1}>
          {marketingNavigation.map((item) => {
            const active = pathname === item.href;
            return (
              <Text
                key={item.href}
                as={NextLink}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                px={3}
                py={2}
                borderRadius="md"
                fontSize="sm"
                fontWeight={500}
                color={active ? 'text.primary' : 'text.secondary'}
                _hover={{ color: 'text.primary', bg: 'bg.muted' }}
                _focusVisible={{ boxShadow: 'outline', outline: 'none' }}
              >
                {item.label}
              </Text>
            );
          })}
        </Flex>
        <Flex ml="auto" align="center" gap={2}>
          <ColorModeToggle />
          <Button as={NextLink} href="/dashboard" variant="ghost" display={{ base: 'none', sm: 'inline-flex' }}>
            Sign in
          </Button>
          <Button as={NextLink} href="/dashboard" display={{ base: 'none', sm: 'inline-flex' }}>
            Start for free
          </Button>
          <IconButton display={{ base: 'inline-flex', md: 'none' }} variant="ghost" aria-label="Open menu" icon={<Menu size={20} />} onClick={menu.onOpen} />
        </Flex>
      </Container>

      <Drawer isOpen={menu.isOpen} onClose={menu.onClose} placement="right" size="xs">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Stack as="nav" aria-label="Mobile" spacing={1}>
              {marketingNavigation.map((item) => (
                <Button key={item.href} as={NextLink} href={item.href} variant="ghost" justifyContent="flex-start" onClick={menu.onClose}>
                  {item.label}
                </Button>
              ))}
            </Stack>
            <Stack mt={6} spacing={2}>
              <Button as={NextLink} href="/dashboard" onClick={menu.onClose}>
                Start for free
              </Button>
              <Button as={NextLink} href="/dashboard" variant="secondary" onClick={menu.onClose}>
                Sign in
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
