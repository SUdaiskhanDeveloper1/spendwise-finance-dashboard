import { Box, Flex, Grid, Stack, Text } from '@chakra-ui/react';
import { Bus, PiggyBank, ShieldCheck, Utensils } from 'lucide-react';
import { IconTile } from '@/components/ui/IconTile';
import { cashFlowData } from '@/data/transactions';
import { chartColor } from '@/lib/categories';
import { formatCurrency } from '@/lib/format';

const max = Math.max(...cashFlowData.map((m) => m.income));

const kpis = [
  { label: 'Total balance', value: '£19,301' },
  { label: 'Income', value: '£4,362' },
  { label: 'Spent', value: '£2,359' },
];

const recent = [
  { icon: Utensils, title: 'FreshMart', meta: 'Food · Today', amount: '−£83.95', color: chartColor(3) },
  { icon: Bus, title: 'CityBikes', meta: 'Transport · Tue', amount: '−£21.70', color: chartColor(6) },
  { icon: PiggyBank, title: 'Index Fund', meta: 'Dividend · Mon', amount: '+£42.30', color: chartColor(1) },
];

/**
 * The hero "screenshot" is real markup, not an image: sharp at every size,
 * theme-aware and weightless for the first paint.
 */
export function ProductPreview() {
  return (
    <Box position="relative" role="img" aria-label="Preview of the SpendWise dashboard showing balance, cash flow, a budget and recent payments">
      <Box
        bg="bg.surface"
        borderWidth="1px"
        borderColor="border.subtle"
        borderRadius="2xl"
        boxShadow="0 32px 64px -24px rgba(16, 24, 40, 0.22), 0 0 0 1px rgba(16, 24, 40, 0.02)"
        overflow="hidden"
        animation="sw-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both"
        aria-hidden
      >
        <Flex align="center" gap={1.5} px={4} h={9} borderBottomWidth="1px" borderColor="border.subtle" bg="bg.subtle">
          {['#F97066', '#FDB022', '#32D583'].map((c) => (
            <Box key={c} w={2.5} h={2.5} borderRadius="full" bg={c} />
          ))}
          <Text mx="auto" fontSize="xs" color="text.muted" bg="bg.surface" px={3} py={0.5} borderRadius="md" borderWidth="1px" borderColor="border.subtle">
            app.spendwise.co/dashboard
          </Text>
        </Flex>
        <Box p={{ base: 4, md: 5 }}>
          <Text fontSize="xs" color="text.muted">
            Friday 24 July
          </Text>
          <Text fontFamily="heading" fontWeight={700} fontSize="lg" letterSpacing="-0.02em" mb={4}>
            Welcome back, Asma
          </Text>
          <Grid templateColumns="repeat(3, minmax(0, 1fr))" gap={2.5} mb={3}>
            {kpis.map((k) => (
              <Box key={k.label} borderWidth="1px" borderColor="border.subtle" borderRadius="lg" p={3}>
                <Text fontSize="0.6875rem" color="text.muted">
                  {k.label}
                </Text>
                <Text fontWeight={600} fontSize={{ base: 'sm', md: 'md' }} letterSpacing="-0.02em">
                  {k.value}
                </Text>
              </Box>
            ))}
          </Grid>
          <Grid templateColumns={{ base: '1fr', sm: '1.4fr 1fr' }} gap={2.5}>
            <Box borderWidth="1px" borderColor="border.subtle" borderRadius="lg" p={3}>
              <Text fontSize="xs" fontWeight={600} mb={3}>
                Cash flow
              </Text>
              <Flex h="92px" align="flex-end" gap={2}>
                {cashFlowData.map((m) => (
                  <Flex key={m.name} flex={1} direction="column" align="center" gap={1} h="full" justify="flex-end">
                    <Flex gap="2px" align="flex-end" h="full">
                      <Box w="7px" h={`${(m.income / max) * 100}%`} bg={chartColor(1)} borderTopRadius="3px" />
                      <Box w="7px" h={`${(m.expenses / max) * 100}%`} bg={chartColor(2)} borderTopRadius="3px" />
                    </Flex>
                    <Text fontSize="0.625rem" color="text.muted">
                      {m.name[0]}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Box>
            <Stack borderWidth="1px" borderColor="border.subtle" borderRadius="lg" p={3} spacing={2.5}>
              {recent.map((r) => (
                <Flex key={r.title} align="center" gap={2}>
                  <IconTile icon={r.icon} color={r.color} size="sm" />
                  <Box flex={1} minW={0}>
                    <Text fontSize="xs" fontWeight={500} noOfLines={1}>
                      {r.title}
                    </Text>
                    <Text fontSize="0.625rem" color="text.muted" noOfLines={1}>
                      {r.meta}
                    </Text>
                  </Box>
                  <Text fontSize="xs" fontWeight={600} color={r.amount.startsWith('+') ? 'positive.fg' : 'text.primary'}>
                    {r.amount}
                  </Text>
                </Flex>
              ))}
            </Stack>
          </Grid>
        </Box>
      </Box>

      <Flex
        display={{ base: 'none', md: 'flex' }}
        position="absolute"
        left={{ md: -6, xl: -10 }}
        bottom={-7}
        align="center"
        gap={3}
        bg="bg.surface"
        borderWidth="1px"
        borderColor="border.subtle"
        borderRadius="xl"
        boxShadow="xl"
        px={4}
        py={3}
        animation="sw-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s both, sw-float 6s ease-in-out 1.2s infinite"
        aria-hidden
      >
        <IconTile icon={ShieldCheck} tone="accent" />
        <Box>
          <Text fontSize="xs" color="text.muted">
            Safe to spend today
          </Text>
          <Text fontWeight={600}>{formatCurrency(30.71)}</Text>
        </Box>
      </Flex>

      <Box
        display={{ base: 'none', md: 'block' }}
        position="absolute"
        right={{ md: -4, xl: -8 }}
        top={-7}
        w="190px"
        bg="bg.surface"
        borderWidth="1px"
        borderColor="border.subtle"
        borderRadius="xl"
        boxShadow="xl"
        p={3.5}
        animation="sw-rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both"
        aria-hidden
      >
        <Flex justify="space-between" fontSize="xs" mb={2}>
          <Text fontWeight={600}>Food and Drink</Text>
          <Text color="warning.fg" fontWeight={600}>
            84%
          </Text>
        </Flex>
        <Box h={1.5} bg="warning.muted" borderRadius="full" overflow="hidden">
          <Box h="full" w="84%" bg="warning.solid" borderRadius="full" />
        </Box>
        <Text fontSize="0.6875rem" color="text.muted" mt={1.5}>
          £80 left · 7 days to go
        </Text>
      </Box>
    </Box>
  );
}
