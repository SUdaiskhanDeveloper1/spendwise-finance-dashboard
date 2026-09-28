import type { Metadata } from 'next';
import { Badge, Box, Flex, Grid, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { ArrowRight, ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import NextLink from 'next/link';
import { IconTile, type Tone } from '@/components/ui/IconTile';
import { LinkButton } from '@/components/ui/LinkButton';
import { PageHeader } from '@/components/ui/PageHeader';
import { Panel } from '@/components/ui/Panel';
import { Photo } from '@/components/ui/Photo';
import { insights } from '@/data/insights';
import { budgets as budgetList } from '@/data/budgets';
import { budgetOverview, budgetTone, goalsOverview, upcomingPayments } from '@/lib/finance';
import { formatCurrency, formatDate, formatPercent } from '@/lib/format';
import { getIcon } from '@/lib/icons';
import { sumBy } from '@/lib/utils';
import type { Insight } from '@/types/insight';

export const metadata: Metadata = { title: 'Insights' };

// For spending, "up" is a warning; for the other insight types it is neutral.
const trendStyle: Record<Insight['trend'], { icon: typeof ArrowUpRight; variant: string }> = {
  up: { icon: ArrowUpRight, variant: 'warning' },
  down: { icon: ArrowDownRight, variant: 'positive' },
  neutral: { icon: Minus, variant: 'neutral' },
};

const toneByType: Record<string, Tone> = {
  'Spending habit': 'warning',
  'Budget insight': 'positive',
  'Goal insight': 'accent',
  Reminder: 'info',
};

export default function InsightsPage() {
  const budgets = budgetOverview();
  const goals = goalsOverview();
  const bills = upcomingPayments(undefined, 7);
  const over = budgets.over[0];
  const roomiest = budgetList
    .filter((b) => budgetTone(b) === 'healthy')
    .sort((a, b) => b.limit - b.spent - (a.limit - a.spent))[0];
  const actions = [
    {
      title: over ? `Rein in ${over.category}` : 'Keep budgets on track',
      body: over
        ? `${formatCurrency(over.spent - over.limit)} over this month. ${roomiest ? `${roomiest.category} still has ${formatCurrency(roomiest.limit - roomiest.spent, 'GBP', 0)} spare you could move across.` : ''}`
        : 'Every budget is within its limit this month.',
      href: '/budgets',
      cta: 'Adjust budgets',
    },
    {
      title: `Set aside ${formatCurrency(sumBy(bills, (p) => p.amount), 'GBP', 0)} for bills`,
      body: `${bills.length} payments leave your account in the next seven days, starting with ${bills[0]?.title}.`,
      href: '/scheduled-payments',
      cta: 'Review bills',
    },
    {
      title: `Save ${formatCurrency(goals.monthlyNeeded, 'GBP', 0)} a month for your goals`,
      body: `You are ${formatPercent(goals.fraction)} of the way to all your goals. ${goals.next ? `${goals.next.title} is next, due ${formatDate(goals.next.deadline)}.` : ''}`,
      href: '/goals',
      cta: 'Open goals',
    },
  ];

  return (
    <>
      <PageHeader title="Insights" description="Plain-English observations about your money, refreshed as you spend." />
      <Stack spacing={{ base: 6, md: 8 }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 5 }}>
          {insights.map((insight) => {
            const trend = trendStyle[insight.trend];
            const TrendIcon = trend.icon;
            return (
              <Flex key={insight.id} gap={4} bg="bg.surface" borderWidth="1px" borderColor="border.subtle" borderRadius="xl" boxShadow="xs" p={{ base: 4, md: 5 }}>
                <IconTile icon={getIcon(insight.icon)} tone={toneByType[insight.type] ?? 'accent'} size="lg" />
                <Box flex={1} minW={0}>
                  <Flex justify="space-between" align="flex-start" gap={3} mb={1}>
                    <Text fontSize="xs" fontWeight={600} color="text.muted">
                      {insight.type}
                    </Text>
                    <Badge variant={trend.variant} display="inline-flex" alignItems="center" gap={1}>
                      <TrendIcon size={12} aria-hidden />
                      {insight.value}
                    </Badge>
                  </Flex>
                  <Text fontWeight={600} fontSize="md" mb={1}>
                    {insight.title}
                  </Text>
                  <Text fontSize="sm" color="text.secondary">
                    {insight.description}
                  </Text>
                </Box>
              </Flex>
            );
          })}
        </SimpleGrid>

        <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 3fr) minmax(0, 2fr)' }} gap={{ base: 4, md: 6 }}>
          <Panel title="Suggested next steps" description="Small actions with the biggest effect this month" bodyProps={{ pt: 2 }}>
            <Stack spacing={0} divider={<Box borderBottomWidth="1px" borderColor="border.subtle" />}>
              {actions.map((action, index) => (
                <Flex key={action.href} gap={4} py={4} align="flex-start">
                  <Flex w={7} h={7} flexShrink={0} align="center" justify="center" borderRadius="full" bg="accent.subtle" color="accent.fg" fontWeight={700} fontSize="sm">
                    {index + 1}
                  </Flex>
                  <Box flex={1}>
                    <Text fontWeight={600} fontSize="sm">
                      {action.title}
                    </Text>
                    <Text fontSize="sm" color="text.secondary" mb={2}>
                      {action.body}
                    </Text>
                    <Flex as={NextLink} href={action.href} align="center" gap={1} fontSize="sm" fontWeight={600} color="accent.fg" _hover={{ textDecoration: 'underline' }} w="fit-content">
                      {action.cta}
                      <ArrowRight size={14} aria-hidden />
                    </Flex>
                  </Box>
                </Flex>
              ))}
            </Stack>
          </Panel>
          <Box bg="bg.surface" borderWidth="1px" borderColor="border.subtle" borderRadius="xl" boxShadow="xs" overflow="hidden">
            <Photo image="financialGrowth" alt="" sizes="(min-width: 80em) 35vw, 100vw" ratio={16 / 9} borderRadius={0} />
            <Box p={{ base: 4, md: 5 }}>
              <Text fontWeight={600} fontSize="md" mb={1}>
                Want the full picture?
              </Text>
              <Text fontSize="sm" color="text.secondary" mb={3}>
                Analytics shows six months of income, spending and savings rate side by side.
              </Text>
              <LinkButton href="/analytics" variant="link" size="sm" arrow>
                Open analytics
              </LinkButton>
            </Box>
          </Box>
        </Grid>
      </Stack>
    </>
  );
}
