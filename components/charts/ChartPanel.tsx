'use client';

import { Box } from '@chakra-ui/react';
import { ChartColumn, Table2 } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Panel, type PanelProps } from '@/components/ui/Panel';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { ChartLegend } from './ChartLegend';
import { ChartTable } from './ChartTable';
import { TrendChart } from './LazyCharts';
import type { TrendChartProps } from './types';

type View = 'chart' | 'table';

const VIEW_OPTIONS = [
  { value: 'chart', label: <ChartColumn size={14} aria-hidden />, ariaLabel: 'Chart view' },
  { value: 'table', label: <Table2 size={14} aria-hidden />, ariaLabel: 'Table view' },
] as const;

interface ChartPanelProps extends TrendChartProps, Pick<PanelProps, 'gridColumn'> {
  title: string;
  description?: ReactNode;
  action?: ReactNode;
  /** Content between the header and the chart, e.g. a headline figure. */
  summary?: ReactNode;
  xLabel?: string;
}

/** A chart in a panel with a legend and a chart/table toggle, so no value is only reachable by hovering. */
export function ChartPanel({ title, description, action, summary, xLabel, gridColumn, ...chart }: ChartPanelProps) {
  const [view, setView] = useState<View>('chart');
  return (
    <Panel
      title={title}
      description={description}
      gridColumn={gridColumn}
      action={
        <>
          {action}
          <SegmentedControl<View> aria-label={`${title} view`} options={VIEW_OPTIONS} value={view} onChange={setView} />
        </>
      }
    >
      {summary}
      {chart.series.length > 1 && (
        <Box mb={4}>
          <ChartLegend series={chart.series} kind={chart.kind} />
        </Box>
      )}
      {view === 'chart' ? (
        <TrendChart {...chart} />
      ) : (
        <ChartTable data={chart.data} series={chart.series} xKey={chart.xKey} xLabel={xLabel} format={chart.format} caption={title} />
      )}
    </Panel>
  );
}
