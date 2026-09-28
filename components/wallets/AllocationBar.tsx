import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { formatCurrency, formatPercent } from '@/lib/format';

export interface AllocationItem {
  key: string;
  label: string;
  value: number;
  color: string;
  currency?: string;
}

/**
 * Part-to-whole as a single stacked bar with a 2px surface gap between
 * segments, followed by a legend that carries every value as text.
 */
export function AllocationBar({ items, showLegend = true }: { items: AllocationItem[]; showLegend?: boolean }) {
  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
  return (
    <Box>
      <Flex h={3} gap="2px" borderRadius="full" overflow="hidden" role="img" aria-label={items.map((i) => `${i.label} ${formatPercent(i.value / total)}`).join(', ')}>
        {items.map((item) => (
          <Box key={item.key} h="full" w={`${(item.value / total) * 100}%`} minW="4px" bg={item.color} />
        ))}
      </Flex>
      {showLegend && (
        <Stack as="ul" listStyleType="none" mt={4} spacing={2.5}>
          {items.map((item) => (
            <Flex as="li" key={item.key} align="center" justify="space-between" gap={3}>
              <Flex align="center" gap={2} minW={0}>
                <Box w={2.5} h={2.5} borderRadius="3px" bg={item.color} flexShrink={0} />
                <Text fontSize="sm" color="text.secondary" noOfLines={1}>
                  {item.label}
                </Text>
              </Flex>
              <Flex gap={3} align="baseline" flexShrink={0}>
                <Text fontSize="xs" color="text.muted" textStyle="numeric" w={9} textAlign="right">
                  {formatPercent(item.value / total)}
                </Text>
                <Text fontSize="sm" fontWeight={600} textStyle="numeric" minW="84px" textAlign="right">
                  {formatCurrency(item.value, item.currency)}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Stack>
      )}
    </Box>
  );
}
