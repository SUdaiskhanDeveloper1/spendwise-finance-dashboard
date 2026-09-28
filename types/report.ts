export interface SavedReport {
  id: string;
  title: string;
  period: string;
  type: 'Monthly statement' | 'Quarterly summary' | 'Tax year' | 'Custom export';
  createdAt: string;
  format: 'PDF' | 'CSV';
  size: string;
}
