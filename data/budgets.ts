import { Budget } from '@/types/budget';
export const budgets: Budget[] = [
  { id: 'b-1', category: 'Food and Drink', limit: 500, spent: 420, period: 'Monthly', status: 'Warning', color: '#10B981', icon: 'Utensils' },
  { id: 'b-2', category: 'Rent', limit: 950, spent: 950, period: 'Monthly', status: 'Healthy', color: '#2563EB', icon: 'Home' },
  { id: 'b-3', category: 'Transport', limit: 250, spent: 210, period: 'Monthly', status: 'Healthy', color: '#06B6D4', icon: 'Bus' },
  { id: 'b-4', category: 'Shopping', limit: 300, spent: 330, period: 'Monthly', status: 'Over Budget', color: '#EF4444', icon: 'ShoppingBag' },
  { id: 'b-5', category: 'Entertainment', limit: 220, spent: 150, period: 'Monthly', status: 'Healthy', color: '#8B5CF6', icon: 'Clapperboard' },
  { id: 'b-6', category: 'Bills and Utilities', limit: 340, spent: 285, period: 'Monthly', status: 'Healthy', color: '#F59E0B', icon: 'Receipt' },
];
