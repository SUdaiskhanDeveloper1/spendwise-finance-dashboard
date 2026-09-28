import { Settlement, SharedWallet } from '@/types/sharedWallet';

export const sharedWallets: SharedWallet[] = [
  { id: 'sw-1', name: 'Family Household', members: ['Asma', 'Ahmed', 'Sara'], totalBalance: 980.35, monthlySpend: 720, budgetLimit: 1200, currency: 'GBP', recentExpenses: [{ title: 'Groceries', amount: 84, paidBy: 'Asma' }, { title: 'Electricity', amount: 112, paidBy: 'Ahmed' }] },
  { id: 'sw-2', name: 'Roommate Bills', members: ['You', 'Mia', 'Leo'], totalBalance: 420, monthlySpend: 315, budgetLimit: 600, currency: 'GBP', recentExpenses: [{ title: 'Internet', amount: 38, paidBy: 'Mia' }, { title: 'Cleaning', amount: 45, paidBy: 'Leo' }] },
  { id: 'sw-3', name: 'Paris Trip', members: ['You', 'Noor', 'Zain'], totalBalance: 1280, monthlySpend: 530, budgetLimit: 2000, currency: 'EUR', recentExpenses: [{ title: 'Hotel deposit', amount: 250, paidBy: 'Noor' }] },
];

export const settlements: Settlement[] = [
  { id: 'st-1', wallet: 'Family Household', from: 'Ahmed', to: 'Asma', amount: 42, currency: 'GBP' },
  { id: 'st-2', wallet: 'Roommate Bills', from: 'Leo', to: 'You', amount: 18.5, currency: 'GBP' },
  { id: 'st-3', wallet: 'Paris Trip', from: 'Noor', to: 'Zain', amount: 25, currency: 'EUR' },
];
