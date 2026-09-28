import type { Metadata } from 'next';
import { Box, Container, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { Check, Minus } from 'lucide-react';
import { FAQ } from '@/components/marketing/FAQ';
import { CallToAction } from '@/components/marketing/LandingSections';
import { PricingSection } from '@/components/marketing/PricingSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { planComparison, pricingPlans } from '@/data/pricingPlans';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple SpendWise plans for individuals, couples and households. Start free and upgrade when you need more.',
};

function Cell({ value }: { value: string | boolean }) {
  if (value === true)
    return (
      <Flex justify="center" color="accent.default">
        <Check size={18} aria-label="Included" />
      </Flex>
    );
  if (value === false)
    return (
      <Flex justify="center" color="text.muted">
        <Minus size={18} aria-label="Not included" />
      </Flex>
    );
  return (
    <Text textAlign="center" fontSize="sm">
      {value}
    </Text>
  );
}

export default function PricingPage() {
  return (
    <>
      <Box pt={{ base: 12, md: 20 }} pb={{ base: 16, md: 24 }} bgImage="radial-gradient(ellipse 80% 50% at 50% 0%, var(--chakra-colors-accent-subtle), transparent)">
        <Container maxW="7xl">
          <SectionHeading
            as="h1"
            eyebrow="Pricing"
            title="Simple plans that grow with your household"
            description="Start free with the essentials. Every paid plan includes a 30-day money-back guarantee. Prices include VAT."
          />
          <PricingSection />
        </Container>
      </Box>

      <Box as="section" py={{ base: 16, md: 20 }} bg="bg.surface" borderTopWidth="1px" borderBottomWidth="1px" borderColor="border.subtle">
        <Container maxW="6xl">
          <SectionHeading title="Compare plans" description="Everything included in each plan, side by side." />
          <Box overflowX="auto" borderWidth="1px" borderColor="border.subtle" borderRadius="xl">
            <Table minW="640px">
              <Thead>
                <Tr>
                  <Th w="34%">Feature</Th>
                  {pricingPlans.map((plan) => (
                    <Th key={plan.id} textAlign="center" color={plan.highlighted ? 'accent.fg' : undefined}>
                      {plan.name}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {planComparison.map((row) => (
                  <Tr key={row.feature}>
                    <Td fontWeight={500}>{row.feature}</Td>
                    {row.values.map((value, i) => (
                      <Td key={pricingPlans[i].id} bg={pricingPlans[i].highlighted ? 'accent.subtle' : undefined}>
                        <Cell value={value} />
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Container>
      </Box>

      <Box as="section" py={{ base: 16, md: 20 }}>
        <Container maxW="3xl">
          <SectionHeading eyebrow="FAQ" title="Questions about plans" />
          <FAQ />
        </Container>
      </Box>

      <CallToAction />
    </>
  );
}
