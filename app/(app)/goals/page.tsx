import type { Metadata } from 'next';
import { Box, Grid, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { CalendarClock, PiggyBank, Target, TrendingUp } from 'lucide-react';
import { AddGoalModal } from '@/components/goals/AddGoalModal';
import { GoalCard } from '@/components/goals/GoalCard';
import { GoalMilestones } from '@/components/goals/GoalMilestones';
import { LinkButton } from '@/components/ui/LinkButton';
import { PageHeader } from '@/components/ui/PageHeader';
import { Photo } from '@/components/ui/Photo';
import { StatCard } from '@/components/ui/StatCard';
import { goals } from '@/data/goals';
import { goalsOverview, transactionsInMonth } from '@/lib/finance';
import { sumBy } from '@/lib/utils';
import { formatCurrency, formatDate, formatPercent } from '@/lib/format';

export const metadata: Metadata = { title: 'Goals' };

export default function GoalsPage() {
  const overview = goalsOverview();
  const savedThisMonth = sumBy(transactionsInMonth().filter((t) => t.category === 'Savings'), (t) => t.amount);
  return (
    <>
      <PageHeader
        title="Savings goals"
        description="Put money aside for what matters. We work out how much to save each month so every goal lands on time."
        actions={<AddGoalModal />}
      />
      <Stack spacing={{ base: 6, md: 8 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} spacing={{ base: 3, md: 4 }}>
          <StatCard label="Total saved" value={formatCurrency(overview.saved, 'GBP', 0)} icon={PiggyBank} helper={`of ${formatCurrency(overview.target, 'GBP', 0)} across ${goals.length} goals`} />
          <StatCard label="Overall progress" value={formatPercent(overview.fraction)} icon={TrendingUp} tone="positive" helper={`${formatCurrency(savedThisMonth, 'GBP', 0)} added this month`} />
          <StatCard label="Monthly target" value={formatCurrency(overview.monthlyNeeded, 'GBP', 0)} icon={Target} tone="info" helper="To meet every deadline" />
          <StatCard
            label="Next deadline"
            value={overview.next ? formatDate(overview.next.deadline, 'short') : '—'}
            icon={CalendarClock}
            tone="warning"
            helper={overview.next?.title}
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={{ base: 4, md: 5 }}>
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </SimpleGrid>

        <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 3fr) minmax(0, 2fr)' }} gap={{ base: 4, md: 6 }}>
          <GoalMilestones />
          <Box bg="bg.surface" borderWidth="1px" borderColor="border.subtle" borderRadius="xl" boxShadow="xs" overflow="hidden">
            <Photo image="financialPlanning" alt="" sizes="(min-width: 80em) 35vw, 100vw" ratio={16 / 9} borderRadius={0} />
            <Box p={{ base: 4, md: 5 }}>
              <Text fontWeight={600} fontSize="md" mb={1}>
                Planning with someone?
              </Text>
              <Text fontSize="sm" color="text.secondary" mb={3}>
                Shared goals work well for couples and households. Move a goal into a shared wallet and track progress together.
              </Text>
              <LinkButton href="/shared-wallets" variant="link" size="sm" arrow>
                Explore shared wallets
              </LinkButton>
            </Box>
          </Box>
        </Grid>
      </Stack>
    </>
  );
}
