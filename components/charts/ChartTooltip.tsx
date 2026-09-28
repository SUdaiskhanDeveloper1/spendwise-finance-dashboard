import { Box, Flex, Text } from '@chakra-ui/react';
import { formatValue, type ValueFormat } from '@/lib/format';

interface TooltipEntry {
  name?: string | number;
  value?: unknown;
  color?: string;
  dataKey?: unknown;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: readonly TooltipEntry[];
  label?: string | number;
  format?: ValueFormat;
}

/** One tooltip for every series at the hovered point: value first, series name second. */
export function ChartTooltip({ active, payload, label, format = 'currency' }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <Box
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="lg"
      boxShadow="lg"
      px={3}
      py={2.5}
      minW="150px"
      pointerEvents="none"
    >
      {label !== undefined && (
        <Text fontSize="xs" color="text.muted" mb={1.5} fontWeight={500}>
          {label}
        </Text>
      )}
      {payload.map((entry) => (
        <Flex key={String(entry.dataKey ?? entry.name)} align="center" justify="space-between" gap={4} py={0.5}>
          <Flex align="center" gap={2} minW={0}>
            <Box w={3} h="2px" borderRadius="full" bg={entry.color} flexShrink={0} />
            <Text fontSize="xs" color="text.secondary" noOfLines={1}>
              {entry.name}
            </Text>
          </Flex>
          <Text fontSize="sm" fontWeight={600} textStyle="numeric">
            {formatValue(Number(entry.value ?? 0), format)}
          </Text>
        </Flex>
      ))}
    </Box>
  );
}
