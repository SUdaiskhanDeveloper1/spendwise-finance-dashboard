import { Box, Flex, Grid, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { CircleAlert, TriangleAlert } from 'lucide-react';
import { IconTile } from '@/components/ui/IconTile';
import { Meter } from '@/components/ui/Meter';
import { Panel } from '@/components/ui/Panel';
import { budgetOverview } from '@/lib/finance';
import { formatCurrency, formatPercent } from '@/lib/format';

export function BudgetOverview() {
  const o = budgetOverview();
  const stats = [
    { label: 'Left to spend', value: formatCurrency(o.remaining) },
    { label: 'Safe per day', value: formatCurrency(o.dailyAllowance) },
    { label: 'Days left', value: String(o.daysLeft) },
  ];
  const alerts = [
    ...o.over.map((b) => ({
      id: b.id,
      tone: 'negative' as const,
      icon: CircleAlert,
      title: `${b.category} is ${formatCurrency(b.spent - b.limit)} over`,
      body: `You have spent ${formatCurrency(b.spent)} of ${formatCurrency(b.limit, 'GBP', 0)}. Pausing non-essential purchases this week will help.`,
    })),
    ...o.warning.map((b) => ({
      id: b.id,
      tone: 'warning' as const,
      icon: TriangleAlert,
      title: `${b.category} is at ${formatPercent(b.spent / b.limit)}`,
      body: `${formatCurrency(b.limit - b.spent)} left for the last ${o.daysLeft} days of the month.`,
    })),
  ];

  return (
    <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 3fr) minmax(0, 2fr)' }} gap={{ base: 4, md: 6 }}>
      <Panel title="July at a glance" description="All monthly budgets combined">
        <Flex align="baseline" gap={2} wrap="wrap" mb={3}>
          <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight={600} letterSpacing="-0.03em">
            {formatCurrency(o.spent)}
          </Text>
          <Text color="text.muted">spent of {formatCurrency(o.limit, 'GBP', 0)} budgeted</Text>
        </Flex>
        <Meter value={o.used} tone={o.used > 0.9 ? 'warning' : 'accent'} label={`${formatPercent(o.used)} of total budget used`} />
        <Text mt={2} fontSize="sm" color="text.muted">
          {formatPercent(o.used)} used with {o.daysLeft} days to go
        </Text>
        <SimpleGrid columns={3} spacing={3} mt={5}>
          {stats.map((s) => (
            <Box key={s.label} bg="bg.subtle" borderRadius="lg" px={3} py={2.5}>
              <Text fontSize="xs" color="text.muted">
                {s.label}
              </Text>
              <Text fontWeight={600} fontSize={{ base: 'md', md: 'lg' }} letterSpacing="-0.02em">
                {s.value}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Panel>

      <Panel title="Needs attention" description={alerts.length ? `${alerts.length} budgets to keep an eye on` : 'Everything is on track'}>
        <Stack spacing={3}>
          {alerts.map((a) => (
            <Flex key={a.id} gap={3} p={3} borderRadius="lg" bg={a.tone === 'negative' ? 'negative.subtle' : 'warning.subtle'}>
              <IconTile icon={a.icon} tone={a.tone} size="sm" />
              <Box>
                <Text fontSize="sm" fontWeight={600}>
                  {a.title}
                </Text>
                <Text fontSize="sm" color="text.secondary">
                  {a.body}
                </Text>
              </Box>
            </Flex>
          ))}
        </Stack>
      </Panel>
    </Grid>
  );
}
