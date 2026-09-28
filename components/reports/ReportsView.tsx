'use client';

import { Badge, Box, Button, Flex, Grid, Select, SimpleGrid, Stack, Text, useToast } from '@chakra-ui/react';
import { Download, FileSpreadsheet, FileText, Printer, Store } from 'lucide-react';
import { useMemo, useState } from 'react';
import { BarList } from '@/components/charts/BarList';
import { ChartPanel } from '@/components/charts/ChartPanel';
import { DonutChart } from '@/components/charts/LazyCharts';
import { EmptyState } from '@/components/ui/EmptyState';
import { IconTile } from '@/components/ui/IconTile';
import { Panel } from '@/components/ui/Panel';
import { StatCard } from '@/components/ui/StatCard';
import type { MonthlyCategorySpend } from '@/data/analytics';
import { chartColor, spendGroups } from '@/lib/categories';
import { formatCurrency, formatDate, formatPercent } from '@/lib/format';
import { savingsRate } from '@/lib/transactions';
import { change } from '@/lib/utils';
import type { SavedReport } from '@/types/report';

interface Merchant {
  merchant: string;
  total: number;
  count: number;
  category: string;
}

interface ReportsViewProps {
  periods: { value: string; label: string; short: string }[];
  cashFlow: { name: string; income: number; expenses: number }[];
  categories: MonthlyCategorySpend[];
  merchantsByMonth: Record<string, Merchant[]>;
  wallets: { key: string; label: string; value: number; color: string }[];
  reports: SavedReport[];
}

const flowSeries = [
  { key: 'income', label: 'Income', color: chartColor(1) },
  { key: 'expenses', label: 'Spending', color: chartColor(2) },
];

