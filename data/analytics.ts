/**
 * Period comparison and trend series used by the dashboard, analytics and
 * reports screens. Monthly category totals match `cashFlowData` expenses.
 */

export const periodSummary = {
  month: '2026-07',
  label: 'July 2026',
  daysInMonth: 31,
  /** Same point last month (1–24 June), used for "vs June" deltas. */
  previous: { label: 'June', income: 4125, expenses: 2415.6, balance: 18640 },
  /** Weekly total balance, oldest first; the last point is today. */
  balanceHistory: [17120, 17305, 17260, 17540, 17720, 17910, 18180, 18095, 18640, 18820, 19010, 19301.1],
};

/** A type alias (not an interface) so rows can be passed straight to charts. */
export type MonthlyCategorySpend = {
  name: string;
  rent: number;
  food: number;
  shopping: number;
  bills: number;
  transport: number;
  entertainment: number;
  other: number;
};

export const monthlyCategorySpend: MonthlyCategorySpend[] = [
  { name: 'Jan', rent: 950, food: 610, shopping: 380, bills: 310, transport: 240, entertainment: 150, other: 60 },
  { name: 'Feb', rent: 950, food: 560, shopping: 290, bills: 330, transport: 220, entertainment: 140, other: 60 },
  { name: 'Mar', rent: 950, food: 640, shopping: 460, bills: 305, transport: 260, entertainment: 190, other: 175 },
  { name: 'Apr', rent: 950, food: 590, shopping: 410, bills: 295, transport: 230, entertainment: 160, other: 165 },
  { name: 'May', rent: 950, food: 655, shopping: 520, bills: 290, transport: 250, entertainment: 185, other: 160 },
  { name: 'Jun', rent: 950, food: 620, shopping: 440, bills: 300, transport: 215, entertainment: 127, other: 228 },
  { name: 'Jul', rent: 950, food: 420, shopping: 330, bills: 285, transport: 210, entertainment: 150, other: 14.2 },
];
