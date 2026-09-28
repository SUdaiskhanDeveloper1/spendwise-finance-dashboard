'use client';

import { Button, Flex, Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react';
import { Search, X } from 'lucide-react';

export interface TransactionFilterState {
  query: string;
  category: string;
  wallet: string;
  type: string;
  month: string;
}

export const EMPTY_FILTERS: TransactionFilterState = { query: '', category: 'All', wallet: 'All', type: 'All', month: 'All' };

interface TransactionFiltersProps {
  value: TransactionFilterState;
  onChange: (patch: Partial<TransactionFilterState>) => void;
  onClear: () => void;
  categories: string[];
  wallets: string[];
  months: { value: string; label: string }[];
  /** Hide the type filter when the view is fixed to one type (Income, Expenses). */
  hideType?: boolean;
}

export function countActiveFilters(value: TransactionFilterState) {
  return (value.query.trim() ? 1 : 0) + (['category', 'wallet', 'type', 'month'] as const).filter((k) => value[k] !== 'All').length;
}

export function TransactionFilters({ value, onChange, onClear, categories, wallets, months, hideType }: TransactionFiltersProps) {
  const active = countActiveFilters(value);
  const selectProps = { size: 'md', w: { base: 'full', sm: 'auto' }, minW: { sm: '150px' } } as const;
  return (
    <Flex gap={2} wrap="wrap" align="center" flex={1}>
      <InputGroup w={{ base: 'full', md: '260px' }}>
        <InputLeftElement pointerEvents="none" color="text.muted">
          <Search size={16} aria-hidden />
        </InputLeftElement>
        <Input
          value={value.query}
          onChange={(event) => onChange({ query: event.target.value })}
          placeholder="Search transactions"
          aria-label="Search transactions"
        />
      </InputGroup>
      <Select {...selectProps} aria-label="Filter by period" value={value.month} onChange={(e) => onChange({ month: e.target.value })}>
        <option value="All">All time</option>
        {months.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </Select>
      <Select {...selectProps} aria-label="Filter by category" value={value.category} onChange={(e) => onChange({ category: e.target.value })}>
        <option value="All">All categories</option>
        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </Select>
      <Select {...selectProps} aria-label="Filter by wallet" value={value.wallet} onChange={(e) => onChange({ wallet: e.target.value })}>
        <option value="All">All wallets</option>
        {wallets.map((w) => (
          <option key={w}>{w}</option>
        ))}
      </Select>
      {!hideType && (
        <Select {...selectProps} aria-label="Filter by type" value={value.type} onChange={(e) => onChange({ type: e.target.value })}>
          <option value="All">All types</option>
          <option>Income</option>
          <option>Expense</option>
          <option>Transfer</option>
        </Select>
      )}
      {active > 0 && (
        <Button variant="ghost" size="sm" leftIcon={<X size={14} />} onClick={onClear}>
          Clear {active > 1 ? `${active} filters` : 'filter'}
        </Button>
      )}
    </Flex>
  );
}
