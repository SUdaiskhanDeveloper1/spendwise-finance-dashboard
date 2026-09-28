/**
 * Pure selectors over the mock data. They run on the server during static
 * rendering, so the browser receives finished numbers instead of raw data.
 */
import { accounts } from '@/data/accounts';
import { budgets } from '@/data/budgets';
import { goals } from '@/data/goals';
import { scheduledPayments } from '@/data/scheduledPayments';
import { transactions } from '@/data/transactions';
import { periodSummary } from '@/data/analytics';
import type { Budget } from '@/types/budget';
import type { Goal } from '@/types/goal';
import type { ScheduledPayment } from '@/types/scheduledPayment';
import type { Transaction } from '@/types/transaction';
import { CURRENT_MONTH, TODAY } from './constants';
import { daysBetween, parseDate } from './format';
import { groupBy, ratio, roundMoney, sumBy } from './utils';
import { byNewest, savingsRate, totals } from './transactions';

export { byNewest, savingsRate, totals };

// ---- Transactions --------------------------------------------------------

export const sortedTransactions = (items: Transaction[] = transactions) => [...items].sort(byNewest);

export const transactionsInMonth = (month = CURRENT_MONTH, items: Transaction[] = transactions) =>
  items.filter((item) => item.date.startsWith(month));

export function topMerchants(items: Transaction[], limit = 5) {
  const expenses = items.filter((t) => t.type === 'Expense');
  const grouped = groupBy(expenses, (t) => t.merchant);
  const total = sumBy(expenses, (t) => t.amount);
  return Object.entries(grouped)
    .map(([merchant, list]) => ({
      merchant,
      total: roundMoney(sumBy(list, (t) => t.amount)),
      count: list.length,
      category: list[0].category,
      share: 0,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit)
    .map((row) => ({ ...row, share: ratio(row.total, total) }));
}

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Total spending per weekday, Monday first. */
export function spendingByWeekday(items: Transaction[]) {
  const sums = new Array(7).fill(0);
  for (const t of items) {
    if (t.type !== 'Expense') continue;
    const day = (parseDate(t.date).getUTCDay() + 6) % 7;
    sums[day] += t.amount;
  }
  return WEEKDAYS.map((name, i) => ({ name, value: roundMoney(sums[i]) }));
}

/** Spending for each day of the month up to TODAY, optionally leaving out fixed-cost categories. */
export function dailySpending(month = CURRENT_MONTH, exclude: string[] = [], items: Transaction[] = transactions) {
  const lastDay = month === CURRENT_MONTH ? parseDate(TODAY).getUTCDate() : 30;
  const expenses = items.filter((t) => t.type === 'Expense' && t.date.startsWith(month) && !exclude.includes(t.category));
  return Array.from({ length: lastDay }, (_, i) => {
    const day = String(i + 1).padStart(2, '0');
    const value = sumBy(expenses.filter((t) => t.date.endsWith(`-${day}`)), (t) => t.amount);
    return { name: String(i + 1), value: roundMoney(value) };
  });
}

// ---- Accounts ------------------------------------------------------------

export const totalBalance = () => roundMoney(sumBy(accounts, (a) => a.balance));

export function latestActivity(wallet: string) {
  return sortedTransactions().find((t) => t.wallet === wallet);
}

// ---- Period --------------------------------------------------------------

export function daysLeftInMonth() {
  return periodSummary.daysInMonth - parseDate(TODAY).getUTCDate();
}

/** Month-to-date figures with their comparison to the same point last month. */
export function currentPeriod() {
  const month = totals(transactionsInMonth());
  const { previous } = periodSummary;
  return {
    ...month,
    savingsRate: savingsRate(month.income, month.expenses),
    previous: {
      ...previous,
      net: roundMoney(previous.income - previous.expenses),
      savingsRate: savingsRate(previous.income, previous.expenses),
    },
  };
}

// ---- Budgets -------------------------------------------------------------

export type BudgetTone = 'healthy' | 'warning' | 'over';

export const budgetTone = (budget: Budget): BudgetTone =>
  budget.status === 'Over Budget' ? 'over' : budget.status === 'Warning' ? 'warning' : 'healthy';

export function budgetOverview(list: Budget[] = budgets) {
  const limit = sumBy(list, (b) => b.limit);
  const spent = sumBy(list, (b) => b.spent);
  const remaining = roundMoney(limit - spent);
  const daysLeft = daysLeftInMonth();
  const flexibleLeft = sumBy(list, (b) => Math.max(0, b.limit - b.spent));
  return {
    limit,
    spent,
    remaining,
    used: ratio(spent, limit),
    daysLeft,
    dailyAllowance: roundMoney(Math.max(0, remaining) / Math.max(1, daysLeft)),
    flexibleLeft,
    over: list.filter((b) => budgetTone(b) === 'over'),
    warning: list.filter((b) => budgetTone(b) === 'warning'),
  };
}

// ---- Scheduled payments --------------------------------------------------

export function upcomingPayments(list: ScheduledPayment[] = scheduledPayments, withinDays?: number) {
  return list
    .filter((p) => p.status !== 'Paid')
    .map((p) => ({ ...p, daysUntil: daysBetween(TODAY, p.dueDate) }))
    .filter((p) => withinDays === undefined || p.daysUntil <= withinDays)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}

// ---- Goals ---------------------------------------------------------------

const DAYS_PER_MONTH = 30.44;

export function goalProgress(goal: Goal) {
  const remaining = roundMoney(Math.max(0, goal.targetAmount - goal.savedAmount));
  const daysLeft = Math.max(0, daysBetween(TODAY, goal.deadline));
  const monthsLeft = daysLeft / DAYS_PER_MONTH;
  return {
    fraction: ratio(goal.savedAmount, goal.targetAmount),
    remaining,
    daysLeft,
    monthsLeft,
    monthlyNeeded: roundMoney(remaining / Math.max(1, monthsLeft)),
  };
}

export function goalsOverview(list: Goal[] = goals) {
  const saved = sumBy(list, (g) => g.savedAmount);
  const target = sumBy(list, (g) => g.targetAmount);
  const monthlyNeeded = roundMoney(sumBy(list, (g) => goalProgress(g).monthlyNeeded));
  const next = [...list].sort((a, b) => a.deadline.localeCompare(b.deadline))[0];
  return { saved, target, fraction: ratio(saved, target), monthlyNeeded, next };
}
