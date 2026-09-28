import { Goal } from '@/types/goal';
export const goals: Goal[] = [
  { id: 'g-1', title: 'Emergency Fund', targetAmount: 8000, savedAmount: 5200, deadline: '2026-12-31', category: 'Safety', icon: 'ShieldCheck', color: '#10B981' },
  { id: 'g-2', title: 'Dream Vacation', targetAmount: 3500, savedAmount: 1450, deadline: '2027-03-15', category: 'Travel', icon: 'Plane', color: '#2563EB' },
  { id: 'g-3', title: 'House Deposit', targetAmount: 25000, savedAmount: 10800, deadline: '2028-08-01', category: 'Home', icon: 'Home', color: '#8B5CF6' },
  { id: 'g-4', title: 'Laptop Upgrade', targetAmount: 1800, savedAmount: 900, deadline: '2026-10-01', category: 'Tech', icon: 'Laptop', color: '#F59E0B' },
];
