import type { Metadata } from 'next';
import { Grid, SimpleGrid, Stack } from '@chakra-ui/react';
import { BellRing, CalendarClock, Clock, Repeat } from 'lucide-react';
import { AddScheduledPaymentModal } from '@/components/scheduled-payments/AddScheduledPaymentModal';
import { PaymentCalendar } from '@/components/scheduled-payments/PaymentCalendar';
import { ScheduledPaymentsView } from '@/components/scheduled-payments/ScheduledPaymentsView';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { scheduledPayments } from '@/data/scheduledPayments';
import { CURRENT_MONTH } from '@/lib/constants';
import { upcomingPayments } from '@/lib/finance';
import { formatCurrency, formatRelativeDay } from '@/lib/format';
import { sumBy } from '@/lib/utils';

export const metadata: Metadata = { title: 'Scheduled payments' };

export default function ScheduledPaymentsPage() {
  const thisWeek = upcomingPayments(undefined, 7);
  const next = upcomingPayments()[0];
  const monthly = scheduledPayments.filter((p) => p.frequency === 'Monthly');
  const reminders = scheduledPayments.filter((p) => p.reminderEnabled).length;

  return (
    <>
      <PageHeader
        title="Scheduled payments"
        description="Bills and subscriptions that leave your account automatically. They are set aside before we show your safe-to-spend figure."
        actions={<AddScheduledPaymentModal />}
      />
      <Stack spacing={{ base: 6, md: 8 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} spacing={{ base: 3, md: 4 }}>
          <StatCard label="Due this week" value={formatCurrency(sumBy(thisWeek, (p) => p.amount))} icon={Clock} tone="warning" helper={`${thisWeek.length} payments`} />
          <StatCard label="Next payment" value={next.title} icon={CalendarClock} helper={`${formatCurrency(next.amount)} · ${formatRelativeDay(next.dueDate)}`} />
          <StatCard label="Monthly commitments" value={formatCurrency(sumBy(monthly, (p) => p.amount))} icon={Repeat} tone="info" helper={`${monthly.length} recurring payments`} />
          <StatCard label="Reminders on" value={`${reminders} of ${scheduledPayments.length}`} icon={BellRing} tone="positive" helper="Two days before each payment" />
        </SimpleGrid>

        <Grid templateColumns={{ base: '1fr', xl: 'repeat(2, minmax(0, 1fr))' }} gap={{ base: 4, md: 6 }} alignItems="start">
          <ScheduledPaymentsView payments={scheduledPayments} />
          <PaymentCalendar payments={scheduledPayments} month={CURRENT_MONTH} />
        </Grid>
      </Stack>
    </>
  );
}
