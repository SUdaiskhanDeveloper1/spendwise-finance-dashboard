import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { DonutChart } from '@/components/charts/LazyCharts';
import { LinkButton } from '@/components/ui/LinkButton';
import { Panel } from '@/components/ui/Panel';
import { categorySpendData } from '@/data/transactions';
import { spendGroupColor } from '@/lib/categories';
import { formatCurrency, formatPercent } from '@/lib/format';
import { sumBy } from '@/lib/utils';

/** July spending by category: donut for the shape, list for the exact values. */
export function SpendingBreakdown() {
  const data = categorySpendData.map((d) => ({ ...d, color: spendGroupColor(d.name) }));
  const total = sumBy(data, (d) => d.value);
  return (
    <Panel
      title="Where your money went"
      description="July, by category"
      action={
        <LinkButton href="/expenses" variant="ghost" size="sm" arrow>
          Details
        </LinkButton>
      }
    >
      <DonutChart data={data} height={196} centerLabel="Spent in July" centerValue={formatCurrency(total, 'GBP', 0)} />
      <Stack as="ul" listStyleType="none" mt={5} spacing={2.5}>
        {data.map((d) => (
          <Flex as="li" key={d.name} align="center" justify="space-between" gap={3}>
            <Flex align="center" gap={2}>
              <Box w={2.5} h={2.5} borderRadius="3px" bg={d.color} />
              <Text fontSize="sm" color="text.secondary">
                {d.name}
              </Text>
            </Flex>
            <Flex gap={3} align="baseline">
              <Text fontSize="xs" color="text.muted" textStyle="numeric">
                {formatPercent(d.value / total)}
              </Text>
              <Text fontSize="sm" fontWeight={600} textStyle="numeric" minW="72px" textAlign="right">
                {formatCurrency(d.value)}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Stack>
    </Panel>
  );
}
