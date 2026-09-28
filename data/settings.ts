export const currencyOptions = [
  { value: 'GBP', label: 'British pound (£)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'USD', label: 'US dollar ($)' },
  { value: 'AED', label: 'UAE dirham (AED)' },
  { value: 'PKR', label: 'Pakistani rupee (Rs)' },
];

export const languageOptions = ['English (UK)', 'English (US)', 'Français', 'Deutsch', 'Español'];
export const dateFormatOptions = ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'];
export const weekStartOptions = ['Monday', 'Sunday'];
export const budgetCycleOptions = ['1st of the month', '15th of the month', 'On payday (last working day)'];

export interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  email: boolean;
  push: boolean;
}

export const notificationPreferences: NotificationPreference[] = [
  { id: 'bills', label: 'Bill reminders', description: 'Two days before a scheduled payment leaves your account.', email: true, push: true },
  { id: 'budgets', label: 'Budget alerts', description: 'When a category reaches 80% of its limit, and when it goes over.', email: false, push: true },
  { id: 'goals', label: 'Goal milestones', description: 'Each time a savings goal passes 25%, 50%, 75% and 100%.', email: true, push: true },
  { id: 'weekly', label: 'Weekly summary', description: 'A short Monday email with last week’s spending and what’s coming up.', email: true, push: false },
  { id: 'large', label: 'Large transactions', description: 'Any single payment over £250.', email: false, push: true },
  { id: 'product', label: 'Product updates', description: 'New features and occasional tips. No more than once a month.', email: false, push: false },
];

export const activeSessions = [
  { id: 'se-1', device: 'MacBook Pro · Chrome', location: 'Manchester, UK', lastActive: 'Active now', current: true },
  { id: 'se-2', device: 'iPhone 15 · SpendWise app', location: 'Manchester, UK', lastActive: '2 hours ago', current: false },
  { id: 'se-3', device: 'Windows PC · Edge', location: 'London, UK', lastActive: '3 days ago', current: false },
];
