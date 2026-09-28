import type { Metadata } from 'next';
import { Grid, SimpleGrid, Stack } from '@chakra-ui/react';
import { CalendarDays, ReceiptText, ShoppingBag, Store } from 'lucide-react';
import { BarList } from '@/components/charts/BarList';
import { ChartPanel } from '@/components/charts/ChartPanel';
import { TransactionsView } from '@/components/transactions/TransactionsView';
import { PageHeader } from '@/components/ui/PageHeader';
import { Panel } from '@/components/ui/Panel';
import { StatCard } from '@/components/ui/StatCard';
import { categorySpendData, cashFlowData, transactions } from '@/data/transactions';
import { chartColor, spendGroupColor } from '@/lib/categories';
import { TODAY } from '@/lib/constants';
import { currentPeriod, dailySpending, spendingByWeekday, topMerchants, transactionsInMonth } from '@/lib/finance';
import { formatCurrency, formatPercent, parseDate } from '@/lib/format';
import { change } from '@/lib/utils';

export const metadata: Metadata = { title: 'Expenses' };

// Rent and bills are fixed costs; leaving them out shows day-to-day habits.
const FIXED = ['Rent', 'Utilities'];

export default function ExpensesPage() {
  const period = currentPeriod();
  const july = transactionsInMonth();
  const dayOfMonth = parseDate(TODAY).getUTCDate();
  const biggest = [...categorySpendData].sort((a, b) => b.value - a.value)[0];
  const merchants = topMerchants(july.filter((t) => !FIXED.includes(t.category)), 5);
  const everyday = dailySpending(undefined, FIXED);
  const weekday = spendingByWeekday(july.filter((t) => !FIXED.includes(t.category)));

  return (
    <>
      <PageHeader title="Expenses" description="What you spend, where it goes and how July compares with June." />
      <Stack spacing={{ base: 6, md: 8 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} spacing={{ base: 3, md: 4 }}>
          <StatCard
            label="Spent this month"
            value={formatCurrency(period.expenses)}
            icon={ReceiptText}
            tone="warning"
            delta={change(period.expenses, period.previous.expenses)}
            deltaLabel={`vs ${period.previous.label}`}
            positiveIsGood={false}
            trend={cashFlowData.map((m) => m.expenses)}
          />
          <StatCard label="Daily average" value={formatCurrency(period.expenses / dayOfMonth)} icon={CalendarDays} helper={`Over ${dayOfMonth} days in July`} />
          <StatCard label="Biggest category" value={biggest.name} icon={ShoppingBag} tone="info" helper={`${formatCurrency(biggest.value, 'GBP', 0)} · ${formatPercent(biggest.value / period.expenses)} of spending`} />
          <StatCard label="Top everyday merchant" value={merchants[0].merchant} icon={Store} tone="neutral" helper={`${formatCurrency(merchants[0].total)} across ${merchants[0].count} visits`} />
        </SimpleGrid>

        <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 2fr) minmax(0, 1fr)' }} gap={{ base: 4, md: 6 }}>
          <ChartPanel
            title="Everyday spending"
            description="Each day in July, excluding rent and bills"
            data={everyday}
            series={[{ key: 'value', label: 'Spent', color: chartColor(2) }]}
            kind="bar"
            height={280}
            axisFormat="compactCurrency"
            xLabel="Day"
          />
          <Panel title="By category" description="July to date">
            <BarList
              showShare
              items={categorySpendData.map((c) => ({ key: c.name, label: c.name, value: c.value, color: spendGroupColor(c.name) }))}
            />
          </Panel>
        </Grid>

        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, minmax(0, 1fr))' }} gap={{ base: 4, md: 6 }}>
          <Panel title="Where you spend most" description="Top merchants this month, excluding fixed costs">
            <BarList
              items={merchants.map((m) => ({
                key: m.merchant,
                label: m.merchant,
                value: m.total,
                meta: `${m.count} ${m.count === 1 ? 'payment' : 'payments'} · ${m.category}`,
              }))}
            />
          </Panel>
          <ChartPanel
            title="Spending by weekday"
            description="Everyday spending in July, grouped by day of the week"
            data={weekday}
            series={[{ key: 'value', label: 'Spent', color: chartColor(3) }]}
            kind="bar"
            height={260}
            xLabel="Weekday"
          />
        </Grid>

        <TransactionsView initialItems={transactions.filter((t) => t.type === 'Expense')} lockedType="Expense" />
      </Stack>
    </>
  );
}

