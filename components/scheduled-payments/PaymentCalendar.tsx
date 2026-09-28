import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { Panel } from '@/components/ui/Panel';
import { TODAY } from '@/lib/constants';
import { formatCurrency, parseDate } from '@/lib/format';
import { groupBy } from '@/lib/utils';
import type { ScheduledPayment } from '@/types/scheduledPayment';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAY_MS = 86_400_000;
const iso = (date: Date) => date.toISOString().slice(0, 10);

/** Six-week calendar around the current month with each payment on its due day. */
export function PaymentCalendar({ payments, month }: { payments: ScheduledPayment[]; month: string }) {
  const first = parseDate(`${month}-01`);
  const start = new Date(first.getTime() - ((first.getUTCDay() + 6) % 7) * DAY_MS);
  const days = Array.from({ length: 42 }, (_, i) => iso(new Date(start.getTime() + i * DAY_MS)));
  const byDay = groupBy(payments, (p) => p.dueDate);

  return (
    <Panel title="Calendar" description="When each payment leaves your account">
      <Grid templateColumns="repeat(7, minmax(0, 1fr))" gap={{ base: 1, md: 1.5 }} role="grid" aria-label="Payment calendar">
        {WEEKDAYS.map((d) => (
          <Text key={d} role="columnheader" fontSize="xs" fontWeight={500} color="text.muted" textAlign="center" pb={1}>
            {d}
          </Text>
        ))}
        {days.map((day) => {
          const inMonth = day.startsWith(month);
          const isToday = day === TODAY;
          const items = byDay[day] ?? [];
          return (
            <Box
              key={day}
              role="gridcell"
              aria-label={`${day}${items.length ? `: ${items.map((p) => `${p.title} ${formatCurrency(p.amount)}`).join(', ')}` : ''}`}
              minH={{ base: 12, md: 20 }}
              p={{ base: 1, md: 2 }}
              borderRadius="md"
              borderWidth="1px"
              borderColor={isToday ? 'accent.default' : 'border.subtle'}
              bg={inMonth ? 'bg.surface' : 'bg.subtle'}
              opacity={inMonth ? 1 : 0.6}
            >
              <Text fontSize="xs" fontWeight={isToday ? 700 : 500} color={isToday ? 'accent.fg' : 'text.secondary'}>
                {Number(day.slice(8))}
              </Text>
              {items.map((p) => (
                <Flex key={p.id} mt={1} align="center" gap={1} minW={0}>
                  <Box
                    w={1.5}
                    h={1.5}
                    borderRadius="full"
                    flexShrink={0}
                    bg={p.status === 'Paid' ? 'text.muted' : p.status === 'Due' ? 'warning.solid' : 'accent.default'}
                  />
                  <Text display={{ base: 'none', md: 'block' }} fontSize="0.6875rem" color="text.secondary" noOfLines={1}>
                    {p.title}
                  </Text>
                </Flex>
              ))}
            </Box>
          );
        })}
      </Grid>
      <Flex gap={4} mt={4} fontSize="xs" color="text.muted" wrap="wrap">
        {[
          ['warning.solid', 'Due soon'],
          ['accent.default', 'Upcoming'],
          ['text.muted', 'Paid'],
        ].map(([color, label]) => (
          <Flex key={label} align="center" gap={1.5}>
            <Box w={2} h={2} borderRadius="full" bg={color} />
            {label}
          </Flex>
        ))}
      </Flex>
    </Panel>
  );
}
