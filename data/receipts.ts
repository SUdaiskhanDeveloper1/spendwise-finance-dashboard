export interface ScannedReceipt {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  status: 'Saved' | 'Needs review';
}

export const scanHistory: ScannedReceipt[] = [
  { id: 'rc-1', merchant: 'FreshMart', amount: 83.95, date: '2026-07-22', category: 'Food', status: 'Saved' },
  { id: 'rc-2', merchant: 'Linen Lane', amount: 99.51, date: '2026-07-20', category: 'Shopping', status: 'Saved' },
  { id: 'rc-3', merchant: 'FuelStop', amount: 55, date: '2026-07-18', category: 'Transport', status: 'Needs review' },
  { id: 'rc-4', merchant: 'Olive & Thyme', amount: 32.6, date: '2026-07-12', category: 'Food', status: 'Saved' },
];

/** What the simulated scan "reads" from any receipt in this demo. */
export const sampleScanResult = {
  merchant: 'FreshMart',
  amount: '84.35',
  date: '2026-07-24',
  category: 'Food',
  wallet: 'Everyday Bank',
  notes: 'Weekly groceries · 14 items',
};
