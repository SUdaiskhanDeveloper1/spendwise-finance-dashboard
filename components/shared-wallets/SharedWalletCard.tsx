import { Badge, Box, Flex, Stack, Text } from '@chakra-ui/react';
import { MemberAvatar, MemberAvatars } from '@/components/ui/MemberAvatars';
import { Meter } from '@/components/ui/Meter';
import { formatCurrency, formatPercent } from '@/lib/format';
import { ratio } from '@/lib/utils';
import type { SharedWallet } from '@/types/sharedWallet';

export function SharedWalletCard({ wallet }: { wallet: SharedWallet }) {
  const used = ratio(wallet.monthlySpend, wallet.budgetLimit);
  return (
    <Flex direction="column" bg="bg.surface" borderWidth="1px" borderColor="border.subtle" borderRadius="xl" boxShadow="xs" p={{ base: 4, md: 5 }}>
      <Flex justify="space-between" align="flex-start" gap={3} mb={4}>
        <Box minW={0}>
          <Text fontWeight={600} noOfLines={1}>
            {wallet.name}
          </Text>
          <Text fontSize="xs" color="text.muted">
            {wallet.members.length} members
          </Text>
        </Box>
        <Flex align="center" gap={2}>
          <Badge variant="outline">{wallet.currency}</Badge>
          <MemberAvatars names={wallet.members} size="xs" />
        </Flex>
      </Flex>

      <Text fontSize="xs" color="text.muted">
        Shared balance
      </Text>
      <Text fontSize="2xl" fontWeight={600} letterSpacing="-0.025em" mb={4}>
        {formatCurrency(wallet.totalBalance, wallet.currency)}
      </Text>

      <Meter value={used} tone={used > 0.9 ? 'warning' : 'accent'} label={`${wallet.name}: ${formatPercent(used)} of monthly budget spent`} />
      <Flex justify="space-between" mt={2} fontSize="sm">
        <Text color="text.secondary">
          {formatCurrency(wallet.monthlySpend, wallet.currency, 0)} of {formatCurrency(wallet.budgetLimit, wallet.currency, 0)}
        </Text>
        <Text fontWeight={600}>{formatPercent(used)}</Text>
      </Flex>

      <Box mt={5} pt={4} borderTopWidth="1px" borderColor="border.subtle">
        <Text fontSize="xs" fontWeight={500} color="text.muted" mb={2}>
          Recent shared expenses
        </Text>
        <Stack spacing={2.5}>
          {wallet.recentExpenses.map((expense) => (
            <Flex key={expense.title} align="center" gap={2.5}>
              <MemberAvatar name={expense.paidBy} size="xs" />
              <Box flex={1} minW={0}>
                <Text fontSize="sm" noOfLines={1}>
                  {expense.title}
                </Text>
                <Text fontSize="xs" color="text.muted">
                  Paid by {expense.paidBy}
                </Text>
              </Box>
              <Text fontSize="sm" fontWeight={600} textStyle="numeric">
                {formatCurrency(expense.amount, wallet.currency)}
              </Text>
            </Flex>
          ))}
        </Stack>
      </Box>
    </Flex>
  );
}
