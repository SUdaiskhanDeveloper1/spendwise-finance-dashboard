/**
 * Transaction helpers with no data imports, safe to use in client components
 * without pulling the mock data files into the browser bundle.
 */
import type { Transaction } from '@/types/transaction';
import { roundMoney, sumBy } from './utils';

const idNumber = (id: string) => Number(id.split('-')[1]) || 0;

/** Newest first; ties broken by id so the order is stable. */
export const byNewest = (a: Transaction, b: Transaction) =>
  b.date.localeCompare(a.date) || idNumber(b.id) - idNumber(a.id);

export function totals(items: Transaction[]) {
  const income = sumBy(items.filter((t) => t.type === 'Income'), (t) => t.amount);
  const expenses = sumBy(items.filter((t) => t.type === 'Expense'), (t) => t.amount);
  const transfers = sumBy(items.filter((t) => t.type === 'Transfer'), (t) => t.amount);
  return {
    income: roundMoney(income),
    expenses: roundMoney(expenses),
    transfers: roundMoney(transfers),
    net: roundMoney(income - expenses),
    count: items.length,
  };
}

export const savingsRate = (income: number, expenses: number) => (income > 0 ? (income - expenses) / income : 0);

/** Browser event fired by the header search so an open Transactions page updates in place. */
export const SEARCH_EVENT = 'spendwise:search';
