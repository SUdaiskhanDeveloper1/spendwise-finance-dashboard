import { Box, Flex, Text } from '@chakra-ui/react';
import type { ChartKind, ChartSeries } from './types';

/** HTML legend; swatches mirror the mark (a line for line charts, a square otherwise). */
export function ChartLegend({ series, kind = 'bar' }: { series: ChartSeries[]; kind?: ChartKind }) {
  if (series.length < 2) return null;
  return (
    <Flex as="ul" listStyleType="none" gap={4} wrap="wrap" aria-label="Legend">
      {series.map((s) => (
        <Flex as="li" key={s.key} align="center" gap={2}>
          <Box
            w={kind === 'line' ? 3.5 : 2.5}
            h={kind === 'line' ? '2px' : 2.5}
            borderRadius={kind === 'line' ? 'full' : '3px'}
            bg={s.color}
            flexShrink={0}
          />
          <Text fontSize="sm" color="text.secondary">
            {s.label}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}
