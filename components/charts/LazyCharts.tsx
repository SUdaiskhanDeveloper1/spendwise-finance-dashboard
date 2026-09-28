'use client';

import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { ChartSkeleton } from '@/components/ui/Skeletons';
import type { DonutChartProps, TrendChartProps } from './types';

// Recharts is the heaviest client dependency, so charts are split into their
// own chunk and rendered only in the browser. The wrapper reserves the exact
// chart height, so the skeleton → chart swap causes no layout shift.
const TrendChartImpl = dynamic(() => import('./TrendChart'), {
  ssr: false,
  loading: () => <ChartSkeleton height="100%" />,
});

const DonutChartImpl = dynamic(() => import('./DonutChart'), {
  ssr: false,
  loading: () => <ChartSkeleton height="100%" />,
});

export function TrendChart(props: TrendChartProps) {
  const height = props.height ?? 280;
  return (
    <Box h={`${height}px`} minW={0}>
      <TrendChartImpl {...props} height={height} />
    </Box>
  );
}

export function DonutChart(props: DonutChartProps) {
  const height = props.height ?? 220;
  return (
    <Box h={`${height}px`} minW={0}>
      <DonutChartImpl {...props} height={height} />
    </Box>
  );
}
