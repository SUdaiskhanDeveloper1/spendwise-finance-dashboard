import { Box, Flex, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { budgetMeterTone } from '@/components/budgets/budgetDisplay';
import { IconTile } from '@/components/ui/IconTile';
import { LinkButton } from '@/components/ui/LinkButton';
import { Meter } from '@/components/ui/Meter';
import { Panel } from '@/components/ui/Panel';
import { budgets } from '@/data/budgets';
import { budgetOverview, budgetTone } from '@/lib/finance';
import { formatCurrency, formatPercent } from '@/lib/format';
import { getIcon } from '@/lib/icons';
import { ratio } from '@/lib/utils';

export function BudgetSnapshot() {
  const overview = budgetOverview();
  const closest = [...budgets].sort((a, b) => ratio(b.spent, b.limit) - ratio(a.spent, a.limit)).slice(0, 4);
  return (
    <Panel
      title="Budgets"
      description={`${overview.daysLeft} days left in July`}
      action={
        <LinkButton href="/budgets" variant="ghost" size="sm" arrow>
          Manage
        </LinkButton>
      }
    >
      <SimpleGrid columns={2} spacing={3} mb={5}>
        <Box bg="bg.subtle" borderRadius="lg" p={3}>
          <Text fontSize="xs" color="text.muted">
            Left to spend
          </Text>
          <Text fontSize="lg" fontWeight={600} letterSpacing="-0.02em">
            {formatCurrency(overview.remaining)}
          </Text>
        </Box>
        <Box bg="accent.subtle" borderRadius="lg" p={3}>
          <Text fontSize="xs" color="accent.fg">
            Safe per day
          </Text>
          <Text fontSize="lg" fontWeight={600} letterSpacing="-0.02em">
            {formatCurrency(overview.dailyAllowance)}
          </Text>
        </Box>
      </SimpleGrid>
      <Stack spacing={4}>
        {closest.map((b) => {
          const tone = budgetTone(b);
          const left = b.limit - b.spent;
          return (
            <Flex key={b.id} gap={3} align="center">
              <IconTile icon={getIcon(b.icon)} tone={tone === 'over' ? 'negative' : tone === 'warning' ? 'warning' : 'neutral'} size="sm" />
              <Box flex={1} minW={0}>
                <Flex justify="space-between" mb={1.5} gap={2}>
                  <Text fontSize="sm" fontWeight={500} noOfLines={1}>
                    {b.category}
                  </Text>
                  <Text fontSize="xs" color={tone === 'over' ? 'negative.fg' : 'text.muted'} fontWeight={tone === 'over' ? 600 : 400} whiteSpace="nowrap">
                    {left < 0 ? `${formatCurrency(-left, 'GBP', 0)} over` : `${formatCurrency(left, 'GBP', 0)} left`}
                  </Text>
                </Flex>
                <Meter value={ratio(b.spent, b.limit)} tone={budgetMeterTone[tone]} size="sm" label={`${b.category}: ${formatPercent(ratio(b.spent, b.limit))} used`} />
              </Box>
            </Flex>
          );
        })}
      </Stack>
    </Panel>
  );
}
