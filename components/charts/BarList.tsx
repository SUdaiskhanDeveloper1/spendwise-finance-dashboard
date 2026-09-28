import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import { formatCurrency, formatPercent } from '@/lib/format';

export interface BarListItem {
  key: string;
  label: ReactNode;
  value: number;
  /** Bar colour; defaults to the accent. Use one colour for a single series. */
  color?: string;
  meta?: ReactNode;
}

interface BarListProps {
  items: BarListItem[];
  /** Show each value's share of the total next to the amount. */
  showShare?: boolean;
  currency?: string;
}

/**
 * Ranked horizontal bars rendered as HTML — readable without hovering,
 * accessible to screen readers and free of chart-library JavaScript.
 */
export function BarList({ items, showShare = false, currency }: BarListProps) {
  const max = Math.max(...items.map((item) => item.value), 1);
  const total = items.reduce((sum, item) => sum + item.value, 0);
  return (
    <Stack as="ul" listStyleType="none" spacing={4}>
      {items.map((item) => (
        <Box as="li" key={item.key}>
          <Flex justify="space-between" align="baseline" gap={3} mb={1.5}>
            <Box minW={0} fontSize="sm" fontWeight={500}>
              {item.label}
            </Box>
            <Flex gap={2} align="baseline" flexShrink={0}>
              {showShare && (
                <Text fontSize="xs" color="text.muted" textStyle="numeric">
                  {formatPercent(total ? item.value / total : 0)}
                </Text>
              )}
              <Text fontSize="sm" fontWeight={600} textStyle="numeric">
                {formatCurrency(item.value, currency)}
              </Text>
            </Flex>
          </Flex>
          <Box h={2} bg="bg.muted" borderRadius="full" overflow="hidden">
            <Box h="full" w={`${(item.value / max) * 100}%`} bg={item.color ?? 'accent.default'} borderRadius="full" />
          </Box>
          {item.meta && (
            <Text mt={1} fontSize="xs" color="text.muted">
              {item.meta}
            </Text>
          )}
        </Box>
      ))}
    </Stack>
  );
}
