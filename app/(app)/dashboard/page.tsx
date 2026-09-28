import type { Metadata } from 'next';
import { Grid, SimpleGrid, Stack } from '@chakra-ui/react';
import { ArrowDownRight, ArrowUpRight, PiggyBank, WalletCards } from 'lucide-react';
import { ChartPanel } from '@/components/charts/ChartPanel';
import { BudgetSnapshot } from '@/components/dashboard/BudgetSnapshot';
import { SpendingBreakdown } from '@/components/dashboard/SpendingBreakdown';
import { AccountsSnapshot, GoalsSnapshot, InsightCallout, RecentActivity, UpcomingBills } from '@/components/dashboard/Snapshots';
import { LinkButton } from '@/components/ui/LinkButton';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { periodSummary } from '@/data/analytics';
import { cashFlowData } from '@/data/transactions';
import { currentUser } from '@/data/user';
import { chartColor } from '@/lib/categories';
import { TODAY } from '@/lib/constants';
import { budgetOverview, currentPeriod, totalBalance } from '@/lib/finance';
import { formatCurrency, formatDate, formatPercent } from '@/lib/format';
import { change } from '@/lib/utils';

export const metadata: Metadata = { title: 'Dashboard' };

const cashFlowSeries = [
  { key: 'income', label: 'Income', color: chartColor(1) },
  { key: 'expenses', label: 'Spending', color: chartColor(2) },
];

export default function DashboardPage() {
  const period = currentPeriod();
  const balance = totalBalance();
  const budgets = budgetOverview();
  const vs = `vs ${period.previous.label}`;

  return (
    <>
      <PageHeader
        eyebrow={formatDate(TODAY, 'weekdayLong')}
        title={`Welcome back, ${currentUser.firstName}`}
        description={`You can spend ${formatCurrency(budgets.dailyAllowance)} a day for the rest of July and still stay within every budget.`}
        actions={
          <LinkButton href="/reports" variant="secondary">
            View July report
          </LinkButton>
        }
      />

      <Stack spacing={{ base: 4, md: 6 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} spacing={{ base: 3, md: 4 }}>
          <StatCard
            label="Total balance"
            value={formatCurrency(balance)}
            icon={WalletCards}
            delta={change(balance, period.previous.balance)}
            deltaLabel={vs}
            trend={periodSummary.balanceHistory}
          />
          <StatCard
            label="Income this month"
            value={formatCurrency(period.income)}
            icon={ArrowDownRight}
            tone="positive"
            delta={change(period.income, period.previous.income)}
            deltaLabel={vs}
            trend={cashFlowData.map((m) => m.income)}
          />
          <StatCard
            label="Spending this month"
            value={formatCurrency(period.expenses)}
            icon={ArrowUpRight}
            tone="warning"
            delta={change(period.expenses, period.previous.expenses)}
            deltaLabel={vs}
            positiveIsGood={false}
            trend={cashFlowData.map((m) => m.expenses)}
          />
          <StatCard
            label="Saved this month"
            value={formatCurrency(period.net)}
            icon={PiggyBank}
            tone="info"
            helper={`${formatPercent(period.savingsRate)} of income`}
            delta={change(period.net, period.previous.net)}
            deltaLabel={vs}
            trend={cashFlowData.map((m) => m.income - m.expenses)}
          />
        </SimpleGrid>

        <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 2fr) minmax(0, 1fr)' }} gap={{ base: 4, md: 6 }}>
          <ChartPanel
            title="Cash flow"
            description="Income and spending, January to July (July to date)"
            data={cashFlowData}
            series={cashFlowSeries}
            kind="area"
            height={340}
            xLabel="Month"
          />
          <SpendingBreakdown />
        </Grid>

        <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacing={{ base: 4, md: 6 }}>
          <BudgetSnapshot />
          <UpcomingBills />
          <GoalsSnapshot />
        </SimpleGrid>

        <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 2fr) minmax(0, 1fr)' }} gap={{ base: 4, md: 6 }}>
          <RecentActivity />
          <Stack spacing={{ base: 4, md: 6 }}>
            <AccountsSnapshot />
            <InsightCallout />
          </Stack>
        </Grid>
      </Stack>
    </>
  );
}
