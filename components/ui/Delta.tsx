import { HStack, Text } from '@chakra-ui/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { formatPercent, formatSignedPercent } from '@/lib/format';

interface DeltaProps {
  /** Relative change as a fraction, e.g. 0.058 for +5.8%. */
  value: number;
  /** Named comparison period, e.g. "vs June". */
  label?: string;
  /** Set false for metrics where a rise is bad, such as spending. */
  positiveIsGood?: boolean;
}

export function Delta({ value, label, positiveIsGood = true }: DeltaProps) {
  const isUp = value >= 0;
  const isGood = isUp === positiveIsGood;
  const Icon = isUp ? ArrowUpRight : ArrowDownRight;
  return (
    <HStack spacing={1.5} fontSize="sm" minW={0}>
      <HStack
        as="span"
        spacing={0.5}
        color={isGood ? 'positive.fg' : 'negative.fg'}
        fontWeight={600}
        aria-label={`${isUp ? 'Up' : 'Down'} ${formatPercent(Math.abs(value), 1)}`}
      >
        <Icon size={14} strokeWidth={2.5} aria-hidden />
        <span>{formatSignedPercent(value)}</span>
      </HStack>
      {label && (
        <Text as="span" color="text.muted" noOfLines={1}>
          {label}
        </Text>
      )}
    </HStack>
  );
}
