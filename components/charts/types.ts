import type { ValueFormat } from '@/lib/format';

export interface ChartSeries {
  key: string;
  label: string;
  /** A CSS colour — normally a `chartColor(n)` variable so dark mode adapts. */
  color: string;
}

export type ChartKind = 'area' | 'line' | 'bar';

export type ChartDatum = { [key: string]: string | number };

export interface TrendChartProps {
  data: ChartDatum[];
  series: ChartSeries[];
  kind?: ChartKind;
  xKey?: string;
  height?: number;
  stacked?: boolean;
  /** Format for tooltip values. */
  format?: ValueFormat;
  /** Format for y-axis ticks. */
  axisFormat?: ValueFormat;
  /** Index of the data point to emphasise (e.g. the current month). */
  highlightIndex?: number;
  /** Start the y-axis at zero (default). Set false for line charts of large, slowly changing values such as a balance. */
  zeroBaseline?: boolean;
}

export interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  height?: number;
  centerLabel: string;
  centerValue: string;
}
