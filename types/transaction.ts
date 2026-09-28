export type TransactionType = 'Income' | 'Expense' | 'Transfer';
export interface Transaction { id: string; title: string; amount: number; type: TransactionType; category: string; wallet: string; date: string; merchant: string; notes: string; label: string; paymentMethod: string; }
