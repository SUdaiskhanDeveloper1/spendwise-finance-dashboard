import { Insight } from '@/types/insight';
export const insights: Insight[] = [
  { id: 'i-1', title: 'Dining is trending up', description: 'You spent 18% more on dining this month compared with last month.', type: 'Spending habit', value: '+18%', trend: 'up', icon: 'TrendingUp' },
  { id: 'i-2', title: 'Transport is controlled', description: 'Your transport spending is below your monthly average.', type: 'Budget insight', value: '-12%', trend: 'down', icon: 'Bus' },
  { id: 'i-3', title: 'Savings on track', description: 'You are on track to save £350 this month if spending stays consistent.', type: 'Goal insight', value: '£350', trend: 'neutral', icon: 'PiggyBank' },
  { id: 'i-4', title: 'Upcoming bills', description: 'You have 3 upcoming bills this week. Keep £1,001 available.', type: 'Reminder', value: '3', trend: 'neutral', icon: 'Bell' },
];
