import { Transaction } from '@/types/transaction';

/**
 * Filters transactions by free-text query, category, wallet, type and
 * (optionally) month. Pass 'All' to skip a filter.
 */
export function filterTransactions(
  items: Transaction[],
  query: string,
  category: string,
  wallet: string,
  type: string,
  month = 'All',
) {
  const q = query.trim().toLowerCase();
  return items.filter(
    (item) =>
      (!q || [item.title, item.merchant, item.label, item.category, item.notes].join(' ').toLowerCase().includes(q)) &&
      (category === 'All' || item.category === category) &&
      (wallet === 'All' || item.wallet === wallet) &&
      (type === 'All' || item.type === type) &&
      (month === 'All' || item.date.startsWith(month)),
  );
}

/** Serialises transactions to CSV (RFC 4180 quoting). */
export function transactionsToCsv(items: Transaction[]) {
  const columns: (keyof Transaction)[] = ['date', 'title', 'merchant', 'category', 'wallet', 'type', 'amount', 'paymentMethod', 'label', 'notes'];
  const escape = (value: unknown) => {
    const text = String(value ?? '');
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return [columns.join(','), ...items.map((item) => columns.map((column) => escape(item[column])).join(','))].join('\n');
}
