import { categories } from '@/data/categories';

/** CSS variable for a validated categorical chart slot (1–8). */
export const chartColor = (slot: number) => `var(--chakra-colors-chart-${slot})`;
export const CHART_MUTED = 'var(--chakra-colors-chart-muted)';

/**
 * Spending groups in a fixed order. Colours use contiguous chart slots 2–7
 * (every adjacent pair is CVD-validated) and "Other" uses the neutral
 * de-emphasis grey. Colour follows the group, never its rank.
 */
export const spendGroups = [
  { key: 'rent', label: 'Rent', color: chartColor(2) },
  { key: 'food', label: 'Food', color: chartColor(3) },
  { key: 'shopping', label: 'Shopping', color: chartColor(4) },
  { key: 'bills', label: 'Bills', color: chartColor(5) },
  { key: 'transport', label: 'Transport', color: chartColor(6) },
  { key: 'entertainment', label: 'Entertainment', color: chartColor(7) },
  { key: 'other', label: 'Other', color: CHART_MUTED },
] as const;

export type SpendGroupKey = (typeof spendGroups)[number]['key'];

const groupByCategory: Record<string, SpendGroupKey> = {
  Rent: 'rent',
  Food: 'food',
  Shopping: 'shopping',
  Utilities: 'bills',
  Transport: 'transport',
  Entertainment: 'entertainment',
};

export const spendGroupFor = (category: string): SpendGroupKey => groupByCategory[category] ?? 'other';

export const spendGroupColor = (label: string) =>
  spendGroups.find((group) => group.label === label)?.color ?? CHART_MUTED;

/** Income sources use the first three slots. */
export const incomeSeries = [
  { key: 'salary', label: 'Salary', color: chartColor(1) },
  { key: 'freelance', label: 'Freelance', color: chartColor(2) },
  { key: 'investments', label: 'Investments', color: chartColor(3) },
] as const;

const incomeColor: Record<string, string> = {
  Salary: chartColor(1),
  Freelance: chartColor(2),
  Investments: chartColor(3),
};

const categoryByName = new Map(categories.map((category) => [category.name, category]));

export interface CategoryMeta {
  name: string;
  icon: string;
  color: string;
}

/** Icon and colour for any transaction category name. */
export function getCategoryMeta(name: string): CategoryMeta {
  if (name === 'Savings') return { name, icon: 'PiggyBank', color: 'var(--chakra-colors-text-muted)' };
  if (name === 'Transfer') return { name, icon: 'ArrowLeftRight', color: 'var(--chakra-colors-text-muted)' };
  const category = categoryByName.get(name);
  const group = spendGroupFor(name);
  const color = incomeColor[name] ?? spendGroups.find((g) => g.key === group)?.color ?? CHART_MUTED;
  return { name, icon: category?.icon ?? 'CircleDollarSign', color };
}

/** Transaction categories offered in filters and forms. */
export const expenseCategoryNames = categories.filter((c) => c.type === 'Expense').map((c) => c.name);
export const incomeCategoryNames = categories.filter((c) => c.type === 'Income').map((c) => c.name);
