import { SavedReport } from '@/types/report';

export const savedReports: SavedReport[] = [
  { id: 'rp-1', title: 'June 2026 statement', period: '1–30 Jun 2026', type: 'Monthly statement', createdAt: '2026-07-01', format: 'PDF', size: '184 KB' },
  { id: 'rp-2', title: 'Q2 2026 summary', period: 'Apr–Jun 2026', type: 'Quarterly summary', createdAt: '2026-07-02', format: 'PDF', size: '412 KB' },
  { id: 'rp-3', title: 'Freelance income export', period: 'Jan–Jun 2026', type: 'Custom export', createdAt: '2026-07-09', format: 'CSV', size: '12 KB' },
  { id: 'rp-4', title: 'May 2026 statement', period: '1–31 May 2026', type: 'Monthly statement', createdAt: '2026-06-01', format: 'PDF', size: '176 KB' },
  { id: 'rp-5', title: 'Tax year 2025/26', period: '6 Apr 2025 – 5 Apr 2026', type: 'Tax year', createdAt: '2026-04-08', format: 'PDF', size: '1.2 MB' },
];

/** Months available in the report period picker (value = YYYY-MM). */
export const reportPeriods = [
  { value: '2026-07', label: 'July 2026 (to date)', short: 'Jul' },
  { value: '2026-06', label: 'June 2026', short: 'Jun' },
  { value: '2026-05', label: 'May 2026', short: 'May' },
  { value: '2026-04', label: 'April 2026', short: 'Apr' },
  { value: '2026-03', label: 'March 2026', short: 'Mar' },
];
