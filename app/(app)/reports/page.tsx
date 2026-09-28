import type { Metadata } from 'next';
import { ReportsView } from '@/components/reports/ReportsView';
import { PageHeader } from '@/components/ui/PageHeader';
import { accounts } from '@/data/accounts';
import { monthlyCategorySpend } from '@/data/analytics';
import { reportPeriods, savedReports } from '@/data/reports';
import { cashFlowData } from '@/data/transactions';
import { chartColor } from '@/lib/categories';
import { topMerchants, transactionsInMonth } from '@/lib/finance';

export const metadata: Metadata = { title: 'Reports' };

export default function ReportsPage() {
  // Merchant rankings are computed here so raw transactions never reach the browser.
  const merchantsByMonth = Object.fromEntries(
    reportPeriods
      .map((p) => [p.value, topMerchants(transactionsInMonth(p.value), 6)] as const)
      .filter(([, list]) => list.length > 0),
  );
  const wallets = accounts.map((a, i) => ({ key: a.id, label: a.name, value: a.balance, color: chartColor(i + 1) }));

  return (
    <>
      <PageHeader title="Reports" description="A clear summary of any month — ready to download, print or share with your accountant." />
      <ReportsView
        periods={reportPeriods}
        cashFlow={cashFlowData}
        categories={monthlyCategorySpend}
        merchantsByMonth={merchantsByMonth}
        wallets={wallets}
        reports={savedReports}
      />
    </>
  );
}
