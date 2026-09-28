import type { Metadata } from 'next';
import { Badge, Box, Flex, Grid, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Check, MapPin, Sparkles } from 'lucide-react';
import { EditProfileModal } from '@/components/profile/EditProfileModal';
import { IconTile } from '@/components/ui/IconTile';
import { LinkButton } from '@/components/ui/LinkButton';
import { Panel } from '@/components/ui/Panel';
import { UserAvatar } from '@/components/ui/UserAvatar';
import { budgets } from '@/data/budgets';
import { goals } from '@/data/goals';
import { pricingPlans } from '@/data/pricingPlans';
import { cashFlowData } from '@/data/transactions';
import { activityLog, currentUser } from '@/data/user';
import { formatCurrency, formatDate, formatPercent, formatRelativeDay } from '@/lib/format';
import { getIcon } from '@/lib/icons';
import { savingsRate } from '@/lib/transactions';
import { sumBy } from '@/lib/utils';

export const metadata: Metadata = { title: 'Profile' };

export default function ProfilePage() {
  const user = currentUser;
  const name = `${user.firstName} ${user.lastName}`;
  const plan = pricingPlans.find((p) => p.id === user.planId) ?? pricingPlans[0];
  const months = cashFlowData.slice(0, -1);
  const avgIncome = sumBy(months, (m) => m.income) / months.length;
  const rate = savingsRate(sumBy(months, (m) => m.income), sumBy(months, (m) => m.expenses));

  const details: [string, string][] = [
    ['Full name', name],
    ['Email', user.email],
    ['Phone', user.phone],
    ['Occupation', user.occupation],
    ['Location', user.location],
    ['Time zone', user.timezone],
    ['Home currency', user.currency],
  ];
  const stats = [
    { label: 'Average monthly income', value: formatCurrency(avgIncome, 'GBP', 0) },
    { label: 'Average savings rate', value: formatPercent(rate) },
    { label: 'Active budgets', value: String(budgets.length) },
    { label: 'Savings goals', value: String(goals.length) },
  ];

  return (
    <Stack spacing={{ base: 6, md: 8 }}>
      <Box as="section" bg="bg.surface" borderWidth="1px" borderColor="border.subtle" borderRadius="xl" boxShadow="xs" overflow="hidden">
        <Box h={{ base: 20, md: 28 }} bgGradient="linear(120deg, brand.700, brand.500 55%, #2a78d6)" aria-hidden />
        <Flex px={{ base: 4, md: 6 }} pb={{ base: 4, md: 6 }} direction={{ base: 'column', md: 'row' }} align={{ base: 'flex-start', md: 'flex-end' }} gap={4} mt={{ base: -10, md: -12 }}>
          <UserAvatar src={user.avatar} name={name} size={96} ring />
          <Box flex={1} minW={0}>
            <Flex align="center" gap={2} wrap="wrap">
              <Heading as="h1" size="lg">
                {name}
              </Heading>
              <Badge variant="accent" display="inline-flex" alignItems="center" gap={1}>
                <Sparkles size={12} aria-hidden />
                {plan.name}
              </Badge>
            </Flex>
            <Flex mt={1} gap={3} color="text.muted" fontSize="sm" wrap="wrap">
              <Text>{user.occupation}</Text>
              <Flex align="center" gap={1}>
                <MapPin size={14} aria-hidden />
                {user.location}
              </Flex>
              <Text>Member since {formatDate(user.memberSince, 'monthYear')}</Text>
            </Flex>
          </Box>
          <EditProfileModal user={user} />
        </Flex>
      </Box>

      <Grid templateColumns={{ base: '1fr', xl: 'minmax(0, 2fr) minmax(0, 1fr)' }} gap={{ base: 4, md: 6 }} alignItems="start">
        <Stack spacing={{ base: 4, md: 6 }}>
          <Panel title="Personal details" description="Only you can see this information">
            <Box as="dl">
              {details.map(([label, value]) => (
                <Grid key={label} templateColumns={{ base: '1fr', sm: '180px minmax(0, 1fr)' }} gap={{ base: 0.5, sm: 4 }} py={3} borderBottomWidth="1px" borderColor="border.subtle" _last={{ borderBottomWidth: 0 }}>
                  <Text as="dt" fontSize="sm" color="text.muted">
                    {label}
                  </Text>
                  <Text as="dd" fontSize="sm" fontWeight={500}>
                    {value}
                  </Text>
                </Grid>
              ))}
            </Box>
          </Panel>
          <Panel title="Financial snapshot" description="Based on January to June">
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3}>
              {stats.map((s) => (
                <Box key={s.label} bg="bg.subtle" borderRadius="lg" p={3}>
                  <Text fontSize="xs" color="text.muted">
                    {s.label}
                  </Text>
                  <Text fontSize="lg" fontWeight={600} letterSpacing="-0.02em">
                    {s.value}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Panel>
        </Stack>

        <Stack spacing={{ base: 4, md: 6 }}>
          <Panel title="Your plan" action={<Badge variant="positive">Active</Badge>}>
            <Flex align="baseline" gap={1} mb={1}>
              <Text fontSize="2xl" fontWeight={600} letterSpacing="-0.025em">
                {plan.price}
              </Text>
              <Text color="text.muted">/month · {plan.name}</Text>
            </Flex>
            <Text fontSize="sm" color="text.muted" mb={4}>
              Renews on 12 August 2026
            </Text>
            <Stack spacing={2} mb={5}>
              {plan.features.map((f) => (
                <Flex key={f} align="center" gap={2} fontSize="sm">
                  <Box color="accent.default">
                    <Check size={16} aria-hidden />
                  </Box>
                  {f}
                </Flex>
              ))}
            </Stack>
            <LinkButton href="/pricing" variant="secondary" w="full">
              Compare plans
            </LinkButton>
          </Panel>

          <Panel title="Recent activity" bodyProps={{ pt: 2 }}>
            <Stack spacing={0} divider={<Box borderBottomWidth="1px" borderColor="border.subtle" />}>
              {activityLog.map((item) => (
                <Flex key={item.id} gap={3} py={3} align="center">
                  <IconTile icon={getIcon(item.icon)} tone="neutral" size="sm" />
                  <Box flex={1} minW={0}>
                    <Text fontSize="sm" fontWeight={500} noOfLines={1}>
                      {item.title}
                    </Text>
                    <Text fontSize="xs" color="text.muted">
                      {item.detail} · {formatRelativeDay(item.date)}
                    </Text>
                  </Box>
                </Flex>
              ))}
            </Stack>
          </Panel>
        </Stack>
      </Grid>
    </Stack>
  );
}
