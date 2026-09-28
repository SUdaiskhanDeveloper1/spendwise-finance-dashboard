import type { Metadata } from 'next';
import { Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { AddBudgetModal } from '@/components/budgets/AddBudgetModal';
import { BudgetCard } from '@/components/budgets/BudgetCard';
import { BudgetOverview } from '@/components/budgets/BudgetOverview';
import { ChartPanel } from '@/components/charts/ChartPanel';
import { PageHeader } from '@/components/ui/PageHeader';
import { budgets } from '@/data/budgets';
import { CHART_MUTED } from '@/lib/categories';
import { daysLeftInMonth } from '@/lib/finance';

export const metadata: Metadata = { title: 'Budgets' };

const comparisonSeries = [
  { key: 'limit', label: 'Budget', color: CHART_MUTED },
  { key: 'spent', label: 'Spent', color: 'var(--chakra-colors-accent-default)' },
];

export default function BudgetsPage() {
  const comparison = budgets.map((b) => ({ name: b.category.replace(' and ', ' & '), limit: b.limit, spent: b.spent }));
  return (
    <>
      <PageHeader
        title="Budgets"
        description={`Monthly limits for the things you spend on most. July cycle · ${daysLeftInMonth()} days left.`}
        actions={<AddBudgetModal />}
      />
      <Stack spacing={{ base: 6, md: 8 }}>
        <BudgetOverview />

        <Stack spacing={4}>
          <Flex justify="space-between" align="baseline">
            <Heading as="h2" size="md">
              Categories
            </Heading>
            <Text fontSize="sm" color="text.muted">
              {budgets.length} active budgets
            </Text>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 4, md: 5 }}>
            {budgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </SimpleGrid>
        </Stack>

        <ChartPanel
          title="Budget vs spending"
          description="Where each category stands against its limit this month"
          data={comparison}
          series={comparisonSeries}
          kind="bar"
          height={300}
          xLabel="Category"
        />
      </Stack>
    </>
  );
}
