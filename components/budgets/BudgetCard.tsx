import { Box, Flex, Text } from '@chakra-ui/react';
import { IconTile } from '@/components/ui/IconTile';
import { Meter } from '@/components/ui/Meter';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { budgetTone, daysLeftInMonth } from '@/lib/finance';
import { formatCurrency, formatPercent } from '@/lib/format';
import { getIcon } from '@/lib/icons';
import { ratio } from '@/lib/utils';
import type { Budget } from '@/types/budget';
import { budgetMeterTone, budgetStatus } from './budgetDisplay';

export function BudgetCard({ budget }: { budget: Budget }) {
  const tone = budgetTone(budget);
  const used = ratio(budget.spent, budget.limit);
  const left = budget.limit - budget.spent;
  const days = daysLeftInMonth();
  const guidance =
    left < 0
      ? 'Over the limit — consider pausing non-essentials until August.'
      : left === 0
        ? 'Fully used for this month, as planned.'
        : `About ${formatCurrency(left / days)} a day for the next ${days} days.`;

  return (
    <Box bg="bg.surface" borderWidth="1px" borderColor="border.subtle" borderRadius="xl" boxShadow="xs" p={{ base: 4, md: 5 }}>
      <Flex align="center" gap={3} mb={4}>
        <IconTile icon={getIcon(budget.icon)} tone={tone === 'over' ? 'negative' : tone === 'warning' ? 'warning' : 'accent'} />
        <Box flex={1} minW={0}>
          <Text fontWeight={600} noOfLines={1}>
            {budget.category}
          </Text>
          <Text fontSize="xs" color="text.muted">
            {budget.period} budget
          </Text>
        </Box>
        <StatusBadge status={budgetStatus[tone]} />
      </Flex>

      <Flex align="baseline" gap={2} mb={3}>
        <Text fontSize="2xl" fontWeight={600} letterSpacing="-0.025em" color={left < 0 ? 'negative.fg' : 'text.primary'}>
          {formatCurrency(Math.abs(left))}
        </Text>
        <Text color="text.muted" fontSize="sm">
          {left < 0 ? 'over budget' : 'left'}
        </Text>
      </Flex>

      <Meter value={used} tone={budgetMeterTone[tone]} label={`${budget.category}: ${formatPercent(used)} of budget used`} />

      <Flex justify="space-between" mt={2} fontSize="sm">
        <Text color="text.secondary" textStyle="numeric">
          {formatCurrency(budget.spent)} of {formatCurrency(budget.limit, 'GBP', 0)}
        </Text>
        <Text fontWeight={600} textStyle="numeric">
          {formatPercent(used)}
        </Text>
      </Flex>

      <Text mt={4} pt={3} borderTopWidth="1px" borderColor="border.subtle" fontSize="xs" color="text.muted">
        {guidance}
      </Text>
    </Box>
  );
}
