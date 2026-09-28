import type { Metadata } from 'next';
import { Badge, Box, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { AddCategoryModal } from '@/components/categories/AddCategoryModal';
import { IconTile } from '@/components/ui/IconTile';
import { Meter } from '@/components/ui/Meter';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge, type Status } from '@/components/ui/StatusBadge';
import { categories } from '@/data/categories';
import { getCategoryMeta } from '@/lib/categories';
import { formatCurrency, formatPercent } from '@/lib/format';
import { getIcon } from '@/lib/icons';
import { sumBy } from '@/lib/utils';
import type { Category } from '@/types/category';

export const metadata: Metadata = { title: 'Categories' };

const statusBadge: Record<string, Status | undefined> = { Healthy: 'healthy', Warning: 'warning', 'Over Budget': 'over' };

function CategoryCard({ category, total }: { category: Category; total: number }) {
  const meta = getCategoryMeta(category.name);
  const share = total ? category.monthlyTotal / total : 0;
  const status = statusBadge[category.budgetStatus];
  return (
    <Box bg="bg.surface" borderWidth="1px" borderColor="border.subtle" borderRadius="xl" boxShadow="xs" p={{ base: 4, md: 5 }}>
      <Flex align="center" gap={3} mb={4}>
        <IconTile icon={getIcon(category.icon)} color={meta.color} />
        <Box flex={1} minW={0}>
          <Text fontWeight={600} noOfLines={1}>
            {category.name}
          </Text>
          <Text fontSize="xs" color="text.muted">
            {category.type}
          </Text>
        </Box>
        {status ? <StatusBadge status={status} /> : <Badge variant="outline">{category.budgetStatus}</Badge>}
      </Flex>
      <Text fontSize="xl" fontWeight={600} letterSpacing="-0.02em">
        {formatCurrency(category.monthlyTotal)}
      </Text>
      <Text fontSize="xs" color="text.muted" mb={3}>
        {formatPercent(share)} of {category.type === 'Income' ? 'income' : 'spending'} this month
      </Text>
      <Meter value={share} size="sm" tone={category.type === 'Income' ? 'accent' : 'info'} label={`${category.name}: ${formatPercent(share)} share`} />
    </Box>
  );
}

export default function CategoriesPage() {
  const groups = (['Expense', 'Income'] as const).map((type) => {
    const items = categories.filter((c) => c.type === type).sort((a, b) => b.monthlyTotal - a.monthlyTotal);
    return { type, items, total: sumBy(items, (c) => c.monthlyTotal) };
  });

  return (
    <>
      <PageHeader
        title="Categories"
        description="How your spending and income are organised. Totals are for July to date."
        actions={<AddCategoryModal />}
      />
      <Stack spacing={{ base: 8, md: 10 }}>
        {groups.map((group) => (
          <Box as="section" key={group.type}>
            <Flex justify="space-between" align="baseline" mb={4}>
              <Heading as="h2" size="md">
                {group.type === 'Expense' ? 'Spending categories' : 'Income categories'}
              </Heading>
              <Text fontSize="sm" color="text.muted">
                {formatCurrency(group.total)} this month
              </Text>
            </Flex>
            <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} spacing={{ base: 3, md: 4 }}>
              {group.items.map((category) => (
                <CategoryCard key={category.id} category={category} total={group.total} />
              ))}
            </SimpleGrid>
          </Box>
        ))}
      </Stack>
    </>
  );
}
