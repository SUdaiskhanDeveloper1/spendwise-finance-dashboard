import type { Metadata } from 'next';
import { AnalyticsView } from '@/components/analytics/AnalyticsView';
import { PageHeader } from '@/components/ui/PageHeader';
import { monthlyCategorySpend } from '@/data/analytics';
import { cashFlowData } from '@/data/transactions';

export const metadata: Metadata = { title: 'Analytics' };

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader title="Analytics" description="Trends in your income, spending and saving. Pick a range to compare." />
      <AnalyticsView cashFlow={cashFlowData} categories={monthlyCategorySpend} />
    </>
  );
}
