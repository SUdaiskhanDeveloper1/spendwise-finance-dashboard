'use client';

import { Box, Button, Divider, Flex, Stack, Text, chakra, useToast } from '@chakra-ui/react';
import { Plus, SearchX } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { EmptyState } from '@/components/ui/EmptyState';
import { Pagination } from '@/components/ui/Pagination';
import { formatCurrency, formatDate, formatDayHeading, formatSignedCurrency } from '@/lib/format';
import { byNewest, SEARCH_EVENT, totals } from '@/lib/transactions';
import { filterTransactions } from '@/lib/filters';
import { groupBy } from '@/lib/utils';
import type { Transaction, TransactionType } from '@/types/transaction';
import { AddTransactionModal } from './AddTransactionModal';
import { CSVActions } from './CSVActions';
import { TransactionDetailDrawer } from './TransactionDetailDrawer';
import { EMPTY_FILTERS, TransactionFilters, type TransactionFilterState } from './TransactionFilters';
import { TransactionRow } from './TransactionRow';
import { TransactionTable, type SortKey, type SortState } from './TransactionTable';

interface TransactionsViewProps {
  initialItems: Transaction[];
  /** Restrict the view to one transaction type (used by Income and Expenses). */
  lockedType?: TransactionType;
  pageSize?: number;
  /** Read `?q=` from the URL on first load. */
  syncWithSearch?: boolean;
}

