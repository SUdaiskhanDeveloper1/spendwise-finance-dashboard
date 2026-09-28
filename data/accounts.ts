import { Account } from '@/types/account';
export const accounts: Account[] = [
  { id: 'acc-1', name: 'Everyday Bank', type: 'Bank Account', balance: 4820.55, currency: 'GBP', connected: false, color: '#2563EB', icon: 'Landmark' },
  { id: 'acc-2', name: 'Cash Wallet', type: 'Cash Wallet', balance: 260.00, currency: 'GBP', connected: true, color: '#10B981', icon: 'Wallet' },
  { id: 'acc-3', name: 'Savings Vault', type: 'Savings Account', balance: 12500.00, currency: 'GBP', connected: false, color: '#8B5CF6', icon: 'PiggyBank' },
  { id: 'acc-4', name: 'Family Wallet', type: 'Shared Wallet', balance: 980.35, currency: 'GBP', connected: true, color: '#06B6D4', icon: 'Users' },
  { id: 'acc-5', name: 'Crypto Wallet', type: 'Crypto Placeholder', balance: 740.20, currency: 'GBP', connected: false, color: '#F59E0B', icon: 'Coins' },
];
