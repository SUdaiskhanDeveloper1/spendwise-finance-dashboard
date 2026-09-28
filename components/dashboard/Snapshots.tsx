import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { PaymentList } from '@/components/scheduled-payments/PaymentList';
import { TransactionRow } from '@/components/transactions/TransactionRow';
import { IconTile } from '@/components/ui/IconTile';
import { LinkButton } from '@/components/ui/LinkButton';
import { Meter } from '@/components/ui/Meter';
import { Panel } from '@/components/ui/Panel';
import { Photo } from '@/components/ui/Photo';
import { AllocationBar } from '@/components/wallets/AllocationBar';
import { accounts } from '@/data/accounts';
import { goals } from '@/data/goals';
import { insights } from '@/data/insights';
import { chartColor } from '@/lib/categories';
import { goalProgress, sortedTransactions, totalBalance, upcomingPayments } from '@/lib/finance';
import { formatCurrency, formatPercent } from '@/lib/format';
import { getIcon } from '@/lib/icons';
import { sumBy } from '@/lib/utils';

export function UpcomingBills() {
  const items = upcomingPayments().slice(0, 4);
  const thisWeek = upcomingPayments(undefined, 7);
  return (
    <Panel
      title="Upcoming bills"
      description={`${formatCurrency(sumBy(thisWeek, (p) => p.amount))} due this week`}
      action={
        <LinkButton href="/scheduled-payments" variant="ghost" size="sm" arrow>
          All bills
        </LinkButton>
      }
      bodyProps={{ pt: 1 }}
    >
      <PaymentList items={items} />
    </Panel>
  );
}

export function GoalsSnapshot() {
  return (
    <Panel
      title="Savings goals"
      description="Progress towards what matters"
      action={
        <LinkButton href="/goals" variant="ghost" size="sm" arrow>
          Goals
        </LinkButton>
      }
    >
      <Stack spacing={5}>
        {goals.slice(0, 3).map((goal) => {
          const progress = goalProgress(goal);
          return (
            <Box key={goal.id}>
              <Flex align="center" gap={3} mb={2.5}>
                <IconTile icon={getIcon(goal.icon)} tone="accent" size="sm" />
                <Text fontSize="sm" fontWeight={500} flex={1} noOfLines={1}>
                  {goal.title}
                </Text>
                <Text fontSize="sm" fontWeight={600} textStyle="numeric">
                  {formatPercent(progress.fraction)}
                </Text>
              </Flex>
              <Meter value={progress.fraction} size="sm" label={`${goal.title}: ${formatPercent(progress.fraction)} saved`} />
              <Text mt={1.5} fontSize="xs" color="text.muted">
                {formatCurrency(goal.savedAmount, 'GBP', 0)} of {formatCurrency(goal.targetAmount, 'GBP', 0)}
              </Text>
            </Box>
          );
        })}
      </Stack>
    </Panel>
  );
}

export function RecentActivity() {
  const recent = sortedTransactions().slice(0, 8);
  return (
    <Panel
      title="Recent activity"
      description="Latest payments across all wallets"
      action={
        <LinkButton href="/transactions" variant="ghost" size="sm" arrow>
          View all
        </LinkButton>
      }
      bodyProps={{ pt: 2 }}
    >
      <Stack spacing={0} divider={<Box borderBottomWidth="1px" borderColor="border.subtle" />}>
        {recent.map((t) => (
          <TransactionRow key={t.id} transaction={t} />
        ))}
      </Stack>
    </Panel>
  );
}

export function AccountsSnapshot() {
  const items = accounts.map((a, i) => ({ key: a.id, label: a.name, value: a.balance, color: chartColor(i + 1), currency: a.currency }));
  return (
    <Panel
      title="Wallets"
      description={`${formatCurrency(totalBalance())} across ${accounts.length} wallets`}
      action={
        <LinkButton href="/wallets" variant="ghost" size="sm" arrow>
          Wallets
        </LinkButton>
      }
    >
      <AllocationBar items={items} />
    </Panel>
  );
}

/** A human moment on the dashboard: one insight with a lifestyle photo (below the fold, lazy-loaded). */
export function InsightCallout() {
  const insight = insights.find((i) => i.id === 'i-3') ?? insights[0];
  return (
    <Box
      as="section"
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="xl"
      boxShadow="xs"
      overflow="hidden"
      display="flex"
      flexDirection={{ base: 'column', sm: 'row', xl: 'column' }}
    >
      <Photo image="smartSaving" alt="" sizes="(min-width: 80em) 24vw, (min-width: 30em) 40vw, 100vw" ratio={16 / 9} borderRadius={0} flexBasis={{ sm: '42%', xl: 'auto' }} flexShrink={0} />
      <Box p={{ base: 4, md: 5 }}>
        <Text fontSize="xs" fontWeight={600} color="accent.fg" mb={1}>
          {insight.type}
        </Text>
        <Text fontWeight={600} fontSize="md" mb={1}>
          {insight.title}
        </Text>
        <Text fontSize="sm" color="text.secondary" mb={3}>
          {insight.description}
        </Text>
        <LinkButton href="/insights" variant="link" size="sm" arrow>
          See all insights
        </LinkButton>
      </Box>
    </Box>
  );
}
