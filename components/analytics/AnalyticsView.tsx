'use client';

import { Box, Flex, Grid, SimpleGrid, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { ChartPanel } from '@/components/charts/ChartPanel';
import { Panel } from '@/components/ui/Panel';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { Sparkline } from '@/components/ui/Sparkline';
import { StatCard } from '@/components/ui/StatCard';
import type { MonthlyCategorySpend } from '@/data/analytics';
import { chartColor, spendGroups } from '@/lib/categories';
import { formatCurrency, formatPercent } from '@/lib/format';
import { savingsRate } from '@/lib/transactions';
import { sumBy } from '@/lib/utils';

type Range = '3m' | '6m' | 'ytd';
const RANGES = [
  { value: '3m', label: '3 months' },
  { value: '6m', label: '6 months' },
  { value: 'ytd', label: 'Year to date' },
] as const;
const RANGE_LENGTH: Record<Range, number> = { '3m': 3, '6m': 6, ytd: 12 };

interface AnalyticsViewProps {
  cashFlow: { name: string; income: number; expenses: number }[];
  categories: MonthlyCategorySpend[];
}

const flowSeries = [
  { key: 'income', label: 'Income', color: chartColor(1) },
  { key: 'expenses', label: 'Spending', color: chartColor(2) },
];

export function AnalyticsView({ cashFlow, categories }: AnalyticsViewProps) {
  const [range, setRange] = useState<Range>('6m');

  const view = useMemo(() => {
    const n = RANGE_LENGTH[range];
    const flow = cashFlow.slice(-n);
    const cats = categories.slice(-n);
    const months = flow.length;
    const income = sumBy(flow, (m) => m.income);
    const expenses = sumBy(flow, (m) => m.expenses);
    const rates = flow.map((m) => ({ name: m.name, rate: savingsRate(m.income, m.expenses) }));
    const best = [...rates].sort((a, b) => b.rate - a.rate)[0];
    const total = sumBy(cats, (m) => spendGroups.reduce((s, g) => s + m[g.key], 0));
    const rows = spendGroups.map((g) => {
      const values = cats.map((m) => m[g.key]);
      const sum = values.reduce((a, b) => a + b, 0);
      return { ...g, values, average: sum / months, share: total ? sum / total : 0 };
    });
    return { flow, cats, months, income, expenses, rates, best, rows };
  }, [range, cashFlow, categories]);

  const label = view.months === 1 ? 'month' : `${view.months} months`;

  return (
    <Stack spacing={{ base: 6, md: 8 }}>
      <Flex justify="space-between" align="center" gap={3} wrap="wrap">
        <SegmentedControl<Range> aria-label="Time range" options={RANGES} value={range} onChange={setRange} size="md" />
        <Text fontSize="sm" color="text.muted">
          {view.flow[0]?.name}–{view.flow[view.flow.length - 1]?.name} 2026 · July is month to date
        </Text>
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} spacing={{ base: 3, md: 4 }}>
        <StatCard label="Average monthly income" value={formatCurrency(view.income / view.months, 'GBP', 0)} helper={`Over ${label}`} trend={view.flow.map((m) => m.income)} />
        <StatCard label="Average monthly spending" value={formatCurrency(view.expenses / view.months, 'GBP', 0)} helper={`Over ${label}`} trend={view.flow.map((m) => m.expenses)} />
        <StatCard label="Average savings rate" value={formatPercent(savingsRate(view.income, view.expenses))} helper="Share of income kept" trend={view.rates.map((r) => r.rate)} />
        <StatCard label="Best month" value={view.best?.name ?? '—'} helper={view.best ? `Saved ${formatPercent(view.best.rate)} of income` : undefined} />
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', xl: 'repeat(2, minmax(0, 1fr))' }} gap={{ base: 4, md: 6 }}>
        <ChartPanel title="Income vs spending" description="Monthly totals" data={view.flow} series={flowSeries} kind="bar" height={280} xLabel="Month" />
        <ChartPanel
          title="Savings rate"
          description="Share of each month’s income you kept"
          data={view.rates}
          series={[{ key: 'rate', label: 'Savings rate', color: chartColor(3) }]}
          kind="line"
          height={280}
          format="percent"
          axisFormat="percent"
          xLabel="Month"
        />
      </Grid>

      <ChartPanel
        title="Spending by category"
        description="How each month’s spending splits across categories"
        data={view.cats}
        series={spendGroups.map((g) => ({ key: g.key, label: g.label, color: g.color }))}
        kind="bar"
        stacked
        height={320}
        xLabel="Month"
      />

      <Panel title="Category trends" description={`Average per month and share of spending over ${label}`} flush>
        <Box overflowX="auto">
          <Table>
            <Thead>
              <Tr>
                <Th>Category</Th>
                <Th isNumeric>Average / month</Th>
                <Th isNumeric>Share</Th>
                <Th>Trend</Th>
              </Tr>
            </Thead>
            <Tbody>
              {view.rows.map((row) => (
                <Tr key={row.key}>
                  <Td>
                    <Flex align="center" gap={2}>
                      <Box w={2.5} h={2.5} borderRadius="3px" bg={row.color} />
                      <Text fontWeight={500}>{row.label}</Text>
                    </Flex>
                  </Td>
                  <Td isNumeric textStyle="numeric">
                    {formatCurrency(row.average, 'GBP', 0)}
                  </Td>
                  <Td isNumeric textStyle="numeric">
                    {formatPercent(row.share)}
                  </Td>
                  <Td py={1.5}>
                    <Sparkline data={row.values} label={`${row.label} monthly trend`} width={96} height={28} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Panel>
    </Stack>
  );
}
