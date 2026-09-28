'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Box } from '@chakra-ui/react';
import { useId } from 'react';
import { formatValue } from '@/lib/format';
import { ChartTooltip } from './ChartTooltip';
import type { TrendChartProps } from './types';

const GRID = 'var(--chakra-colors-chart-grid)';
const AXIS = 'var(--chakra-colors-chart-axis)';
const SURFACE = 'var(--chakra-colors-chart-surface)';
const TICK = { fill: AXIS, fontSize: 12 };
const MARGIN = { top: 8, right: 8, bottom: 0, left: 0 };

/**
 * Generic cartesian chart (area, line or bar) with the house mark specs:
 * 2px lines, 10% area washes, ≤24px bars with 4px rounded ends, a 2px surface
 * gap between touching fills, solid hairline grid and one tooltip for all series.
 *
 * Recharts' entry animation is turned off: in Recharts 3 it can stall and
 * leave a chart blank, and an instant render is faster anyway.
 */
export default function TrendChart({
  data,
  series,
  kind = 'area',
  xKey = 'name',
  height = 280,
  stacked = false,
  format = 'currency',
  axisFormat = 'compactCurrency',
  highlightIndex,
  zeroBaseline = true,
}: TrendChartProps) {
  const gradientId = useId().replace(/:/g, '');
  const tooltip = (
    <Tooltip
      cursor={kind === 'bar' ? { fill: 'var(--chakra-colors-bg-muted)', opacity: 0.7 } : { stroke: 'var(--chakra-colors-border-strong)', strokeWidth: 1 }}
      content={(props) => (
        <ChartTooltip active={props.active} payload={props.payload} label={props.label} format={format} />
      )}
    />
  );
  const axes = (
    <>
      <CartesianGrid vertical={false} stroke={GRID} />
      <XAxis dataKey={xKey} tick={TICK} tickLine={false} axisLine={{ stroke: GRID }} tickMargin={8} interval="preserveStartEnd" minTickGap={12} />
      <YAxis
        tick={TICK}
        tickLine={false}
        axisLine={false}
        width={52}
        domain={zeroBaseline ? [0, 'auto'] : [(min: number) => Math.floor((min * 0.97) / 500) * 500, (max: number) => Math.ceil((max * 1.01) / 500) * 500]}
        tickFormatter={(value: number) => formatValue(value, axisFormat)}
      />
    </>
  );

  return (
    <Box h="full">
      <ResponsiveContainer width="100%" height={height}>
        {kind === 'bar' ? (
          <BarChart data={data} margin={MARGIN} barGap={4} barCategoryGap="28%">
            {axes}
            {tooltip}
            {series.map((s, i) => {
              const isTop = !stacked || i === series.length - 1;
              return (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  name={s.label}
                  fill={s.color}
                  stackId={stacked ? 'stack' : undefined}
                  maxBarSize={24}
                  radius={isTop ? [4, 4, 0, 0] : 0}
                  stroke={stacked ? SURFACE : undefined}
                  strokeWidth={stacked ? 2 : 0}
                  isAnimationActive={false}
                >
                  {highlightIndex !== undefined &&
                    series.length === 1 &&
                    data.map((_, index) => (
                      <Cell key={index} fillOpacity={index === highlightIndex ? 1 : 0.45} />
                    ))}
                </Bar>
              );
            })}
          </BarChart>
        ) : kind === 'line' ? (
          <LineChart data={data} margin={MARGIN}>
            {axes}
            {tooltip}
            {series.map((s) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                dot={false}
                activeDot={{ r: 4, stroke: SURFACE, strokeWidth: 2 }}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        ) : (
          <AreaChart data={data} margin={MARGIN}>
            {/* Washes fade to transparent so overlapping series never mix into a muddy tone. */}
            <defs>
              {series.map((s) => (
                <linearGradient key={s.key} id={`${gradientId}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity={0.16} />
                  <stop offset="85%" stopColor={s.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            {axes}
            {tooltip}
            {series.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={s.color}
                strokeWidth={2}
                fill={`url(#${gradientId}-${s.key})`}
                stackId={stacked ? 'stack' : undefined}
                dot={false}
                activeDot={{ r: 4, stroke: SURFACE, strokeWidth: 2 }}
                isAnimationActive={false}
              />
            ))}
          </AreaChart>
        )}
      </ResponsiveContainer>
    </Box>
  );
}
