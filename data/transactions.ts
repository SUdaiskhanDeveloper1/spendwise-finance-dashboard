import { Transaction } from '@/types/transaction';

/**
 * July figures are month-to-date (as of 24 Jul 2026). July expense totals per
 * category match `budgets[].spent`, and the monthly totals match the July
 * entry in `cashFlowData`, so every screen tells the same story.
 */
export const transactions: Transaction[] = [
  { id: 'tx-1', title: 'Salary Payment', amount: 3200, type: 'Income', category: 'Salary', wallet: 'Everyday Bank', date: '2026-07-01', merchant: 'Acme Ltd', notes: 'Monthly salary', label: 'Work', paymentMethod: 'Bank transfer' },
  { id: 'tx-2', title: 'Grocery Shop', amount: 84.35, type: 'Expense', category: 'Food', wallet: 'Everyday Bank', date: '2026-07-02', merchant: 'FreshMart', notes: 'Weekly groceries', label: 'Home', paymentMethod: 'Debit card' },
  { id: 'tx-3', title: 'Rent', amount: 950, type: 'Expense', category: 'Rent', wallet: 'Everyday Bank', date: '2026-07-03', merchant: 'Landlord', notes: 'July rent', label: 'Fixed', paymentMethod: 'Standing order' },
  { id: 'tx-4', title: 'Freelance Design', amount: 640, type: 'Income', category: 'Freelance', wallet: 'Everyday Bank', date: '2026-07-04', merchant: 'Studio Client', notes: 'Landing page UI', label: 'Side income', paymentMethod: 'Bank transfer' },
  { id: 'tx-5', title: 'Metro Pass', amount: 72, type: 'Expense', category: 'Transport', wallet: 'Cash Wallet', date: '2026-07-05', merchant: 'Metro', notes: 'Monthly pass', label: 'Commute', paymentMethod: 'Cash' },
  { id: 'tx-6', title: 'Restaurant', amount: 58.9, type: 'Expense', category: 'Entertainment', wallet: 'Family Wallet', date: '2026-07-06', merchant: 'Nori House', notes: 'Dinner', label: 'Weekend', paymentMethod: 'Credit card' },
  { id: 'tx-7', title: 'Transfer to Savings', amount: 500, type: 'Transfer', category: 'Savings', wallet: 'Savings Vault', date: '2026-07-06', merchant: 'Internal', notes: 'Monthly saving', label: 'Goal', paymentMethod: 'Transfer' },
  { id: 'tx-8', title: 'Electricity bill', amount: 64.8, type: 'Expense', category: 'Utilities', wallet: 'Family Wallet', date: '2026-07-02', merchant: 'BrightPower', notes: 'June usage', label: 'Home', paymentMethod: 'Direct debit' },
  { id: 'tx-9', title: 'Taxi home', amount: 18.5, type: 'Expense', category: 'Transport', wallet: 'Everyday Bank', date: '2026-07-04', merchant: 'RideNow', notes: 'Last train was cancelled', label: 'Commute', paymentMethod: 'Credit card' },
  { id: 'tx-10', title: 'Music subscription', amount: 11.99, type: 'Expense', category: 'Entertainment', wallet: 'Everyday Bank', date: '2026-07-05', merchant: 'SoundWave', notes: 'Family plan', label: 'Subscriptions', paymentMethod: 'Debit card' },
  { id: 'tx-11', title: 'Home essentials', amount: 46.99, type: 'Expense', category: 'Shopping', wallet: 'Everyday Bank', date: '2026-07-05', merchant: 'Northwind Store', notes: 'Towels and storage boxes', label: 'Home', paymentMethod: 'Credit card' },
  { id: 'tx-12', title: 'Coffee and pastry', amount: 6.4, type: 'Expense', category: 'Food', wallet: 'Cash Wallet', date: '2026-07-07', merchant: 'Grind & Co', notes: 'Morning coffee', label: 'Daily', paymentMethod: 'Contactless' },
  { id: 'tx-13', title: 'Pharmacy', amount: 14.2, type: 'Expense', category: 'Health', wallet: 'Everyday Bank', date: '2026-07-07', merchant: 'CityCare Pharmacy', notes: 'Allergy tablets', label: 'Health', paymentMethod: 'Debit card' },
  { id: 'tx-14', title: 'Water bill', amount: 32.4, type: 'Expense', category: 'Utilities', wallet: 'Family Wallet', date: '2026-07-08', merchant: 'ClearWater', notes: 'Quarterly bill', label: 'Home', paymentMethod: 'Direct debit' },
  { id: 'tx-15', title: 'Grocery shop', amount: 91.2, type: 'Expense', category: 'Food', wallet: 'Everyday Bank', date: '2026-07-09', merchant: 'FreshMart', notes: 'Weekly groceries', label: 'Home', paymentMethod: 'Debit card' },
  { id: 'tx-16', title: 'Cinema tickets', amount: 27.6, type: 'Expense', category: 'Entertainment', wallet: 'Family Wallet', date: '2026-07-10', merchant: 'Lumière Cinema', notes: 'Friday film night', label: 'Weekend', paymentMethod: 'Credit card' },
  { id: 'tx-17', title: 'Train to Brighton', amount: 42.8, type: 'Expense', category: 'Transport', wallet: 'Everyday Bank', date: '2026-07-11', merchant: 'Southern Rail', notes: 'Day return', label: 'Travel', paymentMethod: 'Debit card' },
  { id: 'tx-18', title: 'Weekend brunch', amount: 32.6, type: 'Expense', category: 'Food', wallet: 'Family Wallet', date: '2026-07-12', merchant: 'Olive & Thyme', notes: 'Brunch with Sara', label: 'Weekend', paymentMethod: 'Credit card' },
  { id: 'tx-19', title: 'Mobile phone plan', amount: 22, type: 'Expense', category: 'Utilities', wallet: 'Everyday Bank', date: '2026-07-12', merchant: 'Mobi', notes: 'SIM-only plan', label: 'Subscriptions', paymentMethod: 'Direct debit' },
  { id: 'tx-20', title: 'Running shoes', amount: 119, type: 'Expense', category: 'Shopping', wallet: 'Everyday Bank', date: '2026-07-13', merchant: 'Stride Sports', notes: 'Replacing the old pair', label: 'Health', paymentMethod: 'Credit card' },
  { id: 'tx-21', title: 'Live music tickets', amount: 51.51, type: 'Expense', category: 'Entertainment', wallet: 'Everyday Bank', date: '2026-07-14', merchant: 'TicketHub', notes: 'August gig', label: 'Weekend', paymentMethod: 'Credit card' },
  { id: 'tx-22', title: 'Council tax', amount: 148, type: 'Expense', category: 'Utilities', wallet: 'Everyday Bank', date: '2026-07-15', merchant: 'City Council', notes: 'Monthly instalment', label: 'Fixed', paymentMethod: 'Direct debit' },
  { id: 'tx-23', title: 'Team lunch', amount: 18.75, type: 'Expense', category: 'Food', wallet: 'Everyday Bank', date: '2026-07-15', merchant: 'Noodle Bar', notes: 'Friday lunch with the team', label: 'Work', paymentMethod: 'Contactless' },
  { id: 'tx-24', title: 'Brand refresh project', amount: 480, type: 'Income', category: 'Freelance', wallet: 'Everyday Bank', date: '2026-07-16', merchant: 'Harbour Studio', notes: 'Logo and style guide', label: 'Side income', paymentMethod: 'Bank transfer' },
  { id: 'tx-25', title: 'Grocery shop', amount: 78.45, type: 'Expense', category: 'Food', wallet: 'Everyday Bank', date: '2026-07-16', merchant: 'FreshMart', notes: 'Weekly groceries', label: 'Home', paymentMethod: 'Debit card' },
  { id: 'tx-26', title: 'Birthday gift', amount: 64.5, type: 'Expense', category: 'Shopping', wallet: 'Everyday Bank', date: '2026-07-17', merchant: 'Paper & Co', notes: "Mum's birthday", label: 'Family', paymentMethod: 'Debit card' },
  { id: 'tx-27', title: 'Fuel top-up', amount: 55, type: 'Expense', category: 'Transport', wallet: 'Everyday Bank', date: '2026-07-18', merchant: 'FuelStop', notes: 'Weekend trip', label: 'Travel', paymentMethod: 'Debit card' },
  { id: 'tx-28', title: 'Farmers market', amount: 24.3, type: 'Expense', category: 'Food', wallet: 'Cash Wallet', date: '2026-07-19', merchant: 'Local Market', notes: 'Vegetables and bread', label: 'Home', paymentMethod: 'Cash' },
  { id: 'tx-29', title: 'Gas top-up', amount: 17.8, type: 'Expense', category: 'Utilities', wallet: 'Family Wallet', date: '2026-07-19', merchant: 'HeatCo', notes: 'Prepay meter', label: 'Home', paymentMethod: 'Debit card' },
  { id: 'tx-30', title: 'Summer shirts', amount: 99.51, type: 'Expense', category: 'Shopping', wallet: 'Everyday Bank', date: '2026-07-20', merchant: 'Linen Lane', notes: 'Two linen shirts', label: 'Personal', paymentMethod: 'Credit card' },
  { id: 'tx-31', title: 'Dividend payout', amount: 42.3, type: 'Income', category: 'Investments', wallet: 'Savings Vault', date: '2026-07-20', merchant: 'Index Fund', notes: 'Q2 dividend', label: 'Investing', paymentMethod: 'Bank transfer' },
  { id: 'tx-32', title: 'Top up Family Wallet', amount: 150, type: 'Transfer', category: 'Transfer', wallet: 'Family Wallet', date: '2026-07-21', merchant: 'Internal', notes: 'Household pot', label: 'Family', paymentMethod: 'Transfer' },
  { id: 'tx-33', title: 'Bike share pass', amount: 21.7, type: 'Expense', category: 'Transport', wallet: 'Everyday Bank', date: '2026-07-21', merchant: 'CityBikes', notes: 'Weekly pass', label: 'Commute', paymentMethod: 'Credit card' },
  { id: 'tx-34', title: 'Grocery shop', amount: 83.95, type: 'Expense', category: 'Food', wallet: 'Everyday Bank', date: '2026-07-22', merchant: 'FreshMart', notes: 'Weekly groceries', label: 'Home', paymentMethod: 'Debit card' },

  { id: 'tx-35', title: 'Salary Payment', amount: 3200, type: 'Income', category: 'Salary', wallet: 'Everyday Bank', date: '2026-06-01', merchant: 'Acme Ltd', notes: 'Monthly salary', label: 'Work', paymentMethod: 'Bank transfer' },
  { id: 'tx-36', title: 'Electricity bill', amount: 71.4, type: 'Expense', category: 'Utilities', wallet: 'Family Wallet', date: '2026-06-02', merchant: 'BrightPower', notes: 'May usage', label: 'Home', paymentMethod: 'Direct debit' },
  { id: 'tx-37', title: 'Rent', amount: 950, type: 'Expense', category: 'Rent', wallet: 'Everyday Bank', date: '2026-06-03', merchant: 'Landlord', notes: 'June rent', label: 'Fixed', paymentMethod: 'Standing order' },
  { id: 'tx-38', title: 'Transfer to Savings', amount: 500, type: 'Transfer', category: 'Savings', wallet: 'Savings Vault', date: '2026-06-05', merchant: 'Internal', notes: 'Monthly saving', label: 'Goal', paymentMethod: 'Transfer' },
  { id: 'tx-39', title: 'Grocery shop', amount: 88.1, type: 'Expense', category: 'Food', wallet: 'Everyday Bank', date: '2026-06-06', merchant: 'FreshMart', notes: 'Weekly groceries', label: 'Home', paymentMethod: 'Debit card' },
  { id: 'tx-40', title: 'Internet', amount: 38, type: 'Expense', category: 'Utilities', wallet: 'Everyday Bank', date: '2026-06-12', merchant: 'FibreNet', notes: 'Broadband', label: 'Subscriptions', paymentMethod: 'Direct debit' },
  { id: 'tx-41', title: 'Weekend in Whitby', amount: 214, type: 'Expense', category: 'Travel', wallet: 'Everyday Bank', date: '2026-06-13', merchant: 'Seaside Stays', notes: 'Two nights by the coast', label: 'Travel', paymentMethod: 'Credit card' },
  { id: 'tx-42', title: 'Gym membership', amount: 35, type: 'Expense', category: 'Health', wallet: 'Cash Wallet', date: '2026-06-18', merchant: 'FitHub', notes: 'Monthly membership', label: 'Health', paymentMethod: 'Direct debit' },
  { id: 'tx-43', title: 'Dashboard UI project', amount: 1360, type: 'Income', category: 'Freelance', wallet: 'Everyday Bank', date: '2026-06-18', merchant: 'Studio Client', notes: 'Analytics dashboard design', label: 'Side income', paymentMethod: 'Bank transfer' },
  { id: 'tx-44', title: 'Dinner with friends', amount: 46.2, type: 'Expense', category: 'Entertainment', wallet: 'Family Wallet', date: '2026-06-20', merchant: 'Casa Verde', notes: 'Birthday dinner', label: 'Weekend', paymentMethod: 'Credit card' },
  { id: 'tx-45', title: 'Linen bedding', amount: 72, type: 'Expense', category: 'Shopping', wallet: 'Everyday Bank', date: '2026-06-22', merchant: 'Northwind Store', notes: 'Summer bedding set', label: 'Home', paymentMethod: 'Credit card' },
  { id: 'tx-46', title: 'Grocery shop', amount: 94.6, type: 'Expense', category: 'Food', wallet: 'Everyday Bank', date: '2026-06-27', merchant: 'FreshMart', notes: 'Weekly groceries', label: 'Home', paymentMethod: 'Debit card' },
];

/** Monthly income and spending. July is month-to-date. */
export const cashFlowData = [
  { name: 'Jan', income: 4100, expenses: 2700 },
  { name: 'Feb', income: 3900, expenses: 2550 },
  { name: 'Mar', income: 4300, expenses: 2980 },
  { name: 'Apr', income: 4200, expenses: 2800 },
  { name: 'May', income: 4500, expenses: 3010 },
  { name: 'Jun', income: 4650, expenses: 2880 },
  { name: 'Jul', income: 4362.3, expenses: 2359.2 },
];

/** July spending by category group (month-to-date). */
export const categorySpendData = [
  { name: 'Rent', value: 950 },
  { name: 'Food', value: 420 },
  { name: 'Shopping', value: 330 },
  { name: 'Bills', value: 285 },
  { name: 'Transport', value: 210 },
  { name: 'Entertainment', value: 150 },
  { name: 'Other', value: 14.2 },
];