export function ReportsView({ periods, cashFlow, categories, merchantsByMonth, wallets, reports }: ReportsViewProps) {
  const toast = useToast();
  const [month, setMonth] = useState(periods[0].value);

  const report = useMemo(() => {
    const period = periods.find((p) => p.value === month) ?? periods[0];
    const index = cashFlow.findIndex((m) => m.name === period.short);
    const current = cashFlow[index];
    const previous = cashFlow[index - 1];
    const spendRow = categories.find((c) => c.name === period.short);
    const breakdown = spendGroups.map((g) => ({ name: g.label, value: spendRow ? spendRow[g.key] : 0, color: g.color }));
    return {
      period,
      current,
      previous,
      breakdown,
      history: cashFlow.slice(Math.max(0, index - 5), index + 1),
      merchants: merchantsByMonth[month] ?? [],
    };
  }, [month, periods, cashFlow, categories, merchantsByMonth]);

  const { current, previous } = report;
  const net = current.income - current.expenses;
  const prevNet = previous ? previous.income - previous.expenses : undefined;
  const spent = report.breakdown.reduce((sum, d) => sum + d.value, 0);
  const vs = previous ? `vs ${previous.name}` : undefined;

  const exportCsv = () => {
    const lines = [
      `SpendWise report,${report.period.label}`,
      '',
      'Metric,Amount (GBP)',
      `Income,${current.income.toFixed(2)}`,
      `Spending,${current.expenses.toFixed(2)}`,
      `Net saved,${net.toFixed(2)}`,
      '',
      'Category,Amount (GBP),Share',
      ...report.breakdown.map((d) => `${d.name},${d.value.toFixed(2)},${formatPercent(spent ? d.value / spent : 0)}`),
    ];
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `spendwise-report-${month}.csv`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast({ status: 'success', title: 'Report exported', description: `${report.period.label} saved as CSV.` });
  };

  return (
    <Stack spacing={{ base: 6, md: 8 }}>
      <Flex gap={2} wrap="wrap" align="center" className="no-print">
        <Select aria-label="Report period" value={month} onChange={(e) => setMonth(e.target.value)} w={{ base: 'full', sm: '240px' }}>
          {periods.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </Select>
        <Flex gap={2} ml={{ sm: 'auto' }}>
          <Button variant="secondary" leftIcon={<Printer size={16} />} onClick={() => window.print()}>
            Print
          </Button>
          <Button leftIcon={<Download size={16} />} onClick={exportCsv}>
            Export CSV
          </Button>
        </Flex>
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} spacing={{ base: 3, md: 4 }}>
        <StatCard label="Income" value={formatCurrency(current.income)} delta={previous ? change(current.income, previous.income) : undefined} deltaLabel={vs} />
        <StatCard label="Spending" value={formatCurrency(current.expenses)} delta={previous ? change(current.expenses, previous.expenses) : undefined} deltaLabel={vs} positiveIsGood={false} />
        <StatCard label="Net saved" value={formatCurrency(net)} delta={prevNet ? change(net, prevNet) : undefined} deltaLabel={vs} />
        <StatCard label="Savings rate" value={formatPercent(savingsRate(current.income, current.expenses))} helper={previous ? `${formatPercent(savingsRate(previous.income, previous.expenses))} in ${previous.name}` : undefined} />
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 1fr) minmax(0, 2fr)' }} gap={{ base: 4, md: 6 }}>
        <Panel title="Spending breakdown" description={report.period.label}>
          <DonutChart data={report.breakdown} height={190} centerLabel="Total spent" centerValue={formatCurrency(spent, 'GBP', 0)} />
          <Stack as="ul" listStyleType="none" mt={5} spacing={2}>
            {report.breakdown.map((d) => (
              <Flex as="li" key={d.name} justify="space-between" fontSize="sm">
                <Flex align="center" gap={2}>
                  <Box w={2.5} h={2.5} borderRadius="3px" bg={d.color} />
                  <Text color="text.secondary">{d.name}</Text>
                </Flex>
                <Text fontWeight={600} textStyle="numeric">
                  {formatCurrency(d.value)}
                </Text>
              </Flex>
            ))}
          </Stack>
        </Panel>
        <ChartPanel
          title="Six-month view"
          description={`Income and spending up to ${report.period.label.replace(' (to date)', '')}`}
          data={report.history}
          series={flowSeries}
          kind="bar"
          height={320}
          xLabel="Month"
        />
      </Grid>

      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, minmax(0, 1fr))' }} gap={{ base: 4, md: 6 }}>
        <Panel title="Top merchants" description={report.period.label}>
          {report.merchants.length ? (
            <BarList items={report.merchants.map((m) => ({ key: m.merchant, label: m.merchant, value: m.total, meta: `${m.count} payments · ${m.category}` }))} />
          ) : (
            <EmptyState icon={Store} title="No merchant detail for this month" description="This demo keeps itemised transactions for June and July only." />
          )}
        </Panel>
        <Panel title="Wallet balances" description="As of today">
          <BarList items={wallets} />
        </Panel>
      </Grid>

      <Panel title="Statements and exports" description="Previously generated reports" bodyProps={{ pt: 2 }}>
        <Stack spacing={0} divider={<Box borderBottomWidth="1px" borderColor="border.subtle" />}>
          {reports.map((r) => (
            <Flex key={r.id} align="center" gap={3} py={3} wrap={{ base: 'wrap', sm: 'nowrap' }}>
              <IconTile icon={r.format === 'PDF' ? FileText : FileSpreadsheet} tone={r.format === 'PDF' ? 'negative' : 'positive'} />
              <Box flex={1} minW="160px">
                <Text fontSize="sm" fontWeight={500}>
                  {r.title}
                </Text>
                <Text fontSize="xs" color="text.muted">
                  {r.period} · Created {formatDate(r.createdAt)}
                </Text>
              </Box>
              <Badge variant="outline" display={{ base: 'none', md: 'inline-flex' }}>
                {r.type}
              </Badge>
              <Text fontSize="xs" color="text.muted" minW="72px" textAlign="right">
                {r.format} · {r.size}
              </Text>
              <Button
                size="sm"
                variant="secondary"
                leftIcon={<Download size={14} />}
                onClick={() => toast({ status: 'info', title: `${r.title}`, description: 'Downloads are simulated in this demo.' })}
              >
                Download
              </Button>
            </Flex>
          ))}
        </Stack>
      </Panel>
    </Stack>
  );
}
