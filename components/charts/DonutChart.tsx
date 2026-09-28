'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartTooltip } from './ChartTooltip';
import type { DonutChartProps } from './types';

/** Part-to-whole at a glance (≤ 7 segments). Pair it with a legend list that shows the values. */
export default function DonutChart({ data, height = 220, centerLabel, centerValue }: DonutChartProps) {
  return (
    <Box position="relative" h={`${height}px`}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Tooltip
            content={(props) => (
              <ChartTooltip active={props.active} payload={props.payload} format="currency" />
            )}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="70%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            cornerRadius={3}
            stroke="var(--chakra-colors-chart-surface)"
            strokeWidth={2}
            isAnimationActive={false}
          >
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <Flex position="absolute" inset={0} direction="column" align="center" justify="center" pointerEvents="none">
        <Text fontSize="xs" color="text.muted" fontWeight={500}>
          {centerLabel}
        </Text>
        <Text fontSize="lg" fontWeight={600} letterSpacing="-0.02em">
          {centerValue}
        </Text>
      </Flex>
    </Box>
  );
}
