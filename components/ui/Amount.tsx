import { Text, type TextProps } from '@chakra-ui/react';
import type { TransactionType } from '@/types/transaction';
import { formatCurrency } from '@/lib/format';

interface AmountProps extends Omit<TextProps, 'children'> {
  value: number;
  type: TransactionType;
  currency?: string;
  /** Align digits vertically in tables and lists. */
  tabular?: boolean;
}

/** Signed money value: +£ in green for income, −£ for spending, plain for transfers. */
export function Amount({ value, type, currency, tabular = true, ...rest }: AmountProps) {
  const sign = type === 'Income' ? '+' : type === 'Expense' ? '−' : '';
  const color = type === 'Income' ? 'positive.fg' : type === 'Transfer' ? 'text.secondary' : 'text.primary';
  return (
    <Text
      as="span"
      fontWeight={600}
      color={color}
      whiteSpace="nowrap"
      textStyle={tabular ? "numeric" : undefined}
      {...rest}
    >
      {sign}
      {formatCurrency(value, currency)}
    </Text>
  );
}
