import { Badge, Box, Flex, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { Check } from 'lucide-react';
import { LinkButton } from '@/components/ui/LinkButton';
import { monthlyPrice, pricingPlans } from '@/data/pricingPlans';
import { formatCurrency } from '@/lib/format';

export type Billing = 'monthly' | 'yearly';

/** Yearly billing charges ten months for twelve. */
const perMonth = (price: number, billing: Billing) => (billing === 'yearly' ? (price * 10) / 12 : price);

export function PricingCards({ billing = 'monthly' }: { billing?: Billing }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing={{ base: 4, md: 5 }}>
      {pricingPlans.map((plan) => {
        const price = monthlyPrice(plan);
        const shown = perMonth(price, billing);
        return (
          <Flex
            key={plan.id}
            direction="column"
            position="relative"
            bg="bg.surface"
            borderWidth={plan.highlighted ? '2px' : '1px'}
            borderColor={plan.highlighted ? 'accent.default' : 'border.subtle'}
            borderRadius="2xl"
            boxShadow={plan.highlighted ? 'xl' : 'xs'}
            p={{ base: 5, md: 6 }}
          >
            {plan.highlighted && (
              <Badge position="absolute" top={-3} left={6} variant="accent" bg="accent.default" color="white" _dark={{ color: 'gray.950' }} px={2.5}>
                Most popular
              </Badge>
            )}
            <Text fontFamily="heading" fontWeight={700} fontSize="lg">
              {plan.name}
            </Text>
            <Text fontSize="sm" color="text.secondary" mt={1} minH={{ xl: 10 }}>
              {plan.description}
            </Text>
            <Flex align="baseline" gap={1} mt={5}>
              <Text fontSize="4xl" fontWeight={700} letterSpacing="-0.04em" lineHeight={1}>
                {price === 0 ? '£0' : formatCurrency(shown, 'GBP', shown % 1 ? 2 : 0)}
              </Text>
              <Text color="text.muted" fontSize="sm">
                /month
              </Text>
            </Flex>
            <Text fontSize="xs" color="text.muted" mt={1.5} minH={4}>
              {price === 0 ? 'Free forever' : billing === 'yearly' ? `${formatCurrency(price * 10, 'GBP', 0)} billed yearly` : 'Billed monthly, cancel anytime'}
            </Text>
            <LinkButton href="/dashboard" variant={plan.highlighted ? 'primary' : 'secondary'} mt={5} w="full">
              {price === 0 ? 'Start for free' : `Choose ${plan.name}`}
            </LinkButton>
            <Box borderTopWidth="1px" borderColor="border.subtle" my={5} />
            <Stack as="ul" listStyleType="none" spacing={2.5}>
              {plan.features.map((feature) => (
                <Flex as="li" key={feature} gap={2.5} fontSize="sm" align="flex-start">
                  <Box color="accent.default" mt={0.5}>
                    <Check size={16} aria-hidden />
                  </Box>
                  {feature}
                </Flex>
              ))}
            </Stack>
          </Flex>
        );
      })}
    </SimpleGrid>
  );
}
