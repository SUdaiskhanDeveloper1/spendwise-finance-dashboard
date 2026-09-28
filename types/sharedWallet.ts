export interface SharedWallet { id: string; name: string; members: string[]; totalBalance: number; monthlySpend: number; budgetLimit: number; currency: string; recentExpenses: { title: string; amount: number; paidBy: string }[]; }

export interface Settlement { id: string; wallet: string; from: string; to: string; amount: number; currency: string; }
