import { Box, Flex, Text } from '@chakra-ui/react';
import { IconTile } from '@/components/ui/IconTile';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { formatCurrency, formatRelativeDay } from '@/lib/format';
import { getIcon } from '@/lib/icons';
import type { Account } from '@/types/account';
import type { Transaction } from '@/types/transaction';
import { WalletDetailDrawer } from './WalletDetailDrawer';

interface WalletCardProps {
  wallet: Account;
  color: string;
  share: number;
  recent: Transaction[];
}

export function WalletCard({ wallet, color, share, recent }: WalletCardProps) {
  const last = recent[0];
  return (
    <Flex
      direction="column"
      position="relative"
      overflow="hidden"
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="xl"
      boxShadow="xs"
      p={{ base: 4, md: 5 }}
    >
      <Box position="absolute" top={0} insetX={0} h="3px" bg={color} aria-hidden />
      <Flex align="center" gap={3} mb={5}>
        <IconTile icon={getIcon(wallet.icon)} color={color} />
        <Box flex={1} minW={0}>
          <Text fontWeight={600} noOfLines={1}>
            {wallet.name}
          </Text>
          <Text fontSize="xs" color="text.muted" noOfLines={1}>
            {wallet.type}
          </Text>
        </Box>
        <StatusBadge status={wallet.connected ? 'synced' : 'manual'} label={wallet.connected ? 'Connected' : 'Manual'} />
      </Flex>
      <Text fontSize="xs" color="text.muted">
        Available balance
      </Text>
      <Flex align="baseline" gap={2} mb={4}>
        <Text fontSize="2xl" fontWeight={600} letterSpacing="-0.025em">
          {formatCurrency(wallet.balance, wallet.currency)}
        </Text>
        <Text fontSize="xs" color="text.muted">
          {Math.round(share * 100)}% of total
        </Text>
      </Flex>
      <Flex mt="auto" pt={3} borderTopWidth="1px" borderColor="border.subtle" align="center" justify="space-between" gap={3}>
        <Text fontSize="xs" color="text.muted" noOfLines={1}>
          {last ? `Last activity: ${last.title} · ${formatRelativeDay(last.date)}` : 'No recent activity'}
        </Text>
        <WalletDetailDrawer wallet={wallet} recent={recent} color={color} />
      </Flex>
    </Flex>
  );
}
