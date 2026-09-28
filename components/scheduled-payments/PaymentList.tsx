import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { formatCurrency, formatDate, formatRelativeDay } from '@/lib/format';
import type { ScheduledPayment } from '@/types/scheduledPayment';

type UpcomingPayment = ScheduledPayment & { daysUntil: number };

/** Upcoming payments with a calendar tile, due label and amount. */
export function PaymentList({ items }: { items: UpcomingPayment[] }) {
  return (
    <Stack as="ul" listStyleType="none" spacing={0} divider={<Box borderBottomWidth="1px" borderColor="border.subtle" />}>
      {items.map((p) => {
        const soon = p.daysUntil <= 2;
        return (
          <Flex as="li" key={p.id} align="center" gap={3} py={3}>
            <Flex
              direction="column"
              align="center"
              justify="center"
              w={11}
              h={11}
              flexShrink={0}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={soon ? 'warning.muted' : 'border.subtle'}
              bg={soon ? 'warning.subtle' : 'bg.subtle'}
              lineHeight={1}
            >
              <Text fontSize="0.625rem" fontWeight={600} color={soon ? 'warning.fg' : 'text.muted'} textTransform="uppercase" letterSpacing="0.04em">
                {formatDate(p.dueDate, 'short').split(' ')[1]}
              </Text>
              <Text fontSize="md" fontWeight={700} mt={0.5}>
                {Number(p.dueDate.slice(8, 10))}
              </Text>
            </Flex>
            <Box flex={1} minW={0}>
              <Text fontSize="sm" fontWeight={500} noOfLines={1}>
                {p.title}
              </Text>
              <Text fontSize="xs" color="text.muted" noOfLines={1}>
                {p.wallet} · {p.frequency}
              </Text>
            </Box>
            <Box textAlign="right" flexShrink={0}>
              <Text fontSize="sm" fontWeight={600} textStyle="numeric">
                {formatCurrency(p.amount)}
              </Text>
              <Text fontSize="xs" color={soon ? 'warning.fg' : 'text.muted'} fontWeight={soon ? 600 : 400}>
                {formatRelativeDay(p.dueDate)}
              </Text>
            </Box>
          </Flex>
        );
      })}
    </Stack>
  );
}
