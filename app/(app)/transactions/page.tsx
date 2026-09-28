import type { Metadata } from 'next';
import { TransactionsView } from '@/components/transactions/TransactionsView';
import { PageHeader } from '@/components/ui/PageHeader';
import { transactions } from '@/data/transactions';

export const metadata: Metadata = { title: 'Transactions' };

export default function TransactionsPage() {
  return (
    <>
      <PageHeader
        title="Transactions"
        description="Every payment, deposit and transfer across your wallets. Select a row to see the full details."
      />
      <TransactionsView initialItems={transactions} syncWithSearch />
    </>
  );
}
