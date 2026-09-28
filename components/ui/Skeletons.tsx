import { Box, Flex, SimpleGrid, Skeleton, Stack } from '@chakra-ui/react';

const surface = {
  bg: 'bg.surface',
  borderWidth: '1px',
  borderColor: 'border.subtle',
  borderRadius: 'xl',
  p: { base: 4, md: 5 },
} as const;

/** Placeholder with the exact height of the chart it stands in for (no layout shift). */
export function ChartSkeleton({ height = 280 }: { height?: number | string }) {
  return (
    <Flex h={typeof height === 'number' ? `${height}px` : height} align="flex-end" gap={3} px={2} pb={6} aria-hidden>
      {[45, 70, 55, 85, 60, 90, 75].map((h, i) => (
        <Skeleton key={i} flex={1} h={`${h}%`} borderRadius="md" opacity={0.7} />
      ))}
    </Flex>
  );
}

export function StatGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2, xl: count }} spacing={{ base: 3, md: 4 }}>
      {Array.from({ length: count }, (_, i) => (
        <Stack key={i} {...surface} spacing={4}>
          <Skeleton h={4} w="45%" />
          <Skeleton h={8} w="70%" />
          <Skeleton h={4} w="55%" />
        </Stack>
      ))}
    </SimpleGrid>
  );
}

export function PanelSkeleton({ height = 280 }: { height?: number }) {
  return (
    <Box {...surface}>
      <Skeleton h={4} w="30%" mb={2} />
      <Skeleton h={3} w="45%" mb={4} />
      <ChartSkeleton height={height} />
    </Box>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <Box {...surface} p={0} overflow="hidden">
      <Skeleton h={10} borderRadius={0} opacity={0.6} />
      <Stack p={4} spacing={5}>
        {Array.from({ length: rows }, (_, i) => (
          <Flex key={i} align="center" gap={3}>
            <Skeleton w={9} h={9} borderRadius="lg" />
            <Stack flex={1} spacing={2}>
              <Skeleton h={3} w="40%" />
              <Skeleton h={3} w="25%" />
            </Stack>
            <Skeleton h={3} w={16} />
          </Flex>
        ))}
      </Stack>
    </Box>
  );
}

/** Generic page placeholder used by the app route `loading.tsx`. */
export function PageSkeleton() {
  return (
    <Stack spacing={{ base: 6, md: 8 }} aria-busy="true" aria-label="Loading">
      <Stack spacing={3}>
        <Skeleton h={7} w="220px" />
        <Skeleton h={4} w="340px" maxW="80%" />
      </Stack>
      <StatGridSkeleton />
      <SimpleGrid columns={{ base: 1, xl: 3 }} spacing={{ base: 4, md: 6 }}>
        <Box gridColumn={{ xl: 'span 2' }}>
          <PanelSkeleton />
        </Box>
        <PanelSkeleton />
      </SimpleGrid>
    </Stack>
  );
}
