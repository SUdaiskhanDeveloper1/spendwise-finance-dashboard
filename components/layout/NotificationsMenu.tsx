'use client';

import {
  Box,
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Bell, CalendarClock, ChartPie, Lightbulb, Target } from 'lucide-react';
import NextLink from 'next/link';
import { useState } from 'react';
import { IconTile, type Tone } from '@/components/ui/IconTile';
import { formatRelativeDay } from '@/lib/format';
import type { AppNotification } from '@/types/user';

const kindStyle: Record<AppNotification['kind'], { icon: typeof Bell; tone: Tone }> = {
  bill: { icon: CalendarClock, tone: 'warning' },
  budget: { icon: ChartPie, tone: 'negative' },
  goal: { icon: Target, tone: 'accent' },
  insight: { icon: Lightbulb, tone: 'info' },
};

export function NotificationsMenu({ items }: { items: AppNotification[] }) {
  const [readIds, setReadIds] = useState(() => new Set(items.filter((n) => n.read).map((n) => n.id)));
  const unread = items.filter((n) => !readIds.has(n.id)).length;

  return (
    <Popover placement="bottom-end" isLazy>
      <PopoverTrigger>
        <Box position="relative">
          <IconButton variant="ghost" aria-label={`Notifications, ${unread} unread`} icon={<Bell size={18} />} />
          {unread > 0 && (
            <Box
              position="absolute"
              top="7px"
              right="8px"
              w={2}
              h={2}
              bg="negative.solid"
              borderRadius="full"
              boxShadow="0 0 0 2px var(--chakra-colors-bg-canvas)"
              pointerEvents="none"
            />
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent w={{ base: 'calc(100vw - 32px)', sm: '380px' }}>
        <PopoverHeader display="flex" alignItems="center" justifyContent="space-between">
          <Text>Notifications</Text>
          {unread > 0 && (
            <Button variant="link" size="sm" fontSize="xs" onClick={() => setReadIds(new Set(items.map((n) => n.id)))}>
              Mark all as read
            </Button>
          )}
        </PopoverHeader>
        <PopoverBody p={1.5} maxH="380px" overflowY="auto">
          <Stack spacing={0.5}>
            {items.map((n) => {
              const { icon, tone } = kindStyle[n.kind];
              const isUnread = !readIds.has(n.id);
              return (
                <Flex
                  key={n.id}
                  as={NextLink}
                  href={n.href}
                  onClick={() => setReadIds((ids) => new Set(ids).add(n.id))}
                  gap={3}
                  p={2.5}
                  borderRadius="lg"
                  _hover={{ bg: 'bg.muted' }}
                  _focusVisible={{ boxShadow: 'outline', outline: 'none' }}
                >
                  <IconTile icon={icon} tone={tone} size="md" />
                  <Box flex={1} minW={0}>
                    <Flex justify="space-between" gap={2}>
                      <Text fontSize="sm" fontWeight={isUnread ? 600 : 500} noOfLines={1}>
                        {n.title}
                      </Text>
                      {isUnread && <Box w={2} h={2} mt={1.5} bg="accent.default" borderRadius="full" flexShrink={0} aria-label="Unread" />}
                    </Flex>
                    <Text fontSize="xs" color="text.secondary" noOfLines={2}>
                      {n.body}
                    </Text>
                    <Text fontSize="xs" color="text.muted" mt={1}>
                      {formatRelativeDay(n.date)}
                    </Text>
                  </Box>
                </Flex>
              );
            })}
          </Stack>
        </PopoverBody>
        <PopoverFooter p={2}>
          <Button as={NextLink} href="/settings?tab=notifications" variant="ghost" size="sm" w="full">
            Notification settings
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}
