'use client';

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { EmptyState } from '@/components/ui/EmptyState';
import { IconTile } from '@/components/ui/IconTile';
import { TransactionRow } from '@/components/transactions/TransactionRow';
import { formatCurrency } from '@/lib/format';
import { getIcon } from '@/lib/icons';
import { totals } from '@/lib/transactions';
import type { Account } from '@/types/account';
import type { Transaction } from '@/types/transaction';

interface WalletDetailDrawerProps {
  wallet: Account;
  recent: Transaction[];
  color: string;
}

export function WalletDetailDrawer({ wallet, recent, color }: WalletDetailDrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sums = totals(recent);
  return (
    <>
      <Button size="sm" variant="secondary" onClick={onOpen} flexShrink={0}>
        Details
      </Button>
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{wallet.name}</DrawerHeader>
          <DrawerBody>
            <Flex align="center" gap={3} mb={5}>
              <IconTile icon={getIcon(wallet.icon)} color={color} size="lg" />
              <Box>
                <Text fontSize="2xl" fontWeight={600} letterSpacing="-0.025em">
                  {formatCurrency(wallet.balance, wallet.currency)}
                </Text>
                <Text fontSize="sm" color="text.muted">
                  {wallet.type} · {wallet.currency} · {wallet.connected ? 'Connected' : 'Updated manually'}
                </Text>
              </Box>
            </Flex>
            <SimpleGrid columns={2} spacing={3} mb={6}>
              <Box bg="bg.subtle" borderRadius="lg" p={3}>
                <Text fontSize="xs" color="text.muted">
                  Money in
                </Text>
                <Text fontWeight={600} color="positive.fg">
                  {formatCurrency(sums.income + sums.transfers)}
                </Text>
              </Box>
              <Box bg="bg.subtle" borderRadius="lg" p={3}>
                <Text fontSize="xs" color="text.muted">
                  Money out
                </Text>
                <Text fontWeight={600}>{formatCurrency(sums.expenses)}</Text>
              </Box>
            </SimpleGrid>
            <Text fontSize="sm" fontWeight={600} mb={1}>
              Recent activity
            </Text>
            {recent.length ? (
              <Stack spacing={0} divider={<Box borderBottomWidth="1px" borderColor="border.subtle" />}>
                {recent.map((t) => (
                  <TransactionRow key={t.id} transaction={t} />
                ))}
              </Stack>
            ) : (
              <EmptyState title="No activity yet" description="Transactions for this wallet will appear here." />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
