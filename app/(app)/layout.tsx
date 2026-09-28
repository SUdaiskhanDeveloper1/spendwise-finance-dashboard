import { AppShell } from '@/components/layout/AppShell';
import { currentUser, notifications } from '@/data/user';
import { budgetOverview, upcomingPayments } from '@/lib/finance';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Computed on the server so the navigation badges ship as plain numbers.
  const overview = budgetOverview();
  const badges = {
    billsDue: upcomingPayments(undefined, 7).length,
    budgetAlerts: overview.over.length + overview.warning.length,
  };
  const user = {
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    email: currentUser.email,
    avatar: currentUser.avatar,
  };

  return (
    <AppShell badges={badges} notifications={notifications} user={user}>
      {children}
    </AppShell>
  );
}
