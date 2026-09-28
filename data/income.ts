import { IncomeSource, MonthlyIncomeBreakdown } from '@/types/income';

export const incomeSources: IncomeSource[] = [
  { id: 'inc-1', name: 'Salary', payer: 'Acme Ltd', category: 'Salary', frequency: 'Monthly, 1st', averageMonthly: 3200, nextPayment: '2026-08-01', wallet: 'Everyday Bank', icon: 'Briefcase' },
  { id: 'inc-2', name: 'Freelance design', payer: 'Studio clients', category: 'Freelance', frequency: 'Per project', averageMonthly: 1000, nextPayment: '2026-08-12', wallet: 'Everyday Bank', icon: 'Laptop' },
  { id: 'inc-3', name: 'Dividends', payer: 'Index Fund', category: 'Investments', frequency: 'Quarterly', averageMonthly: 72, nextPayment: '2026-10-20', wallet: 'Savings Vault', icon: 'ChartLine' },
];

/** Monthly income split by source. Totals match `cashFlowData` income. */
export const incomeBySource: MonthlyIncomeBreakdown[] = [
  { name: 'Jan', salary: 3200, freelance: 850, investments: 50 },
  { name: 'Feb', salary: 3200, freelance: 640, investments: 60 },
  { name: 'Mar', salary: 3200, freelance: 1030, investments: 70 },
  { name: 'Apr', salary: 3200, freelance: 920, investments: 80 },
  { name: 'May', salary: 3200, freelance: 1220, investments: 80 },
  { name: 'Jun', salary: 3200, freelance: 1360, investments: 90 },
  { name: 'Jul', salary: 3200, freelance: 1120, investments: 42.3 },
];
