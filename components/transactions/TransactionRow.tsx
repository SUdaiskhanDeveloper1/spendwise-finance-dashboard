import { Box, Flex, Text } from '@chakra-ui/react';
import { IconTile } from '@/components/ui/IconTile';
import { Amount } from '@/components/ui/Amount';
import { getCategoryMeta } from '@/lib/categories';
import { formatRelativeDay } from '@/lib/format';
import { getIcon } from '@/lib/icons';
import type { Transaction } from '@/types/transaction';

interface TransactionRowProps {
  transaction: Transaction;
  /** What to show under the title. */
  meta?: 'date' | 'wallet';
}

/** Compact list row: category icon, title, context line and signed amount. */
export function TransactionRow({ transaction: t, meta = 'date' }: TransactionRowProps) {
  const category = getCategoryMeta(t.category);
  return (
    <Flex align="center" gap={3} py={2.5} minW={0}>
      <IconTile icon={getIcon(category.icon)} color={category.color} size="md" />
      <Box flex={1} minW={0}>
        <Text fontSize="sm" fontWeight={500} noOfLines={1}>
          {t.title}
        </Text>
        <Text fontSize="xs" color="text.muted" noOfLines={1}>
          {meta === 'date' ? `${t.category} · ${formatRelativeDay(t.date)}` : `${t.merchant} · ${t.wallet}`}
        </Text>
      </Box>
      <Amount value={t.amount} type={t.type} fontSize="sm" />
    </Flex>
  );
}
