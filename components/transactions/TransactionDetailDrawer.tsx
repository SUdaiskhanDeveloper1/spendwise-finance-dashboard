'use client';

import {
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';
import { Amount } from '@/components/ui/Amount';
import { IconTile } from '@/components/ui/IconTile';
import { getCategoryMeta } from '@/lib/categories';
import { formatDate } from '@/lib/format';
import { getIcon } from '@/lib/icons';
import type { Transaction } from '@/types/transaction';

interface TransactionDetailDrawerProps {
  transaction: Transaction | null;
  onClose: () => void;
  onDelete?: (transaction: Transaction) => void;
}

export function TransactionDetailDrawer({ transaction: t, onClose, onDelete }: TransactionDetailDrawerProps) {
  const category = t ? getCategoryMeta(t.category) : null;
  const rows: [string, string][] = t
    ? [
        ['Date', formatDate(t.date, 'long')],
        ['Category', t.category],
        ['Wallet', t.wallet],
        ['Merchant', t.merchant],
        ['Payment method', t.paymentMethod],
        ['Label', t.label],
      ]
    : [];

  return (
    <Drawer isOpen={Boolean(t)} onClose={onClose} placement="right" size="sm">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Transaction details</DrawerHeader>
        {t && category && (
          <>
            <DrawerBody>
              <Flex direction="column" align="center" textAlign="center" gap={3} py={4}>
                <IconTile icon={getIcon(category.icon)} color={category.color} size="lg" rounded />
                <Box>
                  <Text fontWeight={600} fontSize="md">
                    {t.title}
                  </Text>
                  <Text color="text.muted" fontSize="sm">
                    {t.merchant}
                  </Text>
                </Box>
                <Amount value={t.amount} type={t.type} fontSize="3xl" letterSpacing="-0.03em" tabular={false} />
                <Badge variant={t.type === 'Income' ? 'positive' : t.type === 'Transfer' ? 'info' : 'neutral'}>{t.type} · Completed</Badge>
              </Flex>
              <Stack as="dl" spacing={0} mt={4} borderWidth="1px" borderColor="border.subtle" borderRadius="lg" divider={<Box borderBottomWidth="1px" borderColor="border.subtle" />}>
                {rows.map(([label, value]) => (
                  <Flex key={label} justify="space-between" gap={4} px={4} py={3}>
                    <Text as="dt" color="text.muted" fontSize="sm">
                      {label}
                    </Text>
                    <Text as="dd" fontSize="sm" fontWeight={500} textAlign="right">
                      {value}
                    </Text>
                  </Flex>
                ))}
              </Stack>
              {t.notes && (
                <Box mt={4} bg="bg.subtle" borderRadius="lg" p={4}>
                  <Text fontSize="xs" color="text.muted" mb={1}>
                    Notes
                  </Text>
                  <Text fontSize="sm">{t.notes}</Text>
                </Box>
              )}
            </DrawerBody>
            <DrawerFooter justifyContent="space-between">
              {onDelete ? (
                <Button variant="ghost" color="negative.fg" leftIcon={<Trash2 size={16} />} onClick={() => onDelete(t)}>
                  Delete
                </Button>
              ) : (
                <span />
              )}
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
