'use client';

import { Badge, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { PricingCards, type Billing } from './PricingCards';

const OPTIONS = [
  { value: 'monthly', label: 'Monthly' },
  {
    value: 'yearly',
    label: (
      <>
        Yearly
        <Badge variant="accent" ml={1}>
          2 months free
        </Badge>
      </>
    ),
  },
] as const;

export function PricingSection() {
  const [billing, setBilling] = useState<Billing>('monthly');
  return (
    <>
      <Flex justify="center" mb={{ base: 8, md: 10 }}>
        <SegmentedControl<Billing> aria-label="Billing period" options={OPTIONS} value={billing} onChange={setBilling} size="md" />
      </Flex>
      <PricingCards billing={billing} />
    </>
  );
}
