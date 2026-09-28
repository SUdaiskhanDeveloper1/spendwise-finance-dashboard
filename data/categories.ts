import { Category } from '@/types/category';

/**
 * `color` holds the light-mode chart slot for the category; components use
 * the matching CSS variable from `lib/categories.ts` so dark mode adapts.
 * `monthlyTotal` is July month-to-date.
 */
export const categories: Category[] = [
  { id: 'cat-1', name: 'Food', type: 'Expense', color: '#2a78d6', icon: 'Utensils', monthlyTotal: 420, budgetStatus: 'Warning' },
  { id: 'cat-2', name: 'Transport', type: 'Expense', color: '#008300', icon: 'Bus', monthlyTotal: 210, budgetStatus: 'Healthy' },
  { id: 'cat-3', name: 'Rent', type: 'Expense', color: '#eb6834', icon: 'Home', monthlyTotal: 950, budgetStatus: 'Healthy' },
  { id: 'cat-4', name: 'Shopping', type: 'Expense', color: '#eda100', icon: 'ShoppingBag', monthlyTotal: 330, budgetStatus: 'Over Budget' },
  { id: 'cat-5', name: 'Entertainment', type: 'Expense', color: '#4a3aa7', icon: 'Clapperboard', monthlyTotal: 150, budgetStatus: 'Healthy' },
  { id: 'cat-6', name: 'Health', type: 'Expense', color: '#98A2B3', icon: 'HeartPulse', monthlyTotal: 14.2, budgetStatus: 'No budget' },
  { id: 'cat-7', name: 'Travel', type: 'Expense', color: '#98A2B3', icon: 'Plane', monthlyTotal: 0, budgetStatus: 'No budget' },
  { id: 'cat-8', name: 'Education', type: 'Expense', color: '#98A2B3', icon: 'GraduationCap', monthlyTotal: 0, budgetStatus: 'No budget' },
  { id: 'cat-9', name: 'Utilities', type: 'Expense', color: '#e87ba4', icon: 'Zap', monthlyTotal: 285, budgetStatus: 'Healthy' },
  { id: 'cat-10', name: 'Salary', type: 'Income', color: '#1baf7a', icon: 'Briefcase', monthlyTotal: 3200, budgetStatus: 'On track' },
  { id: 'cat-11', name: 'Freelance', type: 'Income', color: '#eb6834', icon: 'Laptop', monthlyTotal: 1120, budgetStatus: 'Above average' },
  { id: 'cat-12', name: 'Investments', type: 'Income', color: '#2a78d6', icon: 'ChartLine', monthlyTotal: 42.3, budgetStatus: 'On track' },
];
