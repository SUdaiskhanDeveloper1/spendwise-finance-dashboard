import type { Metadata } from 'next';
import { SettingsView } from '@/components/settings/SettingsView';
import { PageHeader } from '@/components/ui/PageHeader';
import { transactions } from '@/data/transactions';

export const metadata: Metadata = { title: 'Settings' };

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Preferences, notifications, security and your data." />
      <SettingsView transactions={transactions} />
    </>
  );
}
