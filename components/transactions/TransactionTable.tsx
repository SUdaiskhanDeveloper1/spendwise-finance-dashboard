'use client';

import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, chakra } from '@chakra-ui/react';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';
import { Amount } from '@/components/ui/Amount';
import { IconTile } from '@/components/ui/IconTile';
import { getCategoryMeta } from '@/lib/categories';
import { formatDate } from '@/lib/format';
import { getIcon } from '@/lib/icons';
import type { Transaction } from '@/types/transaction';
import { CategoryChip } from './CategoryChip';

export type SortKey = 'date' | 'amount';
export type SortState = { key: SortKey; direction: 'asc' | 'desc' };

interface TransactionTableProps {
  items: Transaction[];
  sort: SortState;
  onSort: (key: SortKey) => void;
  onSelect: (transaction: Transaction) => void;
}

function SortHeader({ label, column, sort, onSort, isNumeric }: { label: string; column: SortKey; sort: SortState; onSort: (key: SortKey) => void; isNumeric?: boolean }) {
  const active = sort.key === column;
  const Icon = !active ? ChevronsUpDown : sort.direction === 'asc' ? ArrowUp : ArrowDown;
  return (
    <Th isNumeric={isNumeric} aria-sort={active ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}>
      <chakra.button
        type="button"
        onClick={() => onSort(column)}
        display="inline-flex"
        alignItems="center"
        gap={1}
        color={active ? 'text.primary' : 'inherit'}
        fontWeight="inherit"
        borderRadius="sm"
        _hover={{ color: 'text.primary' }}
        _focusVisible={{ boxShadow: 'outline', outline: 'none' }}
      >
        {label}
        <Icon size={12} aria-hidden />
      </chakra.button>
    </Th>
  );
}

/** Desktop table. Rows open the detail drawer on click or Enter. */
export function TransactionTable({ items, sort, onSort, onSelect }: TransactionTableProps) {
  return (
    <Box overflowX="auto">
      <Table size="md">
        <Thead>
          <Tr>
            <Th>Transaction</Th>
            <Th>Category</Th>
            <Th display={{ base: 'none', lg: 'table-cell' }}>Wallet</Th>
            <SortHeader label="Date" column="date" sort={sort} onSort={onSort} />
            <Th display={{ base: 'none', xl: 'table-cell' }}>Method</Th>
            <SortHeader label="Amount" column="amount" sort={sort} onSort={onSort} isNumeric />
          </Tr>
        </Thead>
        <Tbody>
          {items.map((t) => {
            const category = getCategoryMeta(t.category);
            return (
              <Tr
                key={t.id}
                tabIndex={0}
                cursor="pointer"
                onClick={() => onSelect(t)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelect(t);
                  }
                }}
                aria-label={`${t.title}, ${t.type} of ${t.amount}`}
                transition="background 0.12s"
                _hover={{ bg: 'bg.subtle' }}
                _focusVisible={{ outline: '2px solid', outlineColor: 'accent.default', outlineOffset: '-2px' }}
              >
                <Td>
                  <Flex align="center" gap={3} minW="200px">
                    <IconTile icon={getIcon(category.icon)} color={category.color} size="sm" />
                    <Box minW={0}>
                      <Text fontWeight={500} noOfLines={1}>
                        {t.title}
                      </Text>
                      <Text fontSize="xs" color="text.muted" noOfLines={1}>
                        {t.merchant}
                      </Text>
                    </Box>
                  </Flex>
                </Td>
                <Td>
                  <CategoryChip category={t.category} />
                </Td>
                <Td display={{ base: 'none', lg: 'table-cell' }} color="text.secondary" whiteSpace="nowrap">
                  {t.wallet}
                </Td>
                <Td color="text.secondary" whiteSpace="nowrap" textStyle="numeric">
                  {formatDate(t.date)}
                </Td>
                <Td display={{ base: 'none', xl: 'table-cell' }} color="text.secondary" whiteSpace="nowrap">
                  {t.paymentMethod}
                </Td>
                <Td isNumeric>
                  <Amount value={t.amount} type={t.type} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}
