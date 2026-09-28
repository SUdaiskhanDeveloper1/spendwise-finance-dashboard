export interface IncomeSource {
  id: string;
  name: string;
  payer: string;
  category: 'Salary' | 'Freelance' | 'Investments';
  frequency: string;
  averageMonthly: number;
  nextPayment: string;
  wallet: string;
  icon: string;
}

export type MonthlyIncomeBreakdown = {
  name: string;
  salary: number;
  freelance: number;
  investments: number;
};
