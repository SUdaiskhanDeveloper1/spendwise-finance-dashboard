'use client';

import { Box, Flex, Stack, Switch, Text, useToast } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { IconTile } from '@/components/ui/IconTile';
import { Panel } from '@/components/ui/Panel';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getCategoryMeta } from '@/lib/categories';
import { formatCurrency, formatDate, formatRelativeDay } from '@/lib/format';
import { getIcon } from '@/lib/icons';
import type { ScheduledPayment } from '@/types/scheduledPayment';

type Filter = 'upcoming' | 'paid' | 'all';
const FILTERS = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'paid', label: 'Paid' },
  { value: 'all', label: 'All' },
] as const;

const statusKey = { Paid: 'paid', Due: 'due', Upcoming: 'upcoming' } as const;

export function ScheduledPaymentsView({ payments }: { payments: ScheduledPayment[] }) {
  const toast = useToast();
  const [filter, setFilter] = useState<Filter>('upcoming');
  const [reminders, setReminders] = useState(() => Object.fromEntries(payments.map((p) => [p.id, p.reminderEnabled])));

  const visible = useMemo(() => {
    const list = payments.filter((p) => (filter === 'all' ? true : filter === 'paid' ? p.status === 'Paid' : p.status !== 'Paid'));
    return [...list].sort((a, b) => (filter === 'paid' ? b.dueDate.localeCompare(a.dueDate) : a.dueDate.localeCompare(b.dueDate)));
  }, [payments, filter]);

  const toggleReminder = (p: ScheduledPayment, enabled: boolean) => {
    setReminders((current) => ({ ...current, [p.id]: enabled }));
    toast({ status: 'success', title: enabled ? `Reminder on for ${p.title}` : `Reminder off for ${p.title}`, duration: 2500 });
  };

  return (
    <Panel
      title="Payments"
      description="Toggle reminders for any bill"
      action={<SegmentedControl<Filter> aria-label="Filter payments" options={FILTERS} value={filter} onChange={setFilter} />}
      bodyProps={{ pt: 2 }}
    >
      <Stack spacing={0} divider={<Box borderBottomWidth="1px" borderColor="border.subtle" />}>
        {visible.map((p) => {
          const category = getCategoryMeta(p.category);
          return (
            <Flex key={p.id} align="center" gap={3} py={3} wrap={{ base: 'wrap', sm: 'nowrap' }}>
              <IconTile icon={getIcon(category.icon)} color={category.color} />
              <Box flex={1} minW="140px">
                <Flex align="center" gap={2} wrap="wrap">
                  <Text fontWeight={500} fontSize="sm">
                    {p.title}
                  </Text>
                  <StatusBadge status={statusKey[p.status]} label={p.status === 'Due' ? 'Due soon' : undefined} />
                </Flex>
                <Text fontSize="xs" color="text.muted">
                  {p.frequency} · {p.wallet} · {p.status === 'Paid' ? `Paid ${formatDate(p.dueDate, 'short')}` : `${formatRelativeDay(p.dueDate)} (${formatDate(p.dueDate, 'short')})`}
                </Text>
              </Box>
              <Text fontWeight={600} fontSize="sm" textStyle="numeric" minW="72px" textAlign="right">
                {formatCurrency(p.amount)}
              </Text>
              <Flex align="center" gap={2} pl={{ sm: 3 }} borderLeftWidth={{ sm: '1px' }} borderColor="border.subtle">
                <Text as="label" htmlFor={`reminder-${p.id}`} fontSize="xs" color="text.muted" display={{ base: 'none', md: 'block' }}>
                  Reminder
                </Text>
                <Switch
                  id={`reminder-${p.id}`}
                  size="sm"
                  isChecked={reminders[p.id]}
                  isDisabled={p.status === 'Paid'}
                  onChange={(e) => toggleReminder(p, e.target.checked)}
                  aria-label={`Reminder for ${p.title}`}
                />
              </Flex>
            </Flex>
          );
        })}
      </Stack>
    </Panel>
  );
}
