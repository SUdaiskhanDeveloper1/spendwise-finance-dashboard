import type { Metadata } from 'next';
import { Box, Flex, Grid, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { ChartPanel } from '@/components/charts/ChartPanel';
import { Delta } from '@/components/ui/Delta';
import { PageHeader } from '@/components/ui/PageHeader';
import { Panel } from '@/components/ui/Panel';
import { AddWalletModal } from '@/components/wallets/AddWalletModal';
import { AllocationBar } from '@/components/wallets/AllocationBar';
import { TransferWalletModal } from '@/components/wallets/TransferWalletModal';
import { WalletCard } from '@/components/wallets/WalletCard';
import { accounts } from '@/data/accounts';
import { periodSummary } from '@/data/analytics';
import { chartColor } from '@/lib/categories';
import { TODAY } from '@/lib/constants';
import { sortedTransactions, totalBalance } from '@/lib/finance';
import { formatCurrency, formatDate, parseDate } from '@/lib/format';
import { change } from '@/lib/utils';

export const metadata: Metadata = { title: 'Wallets' };

const WEEK_MS = 7 * 86_400_000;

export default function WalletsPage() {
  const total = totalBalance();
  const history = periodSummary.balanceHistory;
  const trend = history.map((value, i) => ({
    name: formatDate(new Date(parseDate(TODAY).getTime() - (history.length - 1 - i) * WEEK_MS).toISOString(), 'short'),
    balance: value,
  }));
  const all = sortedTransactions();

  return (
    <>
      <PageHeader
        title="Wallets"
        description="Bank accounts, cash, savings and shared pots — everything you own in one place."
        actions={
          <>
            <TransferWalletModal />
            <AddWalletModal />
          </>
        }
      />
      <Stack spacing={{ base: 6, md: 8 }}>
        <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 1fr) minmax(0, 2fr)' }} gap={{ base: 4, md: 6 }}>
          <Panel title="Total balance" description={`Across ${accounts.length} wallets`}>
            <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight={600} letterSpacing="-0.03em">
              {formatCurrency(total)}
            </Text>
            <Box mt={1} mb={6}>
              <Delta value={change(total, periodSummary.previous.balance)} label={`vs ${periodSummary.previous.label}`} />
            </Box>
            <AllocationBar items={accounts.map((a, i) => ({ key: a.id, label: a.name, value: a.balance, color: chartColor(i + 1), currency: a.currency }))} />
          </Panel>
          <ChartPanel
            title="Balance over time"
            description="Weekly total across all wallets, last 12 weeks"
            data={trend}
            series={[{ key: 'balance', label: 'Total balance', color: chartColor(1) }]}
            kind="line"
            zeroBaseline={false}
            height={300}
            xLabel="Week ending"
          />
        </Grid>

        <Box>
          <Flex justify="space-between" align="baseline" mb={4}>
            <Text as="h2" fontFamily="heading" fontWeight={600} fontSize="md">
              Your wallets
            </Text>
            <Text fontSize="sm" color="text.muted">
              Select Details for recent activity
            </Text>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 4, md: 5 }}>
            {accounts.map((account, i) => (
              <WalletCard
                key={account.id}
                wallet={account}
                color={chartColor(i + 1)}
                share={account.balance / total}
                recent={all.filter((t) => t.wallet === account.name).slice(0, 6)}
              />
            ))}
          </SimpleGrid>
        </Box>
      </Stack>
    </>
  );
}