export function TransactionsView({ initialItems, lockedType, pageSize = 10, syncWithSearch = false }: TransactionsViewProps) {
  const toast = useToast();
  const [items, setItems] = useState(initialItems);
  const [filters, setFilters] = useState<TransactionFilterState>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortState>({ key: 'date', direction: 'desc' });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Transaction | null>(null);

  const updateFilters = useCallback((patch: Partial<TransactionFilterState>) => {
    setFilters((current) => ({ ...current, ...patch }));
    setPage(1);
  }, []);

  useEffect(() => {
    if (!syncWithSearch) return;
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) updateFilters({ query: q });
    const onSearch = (event: Event) => updateFilters({ query: (event as CustomEvent<string>).detail });
    window.addEventListener(SEARCH_EVENT, onSearch);
    return () => window.removeEventListener(SEARCH_EVENT, onSearch);
  }, [syncWithSearch, updateFilters]);

  const options = useMemo(() => {
    const unique = (values: string[]) => Array.from(new Set(values)).sort();
    const months = unique(items.map((t) => t.date.slice(0, 7))).reverse();
    return {
      categories: unique(items.map((t) => t.category)),
      wallets: unique(items.map((t) => t.wallet)),
      months: months.map((m) => ({ value: m, label: formatDate(`${m}-01`, 'monthYear') })),
    };
  }, [items]);

  const filtered = useMemo(() => {
    const list = filterTransactions(items, filters.query, filters.category, filters.wallet, lockedType ?? filters.type, filters.month);
    const sorted = [...list].sort(byNewest);
    if (sort.key === 'amount') sorted.sort((a, b) => a.amount - b.amount);
    if (sort.direction === 'asc') sorted.reverse();
    return sorted;
  }, [items, filters, lockedType, sort]);

  const summary = useMemo(() => totals(filtered), [filtered]);
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);
  const groups = useMemo(() => Object.entries(groupBy(pageItems, (t) => t.date)), [pageItems]);

  const onSort = (key: SortKey) => {
    setSort((current) => ({ key, direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc' }));
    setPage(1);
  };

  const onAdd = (transaction: Transaction) => {
    setItems((current) => [transaction, ...current]);
    setPage(1);
  };

  const onDelete = (transaction: Transaction) => {
    setItems((current) => current.filter((t) => t.id !== transaction.id));
    setSelected(null);
    toast({ status: 'success', title: 'Transaction deleted', description: transaction.title });
  };

  const clear = () => updateFilters(EMPTY_FILTERS);
  const hasResults = filtered.length > 0;

  return (
    <Box bg="bg.surface" borderWidth="1px" borderColor="border.subtle" borderRadius="xl" boxShadow="xs" minW={0}>
      {/* Row 1: filters. Row 2: live summary of the filtered rows, with the actions that apply to them. */}
      <Box px={{ base: 4, md: 5 }} pt={{ base: 4, md: 5 }} pb={3}>
        <TransactionFilters
          value={filters}
          onChange={updateFilters}
          onClear={clear}
          categories={options.categories}
          wallets={options.wallets}
          months={options.months}
          hideType={Boolean(lockedType)}
        />
      </Box>
      <Flex px={{ base: 4, md: 5 }} pb={4} gap={3} align={{ base: 'stretch', sm: 'center' }} justify="space-between" direction={{ base: 'column', sm: 'row' }}>
        <Flex gap={{ base: 4, md: 6 }} wrap="wrap" fontSize="sm" aria-live="polite">
          <Text color="text.muted">
            <Text as="span" fontWeight={600} color="text.primary">
              {summary.count}
            </Text>{' '}
            {summary.count === 1 ? 'transaction' : 'transactions'}
          </Text>
          {lockedType !== 'Expense' && (
            <Text color="text.muted">
              In{' '}
              <Text as="span" fontWeight={600} color="positive.fg">
                {formatSignedCurrency(summary.income)}
              </Text>
            </Text>
          )}
          {lockedType !== 'Income' && (
            <Text color="text.muted">
              Out{' '}
              <Text as="span" fontWeight={600} color="text.primary">
                {formatCurrency(summary.expenses)}
              </Text>
            </Text>
          )}
          {!lockedType && (
            <Text color="text.muted">
              Net{' '}
              <Text as="span" fontWeight={600} color={summary.net >= 0 ? 'positive.fg' : 'negative.fg'}>
                {formatSignedCurrency(summary.net)}
              </Text>
            </Text>
          )}
        </Flex>
        <Flex gap={2} flexShrink={0}>
          <CSVActions items={filtered} />
          <AddTransactionModal
            onAdd={onAdd}
            trigger={
              <Button leftIcon={<Plus size={16} />} flex={{ base: 1, sm: 'initial' }}>
                Add
              </Button>
            }
          />
        </Flex>
      </Flex>
      <Divider />

      {hasResults ? (
        <>
          <Box display={{ base: 'none', md: 'block' }}>
            <TransactionTable items={pageItems} sort={sort} onSort={onSort} onSelect={setSelected} />
          </Box>
          <Stack display={{ base: 'flex', md: 'none' }} spacing={0} px={4} py={2}>
            {groups.map(([date, list]) => (
              <Box key={date} py={2}>
                <Text fontSize="xs" fontWeight={600} color="text.muted" mb={1}>
                  {formatDayHeading(date)}
                </Text>
                {list.map((t) => (
                  <chakra.button
                    key={t.id}
                    type="button"
                    onClick={() => setSelected(t)}
                    display="block"
                    w="full"
                    textAlign="left"
                    borderRadius="lg"
                    _focusVisible={{ boxShadow: 'outline', outline: 'none' }}
                  >
                    <TransactionRow transaction={t} meta="wallet" />
                  </chakra.button>
                ))}
              </Box>
            ))}
          </Stack>
          <Divider />
          <Box px={{ base: 4, md: 5 }} py={3}>
            <Pagination page={page} pageSize={pageSize} total={filtered.length} onChange={setPage} />
          </Box>
        </>
      ) : (
        <EmptyState
          icon={SearchX}
          title="No transactions match"
          description="Try a different search term or clear the filters to see everything again."
          action={
            <Button variant="secondary" size="sm" onClick={clear}>
              Clear filters
            </Button>
          }
        />
      )}

      <TransactionDetailDrawer transaction={selected} onClose={() => setSelected(null)} onDelete={onDelete} />
    </Box>
  );
}
