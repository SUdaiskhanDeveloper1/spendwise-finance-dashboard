'use client';

import { Badge, Box, Flex, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { Logo } from './Logo';
import { accountNavigation, appNavigation, isActivePath, type NavItem } from './navigation';

export type NavBadges = Record<string, number>;

function NavLink({ item, badge, onNavigate }: { item: NavItem; badge?: number; onNavigate?: () => void }) {
  const pathname = usePathname();
  const active = isActivePath(pathname, item.href);
  const Icon = item.icon;
  return (
    <Flex
      as={NextLink}
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      align="center"
      gap={3}
      h={9}
      px={3}
      borderRadius="lg"
      fontSize="sm"
      fontWeight={active ? 600 : 500}
      color={active ? 'accent.fg' : 'text.secondary'}
      bg={active ? 'accent.subtle' : 'transparent'}
      transition="background 0.15s, color 0.15s"
      _hover={{ bg: active ? 'accent.subtle' : 'bg.muted', color: active ? 'accent.fg' : 'text.primary' }}
      _focusVisible={{ boxShadow: 'outline', outline: 'none' }}
    >
      <Icon size={18} strokeWidth={active ? 2.25 : 2} aria-hidden />
      <Text as="span" flex={1} noOfLines={1}>
        {item.label}
      </Text>
      {badge ? (
        <Badge variant={active ? 'accent' : 'neutral'} minW={5} textAlign="center" px={1.5} aria-label={`${badge} need attention`}>
          {badge}
        </Badge>
      ) : null}
    </Flex>
  );
}

interface SidebarNavProps {
  badges?: NavBadges;
  onNavigate?: () => void;
  showLogo?: boolean;
}

/** Sidebar contents; shared by the desktop sidebar and the mobile drawer. */
export function SidebarNav({ badges = {}, onNavigate, showLogo = true }: SidebarNavProps) {
  return (
    <Flex direction="column" h="full" minH={0} overflowY="auto">
      {showLogo && (
        <Box px={5} h={16} display="flex" alignItems="center" flexShrink={0}>
          <Logo href="/dashboard" />
        </Box>
      )}
      <Box as="nav" aria-label="Main" px={3} pb={4} pt={showLogo ? 2 : 0}>
        <Stack spacing={4}>
          {appNavigation.map((group, index) => (
            <Box key={group.label ?? index}>
              {group.label && (
                <Text px={3} mb={1.5} fontSize="xs" fontWeight={500} color="text.muted">
                  {group.label}
                </Text>
              )}
              <Stack spacing={0.5}>
                {group.items.map((item) => (
                  <NavLink key={item.href} item={item} badge={item.badgeKey ? badges[item.badgeKey] : undefined} onNavigate={onNavigate} />
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
      <Box px={3} pb={4} pt={3} mt="auto" borderTopWidth="1px" borderColor="border.subtle" flexShrink={0}>
        <Stack spacing={0.5} mb={3}>
          {accountNavigation.map((item) => (
            <NavLink key={item.href} item={item} onNavigate={onNavigate} />
          ))}
        </Stack>
        <Box bg="bg.subtle" borderWidth="1px" borderColor="border.subtle" borderRadius="lg" p={3}>
          <Flex align="center" gap={2} mb={1}>
            <Box color="accent.default">
              <Sparkles size={14} aria-hidden />
            </Box>
            <Text fontSize="sm" fontWeight={600}>
              Premium plan
            </Text>
          </Flex>
          <Text fontSize="xs" color="text.muted" mb={2}>
            Renews on 12 Aug · £12/month
          </Text>
          <Text as={NextLink} href="/pricing" onClick={onNavigate} fontSize="xs" fontWeight={600} color="accent.fg" _hover={{ textDecoration: 'underline' }}>
            Manage plan
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
