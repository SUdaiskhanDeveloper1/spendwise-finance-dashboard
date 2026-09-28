import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import { ArrowRight } from 'lucide-react';
import { MemberAvatar } from '@/components/ui/MemberAvatars';
import { Panel } from '@/components/ui/Panel';
import { ToastButton } from '@/components/ui/ToastButton';
import { formatCurrency } from '@/lib/format';
import type { Settlement } from '@/types/sharedWallet';

export function SettlementSummary({ settlements }: { settlements: Settlement[] }) {
  return (
    <Panel title="Settle up" description="Who owes whom across your shared wallets" bodyProps={{ pt: 2 }}>
      <Stack spacing={0} divider={<Box borderBottomWidth="1px" borderColor="border.subtle" />}>
        {settlements.map((s) => (
          <Flex key={s.id} align="center" gap={3} py={3} wrap={{ base: 'wrap', sm: 'nowrap' }}>
            <Flex align="center" gap={2} flexShrink={0}>
              <MemberAvatar name={s.from} />
              <Box color="text.muted">
                <ArrowRight size={14} aria-label="owes" />
              </Box>
              <MemberAvatar name={s.to} />
            </Flex>
            <Box flex={1} minW="140px">
              <Text fontSize="sm">
                <Text as="span" fontWeight={600}>
                  {s.from}
                </Text>{' '}
                owes{' '}
                <Text as="span" fontWeight={600}>
                  {s.to}
                </Text>
              </Text>
              <Text fontSize="xs" color="text.muted">
                {s.wallet}
              </Text>
            </Box>
            <Text fontWeight={600} textStyle="numeric">
              {formatCurrency(s.amount, s.currency)}
            </Text>
            <ToastButton size="sm" variant="secondary" toastTitle="Reminder sent" toastDescription={`${s.from} has been nudged to settle ${formatCurrency(s.amount, s.currency)}.`}>
              Remind
            </ToastButton>
          </Flex>
        ))}
      </Stack>
    </Panel>
  );
}
