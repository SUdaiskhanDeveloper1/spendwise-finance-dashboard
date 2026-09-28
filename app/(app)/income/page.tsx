import type { Metadata } from 'next';
import { Box, Flex, Grid, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Banknote, CalendarClock, ChartLine, HandCoins } from 'lucide-react';
import { ChartPanel } from '@/components/charts/ChartPanel';
import { TransactionsView } from '@/components/transactions/TransactionsView';
import { IconTile } from '@/components/ui/IconTile';
import { PageHeader } from '@/components/ui/PageHeader';
import { Panel } from '@/components/ui/Panel';
import { StatCard } from '@/components/ui/StatCard';
import { incomeBySource, incomeSources } from '@/data/income';
import { cashFlowData, transactions } from '@/data/transactions';
import { incomeSeries } from '@/lib/categories';
import { currentPeriod } from '@/lib/finance';
import { formatCurrency, formatDate, formatPercent, formatRelativeDay } from '@/lib/format';
import { getIcon } from '@/lib/icons';
import { change, sumBy } from '@/lib/utils';

export const metadata: Metadata = { title: 'Income' };

export default function IncomePage() {
  const period = currentPeriod();
  const fullMonths = cashFlowData.slice(0, -1);
  const average = sumBy(fullMonths, (m) => m.income) / fullMonths.length;
  const july = incomeBySource[incomeBySource.length - 1];
  const sideShare = (july.freelance + july.investments) / period.income;
  const nextPayment = [...incomeSources].sort((a, b) => a.nextPayment.localeCompare(b.nextPayment))[0];
  const colorOf = Object.fromEntries(incomeSeries.map((s) => [s.label, s.color]));

  return (
    <>
      <PageHeader title="Income" description="Where your money comes from, how steady it is and when the next payment lands." />
      <Stack spacing={{ base: 6, md: 8 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} spacing={{ base: 3, md: 4 }}>
          <StatCard
            label="Income this month"
            value={formatCurrency(period.income)}
            icon={HandCoins}
            tone="positive"
            delta={change(period.income, period.previous.income)}
            deltaLabel={`vs ${period.previous.label}`}
            trend={cashFlowData.map((m) => m.income)}
          />
          <StatCard label="Monthly average" value={formatCurrency(average, 'GBP', 0)} icon={ChartLine} helper="January to June" />
          <StatCard label="Side income" value={formatPercent(sideShare)} icon={Banknote} tone="info" helper="Freelance and dividends this month" />
          <StatCard
            label="Next payment"
            value={formatCurrency(nextPayment.averageMonthly, 'GBP', 0)}
            icon={CalendarClock}
            tone="warning"
            helper={`${nextPayment.name} · ${formatDate(nextPayment.nextPayment, 'short')}`}
          />
        </SimpleGrid>

        <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 2fr) minmax(0, 1fr)' }} gap={{ base: 4, md: 6 }}>
          <ChartPanel
            title="Income by source"
            description="Salary, freelance work and investments each month (July to date)"
            data={incomeBySource}
            series={[...incomeSeries]}
            kind="bar"
            stacked
            height={300}
            xLabel="Month"
          />
          <Panel title="Income sources" description="Expected amounts and timing" bodyProps={{ pt: 2 }}>
            <Stack spacing={0} divider={<Box borderBottomWidth="1px" borderColor="border.subtle" />}>
              {incomeSources.map((source) => (
                <Flex key={source.id} align="center" gap={3} py={3}>
                  <IconTile icon={getIcon(source.icon)} color={colorOf[source.category]} />
                  <Box flex={1} minW={0}>
                    <Text fontSize="sm" fontWeight={500}>
                      {source.name}
                    </Text>
                    <Text fontSize="xs" color="text.muted" noOfLines={1}>
                      {source.payer} · {source.frequency}
                    </Text>
                  </Box>
                  <Box textAlign="right">
                    <Text fontSize="sm" fontWeight={600} textStyle="numeric">
                      ~{formatCurrency(source.averageMonthly, 'GBP', 0)}/mo
                    </Text>
                    <Text fontSize="xs" color="text.muted">
                      Next {formatRelativeDay(source.nextPayment)}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Stack>
          </Panel>
        </Grid>

        <TransactionsView initialItems={transactions.filter((t) => t.type === 'Income')} lockedType="Income" pageSize={8} />
      </Stack>
    </>
  );
}
