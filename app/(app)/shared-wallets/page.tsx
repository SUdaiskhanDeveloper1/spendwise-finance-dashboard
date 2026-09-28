import type { Metadata } from 'next';
import { Box, Grid, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { InviteMemberModal } from '@/components/shared-wallets/InviteMemberModal';
import { SettlementSummary } from '@/components/shared-wallets/SettlementSummary';
import { SharedWalletCard } from '@/components/shared-wallets/SharedWalletCard';
import { SplitExpenseModal } from '@/components/shared-wallets/SplitExpenseModal';
import { PageHeader } from '@/components/ui/PageHeader';
import { Photo } from '@/components/ui/Photo';
import { settlements, sharedWallets } from '@/data/sharedWallets';

export const metadata: Metadata = { title: 'Shared wallets' };

export default function SharedWalletsPage() {
  return (
    <>
      <PageHeader
        title="Shared wallets"
        description="Money you manage with housemates, partners and family. Everyone sees the same numbers."
        actions={
          <>
            <SplitExpenseModal />
            <InviteMemberModal />
          </>
        }
      />
      <Stack spacing={{ base: 6, md: 8 }}>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 4, md: 5 }}>
          {sharedWallets.map((wallet) => (
            <SharedWalletCard key={wallet.id} wallet={wallet} />
          ))}
        </SimpleGrid>

        <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 3fr) minmax(0, 2fr)' }} gap={{ base: 4, md: 6 }}>
          <SettlementSummary settlements={settlements} />
          <Box bg="bg.surface" borderWidth="1px" borderColor="border.subtle" borderRadius="xl" boxShadow="xs" overflow="hidden">
            <Photo image="sharedHousehold" alt="" sizes="(min-width: 80em) 35vw, 100vw" ratio={16 / 9} borderRadius={0} />
            <Box p={{ base: 4, md: 5 }}>
              <Text fontWeight={600} fontSize="md" mb={1}>
                Fair shares, fewer awkward chats
              </Text>
              <Text fontSize="sm" color="text.secondary">
                Split any expense evenly or by amount. SpendWise keeps a running balance for each person, so settling up is a single tap at the end of the month.
              </Text>
            </Box>
          </Box>
        </Grid>
      </Stack>
    </>
  );
}
